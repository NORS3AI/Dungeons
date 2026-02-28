import type { ClassFeature } from '../types/class'

/**
 * Loot rarity levels
 */
export type LootRarity = 'trash' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'

/**
 * Rarity color coding
 */
export const RARITY_COLORS: Record<LootRarity, { text: string; bg: string; border: string; glow: string }> = {
  trash: { text: 'text-gray-500', bg: 'bg-gray-900', border: 'border-gray-700', glow: '' },
  common: { text: 'text-white', bg: 'bg-gray-800', border: 'border-gray-600', glow: '' },
  uncommon: { text: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-600', glow: 'shadow-green-500/20' },
  rare: { text: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-600', glow: 'shadow-blue-500/30' },
  epic: { text: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-600', glow: 'shadow-purple-500/40' },
  legendary: { text: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-600', glow: 'shadow-yellow-500/50' },
  artifact: { text: 'text-red-400', bg: 'bg-red-900/30', border: 'border-red-600', glow: 'shadow-red-500/60 shadow-2xl' },
}

/**
 * Generated loot item
 */
export interface LootItem {
  id: string
  name: string
  category: string
  description: string
  rarity: LootRarity
  value: number // in gold pieces (MUST be whole number, never decimal)
  quantity?: number
  foodDays?: number // Days of food (for Food category)
  waterDays?: number // Days of water (for Water category)
  feature?: ClassFeature // Special ability granted by this item (for Ability category)
  /** Reduces total inventory weight when this item is in inventory (e.g. Bag of Holding) */
  weightReduction?: number
  /** Bonus added to weapon damage rolls when this item is equipped and a weapon is also equipped */
  weaponDamageBonus?: number
  /** Bonus added to weapon attack rolls when this item is equipped and a weapon is also equipped */
  attackBonus?: number
  /** Market value of a single unit (for crafting materials) */
  worth?: { gold: number; silver: number }
}

/**
 * Loot generation based on class preferences
 */
const CLASS_LOOT_WEIGHTS: Record<string, {
  weapons: string[]
  armor: string[]
  consumables: string[]
  magical: string[]
}> = {
  fighter: {
    weapons: ['longsword', 'greatsword', 'battleaxe', 'warhammer', 'lance', 'halberd'],
    armor: ['plate armor', 'chainmail', 'shield', 'helmet'],
    consumables: ['healing potion', 'antitoxin', 'alchemist\'s fire'],
    magical: ['weapon enhancement', 'armor enhancement', 'ring of protection'],
  },
  warlock: {
    weapons: ['dagger', 'staff', 'wand', 'rod'],
    armor: ['robes', 'cloak', 'amulet'],
    consumables: ['spell scroll', 'potion of mana', 'incense'],
    magical: ['eldritch tome', 'focus crystal', 'pact trinket', 'ring of spell storing'],
  },
  rogue: {
    weapons: ['dagger', 'shortsword', 'hand crossbow', 'rapier'],
    armor: ['leather armor', 'studded leather', 'cloak of elvenkind'],
    consumables: ['thieves\' tools', 'disguise kit', 'poison vial', 'smoke bomb'],
    magical: ['boots of stealth', 'gloves of thievery', 'cloak of invisibility'],
  },
  wizard: {
    weapons: ['staff', 'wand', 'dagger'],
    armor: ['robes', 'hat', 'spellbook'],
    consumables: ['spell scroll', 'ink and quill', 'component pouch', 'potion of intellect'],
    magical: ['wand of fireballs', 'ring of spell storing', 'crystal ball', 'tome of knowledge'],
  },
  cleric: {
    weapons: ['mace', 'warhammer', 'holy symbol'],
    armor: ['chainmail', 'shield', 'plate armor'],
    consumables: ['holy water', 'healing potion', 'prayer beads'],
    magical: ['holy symbol of power', 'blessed armor', 'divine focus'],
  },
  ranger: {
    weapons: ['longbow', 'shortsword', 'dual daggers', 'hunting knife'],
    armor: ['leather armor', 'studded leather', 'cloak'],
    consumables: ['arrows', 'rope', 'rations', 'healing salve'],
    magical: ['quiver of endless arrows', 'boots of striding', 'cloak of the ranger'],
  },
  barbarian: {
    weapons: ['greataxe', 'greatsword', 'maul', 'handaxe'],
    armor: ['hide armor', 'tribal mask', 'totem'],
    consumables: ['healing potion', 'rage tonic', 'war paint'],
    magical: ['belt of giant strength', 'berserker axe', 'amulet of health'],
  },
  paladin: {
    weapons: ['longsword', 'warhammer', 'lance', 'holy avenger'],
    armor: ['plate armor', 'shield', 'helmet'],
    consumables: ['holy water', 'healing potion', 'blessed oil'],
    magical: ['holy avenger', 'armor of faith', 'divine shield'],
  },
}

/**
 * Race-specific loot preferences
 */
const RACE_LOOT_PREFERENCES: Record<string, string[]> = {
  drow: ['drow poison', 'hand crossbow', 'spider silk rope', 'dark vision goggles'],
  dwarf: ['ale', 'smithing tools', 'mining pick', 'dwarven crafts'],
  elf: ['longbow', 'elven wine', 'musical instrument', 'nature trinkets'],
  tiefling: ['infernal contract', 'sulfur incense', 'dark tome', 'cursed trinket'],
  dragonborn: ['dragon scale', 'breath weapon focus', 'hoard piece'],
  halfling: ['cooking utensils', 'pipe', 'lucky charm', 'small tools'],
  human: ['versatile gear', 'trade goods', 'common tools'],
}

/**
 * Trash loot pool - worthless or nearly worthless items
 */
const TRASH_LOOT: LootItem[] = [
  { id: 'trash-copper', name: 'Few Copper Coins', category: 'Currency', description: '1-10 copper pieces', rarity: 'trash', value: 5 }, // 5 copper (midpoint of 1-10)
  { id: 'trash-stick', name: 'Broken Stick', category: 'Gear', description: 'A useless broken branch', rarity: 'trash', value: 0 },
  { id: 'trash-rag', name: 'Dirty Rag', category: 'Gear', description: 'Torn and filthy cloth', rarity: 'trash', value: 0 },
  { id: 'trash-pebble', name: 'Smooth Pebble', category: 'Trinket', description: 'A worthless stone', rarity: 'trash', value: 0 },
  { id: 'trash-bone', name: 'Old Bone', category: 'Trinket', description: 'Gnawed animal bone', rarity: 'trash', value: 0 },
  { id: 'trash-button', name: 'Tarnished Button', category: 'Trinket', description: 'Worthless button', rarity: 'trash', value: 0 },
]

/**
 * Common loot pool
 */
const COMMON_LOOT: LootItem[] = [
  { id: 'gp-small', name: 'Small Coin Purse', category: 'Currency', description: '30-50 copper pieces', rarity: 'common', value: 40 }, // 40 copper
  { id: 'gp-medium', name: 'Medium Coin Purse', category: 'Currency', description: '50-70 copper pieces', rarity: 'common', value: 60 }, // 60 copper
  { id: 'healing-potion', name: 'Potion of Healing', category: 'Consumable', description: 'Restores 2d4+2 hit points', rarity: 'common', value: 50 },
  { id: 'rations', name: 'Travel Rations', category: 'Food', description: '5 days of food', rarity: 'common', value: 5, foodDays: 5 },
  { id: 'waterskin', name: 'Waterskin', category: 'Water', description: '3 days of water', rarity: 'common', value: 2, waterDays: 3 },
  { id: 'rope', name: 'Hempen Rope', category: 'Gear', description: '50 feet of rope', rarity: 'common', value: 1 },
  { id: 'torch', name: 'Torches', category: 'Gear', description: 'Light source', rarity: 'common', value: 1, quantity: 10 },
  { id: 'arrows', name: 'Arrows', category: 'Ammunition', description: 'Standard arrows', rarity: 'common', value: 1, quantity: 20 },
  { id: 'bolts', name: 'Crossbow Bolts', category: 'Ammunition', description: 'Standard bolts', rarity: 'common', value: 1, quantity: 20 },
  // Crafting Materials — Ore
  { id: 'iron-ore', name: 'Iron Ore Nugget', category: 'Crafting Material', description: 'Raw iron ore for blacksmithing', rarity: 'common', value: 5, quantity: 3, worth: { gold: 0, silver: 2 } },
  { id: 'copper-ore', name: 'Copper Ore Nugget', category: 'Crafting Material', description: 'Raw copper ore for blacksmithing', rarity: 'common', value: 3, quantity: 3, worth: { gold: 0, silver: 1 } },
  // Crafting Materials — Cloth
  { id: 'linen-cloth', name: 'Linen Cloth', category: 'Crafting Material', description: 'Common cloth for tailoring basic armor', rarity: 'common', value: 2, quantity: 5, worth: { gold: 0, silver: 1 } },
  { id: 'wool-cloth', name: 'Wool Cloth', category: 'Crafting Material', description: 'Common wool cloth for tailoring', rarity: 'common', value: 3, quantity: 5, worth: { gold: 0, silver: 2 } },
  // Crafting Materials — Hide
  { id: 'light-hide', name: 'Light Animal Hide', category: 'Crafting Material', description: 'Common hide from small animals, used for light armor', rarity: 'common', value: 4, quantity: 3, worth: { gold: 0, silver: 2 } },
  // Crafting Materials — Herb
  { id: 'common-herb-lavender', name: 'Lavender', category: 'Crafting Material', description: 'Common herb for alchemy and healing salves', rarity: 'common', value: 2, quantity: 5, worth: { gold: 0, silver: 1 } },
  { id: 'common-herb-mint', name: 'Mint Leaves', category: 'Crafting Material', description: 'Common herb for alchemy and potions', rarity: 'common', value: 2, quantity: 5, worth: { gold: 0, silver: 1 } },
]

/**
 * Uncommon loot pool
 */
const UNCOMMON_LOOT: LootItem[] = [
  { id: 'gp-large', name: 'Small Silver Pouch', category: 'Currency', description: '1-7 silver pieces', rarity: 'uncommon', value: 40 }, // 4 silver (40 copper)
  { id: 'greater-healing', name: 'Potion of Greater Healing', category: 'Consumable', description: 'Restores 4d4+4 hit points', rarity: 'uncommon', value: 150 },
  { id: 'preserved-food', name: 'Preserved Rations', category: 'Food', description: '10 days of preserved food', rarity: 'uncommon', value: 15, foodDays: 10 },
  { id: 'spell-scroll-1', name: 'Spell Scroll (1st Level)', category: 'Consumable', description: 'Contains a 1st level spell', rarity: 'uncommon', value: 100 },
  { id: 'masterwork-weapon', name: 'Masterwork Weapon', category: 'Weapon', description: '+1 to attack and damage rolls', rarity: 'uncommon', value: 300, weaponDamageBonus: 1, attackBonus: 1 },
  { id: 'cloak-protection', name: 'Cloak of Protection', category: 'Armor', description: '+1 to AC and saving throws', rarity: 'uncommon', value: 250 },
  { id: 'bag-holding', name: 'Bag of Holding', category: 'Wondrous', description: 'Reduces total carry weight by 50 lbs', rarity: 'uncommon', value: 400, weightReduction: 50 },
  { id: 'boots-speed', name: 'Boots of Speed', category: 'Wondrous', description: 'Double movement speed for 1 minute', rarity: 'uncommon', value: 350 },
  // Crafting Materials — Ore
  { id: 'iron-ore-unc', name: 'Quality Iron Ore', category: 'Crafting Material', description: 'Higher quality iron ore for blacksmithing', rarity: 'uncommon', value: 10, quantity: 5, worth: { gold: 0, silver: 4 } },
  { id: 'copper-ore-unc', name: 'Quality Copper Ore', category: 'Crafting Material', description: 'Higher quality copper ore for blacksmithing', rarity: 'uncommon', value: 8, quantity: 5, worth: { gold: 0, silver: 3 } },
  // Crafting Materials — Cloth
  { id: 'silk-cloth', name: 'Silk Cloth', category: 'Crafting Material', description: 'Fine silk cloth for quality tailored armor', rarity: 'uncommon', value: 12, quantity: 4, worth: { gold: 0, silver: 6 } },
  { id: 'cotton-cloth', name: 'Cotton Cloth', category: 'Crafting Material', description: 'Sturdy cotton for crafting padded armor', rarity: 'uncommon', value: 10, quantity: 4, worth: { gold: 0, silver: 5 } },
  // Crafting Materials — Hide
  { id: 'thick-hide', name: 'Thick Leather Hide', category: 'Crafting Material', description: 'Uncommon hide from large animals for medium armor', rarity: 'uncommon', value: 15, quantity: 3, worth: { gold: 0, silver: 6 } },
  // Crafting Materials — Herb
  { id: 'uncommon-herb-foxglove', name: 'Foxglove', category: 'Crafting Material', description: 'Uncommon herb for potent potions and antidotes', rarity: 'uncommon', value: 15, quantity: 3, worth: { gold: 0, silver: 3 } },
  { id: 'uncommon-herb-wolfsbane', name: 'Wolfsbane', category: 'Crafting Material', description: 'Uncommon herb for alchemy, effective against lycanthropes', rarity: 'uncommon', value: 18, quantity: 3, worth: { gold: 0, silver: 4 } },
]

/**
 * Rare loot pool
 */
const RARE_LOOT: LootItem[] = [
  { id: 'gp-huge', name: 'Silver Pouch', category: 'Currency', description: '1-25 silver pieces', rarity: 'rare', value: 130 }, // 13 silver (130 copper)
  { id: 'superior-healing', name: 'Potion of Superior Healing', category: 'Consumable', description: 'Restores 8d4+8 hit points', rarity: 'rare', value: 500 },
  { id: 'endless-rations', name: 'Bag of Endless Rations', category: 'Food', description: '30 days of magical food that never spoils', rarity: 'rare', value: 50, foodDays: 30 },
  { id: 'purifying-flask', name: 'Decanter of Endless Water', category: 'Water', description: '20 days of pure water', rarity: 'rare', value: 30, waterDays: 20 },
  { id: 'spell-scroll-3', name: 'Spell Scroll (3rd Level)', category: 'Consumable', description: 'Contains a 3rd level spell', rarity: 'rare', value: 300 },
  { id: 'bag-holding-rare', name: 'Bag of Holding (Rare)', category: 'Wondrous', description: 'Reduces total carry weight by 100 lbs', rarity: 'rare', value: 800, weightReduction: 100 },
  { id: 'weapon-plus-2', name: 'Weapon +2', category: 'Weapon', description: '+2 to attack and damage rolls', rarity: 'rare', value: 1000, weaponDamageBonus: 2, attackBonus: 2 },
  { id: 'armor-plus-2', name: 'Armor +2', category: 'Armor', description: '+2 to AC', rarity: 'rare', value: 1200 },
  { id: 'ring-protection', name: 'Ring of Protection', category: 'Wondrous', description: '+1 to AC and saving throws', rarity: 'rare', value: 800 },
  { id: 'wand-fireballs', name: 'Wand of Fireballs', category: 'Wondrous', description: '7 charges, cast fireball', rarity: 'rare', value: 1500 },
  // Crafting Materials — Ore
  { id: 'silver-ore', name: 'Silver Ore Nugget', category: 'Crafting Material', description: 'Pure silver ore for fine jewelry and silver weapons', rarity: 'rare', value: 50, quantity: 3, worth: { gold: 0, silver: 8 } },
  { id: 'gold-ore', name: 'Gold Ore Nugget', category: 'Crafting Material', description: 'Pure gold ore for jewelry and valuable items', rarity: 'rare', value: 100, quantity: 2, worth: { gold: 0, silver: 9 } },
  // Crafting Materials — Cloth
  { id: 'enchanted-cloth', name: 'Enchanted Cloth', category: 'Crafting Material', description: 'Rare magically-infused cloth for superior tailored armor', rarity: 'rare', value: 60, quantity: 3, worth: { gold: 0, silver: 8 } },
  // Crafting Materials — Hide
  { id: 'scaled-hide', name: 'Scaled Beast Hide', category: 'Crafting Material', description: 'Rare hide from a scaled creature, ideal for medium/heavy armor', rarity: 'rare', value: 80, quantity: 2, worth: { gold: 0, silver: 9 } },
  // Crafting Materials — Herb
  { id: 'rare-herb-mandrake', name: 'Mandrake Root', category: 'Crafting Material', description: 'Rare herb for powerful alchemical concoctions', rarity: 'rare', value: 75, quantity: 2, worth: { gold: 0, silver: 7 } },
  { id: 'rare-herb-bloodthorn', name: 'Bloodthorn', category: 'Crafting Material', description: 'Rare herb for healing potions and resurrection elixirs', rarity: 'rare', value: 80, quantity: 2, worth: { gold: 0, silver: 8 } },
]

/**
 * More Epic loot - moved from old very-rare tier
 */
const MORE_EPIC_LOOT: LootItem[] = [
  { id: 'platinum-hoard', name: 'Small Gold Pouch', category: 'Currency', description: '1-10 gold pieces', rarity: 'epic', value: 550 }, // 5.5 gold (550 copper)
  { id: 'spell-scroll-5', name: 'Spell Scroll (5th Level)', category: 'Consumable', description: 'Contains a 5th level spell', rarity: 'epic', value: 800 },
  { id: 'bag-holding-epic', name: 'Bag of Holding (Epic)', category: 'Wondrous', description: 'Reduces total carry weight by 150 lbs', rarity: 'epic', value: 1500, weightReduction: 150 },
  { id: 'weapon-plus-3', name: 'Weapon +3', category: 'Weapon', description: '+3 to attack and damage rolls', rarity: 'epic', value: 3000, weaponDamageBonus: 3, attackBonus: 3 },
  { id: 'armor-plus-3', name: 'Armor +3', category: 'Armor', description: '+3 to AC', rarity: 'epic', value: 3500 },
  { id: 'cloak-invisibility', name: 'Cloak of Invisibility', category: 'Cloak', description: 'Become invisible at will', rarity: 'epic', value: 5000 },
  { id: 'belt-giant-strength', name: 'Belt of Giant Strength', category: 'Wondrous', description: 'Set Strength to 23', rarity: 'epic', value: 4000 },
  // Crafting Materials — Ore
  { id: 'mithril-ore', name: 'Mithril Ore Nugget', category: 'Crafting Material', description: 'Legendary lightweight metal for superior armor and weapons', rarity: 'epic', value: 500, quantity: 2, worth: { gold: 0, silver: 9 } },
  { id: 'adamantite-ore', name: 'Adamantite Ore Nugget', category: 'Crafting Material', description: 'Incredibly hard metal for indestructible equipment', rarity: 'epic', value: 600, quantity: 2, worth: { gold: 0, silver: 10 } },
  // Crafting Materials — Cloth
  { id: 'shadowweave-cloth', name: 'Shadowweave Cloth', category: 'Crafting Material', description: 'Epic dark cloth woven with shadow essence for powerful armor', rarity: 'epic', value: 350, quantity: 2, worth: { gold: 0, silver: 9 } },
  // Crafting Materials — Hide
  { id: 'wyvern-hide', name: 'Wyvern Hide', category: 'Crafting Material', description: 'Epic hide from a wyvern, exceptionally tough and magical', rarity: 'epic', value: 400, quantity: 2, worth: { gold: 0, silver: 10 } },
  // Crafting Materials — Herb
  { id: 'rare-herb-nightshade', name: 'Arcane Nightshade', category: 'Crafting Material', description: 'Extremely rare herb for legendary potions and elixirs', rarity: 'epic', value: 400, quantity: 1, worth: { gold: 0, silver: 8 } },
  { id: 'rare-herb-phoenix', name: 'Phoenix Feather Grass', category: 'Crafting Material', description: 'Extremely rare herb for resurrection and immortality elixirs', rarity: 'epic', value: 450, quantity: 1, worth: { gold: 0, silver: 9 } },
]

/**
 * Epic loot pool - extremely powerful items
 */
const EPIC_LOOT: LootItem[] = [
  { id: 'epic-fortune', name: 'Gold Pouch', category: 'Currency', description: '10-15 gold pieces', rarity: 'epic', value: 1250 }, // 12.5 gold (1250 copper)
  { id: 'spell-scroll-7', name: 'Spell Scroll (7th Level)', category: 'Consumable', description: 'Contains a 7th level spell', rarity: 'epic', value: 2000 },
  { id: 'dragonslayer-greatsword', name: 'Dragonslayer Greatsword', category: 'Weapon', description: '+3 greatsword, deals 3d6 extra damage to dragons', rarity: 'epic', value: 6000, weaponDamageBonus: 3, attackBonus: 3 },
  { id: 'plate-ethereal', name: 'Ethereal Plate Armor', category: 'Armor', description: '+3 plate, can phase through objects once per day', rarity: 'epic', value: 7000 },
  { id: 'shield-lion', name: 'Shield of the Lion', category: 'Shield', description: '+3 shield, grants immunity to fear and advantage on saves', rarity: 'epic', value: 5500 },
  { id: 'ring-three-wishes', name: 'Ring of Three Wishes', category: 'Wondrous', description: 'Grants 3 wishes (weaker than spell)', rarity: 'epic', value: 8000 },
  { id: 'boots-seven-leagues', name: 'Boots of Seven Leagues', category: 'Wondrous', description: 'Teleport up to 1 mile once per day', rarity: 'epic', value: 6500 },
  { id: 'amulet-planes', name: 'Amulet of the Planes', category: 'Wondrous', description: 'Travel to other planes of existence', rarity: 'epic', value: 7500 },
  // Additional Crafting Materials — Ore
  { id: 'mithril-ore-epic', name: 'Pure Mithril Ore', category: 'Crafting Material', description: 'The purest mithril for masterwork equipment', rarity: 'epic', value: 800, quantity: 3, worth: { gold: 0, silver: 10 } },
  { id: 'adamantite-ore-epic', name: 'Pure Adamantite Ore', category: 'Crafting Material', description: 'The purest adamantite for legendary weapons', rarity: 'epic', value: 900, quantity: 3, worth: { gold: 0, silver: 10 } },
]

/**
 * Legendary loot pool
 */
const LEGENDARY_LOOT: LootItem[] = [
  { id: 'ancient-treasure', name: 'Ancient Gold Hoard', category: 'Currency', description: '50-95 gold pieces', rarity: 'legendary', value: 7250 }, // 72.5 gold (7250 copper)
  { id: 'spell-scroll-9', name: 'Spell Scroll (9th Level)', category: 'Consumable', description: 'Contains a 9th level spell', rarity: 'legendary', value: 5000 },
  { id: 'tome-class-change', name: 'Tome of Reincarnation', category: 'Consumable', description: 'Allows you to completely change your class. All old class features, spells, and abilities are lost and replaced with your new class.', rarity: 'legendary', value: 25000 },
  { id: 'bag-holding-legendary', name: 'Bag of Holding (Legendary)', category: 'Wondrous', description: 'Reduces total carry weight by 225 lbs', rarity: 'legendary', value: 3000, weightReduction: 225 },
  { id: 'holy-avenger', name: 'Holy Avenger', category: 'Weapon', description: '+3 longsword with divine powers', rarity: 'legendary', value: 10000, weaponDamageBonus: 3, attackBonus: 3 },
  { id: 'armor-invulnerability', name: 'Armor of Invulnerability', category: 'Armor', description: 'Resistance to nonmagical damage', rarity: 'legendary', value: 12000 },
  { id: 'vorpal-sword', name: 'Vorpal Sword', category: 'Weapon', description: 'Decapitates on critical hit', rarity: 'legendary', value: 15000, weaponDamageBonus: 4, attackBonus: 4 },
  { id: 'staff-magi', name: 'Staff of the Magi', category: 'Wondrous', description: 'Ultimate spellcasting focus', rarity: 'legendary', value: 20000 },
  // Crafting Materials — Ore
  { id: 'obsidian-steel-ore', name: 'Obsidian-Steel Ore Nugget', category: 'Crafting Material', description: 'Mythical volcanic metal forged in dragon fire', rarity: 'legendary', value: 2500, quantity: 2, worth: { gold: 0, silver: 10 } },
  // Crafting Materials — Hide
  { id: 'dragonscale-leather', name: 'Dragonscale Leather Hide', category: 'Crafting Material', description: 'Ancient dragon hide for legendary armor and accessories', rarity: 'legendary', value: 2000, quantity: 2, worth: { gold: 0, silver: 10 } },
  // Crafting Materials — Cloth
  { id: 'void-silk', name: 'Void Silk', category: 'Crafting Material', description: 'Legendary cloth harvested from the Astral Plane, shimmers between realities', rarity: 'legendary', value: 1500, quantity: 1, worth: { gold: 0, silver: 10 } },
  // Crafting Materials — Herb
  { id: 'legendary-herb-starbloom', name: 'Starbloom Petal', category: 'Crafting Material', description: 'Legendary herb that blooms only under starlight, for supreme elixirs', rarity: 'legendary', value: 1200, quantity: 1, worth: { gold: 0, silver: 10 } },
  { id: 'legendary-herb-soulroot', name: 'Soulroot', category: 'Crafting Material', description: 'Legendary herb from the Feywild, said to restore the soul itself', rarity: 'legendary', value: 1400, quantity: 1, worth: { gold: 0, silver: 10 } },
]

/**
 * Artifact loot pool - game-breaking items (0.5% chance)
 */
const ARTIFACT_LOOT: LootItem[] = [
  { id: 'artifact-godslayer', name: 'Godslayer Blade', category: 'Weapon', description: '+5 weapon that can kill gods. Deals 6d12 extra radiant damage. Crits on 15-20. Grants immunity to death.', rarity: 'artifact', value: 100000, weaponDamageBonus: 5, attackBonus: 5 },
  { id: 'artifact-immortal-plate', name: 'Armor of Immortality', category: 'Armor', description: '+5 plate armor that grants true immortality. Regenerate 50 HP per turn. Cannot be killed by any means.', rarity: 'artifact', value: 120000 },
  { id: 'artifact-shield-cosmos', name: 'Shield of the Cosmos', category: 'Shield', description: '+5 shield that reflects all spells and attacks. Grants immunity to all damage types. Can absorb one Wish spell per day.', rarity: 'artifact', value: 110000 },
  { id: 'artifact-crown-dominion', name: 'Crown of Absolute Dominion', category: 'Wondrous', description: 'Control the minds of any number of creatures. Cast Dominate Monster at will. Immunity to all mind effects.', rarity: 'artifact', value: 150000 },
  { id: 'artifact-orb-omniscience', name: 'Orb of Omniscience', category: 'Wondrous', description: 'Know everything that has happened or will happen. Automatic success on all Knowledge checks. See invisible and through all illusions.', rarity: 'artifact', value: 140000 },
  { id: 'artifact-boots-infinity', name: 'Boots of Infinite Speed', category: 'Wondrous', description: 'Move at the speed of light. Take 10 actions per turn. Cannot be hit by attacks or spells.', rarity: 'artifact', value: 130000 },
  { id: 'artifact-ring-god', name: 'Ring of the God-King', category: 'Wondrous', description: 'Become a deity. All stats become 30. Cast any spell at will. Reshape reality once per day.', rarity: 'artifact', value: 200000 },
  { id: 'artifact-tome-eternity', name: 'Tome of Eternity', category: 'Wondrous', description: 'Contains all knowledge in the universe. Learn any spell instantly. Gain proficiency in all skills. +10 to all stats.', rarity: 'artifact', value: 180000 },
  { id: 'artifact-cloak-void', name: 'Cloak of the Void', category: 'Armor', description: 'Become intangible at will. Teleport anywhere in the multiverse. Erase enemies from existence with a touch.', rarity: 'artifact', value: 160000 },
  { id: 'artifact-gauntlet-creation', name: 'Gauntlet of Creation', category: 'Wondrous', description: 'Create any object or creature from nothing. Reshape terrain at will. Grant or remove life force.', rarity: 'artifact', value: 170000 },
  // Precious Gems for Crafting
  { id: 'gem-diamond', name: 'Flawless Diamond', category: 'Crafting Material', description: 'Perfect diamond for the most powerful enchantments and jewelry', rarity: 'artifact', value: 5000, quantity: 1 },
  { id: 'gem-emerald', name: 'Flawless Emerald', category: 'Crafting Material', description: 'Perfect emerald for nature-based enchantments and artifacts', rarity: 'artifact', value: 4500, quantity: 1 },
  { id: 'gem-ruby', name: 'Flawless Ruby', category: 'Crafting Material', description: 'Perfect ruby for fire-based enchantments and artifacts', rarity: 'artifact', value: 4800, quantity: 1 },
  { id: 'gem-sapphire', name: 'Flawless Sapphire', category: 'Crafting Material', description: 'Perfect sapphire for ice and arcane enchantments', rarity: 'artifact', value: 4600, quantity: 1 },
  { id: 'gem-amethyst', name: 'Flawless Amethyst', category: 'Crafting Material', description: 'Perfect amethyst for divine and psychic enchantments', rarity: 'artifact', value: 4400, quantity: 1 },
]

/**
 * Roll for loot rarity based on character level
 *
 * Restrictions:
 * - Levels 1-7: Cannot create Epic or better (max: Rare)
 * - Levels 8-20: Cannot create Artifact (max: Legendary)
 * - Artifact quality is created by DM only via generateLegendaryLoot
 */
export function rollLootRarity(characterLevel: number): LootRarity {
  const roll = Math.random() * 100

  // Levels 1-7: Max rarity is Rare
  if (characterLevel <= 7) {
    if (roll < 60) return 'common'
    if (roll < 85) return 'uncommon'
    return 'rare' // Capped at rare for low levels
  }

  // Levels 8-20: Max rarity is Legendary (no Artifact from normal loot)
  if (characterLevel >= 17) {
    // High level characters
    if (roll < 20) return 'common'
    if (roll < 40) return 'uncommon'
    if (roll < 65) return 'rare'
    if (roll < 85) return 'epic'
    return 'legendary'
  } else if (characterLevel >= 11) {
    // Mid-high level
    if (roll < 25) return 'common'
    if (roll < 50) return 'uncommon'
    if (roll < 80) return 'rare'
    if (roll < 95) return 'epic'
    return 'legendary'
  } else {
    // Levels 8-10
    if (roll < 35) return 'common'
    if (roll < 70) return 'uncommon'
    if (roll < 90) return 'rare'
    if (roll < 99) return 'epic'
    return 'legendary'
  }
}

/**
 * Get loot pool by rarity
 */
function getLootPool(rarity: LootRarity): LootItem[] {
  switch (rarity) {
    case 'trash':
      return TRASH_LOOT
    case 'common':
      return COMMON_LOOT
    case 'uncommon':
      return UNCOMMON_LOOT
    case 'rare':
      return RARE_LOOT
    case 'epic':
      return [...EPIC_LOOT, ...MORE_EPIC_LOOT]
    case 'legendary':
      return LEGENDARY_LOOT
    case 'artifact':
      return ARTIFACT_LOOT
    default:
      return COMMON_LOOT
  }
}

/**
 * Generate legendary loot with specific rarity quantities
 * For DM weekly session rewards
 */
export function generateLegendaryLoot(rarity: LootRarity, quantity: number): LootItem[] {
  const pool = getLootPool(rarity)
  const loot: LootItem[] = []

  for (let i = 0; i < quantity; i++) {
    const randomItem = pool[Math.floor(Math.random() * pool.length)]
    loot.push({
      ...randomItem,
      id: `${randomItem.id}-${Date.now()}-${i}`,
    })
  }

  return loot
}

/**
 * Generate loot appropriate for character's race and class
 */
export function generateLoot(params: {
  characterLevel: number
  className?: string
  raceName?: string
  count?: number
}): LootItem[] {
  const { characterLevel, count = 3 } = params
  const loot: LootItem[] = []

  // TODO: Future enhancement - use className and raceName to weight loot generation
  // For now, we generate random loot based on level and show preferences separately

  for (let i = 0; i < count; i++) {
    const rarity = rollLootRarity(characterLevel)
    const pool = getLootPool(rarity)

    // Random selection from pool
    const randomItem = pool[Math.floor(Math.random() * pool.length)]

    // Clone and give unique ID
    loot.push({
      ...randomItem,
      id: `${randomItem.id}-${Date.now()}-${i}`,
    })
  }

  return loot
}

/**
 * Get class-appropriate loot suggestions
 */
export function getClassLootSuggestions(className?: string): string[] {
  if (!className) return []

  const normalizedClass = className.toLowerCase()
  const classData = CLASS_LOOT_WEIGHTS[normalizedClass]

  if (!classData) return []

  return [
    ...classData.weapons,
    ...classData.armor,
    ...classData.consumables,
    ...classData.magical,
  ]
}

/**
 * Get race-appropriate loot suggestions
 */
export function getRaceLootSuggestions(raceName?: string): string[] {
  if (!raceName) return []

  const normalizedRace = raceName.toLowerCase()
  return RACE_LOOT_PREFERENCES[normalizedRace] || []
}
