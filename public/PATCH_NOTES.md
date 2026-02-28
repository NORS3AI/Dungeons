# Dungeons - Patch Notes

## Version 0.3.9-alpha - February 28, 2026

**Alpha Release Notice**: This version completes the spell system for all 16 classes, adding full spell support for the Amazon and Demon Hunter custom classes.

### ✨ Amazon Spell System

The Amazon class now has a complete spell list covering all half-caster progression levels.

#### **Amazon Cantrip**
- **Magic Arrow**: Conjure a force-damage arrow that auto-scales (1d4 → 4d4). Ignores mundane cover and nonmagical shields.

#### **Amazon Spells (Levels 1–5)**
- **Level 1**: Inner Sight (negate enemy invisibility/hiding), Power Strike (melee + chain lightning 1d6), Guided Arrow (next ranged attack auto-hits)
- **Level 2**: Charged Strike (2d6 lightning + chain arc to 2 nearby targets), Slow Missiles (20 ft zone grants ranged resistance + disadvantage to attackers)
- **Level 3**: Lightning Fury (15 ft burst 6d6 lightning, chains on failed saves), Freezing Arrow (3d8 cold + restrain on failed CON save)
- **Level 4**: Immolation Arrow (3d6 fire hit + 3d6 explosion + burning ground), Strafe (up to 4 separate ranged attacks in one action)
- **Level 5**: Decoy (illusion duplicate that draws enemy attacks), Summon Valkyrie (AC 16 warrior companion that fights until defeated)

**Spell progression** follows half-caster rules: 1st level spells at character level 2, unlocking a new tier every 4 levels thereafter.

---

### 🔥 Demon Hunter Spell System

The Demon Hunter class now has a complete spell list covering all half-caster progression levels.

#### **Demon Hunter Spells (Levels 1–5)**
- **Level 1**: Fel Rush (20 ft dash through enemies, 1d8 fire DEX save), Vault (supernatural leap, advantage on next attack after landing), Immolation Aura (5 ft fire aura, 1d4 on nearby creatures and attackers)
- **Level 2**: Eye Beam (40 ft line, 4d6 fire + blinds on failed save), Blade Dance (5 ft AoE 2d6 slashing + retaliation thorns)
- **Level 3**: Metamorphosis (+1 AC, fly 30 ft, +1d6 fire melee, advantage on STR), Shadow Power (hide + 1d8 necrotic bonus strike + frighten)
- **Level 4**: Rain of Vengeance (20 ft cylinder 6d6 fire + difficult terrain), Infernal Strike (20 ft aerial leap + 2d6 fire burst on landing)
- **Level 5**: Multishot (15 ft cone 3d6 piercing, pushes on hard fail)

**Spell progression** follows half-caster rules: 1st level spells at character level 2, unlocking a new tier every 4 levels thereafter.

---

### 📋 Spell System Now Complete

All 16 classes have full spell data:

| Class | Type | Levels |
|-------|------|--------|
| Bard | Full caster | Cantrips + 1–9 |
| Cleric | Full caster | Cantrips + 1–9 |
| Druid | Full caster | Cantrips + 1–9 |
| Sorcerer | Full caster | Cantrips + 1–9 |
| Warlock | Pact magic | Cantrips + 1–9 |
| Wizard | Full caster | Cantrips + 1–9 |
| Necromancer | Full caster | Cantrips + 1–9 |
| Paladin | Half caster | 1–5 |
| Ranger | Half caster | 1–5 |
| Amazon ✨ | Half caster | Cantrip + 1–5 |
| Demon Hunter ✨ | Half caster | 1–5 |
| Death Knight | Third caster | Cantrips + 1–9 |

**Why This Matters**: Amazon and Demon Hunter players could previously not select spells — the spell selector showed no spells for these classes. Both classes are now fully playable as spellcasters through the character creation flow and the Spells tab on the character sheet.

---

## Version 0.2.2 - February 22, 2026

### 🆕 New Features

