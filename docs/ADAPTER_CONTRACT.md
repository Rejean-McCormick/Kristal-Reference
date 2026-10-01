# Kristal Reference Adapter Contract — v6

Active adapter version: `0.4.0`.

## Primary operations

### `state-id <file>`
Computes the v6 Kristal State canonical content identity using `kristal.v6:jcs-rfc8785`. The state hash target excludes `state_id`, `content_hash`, and `signatures`.

### `verify-state <file> [--require-identity]`
Checks the core v6 structural semantics used by ecosystem consumers: `schema_version=6.0`, `artifact_type=kristal_state`, typed valuations/value states, known record roles/actionability modes and declared state identity when present.

### `summarize-state <file>`
Reports assertion count plus record-role, actionability, valuation-semantics and valuation-dimension distributions. This is diagnostic output, not a canonical projection.

## Fail-closed invariants

- non-known value states must not masquerade as numeric/categorical values;
- probability values must be in `[0,1]`;
- tampering invalidates a declared content identity;
- a high/established valuation does not imply `actionability=automatic`;
- structural verification does not establish domain truth or execution authority.

## Legacy compatibility operations

Exchange/Runtime Pack and older knowledge-model helpers remain in the binary for historical consumers. They are explicitly v5 compatibility surfaces and are not exercised by the default v6 test suite.
