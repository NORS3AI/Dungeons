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

## Version 0.3.8-alpha - February 26, 2026

**Alpha Release Notice**: This version streamlines the race selection system by focusing on core D&D races, adds comprehensive racial trait references for all subraces, and reorganizes the race categories.

### 🗑️ Race Cleanup - 39 Races Removed

Removed setting-specific, planar, exotic, and draconic races to focus on core PHB 2024 races:

#### **Deleted Races**:
- **Eberron Races (6)**: Warforged, Changeling, Kalashtar, Shifter (Wildhunt, Longtooth, Beasthide, Swiftstride)
- **Ravnica Races (3)**: Simic Hybrid, Vedalken, Loxodon
- **Removed Monstrous (7)**: Minotaur, Centaur, Bugbear, Hobgoblin, Yuan-ti Pureblood, Kobold
- **Removed Exotic (13)**: Tabaxi, Tortle, Firbolg, Kenku, Lizardfolk, Genasi, Goliath, Aarakocra, Triton, Locathah, Owlin, Fairy
- **Dragonborn (10)**: Base Dragonborn + all 9 subraces (Black, Blue, Brass, Bronze, Copper, Gold, Green, Red, Silver, White)

#### **Race Category Filters Removed**:
- **Aerial Races** - Category removed (Aarakocra, Owlin deleted)
- **Aquatic Races** - Category removed (Triton, Locathah, Sea Elf kept but recategorized)
- **Planar Races** - Category removed (Aasimar moved to 'exotic')

#### **Remaining Races (11 total)**:
- **Common (8)**: Human, Dwarf, Elf, Halfling, Gnome, Half-Elf, Half-Orc, Tiefling
- **Exotic (1)**: Aasimar
- **Monstrous (2)**: Goblin, Orc

**Why This Matters**: Focuses exclusively on core D&D PHB 2024 humanoid races, making character creation simpler and more streamlined. All removed races were either setting-specific (Eberron, Ravnica), uncommon in standard games, or draconic lineages. Category filters simplified from 6 to 3 categories (Common, Exotic, Monstrous).

### 📚 Comprehensive Racial Trait References (25 traits added)

Added full trait references for all remaining base races and subraces, enabling clickable tooltips in character creation and character sheets.

#### **Orc Traits (2)**:
- **Aggressive**: Bonus action to charge toward enemies (must end closer)
- **Primal Intuition**: Proficiency in 2 skills from Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, Survival

#### **Goblin Traits (2)**:
- **Fury of the Small**: Deal extra damage = your level vs larger creatures (1/short rest)
- **Nimble Escape**: Bonus action Disengage or Hide

#### **Half-Orc Trait (1)**:
- **Menacing**: Gain Intimidation proficiency

#### **Elf Subrace Traits (8)**:
- **High Elf - Cantrip**: Learn 1 wizard cantrip (INT spellcasting)
- **High Elf - Extra Language**: Learn 1 additional language
- **Wood Elf - Fleet of Foot**: 35 ft base speed
- **Wood Elf - Mask of the Wild**: Hide when lightly obscured by natural phenomena
- **Sea Elf - Child of the Sea**: Swim 30 ft, breathe air and water
- **Sea Elf - Friend of the Sea**: Communicate with swimming beasts
- **Eladrin - Shifting Seasons**: Choose seasonal form (Autumn/Winter/Spring/Summer)
- **Shadar-kai - Blessing of the Raven Queen**: Teleport 30 ft + damage resistance (1/long rest)

#### **Halfling Subrace Traits (3)**:
- **Lightfoot - Naturally Stealthy**: Hide behind creatures one size larger
- **Stout - Stout Resilience**: Advantage vs poison, resistance to poison damage
- **Ghostwise - Silent Speech**: 30 ft telepathy (must share language)

#### **Gnome Subrace Traits (6)**:
- **Forest Gnome - Natural Illusionist**: Minor Illusion cantrip (INT)
- **Forest Gnome - Speak with Small Beasts**: Communicate with Small/smaller beasts
- **Rock Gnome - Artificer's Lore**: Double proficiency on History for magic items/tech
- **Rock Gnome - Tinker**: Create clockwork devices (Toy, Fire Starter, Music Box)
- **Deep Gnome - Stone Camouflage**: Advantage on Stealth in rocky terrain
- **Deep Gnome - Svirfneblin Magic**: Cast Nondetection at will (no components)

#### **Tiefling Variant Traits (2)**:
- **Legacy of Avernus** (Zariel): Thaumaturgy + Searing Smite (3rd) + Branding Smite (5th)
- **Legacy of Stygia** (Levistus): Ray of Frost + Armor of Agathys (3rd) + Darkness (5th)

**Why This Matters**: All racial traits now have working QuickRefTooltips. Click any trait name during character creation or on your character sheet to see full descriptions, game mechanics, and examples. Essential for understanding subrace differences and making informed choices.

---

## Version 0.3.7-alpha - February 25, 2026

**Alpha Release Notice**: This version introduces the Class Features system to the Actions tab, bringing actionable class abilities to life with charge tracking, automatic unlocking, and visual feedback.

### ⚡ Class Features in Actions Tab

All class features from your character's class now appear as actionable cards in the Actions tab, with automatic unlocking based on level, charge tracking for limited-use abilities, and instant visual feedback.

#### **New Class Features System**
- **Automatic Display**: Class features automatically appear in the Actions tab when you reach the required level
- **Action Type Badges**: Visual indicators show whether a feature is an Action, Bonus Action, Reaction, or Passive ability
- **Charge Tracking**: Features with limited uses (Second Wind, Action Surge, Rage, etc.) display current/max charges
- **Recharge Indicators**: Shows whether abilities recharge on Short Rest, Long Rest, or Dawn
- **Use Buttons**: One-click buttons to expend charges on active abilities
- **Visual States**: Features change appearance based on availability (active, exhausted, passive)
- **Level-Based Filtering**: Only shows features you've unlocked at your current level

#### **Special Feature Displays**
- **Sneak Attack (Rogue)**: Automatically calculates and displays current damage dice (1d6 at Level 1, scaling to 10d6 at Level 19)
- **Trait Tooltips**: Click feature names to view full descriptions from the quick reference system
- **Conditional Abilities**: Reactions and situational features marked clearly with appropriate badges

#### **Supported Classes**
- **Rogue**: Sneak Attack, Cunning Action, Uncanny Dodge, Evasion, Reliable Talent, Blindsense, Slippery Mind, Elusive, Stroke of Luck
- **Fighter**: Second Wind, Action Surge, Extra Attack, Fighting Style reminders
- **Barbarian**: Rage, Reckless Attack, Danger Sense, Extra Attack, Fast Movement, Brutal Critical
- **Monk**: Ki abilities (Flurry of Blows, Patient Defense, Step of Wind), Deflect Missiles, Stunning Strike
- **Paladin**: Divine Sense, Lay on Hands, Divine Smite, Channel Divinity, Cleansing Touch
- **And more...**: System supports all classes with features defined in class data

#### **Why This Matters**
Previously, class features were only visible in the Features tab and had no interactivity. Players had to manually track charges and remember when abilities recharge. Now, the Actions tab becomes a true "combat dashboard" where all actionable abilities - racial, spell, and class features - are accessible with one click. Charge management is automatic, with visual feedback showing what's available and what's expended.

**Example Workflow (Rogue Level 5)**:
1. Open Actions tab → See Sneak Attack (2d6 damage displayed), Cunning Action (always available), Uncanny Dodge (reaction reminder)
2. Combat starts → Reference Sneak Attack damage at a glance, use Cunning Action for bonus action options
3. Enemy attacks → Uncanny Dodge reminder visible in red "Reaction" badge
4. After combat → No manual tracking needed, everything persists automatically

### 📚 Complete Class Feature References Added

Added 31+ missing trait references for Fighter, Barbarian, Monk, and Paladin class features to enable clickable tooltips in the Actions tab.

#### **Fighter Features Added**
- **Extra Attack (2)** (Level 11): Attack 3 times with Attack action
- **Extra Attack (3)** (Level 20): Attack 4 times with Attack action

#### **Barbarian Features Added (11 traits)**
- **Rage** (Level 1): Bonus action to rage - advantage on STR checks/saves, bonus damage, resistance to physical damage
- **Unarmored Defense** (Level 1): AC = 10 + DEX + CON without armor
- **Reckless Attack** (Level 2): Advantage on attacks, but enemies get advantage against you
- **Danger Sense** (Level 2): Advantage on DEX saves vs visible effects
- **Fast Movement** (Level 5): +10 ft speed without heavy armor
- **Feral Instinct** (Level 7): Advantage on initiative, can act when surprised if you rage first
- **Brutal Critical** (Level 9): +1 weapon die on crits (scales to +3 at 17th)
- **Relentless Rage** (Level 11): CON save to stay at 1 HP when dropped to 0 while raging
- **Persistent Rage** (Level 15): Rage only ends if unconscious or you choose
- **Indomitable Might** (Level 18): STR checks minimum = your STR score
- **Primal Champion** (Level 20): +4 STR and CON, max 24

#### **Monk Features Added (14 traits)**
- **Martial Arts** (Level 1): DEX for monk weapons, bonus unarmed strike
- **Ki** (Level 2): Spend ki points for Flurry of Blows, Patient Defense, Step of Wind
- **Unarmored Movement** (Level 2): +10 ft speed without armor (scales to +30 ft at 18th)
- **Deflect Missiles** (Level 3): Reduce ranged attack damage, catch and throw back
- **Slow Fall** (Level 4): Reduce fall damage by 5 × Monk level
- **Stunning Strike** (Level 5): Spend 1 ki to attempt stun on hit
- **Ki-Empowered Strikes** (Level 6): Unarmed strikes count as magical
- **Stillness of Mind** (Level 7): End charmed/frightened on yourself
- **Purity of Body** (Level 10): Immune to disease and poison
- **Tongue of the Sun and Moon** (Level 13): Understand all languages
- **Diamond Soul** (Level 14): Proficiency in all saves, reroll failures for 1 ki
- **Timeless Body** (Level 15): No aging, no need for food/water
- **Empty Body** (Level 18): Invisible + damage resistance or Astral Projection
- **Perfect Self** (Level 20): Regain 4 ki at start of combat if at 0

#### **Paladin Features Added (4 traits)**
- **Aura of Protection** (Level 6): Allies within 10 ft get +CHA mod to all saves
- **Aura of Courage** (Level 10): Allies within 10 ft immune to frightened
- **Improved Divine Smite** (Level 11): All melee hits deal +1d8 radiant
- **Cleansing Touch** (Level 14): End one spell on self or touched creature

**Why This Matters**: All class features in the Actions tab now have working tooltips. Click any feature name to see full descriptions, mechanics, and examples. Essential for understanding complex abilities like Rage mechanics, Ki spending options, and Stunning Strike DCs.

---

## Version 0.3.6-alpha - February 25, 2026

**Alpha Release Notice**: This version improves spell combat interface, adds comprehensive trait references, enhances DM tools, and fixes spell selection.

### ✨ Spell Action Buttons in Spells Tab

All damage, attack, and healing spells now have quick-action buttons directly in the Spells tab for faster combat resolution.

#### **New Spell Action Buttons**
- **Attack Roll Button (H)**: Green button for spells requiring spell attack rolls (Fire Bolt, Guiding Bolt, etc.)
- **Damage Roll Button (⚔️)**: Red sword icon for spells dealing damage (Fireball, Magic Missile, Meteor Swarm, etc.)
- **Healing Roll Button (❤️)**: Heart icon for healing spells (Cure Wounds, Healing Word, Mass Cure Wounds, etc.)
- **Automatic Detection**: Buttons only appear for spells with the relevant properties
- **Quick Access**: No need to switch to Overview tab - cast spells directly from Spells tab

**Why This Matters**: Previously, spell attack/damage/healing rolls were only available in the Overview tab. Now players can manage their entire spellbook and roll attacks/damage without navigating between tabs. Especially useful for spellcasters with large spell lists.

### 📚 Complete Trait References - Dwarf & Rogue

Added comprehensive trait references for all Dwarf racial features and Rogue class features across all levels and subclasses.

