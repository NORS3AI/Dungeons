# Claude.md - Project Context for AI Assistance

## Project Overview

**Dungeons** is a browser-based D&D 5th Edition (2024) DM tool and character creation system. The goal is "click and create" - users should be able to build complete, playable characters with minimal effort while DMs can manage entire campaigns from a single interface.

### Core Vision
- **Simple character creation** with intuitive page-by-page flow
- **Full keyboard navigation** (Tab/Shift+Tab support throughout)
- **DM Campaign Management** - track all party characters in one place
- **Instant access** to character sheets, spells, and skills via internal links
- **Comprehensive dice rolling** with modifier support

## Target Ruleset

**D&D 5th Edition 2024 Player's Handbook** - All classes and races will eventually be supported.

### Initial Development Focus
1. **Fighter (Ranger subclass) + Drow** - Primary focus
2. **Warlock (Great Old One subclass) + Tiefling** - Secondary focus

## Architecture Decisions

- **Browser-based**: Pure web application, works in all modern browsers
- **Data-driven design**: Classes, races, spells, and equipment defined in JSON files
- **Page-based flow**: Each major choice is its own page/view
- **Keyboard-first**: Full Tab/Shift+Tab navigation, Enter to confirm
- **Offline-capable**: Works without internet, syncs when available
- **Accessibility**: WCAG 2.1 AA compliance target

## Character Creation Flow

### Page 1: Character Details
Text input fields with Tab/Shift+Tab navigation:
- Character Name (required)
- Age
- Height
- Weight
- Background story / Notes
- Player Name (for DM tracking)

**Navigation**: Next button enabled when required fields complete

### Page 2: Race/Species Selection
- Visual cards for each race
- Racial traits displayed on selection
- Ability score modifications shown
- Special abilities highlighted

### Page 3: Class Selection
- Visual cards for each class
- Hit die, primary abilities shown
- Saving throw proficiencies displayed
- Subclass selection (where applicable)

### Page 4: Stat Allocation
Three methods:
- **Standard Array**: 15, 14, 13, 12, 10, 8
- **Point Buy**: 27 points to distribute
- **Roll**: 4d6 drop lowest (with dice animation)

Racial bonuses applied automatically.

### Page 5: Spell Selection (if applicable)
- Cantrips selection
- Known spells / Prepared spells
- Spell slots display
- Patron/Domain expanded spells (auto-added)

### Page 6: Equipment & Inventory
- Starting equipment packs
- Weapon selection
- Armor selection
- Additional trinkets/items

### Page 7: Review & Finalize
- Complete character sheet preview
- Edit buttons to return to any section
- Save / Export options

## Core Systems

### Dice Rolling System
Full-featured dice roller supporting:
- **Any dice combination**: d4, d6, d8, d10, d12, d20, d100
- **Multiple dice**: 12d10, 4d6, 2d20 (advantage/disadvantage)
- **Modifiers**: Automatically apply character modifiers
- **Roll history**: Track recent rolls
- **Syntax**: `NdX+M` format (e.g., `2d6+3`, `1d20+5`)

Example rolls:
```
Attack Roll: 1d20 + DEX modifier + proficiency
Damage Roll: 2d6 + STR modifier
Fireball: 8d6 (no modifier)
```

### Inventory System
Track character possessions:

**Currency** (tracked per day/session):
- Copper pieces (cp)
- Silver pieces (sp)
- Gold pieces (gp)
- Electrum pieces (ep)
- Platinum pieces (pp)

**Equipment Categories**:
- Weapons (with attack/damage stats)
- Armor (with AC calculations)
- Adventuring gear
- Tools
- Trinkets & misc items

**Weight tracking** (optional, for encumbrance rules)

### Stat Calculation
- Base stats from allocation method
- Racial bonuses applied automatically
- Modifiers calculated: `floor((stat - 10) / 2)`
- Proficiency bonus by level: `floor((level - 1) / 4) + 2`

## DM Campaign Management

### Party Overview
- View all characters in a campaign
- Quick-access character cards
- Health/status tracking
- Initiative order management

### Character Sheet Access & Editing
- One-click to open any character's full sheet
- **DM Edit Mode** for real-time adjustments:
  - Modify current/max HP
  - Add/remove conditions (poisoned, stunned, etc.)
  - Adjust temporary HP, death saves
- **Charge/Token Tracking**:
  - Visual tokens for limited-use abilities
  - Track spell slots used/remaining
  - Track class features (Action Surge, Second Wind, etc.)
  - Automatic reset on short/long rest
  - Manual override for DM adjustments
- Session notes per character

### NPC Creator
Full NPC creation system similar to character creation:

