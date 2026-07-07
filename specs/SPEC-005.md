# SPEC-005

# Decision & Approval Engine

Version

0.1

---

## Purpose

Create a decision and approval layer for KAVEEP-SIA.

The engine must validate recommendations before any action is prepared.

It must separate system recommendations from user-approved decisions.

---

## Mission

Receive recommendations

↓

Validate risk

↓

Resolve conflicts

↓

Prepare decision options

↓

Request user approval

↓

Record decision result

---

## Responsibilities

The Decision & Approval Engine must:

- Read recommendation reports
- Validate every recommendation against safety rules
- Detect conflicting recommendations
- Detect protected items
- Detect high-risk items
- Detect unknown-risk items
- Group similar recommendations
- Prioritize recommendations
- Prepare user approval options
- Require explicit user approval
- Record approval results
- Reject unsafe recommendations
- Produce decision reports

---

## Decision Types

The first version should support these decision types:

- approve_for_future_action
- reject
- needs_more_review
- keep_protected
- do_not_touch
- postpone
- ignore_once
- ignore_always

---

## Approval Requirements

The engine must require explicit approval before any future action.

Approval must include:

- Target path or item ID
- Recommendation type
- Risk level
- Suggested action
- User decision
- Timestamp
- Decision reason when provided

No recommendation may become an action without user approval.

---

## Safety Rules

The Decision & Approval Engine must never:

- Delete files
- Move files
- Rename files
- Overwrite files
- Compress files
- Modify file metadata
- Change permissions
- Modify system settings
- Execute cleanup automatically
- Execute scripts
- Run system commands

All outputs are decision records only.

---

## Risk Validation Rules

The engine must block approval for automatic cleanup when an item is:

- In Windows system folders
- In Program Files
- In ProgramData
- In AppData
- In source code repositories
- In active project folders
- In database folders
- A configuration file
- A license file
- An environment file
- A system executable
- Recently modified
- Unknown and located in a risky path

Blocked items may only be marked for manual review or do-not-touch.

---

## Conflict Detection

The engine must detect conflicts such as:

- Same file marked both safe and protected
- Same folder marked for cleanup and do-not-touch
- Duplicate recommendations with different risk levels
- Parent folder approved while child file is protected
- Recommendation contradicts safety rules
- Unknown file recommended for automatic cleanup

Conflicting items must be blocked until resolved.

---

## User Approval Rules

The user must be shown:

- What item is affected
- Why it was recommended
- Risk level
- Possible storage impact
- Whether the action is reversible
- Whether manual review is required
- Clear approve / reject options

Approval must be explicit.

Silence must never count as approval.

Default state must always be no action.

---

## Non-Goals

The first version must NOT:

- Perform actions
- Delete files
- Move files
- Rename files
- Modify files
- Modify folders
- Modify metadata
- Apply recommendations automatically
- Create cleanup jobs
- Execute action queues

---

## Privacy Rules

The engine must:

- Work locally
- Store decision records locally
- Avoid exposing sensitive paths unless detailed reporting is enabled
- Never upload decision data to external services
- Never inspect private file contents

---

## Output

The module must produce:

- JSON decision report
- Markdown decision summary
- Approved-for-future-action list
- Rejected list
- Manual-review list
- Protected list
- Conflict list
- Error log

---

## JSON Report Structure

```json
{
  "generated_at": "",
  "source_recommendation_report": "",
  "summary": {
    "total_items": 0,
    "approved_count": 0,
    "rejected_count": 0,
    "manual_review_count": 0,
    "protected_count": 0,
    "conflict_count": 0
  },
  "decisions": [
    {
      "item_id": "",
      "path": "",
      "recommendation_type": "",
      "risk_level": "",
      "suggested_action": "",
      "decision": "",
      "approved_for_future_action": false,
      "manual_review_required": true,
      "blocked": true,
      "block_reason": "",
      "user_reason": "",
      "decided_at": ""
    }
  ],
  "conflicts": [],
  "protected_items": [],
  "errors": []
}
```

---

## Performance Requirements

The Decision & Approval Engine should:

- Process large recommendation reports efficiently
- Group duplicate recommendations
- Validate risk rules without reading file contents
- Continue processing when some records contain errors
- Keep decision records searchable
- Support future approval history

---

## Future Extensions

Planned future capabilities:

- Approval history database
- User preference memory
- Repeated decision rules
- Bulk approval with safety limits
- Dry-run action preview
- Reversible action planning
- Multi-step confirmation
- Approval expiration
- Role-based approval
- Local-only decision learning

---

## Acceptance Criteria

This SPEC is accepted when:

- The module can read recommendation reports
- The module validates recommendations against safety rules
- The module detects protected items
- The module detects conflicting recommendations
- The module blocks unsafe recommendations
- The module requires explicit user approval
- Silence never counts as approval
- Default state is no action
- The module exports JSON
- The module exports Markdown summary
- The module performs no destructive action
