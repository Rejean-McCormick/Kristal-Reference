import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { exchangeIdentity, verifyExchange } from './exchange.mjs';
import { buildRuntimePackFromRequest, verifyRuntimePack } from './runtime_pack.mjs';
import { verifySignatureFixture, verifyTrustFixture } from './security.mjs';
import { verifyPortableVector } from './runtime_pack_portable.mjs';
import { readJson, printJson, unwrapVector } from './io.mjs';

function die(message, code = 2) {
  process.stderr.write(message + '\n');
  process.exit(code);
}

function requireArg(args, index, label) {
  if (!args[index]) die(`missing ${label}`);
  return args[index];
}

function resultExit(result) {
  printJson(result);
  process.exit(result.ok === false ? 1 : 0);
}

export async function main(argv = process.argv.slice(2)) {
  const [command, ...args] = argv;
  switch (command) {
    case 'exchange-id': {
      const file = requireArg(args, 0, 'input JSON');
      const doc = unwrapVector(readJson(file));
      printJson(exchangeIdentity(doc));
      return;
    }
    case 'verify-exchange': {
      const file = requireArg(args, 0, 'input JSON');
      const doc = unwrapVector(readJson(file));
      return resultExit(verifyExchange(doc));
    }
    case 'build-runtime-pack': {
      const file = requireArg(args, 0, 'input JSON');
      const outputDir = requireArg(args, 1, 'output directory');
      const result = buildRuntimePackFromRequest(readJson(file), outputDir);
      printJson(result);
      return;
    }
    case 'verify-runtime-pack': {
      const manifestPath = requireArg(args, 0, 'manifest JSON');
      const payloadDir = requireArg(args, 1, 'payload directory');
      return resultExit(verifyRuntimePack(readJson(manifestPath), payloadDir));
    }

    case 'verify-runtime-profile': {
      const file = requireArg(args, 0, 'portable vector JSON');
      const doc = readJson(file);
      const results = (doc.vectors ?? []).map((vector) => ({ id: vector.id, ...verifyPortableVector(vector) }));
      const out = {
        ok: doc.profile === 'kristal.v5:runtime-pack-portable-conformance@1' && results.every((r) => r.ok),
        profile: doc.profile,
        results,
      };
      return resultExit(out);
    }
    case 'verify-signature': {
      const file = requireArg(args, 0, 'signature fixture JSON');
      return resultExit(verifySignatureFixture(readJson(file)));
    }
    case 'verify-trust': {
      const file = requireArg(args, 0, 'trust fixture JSON');
      return resultExit(verifyTrustFixture(readJson(file)));
    }
    case 'self-test': {
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kristal-ref-selftest-'));
      try {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
        const message = Buffer.from('kristal-reference-self-test', 'utf8');
        const signature = crypto.sign(null, message, privateKey);
        const fixture = {
          algorithm: 'ed25519',
          public_key_pem: publicKey.export({ type: 'spki', format: 'pem' }),
          message_base64: message.toString('base64'),
          signature_base64: signature.toString('base64'),
        };
        const result = verifySignatureFixture(fixture);
        if (!result.ok) throw new Error(result.issues.join('; '));
        printJson({ ok: true, self_test: 'PASS' });
      } finally {
        fs.rmSync(tmp, { recursive: true, force: true });
      }
      return;
    }
    default:
      die('usage: kristal-ref <exchange-id|verify-exchange|build-runtime-pack|verify-runtime-pack|verify-runtime-profile|verify-signature|verify-trust|self-test> ...');
  }
}
