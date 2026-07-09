# KAVEEP-SIA Implementation Plan

Implementation must proceed in stages. Do not implement all modules at once.

## Phase 1: Repository Foundation and Safety Contracts

Goal: Establish architecture, safety rules, schemas, examples, and test planning.

Files to create: `docs/ARCHITECTURE.md`, `docs/SAFETY-MATRIX.md`, `docs/MODULE-CONTRACTS.md`, `docs/IMPLEMENTATION-PLAN.md`, `docs/TEST-PLAN.md`, `docs/CODEX-GUARDRAILS.md`, `schemas/*.schema.json`, `examples/*.example.json`.

Tests required: Schema validation tests for all examples and documentation checklist review.

Acceptance criteria: Foundation files exist, examples use fake paths only, and no runtime source code is introduced.

Safety checks: Verify no delete/move/rename/write cleanup implementation exists.

What must NOT be done: Do not build runtime modules, scan real user files, or implement cleanup execution.

## Phase 2: Storage Analyzer Read-Only Prototype

Goal: Implement a metadata-only scanner that produces storage reports.

Files to create: Minimal source module, tests, fixtures with fake paths, and storage report writer.

Tests required: Read-only scanning, permission errors, large folder handling, protected path detection, and schema validation.

Acceptance criteria: Scanner produces valid reports and continues safely after access errors.

Safety checks: No mutation APIs, no metadata modification, no cleanup commands.

What must NOT be done: Do not delete, move, rename, compress, overwrite, change permissions, or inspect file contents.

## Phase 3: File Classification Metadata-Only Prototype

Goal: Classify storage metadata into categories and risk levels.

Files to create: Classification rules, classifier module, tests, fake fixtures, and report writer.

Tests required: Extension, path, size, age, protected, unknown, source-code, database, config, environment, and license classification tests.

Acceptance criteria: Unknown and protected items are handled conservatively and reports validate against schema.

Safety checks: Classification reads only metadata from prior reports.

What must NOT be done: Do not open document, image, media, database, source, or private file contents.

## Phase 4: Recommendation Engine Advisory-Only Prototype

Goal: Generate explainable advisory recommendations from reports.

Files to create: Recommendation rules, recommendation module, tests, and report writer.

Tests required: Risk rules, protected exclusions, duplicate candidates, temporary candidates, installer candidates, and unknown review handling.

Acceptance criteria: Every recommendation has reason, risk, suggested action, and manual review flags.

Safety checks: Automatic cleanup remains false or blocked for protected, high-risk, unknown, and uncertain items.

What must NOT be done: Do not apply recommendations or create runnable action queues.

## Phase 5: Decision & Approval Records

Goal: Record explicit user decisions separately from recommendations.

Files to create: Decision record model, conflict validator, tests, and report writer.

Tests required: Human approval requirement, silence-is-not-approval, conflict detection, protected item blocking, and default no-action tests.

Acceptance criteria: No recommendation becomes approved without explicit decision data.

Safety checks: Ambiguous decisions become no action or `needs_more_review`.

What must NOT be done: Do not execute decisions or schedule actions.

## Phase 6: Simulation Dry-Run Plans

Goal: Create dry-run plans from approved decision records.

Files to create: Simulation planner, safety revalidator, tests, and report writer.

Tests required: Simulation-only planning, stale approval exclusion, changed/missing/protected item blocking, and estimated impact calculation.

Acceptance criteria: Plans describe potential actions without executing them.

Safety checks: All blocked and excluded items are explicit in the report.

What must NOT be done: Do not delete, move, rename, compress, restore, or create executable cleanup jobs.

## Phase 7: Audit Append-Only History

Goal: Append immutable audit records for module execution and reports.

Files to create: Audit record model, append-only writer, report hash helper, tests, and report writer.

Tests required: Append-only audit history, no rewrite behavior, warning/error recording, report hash recording, and recovery metadata preparation.

Acceptance criteria: Every major report and warning/error can be recorded without mutating prior records.

Safety checks: Audit failures are reported and do not erase history.

What must NOT be done: Do not delete or rewrite audit history and do not execute recovery.

## Phase 8: CLI or Local Interface

Goal: Provide a local interface to run modules and inspect reports.

Files to create: CLI or local UI entrypoint, command routing, report display, tests, and documentation.

Tests required: Local-only operation, no upload behavior, explicit approval prompts, default no-action, and schema validation.

Acceptance criteria: Users can run analysis and review reports locally.

Safety checks: Any command that sounds destructive must be unavailable or blocked in v0.1.

What must NOT be done: Do not add hidden automation, background jobs, telemetry uploads, or cleanup execution.

## Phase 9: Integration Readiness with KAVEEP-CORE and KAVEEP-COMMAND-CENTER

Goal: Prepare typed interfaces and compatibility notes for broader KAVEEP integration.

Files to create: Integration contract docs, Agent Passport metadata draft, KCP message draft, and compatibility tests.

Tests required: Contract compatibility, schema stability, local-only behavior, audit traceability, and policy alignment.

Acceptance criteria: KAVEEP-SIA can expose capabilities and reports without expanding runtime authority.

Safety checks: Integration cannot bypass approval or execute cleanup.

What must NOT be done: Do not connect to external orchestration that can modify the local computer without explicit future approval and approved action-engine specs.

