/**
 * Quick Reference Data for D&D Content
 *
 * This file has been refactored! The data is now split across multiple files:
 * - references/types.ts (118 lines) - All interface definitions
 * - references/spells.ts (3,947 lines) - All spell data
 * - references/traits.ts (1,107 lines) - Racial and class traits
 * - references/rules.ts (703 lines) - Game rules and mechanics
 * - references/skills.ts (135 lines) - All skill data
 * - references/abilities.ts (57 lines) - The six core abilities
 * - references/weapons.ts (393 lines) - Weapon data
 * - references/armor.ts (71 lines) - Armor data
 * - references/conditions.ts (195 lines) - Status conditions
 *
 * Total: ~6,746 lines split into organized files instead of one 6,723-line monolith
 */

// Re-export all types and data from the centralized index
export * from './references/index'

// Import for getReference helper function
import { SPELLS, SKILLS, ABILITIES, WEAPONS, ARMOR, CONDITIONS, TRAITS, RULES } from './references/index'

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
