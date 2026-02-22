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
 * Trash loot pool - worthless or nearly worthless items
 */
const TRASH_LOOT: LootItem[] = [
  { id: 'trash-copper', name: 'Few Copper Coins', category: 'Currency', description: '1-5 copper pieces', rarity: 'trash', value: 0.03 },
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
 * More Epic loot - moved from old very-rare tier
 */
const MORE_EPIC_LOOT: LootItem[] = [
  { id: 'platinum-hoard', name: 'Platinum Hoard', category: 'Currency', description: '100-200 platinum pieces (1000-2000 gp)', rarity: 'epic', value: 1500 },
  { id: 'spell-scroll-5', name: 'Spell Scroll (5th Level)', category: 'Consumable', description: 'Contains a 5th level spell', rarity: 'epic', value: 800 },
  { id: 'weapon-plus-3', name: 'Weapon +3', category: 'Weapon', description: '+3 to attack and damage rolls', rarity: 'epic', value: 3000 },
  { id: 'armor-plus-3', name: 'Armor +3', category: 'Armor', description: '+3 to AC', rarity: 'epic', value: 3500 },
  { id: 'cloak-invisibility', name: 'Cloak of Invisibility', category: 'Cloak', description: 'Become invisible at will', rarity: 'epic', value: 5000 },
  { id: 'belt-giant-strength', name: 'Belt of Giant Strength', category: 'Wondrous', description: 'Set Strength to 23', rarity: 'epic', value: 4000 },
]

/**
 * Epic loot pool - extremely powerful items
 */
const EPIC_LOOT: LootItem[] = [
  { id: 'epic-fortune', name: 'Dragon\'s Fortune', category: 'Currency', description: '2000-5000 gold pieces', rarity: 'epic', value: 3500 },
  { id: 'spell-scroll-7', name: 'Spell Scroll (7th Level)', category: 'Consumable', description: 'Contains a 7th level spell', rarity: 'epic', value: 2000 },
  { id: 'dragonslayer-greatsword', name: 'Dragonslayer Greatsword', category: 'Weapon', description: '+3 greatsword, deals 3d6 extra damage to dragons', rarity: 'epic', value: 6000 },
  { id: 'plate-ethereal', name: 'Ethereal Plate Armor', category: 'Armor', description: '+3 plate, can phase through objects once per day', rarity: 'epic', value: 7000 },
  { id: 'shield-lion', name: 'Shield of the Lion', category: 'Shield', description: '+3 shield, grants immunity to fear and advantage on saves', rarity: 'epic', value: 5500 },
  { id: 'ring-three-wishes', name: 'Ring of Three Wishes', category: 'Wondrous', description: 'Grants 3 wishes (weaker than spell)', rarity: 'epic', value: 8000 },
  { id: 'boots-seven-leagues', name: 'Boots of Seven Leagues', category: 'Wondrous', description: 'Teleport up to 1 mile once per day', rarity: 'epic', value: 6500 },
  { id: 'amulet-planes', name: 'Amulet of the Planes', category: 'Wondrous', description: 'Travel to other planes of existence', rarity: 'epic', value: 7500 },
]

/**
 * Legendary loot pool
 */
const LEGENDARY_LOOT: LootItem[] = [
  { id: 'ancient-treasure', name: 'Ancient Treasure Hoard', category: 'Currency', description: '5000-10000 gold pieces', rarity: 'legendary', value: 7500 },
  { id: 'spell-scroll-9', name: 'Spell Scroll (9th Level)', category: 'Consumable', description: 'Contains a 9th level spell', rarity: 'legendary', value: 5000 },
  { id: 'tome-class-change', name: 'Tome of Reincarnation', category: 'Consumable', description: 'Allows you to completely change your class. All old class features, spells, and abilities are lost and replaced with your new class.', rarity: 'legendary', value: 25000 },
  { id: 'holy-avenger', name: 'Holy Avenger', category: 'Weapon', description: '+3 longsword with divine powers', rarity: 'legendary', value: 10000 },
  { id: 'armor-invulnerability', name: 'Armor of Invulnerability', category: 'Armor', description: 'Resistance to nonmagical damage', rarity: 'legendary', value: 12000 },
  { id: 'vorpal-sword', name: 'Vorpal Sword', category: 'Weapon', description: 'Decapitates on critical hit', rarity: 'legendary', value: 15000 },
  { id: 'staff-magi', name: 'Staff of the Magi', category: 'Wondrous', description: 'Ultimate spellcasting focus', rarity: 'legendary', value: 20000 },
]

/**
 * Artifact loot pool - game-breaking items (0.5% chance)
 */
const ARTIFACT_LOOT: LootItem[] = [
  { id: 'artifact-godslayer', name: 'Godslayer Blade', category: 'Weapon', description: '+5 weapon that can kill gods. Deals 6d12 extra radiant damage. Crits on 15-20. Grants immunity to death.', rarity: 'artifact', value: 100000 },
  { id: 'artifact-immortal-plate', name: 'Armor of Immortality', category: 'Armor', description: '+5 plate armor that grants true immortality. Regenerate 50 HP per turn. Cannot be killed by any means.', rarity: 'artifact', value: 120000 },
  { id: 'artifact-shield-cosmos', name: 'Shield of the Cosmos', category: 'Shield', description: '+5 shield that reflects all spells and attacks. Grants immunity to all damage types. Can absorb one Wish spell per day.', rarity: 'artifact', value: 110000 },
  { id: 'artifact-crown-dominion', name: 'Crown of Absolute Dominion', category: 'Wondrous', description: 'Control the minds of any number of creatures. Cast Dominate Monster at will. Immunity to all mind effects.', rarity: 'artifact', value: 150000 },
  { id: 'artifact-orb-omniscience', name: 'Orb of Omniscience', category: 'Wondrous', description: 'Know everything that has happened or will happen. Automatic success on all Knowledge checks. See invisible and through all illusions.', rarity: 'artifact', value: 140000 },
  { id: 'artifact-boots-infinity', name: 'Boots of Infinite Speed', category: 'Wondrous', description: 'Move at the speed of light. Take 10 actions per turn. Cannot be hit by attacks or spells.', rarity: 'artifact', value: 130000 },
  { id: 'artifact-ring-god', name: 'Ring of the God-King', category: 'Wondrous', description: 'Become a deity. All stats become 30. Cast any spell at will. Reshape reality once per day.', rarity: 'artifact', value: 200000 },
  { id: 'artifact-tome-eternity', name: 'Tome of Eternity', category: 'Wondrous', description: 'Contains all knowledge in the universe. Learn any spell instantly. Gain proficiency in all skills. +10 to all stats.', rarity: 'artifact', value: 180000 },
  { id: 'artifact-cloak-void', name: 'Cloak of the Void', category: 'Armor', description: 'Become intangible at will. Teleport anywhere in the multiverse. Erase enemies from existence with a touch.', rarity: 'artifact', value: 160000 },
  { id: 'artifact-gauntlet-creation', name: 'Gauntlet of Creation', category: 'Wondrous', description: 'Create any object or creature from nothing. Reshape terrain at will. Grant or remove life force.', rarity: 'artifact', value: 170000 },
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
    if (roll < 85) return 'epic'
    return 'legendary'
  } else if (characterLevel >= 11) {
    // Mid-high level
    if (roll < 25) return 'common'
    if (roll < 50) return 'uncommon'
    if (roll < 80) return 'rare'
    if (roll < 95) return 'epic'
    return 'legendary'
  } else if (characterLevel >= 5) {
    // Mid level
    if (roll < 35) return 'common'
    if (roll < 70) return 'uncommon'
    if (roll < 90) return 'rare'
    if (roll < 99) return 'epic'
    return 'legendary'
  } else {
    // Low level
    if (roll < 60) return 'common'
    if (roll < 85) return 'uncommon'
    if (roll < 97) return 'rare'
    if (roll < 99.5) return 'epic'
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
