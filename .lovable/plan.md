

## Problem

The screenshot shows a fully expanded record with LL (49.84%) + PL (3 trials) — this is **previously saved data** being restored from `localStorage` (`atterbergProjectState`) and/or the API. Our previous changes only affected newly created records/tests, so existing saved state still has `isExpanded: true` for both records and tests.

## Fix

Normalize hydrated state on load so the user always lands with a clean, collapsed view, while preserving all underlying trial data.

### Changes to `src/components/soil/AtterbergTest.tsx`

**1. Add a small helper near `createRecord` (~line 237):**

```ts
const collapseAllOnLoad = (state: AtterbergProjectState): AtterbergProjectState => ({
  ...state,
  records: state.records.map((record) => ({
    ...record,
    isExpanded: false,
    tests: record.tests.map((test) => ({ ...test, isExpanded: false })),
  })),
});
```

**2. Apply it in the API hydration branch (~line 733-738):**

```ts
if (remoteState) {
  skipNextPersistRef.current = true;
  setProjectState(collapseAllOnLoad(remoteState));
  hydratedRef.current = true;
  return;
}
```

**3. Apply it in the localStorage hydration branch (~line 748-752):**

```ts
const parsed = normalizeAtterbergProjectState(JSON.parse(saved));
if (parsed) {
  skipNextPersistRef.current = true;
  setProjectState(collapseAllOnLoad(parsed));
}
```

### Why this works

- Underlying trial values are untouched — the user keeps all their saved data.
- Every page entry now starts with **only Project Details visible**, all records collapsed, all tests inside collapsed.
- The new sequential expansion logic (already in place from the prior change) takes over the moment the user expands a record and adds/selects tests.
- No need to clear localStorage manually; the next save will rewrite the persisted state with `isExpanded: false` everywhere.

### Files modified

- `src/components/soil/AtterbergTest.tsx` (one helper + two one-line wraps in the hydration effect)

No API, calculation, or schema changes.

