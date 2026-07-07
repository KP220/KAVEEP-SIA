# SPEC-006

# Simulation & Execution Planning Engine

Version

0.1

---

## Purpose

Create a simulation and execution planning layer for KAVEEP-SIA.

The engine must simulate approved recommendations before any real action exists.

The first version must only create dry-run plans.

It must not perform actions.

---

## Mission

Receive approved decisions

↓

Validate safety again

↓

Simulate possible actions

↓

Estimate storage impact

↓

Detect remaining risks

↓

Generate execution plan

↓

Wait for future action engine

---

## Responsibilities

The Simulation & Execution Planning Engine must:

- Read decision reports from the Decision & Approval Engine
- Process only approved-for-future-action items
- Revalidate every approved item against safety rules
- Simulate proposed actions without changing files
- Estimate possible storage savings
- Estimate affected file count
- Estimate affected folder count
- Detect remaining safety risks
- Detect missing files
- Detect changed files
- Detect protected items that slipped through approval
- Detect stale approvals
- Generate dry-run execution plans
- Produce simulation reports

---

## Simulation Types

The first version should support these simulation types:

- cleanup_dry_run
- move_dry_run
- rename_dry_run
- archive_dry_run
- duplicate_resolution_dry_run
- temporary_file_cleanup_dry_run
- installer_cleanup_dry_run
- large_file_review_dry_run

---

## Safety Rules

The Simulation & Execution Planning Engine must never:

- Delete files
- Move files
- Rename files
- Overwrite files
- Compress files
- Modify file metadata
- Change permissions
- Modify system settings
- Execute cleanup
- Execute scripts
- Run system commands

All outputs are dry-run plans only.

---

## Safety Revalidation Rules

Before simulation, the engine must check:

- Item is explicitly approved
- Approval has not expired
- Item path still exists when path validation is available
- Item has not changed since approval when metadata is available
- Item is not protected
- Item is not in a risky location
- Item is not a system file
- Item is not an active project file
- Item is not a database file
- Item is not an environment file
- Item is not a configuration file
- Item is not unknown-risk in a sensitive folder

If any check fails, the item must be excluded from the execution plan.

---

## Execution Plan Rules

The engine must generate a plan, not execute it.

Each plan item must include:

- Item ID
- Path or safe path reference
- Proposed action
- Simulation type
- Estimated storage impact
- Risk level
- Safety status
- Required confirmation level
- Reversibility estimate
- Blocked status
- Block reason when blocked

---

## Risk Levels

Each plan item must include a risk level:

- low
- medium
- high
- protected
- unknown

---

## Confirmation Levels

Each plan item must include a confirmation level:

- none_allowed
- single_confirmation_required
- double_confirmation_required
- manual_only
- blocked

---

## Non-Goals

The first version must NOT:

- Perform real actions
- Create action queues that run automatically
- Delete files
- Move files
- Rename files
- Modify files
- Modify folders
- Modify metadata
- Compress files
- Restore files
- Apply cleanup plans
- Schedule cleanup jobs

---

## Privacy Rules

The engine must:

- Work locally
- Use metadata only
- Avoid exposing sensitive paths unless detailed reporting is enabled
- Never upload simulation data to external services
- Never inspect private file contents

---

## Output

The module must produce:

- JSON simulation report
- Markdown simulation summary
- Dry-run execution plan
- Estimated storage savings
- Excluded items list
- Blocked items list
- Safety warning list
- Error log

---

## JSON Report Structure

```json
{
  "generated_at": "",
  "source_decision_report": "",
  "summary": {
    "total_approved_items": 0,
    "planned_items": 0,
    "blocked_items": 0,
    "excluded_items": 0,
    "estimated_storage_savings_bytes": 0,
    "estimated_affected_files": 0,
    "estimated_affected_folders": 0
  },
  "execution_plan": [
    {
      "item_id": "",
      "path": "",
      "proposed_action": "",
      "simulation_type": "",
      "risk_level": "",
      "confirmation_level": "",
      "estimated_storage_impact_bytes": 0,
      "reversibility_estimate": "",
      "safety_status": "",
      "blocked": true,
      "block_reason": ""
    }
  ],
  "excluded_items": [],
  "blocked_items": [],
  "warnings": [],
  "errors": []
}
```

---

## Performance Requirements

The Simulation & Execution Planning Engine should:

- Process large decision reports efficiently
- Avoid reading file contents
- Validate metadata only
- Continue processing when some items fail validation
- Keep dry-run plans deterministic
- Support future plan comparison
- Support future rollback planning

---

## Future Extensions

Planned future capabilities:

- Real safe action engine
- Multi-step confirmation workflow
- Undo plan generation
- Rollback support
- Quarantine before delete
- Move-to-trash instead of permanent delete
- Scheduled cleanup preview
- Plan diff comparison
- Dependency check system
- Local-only action history learning

---

## Acceptance Criteria

This SPEC is accepted when:

- The module can read decision reports
- The module processes only approved items
- The module revalidates safety before planning
- The module excludes unsafe items
- The module generates a dry-run execution plan
- The module estimates storage impact
- The module marks blocked items clearly
- The module exports JSON
- The module exports Markdown summary
- The module performs no destructive action
