# KAVEEP-SIA Architecture

## System Purpose

KAVEEP-SIA is a local-first System Intelligence Agent that helps a user understand storage, file risk, and cleanup opportunities before any computer-changing action is considered.

Version 0.1 performs analysis, reporting, decision recording, dry-run planning, and audit preparation only. It performs no real file modification.

## Core Mission

KAVEEP-SIA follows the project constitution mission:

Understand the computer before changing the computer.

The system must observe, analyze, classify, recommend, request explicit human approval, simulate, and record evidence before any future action engine can exist.

## Module Pipeline

```text
Storage Analyzer
-> File Classification Engine
-> Recommendation Engine
-> Decision & Approval Engine
-> Simulation & Execution Planning Engine
-> Audit, History & Recovery Engine
```

Each module accepts structured input from the previous stage, emits a structured report, records auditable events, and defaults to no action when evidence is missing.

## Read-Only Boundary

The v0.1 boundary allows metadata observation and report generation only.

Allowed read-only inputs include path strings, file names, extensions, sizes, timestamps, folder hierarchy metadata, permission errors, and locally generated report metadata.

Forbidden operations include deleting, moving, renaming, overwriting, compressing, modifying metadata, changing permissions, editing registry, modifying system settings, executing cleanup scripts, or scheduling background cleanup.

## Safety Boundary

All modules default to no action. Protected, unknown, high-risk, system, source-code, database, configuration, environment, license, and recently modified project files must never be recommended for automatic cleanup.

When evidence is insufficient, the result must be `UNVERIFIED`, `needs_more_review`, `unknown`, `protected`, or `blocked`; it must not be marked safe.

## Privacy Boundary

KAVEEP-SIA is local-first. It must not upload local data, inspect private file contents, read document/media contents, or expose sensitive full paths unless detailed reporting is explicitly enabled by the user.

Metadata-only analysis is the default and required privacy model.

## Data Flow

1. The Storage Analyzer receives a scan target and records metadata-only storage facts.
2. The File Classification Engine receives storage metadata and assigns categories and risk levels.
3. The Recommendation Engine receives storage and classification reports and emits advisory recommendations only.
4. The Decision & Approval Engine receives recommendations and records explicit user decisions or blocks unsafe items.
5. The Simulation & Execution Planning Engine receives approved decision records and produces dry-run plans only.
6. The Audit, History & Recovery Engine receives all report summaries and records append-only history and recovery metadata.

## Report Flow

Every module emits JSON reports with stable camelCase fields and may also emit Markdown summaries. Reports are evidence artifacts, not commands.

Reports must include warnings and errors rather than hiding failures. Partial results are acceptable only when failures are explicitly recorded.

## Audit Flow

Every important action, recommendation, decision, warning, blocked item, and error must be auditable.

The Audit, History & Recovery Engine stores append-only records for module execution, generated reports, approvals, rejections, simulations, warnings, and errors. Historical records must never be rewritten.

## Human Approval Flow

Human approval is required before any future real action.

Approval must be explicit, local, item-specific, timestamped, and tied to a recommendation and risk level. Silence never counts as approval. Default state is always no action.

In v0.1, approval records can only feed dry-run simulation plans. They cannot trigger real cleanup.

## Future KAVEEP-CORE Integration

KAVEEP-SIA should expose structured reports and module boundaries that KAVEEP-CORE can orchestrate later. Integration must preserve local-first operation, explicit approval, metadata-only analysis, and auditability.

## Future KAVEEP-POLICY Integration

KAVEEP-POLICY should become the source of shared safety rules, protected path policies, approval requirements, and risk classification rules. Until then, SPEC-000 through SPEC-007 are the controlling policy source.

## Future KAVEEP-COMMAND-CENTER Integration

KAVEEP-COMMAND-CENTER may later display reports, approvals, simulations, audit history, and blocked items. It must not convert advisory reports into actions without explicit human approval and a future approved action engine.

## Future KCP Integration

KCP integration should use typed contracts, report schemas, audit records, and Agent Passport metadata so KAVEEP-SIA can communicate capabilities and limits to the broader KAVEEP ecosystem.

