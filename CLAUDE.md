# Claude.md - Project Context for AI Assistance

## Project Overview

**Dungeons** is a D&D 5th Edition character creation tool focused on simplicity and fun. The goal is "click and create" - users should be able to build a complete, playable character with minimal effort.

## Current Development Phase

We are in **Phase 1: Foundation** - building out the first two class/race combinations:

1. **Fighter (Ranger subclass) + Drow** - Primary focus
2. **Warlock (Great Old One subclass) + Tiefling** - Secondary focus

## Architecture Decisions

- **Data-driven design**: Classes, races, spells, and equipment are defined in JSON files
- **Composition over inheritance**: Character features are composable modifiers
- **Offline-first**: Works without internet, syncs when available
- **Accessibility**: WCAG 2.1 AA compliance target

## Key Concepts

### Character Building Flow
1. Choose Race → 2. Choose Class → 3. Choose Subclass → 4. Allocate Stats → 5. Select Skills → 6. Choose Equipment → 7. Review & Export

### Stat Calculation
- Base stats from allocation method (standard array, point buy, or rolled)
- Racial bonuses applied automatically
- Modifiers calculated: `floor((stat - 10) / 2)`

### Fighter - Ranger Subclass
Despite the name similarity to the Ranger class, the Fighter's "Ranger" archetype (if using homebrew or specific campaign rules) focuses on:
- Martial prowess with ranged/melee flexibility
- Survival and tracking abilities
- Natural terrain advantages

*Note: If this refers to the official "Champion" or custom subclass, clarify with user.*

### Warlock - Great Old One Patron
Eldritch-themed warlock with psychic abilities:
- **Expanded Spells**: Dissonant Whispers, Tasha's Hideous Laughter, Detect Thoughts, Phantasmal Force, Clairvoyance, Sending, Dominate Beast, Evard's Black Tentacles, Dominate Person, Telekinesis
- **Awakened Mind** (1st): Telepathic communication 30ft
- **Entropic Ward** (6th): Reaction to impose disadvantage, gain advantage on miss
- **Thought Shield** (10th): Psychic resistance, unreadable thoughts
- **Create Thrall** (14th): Charm humanoid indefinitely

### Drow Racial Traits
- +2 DEX, +1 CHA
- Superior Darkvision (120 ft)
- Sunlight Sensitivity (disadvantage in direct sunlight)
- Drow Magic: Dancing Lights (cantrip), Faerie Fire (3rd level), Darkness (5th level)
- Drow Weapon Training: rapiers, shortswords, hand crossbows
- Fey Ancestry: Advantage vs charm, immune to magical sleep
- Trance: 4 hours meditation instead of 8 hours sleep

### Tiefling Racial Traits
- +2 CHA, +1 INT (Asmodeus bloodline - default)
- Darkvision (60 ft)
- Hellish Resistance: Fire resistance
- Infernal Legacy: Thaumaturgy (cantrip), Hellish Rebuke (3rd level, 2nd-level slot), Darkness (5th level)

## TODO List

### Phase 1: Foundation (Current)

#### Data Layer
- [ ] Create `src/data/classes/fighter.json` with base class features
- [ ] Create `src/data/classes/fighter-ranger.json` with subclass features
- [ ] Create `src/data/classes/warlock.json` with base class features
- [ ] Create `src/data/classes/warlock-great-old-one.json` with patron features
- [ ] Create `src/data/races/drow.json` with racial traits
- [ ] Create `src/data/races/tiefling.json` with racial traits and bloodlines
- [ ] Create `src/data/spells/warlock-spells.json` for Warlock spell list
- [ ] Create `src/data/spells/great-old-one-expanded.json` for patron spells
- [ ] Create `src/data/equipment/fighter-starting.json` for equipment packs
- [ ] Create `src/data/equipment/warlock-starting.json` for equipment packs

#### Type Definitions
- [ ] Define `Character` interface in `src/types/character.ts`
- [ ] Define `Race` interface in `src/types/race.ts`
- [ ] Define `Class` and `Subclass` interfaces in `src/types/class.ts`
- [ ] Define `Spell` interface in `src/types/spell.ts`
- [ ] Define `Equipment` interface in `src/types/equipment.ts`
- [ ] Define `Feature` and `Trait` interfaces in `src/types/features.ts`

#### Core Components
- [ ] Build `RaceSelector` component with Drow/Tiefling cards
- [ ] Build `ClassSelector` component with Fighter/Warlock cards
- [ ] Build `SubclassSelector` component (unlocks at appropriate level)
- [ ] Build `StatAllocator` component with three allocation methods
- [ ] Build `SkillPicker` component with proficiency tracking
- [ ] Build `EquipmentSelector` component with pack options
- [ ] Build `CharacterSheet` display component
- [ ] Build `CharacterSummary` review component

#### State Management
- [ ] Create `useCharacterStore` with Zustand
- [ ] Implement stat calculation logic
- [ ] Implement proficiency tracking
- [ ] Implement feature/trait application system
- [ ] Add undo/redo functionality

#### Utilities
- [ ] Create `calculateModifier(stat: number)` function
- [ ] Create `calculateProficiencyBonus(level: number)` function
- [ ] Create `applyRacialBonuses(stats, race)` function
- [ ] Create `getAvailableSkills(class, race, background)` function

### Phase 2: Polish

- [ ] Add character portrait/avatar selection
- [ ] Implement PDF export for character sheets
- [ ] Add JSON import/export for characters
- [ ] Create preset "quick build" options
- [ ] Add tooltips explaining each choice
- [ ] Implement dark mode toggle
- [ ] Add dice rolling animations

### Phase 3: Expansion

- [ ] Add more Fighter subclasses (Champion, Battle Master, Eldritch Knight)
- [ ] Add more Warlock subclasses (Fiend, Archfey, Hexblade)
- [ ] Add more races (Human, Elf variants, Half-Elf, Half-Orc)
- [ ] Implement multiclassing rules
- [ ] Add background selection system
- [ ] Create feat selection interface
- [ ] Add spell preparation/known management

### Phase 4: Advanced Features

- [ ] Character leveling system (level up flow)
- [ ] Party management (multiple characters)
- [ ] Campaign integration hooks
- [ ] Homebrew content import system
- [ ] Community sharing features

## Code Style Guidelines

- Use TypeScript strict mode
- Prefer functional components with hooks
- Keep components small and focused
- Use descriptive variable names (no abbreviations)
- Comment complex game rule calculations
- Write unit tests for all calculation utilities

## Common Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run test         # Run test suite
npm run lint         # Check code style
npm run type-check   # Verify TypeScript types
```

## Resources

- [D&D 5e SRD](https://www.dndbeyond.com/sources/basic-rules) - Official rules reference
- [5e.tools](https://5e.tools/) - Community rules database
- Player's Handbook - Primary source for class/race details

## Notes for Claude

When working on this project:
1. Always validate against 5e rules when implementing features
2. Prioritize user experience - minimize clicks, maximize fun
3. Keep accessibility in mind for all UI components
4. Test calculations thoroughly - D&D math must be accurate
5. When in doubt about subclass specifics, ask for clarification