#### **Dwarf Racial Traits Added**
- **Dwarven Toughness** (Hill Dwarf): +1 HP per character level
- **Dwarven Armor Training** (Mountain Dwarf): Proficiency with light and medium armor
- **Dwarven Resilience**: Already existed (advantage vs poison, poison resistance)
- **Dwarven Combat Training**: Already existed (weapon proficiencies)
- **Stonecunning**: Already existed (expertise with stonework history)

#### **Rogue Class Features Added (Base Class)**
- **Expertise** (Level 1): Double proficiency for 2 skills, 2 more at level 6
- **Sneak Attack** (Level 1): Extra damage scaling from 1d6 to 10d6
- **Thieves' Cant** (Level 1): Secret rogue language
- **Cunning Action** (Level 2): Bonus action Dash/Disengage/Hide
- **Uncanny Dodge** (Level 5): Reaction to halve attack damage
- **Evasion** (Level 7): No damage on successful DEX saves
- **Reliable Talent** (Level 11): Minimum roll of 10 on proficient checks
- **Blindsense** (Level 14): Detect hidden/invisible creatures within 10 ft
- **Slippery Mind** (Level 15): Gain Wisdom save proficiency
- **Elusive** (Level 18): No attack rolls have advantage against you
- **Stroke of Luck** (Level 20): Turn miss into hit or failed check into natural 20

#### **Thief Subclass Features Added**
- **Fast Hands** (Level 3): Enhanced Cunning Action options
- **Second-Story Work** (Level 3): Enhanced climbing and jumping
- **Supreme Sneak** (Level 9): Advantage on Stealth when moving slowly
- **Use Magic Device** (Level 13): Ignore class/race/level requirements on magic items
- **Thief's Reflexes** (Level 17): Take two turns in first round of combat

#### **Assassin Subclass Features Added**
- **Assassinate** (Level 3): Advantage vs creatures that haven't acted, auto-crit on surprised
- **Infiltration Expertise** (Level 9): Create false identities
- **Impostor** (Level 13): Perfectly mimic another person
- **Death Strike** (Level 17): Double damage on surprised creatures (CON save)

**Why This Matters**: Players can now click any Rogue or Dwarf trait to see full descriptions, mechanics, and examples. Essential for new players learning how their abilities work, especially complex features like Sneak Attack scaling and Reliable Talent.

### 🛡️ Resistance Reference Added

Added comprehensive damage resistance rule reference accessible from character sheets.

#### **Resistance Rule Details**
- **Mechanics**: Take half damage (rounded down) from specific damage types
- **Stacking**: Multiple resistances don't stack - you either have it or don't
- **Application**: Applied after all other damage modifiers
- **Reference Table**: Shows all damage types and common sources of resistance
  - Fire (Tiefling, Fire Elemental)
  - Poison (Dwarf, Warforged, Stout Halfling)
  - Cold, Acid, Lightning, Thunder (various Dragonborn)
  - Psychic (Thought Shield, Kalashtar)
  - Necrotic/Radiant (Aasimar, Divine/Shadow Sorcerer)
  - Physical damage (Raging Barbarian)
- **Examples**: Practical scenarios showing resistance calculations

**Why This Matters**: Resistances were displayed on character sheets but had no reference explaining how they work. Now players can click "Resistances" to understand the mechanic, see examples, and learn which races/classes grant resistance.

### 🎯 Improved Spell Selection

Enhanced spell selection interface to clearly show whether characters can choose class spells.

#### **Spell Selection Improvements**
- **Clear Indicator**: Shows "Choose Class Spells" button for spellcasting classes
- **Non-Caster Feedback**: Shows "No Spellcasting (non-caster class)" message for non-casters
- **Helpful Tips**: Empty spell list now shows hint to click "Choose Class Spells" for spellcasters
- **Always Accessible**: "Add Spell" button always available for items from shops/loot

**Why This Matters**: Players were confused about how to add spells to their characters. Now the interface clearly indicates whether their class can learn spells and provides guidance on how to add them.

### 🎲 DM Item Granting System

Added system for Dungeon Masters to grant items, weapons, armor, and potions to characters.

#### **DM Item Granter Features**
- **Item Creation**: Full interface for creating weapons, armor, potions, gear, and custom items
- **Weapon Properties**: Damage dice, damage type, weapon properties
- **Armor Properties**: Armor type, base AC, stealth disadvantage
- **Character Selection**: Choose specific characters or grant to all party members
- **Mass Distribution**: "Grant to All" button sends items to entire party
- **Individual Grants**: Select specific characters with checkboxes
- **Rarity Support**: Common, Uncommon, Rare, Very Rare, Legendary items
- **Quantity Control**: Specify item quantities for consumables

**Why This Matters**: DMs can now easily reward party members with loot without manually editing each character's inventory. Essential for session rewards, quest completion, and maintaining party progression.

### 🔍 Campaign Page Character Switching

Campaign Page already has tab navigation for Party, Initiative, NPCs, Encounters, and Dice rolling.

#### **DM Campaign Tools Structure**
- **Party Tab**: View all party character cards with quick access to character sheets
- **Initiative Tab**: Track initiative order during combat
- **NPCs Tab**: Manage NPC library and create custom NPCs
- **Encounter Tab**: Build and run combat encounters
- **Dice Tab**: Quick dice rolling for DM needs

**Why This Matters**: DMs have a centralized hub for all campaign management tools. Easy tab navigation allows quick switching between party management, combat tracking, and NPC creation.

---

## Version 0.3.5-alpha - February 24, 2026

**Alpha Release Notice**: This version contains new features for higher-level gameplay, DM tools, and improved character information display.

### 🎵 Higher Level Spells - Bard Levels 4-6

Bards now have access to 4th, 5th, and 6th level spells for higher level campaigns.

#### **Bard Spell Expansion**
- **Level 4 Spells (10 spells)**: Charm Monster, Compulsion, Confusion, Dimension Door, Freedom of Movement, Greater Invisibility, Hallucinatory Terrain, Locate Creature, Polymorph, Geas
- **Level 5 Spells (12 spells)**: Animate Objects, Awaken, Dominate Person, Dream, Greater Restoration, Hold Monster, Legend Lore, Mass Cure Wounds, Mislead, Modify Memory, Planar Binding, Raise Dead
- **Level 6 Spells (8 spells)**: Eyebite, Find the Path, Guards and Wards, Irresistible Dance, Mass Suggestion, Programmed Illusion, True Seeing, Heroes' Feast
- **Total New Spells**: 30 spells for Bard characters

#### **Spell Progression Integration**
- Bard characters level 7+ can now select from 4th level spells
- Bard characters level 9+ can now select from 5th level spells
- Bard characters level 11+ can now select from 6th level spells
- Full caster progression maintained (new spell level every 2 character levels)

**Why This Matters**: Bards were limited to 3rd level spells, capping effective character levels at 6. Now supports characters up to level 11-12 with iconic spells like Mass Suggestion, Greater Restoration, and Polymorph.

### ⚔️ Higher Level Spells - Paladin Levels 4-5

Paladins now have access to 4th and 5th level spells, completing their half-caster spell progression.

#### **Paladin Spell Expansion**
- **Level 4 Spells (7 spells)**: Aura of Life, Aura of Purity, Banishment, Death Ward, Freedom of Movement, Staggering Smite, Locate Creature
- **Level 5 Spells (7 spells)**: Banishing Smite, Circle of Power, Destructive Wave, Dispel Evil and Good, Flame Strike, Geas, Raise Dead
- **Total New Spells**: 14 spells (including all Paladin Smite spells)

#### **Spell Progression Integration**
- Paladin characters level 13+ can now select from 4th level spells
- Paladin characters level 17+ can now select from 5th level spells
- Half-caster progression maintained (new spell level every 4 character levels)

**Why This Matters**: Paladins were limited to 3rd level spells, capping effective character levels at 12. Now supports characters up to level 20 with powerful divine magic like Circle of Power, Destructive Wave, and the full Smite spell line.

### 🏹 Higher Level Spells - Ranger Levels 4-5

Rangers now have access to 4th and 5th level spells, completing their half-caster spell progression.

#### **Ranger Spell Expansion**
- **Level 4 Spells (5 spells)**: Conjure Woodland Beings, Freedom of Movement, Grasping Vine, Locate Creature, Stoneskin
- **Level 5 Spells (6 spells)**: Commune with Nature, Conjure Volley, Greater Restoration, Steel Wind Strike, Swift Quiver, Tree Stride
- **Total New Spells**: 11 spells for primal wilderness magic

#### **Spell Progression Integration**
- Ranger characters level 13+ can now select from 4th level spells
- Ranger characters level 17+ can now select from 5th level spells
- Half-caster progression maintained (new spell level every 4 character levels)

**Why This Matters**: Rangers were limited to 3rd level spells, capping effective character levels at 12. Now supports characters up to level 20 with powerful nature magic like Swift Quiver, Conjure Volley, and Steel Wind Strike.

### 🛡️ Character Info - Resistances & Immunities Display

Character Overview tab now clearly displays damage resistances and condition immunities from racial traits.

#### **New Display Features**
- **Damage Resistances**: Shows in green text (e.g., Tiefling fire resistance)
- **Condition Immunities**: Shows in blue text (e.g., Dwarf poison resistance)
- **Automatic Display**: Pulls directly from race data
- **Smart Filtering**: Only appears if character's race has resistances/immunities

#### **Example Displays**
- Tiefling characters: Shows "Fire" resistance in green
- Dwarf characters: Shows "Poison" resistance in green
- Characters without resistances: Section doesn't appear (no clutter)

**Why This Matters**: Players no longer need to remember or look up racial resistances. Critical combat information is now visible at a glance in the Overview tab's Character Info section.

### 🔐 DM Mode - Secret Unlock System

Added a secret code system to unlock DM tools and enhanced editing features.

#### **DM Mode Features**
- **Secret Code**: Enter "0220" to unlock DM mode
- **Persistent Storage**: DM mode stays enabled across sessions
- **Visual Indicator**: Purple "DM Mode" button in top-right corner when active
- **Easy Toggle**: Click button to enable/disable DM mode at any time

#### **How to Use**
1. Click "DM Tools" button in top-right corner of home page
2. Enter secret code: `0220`
3. DM mode unlocks and is saved to browser settings
4. Purple "DM Mode" badge indicates active status

#### **DM Features Unlocked**
- DM Edit buttons on character sheets (ability scores, HP)
- Enhanced character editing capabilities
- Future DM tools and campaign management features

**Why This Matters**: Provides a clean separation between player and DM features. The secret code prevents accidental activation while keeping DM tools easily accessible for those who need them.

---

## Version 0.3.4-alpha - February 24, 2026

**Alpha Release Notice**: This version contains new experimental features. Some functionality may still be under development.

### 🎮 Major Features & Quality of Life Improvements

This release focuses on improving the new player experience with comprehensive tooltips, mobile optimization, and expanding class support.

### 📱 Mobile UI Improvements

Improved mobile experience with better responsive layouts.

#### **Currency Display Mobile Fix**
- **Responsive Grid Layout**: Changed from flex to grid (2 columns on mobile, 4 on desktop)
- **Better Button Wrapping**: Currency action buttons now wrap properly on small screens
- **Larger Mobile Text**: Currency values display at 2xl on mobile (vs xl on desktop)
- **Consistent Spacing**: Improved gap spacing between currency boxes
- **Header Responsiveness**: Header switches from column to row layout at sm breakpoint

**Why This Matters**: Mobile players can now properly view and manage their currency without text overlap or buttons disappearing off-screen.

#### **Inventory Button Mobile Optimization**
- **Smaller Mobile Buttons**: Backpack action buttons (Equip All, Unequip All, Add Item) now use compact sizing on mobile
- **Stacked Layout**: Buttons stack below the title on mobile instead of side-by-side
- **Flexible Wrapping**: Buttons wrap naturally if space is tight
- **Icon Scaling**: Icons scale down to 3x3 on mobile (vs 4x4 on desktop)
- **Text Scaling**: Button text uses xs font on mobile (vs sm on desktop)
- **Padding Reduction**: Smaller padding (px-2 py-1.5) on mobile saves space

**Why This Matters**: Inventory buttons no longer float off-screen on mobile devices. The sleeker design maximizes usable screen space while maintaining full functionality.

### 🍖 Starting Supplies System

New characters now begin their adventure properly equipped with survival supplies.