#### **Cloak Equipment Slot**
- **Separate Cloak Slot**: New equipment category for cloaks (e.g., Cloak of Invisibility)
- **Equip Alongside Armor**: Cloaks can be worn in addition to armor and shields
- **Optional AC Bonus**: Cloaks can provide AC bonuses (0-3)
- **Magical Effects Field**: Description field for special cloak abilities
- **Indigo Theme**: Equipped cloaks display with indigo-themed UI
- **AC Calculation**: Cloak AC bonuses automatically added to total AC
- **Exclusivity**: Only one cloak can be equipped at a time

#### **Inventory Quantity Controls**
- **+/- Buttons**: All inventory items now have quantity increment/decrement buttons
- **Position**: Buttons placed to the left of the trash icon
- **Minimum Quantity**: Items cannot be reduced below 1
- **Universal**: Works for weapons, armor, shields, cloaks, and generic items
- **Use Cases**: Track items taken/missing or added from merchants

#### **Manual Item Addition**
- **"Add Item" Button**: Located in inventory section header
- **Custom Items**: Allows creating items for shopping or custom loot
- **Full Editor**: Opens equipment editor with blank template
- **All Types Supported**: Can create weapons, armor, shields, cloaks, or generic items

### 🛠️ Technical Improvements

#### **Equipment System Enhancements**
- **Cloak Interface**: Added with acBonus and magicalEffect properties
- **Type Guards**: Added `isCloak()` function for type discrimination
- **Equipment Union**: Updated to include Cloak type
- **Generic Equipment**: Excludes cloak category
- **Store Function**: `changeEquipmentQuantity(itemId, change)` added

#### **UI/UX Improvements**
- **Equipment Editor**: 5-button grid for equipment type selection (added cloak)
- **Equipped Gear Display**: Dedicated cloak section with magical effect display
- **Quantity Display**: Visual feedback when adjusting item quantities
- **Add Item UX**: Clear, accessible button for manual item creation

---

## Version 0.2.1 - February 22, 2026

### 🎯 Major Changes

#### **Condition Management Moved to DM Initiative Tracker**
- **DM-Controlled Conditions**: Condition management has been moved from individual character sheets to the DM's initiative tracker
- **Per-Combatant Conditions**: Each combatant in the initiative order can have conditions applied and removed during combat
- **Condition Display**: Active conditions are shown as badges on each combatant's initiative row
- **Condition Count Badge**: "Conditions" button shows number of active conditions
- **Full Condition Manager**: DM can open the full condition manager for any combatant during encounters
- **All Condition Types**: Supports injury, standard, combat, and exhaustion conditions
- **Centralized Control**: DM has full control over all combatants' status effects from one location

### 🛠️ Technical Improvements

#### **Campaign Store Enhancements**
- **conditions Array**: Added `conditions?: string[]` to InitiativeEntry type
- **addCombatantCondition()**: Add conditions to combatants in initiative order
- **removeCombatantCondition()**: Remove conditions from combatants in initiative order
- **Persistent Tracking**: Conditions persist in campaign store with automatic save

#### **UI/UX Improvements**
- **Condition Badges**: Up to 3 conditions shown directly on initiative rows
- **Overflow Indicator**: "+N" badge when more than 3 conditions are active
- **Color-Coded Buttons**: Red-themed condition management buttons for easy identification
- **Integrated Modal**: ConditionManager modal opens for selected combatant
- **Character Sheet Cleanup**: Removed condition management from character sheets to reduce clutter

---

## Version 0.2.0 - February 22, 2026

### 🆕 New Features

#### **Equipment Editor System**
- **Loot Cache Equipment Editor**: When adding items from loot cache, open a full editor modal to customize items before adding to inventory
  - Convert loot to Weapons, Armor, Shields, or Generic Equipment
  - Edit all item properties: name, description, weight, value, quantity
  - **Weapon editor**: Set damage dice, damage type, weapon category (simple/martial), weapon type (melee/ranged), properties
  - **Armor editor**: Set base AC, armor type, max DEX bonus, strength requirements, stealth disadvantage
  - **Shield editor**: Set AC bonus
  - **Generic equipment**: Set category (adventuring gear, consumable, trinket, treasure, tool)
  - All items appear in inventory and can be equipped/unequipped

