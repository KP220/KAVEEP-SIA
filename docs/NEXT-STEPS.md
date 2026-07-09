# KAVEEP-SIA Next Steps

## Completed Foundation

KAVEEP-SIA now has a specification-aligned foundation for safe implementation work:

- Architecture documentation for the local-first, metadata-only v0.1 system.
- Safety matrix covering allowed actions, forbidden actions, approval needs, audit needs, privacy rules, and failure behavior.
- Module contracts for the Storage Analyzer, File Classification Engine, Recommendation Engine, Decision & Approval Engine, Simulation & Execution Planning Engine, and Audit, History & Recovery Engine.
- Staged implementation plan from foundation through integration readiness.
- Repository test plan covering read-only behavior, protected paths, unknown files, human approval, dry-run planning, append-only audit, and no destructive action guarantees.
- JSON Schemas for storage, classification, recommendation, decision, simulation, and audit reports.
- Safe fake-path example JSON reports for every schema.
- Codex guardrails for future sessions.
- Node-only validation harness for checking example JSON files against repository schemas.

No runtime agent, cleanup logic, file modification logic, background automation, or system-changing behavior has been implemented.

## Next Safe Implementation Issue

### Issue Title

Implement Storage Analyzer read-only prototype

### Goal

Create the first Storage Analyzer prototype that scans only an explicitly provided local target and produces a JSON storage report matching `schemas/storage-report.schema.json`.

The prototype must help KAVEEP-SIA understand storage usage before any recommendation or action exists.

### Scope

- Implement a read-only Storage Analyzer module.
- Accept an explicit scan target from a local CLI command.
- Traverse the target using metadata-only operations.
- Count files and folders.
- Estimate total observed size from file metadata.
- Record largest files and largest folders from metadata.
- Identify duplicate candidates using non-content metadata signals only.
- Identify temporary file candidates using filename, extension, and path metadata only.
- Flag risky locations such as system, source-code, database, configuration, environment, license, and protected folders.
- Continue safely after permission or access errors.
- Write a JSON report that validates against `schemas/storage-report.schema.json`.
- Include tests before the implementation is considered complete.

### Non-Goals

- Do not implement cleanup.
- Do not delete files.
- Do not move files.
- Do not rename files.
- Do not overwrite files.
- Do not compress files.
- Do not modify file metadata.
- Do not change permissions.
- Do not inspect private file contents.
- Do not hash file contents.
- Do not modify system settings.
- Do not edit registry.
- Do not create background jobs.
- Do not implement recommendation, decision, simulation, audit, or recovery engines in this issue.

### Safety Rules

- Read-only only.
- Metadata-only only.
- Local-first only.
- Explicit scan target required.
- Default state is no action.
- Permission errors must be recorded, not bypassed.
- Protected or risky paths must be flagged and never treated as safe cleanup targets.
- Unknown or insufficient evidence must be reported as `UNVERIFIED`, `unknown`, or `needs_more_review`.
- Duplicate and temporary detections are candidates only, not cleanup instructions.
- The CLI must not expose destructive commands or hidden automation.

### Files To Create

Proposed files:

- `src/storage-analyzer/StorageAnalyzer.mjs`
- `src/storage-analyzer/protected-paths.mjs`
- `src/storage-analyzer/report-writer.mjs`
- `tools/storage-analyzer.mjs`
- `tests/storage-analyzer.test.mjs`
- `tests/fixtures/storage-analyzer/README.md`
- `tests/fixtures/storage-analyzer/sample-tree/`

The exact structure may be adjusted to match repository conventions, but runtime code must remain scoped to the Storage Analyzer prototype.

### Expected CLI Behavior

The CLI should be local and explicit:

```powershell
npm.cmd run storage:analyze -- --target "C:\Users\ExampleUser\Downloads" --out "reports/storage-report.example-run.json"
```

Expected behavior:

- Require `--target`.
- Require or safely default `--out` to a repository-local report path.
- Refuse missing targets with a clear error.
- Produce a JSON report only.
- Print clear PASS/FAIL-style status for validation.
- Exit with code `0` only when report generation and schema validation succeed.
- Exit with code `1` when scan input, report generation, or validation fails.
- Never run cleanup or modification actions.

### Output Reports

The implementation must produce a JSON report matching `schemas/storage-report.schema.json`.

Required report fields:

- `scanTarget`
- `generatedAt`
- `totalSizeBytes`
- `usedSpaceBytes`
- `freeSpaceBytes`
- `fileCount`
- `folderCount`
- `largestFiles`
- `largestFolders`
- `duplicateCandidates`
- `temporaryFileCandidates`
- `riskyLocations`
- `errors`

All paths in tests and fixtures must be fake or repository-local test fixture paths. Real user paths must not be scanned in automated tests.

### Tests Required

Tests must cover:

- Schema validation of generated storage reports.
- Read-only scanning behavior.
- Metadata-only behavior.
- Missing target handling.
- Permission or inaccessible path error recording where safely testable.
- Large folder handling using generated fixtures or mocked metadata.
- Largest file detection.
- Largest folder detection.
- Duplicate candidate detection from metadata only.
- Temporary file candidate detection from metadata only.
- Protected path detection.
- Unknown or insufficient evidence handling.
- No destructive action guarantee through static checks or guarded API design.

### Acceptance Criteria

The issue is complete only when:

- The Storage Analyzer accepts an explicit target and output path.
- The analyzer performs metadata-only traversal.
- The analyzer never reads private file contents.
- The analyzer never deletes, moves, renames, writes to, compresses, or modifies scanned files.
- The analyzer records permission and access errors safely.
- The analyzer identifies largest files and folders from metadata.
- The analyzer emits duplicate and temporary candidates as review-only candidates.
- The analyzer flags risky and protected locations.
- The generated JSON validates against `schemas/storage-report.schema.json`.
- Tests exist and pass.
- No recommendation, cleanup, decision, simulation, audit, recovery, background job, registry, permission, or system-setting behavior is introduced.