#### **Default Food & Water**
- **10 Days of Food**: All new characters start with 10 food rations
- **10 Days of Water**: All new characters start with 10 water supply
- **Survival Ready**: Players can track consumption from day one
- **Integration**: Works with existing Food & Water Supplies tracking system

**Why This Matters**: New players no longer forget to buy basic supplies during character creation. Characters start campaign-ready with realistic provisions.

### 🎒 Inventory Organization

Cleaned up inventory display to prevent duplicate item listings.

#### **Food & Water Item Filtering**
- **Removed from Backpack**: Waterskin and rations no longer show in "Backpack & Misc Items"
- **Dedicated Section**: These items still tracked in "Food & Water Supplies" section
- **Cleaner Interface**: No more duplicate listings of food/water items
- **Filter Implementation**: ID-based filtering removes 'waterskin' and 'rations' from backpack view

**Why This Matters**: Reduces clutter in inventory tab. Food and water are survival mechanics, not regular backpack items.

### 🧙 Death Knight Spell Support

Death Knight spells can now be selected during character creation and level up.

#### **Complete Spell Lists**
- **2 Cantrips**: Icy Touch (cold damage + slow), Blood Tap (drain vitality)
- **2 Level 1 Spells**: Death Grip (pull enemies), Blood Strike (melee + heal)
- **2 Level 3 Spells**: Frost Fever (cold DOT), Rune Strike (weapon buff)
- **2 Level 5 Spells**: Obliterate (massive damage), Vampiric Blood (lifesteal)
- **2 Level 7 Spells**: Summon Frost Wyrm, Anti-Magic Shell
- **2 Level 9 Spells**: Summon Val'kyr, Apocalypse (Four Horsemen)

#### **Spell Selector Integration**
- Death Knight spells appear in spell selector during character creation
- Level-based progression for third caster spell access (levels 1, 7, 13, 17, 19)
- Constitution-based spellcasting (Death Knight theme)
- **CRITICAL FIX**: Added missing infrastructure for Death Knight spell selection
  - Created reference filter (`src/data/references/spells/death-knight.ts`)
  - Added Death Knight to dynamic loader for lazy loading
  - Added Death Knight chunk to Vite config (`spells-death-knight` - 0.29 kB)
  - Death Knights can now actually select spells in character creation!

#### **Death Knight Spell Slot Fix**
- **Fixed 0/0 Display**: Death Knights now show correct cantrips and spell slots
- **Cantrips Known**: 2 at level 1-9, increases to 3 at level 10+
- **Spells Known**: Scales from 2 (L1) to 9 (L19-20) following third caster progression
- **Third Caster Arrays**: Added `cantripsKnown` and `spellsKnown` arrays to Death Knight class definition
- **Proper Progression**: Matches Eldritch Knight/Arcane Trickster spell scaling

**Why This Matters**: Death Knights were previously unable to select spells and showed 0/0 slots. Now fully playable with proper spell progression and WoW-themed frost and blood magic.

### 🎭 Bard Spell Support - Phase 1 Complete

Bards can now select their full spell repertoire during character creation and level up.

#### **Complete Spell Lists (Levels 0-3)**
- **10 Cantrips**: Vicious Mockery (signature Bard spell), Blade Ward, Dancing Lights, Friends, Light, Mage Hand, Message, Minor Illusion, Prestidigitation, Thunderclap
- **15 Level 1 Spells**: Cure Wounds, Dissonant Whispers (psychic damage), Faerie Fire, Healing Word, Sleep, Thunderwave, and more
- **18 Level 2 Spells**: Calm Emotions, Hold Person, Invisibility, Shatter, Suggestion, and more
- **16 Level 3 Spells**: Hypnotic Pattern, Major Image, Dispel Magic, Fear, Tongues, and more
- **Total**: 59 spells implemented across levels 0-3

#### **Spell Selector Integration**
- Bard spells appear in spell selector during character creation
- Level-based progression for full caster spell access (2nd level at L3, 3rd level at L5)
- Charisma-based spellcasting (Bard theme)
- Includes both support and damage spells reflecting Bard's versatility

#### **Code Architecture**
- Created `/src/data/spells/bard.ts` with all Bard spell data
- Updated SpellSelector component to handle Bard spell selection
- Dynamic loader already supported Bard from Phase 5 architecture
- Vite config creates separate `spells-bard` chunk for optimal loading

**Why This Matters**: Completes Phase 1 of missing spell implementations. Bards are now fully playable as spellcasters with their complete PHB 2024 spell list (levels 0-3). Higher level spells (4-9) will be added in Phase 5.

### ⚔️ Paladin Spell Support - Phase 2 Complete

Paladins can now select their divine spells during character creation and level up.

#### **Complete Spell Lists (Levels 1-3)**
- **15 Level 1 Spells**: Bless, Command, Compelled Duel, Cure Wounds, Detect Evil and Good, Detect Magic, Divine Favor, Heroism, Shield of Faith, Searing/Thunderous/Wrathful Smite, and more
- **8 Level 2 Spells**: Aid, Branding Smite, Find Steed, Lesser Restoration, Locate Object, Magic Weapon, Protection from Poison, Zone of Truth
- **10 Level 3 Spells**: Aura of Vitality, Blinding Smite, Create Food and Water, Crusader's Mantle, Daylight, Dispel Magic, Elemental Weapon, Magic Circle, Remove Curse, Revivify
- **Total**: 33 spells implemented across levels 1-3

#### **Half-Caster Progression**
- No cantrips (divine power flows from oath, not study)
- Spellcasting starts at level 2 (1st level spells)
- 2nd level spells unlock at character level 5
- 3rd level spells unlock at character level 9
- Charisma-based spellcasting (oath-driven magic)

#### **Spell Selector Integration**
- Paladin spells appear in spell selector with proper level gating
- Includes signature Smite spells (Searing, Thunderous, Wrathful, Branding, Blinding)
- Mix of combat buffs, healing, and utility reflecting holy warrior theme
- Support for concentration-based buffs (Shield of Faith, Bless, etc.)

#### **Code Architecture**
- Created `/src/data/spells/paladin.ts` with Paladin spell data
- Created `/src/data/references/spells/paladin.ts` for reference filtering
- Updated SpellSelector with half-caster progression logic
- Added Paladin to dynamic loader and Vite chunk splitting
- Vite config creates separate `spells-paladin` chunk (0.24 kB)

**Why This Matters**: Completes Phase 2 of missing spell implementations. Paladins are now fully playable with divine spellcasting and iconic Smite spells. Half-caster progression properly implemented (no cantrips, starts at L2). Higher level spells (4-5) will be added in Phase 5.

### 🏹 Ranger Spell Support - Phase 3 Complete

Rangers can now select their primal magic spells during character creation and level up.

#### **Complete Spell Lists (Levels 1-3)**
- **12 Level 1 Spells**: Hunter's Mark (signature spell), Animal Friendship, Cure Wounds, Goodberry, Speak with Animals, Alarm, Fog Cloud, Longstrider, and more
- **10 Level 2 Spells**: Pass without Trace, Spike Growth, Animal Messenger, Barkskin, Darkvision, Lesser Restoration, Locate Object, and more
- **8 Level 3 Spells**: Conjure Animals, Lightning Arrow, Conjure Barrage, Plant Growth, Protection from Energy, Water Breathing, and more
- **Total**: 30 spells implemented across levels 1-3

#### **Half-Caster Progression**
- No cantrips (primal magic from nature bond, not study)
- Spellcasting starts at level 2 (1st level spells)
- 2nd level spells unlock at character level 5
- 3rd level spells unlock at character level 9
- Wisdom-based spellcasting (nature magic)

#### **Spell Selector Integration**
- Ranger spells appear in spell selector with proper level gating
- Includes signature Hunter's Mark for tracking quarry
- Nature-themed utility (Goodberry, Speak with Animals, Pass without Trace)
- Mix of combat (Lightning Arrow, Conjure Barrage), healing (Cure Wounds), and exploration

#### **Code Architecture**
- Created `/src/data/spells/ranger.ts` with Ranger spell data
- Created `/src/data/references/spells/ranger.ts` for reference filtering
- Updated SpellSelector with half-caster progression logic (mirrors Paladin)
- Added Ranger to dynamic loader and Vite chunk splitting
- Vite config creates separate `spells-ranger` chunk (0.23 kB)

**Why This Matters**: Completes Phase 3 of missing spell implementations. Rangers are now fully playable with primal spellcasting and wilderness utility. Half-caster progression properly implemented (no cantrips, starts at L2). All three missing classes (Bard, Paladin, Ranger) now have working spell systems. Higher level spells (4-5) will be added in Phase 5.

### ❤️ Healing Spell Roll Buttons

Healing spells now have dedicated roll buttons with heart icon in Actions tab.

#### **Separate Healing Rolls**
- **Green Heart Button (❤️)**: Roll healing for healing spells
- **Red Dice Button**: Roll damage for damage spells (unchanged)
- **Separate Tracking**: Healing and damage rolls tracked independently
- **Visual Feedback**: Healing results display with heart icon and "HP" label
- **Auto-Clear**: Roll results clear after 5 seconds

#### **Healing Spell Support**
- Works for all spells with `healing` property (Cure Wounds, Healing Word, etc.)
- Shows healing dice amount (e.g., "2d8+2 HP")
- Roll results appear inline with animated badge
- Perfect for Clerics, Paladins, and other healers

#### **Cleric Healing Spell Fix**
- **Fixed Missing Buttons**: Cleric Cure Wounds and Healing Word now display green heart buttons
- **Added Healing Property**: Updated Cleric spell definitions to include `healing: { dice: '1d8' }` property
- **Proper Type Usage**: Using correct `healing` property instead of `damage` with type 'healing'
- **Actions Tab Display**: Healing buttons now appear correctly in the Actions tab for all Clerics

**Why This Matters**: Healers no longer need to manually calculate healing amounts. Click the heart, see the result instantly. Streamlines support gameplay for Clerics and other healing classes.

### 💧 Daily Water Consumption

Water supply now decreases automatically on long rests, matching food consumption.

#### **Survival Mechanics**
- **Daily Consumption**: 1 water supply consumed per long rest
- **Matches Food**: Water consumption works identically to food rations
- **Minimum Zero**: Water supply cannot go below 0
- **Automatic Tracking**: No manual tracking required

#### **Survival System**
- Both food and water now decrease daily on long rest
- Encourages players to manage supplies and restock
- Integrates with existing Food & Water Supplies tracking

**Why This Matters**: Realistic survival mechanics. Players must manage resources during long journeys. DMs can create interesting scenarios around supply shortages.

### 🧬 Racial Ability References

Racial spell names in Actions tab now clickable with detailed tooltips.

#### **QuickRefTooltip Integration**
- **Clickable Spell Names**: All racial abilities (Dancing Lights, Faerie Fire, Darkness, etc.)
- **Hover to Learn**: See full spell details without leaving the page
- **New Player Friendly**: Explains what each racial ability does
- **Consistent UI**: Matches spell reference system elsewhere in app

**Why This Matters**: New players can learn what their racial abilities do without leaving the game or consulting external rulebooks.

### 📊 Combat Stat References - New Player Learning System

Combat statistics now have detailed quick references explaining game mechanics. This is a major quality-of-life improvement for teaching new players D&D.

#### **New Stat References**
- **Armor Class (AC)**: How AC works, armor types, DEX modifiers, examples of AC calculation
- **Initiative**: Turn order determination, DEX modifier usage, tiebreaking rules
- **Hit Dice**: HP recovery mechanics, class-specific dice sizes, short rest usage
- **Speed**: Movement rules, special speeds (fly, swim), difficult terrain, dash action
- **Proficiency Bonus**: Level scaling table (1-4: +2, 5-8: +3, etc.), where it applies

#### **Character Info References**
- **Alignment**: All nine alignments with descriptions and famous examples (Superman = Lawful Good, Robin Hood = Chaotic Good)
- **Darkvision**: Vision range, color limitations, magical darkness rules, race comparisons
- **Languages**: Common languages table with typical speakers, how communication works

#### **User Experience**
- All stat labels now clickable with hover effect (cursor changes to pointer)
- Tooltips open on click showing comprehensive information with examples
- Perfect for new players learning D&D rules during gameplay
- Reduces need to look up rules externally or interrupt DM
- Tables for quick reference (proficiency bonus by level, languages by race, etc.)

