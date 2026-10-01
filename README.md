# Kristal Reference

External reference/conformance adapter for **Kristal Standard v6**.

The primary commands now target `kristal_state` and the v6 semantic model. Older Exchange/Runtime Pack commands remain present as explicit **legacy v5 compatibility helpers**; they are not the conceptual center of the adapter.

## Requirements

- Node.js 22+
- no npm dependencies

## v6 commands

```text
node bin/kristal-ref.mjs state-id <kristal-state.json>
node bin/kristal-ref.mjs verify-state <kristal-state.json> [--require-identity]
node bin/kristal-ref.mjs summarize-state <kristal-state.json>
```

The verifier checks the main v6 invariants used by ecosystem consumers:

- `schema_version = 6.0`;
- `artifact_type = kristal_state`;
- typed `valuations[]`;
- value-state separation (`unknown`/`not_applicable` are not numeric values);
- supported `record_role` and `actionability` modes;
- canonical state identity/content hash using `kristal.v6:jcs-rfc8785`.

It intentionally does not manufacture authority or infer `automatic` from a high valuation.

## Self-contained v6 tests

```powershell
npm test
```

The v6 tests use `fixtures/v6/kristal-state.example.json` and do not require a sibling framework checkout.

## Legacy v5 compatibility

The following commands remain for old consumers:

```text
exchange-id
verify-exchange
build-runtime-pack
verify-runtime-pack
verify-runtime-profile
verify-signature
verify-trust
verify-referent-registry
verify-knowledge-model-contract
```

Legacy tests can be run only when the matching v5 framework/vector tree is available:

```powershell
npm run test:legacy-v5
```

## Authority boundary

`kristal-reference` verifies structure/integrity. It does not define domain truth, legal authority, organizational policy or execution permission.
