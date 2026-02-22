/**
 * Loot rarity levels
 */
export type LootRarity = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary'

/**
 * Generated loot item
 */
export interface LootItem {
  id: string
  name: string
  category: string
  description: string
  rarity: LootRarity
  value: number // in gold pieces
  quantity?: number
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
 * Common loot pool
 */
const COMMON_LOOT: LootItem[] = [
  { id: 'gp-small', name: 'Small Coin Purse', category: 'Currency', description: '10-50 gold pieces', rarity: 'common', value: 30 },
  { id: 'gp-medium', name: 'Medium Coin Purse', category: 'Currency', description: '50-100 gold pieces', rarity: 'common', value: 75 },
  { id: 'healing-potion', name: 'Potion of Healing', category: 'Consumable', description: 'Restores 2d4+2 hit points', rarity: 'common', value: 50 },
  { id: 'rations', name: 'Travel Rations', category: 'Consumable', description: '5 days of food', rarity: 'common', value: 5, quantity: 5 },
  { id: 'rope', name: 'Hempen Rope', category: 'Gear', description: '50 feet of rope', rarity: 'common', value: 1 },
  { id: 'torch', name: 'Torches', category: 'Gear', description: 'Light source', rarity: 'common', value: 1, quantity: 10 },
  { id: 'arrows', name: 'Arrows', category: 'Ammunition', description: 'Standard arrows', rarity: 'common', value: 1, quantity: 20 },
  { id: 'bolts', name: 'Crossbow Bolts', category: 'Ammunition', description: 'Standard bolts', rarity: 'common', value: 1, quantity: 20 },
]

/**
 * Uncommon loot pool
 */
const UNCOMMON_LOOT: LootItem[] = [
  { id: 'gp-large', name: 'Large Coin Purse', category: 'Currency', description: '100-200 gold pieces', rarity: 'uncommon', value: 150 },
  { id: 'greater-healing', name: 'Potion of Greater Healing', category: 'Consumable', description: 'Restores 4d4+4 hit points', rarity: 'uncommon', value: 150 },
  { id: 'spell-scroll-1', name: 'Spell Scroll (1st Level)', category: 'Consumable', description: 'Contains a 1st level spell', rarity: 'uncommon', value: 100 },
  { id: 'masterwork-weapon', name: 'Masterwork Weapon', category: 'Weapon', description: '+1 to attack and damage rolls', rarity: 'uncommon', value: 300 },
  { id: 'cloak-protection', name: 'Cloak of Protection', category: 'Armor', description: '+1 to AC and saving throws', rarity: 'uncommon', value: 250 },
  { id: 'bag-holding', name: 'Bag of Holding', category: 'Wondrous', description: 'Holds up to 500 lbs', rarity: 'uncommon', value: 400 },
  { id: 'boots-speed', name: 'Boots of Speed', category: 'Wondrous', description: 'Double movement speed for 1 minute', rarity: 'uncommon', value: 350 },
]

/**
 * Rare loot pool
 */
const RARE_LOOT: LootItem[] = [
  { id: 'gp-huge', name: 'Treasure Hoard', category: 'Currency', description: '500-1000 gold pieces', rarity: 'rare', value: 750 },
  { id: 'superior-healing', name: 'Potion of Superior Healing', category: 'Consumable', description: 'Restores 8d4+8 hit points', rarity: 'rare', value: 500 },
  { id: 'spell-scroll-3', name: 'Spell Scroll (3rd Level)', category: 'Consumable', description: 'Contains a 3rd level spell', rarity: 'rare', value: 300 },
  { id: 'weapon-plus-2', name: 'Weapon +2', category: 'Weapon', description: '+2 to attack and damage rolls', rarity: 'rare', value: 1000 },
  { id: 'armor-plus-2', name: 'Armor +2', category: 'Armor', description: '+2 to AC', rarity: 'rare', value: 1200 },
  { id: 'ring-protection', name: 'Ring of Protection', category: 'Wondrous', description: '+1 to AC and saving throws', rarity: 'rare', value: 800 },
  { id: 'wand-fireballs', name: 'Wand of Fireballs', category: 'Wondrous', description: '7 charges, cast fireball', rarity: 'rare', value: 1500 },
]

/**
 * Very rare loot pool
 */
const VERY_RARE_LOOT: LootItem[] = [
  { id: 'platinum-hoard', name: 'Platinum Hoard', category: 'Currency', description: '100-200 platinum pieces (1000-2000 gp)', rarity: 'very-rare', value: 1500 },
  { id: 'spell-scroll-5', name: 'Spell Scroll (5th Level)', category: 'Consumable', description: 'Contains a 5th level spell', rarity: 'very-rare', value: 800 },
  { id: 'weapon-plus-3', name: 'Weapon +3', category: 'Weapon', description: '+3 to attack and damage rolls', rarity: 'very-rare', value: 3000 },
  { id: 'armor-plus-3', name: 'Armor +3', category: 'Armor', description: '+3 to AC', rarity: 'very-rare', value: 3500 },
  { id: 'cloak-invisibility', name: 'Cloak of Invisibility', category: 'Wondrous', description: 'Become invisible at will', rarity: 'very-rare', value: 5000 },
  { id: 'belt-giant-strength', name: 'Belt of Giant Strength', category: 'Wondrous', description: 'Set Strength to 23', rarity: 'very-rare', value: 4000 },
]

/**
 * Legendary loot pool
 */
const LEGENDARY_LOOT: LootItem[] = [
  { id: 'ancient-treasure', name: 'Ancient Treasure Hoard', category: 'Currency', description: '5000-10000 gold pieces', rarity: 'legendary', value: 7500 },
  { id: 'spell-scroll-9', name: 'Spell Scroll (9th Level)', category: 'Consumable', description: 'Contains a 9th level spell', rarity: 'legendary', value: 5000 },
  { id: 'holy-avenger', name: 'Holy Avenger', category: 'Weapon', description: '+3 longsword with divine powers', rarity: 'legendary', value: 10000 },
  { id: 'armor-invulnerability', name: 'Armor of Invulnerability', category: 'Armor', description: 'Resistance to nonmagical damage', rarity: 'legendary', value: 12000 },
  { id: 'vorpal-sword', name: 'Vorpal Sword', category: 'Weapon', description: 'Decapitates on critical hit', rarity: 'legendary', value: 15000 },
  { id: 'staff-magi', name: 'Staff of the Magi', category: 'Wondrous', description: 'Ultimate spellcasting focus', rarity: 'legendary', value: 20000 },
]

/**
 * Roll for loot rarity based on character level
 */
export function rollLootRarity(characterLevel: number): LootRarity {
  const roll = Math.random() * 100

  if (characterLevel >= 17) {
    // High level characters
    if (roll < 20) return 'common'
    if (roll < 40) return 'uncommon'
    if (roll < 65) return 'rare'
    if (roll < 85) return 'very-rare'
    return 'legendary'
  } else if (characterLevel >= 11) {
    // Mid-high level
    if (roll < 25) return 'common'
    if (roll < 50) return 'uncommon'
    if (roll < 80) return 'rare'
    if (roll < 95) return 'very-rare'
    return 'legendary'
  } else if (characterLevel >= 5) {
    // Mid level
    if (roll < 35) return 'common'
    if (roll < 70) return 'uncommon'
    if (roll < 90) return 'rare'
    if (roll < 99) return 'very-rare'
    return 'legendary'
  } else {
    // Low level
    if (roll < 60) return 'common'
    if (roll < 85) return 'uncommon'
    if (roll < 97) return 'rare'
    if (roll < 99.5) return 'very-rare'
    return 'legendary'
  }
}

/**
 * Get loot pool by rarity
 */
function getLootPool(rarity: LootRarity): LootItem[] {
  switch (rarity) {
    case 'common':
      return COMMON_LOOT
    case 'uncommon':
      return UNCOMMON_LOOT
    case 'rare':
      return RARE_LOOT
    case 'very-rare':
      return VERY_RARE_LOOT
    case 'legendary':
      return LEGENDARY_LOOT
  }
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