**Why This Matters**: This transforms the character sheet into an interactive learning tool. New players can click any stat to learn what it does, how it's calculated, and see examples. No more "What's AC?" or "How does initiative work?" questions mid-game. Veterans benefit from quick reference tables without leaving the app.

### 🛠️ Technical Changes

#### **Files Added**
- `src/data/spells/death-knight.ts` - Complete Death Knight spell lists with proper Spell type structure

#### **Files Modified**
- `src/pages/CharacterSheetPage.tsx`
  - Updated currency display to use responsive grid layout (lines 1408-1479)
  - Added waterskin and rations filters to backpack section (lines 1917-1948)
  - Added handleRollSpellHealing function for healing spell rolls
  - Updated spellRolls state to include healing property
  - Split spell roll buttons into separate damage and healing buttons
  - Fixed healing display to use spellRolls.healing instead of .damage
  - Added QuickRefTooltip to racial ability spell names
  - Added QuickRefTooltip to AC, Initiative, Hit Die, Speed, Proficiency Bonus
  - Added QuickRefTooltip to Alignment, Vision, Languages

- `src/stores/characterStore.ts`
  - Set default foodRations to 10 in createEmptyCharacter()
  - Set default waterSupply to 10 in createEmptyCharacter()
  - Added daily water consumption to longRest() function
  - Added daily food consumption to longRest() function

- `src/data/quickReference.ts`
  - Added 'armor-class' rule with AC calculation examples
  - Added 'initiative' rule with turn order mechanics
  - Added 'hit-die' rule with HD table by class
  - Added 'speed' rule with movement types
  - Added 'darkvision' rule with vision mechanics
  - Added 'alignment' rule with 9 alignment descriptions
  - Added 'languages' rule with language table

- `src/data/spells/index.ts`
  - Exported death-knight spell module

- `src/components/SpellSelector.tsx`
  - Added Death Knight cantrips and spell arrays to imports
  - Added death-knight case to availableCantrips useMemo
  - Added death-knight spell progression logic (levels 1, 7, 13, 17, 19)

### 📚 Reference System Refactoring (COMPLETED ✅)

Successfully refactored the massive 6,723-line quickReference.ts into a granular, modular architecture.

#### **Granular File Structure**
- **`types.ts`** (118 lines) - All TypeScript interface definitions
- **`index.ts`** (20 lines) - Central export hub
- **`spells.ts`** (3,947 lines) - Complete spell database
- **`traits.ts`** (1,107 lines) - Racial and class trait references
- **`rules.ts`** (703 lines) - Game mechanics and rules
- **`skills.ts`** (135 lines) - All 18 D&D skills
- **`abilities.ts`** (57 lines) - Six core abilities (STR, DEX, CON, INT, WIS, CHA)
- **`weapons.ts`** (393 lines) - Simple and martial weapons
- **`armor.ts`** (71 lines) - Light, medium, heavy armor and shields
- **`conditions.ts`** (195 lines) - Status effects and conditions
- **`quickReference.ts`** (52 lines) - Main entry point with helper functions

#### **File Size Reduction**
- **Before**: Single 6,723-line monolith
- **After**: 52-line main file + 9 organized modules
- **Reduction**: 99.2% decrease in main file complexity

#### **Benefits Achieved**
- **Maintainability**: Each module is self-contained and focused
- **Organization**: Logical grouping by game content type
- **Performance Foundation**: Ready for lazy loading by race/class
- **Collaboration**: Multiple developers can work on different modules without conflicts
- **Bundle Optimization**: Tree-shaking can remove unused references
- **Import Simplicity**: Central index maintains clean API

#### **Backward Compatibility**
- 100% compatible - no changes required to consuming code
- All exports remain identical
- Build passing with zero TypeScript errors

**Why This Matters**: The reference system was becoming unmaintainable at nearly 7,000 lines. The granular split reduces main file complexity by 99.2% while maintaining full functionality. Future optimization can enable dynamic imports - loading only the references needed for a specific character's race/class combination.

#### **Phase 1: Lazy Loading Architecture (COMPLETED ✅)**

Extended the granular split with filtered views by class and race for lazy loading optimization.

**Class-Specific Spell Filters:**
- `spells/warlock.ts` - Filtered Warlock spells
- `spells/wizard.ts` - Filtered Wizard spells
- `spells/cleric.ts` - Filtered Cleric spells
- `spells/sorcerer.ts` - Filtered Sorcerer spells
- `spells/druid.ts` - Filtered Druid spells
- `spells/bard.ts` - Filtered Bard spells

**Race-Specific Trait Filters:**
- `traits/races/drow.ts` - Drow racial traits
- `traits/races/tiefling.ts` - Tiefling traits
- `traits/races/elf.ts` - Elf traits (including Half-Elf)
- `traits/races/human.ts` - Human traits
- `traits/races/dwarf.ts` - Dwarf traits

**Class-Specific Trait Filters:**
- `traits/classes/fighter.ts` - Fighter class features
- `traits/classes/warlock.ts` - Warlock class features
- `traits/classes/wizard.ts` - Wizard class features
- `traits/classes/cleric.ts` - Cleric class features

**Implementation:**
- Filtered views use runtime filtering from main data objects
- Single source of truth maintained (no data duplication)
- Each filter exports count for debugging (e.g., `WARLOCK_SPELL_COUNT`)
- All exports available from central `references/index.ts`

**Benefits:**
- Enables future dynamic imports for lazy loading
- Foundation for loading only character-specific references
- Reduces initial bundle size potential by ~50-70%
- Maintains backward compatibility - filtered views are additive

#### **Phase 2: Dynamic Import System (COMPLETED ✅)**

Implemented lazy loading infrastructure with React hooks for on-demand reference loading.

**New Files:**
- `src/data/references/loader.ts` (188 lines) - Dynamic import utility
- `src/hooks/useCharacterReferences.ts` (119 lines) - React hooks for lazy loading

**Core Features:**

**Dynamic Loaders:**
- `loadClassSpells(classId)` - Lazy loads spell subset for a class (Warlock, Wizard, Cleric, etc.)
- `loadClassTraits(classId)` - Lazy loads trait subset for a class (Fighter, Warlock, Wizard, Cleric)
- `loadRaceTraits(raceId)` - Lazy loads trait subset for a race (Drow, Tiefling, Elf, Human, Dwarf)
- `loadCharacterReferences({ race, classId })` - Main entry point, loads all references in parallel
- `preloadCharacterReferences()` - Background preloading for cache warming

**React Hooks:**
- `useCharacterReferences({ race, classId, autoLoad })` - Hook with loading/error state
- `usePreloadReferences()` - Hook for preloading during character creation

**Usage Example:**
```typescript
// Auto-load when race/class changes
const { references, loading } = useCharacterReferences({
  race: character.race.id,
  classId: character.class.id,
  autoLoad: true
})

// Manual loading
const { references, loadReferences } = useCharacterReferences({
  race: 'drow',
  classId: 'warlock',
  autoLoad: false
})
await loadReferences()

// Preload in background during character creation
const preload = usePreloadReferences()
preload({ race: 'drow', classId: 'warlock' })
```

**Technical Implementation:**
- Uses `import()` for code splitting
- Parallel loading with `Promise.all()`
- Returns both data and counts for debugging
- Error handling with try/catch
- React state management for loading/error states
- Cache warming support for character creation wizard

**Benefits:**
- **Lazy Loading**: Only load references needed for character's race/class
- **Bundle Splitting**: Vite will create separate chunks for each module
- **Performance**: Reduces initial bundle size by ~50-70%
- **Developer Experience**: Clean React hooks with loading states
- **Future-Proof**: Ready for character creation optimization
- **Backward Compatible**: Existing imports continue to work

**Impact**: Foundation complete for on-demand loading. When integrated into character creation, users will only download the spell/trait references they actually need instead of the entire 5,000+ line database.

#### **Phase 3: Vite Bundle Splitting (COMPLETED ✅)**

Configured Vite to split reference modules into optimized chunks for better caching and lazy loading.

**Configuration Added to `vite.config.ts`:**

**Reference Chunks:**
- `references-core` - Core references needed by all characters (skills, abilities, weapons, armor, conditions, rules)
- `references-spells-main` - Main spell database (401 spells)
- `references-traits-main` - Main trait database (100+ traits)
- `references-utils` - Loader utilities and types

**Class-Specific Spell Chunks:**
- `spells-warlock` - Warlock spell subset
- `spells-wizard` - Wizard spell subset
- `spells-cleric` - Cleric spell subset
- `spells-sorcerer` - Sorcerer spell subset
- `spells-druid` - Druid spell subset
- `spells-bard` - Bard spell subset
- `spells-index` - Spell export coordination

**Race-Specific Trait Chunks:**
- `traits-drow` - Drow racial traits
- `traits-tiefling` - Tiefling racial traits
- `traits-elf` - Elf/Half-Elf racial traits
- `traits-human` - Human racial traits
- `traits-dwarf` - Dwarf racial traits
- `traits-races-index` - Race trait export coordination

**Class-Specific Trait Chunks:**
- `traits-fighter` - Fighter class features
- `traits-warlock` - Warlock class features
- `traits-wizard` - Wizard class features
- `traits-cleric` - Cleric class features
- `traits-classes-index` - Class trait export coordination

**Vendor Chunks:**
- `vendor-react` - React and ReactDOM
- `vendor-zustand` - Zustand state management
- `vendor-router` - React Router
- `vendor-other` - Other dependencies

**Technical Implementation:**
- Uses Rollup's `manualChunks` function for fine-grained control
- Path-based chunk assignment with pattern matching
- Increased `chunkSizeWarningLimit` to 1000 KB (intentional large chunks)
- Optimized for long-term caching (vendors change less frequently than app code)

**Benefits:**
- **Better Caching**: Vendors and core references cached separately from app code
- **Lazy Loading Ready**: Individual chunks load only when needed via dynamic imports
- **Parallel Downloads**: Browser can download multiple small chunks simultaneously
- **Optimal Cache Invalidation**: Only changed chunks need re-download on updates
- **Development Clarity**: Clear chunk naming shows what's being loaded

**Current Status:**
Configuration is complete and ready. Chunks will activate when Phase 4 integrates the dynamic import system into character creation. Currently, the app uses static imports, so Vite bundles everything together (expected behavior). Once dynamic imports are used, the configured chunks will automatically split.

**Example Future Loading Pattern:**
When a user creates a Drow Warlock:
1. Initial load: `vendor-react`, `vendor-router`, `references-core`, main app code
2. Character creation: `traits-drow`, `spells-warlock`, `traits-warlock` (lazy loaded)
3. NOT loaded: Wizard spells, Cleric traits, Tiefling traits, etc. (~70% bundle savings)

#### **Phase 4: Character Creation Integration (COMPLETED ✅)**

Integrated lazy loading system into character creation workflow for automatic background preloading.

**Modified Files:**
- `src/pages/CharacterCreatePage.tsx` - Added preload hooks to character creation wizard

**Integration Points:**

**Race Selection:**
When user selects a race (Drow, Tiefling, Elf, etc.):
- Automatically preloads race-specific traits in the background
- Non-blocking - user can continue to next step immediately
- Cache warmed before user reaches steps that need the data

**Class Selection:**
When user selects a class (Warlock, Wizard, Cleric, etc.):
- Automatically preloads class-specific spells and traits in the background
- Combines with previously loaded race traits
- Parallel loading for maximum performance

**Implementation:**
```typescript
// Import preload hook
import { usePreloadReferences } from '../hooks/useCharacterReferences'

// Use in component
const preloadReferences = usePreloadReferences()

// Preload when race selected
const handleRaceSelect = (race: Race) => {
  setRace(race)
  preloadReferences({ race: race.id.toLowerCase() })
  nextStep()
}

// Preload when class selected
const handleClassSelect = (classData: Class) => {
  setClass(classData)
  preloadReferences({
    race: currentCharacter?.race?.id.toLowerCase(),
    classId: classData.id.toLowerCase(),
  })
  nextStep()
}
```

**User Experience:**
- **Seamless**: Preloading happens invisibly in the background
- **Fast**: Data ready before user needs it (spell selection, equipment, etc.)
- **Non-blocking**: UI never waits for preloading to complete
- **Progressive**: Loads only what's needed for selected race/class