**Basic Info:**
- NPC Name
- NPC Type (humanoid, beast, undead, fiend, etc.)
- Race (if applicable)
- Alignment
- Challenge Rating (CR)

**Combat Stats:**
- Armor Class (with armor type)
- Hit Points (dice formula: e.g., 4d8+8)
- Speed (walk, fly, swim, climb, burrow)
- Ability Scores (STR, DEX, CON, INT, WIS, CHA)

**Class Features (optional):**
- Class and Level (for classed NPCs)
- Spell Slots by level
- Spells Known/Prepared
- Class abilities

**Actions & Abilities:**
- Actions (attacks, special abilities)
- Bonus Actions
- Reactions
- Legendary Actions (if applicable)
- Lair Actions (if applicable)

**Additional:**
- Skills and Saving Throw proficiencies
- Damage resistances/immunities/vulnerabilities
- Condition immunities
- Senses (darkvision, blindsight, etc.)
- Languages
- Equipment/Loot
- Notes/Description

### Multi-Panel View System
Run encounters with multiple sheets visible simultaneously:

**Panel Layout Options:**
- Side-by-side (2 panels)
- Grid view (4 panels)
- Main + sidebar (1 large + 2 small)
- Floating windows (drag anywhere)

**Use Cases:**
- **Combat**: Player sheets + enemy NPC stats visible together
- **Trade**: Player inventory + merchant NPC inventory side-by-side
- **Conversation**: Player sheet + NPC sheet for social encounters
- **Party View**: All player sheets in grid for group decisions

**Panel Features:**
- Drag-and-drop panel arrangement
- Minimize/maximize individual panels
- Quick-switch between saved layouts
- Pin important panels (always visible)
- Color-coding: green (ally), red (enemy), blue (neutral)

### Internal Linking System
Clickable links throughout the app:
- **Spells**: Click spell name → spell description popup/page
- **Skills**: Click skill → skill details with relevant ability
- **Features**: Click feature → full feature description
- **Equipment**: Click item → item stats and description
- **Conditions**: Click condition → condition effects

## Class Reference: Fighter - Ranger Subclass

*Note: Verify if "Ranger" refers to a homebrew Fighter subclass or if this should be Champion/Battle Master. Adjust as needed.*

Base Fighter features:
- Hit Die: d10
- Primary Ability: Strength or Dexterity
- Saves: Strength, Constitution
- Fighting Style (level 1)
- Second Wind (level 1)
- Action Surge (level 2)
- Martial Archetype (level 3)
- Extra Attack (level 5)

### Weapon Mastery Options (Homebrew)

DM-approved weapon configurations for Fighters:

| Style | Description | Damage | AC Modifier |
|-------|-------------|--------|-------------|
| **Two-Handed** | Standard two-handed weapon (greatsword, greataxe, etc.) | 2d6 / 1d12 | None |
| **Dual Two-Handed** | Wield two greatswords or similar | 4d6 | **-4 AC** |
| **Sword & Board** | Simple weapon + shield | 1d6/1d8 | +2 AC (shield) |

**Dual Two-Handed Details:**
- Fighter wields two two-handed weapons simultaneously (e.g., two greatswords)
- Damage dice doubled (2d6 → 4d6)
- Permanent -4 penalty to AC while using this style
- Requires both hands occupied (no shield, no free hand for grappling)

### Warlock - Great Old One Patron
Eldritch-themed warlock with psychic abilities:
- **Expanded Spells**: Dissonant Whispers, Tasha's Hideous Laughter, Detect Thoughts, Phantasmal Force, Clairvoyance, Sending, Dominate Beast, Evard's Black Tentacles, Dominate Person, Telekinesis
- **Awakened Mind** (1st): Telepathic communication 30ft
- **Entropic Ward** (6th): Reaction to impose disadvantage, gain advantage on miss
- **Thought Shield** (10th): Psychic resistance, unreadable thoughts
- **Create Thrall** (14th): Charm humanoid indefinitely

## Race Reference

### Drow Traits
- +2 DEX, +1 CHA
- Superior Darkvision (120 ft)
- Sunlight Sensitivity
- Drow Magic: Dancing Lights, Faerie Fire (3rd), Darkness (5th)
- Drow Weapon Training: rapiers, shortswords, hand crossbows
- Fey Ancestry: Advantage vs charm, immune to magical sleep
- Trance: 4 hours meditation

### Tiefling Traits
- +2 CHA, +1 INT (Asmodeus bloodline)
- Darkvision (60 ft)
- Hellish Resistance: Fire resistance
- Infernal Legacy: Thaumaturgy, Hellish Rebuke (3rd), Darkness (5th)

---

## TODO List

### Phase 1: Foundation (Current)

