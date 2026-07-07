# SPEC-002

# Storage Analyzer

Version

0.1

---

## Purpose

Create a read-only storage analysis module for KAVEEP-SIA.

The module must understand how storage is used before recommending any action.

---

## Mission

Scan

↓

Measure

↓

Classify

↓

Report

↓

Recommend

---

## Responsibilities

The Storage Analyzer must:

- Scan selected drives
- Scan selected folders
- Calculate total size
- Calculate used space
- Calculate free space
- Detect largest files
- Detect largest folders
- Detect possible duplicate files
- Detect old installer files
- Detect temporary files
- Generate storage reports

---

## Non-Goals

The first version must NOT:

- Delete files
- Move files
- Rename files
- Overwrite files
- Compress files
- Modify file metadata
- Change permissions
- Modify system settings

---

## Safety Rules

The Storage Analyzer is read-only.

It must never perform destructive actions.

It must never modify user files.

Every result must be treated as analysis only.

---

## Output

The module must produce:

- JSON storage report
- Markdown summary report
- Largest files list
- Largest folders list
- Duplicate candidates list
- Temporary files candidates list
- Error log

---

## JSON Report Structure

```json
{
  "scan_target": "",
  "total_size_bytes": 0,
  "used_space_bytes": 0,
  "free_space_bytes": 0,
  "file_count": 0,
  "folder_count": 0,
  "largest_files": [],
  "largest_folders": [],
  "duplicate_candidates": [],
  "temporary_file_candidates": [],
  "errors": []
}
```

---

## Risk Control

The Storage Analyzer must flag risky locations such as:

- Windows system folders
- Program Files
- ProgramData
- AppData
- Active project folders
- Source code folders
- Database folders

Risky locations must be scanned carefully and must never be recommended for automatic cleanup.

---

## Performance Requirements

The Storage Analyzer should:

- Stream directory traversal without loading everything into memory.
- Support scanning drives larger than 1 TB.
- Handle more than 1,000,000 files.
- Continue scanning when individual files fail.
- Limit memory usage where possible.
- Support future parallel scanning.

---

## Future Extensions

Planned future capabilities:

- File type statistics
- Age distribution analysis
- Largest extensions
- Recently modified files
- Recently accessed files
- Visualization dashboard
- Incremental scan

---

## Acceptance Criteria

This SPEC is accepted when:

- The module can scan a selected folder
- The module can calculate folder size
- The module can list top largest files
- The module can list top largest folders
- The module can export JSON
- The module handles permission errors safely
- The module performs no destructive action