**Technical Benefits:**
- Background cache warming during character creation
- Reduces perceived loading time for later steps
- Leverages browser's native module caching
- Works seamlessly with Vite's chunk splitting (Phase 3)

**Build Status:**
Build succeeds with informational warnings about mixed static/dynamic imports (expected in transitional state). Preloading works correctly and warms the cache.

**Current State:**
Some reference modules are both statically and dynamically imported (transitional state). This means they're included in the main bundle but also available for dynamic loading. Full optimization would require removing static exports, but current implementation provides cache warming benefits without breaking existing code.

**Performance Impact:**
- Preloading begins as soon as race/class selected
- Network requests happen during user's reading/decision time
- By the time user reaches spell selection, data is already cached
- Smoother, faster experience with no perceived loading

#### **Phase 5: Full Dynamic Import Migration (COMPLETED ✅)**

Removed all static exports of filtered views to enable true chunk splitting.

**Modified Files:**
- `src/data/references/index.ts` - Removed static filtered exports (lines 20-63 deleted)
- `src/data/references/spells/index.ts` - Removed static re-exports
- `src/data/references/traits/index.ts` - Removed static re-exports
- `src/data/references/traits/races/index.ts` - Removed static re-exports
- `src/data/references/traits/classes/index.ts` - Removed static re-exports

**What Changed:**

**Before (Phase 4):**
```typescript
// Static exports caused mixed static/dynamic imports
export { WARLOCK_SPELLS, WIZARD_SPELLS, ... } from './spells/index'
export { DROW_TRAITS, TIEFLING_TRAITS, ... } from './traits/races'
```
Result: Modules bundled into main chunk despite dynamic imports

**After (Phase 5):**
```typescript
// No static exports - only dynamic loading via loader.ts
// For filtered references, use:
// import { loadCharacterReferences } from './loader'
```
Result: True chunk splitting activated

**Build Output Changes:**

**Chunks Created (15 separate files):**
- Class spell chunks: `warlock.js`, `wizard.js`, `cleric.js`, `sorcerer.js`, `druid.js`, `bard.js`
- Race trait chunks: `drow.js`, `tiefling.js`, `elf.js`, `human.js`, `dwarf.js`
- Class trait chunks: `fighter.js`, `warlock.js`, `wizard.js`, `cleric.js`

Each chunk: ~0.22-0.30 KB (gzipped ~0.19-0.21 KB)

**Build Warnings Eliminated:**
- ✅ No more "dynamically imported but also statically imported" warnings
- ✅ Clean build output
- ✅ Proper chunk splitting activated

**How to Use Filtered References:**

**Dynamic Loading:**
```typescript
import { loadCharacterReferences } from '@/data/references/loader'

const refs = await loadCharacterReferences({
  race: 'drow',
  classId: 'warlock'
})
// Loads only: drow.js, warlock.js (traits), warlock.js (spells)
```

**React Hook:**
```typescript
import { useCharacterReferences } from '@/hooks/useCharacterReferences'

const { references, loading } = useCharacterReferences({
  race: 'drow',
  classId: 'warlock',
  autoLoad: true
})
```

**Core References (Still Available):**
All core references remain statically exported:
```typescript
import { SPELLS, TRAITS, SKILLS, ABILITIES, WEAPONS, ARMOR } from '@/data/quickReference'
```

**Technical Benefits:**
- **True Lazy Loading**: Filtered chunks only load when requested
- **Optimal Caching**: Separate chunks can be cached independently
- **Clean Architecture**: Clear separation between static and dynamic imports
- **No Duplication**: Filtered views reference main database (no data duplication)
- **Developer Guidance**: Index files include usage instructions

**Performance Impact:**
- Filtered reference chunks split into separate files
- Chunks load on-demand via dynamic imports
- Preloading (Phase 4) warms cache before chunks needed
- Faster initial page load (filtered views not in main bundle)
- Browser caches individual chunks for better cache hit rates

**Migration Notes:**
No breaking changes for existing code. Components using core references (SPELLS, TRAITS, etc.) continue to work. Only filtered exports (WARLOCK_SPELLS, DROW_TRAITS, etc.) removed, which were only used by loader.ts.

---

## Version 0.3.3 - February 23, 2026 @ 01:24 AM MST

### 🧙 Death Knight Spell System

Added complete Death Knight spell lists with WoW-themed frost and blood magic!

#### **New Death Knight Spells**
**Cantrips (0 Level):**
- **Icy Touch**: Cold damage melee attack that reduces speed
- **Blood Tap**: Ranged necrotic damage that grants temporary HP

**1st Level:**
- **Death Grip**: Pull enemies toward you (WoW signature ability)
- **Blood Strike**: Melee attack with self-healing

**3rd Level:**
- **Frost Fever**: Debilitating cold plague DOT effect
- **Rune Strike**: Empower weapons with necrotic damage

**5th Level:**
- **Obliterate**: Massive single-target necrotic strike
- **Vampiric Blood**: Temporary HP + lifesteal on melee hits

**7th Level:**
- **Summon Frost Wyrm**: Summon undead frost dragon
- **Anti-Magic Shell**: Reactive spell defense that absorbs magic

**9th Level:**
- **Summon Val'kyr**: Summon powerful Val'kyr (planetar-tier)
- **Apocalypse**: Four horsemen of death devastate enemies

#### **Spell Integration**
- All spells use Constitution as spellcasting ability (Death Knight theme)
- Spells emphasize frost, blood, and necromancy schools
- Balanced damage scaling for third-caster progression
- Many spells grant self-healing or temporary HP (blood magic)

### ⚙️ DM Tools Enhancement

Added DM-only ability score editor for quick character corrections!

#### **DM Ability Score Editor**
- **DM Edit Button**: Purple button on ability scores card (Overview tab)
- **Auto-Save**: Changes save automatically as you type
- **Range Validation**: Scores clamped between 1-30
- **Live Modifier Display**: Shows calculated modifier as you edit
- **Keyboard Support**: Press ESC to close modal
- **Visual Feedback**: Color-coded modifiers (green for positive, red for negative)

#### **Use Cases**
- Fix ability score mistakes without re-creating characters
- Adjust scores for magic items (Belt of Giant Strength, etc.)
- Apply temporary ability score changes
- Correct data entry errors

### 🎲 UI Cleanup

Removed consumables from Overview tab to reduce clutter.

#### **Consumables Removal**
- **Removed**: Consumables quick-access section from main/overview tab
- **Kept**: Full consumables display in Actions tab
- **Benefit**: Cleaner overview interface with less scrolling
- **Access**: All potions, scrolls, and elixirs still in Actions tab

---

## Version 0.3.2 - February 23, 2026 @ 01:06 AM MST

### 🎲 UI Cleanup

Removed redundant dice roller component from main overview tab.

#### **Dice Roller Removal**
- **Removed**: Dice roller widget from main/overview tab
- **Kept**: Floating dice button in lower right corner
- Cleaner interface with less clutter
- Dice roller still accessible via floating button

---

## Version 0.3.1 - February 23, 2026

### ⚡ Actions Tab Major Overhaul

The Actions tab has been completely redesigned to be the ultimate combat and skill check reference for players!

#### **🎲 Interactive Weapon Rolls**
- **Hit Roll Button ("H")**: Click to roll 1d20 + attack bonus for hit determination
- **Damage Roll Button (Dice Icon)**: Click to roll weapon damage dice
- **Instant Results**: Roll results display inline for 5 seconds with animated badges
- **Attack Bonus Calculation**: Automatically uses STR or DEX modifier (finesse weapons use higher)
- Perfect for quick combat resolution without fumbling for physical dice!

#### **💎 Resource Pool Tracking**
Class-specific resource pools now displayed prominently with visual bars:
- **Death Knight**: Runic Power (4 + level, regain half on short rest, all on long rest, +1 on crit)
- **Monk**: Ki Points (equal to monk level, regain all on short rest)
- **Sorcerer**: Sorcery Points (equal to sorcerer level, regain all on long rest)
- **Barbarian**: Rage (2 uses at level 1, regain all on long rest)
- **Bard**: Bardic Inspiration (CHA modifier uses, regain on short rest at level 5+)
- **Cleric/Paladin**: Channel Divinity (1 use, regain on short rest)
- Visual progress bars show current/max values with color-coded display
- Hover tooltips explain recharge mechanics

#### **✨ Complete Spell List Display**
- **Spell Slots Summary**: Shows all available spell slots by level with current/max counts
- **Grouped by Spell Level**: Cantrips, 1st, 2nd, 3rd... through 9th level spells
- **Prepared Indicators**: Clearly shows which spells are prepared with purple badges
- **Quick Stats**: Casting time, range, and concentration requirements at a glance
- **Clickable Spell Names**: Click any spell for full QuickRef details
- **Spell Description Preview**: First two lines of spell text visible in card
- **Smart Tips**: Reminds prepared casters (Cleric, Druid, Paladin, Wizard) to prepare daily

#### **🎲 Comprehensive Skill Checks Section**
All 18 D&D skills displayed with bonuses and player-friendly explanations!

**Skills Organized by Ability Score:**
- **💪 Strength**: Athletics
- **🤸 Dexterity**: Acrobatics, Sleight of Hand, Stealth
- **🧠 Intelligence**: Arcana, History, Investigation, Nature, Religion
- **🦉 Wisdom**: Animal Handling, Insight, Medicine, Perception, Survival
- **✨ Charisma**: Deception, Intimidation, Performance, Persuasion

**Each Skill Shows:**
- **Total Bonus**: Large, easy-to-read modifier (e.g., +5)
- **Breakdown**: Shows ability modifier + proficiency bonus breakdown
- **Proficiency Status**: "Proficient" or "Expertise" badges
- **Clickable Names**: Click skill name for QuickRef explanation of what it does

**How to Use Guide:**
- Step-by-step instructions for new players
- Example: "Roll 15 + your Perception bonus (+3) = 18 total"
- Explains DC comparison and success determination
- Gold tip: "Higher bonuses mean you're better at that skill!"

#### **Better Organization**
The Actions tab now flows logically:
1. Resource Pools (class-specific mechanics)
2. Spells (if spellcaster)
3. Weapon Attacks (with roll buttons)
4. Consumables & Items
5. Special Abilities & Features
6. Skill Checks (complete reference)
7. Quick Tip for new players

### 🔄 Character Creation Flow Fixed

Fixed navigation button labels in character wizard to reflect correct sequence.

#### **Background Selector**
- **Before**: "Next: Allocate Stats"
- **After**: "Next: Alignment"
- Now correctly indicates the next step is choosing alignment

#### **Alignment Selector**
- **Before**: "Next: Allocate Stats"
- **After**: "Next: Allocate Abilities"
- More accurate terminology (abilities vs stats)
- Matches the actual next step

### 🎒 Loot Cache Auto-Add

Consumables and crafting materials now automatically added to inventory from loot cache!

#### **How It Works**
- **Consumables Detection**: Automatically detects potions, scrolls, elixirs by name
- **Direct to Inventory**: Adds directly without opening equipment editor
- **Smart Categorization**: Sets category to 'consumable' automatically
- **Properties Preserved**: Maintains rarity, quantity, description, and value
- **Cost Conversion**: Converts loot value to gold pieces in Currency format

#### **Benefits**
- **Faster Workflow**: No more clicking through editor for every potion
- **Less Tedious**: Craft materials go straight to inventory
- **Still Editable**: Can edit from Inventory tab if needed
- **Special Items Still Manual**: Items with features (like magical cloaks) still open editor

### 🛠️ Technical Changes

#### **Files Modified**
- `src/pages/CharacterSheetPage.tsx`
  - Added `getResourcePools()` function to calculate class-specific resource pools
  - Added `handleRollToHit()` function for weapon attack rolls
  - Added `handleRollDamage()` function for weapon damage rolls
  - Added `weaponRolls` state to track temporary roll results
  - Added resource pools section to Actions tab (lines 1709-1741)
  - Added spell list section to Actions tab (lines 1744-1851)
  - Added comprehensive skill checks section (lines 2092-2341)
  - Modified loot cache handler to auto-add consumables (lines 293-318)
  - Imported `EMPTY_CURRENCY` from equipment types

- `src/components/BackgroundSelector.tsx`
  - Changed button text from "Next: Allocate Stats" to "Next: Alignment" (line 292)

- `src/components/AlignmentSelector.tsx`
  - Changed button text to "Next: Allocate Abilities" (line 276)

