# Referent Registry conformance — 2026-09-28

**Status: Historical v5 compatibility record.**

Kristal Reference `0.3.0` adds executable checks for the Kristal `5.0.0-rc.3` Referent Registry `1.0.0` and the frozen `kristal.knowledge-model-contract/v1` bundle.

The adapter verifies the framework example, rejects an out-of-contract core kind, rejects a non-namespaced external identifier used as an internal `ref`, and verifies the downstream knowledge-model bundle pin:

`sha256:07fe0527ab29a4b40870efdd0c9e0c67c91de919e5428047245b2a2c04f8ea98`

This remains an external reference/conformance implementation; normative semantics remain in `kristal-framework`.