#### **9th Level Spell Selection**
- **Spell Scroll Loot Integration**: Collecting a 9th level spell scroll from loot cache opens spell selection modal
- **Choose Any 9th Level Spell**: Select from all 21 legendary 9th level spells:
  - Astral Projection, Blade of Disaster, Foresight, Gate, Imprisonment
  - Invulnerability, Mass Heal, Mass Polymorph, Meteor Swarm
  - Power Word Heal, Power Word Kill, Prismatic Wall, Psychic Scream
  - Ravenous Void, Shapechange, Storm of Vengeance, Time Ravage
  - Time Stop, True Polymorph, True Resurrection, Weird, Wish
- **Permanent Spell Learning**: Selected spell is permanently added to known spells
- **Spell Details**: View full spell description, casting time, range, components, duration, and available classes

#### **Bleeding & Injury Condition System**
- **6 New Injury Conditions**:
  - **Bleeding (Minor)**: 1 damage per turn, DC 10 Medicine or magical healing to stop
  - **Bleeding (Moderate)**: 1d4 damage per turn, DC 12 Medicine or magical healing to stop
  - **Bleeding (Severe)**: 1d6 damage per turn, DC 15 Medicine or 5+ HP magical healing to stop
  - **Broken Bone**: Disadvantage on limb actions, speed reduction if leg broken, requires treatment
  - **Concussed**: Disadvantage on Int checks/concentration, -2 AC, no reactions, ends on rest
  - **Infected**: Max HP reduction (1d4/day), disadvantage on CON saves, requires DC 15 Medicine or magical healing
- **Condition Manager**: Comprehensive modal with 4 categories:
  - **Injury** (red): Bleeding, broken bones, concussion, infection
  - **Standard** (blue): All D&D 5e conditions (blinded, charmed, frightened, etc.)
  - **Combat** (orange): Enraged
  - **Exhaustion** (purple): Levels 1-6
- **Condition Tracking Button**: Shows active condition count badge in character sheet header

#### **HP Editor for DMs**
- **Quick HP Adjustment Modal**: Manage player health during gameplay
- **Quick Damage Buttons**: Apply 5, 10, 20, or Max damage instantly
- **Quick Healing Buttons**: Heal 5, 10, 20 HP or Full heal instantly
- **Custom Values**: Input custom damage/healing amounts
- **Temporary HP**: Manage temporary hit points separately
- **Death Saves**: Track successes and failures

#### **Character Level Management**
- **Spell Selection on Level Up**: Warlock/Spellcasters auto-prompt for new spells when leveling
- **Level Persistence**: All level changes now save immediately
- **Level Up/Down Buttons**: Adjust character level with automatic updates

#### **Loot Cache System**
- **Random Loot Generation**: Generate level-appropriate loot based on character progression
- **Rarity Tiers**: Common, Uncommon, Rare, Very Rare, Legendary items
- **Class/Race Preferences**: Display preferred items for your class and race
- **Adjustable Quantity**: Generate 1, 3, 5, or 10 items at once

#### **Fighter Stance System**
- **3 Fighting Stances** for Fighters:
  - **Two-Handed**: Standard greatsword/greataxe (2d6/1d12 damage)
  - **Dual Two-Handed**: Wield two greatswords simultaneously (4d6 damage, -4 AC penalty)
  - **Sword & Board**: Simple weapon + shield (+2 AC)
- **Real-time AC Updates**: AC recalculates instantly when changing stances
- **Stance Selector**: Switch stances directly from character sheet

#### **Quick Dice Roller (Home Page)**
- **Front Page Dice Roller**: Available on lower right without needing a character
- **Advantage/Disadvantage**: Roll with advantage or disadvantage
- **Multiple Roll Types**: Attack rolls, saving throws, ability checks
- **Custom Modifiers**: Add flat bonuses to rolls

#### **Language Selection System**
- **Language Choices**: Select languages based on race, class, and background
- **Common Default**: All characters speak Common by default
- **Suggestions**: Contextual suggestions for languages that make sense for your character

