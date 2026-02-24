# Quick Reference System - Granular Architecture

## Current Structure (COMPLETED ✅)

The reference system has been fully refactored into a granular, modular architecture:

### Core Files
- **`types.ts`** (118 lines) - All TypeScript interface definitions
- **`index.ts`** (20 lines) - Central export hub for all modules

### Game Content Modules
- **`spells.ts`** (3,947 lines) - Complete spell database (cantrips → 9th level)
- **`traits.ts`** (1,107 lines) - Racial and class trait references
- **`rules.ts`** (703 lines) - Game mechanics and rules
- **`skills.ts`** (135 lines) - All 18 D&D skills
- **`abilities.ts`** (57 lines) - The six core abilities (STR, DEX, CON, INT, WIS, CHA)
- **`weapons.ts`** (393 lines) - Simple and martial weapons
- **`armor.ts`** (71 lines) - Light, medium, heavy armor and shields
- **`conditions.ts`** (195 lines) - Status effects and conditions

### Main Entry Point
- **`quickReference.ts`** (52 lines) - Re-exports everything + helper functions

## File Size Comparison

**Before Refactoring:**
- Single file: 6,723 lines

**After Refactoring:**
- Main file: 52 lines (99.2% reduction!)
- 9 organized modules: 6,746 lines total
- Central index: 20 lines

## Benefits Achieved

### ✅ Maintainability
- **99.2% reduction** in main file complexity
- Each module is self-contained and focused
- Easy to find and update specific content

### ✅ Organization
- Logical grouping by game content type
- Clear separation of concerns
- Consistent file naming convention

### ✅ Performance Foundation
- Ready for lazy loading by race/class
- Tree-shaking can remove unused references
- Smaller bundle chunks possible with dynamic imports

### ✅ Collaboration
- Multiple developers can work on different modules
- Minimal merge conflicts
- Clear ownership of content areas

## Import Patterns

### From Application Code
```typescript
// Import from main entry point (recommended)
import { SPELLS, SKILLS, ABILITIES } from '@/data/quickReference'

// Or import directly from index (also works)
import { SPELLS, SKILLS } from '@/data/references'

// Or import from specific modules (advanced)
import { SKILLS } from '@/data/references/skills'
import { WEAPONS } from '@/data/references/weapons'
```

### Within Reference System
```typescript
// Import types
import type { SpellRef, SkillRef } from './types'

// Import constants (if needed)
import { SOURCE_BOOKS } from './types'
```

## Future Optimization Opportunities

### Phase 1: Split by Class/Race (Optional)
Further split large files for per-character lazy loading:

**Spells:**
- `spells/warlock.ts` - Warlock-specific spells
- `spells/wizard.ts` - Wizard spells
- `spells/cleric.ts` - Cleric spells
- `spells/common.ts` - Shared spells

**Traits:**
- `traits/races/drow.ts` - Drow racial traits
- `traits/races/tiefling.ts` - Tiefling traits
- `traits/classes/fighter.ts` - Fighter class features
- `traits/classes/warlock.ts` - Warlock features

### Phase 2: Dynamic Imports (Future)
```typescript
// Load only what's needed
const loadCharacterReferences = async (race: string, classId: string) => {
  const [raceTraits, classTraits, classSpells] = await Promise.all([
    import(`./traits/races/${race}.ts`),
    import(`./traits/classes/${classId}.ts`),
    import(`./spells/${classId}.ts`)
  ])
  return { raceTraits, classTraits, classSpells }
}
```

### Phase 3: Bundle Splitting
Configure Vite to split references into separate chunks:
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'references-game': ['./src/data/references/skills.ts', './src/data/references/abilities.ts'],
        'references-spells': ['./src/data/references/spells.ts'],
        'references-traits': ['./src/data/references/traits.ts']
      }
    }
  }
}
```

## Testing

All references are fully backward compatible. No changes required to consuming code.

```bash
# Verify everything works
npm run build
npm run test  # if tests exist
```

## Maintenance Notes

### Adding New Content
1. Add data to the appropriate module file
2. Follow existing TypeScript interfaces
3. Maintain alphabetical ordering within sections
4. Include source book references where applicable

### Creating New Modules
1. Create file in `src/data/references/`
2. Import appropriate types from `./types`
3. Export the data constant
4. Add export to `index.ts`
5. Update `quickReference.ts` if adding new type

### Performance Monitoring
Current bundle size: ~2.48 MB (gzipped: ~666 KB)
- Spells: ~190 KB (largest)
- Traits: ~73 KB
- Rules: ~43 KB
- Other modules: <20 KB each

## Success Metrics

✅ **File organization**: 1 monolith → 11 focused modules
✅ **Main file complexity**: 6,723 lines → 52 lines (99.2% reduction)
✅ **Backward compatibility**: 100% (no breaking changes)
✅ **Build status**: Passing with no TypeScript errors
✅ **Module cohesion**: Each file has single responsibility
✅ **Import simplicity**: Central index maintains clean API

---

**Refactoring completed**: February 24, 2026
**Status**: ✅ Production-ready
