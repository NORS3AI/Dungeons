/**
 * Quick Reference Data for D&D Content
 *
 * This file has been refactored! The data is now split across multiple files:
 * - references/types.ts (118 lines) - All interface definitions
 * - references/spells.ts (3,947 lines) - All spell data
 * - references/traits.ts (1,107 lines) - Racial and class traits
 * - references/rules.ts (743 lines) - Game rules and mechanics
 * - references/common.ts (838 lines) - Skills, abilities, weapons, armor, conditions
 *
 * Total: ~6,753 lines split into organized files instead of one 6,723-line monolith
 */

// Re-export all types
export * from './references/types'

// Import all data for internal use
import { SPELLS } from './references/spells'
import { TRAITS } from './references/traits'
import { RULES } from './references/rules'
import { SKILLS, ABILITIES, WEAPONS, ARMOR, CONDITIONS } from './references/common'

// Re-export all data
export { SPELLS, TRAITS, RULES, SKILLS, ABILITIES, WEAPONS, ARMOR, CONDITIONS }

// Helper types and functions
export type RefType = 'spell' | 'skill' | 'ability' | 'weapon' | 'armor' | 'condition' | 'trait' | 'rule'

/**
 * Get a reference by type and ID
 */
export function getReference(type: RefType, id: string) {
  switch (type) {
    case 'spell':
      return SPELLS[id]
    case 'skill':
      return SKILLS[id]
    case 'ability':
      return ABILITIES[id]
    case 'weapon':
      return WEAPONS[id]
    case 'armor':
      return ARMOR[id]
    case 'condition':
      return CONDITIONS[id]
    case 'trait':
      return TRAITS[id]
    case 'rule':
      return RULES[id]
    default:
      return undefined
  }
}
