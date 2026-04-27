# Grader Notes — Exercise 08 Capstone

Newman is run with both --environment and --iteration-data flags.

Pass: Newman exits 0 + stdout contains "requests executed" AND "iterations".

"requests executed" ensures there are actual requests (not an empty collection).
"iterations" ensures the data-driven CSV ran (not just pre-request scripts).

Minimum 25 requests is validated by checking the number in the "N requests executed" line. If less than 25 requests, the grader should warn (not hard fail) — exact count validation requires custom parsing.

The capstone is the synthesis check — if auth chaining, negative tests, and data-driven all work, this passes.
