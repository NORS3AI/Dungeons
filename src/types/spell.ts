import type { Ability } from './class'

/**
 * Spell school
 */
export type SpellSchool =
  | 'abjuration'
  | 'conjuration'
  | 'divination'
  | 'enchantment'
  | 'evocation'
  | 'illusion'
  | 'necromancy'
  | 'transmutation'

/**
 * Spell component types
 */
export interface SpellComponents {
  verbal: boolean
  somatic: boolean
  material: boolean
  materialDescription?: string
  materialCost?: number // in gold pieces
  materialConsumed?: boolean
}

/**
 * Casting time
 */
export interface CastingTime {
  amount: number
  unit: 'action' | 'bonusAction' | 'reaction' | 'minute' | 'hour'
  reactionTrigger?: string
}

/**
 * Spell duration
 */
export interface SpellDuration {
  type: 'instantaneous' | 'concentration' | 'timed' | 'untilDispelled' | 'special'
  amount?: number
  unit?: 'round' | 'minute' | 'hour' | 'day'
}

/**
 * Spell range
 */
export interface SpellRange {
  type: 'self' | 'touch' | 'ranged' | 'sight' | 'unlimited' | 'special'
  distance?: number // in feet
  shape?: 'cone' | 'cube' | 'cylinder' | 'line' | 'sphere' | 'radius'
  shapeSize?: number
}

/**
 * Damage/healing scaling
 */
export interface SpellScaling {
  type: 'characterLevel' | 'spellSlot'
  dice?: string // e.g., "1d8"
  bonus?: number
  levels?: Record<number, string> // level -> damage dice
}

/**
 * D&D Spell
 */
export interface Spell {
  id: string
  name: string
  description: string

  // Level (0 = cantrip)
  level: number
  school: SpellSchool

  // Casting
  castingTime: CastingTime
  range: SpellRange
  components: SpellComponents
  duration: SpellDuration

  // Effects
  damage?: {
    dice: string
    type: string
    scaling?: SpellScaling
  }
  healing?: {
    dice: string
    scaling?: SpellScaling
  }
  savingThrow?: {
    ability: Ability
    effect: string // e.g., "half damage"
  }
  attackRoll?: boolean

  // Ritual
  ritual: boolean

  // Concentration
  concentration: boolean

  // Classes that can learn this spell
  classes: string[]

  // Higher level casting
  atHigherLevels?: string
}

/**
 * Example Warlock cantrip - Eldritch Blast
 */
export const ELDRITCH_BLAST: Spell = {
  id: 'eldritch-blast',
  name: 'Eldritch Blast',
  description: 'A beam of crackling energy streaks toward a creature within range.',
  level: 0,
  school: 'evocation',
  castingTime: { amount: 1, unit: 'action' },
  range: { type: 'ranged', distance: 120 },
  components: { verbal: true, somatic: true, material: false },
  duration: { type: 'instantaneous' },
  damage: {
    dice: '1d10',
    type: 'force',
    scaling: {
      type: 'characterLevel',
      levels: {
        1: '1d10',
        5: '2d10',
        11: '3d10',
        17: '4d10',
      },
    },
  },
  attackRoll: true,
  ritual: false,
  concentration: false,
  classes: ['warlock'],
}
