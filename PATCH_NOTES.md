# Dungeons - Patch Notes

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
