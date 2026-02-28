import type { Race } from './race'
import type { Class, Subclass, ClassFeature } from './class'
import type { Background } from './background'
import type { Spell } from './spell'
import type { Equipment, Currency, Material } from './equipment'

/**
 * Ability scores for a D&D character
 */
export interface AbilityScores {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

/**
 * Skill proficiency level
 */
export type ProficiencyLevel = 'none' | 'proficient' | 'expertise'

/**
 * All D&D skills mapped to their ability
 */
export interface Skills {
  // Strength
  athletics: ProficiencyLevel
  // Dexterity
  acrobatics: ProficiencyLevel
  sleightOfHand: ProficiencyLevel
  stealth: ProficiencyLevel
  // Intelligence
  arcana: ProficiencyLevel
  history: ProficiencyLevel
  investigation: ProficiencyLevel
  nature: ProficiencyLevel
  religion: ProficiencyLevel
  // Wisdom
  animalHandling: ProficiencyLevel
  insight: ProficiencyLevel
  medicine: ProficiencyLevel
  perception: ProficiencyLevel
  survival: ProficiencyLevel
  // Charisma
  deception: ProficiencyLevel
  intimidation: ProficiencyLevel
  performance: ProficiencyLevel
  persuasion: ProficiencyLevel
}

/**
 * Saving throw proficiencies
 */
export interface SavingThrows {
  strength: boolean
  dexterity: boolean
  constitution: boolean
  intelligence: boolean
  wisdom: boolean
  charisma: boolean
}

/**
 * Hit points tracking
 */
export interface HitPoints {
  current: number
  maximum: number
  temporary: number
}

/**
 * Death save tracking
 */
export interface DeathSaves {
  successes: number
  failures: number
}

/**
 * Spell slots by level
 */
export interface SpellSlots {
  level1: { used: number; max: number }
  level2: { used: number; max: number }
  level3: { used: number; max: number }
  level4: { used: number; max: number }
  level5: { used: number; max: number }
  level6: { used: number; max: number }
  level7: { used: number; max: number }
  level8: { used: number; max: number }
  level9: { used: number; max: number }
}

/**
 * Limited-use feature tracking
 */
export interface FeatureCharge {
  id: string
  name: string
  current: number
  maximum: number
  rechargeOn: 'shortRest' | 'longRest' | 'dawn' | 'never'
}

/**
 * Resource pool tracking (class-specific resources)
 */
export interface ResourcePool {
  id: string
  name: string
  current: number
  maximum: number
  rechargeOn: 'shortRest' | 'longRest'
}

/**
 * Character alignment
 */
export type Alignment =
  | 'lawful-good'
  | 'neutral-good'
  | 'chaotic-good'
  | 'lawful-neutral'
  | 'true-neutral'
  | 'chaotic-neutral'
  | 'lawful-evil'
  | 'neutral-evil'
  | 'chaotic-evil'

/**
 * Character condition/status effect
 */
export type Condition =
  | 'blinded'
  | 'charmed'
  | 'deafened'
  | 'frightened'
  | 'grappled'
  | 'incapacitated'
  | 'invisible'
  | 'paralyzed'
  | 'petrified'
  | 'poisoned'
  | 'prone'
  | 'restrained'
  | 'stunned'
  | 'unconscious'
  | 'enraged'
  | 'bleeding-minor'
  | 'bleeding-moderate'
  | 'bleeding-severe'
  | 'broken-bone'
  | 'concussed'
  | 'infected'
  | 'exhaustion1'
  | 'exhaustion2'
  | 'exhaustion3'
  | 'exhaustion4'
  | 'exhaustion5'
  | 'exhaustion6'

/**
 * Crafting skill levels for the Work tab (1-100)
 */
export interface CraftingSkills {
  blacksmithing: number // 1-100, unlocks weapon crafting tiers
  tailoring: number     // 1-100, unlocks armor crafting tiers
  alchemy: number       // 1-100, unlocks potion crafting tiers
  enchanting: number    // 1-100, unlocks scroll/enchantment crafting tiers
}

/**
 * Fighter fighting stance options (homebrew)
 */
export type FightingStance = 'two-handed' | 'dual-two-handed' | 'sword-and-board'

/**
 * Fighting stance configuration details
 */
export interface FightingStanceInfo {
  id: FightingStance
  name: string
  description: string
  damage: string
  acModifier: number
}

/**
 * Complete D&D Character
 */
export interface Character {
  // Identity
  id: string
  name: string
  firstName?: string
  surname?: string
  nickname?: string
  playerName: string
  gender?: 'male' | 'female' | 'other'

