# Quick Reference System Refactoring

## Current State
The `quickReference.ts` file is **6,723 lines** and contains all reference data for tooltips and popups throughout the app.

## File Size Breakdown
- **Lines 1-117**: Type definitions and SOURCE_BOOKS (118 lines)
- **Lines 118-4,058**: SPELLS - **3,940 lines** (59% of file)
- **Lines 4,059-4,188**: SKILLS - 129 lines
- **Lines 4,189-4,240**: ABILITIES - 51 lines
- **Lines 4,241-4,628**: WEAPONS - 387 lines
- **Lines 4,629-4,694**: ARMOR - 65 lines
- **Lines 4,695-4,885**: CONDITIONS - 190 lines
- **Lines 4,886-5,986**: TRAITS - **1,100 lines** (16% of file)
- **Lines 5,987-6,723**: RULES - 736 lines

## Refactoring Strategy

### Phase 1: Foundation (COMPLETED)
- ✅ Created `references/types.ts` with all interface definitions
- ✅ Documented refactoring plan

### Phase 2: Split by Category (TODO)
Create separate files for each major category:

1. **`references/spells.ts`** (3,940 lines)
   - Export `SPELLS` Record
   - Largest section, biggest win for splitting

2. **`references/traits.ts`** (1,100 lines)
   - Export `TRAITS` Record
   - Class and race-specific traits

3. **`references/rules.ts`** (736 lines)
   - Export `RULES` Record
   - Game mechanics and rule references

4. **`references/common.ts`** (820 lines)
   - Export `SKILLS`, `ABILITIES`, `WEAPONS`, `ARMOR`, `CONDITIONS`
   - General game content

### Phase 3: Update Main File
Update `quickReference.ts` to:
```typescript
// Re-export types
export * from './references/types'

// Re-export data
export { SPELLS } from './references/spells'
export { TRAITS } from './references/traits'
export { RULES } from './references/rules'
export { SKILLS, ABILITIES, WEAPONS, ARMOR, CONDITIONS } from './references/common'
```

This maintains backward compatibility - all existing imports continue to work.

### Phase 4: Future Optimization (Optional)
Once Phase 2-3 are complete, consider further splits:

- **`references/spells/cantrips.ts`**
- **`references/spells/level-1.ts`** through **`level-9.ts`**
- **`references/traits/fighter.ts`**, **`warlock.ts`**, etc.
- **`references/traits/drow.ts`**, **`tiefling.ts`**, etc.

This would enable dynamic imports based on character class/race, loading only needed references.

## Benefits
1. **Maintainability**: Easier to find and update specific references
2. **Performance**: Potential for lazy loading of references
3. **Organization**: Logical grouping by content type
4. **Collaboration**: Multiple developers can work on different reference files
5. **Bundle Size**: Tree-shaking can remove unused references

## Implementation Notes
- All exports must remain identical to maintain backward compatibility
- Test QuickRefTooltip component after refactoring
- Update imports only in `quickReference.ts`, not throughout the codebase
- Run full build and test suite after each phase

## Estimated Impact
- Main file reduced from 6,723 → ~50 lines (98% reduction)
- Four new organized files instead of one monolithic file
- No breaking changes to existing code
