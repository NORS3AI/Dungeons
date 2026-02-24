/**
 * Type definitions for Quick Reference system
 */

// Source Book Reference
export interface SourceBook {
  name: string
  abbreviation: string
  page?: number
}

// Common D&D Source Books
export const SOURCE_BOOKS = {
  PHB: { name: "Player's Handbook", abbreviation: 'PHB' },
  PHB2024: { name: "Player's Handbook (2024)", abbreviation: 'PHB24' },
  XGTE: { name: "Xanathar's Guide to Everything", abbreviation: 'XGtE' },
  TCOE: { name: "Tasha's Cauldron of Everything", abbreviation: 'TCoE' },
  GGR: { name: "Guildmaster's Guide to Ravnica", abbreviation: 'GGR' },
  EGW: { name: "Explorer's Guide to Wildemount", abbreviation: 'EGW' },
} as const

// Spell Reference
export interface SpellRef {
  id: string
  name: string
  school: 'Abjuration' | 'Conjuration' | 'Divination' | 'Enchantment' | 'Evocation' | 'Illusion' | 'Necromancy' | 'Transmutation'
  level: number | 'cantrip'
  castingTime: string
  range: string
  components: string
  duration: string
  description: string
  higherLevels?: string
  classes: string[]
  sourceBook?: SourceBook
}

// Skill Reference
export interface SkillRef {
  id: string
  name: string
  ability: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'
  description: string
  examples: string[]
}

// Ability Reference
export interface AbilityRef {
  id: string
  name: string
  abbreviation: string
  description: string
  skills: string[]
  commonUses: string[]
}

// Weapon Reference
export interface WeaponRef {
  id: string
  name: string
  category: 'simple' | 'martial'
  type: 'melee' | 'ranged'
  damage: string
  damageType: string
  properties: string[]
  weight: string
  cost: string
  description?: string
}

// Armor Reference
export interface ArmorRef {
  id: string
  name: string
  category: 'light' | 'medium' | 'heavy' | 'shield'
  ac: string
  strength?: number
  stealthDisadvantage: boolean
  weight: string
  cost: string
  description?: string
}

// Condition Reference
export interface ConditionRef {
  id: string
  name: string
  effects: string[]
  endCondition?: string
}

// Trait/Feature Reference
export interface TraitRef {
  id: string
  name: string
  source: string
  description: string
  mechanics?: string
}

// Game Rules/Mechanics Reference
export interface RuleRef {
  id: string
  name: string
  category: 'spellcasting' | 'combat' | 'rest' | 'movement' | 'general'
  summary: string
  description: string
  examples?: string[]
  relatedRules?: string[]
  table?: {
    headers: string[]
    rows: string[][]
  }
}
