# KAVEEP-SIA Module Contracts

These contracts define v0.1 report boundaries only. They do not authorize runtime cleanup, file modification, or system changes.

## Storage Analyzer

Purpose: Produce a read-only metadata storage report for a selected scan target.

Input: Local scan target reference, scan options, protected path policy, and previous audit session metadata when available.

Output: `storage-report.schema.json`.

Required fields: `scanTarget`, `generatedAt`, `totalSizeBytes`, `usedSpaceBytes`, `freeSpaceBytes`, `fileCount`, `folderCount`, `largestFiles`, `largestFolders`, `duplicateCandidates`, `temporaryFileCandidates`, `riskyLocations`, `errors`.

Error behavior: Continue after individual permission or access failures. Record errors with path reference, code, message, and `UNVERIFIED` status where applicable.

Safety constraints: Read-only metadata collection. No delete, move, rename, overwrite, compression, metadata change, permission change, cleanup, registry edit, or system setting change.

Privacy constraints: Do not read file contents. Do not upload data. Avoid sensitive full paths unless detailed reporting is explicitly enabled.

Audit events emitted: `storage.scan.started`, `storage.scan.completed`, `storage.scan.warning`, `storage.scan.error`.

## File Classification Engine

Purpose: Classify file metadata into categories and risk levels before recommendations are made.

Input: Storage report, classification rules, protected path policy, and scan context.

Output: `classification-report.schema.json`.

Required fields: `scanTarget`, `classifiedAt`, `totalFiles`, `categories`, `riskLevels`, `protectedFiles`, `unknownFiles`, `errors`.

Error behavior: Mark unclassifiable entries as `unknown` or `needs_more_review`. Continue processing valid metadata.

Safety constraints: No content reading and no mutation. Protected/high-risk classification is required for system, source-code, database, configuration, environment, license, and recently modified project files.

Privacy constraints: Metadata-only classification from path, extension, size, timestamps, and folder context. No external service calls.

Audit events emitted: `classification.started`, `classification.completed`, `classification.unknown_detected`, `classification.protected_detected`, `classification.error`.

## Recommendation Engine

Purpose: Produce advisory-only recommendations from storage and classification evidence.

Input: Storage report, classification report, safety policy, recommendation rules, and scan context.

Output: `recommendation-report.schema.json`.

Required fields: `generatedAt`, `scanTarget`, `summary`, `recommendations`, `protectedItems`, `doNotTouch`, `errors`.

Error behavior: Exclude unsafe or contradictory candidates from action recommendations and record them as blocked, protected, or `needs_more_review`.

Safety constraints: Never apply recommendations. Automatic cleanup is not allowed in v0.1. Protected and unknown-risk items must not be recommended for cleanup.

Privacy constraints: Use prior metadata reports only. Do not inspect file contents or upload local data.

Audit events emitted: `recommendation.started`, `recommendation.completed`, `recommendation.created`, `recommendation.blocked`, `recommendation.error`.

## Decision & Approval Engine

Purpose: Separate system recommendations from explicit user decision records.

Input: Recommendation report, user decision input, conflict rules, protected path policy, and audit session metadata.

Output: `decision-report.schema.json`.

Required fields: `generatedAt`, `sourceRecommendationReport`, `summary`, `decisions`, `conflicts`, `protectedItems`, `errors`.

Error behavior: Default missing, ambiguous, stale, or conflicting decisions to no action. Record conflicts and block affected items.

Safety constraints: Must not execute recommendations. Silence never counts as approval. Default state is no action.

Privacy constraints: Store decision metadata locally. Avoid exposing sensitive paths unless detailed reporting is explicitly enabled.

Audit events emitted: `decision.started`, `decision.recorded`, `decision.rejected`, `decision.blocked`, `decision.conflict_detected`, `decision.error`.

## Simulation & Execution Planning Engine

Purpose: Convert explicit future-action approvals into dry-run execution plans without changing files.

Input: Decision report, safety revalidation policy, current metadata references when available, and audit session metadata.

Output: `simulation-report.schema.json`.

Required fields: `generatedAt`, `sourceDecisionReport`, `summary`, `executionPlan`, `excludedItems`, `blockedItems`, `warnings`, `errors`.

Error behavior: Exclude any item that fails revalidation. Mark stale, changed, missing, protected, risky, or unknown items as blocked or excluded.

Safety constraints: Dry-run only. No delete, move, rename, overwrite, compression, metadata change, permission change, cleanup execution, script execution, or scheduled job creation.

Privacy constraints: Metadata-only revalidation. No content inspection and no uploads.

Audit events emitted: `simulation.started`, `simulation.plan_created`, `simulation.item_excluded`, `simulation.item_blocked`, `simulation.warning`, `simulation.error`.

## Audit, History & Recovery Engine

Purpose: Preserve append-only history and prepare recovery metadata for future safe actions.

Input: Module reports, warning/error events, decision records, simulation records, session metadata, and report hashes.

Output: `audit-report.schema.json`.

Required fields: `generatedAt`, `sessionId`, `auditSummary`, `history`, `recoveryMetadata`, `warnings`, `errors`.

Error behavior: Append errors without rewriting previous records. If audit writing fails, emit a failure report and block further trust claims.

Safety constraints: Append-only records. No history deletion, history rewrite, recovery execution, file restore, script execution, or user file modification.

Privacy constraints: Store metadata locally. Do not record private contents. Protect sensitive paths unless detailed reporting is enabled.

Audit events emitted: `audit.record_appended`, `audit.report_generated`, `audit.warning_recorded`, `audit.error_recorded`, `audit.recovery_metadata_prepared`.

