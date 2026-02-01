# Dungeons - D&D Character Creation Made Simple

A streamlined, click-and-create character builder for Dungeons & Dragons 5th Edition. Build your perfect adventurer in minutes, not hours.

## Vision

Creating a D&D character should be **fun**, not frustrating. This project aims to make character creation:

- **Simple** - Guided step-by-step process with smart defaults
- **Fast** - Click-and-create interface, no manual calculations
- **Educational** - Learn about races, classes, and abilities as you build
- **Flexible** - From quick presets to full customization

## Supported Content

### Classes

| Class | Subclass | Status |
|-------|----------|--------|
| Fighter | Champion | Planned |
| Fighter | **Ranger** | In Progress |
| Warlock | **The Great Old One** | Planned |
| Warlock | The Fiend | Planned |
| Warlock | The Archfey | Planned |

### Races

| Race | Subraces | Status |
|------|----------|--------|
| **Drow** (Dark Elf) | - | In Progress |
| **Tiefling** | Asmodeus, Baalzebul, Dispater | Planned |
| Elf | High, Wood, Eladrin | Planned |
| Human | Standard, Variant | Planned |

## Features

### Core Features
- **One-Click Character Generation** - Select race + class combo and get a ready-to-play character
- **Stat Rolling Options** - Standard array, point buy, or roll 4d6 drop lowest
- **Equipment Packages** - Pre-built gear sets based on class and background
- **Character Sheet Export** - PDF, JSON, and printer-friendly formats

### Fighter-Specific Features
- **Fighting Style Selector** - Archery, Defense, Dueling, Great Weapon Fighting, Protection, Two-Weapon Fighting
- **Second Wind Tracker** - Visual HP recovery calculator
- **Action Surge Counter** - Track your extra actions per rest
- **Ranger Subclass Tools**:
  - Favored Enemy selector with stat bonuses
  - Natural Explorer terrain picker
  - Primeval Awareness range calculator

### Warlock-Specific Features
- **Pact Boon Selector** - Pact of the Blade, Chain, Tome, or Talisman
- **Eldritch Invocations Browser** - Filterable list with prerequisites
- **Spell Slot Tracker** - Visual Pact Magic slot management
- **Great Old One Patron Tools**:
  - Awakened Mind telepathy range calculator
  - Entropic Ward usage tracker
  - Thought Shield mental defense indicator
  - Create Thrall management interface

### Drow Features
- **Superior Darkvision** (120 ft) indicator
- **Sunlight Sensitivity** reminder system
- **Drow Magic Progression** - Dancing Lights, Faerie Fire, Darkness spell tracker
- **Drow Weapon Training** - Rapier, shortsword, hand crossbow proficiencies

### Tiefling Features
- **Infernal Legacy Spell Tracker** - Thaumaturgy, Hellish Rebuke, Darkness
- **Bloodline Selector** - Different stat bonuses and spells per bloodline
- **Resistance Indicator** - Fire resistance visual badge
- **Darkvision** (60 ft) toggle

### Quality of Life
- **Auto-calculated Modifiers** - No math required
- **Proficiency Bonus Scaling** - Updates automatically with level
- **Skill Proficiency Picker** - Visual checkboxes with source tracking
- **Save Progress** - Local storage and cloud sync options
- **Undo/Redo** - Made a mistake? Go back anytime

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data**: JSON-based rule definitions
- **Export**: jsPDF for character sheets

## Getting Started

```bash
# Clone the repository
git clone https://github.com/NORS3AI/Dungeons.git
cd Dungeons

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
Dungeons/
├── src/
│   ├── components/       # UI components
│   ├── data/
│   │   ├── classes/      # Class definitions (fighter.json, warlock.json)
│   │   ├── races/        # Race definitions (drow.json, tiefling.json)
│   │   ├── spells/       # Spell data
│   │   └── equipment/    # Gear and weapons
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand state stores
│   ├── utils/            # Calculation helpers
│   └── types/            # TypeScript definitions
├── public/
│   └── assets/           # Images, icons
├── tests/                # Test suites
└── docs/                 # Additional documentation
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](LICENSE) for details.

---

*"Roll for initiative... on your character creation experience!"*
