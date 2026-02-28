/**
 * Currency in D&D
 * Conversion: 100 copper = 1 silver, 100 silver = 1 gold, 100 gold = 1 platinum
 */
export interface Currency {
  copper: number
  silver: number
  gold: number
  platinum: number
}

/**
 * Default empty currency
 */
export const EMPTY_CURRENCY: Currency = {
  copper: 0,
  silver: 0,
  gold: 0,
  platinum: 0,
}

/**
 * Currency conversion rates (to copper)
 */
export const CURRENCY_TO_COPPER: Record<keyof Currency, number> = {
  copper: 1,
  silver: 100,
  gold: 10000,
  platinum: 1000000,
}

/**
 * Auto-convert currency to higher denominations
 * 100 copper -> 1 silver, 100 silver -> 1 gold, 100 gold -> 1 platinum
 */
export function autoConvertCurrency(currency: Currency): Currency {
  let { copper, silver, gold, platinum } = currency

  // Convert copper to silver (100:1)
  if (copper >= 100) {
    const converted = Math.floor(copper / 100)
    silver += converted
    copper = copper % 100
  }

  // Convert silver to gold (100:1)
  if (silver >= 100) {
    const converted = Math.floor(silver / 100)
    gold += converted
    silver = silver % 100
  }

  // Convert gold to platinum (100:1)
  if (gold >= 100) {
    const converted = Math.floor(gold / 100)
    platinum += converted
    gold = gold % 100
  }

  return { copper, silver, gold, platinum }
}

/**
 * Equipment category
 */
export type EquipmentCategory =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'cloak'
  | 'jewelry'
  | 'adventuringGear'
  | 'tool'
  | 'mount'
  | 'vehicle'
  | 'trinket'
  | 'treasure'
  | 'consumable'
  | 'Crafting Material'

/**
 * Weapon properties
 */
export type WeaponProperty =
  | 'ammunition'
  | 'finesse'
  | 'heavy'
  | 'light'
  | 'loading'
  | 'range'
  | 'reach'
  | 'special'
  | 'thrown'
  | 'twoHanded'
  | 'versatile'

/**
 * Weapon type
 */
export type WeaponType = 'simple' | 'martial'
export type WeaponCategory = 'melee' | 'ranged'

/**
 * Damage type
 */
export type DamageType =
  | 'acid'
  | 'bludgeoning'
  | 'cold'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'necrotic'
  | 'piercing'
  | 'poison'
  | 'psychic'
  | 'radiant'
  | 'slashing'
  | 'thunder'

/**
 * Armor type
 */
export type ArmorType = 'light' | 'medium' | 'heavy'

/**
 * Magical item charges for items like Wand of Fireballs
 */
export interface MagicalItemCharges {
  spellName: string // e.g., "Fireball"
  damageDice: string // e.g., "8d6"
  damageType?: DamageType // e.g., "fire"
  currentCharges: number
  maxCharges: number
  rechargeRate?: string // e.g., "1d6+1 at dawn", "never"
}

/**
 * Ability score modifiers that equipment can provide
 */
export interface AbilityScoreModifiers {
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
}

/**
 * Base equipment item
 */
export interface BaseEquipment {
  id: string
  name: string
  description: string
  category: EquipmentCategory
  weight: number // in pounds
  cost: Currency
  quantity: number
  equipped?: boolean
  charges?: MagicalItemCharges // For magical items with limited uses
  abilityScoreModifiers?: AbilityScoreModifiers // e.g., Belt of Giant Strength (+2 STR)
  rarity?: 'trash' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'
  /** Reduces the total inventory weight shown when this item is in the inventory (e.g. Bag of Holding) */
  weightReduction?: number
  /** Bonus added to all weapon damage rolls when this item is equipped and a weapon is also equipped */
  weaponDamageBonus?: number
  /** Bonus added to all weapon attack rolls when this item is equipped and a weapon is also equipped */
  attackBonus?: number
}

/**
 * Weapon equipment
 */
export interface Weapon extends BaseEquipment {
  category: 'weapon'
  weaponType: WeaponType
  weaponCategory: WeaponCategory
  damage: {
    dice: string
    type: DamageType
  }
  versatileDamage?: string // e.g., "1d10" when used two-handed
  properties: WeaponProperty[]
  range?: {
    normal: number
    long: number
  }
}

