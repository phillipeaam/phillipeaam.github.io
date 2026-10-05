# Data Quality Checklist: Shared Project Records

**Purpose**: Review whether project-record and migration requirements are complete and clear before implementation  
**Created**: 2026-10-05  
**Feature**: [spec.md](../spec.md)

**Review Ownership**: This checklist is a reviewer-owned requirements-quality review artifact. Mark an item `[x]` only when the reviewer determines the requirement-quality criterion is satisfied.  
**Marker Semantics**: `[x]` means the requirement has been reviewed and is sufficiently specified; it does not mean the implementation is complete.

## Record Completeness

- [x] CHK001 Does the specification require one stable canonical record identity for each current project, including deferred entries? [Completeness, Spec §FR-001]
- [x] CHK002 Does the model cover shared facts, optional content, media, actions, and independent placement choices? [Coverage, Spec §FR-002, FR-007]
- [x] CHK003 Does every named portfolio consumer use canonical shared project data? [Consistency, Spec §FR-003]
- [x] CHK004 Are optional field omission and visitor-facing defaults or omissions explicit? [Clarity, Spec §FR-004]

## Publication and Action Rules

- [x] CHK005 Is missing or false inclusion consistently treated as unpublished? [Consistency, Spec §FR-005]
- [x] CHK006 Does the exclusion rule cover project blocks, actions, direct case routes, and next-project links, with only experience names allowed as plain text? [Coverage, Spec §FR-006]
- [x] CHK007 Does the case-study CTA require both a declared destination and matching content? [Clarity, Spec §FR-008]
- [x] CHK008 Are other actions independent of case-study availability and rendered only with declared destinations? [Completeness, Spec §FR-009]

## Migration, Media, and Identity

- [x] CHK009 Are case-only narrative and evidence grouped under an optional nested case-study area while shared facts remain fields on the same record? [Consistency, Spec §FR-010]
- [x] CHK010 Are static fallback, animation activation, failure, and reduced-motion behaviors specified? [Edge Cases, Spec §FR-011, FR-013]
- [x] CHK011 Must referenced media assets exist, and does the spec call out detecting broken references? [Coverage, Spec §FR-012]
- [x] CHK012 Are current content, placements, order, URLs, and anchors protected through migration? [Completeness, Spec §FR-014]

## Acceptance and Boundaries

- [x] CHK013 Can each success criterion be checked through data inspection, rendering, or route/network review? [Measurability, Spec §Success Criteria]
- [x] CHK014 Do scenarios cover shared-field propagation, visibility, action availability, media, and future record authoring? [Coverage, Spec §User Scenarios]
- [x] CHK015 Does the authoring guide requirement describe fields, relationships, optional/default behavior, and safe extension? [Completeness, Spec §FR-015]
- [x] CHK016 Are existing presentation and responsive/accessibility expectations retained without turning the feature into a redesign? [Scope, Spec §FR-014, Assumptions]

## Notes

- Review the requirements themselves; do not use this checklist as an implementation test plan.
- Items are marked after reviewer evaluation of requirements clarity and completeness; this is not an implementation completion checklist.
- The built-in `requirements.md` checklist has a separate lifecycle maintained by `$speckit-specify` and `$speckit-clarify`.
- The clarification about per-project static image selection and explicit Play activation was not answered; those behaviors are documented as working assumptions in `spec.md`.