#### Project Setup
- [ ] Initialize React + TypeScript project with Vite
- [ ] Configure Tailwind CSS
- [ ] Set up React Router for page navigation
- [ ] Configure Zustand for state management
- [ ] Set up testing framework (Vitest)

#### Character Details Page
- [ ] Create `CharacterDetailsForm` component
- [ ] Implement text inputs: name, age, height, weight, notes, player name
- [ ] Add Tab/Shift+Tab keyboard navigation
- [ ] Add form validation (required fields)
- [ ] Create "Next" button with disabled state

#### Race/Species Selection Page
- [ ] Create `RaceSelector` page component
- [ ] Build `RaceCard` component with visual display
- [ ] Create `src/data/races/drow.json` with traits
- [ ] Create `src/data/races/tiefling.json` with traits
- [ ] Display racial traits on selection
- [ ] Show ability score modifiers

#### Class Selection Page
- [ ] Create `ClassSelector` page component
- [ ] Build `ClassCard` component
- [ ] Create `src/data/classes/fighter.json` with features
- [ ] Create `src/data/classes/warlock.json` with features
- [ ] Create subclass data files
- [ ] Display class features on selection

#### Stat Allocation Page
- [ ] Create `StatAllocator` page component
- [ ] Implement Standard Array method
- [ ] Implement Point Buy method with validation
- [ ] Implement Roll method (4d6 drop lowest)
- [ ] Auto-apply racial bonuses
- [ ] Display final stats with modifiers

#### Spell Selection Page
- [ ] Create `SpellSelector` page component
- [ ] Create `src/data/spells/warlock-spells.json`
- [ ] Create `src/data/spells/great-old-one-expanded.json`
- [ ] Build spell card/list components
- [ ] Track cantrips vs leveled spells
- [ ] Show spell slots

#### Dice Rolling System
- [ ] Create `DiceRoller` component
- [ ] Parse dice notation (NdX+M)
- [ ] Support multiple dice types (d4, d6, d8, d10, d12, d20, d100)
- [ ] Apply character modifiers automatically
- [ ] Create roll history display
- [ ] Add dice rolling animations

#### Inventory System
- [ ] Create `Inventory` component
- [ ] Implement currency tracker (cp, sp, gp, ep, pp)
- [ ] Create equipment list component
- [ ] Create `src/data/equipment/weapons.json`
- [ ] Create `src/data/equipment/armor.json`
- [ ] Add/remove items functionality
- [ ] Optional weight/encumbrance tracking

#### Character Sheet Display
- [ ] Create `CharacterSheet` component
- [ ] Display all character information
- [ ] Add internal links to spells/skills/features
- [ ] Create spell/skill popup/modal system
- [ ] Add edit mode toggle

#### Type Definitions
- [ ] Define `Character` interface in `src/types/character.ts`
- [ ] Define `Race` interface in `src/types/race.ts`
- [ ] Define `Class` and `Subclass` interfaces in `src/types/class.ts`
- [ ] Define `Spell` interface in `src/types/spell.ts`
- [ ] Define `Equipment` and `Item` interfaces in `src/types/equipment.ts`
- [ ] Define `DiceRoll` interface in `src/types/dice.ts`

#### State Management
- [ ] Create `useCharacterStore` with Zustand
- [ ] Create `useCampaignStore` for DM features
- [ ] Implement character persistence (localStorage)
- [ ] Add undo/redo functionality

#### Utilities
- [ ] Create `calculateModifier(stat: number)` function
- [ ] Create `calculateProficiencyBonus(level: number)` function
- [ ] Create `applyRacialBonuses(stats, race)` function
- [ ] Create `rollDice(notation: string)` function
- [ ] Create `parseDiceNotation(input: string)` function

### Phase 2: DM Tools

#### Campaign Dashboard
- [ ] Create campaign management dashboard
- [ ] Build party overview with character cards
- [ ] Implement initiative tracker with drag-to-reorder
- [ ] Add session notes per character

#### DM Character Management
- [ ] Add DM edit mode for character sheets
- [ ] Implement HP modification (current, max, temp)
- [ ] Create condition tracker (add/remove status effects)
- [ ] Build charge/token system for limited-use abilities
- [ ] Track spell slot usage with visual indicators
- [ ] Track class feature uses (Action Surge, Second Wind, etc.)
- [ ] Implement short rest / long rest reset buttons
- [ ] Add DM override for manual adjustments

