# Dungeons - D&D 5e Character Creator & DM Tool

A browser-based Dungeon Master tool and character creation system for D&D 5th Edition (2024). Create characters with a simple click-and-create flow, manage entire campaigns, and keep everything at your fingertips during gameplay.

## Vision

**For Players**: Build a complete character in minutes with an intuitive page-by-page flow. Full keyboard navigation, smart defaults, and no manual calculations.

**For DMs**: Manage your entire party from one dashboard. Instant access to character sheets, clickable spell/skill references, and a powerful dice roller that knows your modifiers.

## Core Features

### Character Creation Flow
A guided, page-by-page experience:

| Page | Purpose |
|------|---------|
| 1. Details | Name, age, height, weight, background notes |
| 2. Race/Species | Visual race cards with trait previews |
| 3. Class | Class selection with subclass options |
| 4. Stats | Standard Array, Point Buy, or Roll (4d6 drop lowest) |
| 5. Spells | Cantrips and spell selection (class-dependent) |
| 6. Equipment | Starting gear, weapons, armor, inventory |
| 7. Review | Final character sheet with edit options |

**Keyboard-first design**: Tab/Shift+Tab navigation throughout, Enter to confirm.

### Dice Rolling System
Full-featured dice roller built for real gameplay:

```
Syntax: NdX+M (e.g., 2d6+3, 1d20+5, 12d10)

Supported: d4, d6, d8, d10, d12, d20, d100
Features:
  - Roll any combination (12d10, 4d6, 2d20)
  - Auto-apply character modifiers
  - Advantage/Disadvantage support
  - Roll history tracking
  - Visual dice animations
```

### Inventory & Currency Tracking
Keep track of everything your character carries:

- **Currency**: Copper, Silver, Gold, Electrum, Platinum (track per session)
- **Equipment**: Weapons, armor, adventuring gear, tools
- **Weight**: Optional encumbrance tracking
- **Quick add/remove** for loot management

### DM Campaign Management
Tools for running your game:

- **Party Dashboard**: All characters at a glance
- **Quick Sheet Access**: One-click to any character's full sheet
- **Initiative Tracker**: Manage combat order
- **Session Notes**: Per-character notes and reminders
- **Internal Links**: Click any spell, skill, or feature for instant reference

## Supported Content

### Current Development (Phase 1)

| Classes | Subclass | Status |
|---------|----------|--------|
| Fighter | Ranger | In Progress |
| Warlock | Great Old One | In Progress |

| Races | Status |
|-------|--------|
| Drow (Dark Elf) | In Progress |
| Tiefling | In Progress |

### Planned (Full PHB 2024)
All classes and races from the **2024 Player's Handbook** will be supported.

## Class Features

### Fighter
- Hit Die: d10
- Fighting Styles: Archery, Defense, Dueling, Great Weapon Fighting, Protection, Two-Weapon Fighting
- Second Wind HP recovery
- Action Surge tracking
- Martial Archetype features
- **Weapon Mastery Options** (Homebrew):
  - Two-Handed: Standard 2d6/1d12 damage
  - Dual Two-Handed: 4d6 damage, -4 AC penalty (dual greatswords!)
  - Sword & Board: Simple weapon + shield

### Warlock (Great Old One)
- Hit Die: d8
- Pact Boons: Blade, Chain, Tome, Talisman
- Eldritch Invocations browser
- Pact Magic slot tracker
- Patron Features:
  - Awakened Mind (telepathy 30ft)
  - Entropic Ward (reaction defense)
  - Thought Shield (psychic resistance)
  - Create Thrall (charmed ally)

## Race Features

### Drow
- +2 DEX, +1 CHA
- Superior Darkvision (120 ft)
- Sunlight Sensitivity
- Drow Magic: Dancing Lights → Faerie Fire → Darkness
- Weapon Training: Rapiers, shortswords, hand crossbows
- Fey Ancestry & Trance

### Tiefling
- +2 CHA, +1 INT (Asmodeus bloodline)
- Darkvision (60 ft)
- Hellish Resistance (fire)
- Infernal Legacy: Thaumaturgy → Hellish Rebuke → Darkness
- Multiple bloodline options

## Tech Stack

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Routing**: React Router
- **Data**: JSON-based rule definitions
- **Testing**: Vitest
- **Export**: PDF character sheets

## Getting Started

```bash
# Clone the repository
git clone https://github.com/NORS3AI/Dungeons.git
cd Dungeons

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
Dungeons/
├── src/
│   ├── components/
│   │   ├── character/     # Character creation pages
│   │   ├── dice/          # Dice roller components
│   │   ├── inventory/     # Inventory management
│   │   ├── sheet/         # Character sheet display
│   │   └── dm/            # DM campaign tools
│   ├── data/
│   │   ├── classes/       # Class JSON (fighter.json, warlock.json)
│   │   ├── races/         # Race JSON (drow.json, tiefling.json)
│   │   ├── spells/        # Spell data
│   │   └── equipment/     # Weapons, armor, gear
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand state stores
│   ├── utils/             # Dice rolling, stat calculations
│   ├── types/             # TypeScript interfaces
│   └── pages/             # Route pages
├── public/
│   └── assets/            # Images, icons
└── tests/                 # Test suites
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Next field/option |
| Shift+Tab | Previous field/option |
| Enter | Confirm selection / Next page |
| Escape | Cancel / Close modal |
| R | Quick roll (when dice roller focused) |

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](LICENSE) for details.

---

*"Roll for initiative... on your character creation experience!"*