#### **Character Edit Modal**
- **Quick Edits for DMs**: Edit character name and basic info without using full creation wizard
- **Save Changes Instantly**: Updates save immediately to character data

#### **Shield Proficiency Check**
- **Hide Shield Options**: Shield selection hidden for classes without shield proficiency
- **Class-Based UI**: Equipment selector adapts to class capabilities

#### **Enraged Condition**
- **Combat State**: +1 damage bonus, -1 AC penalty
- **Damage Display**: Shows "+1 enraged" bonus in equipped weapon damage
- **AC Calculation**: Auto-applies -1 AC when enraged condition is active

### 🛠️ Technical Improvements

#### **Spell Converter Utility**
- **SpellRef to Spell Conversion**: Convert quick reference spell data to full Spell type
- **Parse Complex Fields**: Automatically parse casting time, range, components, duration
- **Material Cost Extraction**: Detect material costs and consumed components from strings
- **Concentration Detection**: Auto-detect concentration spells from duration strings

#### **Type Safety Enhancements**
- **Equipment Type System**: Full discriminated unions for Weapon, Armor, Shield, GenericEquipment
- **Spell Type Structures**: Structured interfaces for all spell properties
- **Condition Types**: Type-safe condition tracking with exhaustion levels

### 🐛 Bug Fixes
- **Level Changes Not Saving**: Fixed level up/down not persisting to save data
- **Spell Selection Missing**: Fixed spell selector not appearing when leveling up spellcasters
- **Equipment Type Mismatches**: Resolved weapon category vs weapon type confusion
- **Missing Required Fields**: Added description fields to weapons and armor

### 📝 Quality of Life
- **Immediate State Persistence**: All character changes save immediately
- **Condition Count Badge**: See active condition count at a glance
- **Equipment Customization**: Full control over loot before adding to inventory
- **Spell Details View**: Comprehensive spell information in selection modals

---

## Version 0.1.0 - Initial Release

### Core Features
- **Character Creation Wizard**: Step-by-step character creation flow
- **12 Classes, 28 Subclasses**: Full class and subclass support
- **18 Races**: All PHB races available
- **401 Spells**: Complete PHB 2024 spell list (cantrips through 9th level)
- **Character Sheet**: Comprehensive character display with all stats
- **Inventory System**: Equipment, weapons, armor, currency tracking
- **Dice Roller**: Full dice notation support (NdX+M format)
- **DM Tools**: Campaign dashboard, NPC management
- **Condition Tracking**: All D&D 5e conditions
- **Quick Reference System**: Clickable tooltips for spells, skills, conditions
- **Daily Income**: Profession-based income generation
- **Fighting Styles**: Multiple combat stance options for Fighters
- **Spell Slots**: Auto-calculated spell slot tracking

### Data Content
- **6 Abilities**: STR, DEX, CON, INT, WIS, CHA with descriptions
- **18 Skills**: All skills with ability associations
- **37 Weapons**: Simple and martial weapons with full stats
- **13 Armor Sets**: Light, medium, heavy armor and shields
- **14 Standard Conditions**: D&D 5e status effects
- **100+ Class Traits**: Features for all classes and subclasses
- **30+ Game Rules**: Clickable references for new players

---

## Coming Soon
- **Multi-Class Support**: Allow characters to multiclass
- **Backgrounds System**: Formal background selection with traits
- **Feats Selection**: PHB feats at ASI levels
- **PDF Export**: Export character sheets to PDF
- **Cloud Saves**: Account system for character cloud storage
- **Theme System**: Multiple UI themes (Light, Dark, D&D, WoW, Final Fantasy, Diablo)
- **Font Accessibility**: Adjustable font sizes and dyslexia-friendly fonts
- **Campaign Sharing**: Real-time character updates for DM and players
- **Multi-Panel View**: Side-by-side character sheets for encounters
- **NPC Templates**: Pre-built NPC stat blocks

---

**Build Version**: 0.2.0
**Last Updated**: February 22, 2026
**TypeScript Version**: 5.x
**React Version**: 18.x
**Vite Version**: 5.x