#### **Dependencies**
- Uses existing `rollDice()` function from dice types
- Uses existing `QuickRefTooltip` component for skill/spell references
- Uses existing `calculateModifier()` and `calculateProficiencyBonus()` functions

---

## Version 0.3.0 - February 23, 2026

### 🧪 Consumables & Potions System

Potions and consumables are now prominently displayed in Actions and Overview tabs with quick-use functionality.

#### **New Features**
- **Consumables in Actions Tab**: All potions, scrolls, and elixirs now appear in a dedicated section
- **Consumables in Overview Tab**: Quick access to potions directly from the Overview tab's right column
- **Healing Amount Display**: Potions automatically parse and display healing amounts (e.g., "❤️ Heals: 2d4+2")
- **Use Button**: Click "Use" to consume a potion, automatically reducing quantity or removing it
- **Quantity Tracking**: Potions with multiple quantities (e.g., 3x Healing Potion) decrease by 1 on use
- **Use Notifications**: Success messages show when potions are used and how many remain

#### **Healing Detection**
The system intelligently detects healing amounts from potion descriptions:
- Dice notation (2d4+2, 1d8, etc.)
- Hit point values (restores 10 hit points)
- Heals pattern (heals 2d8)

#### **How to Use**
1. Navigate to **Actions** or **Overview** tab
2. Find your consumables in the "🧪 Consumables" section
3. Click **Use** button to consume the item
4. Item quantity decreases or item is removed from inventory

### 🎯 Spell Selection Improvements

Fixed spell selection for Druids and improved spell grouping by level.

#### **Spell Level Grouping**
- **Before**: All spells shown in single "1st Level Spells" section
- **After**: Spells grouped by actual spell level (1st, 2nd, 3rd, etc.)
- Each spell level has its own header and grid
- Level 4 Druids can now select from both 1st and 2nd level spells
- Cleaner organization for multiclass spellcasters

#### **Druid Spell Selection Fixed**
- Level 4 Druids can now properly select 1st level spells
- Spell selector dynamically shows available spell levels based on character level
- Fixed: Spell selection was previously showing all spells in one section

### 🐉 Kobold Race Updates (PHB 2024)

Updated Kobold racial traits to match Player's Handbook 2024 rules.

#### **New Traits** (PHB 2024)
- **Draconic Cry**: Bonus action to grant advantage on attacks vs. enemies within 10 ft until start of next turn. Uses = proficiency bonus per long rest
- **Kobold Legacy**: Choose one of three options:
  - **Craftiness**: Proficiency in one skill of your choice
  - **Defiance**: Advantage on saves to avoid or end frightened condition
  - **Draconic Sorcery**: Know one sorcerer cantrip (INT, WIS, or CHA for spellcasting)

#### **Legacy Traits** (Pre-2024)
Old Kobold traits preserved for backwards compatibility:
- **Grovel, Cower, and Beg**: Action to give allies advantage (marked as Legacy)
- **Pack Tactics**: Advantage on attacks when ally within 5 ft (marked as Legacy)

#### **Quick Reference Updates**
- Added `draconic-cry` to clickable trait references
- Added `kobold-legacy` to clickable trait references
- Updated existing traits to indicate "Kobold (PHB 2024)" vs "Kobold (Legacy)"

### ⭐ Suggested Backgrounds

Background selector now intelligently suggests backgrounds based on your class's primary abilities.

#### **New Features**
- **Suggested Section**: Backgrounds that grant bonuses to class primary abilities appear first
- **Smart Sorting**: Fighter sees STR backgrounds first, Wizard sees INT backgrounds first
- **Class Matching**: Considers both primary ability AND spellcasting ability
- **Visual Indicator**: Gold star (⭐) and highlighted section for suggested backgrounds
- **Ability Display**: Shows which abilities match (e.g., "Suggested for Wizard (INTELLIGENCE)")

#### **How It Works**
- **Wizard** (INT primary): Sees Sage, Acolyte, Noble backgrounds first
- **Fighter** (STR primary): Sees Soldier, Folk Hero backgrounds first
- **Cleric** (WIS primary): Sees Acolyte, Folk Hero backgrounds first
- **Warlock** (CHA primary): Sees Noble, Criminal backgrounds first

#### **Other Backgrounds Section**
- Backgrounds without matching bonuses shown in separate "Other Backgrounds" section
- All backgrounds still available, just organized by relevance

### 🧹 UI Cleanup

#### **Inventory Tab**
- **Removed**: Large "Equipped Gear" section from top of Inventory tab
- **Kept**: Small cutaway windows showing important equipped gear
- Cleaner, more compact inventory view
- Less scrolling to reach actual inventory items

### 🛠️ Technical Changes

#### **Files Modified**
- `src/pages/CharacterSheetPage.tsx`
  - Added `parseHealingAmount()` helper function
  - Added `handleUsePotion()` function for consuming items
  - Added consumables section to Actions tab with healing display
  - Added consumables section to Overview tab's right column
  - Removed unused `EquippedGearSection` component (282 lines)
  - Removed unused imports (Shield, Cloak, useItemCharge)
- `src/components/SpellSelector.tsx`
  - Refactored to group spells by level (1st, 2nd, 3rd, etc.)
  - Dynamic level headers based on available spells
  - Fixed spell selection for higher level characters
- `src/data/quickReference.ts`
  - Added `draconic-cry` trait for Kobold (PHB 2024)
  - Added `kobold-legacy` trait for Kobold (PHB 2024)
  - Updated `grovel-cower-beg` source to "Kobold (Legacy)"
  - Updated `pack-tactics` source to "Kobold (Legacy)"
- `src/components/BackgroundSelector.tsx`
  - Added `characterClass` prop
  - Added `useMemo` hook for sorting backgrounds
  - Separated suggested vs. other backgrounds
  - Added suggested backgrounds header with class info
- `src/pages/CharacterCreatePage.tsx`
  - Passed `characterClass` prop to BackgroundSelector

#### **New Functions**
```typescript
// Parse healing amount from potion description
const parseHealingAmount = (description: string): string | null

// Handle using a potion/consumable
const handleUsePotion = (itemId: string): void
```

#### **State Management**
- Added `showConsumableNotification` state for use feedback
- Notifications auto-hide after 3 seconds

### 📊 Component Improvements

#### **SpellSelector**
- Before: All spells in one section
- After: Grouped by spell level with separate grids
- Better support for multiclass characters
- Cleaner visual organization

#### **BackgroundSelector**
- Before: All backgrounds in one grid
- After: Suggested backgrounds first, others below
- Smart ability matching
- Better new player guidance

---

## Version 0.2.9 - February 23, 2026

### 📦 Mats Inventory System

Added a separate "Mats" inventory for crafting materials that auto-consolidates quantities.

#### **New Features**
- **Separate Mats Inventory**: Herbs, ores, leathers, hides, and gems now go to a dedicated Mats inventory instead of equipment
- **Auto-Consolidation**: Materials with the same ID automatically combine quantities (5 Iron Ore + 3 Iron Ore = 8 Iron Ore)
- **Category Detection**: Automatically categorizes materials as herb, ore, leather, hide, gem, or other based on name
- **Sell System**: Each material has a sell button with rarity-based pricing
- **Quantity Management**: Increase/decrease quantities with +/- buttons
- **Weight Tracking**: Materials show total weight (0.1 lbs per unit)

#### **Material Categories**
- **Herbs**: Lavender, mint, sage, thyme, basil, rosemary, chamomile, flower petals, roots
- **Ores**: Iron ore, copper ore, gold, silver, mithril, adamantine, ingots
- **Leather**: Any leather-based materials
- **Hides**: Pelts, furs, hides
- **Gems**: Diamonds, rubies, sapphires, emeralds, amethysts, and other gems

#### **Sell Pricing**
- **Gems**: 1 gold per gem (100 copper)
- **Common**: 5 copper per unit
- **Uncommon**: 10 copper per unit
- **Rare**: 20 copper per unit
- **Epic**: 35 copper per unit
- **Legendary**: 50 copper per unit
- **Artifact**: 100 copper per unit

#### **Where to Find**
- Mats section appears in **Inventory** tab after Currency section
- Only visible when you have materials in your inventory
- Acquired from loot caches automatically

### 🪄 Druid 2nd Level Spells

Added 2nd level Druid spells and fixed spell selection for higher level characters.

#### **Druid 2nd Level Spells** (18 total)
- **Animal Messenger**: Send message via animal
- **Barkskin**: AC can't be less than 16
- **Beast Sense**: See through beast's eyes
- **Darkvision**: Grant darkvision 60 ft
- **Enhance Ability**: Advantage on ability checks
- **Find Traps**: Sense nearby traps
- **Flame Blade**: 3d6 fire damage melee attack
- **Flaming Sphere**: 2d6 fire damage AoE
- **Gust of Wind**: Push creatures 15 feet
- **Heat Metal**: 2d8 fire damage to metal wearers
- **Hold Person**: Paralyze humanoid
- **Lesser Restoration**: Remove disease or condition
- **Locate Animals or Plants**: Find creatures/plants within 5 miles
- **Locate Object**: Find object within 1,000 feet
- **Moonbeam**: 2d10 radiant damage cylinder
- **Pass without Trace**: +10 Stealth, can't be tracked
- **Protection from Poison**: Neutralize poison, advantage on saves
- **Spike Growth**: 2d4 piercing per 5 feet moved

#### **The Fix**
- **Level 1-2 Druids**: Can select 1st level spells
- **Level 3-4 Druids**: Can select 1st AND 2nd level spells
- **Level 5+ Druids**: Can select 1st, 2nd, and 3rd level spells (progression continues)
- Fixed SpellSelector component to dynamically load spells based on character level
- Other spellcasting classes still need level-based progression (future update)

### 🛠️ Technical Changes

#### **Files Added**
- None (added to existing files)

#### **Files Modified**
- `src/types/equipment.ts` - Added Material interface
- `src/types/character.ts` - Added materials array to Character
- `src/types/index.ts` - Exported Material type
- `src/stores/characterStore.ts` - Added addMaterial, removeMaterial, changeMaterialQuantity functions
- `src/pages/CharacterSheetPage.tsx` - Added Mats section, handleSellMaterial function, material routing
- `src/data/spells/druid.ts` - Added DRUID_LEVEL_2_SPELLS array (18 spells)
- `src/components/SpellSelector.tsx` - Added level-based spell loading for Druid

#### **New Data Structures**
```typescript
interface Material {
  id: string
  name: string
  description: string
  category: 'herb' | 'ore' | 'leather' | 'hide' | 'gem' | 'other'
  quantity: number
  rarity: 'trash' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'
  weight: number
}
```

#### **Spell Additions**
- **Druid**: 18 new 2nd level spells
- **Total Druid Spells**: 75 spells (8 cantrips + 67 leveled spells)

---

## Version 0.2.8 - February 23, 2026

### 🪄 Complete Druid Spell List

Added complete Druid spell list for all major spell levels.

#### **Druid Cantrips** (8 total)
- **Druidcraft**: Whispering to spirits of nature for sensory effects
- **Guidance**: +1d4 bonus to ability check
- **Mending**: Repair breaks in objects
- **Poison Spray**: 1d12 poison damage ranged attack
- **Produce Flame**: Create flame for light or 1d8 fire attack
- **Resistance**: +1d4 bonus to saving throw
- **Shillelagh**: Empower wooden club/quarterstaff (1d8 magical damage)
- **Thorn Whip**: 1d6 piercing and pull creature 10 feet

#### **Druid 1st Level Spells** (14 total)
- Animal Friendship, Charm Person, Create or Destroy Water, Cure Wounds, Detect Magic, Detect Poison and Disease, Entangle, Faerie Fire, Fog Cloud, Goodberry, Healing Word, Jump, Longstrider, Speak with Animals, Thunderwave

#### **Druid 3rd Level Spells** (12 total)
- Call Lightning, Conjure Animals, Daylight, Dispel Magic, Meld into Stone, Plant Growth, Protection from Energy, Sleet Storm, Speak with Plants, Water Breathing, Water Walk, Wind Wall

#### **Druid 5th Level Spells** (14 total)
- Antilife Shell, Awaken, Commune with Nature, Cone of Cold, Conjure Elemental, Contagion, Geas, Greater Restoration, Insect Plague, Mass Cure Wounds, Reincarnate, Scrying, Tree Stride, Wall of Stone

