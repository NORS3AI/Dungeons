# Dungeons - Patch Notes

All notable changes to this project will be documented in this file.

Version format: `v0.0.pX-alpha` where X = phase number

---

## [v0.0.p1-alpha] - 2026-02-01 @ 9:39 AM MST-AZ

### Phase 1: Project Setup & Infrastructure

**Initial Release - Foundation Complete**

#### Project Configuration
- Initialized React 18 + TypeScript project with Vite
- Configured Tailwind CSS with custom D&D theme colors (gold, parchment, blood red, dungeon gray)
- Set up React Router v6 for page-based navigation
- Configured Zustand for state management with localStorage persistence
- Set up Vitest testing framework with jsdom environment
- Added ESLint and TypeScript strict mode

#### Core Type Definitions
- **`src/types/character.ts`** - Complete character interface with:
  - Ability scores (STR, DEX, CON, INT, WIS, CHA)
  - All 18 D&D skills with proficiency tracking
  - HP tracking (current, max, temporary)
  - Death saves, conditions, exhaustion levels
  - Equipment slots and inventory
  - Spell slots (levels 1-9)
  - Features with charge tracking

- **`src/types/race.ts`** - Race system with:
  - Racial traits and ability score bonuses
  - Darkvision and speed modifiers
  - Racial spells by level
  - Complete DROW definition (Superior Darkvision, Sunlight Sensitivity, Drow Magic)
  - Complete TIEFLING definition (Hellish Resistance, Infernal Legacy)

- **`src/types/class.ts`** - Class/Subclass system with:
  - Hit dice, primary abilities, saving throws
  - Proficiencies (armor, weapons, tools, skills)
  - Features by level with charges/resets
  - Spellcasting configuration
  - Complete FIGHTER definition (Second Wind, Action Surge, Extra Attack)
  - Complete WARLOCK definition (Pact Magic, Eldritch Invocations)
  - GREAT_OLD_ONE subclass (Awakened Mind, Entropic Ward, expanded spells)

- **`src/types/spell.ts`** - Spell system with:
  - All spell schools (Abjuration through Transmutation)
  - Casting time, range, components, duration
  - Damage/healing dice, scaling rules
  - Concentration and ritual flags

- **`src/types/equipment.ts`** - Equipment system with:
  - Weapon properties (finesse, heavy, light, two-handed, etc.)
  - Armor types and AC calculations
  - Currency tracking (cp, sp, ep, gp, pp)
  - **Homebrew Weapon Mastery Options:**
    - Two-Handed: 2d6 damage, no AC modifier
    - Dual Two-Handed: 4d6 damage, -4 AC penalty
    - Sword & Board: 1d8 damage, +2 AC (shield)

- **`src/types/dice.ts`** - Dice rolling system with:
  - Support for d3 through d1000
  - Dice notation parser (NdX+M format)
  - Advantage/disadvantage rolling
  - Modifier calculations
  - Roll history tracking
  - `calculateModifier(score)` - floor((score - 10) / 2)
  - `calculateProficiencyBonus(level)` - floor((level - 1) / 4) + 2

#### State Management
- **`src/stores/characterStore.ts`** - Character management with:
  - CRUD operations for characters
  - Multi-step creation wizard tracking
  - Combat state (conditions, death saves)
  - Equipment management
  - Spell slot tracking
  - Feature charge tracking
  - Short rest / Long rest mechanics
  - Undo/redo functionality (10-state history)
  - localStorage persistence

- **`src/stores/campaignStore.ts`** - DM campaign tools with:
  - Party character tracking
  - NPC creation and management
  - Session notes per character
  - Initiative tracker with turn management
  - Combat HP tracking
  - NPC duplication for quick encounters

#### UI Components
- **`src/components/Layout.tsx`** - Main app layout with:
  - Responsive navigation header
  - D&D themed styling (dark background, gold accents)
  - React Router Outlet integration

#### Pages
- **`src/pages/HomePage.tsx`** - Landing page with:
  - Hero section with call-to-action
  - Feature highlights (Character Creator, Campaign Tools, Dice Roller)
  - Navigation to create and campaign pages

- **`src/pages/CharacterCreatePage.tsx`** - Creation wizard placeholder
- **`src/pages/CharacterSheetPage.tsx`** - Character sheet placeholder
- **`src/pages/CampaignPage.tsx`** - DM dashboard placeholder

#### Testing
- **`src/test/setup.ts`** - Vitest configuration
- **`src/test/dice.test.ts`** - Dice system unit tests:
  - Modifier calculation tests
  - Proficiency bonus calculation tests
  - Dice notation parsing tests
  - Roll result validation tests

#### Deployment
- **`.github/workflows/deploy.yml`** - GitHub Actions CI/CD:
  - Automatic deployment on push to `main` or `claude/*` branches
  - Node.js 20 with npm caching
  - Build and deploy to GitHub Pages

- **`public/404.html`** - SPA routing fix for GitHub Pages
- **`public/dice.svg`** - Purple D20 favicon

#### Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration with `/Dungeons/` base path
- `tsconfig.json` - TypeScript configuration
- `tsconfig.node.json` - Node TypeScript configuration
- `tailwind.config.js` - Tailwind with custom theme
- `postcss.config.js` - PostCSS configuration
- `.gitignore` - Git ignore rules

#### Documentation
- `README.md` - Project overview with Play Now links
- `CLAUDE.md` - Development context and 10-phase roadmap

---

## Upcoming Phases

### Phase 2: Character Details Page (Planned)
- Character name, age, height, weight inputs
- Background story/notes field
- Player name for DM tracking
- Tab/Shift+Tab keyboard navigation
- Form validation

### Phase 3: Race Selection Page (Planned)
- Visual race cards
- Racial traits display
- Ability score modifier preview

### Phase 4: Class Selection Page (Planned)
- Visual class cards
- Class features display
- Subclass selection

### Phase 5: Stat Allocation Page (Planned)
- Standard Array method
- Point Buy method
- Roll method (4d6 drop lowest)

### Phase 6: Spell Selection Page (Planned)
- Cantrip selection
- Spell list by level
- Spell slot display

### Phase 7: Equipment Page (Planned)
- Starting equipment packs
- Weapon/armor selection
- Inventory management

### Phase 8: Character Sheet & Review (Planned)
- Complete character display
- Internal linking system
- Edit mode

### Phase 9: DM Tools (Planned)
- Campaign dashboard
- NPC creator UI
- Multi-panel view
- Initiative tracker UI

### Phase 10: Polish & Advanced (Planned)
- User accounts
- Theme system (8 themes)
- Font size controls
- PDF export
- Cloud sync

---

## Version History

| Version | Date | Phase | Description |
|---------|------|-------|-------------|
| v0.0.p1-alpha | 2026-02-01 | 1 | Project Setup & Infrastructure |

---

*This changelog follows [Keep a Changelog](https://keepachangelog.com/) principles.*
