import type { Race } from './race'
import type { Class, Subclass } from './class'
import type { Background } from './background'
import type { Spell } from './spell'
import type { Equipment, Currency } from './equipment'

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
  | 'exhaustion1'
  | 'exhaustion2'
  | 'exhaustion3'
  | 'exhaustion4'
  | 'exhaustion5'
  | 'exhaustion6'

/**
 * Complete D&D Character
 */
export interface Character {
  // Identity
  id: string
  name: string
  playerName: string

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

  // Abilities
  abilityScores: AbilityScores
  skills: Skills
  savingThrows: SavingThrows

  // Combat
  hitPoints: HitPoints
  armorClass: number
  initiative: number
  speed: number
  deathSaves: DeathSaves
  conditions: Condition[]

  // Features & Spellcasting
  featureCharges: FeatureCharge[]
  spellSlots: SpellSlots
  knownSpells: Spell[]
  preparedSpells: string[] // Spell IDs

  // Equipment
  equipment: Equipment[]
  currency: Currency

  // Daily Income
  dailyIncome?: {
    professionName: string
    amount: number
    currency: 'copper' | 'silver' | 'gold'
  }

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