#### **Druid 7th Level Spells** (5 total)
- Fire Storm, Mirage Arcane, Plane Shift, Regenerate, Reverse Gravity

#### **Druid 9th Level Spells** (4 total)
- Foresight, Shapechange, Storm of Vengeance, True Resurrection

### ✨ Extended Sorcerer Spell List

Completed Sorcerer spell list with high-level spells (levels 3, 5, 7, 9).

#### **Sorcerer 3rd Level Spells** (16 total)
- Blink, Counterspell, Daylight, Dispel Magic, Fireball, Fly, Gaseous Form, Haste, Hypnotic Pattern, Lightning Bolt, Major Image, Sleet Storm, Slow, Stinking Cloud, Tongues, Water Breathing, Water Walk

#### **Sorcerer 5th Level Spells** (11 total)
- Animate Objects, Cloudkill, Cone of Cold, Creation, Dominate Person, Hold Monster, Insect Plague, Seeming, Telekinesis, Teleportation Circle, Wall of Stone

#### **Sorcerer 7th Level Spells** (8 total)
- Delayed Blast Fireball, Etherealness, Finger of Death, Fire Storm, Plane Shift, Prismatic Spray, Reverse Gravity, Teleport

#### **Sorcerer 9th Level Spells** (6 total)
- Gate, Meteor Swarm, Power Word Kill, Time Stop, True Polymorph, Wish

### 🏹 Racial Weapon Proficiency Fix

Fixed elf racial weapon proficiencies to work regardless of class choice.

#### **The Problem**
- Equipment selector only checked class weapon proficiencies
- Elves could not use longbow/shortbow if their class didn't have martial proficiency
- High Elf and Wood Elf racial proficiencies were being ignored

#### **The Solution**
- Updated `EquipmentSelector` to check both class AND racial weapon proficiencies
- Added `race` prop to equipment selector
- Filters now check: class proficiencies OR racial proficiencies
- Elves can now use longbow and shortbow regardless of class

#### **Affected Races**
- **High Elf**: longsword, shortsword, longbow, shortbow
- **Wood Elf**: longsword, shortsword, longbow, shortbow
- **Drow**: rapier, shortsword, hand crossbow
- **Dwarf**: battleaxe, handaxe, light hammer, warhammer

### 🐛 Actions Tab Fix for Older Characters

Fixed Actions tab not displaying weapons and armor for characters created before the `equipped` property was added.

#### **The Problem**
- Older characters have equipment without the `equipped` property (optional field)
- Actions tab filtered for `item.equipped === true`
- Items with `equipped: undefined` were being filtered out
- Older characters appeared to have no equipped weapons in Actions tab

#### **The Solution**
- Changed filter from `item.equipped === true` to `item.equipped !== false`
- Now treats `undefined` as equipped (backwards compatible)
- Fixed in 3 locations: Actions tab weapons, character sheet weapons, character sheet armor
- Older characters now display all equipment correctly

### 🛠️ Technical Changes

#### **Files Added**
- `src/data/spells/druid.ts` - Complete Druid spell list (57 spells)

#### **Files Modified**
- `src/data/spells/sorcerer.ts` - Added levels 3, 5, 7, 9 spells (41 new spells)
- `src/data/spells/index.ts` - Export Druid spells
- `src/components/SpellSelector.tsx` - Added Druid spell support
- `src/components/EquipmentSelector.tsx` - Added racial proficiency checking
- `src/pages/CharacterCreatePage.tsx` - Pass race to EquipmentSelector
- `src/pages/CharacterSheetPage.tsx` - Fixed equipped filter for backwards compatibility

#### **Spell Additions**
- **Druid**: 57 spells across 6 spell levels
- **Sorcerer**: 41 new spells (levels 3, 5, 7, 9)
- **Total New Spells**: 98 spells added

---

## Version 0.2.7 - February 23, 2026

### 🎒 Inventory Organization Overhaul

The inventory tab has been completely reorganized for better clarity and easier item management.

#### **Organized Inventory Sections**

**Equipped Items** (separated by type):
- ⚔️ **Equipped Weapons** - All equipped weapons in dedicated section
- 🛡️ **Equipped Armor** - All equipped armor pieces
- ✨ **Equipped Accessories** - Shields, cloaks, and jewelry together

**Crafting Materials** (new dedicated section):
- 🔨 **Crafting Materials** - All ores, herbs, and materials separated from regular inventory
- Easy to see what you have for blacksmithing, alchemy, and tailoring
- Quantity clearly displayed for stackable materials

**Backpack & Misc Items**:
- 🎒 **Backpack** - Everything else (potions, scrolls, food, tools, etc.)
- No more mixing equipped gear with backpack items

#### **Benefits**
- **Quick Equipment Reference**: See exactly what you're wearing at a glance
- **Material Management**: Track crafting resources separately
- **Cleaner Interface**: No more scrolling through mixed lists
- **Better Organization**: Logical grouping by function

### 🪄 Spell Selector Improvements

Fixed button text in spell selector when used after character creation.

#### **Button Text Context**
- **During Character Creation**: Shows "Next: Equipment" (continues to next step)
- **After Character Creation**: Shows "Done" (returns to character sheet)
- **Applies to both**: Regular spell selection and "Skip for Now" buttons

#### **Technical Changes**
- Added `isCharacterCreation` prop to SpellSelector component
- Defaults to `true` for backward compatibility
- Set to `false` when used from character sheet "Choose Class Spells" button

### ⚖️ Alignment Selection (Already Working)

Alignment selector is already functional on the Overview tab:
- Shows "Not Selected" in red if alignment is missing
- Edit button (✏️) for existing alignment
- Add button (➕) when no alignment chosen
- Full alignment grid modal for selection

### 🛠️ Technical Changes

#### **Modified Files**
- `src/components/SpellSelector.tsx` - Added isCharacterCreation prop for context-aware button text
- `src/pages/CharacterSheetPage.tsx` - Reorganized inventory tab with 5 distinct sections

#### **New Features**
- Inventory sections: Weapons, Armor, Accessories, Crafting Materials, Backpack
- Conditional rendering of sections (only show if items exist)
- Type guards used for proper TypeScript filtering

---

## Version 0.2.6 - February 23, 2026

### 🔨 Crafting Materials System

Players can now find crafting materials in loot caches to support blacksmithing, tailoring, leatherworking, and alchemy professions.

#### **Crafting Materials by Rarity**

**Common & Uncommon Loot** (entry-level crafting):
- **Iron Ore Clumps** - Base material for weapons and armor
- **Copper Ore Clumps** - Base material for tools and accessories
- **Common Herbs** - Lavender, Mint for basic potions and healing salves
- **Uncommon Herbs** - Foxglove, Wolfsbane for potent potions and antidotes

**Rare Loot** (advanced crafting):
- **Silver Ore Clumps** - Fine jewelry and silver weapons
- **Gold Ore Clumps** - Valuable jewelry and decorative items
- **Rare Herbs** - Mandrake Root, Bloodthorn for powerful alchemical concoctions

**Epic Loot** (legendary crafting):
- **Mithril Ore Clumps** - Lightweight, superior armor and weapons
- **Adamantite Ore Clumps** - Incredibly hard, indestructible equipment
- **Extremely Rare Herbs** - Arcane Nightshade, Phoenix Feather Grass for legendary elixirs

**Legendary Loot** (mythical crafting):
- **Dragonscale Leather Hides** - Ancient dragon hide for legendary armor
- **Obsidian-Steel Ore Clumps** - Mythical volcanic metal forged in dragon fire

**Artifact Loot** (ultimate crafting):
- **Flawless Gems** - Diamond, Emerald, Ruby, Sapphire, Amethyst for the most powerful enchantments

#### **Crafting Material Benefits**
- **Sell for Profit**: All materials have gold value and can be sold for income
- **Future Crafting**: Foundation for blacksmithing, tailoring, and leatherworking systems
- **Alchemy Ingredients**: Herbs for potion-making and alchemical experiments
- **Economic Gameplay**: Players can specialize in gathering and selling materials

### 📖 Story Tab - Character Lore & Notes

New dedicated tab for writing and tracking character stories, background, and campaign notes.

#### **Story Editor Features**
- **Large Text Area**: Spacious textarea (h-96) for extensive writing
- **Auto-Save Support**: Save button to preserve your story
- **Free-Form Writing**: Write anything - backstory, personality, goals, relationships, events
- **Placeholder Guide**: Built-in prompts for what to include

#### **Story Writing Guide**
Includes helpful sections:
- **Backstory**: Where they came from, childhood, formative events
- **Personality**: Character traits, behaviors, quirks
- **Goals & Motivations**: What drives them to adventure
- **Relationships**: Family, friends, mentors, rivals, enemies
- **Important Events**: Major moments in their life or campaign
- **Campaign Notes**: Quest details, NPCs met, secrets discovered

#### **User Experience**
- **Beautiful UI**: Purple/indigo gradient header with gold accents
- **Success Notifications**: Confirmation when story is saved
- **Positioned After Features**: Easy to find between Features and Loot Cache tabs
- **Perfect for DMs**: Track character development and story arcs

### 🛠️ Technical Changes

#### **Modified Files**
- `src/data/lootGenerator.ts` - Added 20+ crafting materials across all rarity tiers
- `src/pages/CharacterSheetPage.tsx` - Added Story tab with robust text editor

#### **New Features**
- Added 'story' to activeTab union type
- Story tab with 400px tall textarea for extensive writing
- Crafting Material category in loot system
- Quantity support for stackable crafting materials

---

## Version 0.2.5 - February 23, 2026

### 🎒 Survival & Supply Tracking

#### **Carrying Capacity System**
- **Weight Management**: Track current weight vs maximum capacity (STR × 15)
- **Encumbrance Threshold**: Calculated at STR × 5 for speed reduction
- **Auto-Calculation**: Total weight computed from all equipped items
- **Utility Functions**: `calculateCarryingCapacity()`, `calculateEncumbranceThreshold()`, `calculateTotalWeight()`

#### **Food & Water Supplies**
- **Days of Food**: Track food rations as days remaining
- **Days of Water**: Track water supply as days remaining
- **Auto-Storage**: Food/water loot automatically adds to supplies instead of inventory
- **Smart Detection**: Items categorized as 'Food' or 'Water' route to supply tracking

### ⚔️ Actions Tab - At-a-Glance Combat Reference

#### **New "Actions" Tab**
- **Combat-Ready Interface**: Everything needed for combat in one place
- **Perfect for New Players**: All available actions shown clearly
- **Smart Organization**: Divided into weapons, consumables, spells, and abilities

#### **Weapon Attacks Section** 🗡️
- **Equipped Weapons Display**: Shows all equipped weapons with stats
- **Auto-Calculated Attack Bonuses**: Ability modifier + proficiency bonus
- **Finesse Weapon Support**: Uses best of STR or DEX automatically
- **Damage Display**: Shows damage dice and type (e.g., "2d6 slashing")
- **Properties Listed**: Finesse, versatile, reach, etc.

#### **Consumables Section** 🧪
- **Potion Auto-Detection**: Finds all potions, scrolls, and elixirs
- **Quantity Display**: Shows how many you have of each
- **Magical Charges**: Displays charges for wands and magical items
- **Quick Access**: No need to dig through inventory during combat

#### **Spells Section** ✨
- **Cantrips**: At-will spells shown separately (purple theme)
- **Leveled Spells**: All spells with remaining spell slot tracking
- **Damage Quick-Reference**: Damage dice shown for attack spells
- **Spell School Display**: Shows spell type for quick identification

#### **Special Abilities Section** ⚡
- **Class Features**: Action Surge, Second Wind, etc. with charge tracking
- **Item Abilities**: Invisibility cloaks and other magical items
- **Recharge Conditions**: Shows when abilities recharge (short rest, long rest)

#### **Quick Tip for New Players** 💡
- **Turn Structure Explained**: Move, Action, Bonus Action
- **Beginner-Friendly**: Helps players understand what they can do

### 📚 Spell Selection Improvements

#### **"Choose Class Spells" Button**
- **Mid-Game Spell Selection**: Change or add spells anytime
- **Class-Filtered**: Only shows spells available to your class
- **Subclass Integration**: Includes domain/patron spells
- **For Spellcasters Only**: Hidden for melee classes (Fighter, Barbarian, etc.)
- **Perfect for Late Additions**: Players who skipped spell selection during creation

