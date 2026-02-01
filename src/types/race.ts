import type { AbilityScores } from './character'

/**
 * Ability score bonus from a race
 */
export type AbilityBonus = Partial<AbilityScores>

/**
 * Racial trait/feature
 */
export interface RacialTrait {
  id: string
  name: string
  description: string
  level?: number // Level at which this trait is gained (default: 1)
}

/**
 * Racial spellcasting ability
 */
export interface RacialSpell {
  spellId: string
  spellName: string
  levelGained: number
  castingAbility: 'intelligence' | 'wisdom' | 'charisma'
  usesPerDay: number | 'atwill'
}

/**
 * Vision type
 */
export type VisionType = 'normal' | 'darkvision' | 'superiorDarkvision' | 'blindsight' | 'truesight'

/**
 * D&D Race/Species
 */
export interface Race {
  id: string
  name: string
  description: string

  // Ability bonuses
  abilityBonuses: AbilityBonus

  // Size
  size: 'tiny' | 'small' | 'medium' | 'large'

  // Speed
  speed: number
  flySpeed?: number
  swimSpeed?: number
  climbSpeed?: number

  // Vision
  vision: VisionType
  visionRange?: number // in feet

  // Languages
  languages: string[]

  // Traits
  traits: RacialTrait[]

  // Racial spellcasting
  spells?: RacialSpell[]

  // Proficiencies
  weaponProficiencies?: string[]
  armorProficiencies?: string[]
  toolProficiencies?: string[]
  skillProficiencies?: string[]

  // Resistances & Immunities
  damageResistances?: string[]
  conditionImmunities?: string[]

  // Subraces
  subraces?: Race[]
}

/**
 * Drow race definition
 */
export const DROW: Race = {
  id: 'drow',
  name: 'Drow',
  description: 'Dark elves who dwell in the Underdark, known for their superior darkvision and innate magic.',
  abilityBonuses: {
    dexterity: 2,
    charisma: 1,
  },
  size: 'medium',
  speed: 30,
  vision: 'superiorDarkvision',
  visionRange: 120,
  languages: ['Common', 'Elvish', 'Undercommon'],
  traits: [
    {
      id: 'fey-ancestry',
      name: 'Fey Ancestry',
      description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    },
    {
      id: 'trance',
      name: 'Trance',
      description: 'You don\'t need to sleep. Instead, you meditate deeply for 4 hours a day.',
    },
    {
      id: 'sunlight-sensitivity',
      name: 'Sunlight Sensitivity',
      description: 'You have disadvantage on attack rolls and Perception checks that rely on sight when you, the target, or what you\'re trying to perceive is in direct sunlight.',
    },
  ],
  spells: [
    { spellId: 'dancing-lights', spellName: 'Dancing Lights', levelGained: 1, castingAbility: 'charisma', usesPerDay: 'atwill' },
    { spellId: 'faerie-fire', spellName: 'Faerie Fire', levelGained: 3, castingAbility: 'charisma', usesPerDay: 1 },
    { spellId: 'darkness', spellName: 'Darkness', levelGained: 5, castingAbility: 'charisma', usesPerDay: 1 },
  ],
  weaponProficiencies: ['rapier', 'shortsword', 'hand-crossbow'],
}

/**
 * Tiefling race definition
 */
export const TIEFLING: Race = {
  id: 'tiefling',
  name: 'Tiefling',
  description: 'Tieflings are derived from human bloodlines touched by the power of the Nine Hells.',
  abilityBonuses: {
    charisma: 2,
    intelligence: 1,
  },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Infernal'],
  traits: [
    {
      id: 'hellish-resistance',
      name: 'Hellish Resistance',
      description: 'You have resistance to fire damage.',
    },
  ],
  damageResistances: ['fire'],
  spells: [
    { spellId: 'thaumaturgy', spellName: 'Thaumaturgy', levelGained: 1, castingAbility: 'charisma', usesPerDay: 'atwill' },
    { spellId: 'hellish-rebuke', spellName: 'Hellish Rebuke', levelGained: 3, castingAbility: 'charisma', usesPerDay: 1 },
    { spellId: 'darkness', spellName: 'Darkness', levelGained: 5, castingAbility: 'charisma', usesPerDay: 1 },
  ],
}