/**
 * Armor equipment
 */
export interface Armor extends BaseEquipment {
  category: 'armor'
  armorType: ArmorType
  baseAC: number
  maxDexBonus?: number // undefined = no limit
  strengthRequirement?: number
  stealthDisadvantage: boolean
}

/**
 * Shield equipment
 */
export interface Shield extends BaseEquipment {
  category: 'shield'
  acBonus: number
}

/**
 * Cloak equipment (e.g., Cloak of Invisibility)
 * Equippable alongside armor
 */
export interface Cloak extends BaseEquipment {
  category: 'cloak'
  acBonus?: number // Optional AC bonus
  magicalEffect?: string // Description of magical effect
}

/**
 * Generic equipment (gear, tools, etc.)
 */
export interface GenericEquipment extends BaseEquipment {
  category: Exclude<EquipmentCategory, 'weapon' | 'armor' | 'shield' | 'cloak'>
}

/**
 * All equipment types
 */
export type Equipment = Weapon | Armor | Shield | Cloak | GenericEquipment

/**
 * Crafting material for the Mats inventory
 * These consolidate automatically when added
 */
export interface Material {
  id: string // Unique identifier for the material type
  name: string
  description: string
  category: 'herb' | 'ore' | 'leather' | 'hide' | 'cloth' | 'gem' | 'dust' | 'shard' | 'other'
  quantity: number
  rarity: 'trash' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'
  weight: number // Weight per unit
}

/**
 * Type guard for weapons
 */
export function isWeapon(item: Equipment): item is Weapon {
  return item.category === 'weapon'
}

/**
 * Type guard for armor
 */
export function isArmor(item: Equipment): item is Armor {
  return item.category === 'armor'
}

/**
 * Type guard for shields
 */
export function isShield(item: Equipment): item is Shield {
  return item.category === 'shield'
}

/**
 * Type guard for cloaks
 */
export function isCloak(item: Equipment): item is Cloak {
  return item.category === 'cloak'
}

/**
 * Fighter weapon mastery options (homebrew)
 */
export type WeaponMasteryStyle = 'twoHanded' | 'dualTwoHanded' | 'swordAndBoard'

export interface WeaponMastery {
  style: WeaponMasteryStyle
  description: string
  damageDice: string
  acModifier: number
}

export const WEAPON_MASTERY_OPTIONS: Record<WeaponMasteryStyle, WeaponMastery> = {
  twoHanded: {
    style: 'twoHanded',
    description: 'Standard two-handed weapon (greatsword, greataxe, etc.)',
    damageDice: '2d6',
    acModifier: 0,
  },
  dualTwoHanded: {
    style: 'dualTwoHanded',
    description: 'Wield two greatswords or similar - high damage, lower defense',
    damageDice: '4d6',
    acModifier: -4,
  },
  swordAndBoard: {
    style: 'swordAndBoard',
    description: 'Simple weapon + shield for balanced offense and defense',
    damageDice: '1d8',
    acModifier: 2,
  },
}

/**
 * Example weapons
 */
export const GREATSWORD: Weapon = {
  id: 'greatsword',
  name: 'Greatsword',
  description: 'A massive two-handed sword.',
  category: 'weapon',
  weaponType: 'martial',
  weaponCategory: 'melee',
  damage: { dice: '2d6', type: 'slashing' },
  properties: ['heavy', 'twoHanded'],
  weight: 6,
  cost: { copper: 0, silver: 0, gold: 50, platinum: 0 },
  quantity: 1,
}

export const LONGSWORD: Weapon = {
  id: 'longsword',
  name: 'Longsword',
  description: 'A versatile sword that can be wielded one or two-handed.',
  category: 'weapon',
  weaponType: 'martial',
  weaponCategory: 'melee',
  damage: { dice: '1d8', type: 'slashing' },
  versatileDamage: '1d10',
  properties: ['versatile'],
  weight: 3,
  cost: { copper: 0, silver: 0, gold: 15, platinum: 0 },
  quantity: 1,
}