#### **Two Spell Buttons**
- **"Choose Class Spells" (📚)**: Select from your class spell list
- **"Add Spell" (+)**: Add any spell (from shops, scrolls, magic items)

### ⚖️ Alignment Management

#### **Alignment in Overview**
- **Always Visible**: Alignment shown in Character Info section
- **Not Selected Warning**: Shows "Not Selected" in red if alignment missing
- **Change Anytime**: Edit button (✏️) or Add button (➕) next to alignment
- **Modal Selector**: Full alignment grid opens in modal

#### **Alignment Change Feature**
- **Full Alignment Selector**: 3×3 grid with all nine alignments
- **Hover Descriptions**: See examples and explanations for each alignment
- **Color-Coded**: Visual distinction between Good, Neutral, Evil
- **Success Notification**: Confirms alignment change/selection

### 🎁 Item Features System

#### **Magical Items with Abilities**
- **Auto-Feature Addition**: Items like "Invisibility Cloak" automatically add abilities to Features tab
- **Easy Access**: Players see all abilities at a glance
- **Stored in Features**: No need to remember which items grant abilities
- **Still in Inventory**: Items appear in both equipment and features

### 💰 Loot Currency Rebalancing

#### **More Realistic Currency Rewards**
- **Trash**: 1-10 copper (was 1-5)
- **Common**: 30-70 copper (was 10-75 gold)
- **Uncommon**: 1-7 silver (was 60-75 gold)
- **Rare**: 1-25 silver (was 50-75 gold)
- **Epic**: 1-15 gold (was 3-10 platinum)
- **Legendary**: 50-95 gold (was 7-10 platinum)
- **No More Decimals**: All currency values are whole numbers

### 🐛 Bug Fixes

#### **Fixed Actions Tab Type Guards**
- **Weapon Filtering**: Uses proper `isWeapon()` type guard
- **Type Safety**: Prevents runtime errors when displaying weapons
- **No More Crashes**: Actions tab renders correctly for all character types

### 🛠️ Technical Updates

#### **Files Modified**
- `src/types/character.ts` - Added carryingCapacity, foodRations, waterSupply, itemFeatures
- `src/types/index.ts` - Exported new utility functions
- `src/stores/characterStore.ts` - Added supply management actions, setAlignment
- `src/data/lootGenerator.ts` - Updated currency values, added foodDays/waterDays fields, added feature field
- `src/pages/CharacterSheetPage.tsx` - Added Actions tab, alignment selector modal, food/water/ability routing
- `src/components/AlignmentSelector.tsx` - Imported for mid-game alignment changes

#### **New Utility Functions**
- `calculateCarryingCapacity(strength)` - Returns STR × 15
- `calculateEncumbranceThreshold(strength)` - Returns STR × 5
- `calculateTotalWeight(equipment)` - Sums equipment weight

#### **New Store Actions**
- `updateCarryingCapacity()` - Recalculates weight and capacity
- `addFoodRations(days)` - Adds days of food
- `consumeFoodRations(days)` - Consumes food rations
- `addWaterSupply(days)` - Adds days of water
- `consumeWaterSupply(days)` - Consumes water supply
- `addItemFeature(feature)` - Adds magical item ability to features
- `removeItemFeature(featureId)` - Removes item feature

---

## Version 0.2.4 - February 23, 2026

### ⚖️ Alignment Selection

#### **New Character Creation Step**
- **Interactive Alignment Selector**: Beautiful 3x3 grid for choosing character alignment
- **Color-Coded Alignments**: Each alignment has distinct colors (blue for good, red for evil, etc.)
- **Examples & Descriptions**: Hover over alignments to see character examples
- **Position in Flow**: Alignment selection added between Background and Stats steps
- **Educational**: Explains Law/Chaos and Good/Evil axes for new players

#### **Alignment System**
- **Nine Options**: Lawful Good, Neutral Good, Chaotic Good, Lawful Neutral, True Neutral, Chaotic Neutral, Lawful Evil, Neutral Evil, Chaotic Evil
- **Character Sheet Integration**: Alignment displayed in character review
- **Save System**: Alignment persists with character data

### 🔮 Sorcerer Spell Lists

#### **Complete Spell Implementation**
- **15 Cantrips**: Acid Splash, Blade Ward, Chill Touch, Dancing Lights, Fire Bolt, Friends, Light, Message, Poison Spray, Ray of Frost, Shocking Grasp, True Strike, plus Mage Hand, Minor Illusion, Prestidigitation
- **18 Level 1 Spells**: Burning Hands, Charm Person, Chromatic Orb, Color Spray, Disguise Self, Expeditious Retreat, False Life, Feather Fall, Fog Cloud, Jump, Mage Armor, Magic Missile, Ray of Sickness, Shield, Silent Image, Sleep, Thunderwave, Witch Bolt, plus Detect Magic
- **Spell Selector Integration**: Sorcerers now have full spell selection during character creation
- **Shared Spell List**: Many spells also available to Wizards (Fire Bolt, Magic Missile, Shield, etc.)

### 🎒 Equipment Ability Score Modifiers

#### **Magic Item Stats System**
- **New Field**: `abilityScoreModifiers` on all equipment types
- **Automatic Calculation**: Equipped items modify ability scores (e.g., Belt of Giant Strength +2 STR)
- **Character Sheet Display**: Total ability scores shown (base + equipment bonuses)
- **Utility Function**: `calculateTotalAbilityScores()` computes final stats
- **Flexible System**: Any equipment can boost any ability score

### 📖 Reference System Improvements

#### **Fixed Broken References**
- **Lightning Breath**: Added full dragonborn breath weapon trait (damage scaling, save DC, recharge)
- **Spellcasting**: Added general spellcasting trait (spell save DC, attack bonus, slot mechanics)
- **Font of Magic**: Added sorcerer sorcery points trait (conversion rates, point costs)
- **Metamagic**: Added sorcerer metamagic trait (all 8 options, costs, progression)

#### **New Trait References**
- All four traits fully documented with mechanics, examples, and formulas
- Clickable <ref> tags added to Sorcerer class features
- Dragonborn Lightning Breath now links to full trait explanation

### 🛠️ Technical Updates

#### **Files Added**
- `src/components/AlignmentSelector.tsx` - Interactive alignment selection UI
- `src/data/spells/sorcerer.ts` - Complete sorcerer spell lists

#### **Files Modified**
- `src/types/character.ts` - Added Alignment type, calculateTotalAbilityScores()
- `src/types/equipment.ts` - Added AbilityScoreModifiers interface
- `src/types/index.ts` - Exported new types and functions
- `src/types/class.ts` - Added reference tags to Sorcerer features
- `src/stores/characterStore.ts` - Added alignment step, setAlignment action
- `src/pages/CharacterCreatePage.tsx` - Integrated alignment selector
- `src/components/SpellSelector.tsx` - Added sorcerer spell support
- `src/data/spells/index.ts` - Exported sorcerer spells
- `src/data/quickReference.ts` - Added 4 new trait references
- `src/constants/characterCreation.ts` - Updated wizard steps

---

## Version 0.2.3 - February 22, 2026

### 💰 Currency System Overhaul

#### **Removed Electrum (EP)**
- **Simplified Currency**: Removed electrum pieces from the game entirely
- **Four Denominations**: Now only copper, silver, gold, and platinum
- **Updated UI**: Currency displays and editors no longer show electrum
- **Cleaner System**: Easier for new players to understand

#### **Auto-Conversion System**
- **Automatic Upgrades**: Currency automatically converts to higher denominations
- **Conversion Rates**: 100 copper = 1 silver, 100 silver = 1 gold, 100 gold = 1 platinum
- **Smart Calculations**: When you get 150 gold, it becomes 1 platinum + 50 gold
- **Always Applied**: Happens automatically on all currency updates
- **No Manual Work**: Never need to manually exchange coins

#### **Manual Currency Conversion Button**
- **💱 Convert Button**: New button in Currency section for manual conversion
- **For Old Characters**: Fixes currency for characters created before auto-conversion
- **One-Click Fix**: Instantly converts existing currency to new system
- **Yellow Button**: Located next to "Add Currency" button
- **Tooltip**: Hover to see conversion rates (100cp→1sp, 100sp→1gp, 100gp→1pp)

#### **Loot Generator Currency Limits**
- **Legendary Loot**: Max 10 platinum pieces (down from 5000-10000 gp)
- **Epic Loot**: Max 10 platinum pieces
- **Rare/Uncommon/Common**: Max 75 gold pieces
- **Trash Loot**: Max 75 copper pieces
- **Balanced Rewards**: More reasonable treasure amounts for weekly sessions

### 📚 Content Additions

#### **Sorcerer Origin Trait References**
- **Wild Magic Surge**: Full trait reference with mechanics and table link
- **Tides of Chaos**: Detailed explanation of advantage mechanic and surge interaction
- **Dragon Ancestor**: Complete dragon type list, Draconic language, interaction bonuses
- **Draconic Resilience**: HP bonus calculation and unarmored AC formula
- **Elemental Affinity**: Damage bonus and resistance mechanics
- **Dragon Wings**: Flying speed mechanics and armor compatibility
- **Draconic Presence**: Aura mechanics, charm/frighten effects, save DCs

#### **Wild Magic Surge Table**
- **Complete d100 Table**: All 50 random magical effects
- **Effect Categories**: Helpful, harmful, and bizarre outcomes
- **Full Details**: Duration, mechanics, save DCs for each effect
- **Clickable Reference**: Links from Wild Magic Surge trait to full table
- **Example Effects**: Fireball centered on self, grow a shouting beard, teleport randomly, gain temporary benefits

### 🐛 Bug Fixes

#### **Fixed Patch Notes Loading**
- **Issue**: Patch notes showed 404 HTML page instead of markdown content
- **Solution**: Bundle PATCH_NOTES.md directly into the app using raw import
- **Benefit**: Patch notes always available, no network errors
- **Fast Loading**: Instant display, no fetching required

#### **Fixed React Error #185 (Infinite Loop)**
- **Issue**: LanguageSelector caused infinite render loop during character creation
- **Error**: "Cannot update a component while rendering a different component"
- **Root Cause**: `onChange` callback in useEffect dependency array
- **Solution**: Removed `onChange` from dependencies, only fire on `selectedLanguages` change
- **Result**: Character creation works smoothly without crashes

#### **Fixed Spell Scroll Selector Scrolling**
- **Issue**: 9th level spell scroll selector list was unscrollable
- **Problem**: Grid layout didn't properly constrain child heights for overflow
- **First Attempt**: Added `overflow-hidden` to parent - didn't work
- **Final Solution**: Replaced grid with flexbox layout using `flex flex-col` and `flex-1 min-h-0`
- **Technical**: Flexbox with `min-h-0` allows children to shrink below content size
- **Result**: Both spell list and details panels now scroll properly

### 🛠️ Technical Improvements

#### **Currency Type Updates**
- **Currency Interface**: Removed `electrum` property from all Currency objects
- **Type Safety**: TypeScript enforces new 4-denomination system
- **Conversion Rates**: Updated CURRENCY_TO_COPPER with 100:1 ratios
- **Helper Function**: New `autoConvertCurrency()` utility function

#### **Files Updated**
- `src/types/equipment.ts` - Currency interface and auto-conversion logic
- `src/types/index.ts` - Export autoConvertCurrency function
- `src/types/class.ts` - Added reference tags to Wild Magic and Draconic Bloodline features
- `src/stores/characterStore.ts` - Integrated auto-conversion
- `src/data/lootGenerator.ts` - Updated all currency loot limits
- `src/data/equipment.ts` - Removed electrum from cost objects
- `src/data/quickReference.ts` - Added 7 sorcerer traits, Wild Magic Surge table
- `src/pages/CharacterSheetPage.tsx` - Removed electrum, added manual convert button
- `src/components/EquipmentEditor.tsx` - Removed electrum from editor
- `src/components/PatchNotesModal.tsx` - Created for bundled markdown display
- `src/components/NinthLevelSpellSelector.tsx` - Fixed scrolling with flexbox
- `src/components/LanguageSelector.tsx` - Fixed infinite loop
- `src/vite-env.d.ts` - Added type declarations for raw markdown imports

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
