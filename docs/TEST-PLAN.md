# KAVEEP-SIA Test Plan

This plan covers repository-level safety expectations for v0.1. Runtime tests should be added only as modules are implemented.

## Read-Only Scanning

Verify that scanning uses metadata-only read operations and never modifies files, folders, permissions, timestamps, registry, system settings, or cleanup queues.

## Permission Errors

Verify that access-denied paths produce structured errors and do not stop the whole scan unless the scan target itself is unavailable.

## Large Folder Handling

Verify that large folders can be processed with bounded memory, streaming traversal, partial progress, and explicit error reporting.

## Protected Path Detection

Verify that Windows, Program Files, ProgramData, AppData, source repositories, active project folders, database folders, configuration files, environment files, license files, and system executables are marked protected or high-risk.

## Unknown File Handling

Verify that unknown file types are classified as `unknown` or `needs_more_review` and are never marked safe by default.

## Duplicate Candidate Detection

Verify that duplicate detection emits candidates only and never claims duplicate files are safe to remove without additional evidence and approval.

## Temporary File Candidate Detection

Verify that temporary file detection emits candidates only and excludes protected paths, unknown-risk paths, and recently modified project files.

## Metadata-Only Classification

Verify that classification uses extension, filename pattern, folder path, size, and timestamps only. Tests must fail if document/media/private contents are opened.

## Recommendation Risk Rules

Verify that recommendations include type, risk level, reason, suggested action, manual review requirement, and automatic cleanup flag. Protected, high-risk, unknown, and uncertain items must not allow automatic cleanup.

## Human Approval Requirement

Verify that no recommendation becomes a future-action decision without explicit user approval data. Silence, missing input, timeout, or ambiguity must result in no action.

## Simulation-Only Planning

Verify that simulation produces dry-run plans only and does not execute delete, move, rename, compress, restore, permission, metadata, script, cleanup, or scheduled-job operations.

## Append-Only Audit History

Verify that audit records can be appended but prior records cannot be changed by normal module behavior. Report hashes, warnings, errors, blocked items, and decisions must be recorded.

## No Destructive Action Guarantee

Verify by static checks and runtime guards that no destructive APIs or shell commands are introduced in v0.1 modules. Any future destructive capability must require new specs, safety review, explicit user approval, and separate implementation approval.

## Schema Validation

Verify that every example in `examples/` validates against its paired schema in `schemas/`.

