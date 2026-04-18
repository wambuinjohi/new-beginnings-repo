

## Plan: Clean Slate for New Projects + Move Project Header Into Sections

Four user-visible changes, all in the Atterberg flow.

### 1. New project = no overview stats showing data (image 1)

The Project Metadata overview (Records: 1, Completed Tests: 3, Avg PI: 3.73%, Status: Completed) shows non-zero numbers because a record + tests are auto-created. Once we stop auto-creating records (#2) and tests (#3), these tiles naturally show `0` / `-`. No code change to the tile component itself — they're already derived from `computedRecords`.

### 2. New project = no default record card (image 2)

**File:** `src/components/soil/AtterbergTest.tsx`

- **Initial state (line 680-682):** change initial state to always `{ records: [] }` — drop the `project.currentProjectId ? [createRecord(0)] : []` branch.
- **Auto-init effect (lines 803-830):** delete the entire `useEffect` block that calls `setProjectState(... [createRecord(0)])` when no records exist after hydration. Records should only be created when the user clicks **Add Record**.
- The empty state UI at lines 1804-1807 ("No records yet. Add a record to begin…") already handles this gracefully.

### 3. New record = no Plastic Limit / Linear Shrinkage tests by default (image 3)

`createRecord` (line 229-237) already returns `tests: []`. The pre-filled "Plastic Limit 1" + "Linear Shrinkage 1" cards in image 3 come from saved state from prior sessions where defaults were seeded.

**File:** `src/components/soil/AtterbergTest.tsx`

- **Remove `createDefaultRecord`** (lines 249-368) entirely — confirms no path can seed default tests.
- **Hydration cleanup:** in `collapseAllOnLoad` (line 239), if a hydrated record's tests list contains tests with **zero entered data** (no started trials), drop them. This wipes the pre-seeded Plastic Limit / Linear Shrinkage cards from previously-saved state on next load, while preserving any test where the user has actually typed values. Use existing `isLiquidLimitTrialStarted`, `isPlasticLimitTrialStarted`, `isShrinkageLimitTrialStarted` helpers (already imported in `AtterbergTestCard`; we'll import them here too from `@/lib/atterbergCalculations`).
- After this filter, if a record ends up with `tests: []`, that's fine — the user adds tests via the dropdown.

### 4. Move "Project Name / Client Name / Date / History" inside the test section (image 4)

**Files:**
- `src/pages/Index.tsx` — remove the `<ProjectHeader … />` render at lines 150-162 from above the tabs.
- `src/components/soil/AtterbergTest.tsx` — render `<ProjectHeader>` at the top of the children passed to `<TestSection>` (just before the overview metrics card at line 1730). Wire its props from the `useProject()` context plus existing handlers exposed via context or new lightweight ones.

Because `<TestSection>` only renders children when its accordion is `open` (line 236 in `TestSection.tsx`), the project header will automatically appear only when **Atterberg Limits Testing** is expanded — exactly the behaviour requested.

Props plumbing for `ProjectHeader`:
- `projectName`, `clientName`, `date` come from `useProject()`.
- `projectHistory`, `isLoadingProjects`, `projectMetadata`, `onProjectNameChange`, `onClientNameChange`, `onLoadProject`, `onStartNewProject`, `onMetadataChange` are currently held in `Index.tsx` state. Lift them into the existing `ProjectContext` (extend the context value to include these handlers + history list) and consume them inside `AtterbergTest`. This keeps `Index.tsx` as the single source of truth for project state while letting individual test sections render the header.

Other test sections (Concrete, Rock, Special) keep working unchanged since the header is no longer at the page level — but per the user's request it only needs to live inside Atterberg ("when atterberg test is expanded"). If the user later wants it inside other sections too, we add the same one-liner there.

### Files modified

1. `src/components/soil/AtterbergTest.tsx` — empty initial state, remove auto-init effect, remove `createDefaultRecord`, prune empty saved tests on load, render `<ProjectHeader>` inside the section.
2. `src/pages/Index.tsx` — stop rendering `<ProjectHeader>` above the tabs; pass its state/handlers via context.
3. `src/context/ProjectContext.tsx` — extend context with project history, metadata, and the change/load/new-project/metadata handlers.

No backend, schema, calculation, or export-layout changes.

