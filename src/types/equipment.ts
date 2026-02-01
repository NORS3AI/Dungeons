/**
 * Currency in D&D
 */
export interface Currency {
  copper: number
  silver: number
  electrum: number
  gold: number
  platinum: number
}

/**
 * Default empty currency
 */
export const EMPTY_CURRENCY: Currency = {
  copper: 0,
  silver: 0,
  electrum: 0,
  gold: 0,
  platinum: 0,
}

/**
 * Currency conversion rates (to copper)
 */
export const CURRENCY_TO_COPPER: Record<keyof Currency, number> = {
  copper: 1,
  silver: 10,
  electrum: 50,
  gold: 100,
  platinum: 1000,
}

/**
 * Equipment category
 */
export type EquipmentCategory =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'adventuringGear'
  | 'tool'
  | 'mount'
  | 'vehicle'
  | 'trinket'
  | 'treasure'
  | 'consumable'

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
 * Generic equipment (gear, tools, etc.)
 */
export interface GenericEquipment extends BaseEquipment {
  category: Exclude<EquipmentCategory, 'weapon' | 'armor' | 'shield'>
}

/**
 * All equipment types
 */
export type Equipment = Weapon | Armor | Shield | GenericEquipment

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
  cost: { copper: 0, silver: 0, electrum: 0, gold: 50, platinum: 0 },
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
  cost: { copper: 0, silver: 0, electrum: 0, gold: 15, platinum: 0 },
  quantity: 1,
}
