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

## [v0.0.p2-alpha] - 2026-02-01 @ 9:46 AM MST-AZ

### Phase 2: Character Details Page

**Character Creation Wizard - Step 1 Complete**

#### New Components
- **`src/components/CharacterDetailsForm.tsx`** - Full character details form with:
  - Character Name input (required, 2-50 characters)
  - Age input with numeric validation
  - Height input (free text, e.g., "5'10\"")
  - Weight input (free text, e.g., "150 lbs")
  - Player Name input (for DM tracking)
  - Backstory/Notes textarea (up to 5000 characters with counter)
  - Full ARIA accessibility attributes
  - Real-time validation with error messages

- **`src/components/WizardSteps.tsx`** - Progress indicator with:
  - Desktop view: Horizontal step indicators with checkmarks
  - Mobile view: Compact progress bar with step counter
  - Clickable navigation to completed steps
  - 7-step character creation flow defined
  - Visual states: pending, current, completed

#### Keyboard Navigation
- **Tab** to move forward through fields
- **Shift+Tab** to move backward
- **Enter** to advance to next field (on text inputs)
- Auto-focus on first input when page loads
- Keyboard shortcuts hint displayed at bottom

#### Form Validation
- Required field indication with red asterisk
- Real-time validation on blur
- Error messages with ARIA alerts for screen readers
- Next button disabled until required fields valid
- Character limits with visual feedback

#### Updated Pages
- **`src/pages/CharacterCreatePage.tsx`** - Complete wizard implementation:
  - WizardSteps progress indicator at top
  - Step-by-step flow with Back/Next navigation
  - Details form integrated with characterStore
  - Placeholder pages for steps 2-6 (Race, Class, Stats, Spells, Equipment)
  - Review page shows character summary
  - Save Character button on final step
  - Navigate to character sheet after save

#### Store Integration
- Form data syncs with `useCharacterStore`
- Character details persisted on navigation
- Undo/redo history maintained
- Auto-create new character on page load if none exists

---

## [v0.0.p3-alpha] - 2026-02-01 @ 10:04 AM MST-AZ

### Phase 3: Race Selection Page

**Character Creation Wizard - Step 2 Complete**

#### New Components
- **`src/components/RaceCard.tsx`** - Visual race card with:
  - Race name and size display
  - Description preview (2-line clamp)
  - Ability bonus badges (+2 DEX, +1 CHA format)
  - Speed and vision quick stats
  - Languages list
  - Selected state with gold border and checkmark
  - Full keyboard accessibility (Tab navigation, aria-pressed)

- **`src/components/RaceSelector.tsx`** - Race selection page with:
  - Grid layout for race cards (responsive 1-2 columns)
  - Available races: Drow, Tiefling
  - "Coming soon" placeholder for future races
  - Detailed trait panel on selection

#### Race Details Panel (on selection)
- **Ability Score Increases** - Visual display with ability name and bonus
- **Racial Traits** - Full description for each trait
- **Innate Spellcasting** - Spell list with level requirements and uses/day
- **Weapon Proficiencies** - List of racial weapon proficiencies
- **Damage Resistances** - Highlighted resistance badges
- **Quick Stats Grid** - Size, Speed, Vision Range, Languages count

#### Available Races
- **Drow** - +2 DEX, +1 CHA, Superior Darkvision 120ft
  - Traits: Fey Ancestry, Trance, Sunlight Sensitivity
  - Spells: Dancing Lights (1), Faerie Fire (3), Darkness (5)
  - Proficiencies: Rapier, Shortsword, Hand Crossbow

- **Tiefling** - +2 CHA, +1 INT, Darkvision 60ft
  - Traits: Hellish Resistance (fire)
  - Spells: Thaumaturgy (1), Hellish Rebuke (3), Darkness (5)

#### Updated Pages
- **`src/pages/CharacterCreatePage.tsx`** - Race step integration:
  - RaceSelector component replaces placeholder
  - Race selection saved to characterStore via setRace()
  - Preserves selected race when navigating back
  - Review page now displays selected race name

#### Store Integration
- Race selection persisted via `setRace()` action
- Undo/redo history tracks race changes
- Race displayed in Review step summary

---

## [v0.0.p4-alpha] - 2026-02-01 @ 10:12 AM MST-AZ

### Phase 4: Class Selection Page

**Character Creation Wizard - Step 3 Complete**

#### New Components
- **`src/components/ClassCard.tsx`** - Visual class card with:
  - Class name, hit die, primary ability display
  - Description preview
  - Spellcasting type badge (Martial, Pact Magic, etc.)
  - Armor/weapon proficiency previews
  - Saving throw indicators
  - Subclass level display