  // Basic info
  age: string
  height: string
  weight: string
  backstory: string

  // Core stats
  level: number
  experiencePoints: number

  // Race, Class & Background
  race: Race | null
  class: Class | null
  subclass: Subclass | null
  background: Background | null
  alignment: Alignment | null

  // Abilities
  abilityScores: AbilityScores
  skills: Skills
  savingThrows: SavingThrows
  languages: string[]

  // Combat
  hitPoints: HitPoints
  armorClass: number
  initiative: number
  speed: number
  deathSaves: DeathSaves
  conditions: Condition[]

  // Features & Spellcasting
  featureCharges: FeatureCharge[]
  itemFeatures: ClassFeature[] // Features granted by magical items/equipment
  resourcePools: ResourcePool[] // Class-specific resources (Ki, Sorcery Points, Runic Power, etc.)
  spellSlots: SpellSlots
  knownSpells: Spell[]
  preparedSpells: string[] // Spell IDs

  // Equipment
  equipment: Equipment[]
  currency: Currency
  materials: Material[] // Crafting materials (herbs, ores, leathers, hides) - auto-consolidates

  // Carrying Capacity & Supplies
  carryingCapacity: {
    current: number // Current weight carried in pounds
    maximum: number // Max capacity = STR × 15 (or STR × 5 for encumbered)
  }
  foodRations: number // Days of food
  waterSupply: number // Days of water

  // Daily Income
  dailyIncome?: {
    professionName: string
    amount: number
    currency: 'copper' | 'silver' | 'gold'
  }

  // Crafting (Work tab)
  craftingSkills: CraftingSkills

  // Fighter-specific
  fightingStance?: FightingStance

  // Meta
  createdAt: string
  updatedAt: string
}

/**
 * Default ability scores (before racial bonuses)
 */
export const DEFAULT_ABILITY_SCORES: AbilityScores = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
}

/**
 * Standard array for stat allocation
 */
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8] as const

/**
 * Point buy costs per ability score value
 */
export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
}

/**
 * Total points available for point buy
 */
export const POINT_BUY_TOTAL = 27

/**
 * Calculate total ability scores including equipment modifiers
 * @param baseScores - Character's base ability scores
 * @param equipment - Array of equipped items
 * @returns Total ability scores (base + equipment modifiers)
 */
export function calculateTotalAbilityScores(
  baseScores: AbilityScores,
  equipment: Array<{ equipped?: boolean; abilityScoreModifiers?: Partial<AbilityScores> }>
): AbilityScores {
  const total = { ...baseScores }

  // Add modifiers from all equipped items
  equipment.forEach((item) => {
    if (item.equipped && item.abilityScoreModifiers) {
      const modifiers = item.abilityScoreModifiers
      if (modifiers.strength) total.strength += modifiers.strength
      if (modifiers.dexterity) total.dexterity += modifiers.dexterity
      if (modifiers.constitution) total.constitution += modifiers.constitution
      if (modifiers.intelligence) total.intelligence += modifiers.intelligence
      if (modifiers.wisdom) total.wisdom += modifiers.wisdom
      if (modifiers.charisma) total.charisma += modifiers.charisma
    }
  })

  return total
}

/**
 * Calculate maximum carrying capacity
 * @param strength - Character's strength score
 * @returns Maximum carrying capacity in pounds (STR × 15)
 */
export function calculateCarryingCapacity(strength: number): number {
  return strength * 15
}

/**
 * Calculate encumbrance threshold
 * @param strength - Character's strength score
 * @returns Encumbrance threshold in pounds (STR × 5)
 */
export function calculateEncumbranceThreshold(strength: number): number {
  return strength * 5
}

/**
 * Calculate total weight of equipment
 * @param equipment - Array of equipment items
 * @returns Total weight in pounds
 */
export function calculateTotalWeight(equipment: Array<{ weight: number; quantity: number }>): number {
  return equipment.reduce((total, item) => total + (item.weight * item.quantity), 0)
}
