# SPEC-003

# File Classification Engine

Version

0.1

---

## Purpose

Create a read-only file classification engine for KAVEEP-SIA.

The engine must classify files safely before any recommendation is made.

It helps the system understand what each file likely represents.

---

## Mission

Receive file data

↓

Identify file type

↓

Classify risk

↓

Group files

↓

Report findings

↓

Support recommendations

---

## Responsibilities

The File Classification Engine must:

- Classify files by extension
- Classify files by folder location
- Classify files by size
- Classify files by age
- Classify files by usage context when available
- Detect temporary file candidates
- Detect installer file candidates
- Detect archive file candidates
- Detect media file candidates
- Detect document file candidates
- Detect development file candidates
- Detect project file candidates
- Detect system-related file candidates
- Detect unknown file types
- Attach risk levels to classifications
- Produce classification reports

---

## File Categories

The first version should support these categories:

- Documents
- Images
- Videos
- Audio
- Archives
- Installers
- Applications
- Temporary Files
- Cache Files
- Logs
- Development Files
- Source Code
- Project Files
- Database Files
- System Files
- Unknown Files

---

## Classification Signals

The engine may use:

- File extension
- File name pattern
- Folder path
- File size
- Last modified date
- Last accessed date when available
- Known temporary folder locations
- Known system folder locations
- Known development folder names
- Known project folder names

---

## Risk Levels

Each classified file must include a risk level.

Suggested risk levels:

- low
- medium
- high
- protected
- unknown

---

## Risk Control

The engine must treat these as high-risk or protected:

- Windows folder
- Program Files folder
- ProgramData folder
- AppData folder
- Source code repositories
- Active project folders
- Database folders
- Configuration files
- License files
- Environment files
- System executables
- User profile folders with unclear purpose

Protected or high-risk files must never be recommended for automatic cleanup.

---

## Non-Goals

The first version must NOT:

- Delete files
- Move files
- Rename files
- Overwrite files
- Modify file metadata
- Open private file contents
- Read document contents
- Read image contents
- Read media contents
- Change permissions
- Modify system settings

---

## Privacy Rules

The engine must classify using metadata only.

It must not inspect private file contents.

It must not upload file information to external services.

It must not expose full sensitive paths unless the user explicitly requests detailed reporting.

---

## Output

The module must produce:

- JSON classification report
- Markdown classification summary
- File category counts
- File category size totals
- Risk level counts
- Unknown file type list
- Protected file list
- Error log

---

## JSON Report Structure

```json
{
  "scan_target": "",
  "classified_at": "",
  "total_files": 0,
  "categories": {
    "documents": {
      "count": 0,
      "total_size_bytes": 0
    },
    "images": {
      "count": 0,
      "total_size_bytes": 0
    },
    "videos": {
      "count": 0,
      "total_size_bytes": 0
    },
    "audio": {
      "count": 0,
      "total_size_bytes": 0
    },
    "archives": {
      "count": 0,
      "total_size_bytes": 0
    },
    "installers": {
      "count": 0,
      "total_size_bytes": 0
    },
    "applications": {
      "count": 0,
      "total_size_bytes": 0
    },
    "temporary_files": {
      "count": 0,
      "total_size_bytes": 0
    },
    "cache_files": {
      "count": 0,
      "total_size_bytes": 0
    },
    "logs": {
      "count": 0,
      "total_size_bytes": 0
    },
    "development_files": {
      "count": 0,
      "total_size_bytes": 0
    },
    "source_code": {
      "count": 0,
      "total_size_bytes": 0
    },
    "project_files": {
      "count": 0,
      "total_size_bytes": 0
    },
    "database_files": {
      "count": 0,
      "total_size_bytes": 0
    },
    "system_files": {
      "count": 0,
      "total_size_bytes": 0
    },
    "unknown_files": {
      "count": 0,
      "total_size_bytes": 0
    }
  },
  "risk_levels": {
    "low": 0,
    "medium": 0,
    "high": 0,
    "protected": 0,
    "unknown": 0
  },
  "protected_files": [],
  "unknown_files": [],
  "errors": []
}
```

---

## Performance Requirements

The File Classification Engine should:

- Process file metadata without loading file contents.
- Handle large scan results from the Storage Analyzer.
- Continue classification when individual files fail.
- Keep memory usage limited where possible.
- Support future batch processing.
- Support future rule-based classification updates.

---

## Future Extensions

Planned future capabilities:

- User-defined classification rules
- Custom file categories
- Confidence scores
- File sensitivity scoring
- Project-aware classification
- Duplicate-aware classification
- Cleanup recommendation scoring
- Local-only machine learning classification

---

## Acceptance Criteria

This SPEC is accepted when:

- The module can classify files by extension
- The module can classify files by folder path
- The module can group files by category
- The module can calculate category counts
- The module can calculate category size totals
- The module can assign risk levels
- The module can identify protected files
- The module can export JSON
- The module handles unknown file types safely
- The module performs no destructive action
