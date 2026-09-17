# Runtime Pack portable conformance

**Date:** 2026-09-16  
**Reference implementation:** `0.2.0`

The reference implementation executes `kristal.v5:runtime-pack-portable-conformance@1` against the sibling Kristal framework vectors.

Covered executable surfaces:

- RP-2 deterministic record ordering bytes;
- RP-3 fixed-row group boundaries;
- RP-4 KBF1 Bloom-filter bytes and authoritative false-positive pruning;
- RP-5 canonical Roaring portable bytes with run optimization enabled and disabled.

This is reference-profile conformance. Other production physical formats require their own declared byte-level profile when their bytes are part of the reproducibility claim.
