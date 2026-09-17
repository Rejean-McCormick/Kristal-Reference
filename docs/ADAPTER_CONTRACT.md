# LevelUpDiag Adapter Contract

`kristal-reference` exposes process-level commands so an external diagnostics repository can test the implementation without importing private modules.

## Exit codes

- `0`: accepted / operation succeeded
- `1`: artifact or security fixture rejected by the verifier
- `2`: invocation or internal runtime error

## Exchange

### `exchange-id <input>`

Input may be a raw Exchange payload fixture or an official vector object containing `input`.
The command prints JSON containing `kristal_id`, `sha256_hex`, `canonical`, and `profile`.

### `verify-exchange <input>`

Recomputes the Exchange identity and verifies declared `kristal_id` and `content_hash`.

## Runtime Pack

### `build-runtime-pack <request> <output-dir>`

The request may use the official vector shape (`input` + `payloads`) or `manifest` + `payloads`.
Payload values are base64. The builder writes payload files, updates their SHA-256/size inventory, computes `runtime_pack_id`, and writes `runtime-pack.manifest.json`.

### `verify-runtime-pack <manifest> <payload-dir>`

Verifies the Runtime Pack identity plus every declared payload SHA-256 and size.


### `verify-runtime-profile <portable-vectors>`

Executes `kristal.v5:runtime-pack-portable-conformance@1` vectors and independently reproduces the expected RP-2 through RP-5 bytes. The result JSON includes one entry per vector with exact SHA-256/base64 comparison and semantic checks.

## Security

### `verify-signature <fixture>`

Fixture fields:

```json
{
  "algorithm": "ed25519",
  "public_key_pem": "...",
  "message_base64": "...",
  "signature_base64": "..."
}
```

### `verify-trust <fixture>`

Trust fixtures contain a verification instant, key ID, signature material, trust roots, and optional revocations. The verifier rejects missing roots, not-yet-valid keys, expired keys, effective revocations, and invalid signatures.
