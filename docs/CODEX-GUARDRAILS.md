# Codex Guardrails for KAVEEP-SIA

Future Codex sessions working in this repository must follow these guardrails:

- Do not implement destructive file actions.
- Do not add delete, move, rename, write, cleanup, compression, overwrite, permission-change, registry, or system-setting execution.
- Do not bypass approval.
- Do not treat silence, timeout, missing input, or ambiguity as approval.
- Do not inspect private file contents.
- Do not upload local data.
- Do not create background cleanup jobs.
- Do not add hidden automation.
- Do not mark uncertain findings as safe.
- Always prefer `blocked`, `protected`, `unknown`, `needs_more_review`, or `UNVERIFIED` when evidence is insufficient.
- All implementation must follow SPEC-000 to SPEC-007.
- KAVEEP-SIA v0.1 must remain local-first and metadata-only.
- Reports, decisions, warnings, blocked items, and errors must be auditable.
- Protected, unknown, high-risk, system, source-code, database, configuration, environment, license, and recently modified project files must never be recommended for automatic cleanup.

This repository is currently in foundation mode. Do not create runtime source code unless a later task explicitly requests implementation after specification alignment.

