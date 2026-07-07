# SPEC-004

# Recommendation Engine

Version

0.1

---

## Purpose

Create a safe recommendation engine for KAVEEP-SIA.

The engine must analyze storage reports and file classification reports before suggesting any cleanup or organization action.

The first version must only recommend actions.

It must not perform actions.

---

## Mission

Receive analysis data

↓

Evaluate file categories

↓

Evaluate risk levels

↓

Generate safe recommendations

↓

Explain reasoning

↓

Wait for user decision

---

## Responsibilities

The Recommendation Engine must:

- Read storage analysis reports
- Read file classification reports
- Identify low-risk cleanup candidates
- Identify medium-risk review candidates
- Identify protected files
- Identify files that need user confirmation
- Recommend possible cleanup actions
- Recommend possible organization actions
- Recommend files that should not be touched
- Explain why each recommendation was made
- Attach risk level to every recommendation
- Produce recommendation reports

---

## Recommendation Types

The first version should support these recommendation types:

- safe_to_review
- likely_temporary
- likely_installer
- likely_duplicate_candidate
- large_file_review
- old_file_review
- archive_candidate
- keep_protected
- do_not_touch
- needs_user_confirmation
- unknown_review_required

---

## Safety Rules

The Recommendation Engine must never:

- Delete files
- Move files
- Rename files
- Overwrite files
- Compress files
- Modify file metadata
- Change permissions
- Modify system settings
- Execute cleanup automatically

All recommendations are advisory only.

The user must explicitly approve any future action.

---

## Risk Levels

Each recommendation must include a risk level:

- low
- medium
- high
- protected
- unknown

---

## Risk Control

The engine must mark these as protected or high-risk:

- Windows system folders
- Program Files
- ProgramData
- AppData
- Source code repositories
- Active project folders
- Database folders
- Environment files
- Configuration files
- License files
- System executables
- Recently modified project files
- Unknown file types in sensitive locations

Protected files must never be recommended for automatic cleanup.

---

## Recommendation Logic

The engine may recommend review for:

- Large files
- Old installer files
- Temporary files
- Cache files
- Log files
- Duplicate candidates
- Old archive files
- Unused downloaded files
- Large media files

The engine must avoid recommending cleanup for:

- System files
- Active project files
- Source code files
- Database files
- Configuration files
- License files
- Unknown files in risky locations
- Files modified recently
- Files required by applications

---

## Explainability Rules

Every recommendation must explain:

- What was detected
- Why it was flagged
- Risk level
- Suggested user action
- Whether automatic cleanup is allowed in the future
- Whether manual review is required

---

## Output

The module must produce:

- JSON recommendation report
- Markdown recommendation summary
- Safe review list
- Manual review list
- Protected files list
- Do-not-touch list
- Error log

---

## JSON Report Structure

```json
{
  "generated_at": "",
  "scan_target": "",
  "summary": {
    "total_recommendations": 0,
    "low_risk_count": 0,
    "medium_risk_count": 0,
    "high_risk_count": 0,
    "protected_count": 0,
    "unknown_count": 0
  },
  "recommendations": [
    {
      "path": "",
      "type": "",
      "risk_level": "",
      "reason": "",
      "suggested_action": "",
      "manual_review_required": true,
      "automatic_cleanup_allowed": false
    }
  ],
  "protected_items": [],
  "do_not_touch": [],
  "errors": []
}
```

---

## Non-Goals

The first version must NOT:

- Perform cleanup
- Delete files
- Move files
- Rename files
- Modify files
- Modify folders
- Modify metadata
- Execute scripts
- Run system commands
- Apply recommendations automatically

---

## Privacy Rules

The engine must:

- Work locally
- Use metadata only
- Avoid exposing sensitive paths unless detailed reporting is enabled
- Never upload file information to external services
- Never inspect private file contents

---

## Performance Requirements

The Recommendation Engine should:

- Process reports from previous modules efficiently
- Handle large recommendation lists
- Avoid loading unnecessary file contents
- Continue working when some report entries contain errors
- Support future scoring systems
- Support future user preference rules

---

## Future Extensions

Planned future capabilities:

- User-defined recommendation rules
- Cleanup confidence score
- Storage saving estimate
- One-click review mode
- Safe action queue
- Undo plan generation
- Manual approval workflow
- Dry-run cleanup simulation
- Priority ranking
- Local-only learning from user decisions

---

## Acceptance Criteria

This SPEC is accepted when:

- The module can read storage analysis data
- The module can read file classification data
- The module can generate recommendations
- Every recommendation includes a risk level
- Every recommendation includes an explanation
- Protected files are excluded from cleanup suggestions
- Unknown risky files require manual review
- The module exports JSON
- The module exports Markdown summary
- The module performs no destructive action