#### NPC Creator
- [ ] Create `NPCCreator` page component
- [ ] Build NPC type selector (humanoid, beast, undead, fiend, etc.)
- [ ] Add race/alignment/CR inputs
- [ ] Create combat stats form (AC, HP dice, speeds)
- [ ] Build ability score allocator for NPCs
- [ ] Add optional class/level selection
- [ ] Create spell slot and spell list manager
- [ ] Build actions/reactions/legendary actions editor
- [ ] Add skills, saves, resistances, immunities checkboxes
- [ ] Create senses and languages selector
- [ ] Add equipment/loot and notes fields
- [ ] Create `src/data/npcs/` folder for saved NPCs
- [ ] Build NPC templates (commoner, guard, mage, etc.)

#### Multi-Panel View System
- [ ] Create panel layout manager component
- [ ] Implement side-by-side (2 panel) view
- [ ] Implement grid (4 panel) view
- [ ] Implement main + sidebar layout
- [ ] Add floating/draggable window option
- [ ] Build panel minimize/maximize controls
- [ ] Add panel color-coding (ally/enemy/neutral)
- [ ] Create saved layout presets
- [ ] Implement drag-and-drop panel arrangement

#### Encounter Management
- [ ] Create encounter builder
- [ ] Add NPC to encounter from library
- [ ] Track NPC health during combat
- [ ] Quick-roll NPC attacks and saves

### Phase 3: Content Expansion

- [ ] Add all Fighter subclasses (Champion, Battle Master, Eldritch Knight, etc.)
- [ ] Add all Warlock subclasses (Fiend, Archfey, Hexblade, etc.)
- [ ] Add all PHB 2024 races
- [ ] Add all PHB 2024 classes
- [ ] Implement backgrounds system
- [ ] Add feats selection
- [ ] Implement multiclassing rules

### Phase 4: Polish & Export

- [ ] PDF character sheet export
- [ ] JSON import/export
- [ ] Character leveling system
- [ ] Print-friendly character sheets
- [ ] Homebrew content import system

### Phase 5: User Accounts & Cloud

#### Login System
- [ ] Create account registration page
- [ ] Create login page
- [ ] Implement authentication (JWT or session-based)
- [ ] Password reset functionality
- [ ] Email verification (optional)
- [ ] OAuth options (Google, Discord) - future

#### Character Storage
- [ ] Cloud save for unlimited characters
- [ ] Character list per player account
- [ ] Quick-load character sheets
- [ ] Sync between devices
- [ ] Offline mode with sync on reconnect
- [ ] Character sharing between accounts

#### Campaign Sharing
- [ ] Invite players to campaign
- [ ] DM access to all party character sheets
- [ ] Real-time updates during sessions
- [ ] Campaign export/backup

### Phase 6: Settings & Themes

#### Settings Page
- [ ] Create settings page/modal
- [ ] User preferences persistence
- [ ] Keyboard shortcut customization

#### Font & Accessibility
- [ ] Font size controls with +/- icons
- [ ] Font size range (e.g., 12px to 24px)
- [ ] Responsive text scaling in constrained areas (character sheets, cards)
- [ ] Text overflow handling (truncate, wrap, or shrink-to-fit)
- [ ] High contrast mode toggle
- [ ] Dyslexia-friendly font option (OpenDyslexic)
- [ ] Remember font preferences per user

#### Theme System
- [ ] Implement theme switching infrastructure
- [ ] **Light Mode** - Clean, bright interface
- [ ] **Lighter Mode** - High contrast, maximum brightness
- [ ] **Dark Mode** - Easy on the eyes for long sessions
- [ ] **Darker Mode** - OLED-friendly, true blacks
- [ ] **Dungeons & Dragons Theme** - Parchment textures, classic fantasy styling
- [ ] **World of Warcraft Theme** - Azeroth-inspired UI, gold accents
- [ ] **Final Fantasy Theme** - Crystal/menu aesthetics, blue tones
- [ ] **Diablo 3 Theme** - Gothic, dark red accents, demonic styling

---

## Code Style Guidelines

- Use TypeScript strict mode
- Prefer functional components with hooks
- Keep components small and focused (<100 lines ideal)
- Use descriptive variable names (no abbreviations)
- Comment complex game rule calculations
- Write unit tests for all calculation utilities
- Ensure full keyboard accessibility

## Common Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run test         # Run test suite
npm run lint         # Check code style
npm run type-check   # Verify TypeScript types
```

## Resources

- [D&D 5e 2024 PHB](https://www.dndbeyond.com/) - Official 2024 rules
- [5e.tools](https://5e.tools/) - Community rules database
- Player's Handbook 2024 - Primary source for class/race details

## Notes for Claude

When working on this project:
1. Always validate against 5e 2024 rules when implementing features
2. Prioritize keyboard navigation - Tab/Shift+Tab must work everywhere
3. Keep accessibility in mind for all UI components
4. Test dice calculations thoroughly - randomness must be fair
5. Internal links should be consistent and always functional
6. When in doubt about rules, ask for clarification