- **`src/components/ClassSelector.tsx`** - Class selection page with:
  - Grid layout for class cards
  - Detailed class features panel on selection
  - Primary stats overview (Hit Die, Primary Ability, Saves)
  - Proficiencies display (Armor, Weapons)
  - Skill choices list
  - Level 1 features with charge information
  - Fighting Styles (for Fighter)
  - **Subclass selection** (required for Warlock at level 1)

#### Available Classes
- **Fighter** - d10, STR/DEX primary, Martial
  - Features: Fighting Style, Second Wind (1/short rest)
  - 6 Fighting Style options
  - Subclass at level 3 (Martial Archetype)

- **Warlock** - d8, CHA primary, Pact Magic
  - Features: Pact Magic (short rest spell slots)
  - 2 cantrips, 2 spells known at level 1
  - Subclass at level 1 (Otherworldly Patron)
  - **Great Old One** subclass implemented:
    - Awakened Mind (telepathy 30ft)
    - Expanded spells: Dissonant Whispers, Tasha's Hideous Laughter

---

## [v0.0.p5-alpha] - 2026-02-01 @ 10:12 AM MST-AZ

### Phase 5: Stat Allocation Page

**Character Creation Wizard - Step 4 Complete**

#### New Component
- **`src/components/StatAllocator.tsx`** - Full ability score allocation with:
  - **Three allocation methods** via toggle buttons
  - Racial bonus integration and display
  - Real-time modifier calculations
  - Final score summary with modifiers

#### Standard Array Method
- Fixed values: 15, 14, 13, 12, 10, 8
- Dropdown selectors for each ability
- Track available values
- Prevent duplicate assignments

#### Point Buy Method
- 27 points total to distribute
- Score range: 8-15
- Point cost reference table (8=0, 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9)
- +/- buttons with validation
- Points remaining counter
- Real-time cost display per ability

#### Roll Method (4d6 Drop Lowest)
- "Roll All" button generates 6 scores
- Each score: roll 4d6, drop lowest die
- Assign rolled values to abilities
- Scores sorted high to low
- Handle duplicate values correctly

#### Integration
- Racial bonuses auto-applied from selected race
- Final scores = Base + Racial Bonus
- Modifiers shown: floor((score - 10) / 2)
- Results saved to characterStore via `setAbilityScores()`

---

## [v0.0.p6-alpha] - 2026-02-01 @ 10:12 AM MST-AZ

### Phase 6: Spell Selection Page

**Character Creation Wizard - Step 5 Complete**

#### New Components
- **`src/components/SpellCard.tsx`** - Visual spell card with:
  - Spell name and school badge (color-coded)
  - Level indicator (Cantrip, 1st Level, etc.)
  - Description preview (2-line clamp)
  - Casting time, range, components display
  - Concentration/Ritual badges
  - Damage dice and type (if applicable)
  - Selected state with checkmark

- **`src/components/SpellSelector.tsx`** - Spell selection page with:
  - Separate sections for Cantrips and 1st Level spells
  - Selection counter (X / Y selected)
  - Class-based spell filtering
  - Subclass expanded spells support
  - Pact Magic information display
  - Selected spells summary panel
  - Non-spellcaster skip option (for Fighter)

#### Available Warlock Cantrips (5)
- Eldritch Blast, Chill Touch, Minor Illusion, Prestidigitation, Mage Hand

#### Available Warlock 1st Level Spells (5)
- Hex, Armor of Agathys, Hellish Rebuke, Charm Person, Witch Bolt

#### Great Old One Expanded Spells (2)
- Dissonant Whispers, Tasha's Hideous Laughter
- Marked with "Expanded" badge

#### Spell Data Structure
- Full spell properties: school, casting time, range, components, duration
- Damage/healing dice with scaling
- Saving throw effects
- Attack roll indicator
- Concentration and ritual flags

#### Updated Review Page
- Ability scores displayed with modifiers
- Known spells listed
- Subclass shown with class
- Improved summary layout

---

## Upcoming Phases

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
| v0.0.p6-alpha | 2026-02-01 | 6 | Spell Selection Page |
| v0.0.p5-alpha | 2026-02-01 | 5 | Stat Allocation Page |
| v0.0.p4-alpha | 2026-02-01 | 4 | Class Selection Page |
| v0.0.p3-alpha | 2026-02-01 | 3 | Race Selection Page |
| v0.0.p2-alpha | 2026-02-01 | 2 | Character Details Page |
| v0.0.p1-alpha | 2026-02-01 | 1 | Project Setup & Infrastructure |

---

*This changelog follows [Keep a Changelog](https://keepachangelog.com/) principles.*
