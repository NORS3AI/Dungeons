/**
 * Reference System Index
 * Central export point for all reference data modules
 */

// Export types
export * from './types'

// Export reference data by category
export { SKILLS } from './skills'
export { ABILITIES } from './abilities'
export { WEAPONS } from './weapons'
export { ARMOR } from './armor'
export { CONDITIONS } from './conditions'
export { RULES } from './rules'

// Export all spells (main)
export { SPELLS } from './spells'

// Export class-specific spell subsets (for lazy loading)
export {
  WARLOCK_SPELLS,
  WIZARD_SPELLS,
  CLERIC_SPELLS,
  SORCERER_SPELLS,
  DRUID_SPELLS,
  BARD_SPELLS,
  WARLOCK_SPELL_COUNT,
  WIZARD_SPELL_COUNT,
  CLERIC_SPELL_COUNT,
  SORCERER_SPELL_COUNT,
  DRUID_SPELL_COUNT,
  BARD_SPELL_COUNT,
} from './spells/index'

// Export all traits (main)
export { TRAITS } from './traits'

// Export race-specific trait subsets (for lazy loading)
export {
  DROW_TRAITS,
  TIEFLING_TRAITS,
  ELF_TRAITS,
  HUMAN_TRAITS,
  DWARF_TRAITS,
  DROW_TRAIT_COUNT,
  TIEFLING_TRAIT_COUNT,
  ELF_TRAIT_COUNT,
  HUMAN_TRAIT_COUNT,
  DWARF_TRAIT_COUNT,
} from './traits/races'

// Export class-specific trait subsets (for lazy loading)
export {
  FIGHTER_TRAITS,
  WARLOCK_TRAITS,
  WIZARD_TRAITS,
  CLERIC_TRAITS,
  FIGHTER_TRAIT_COUNT,
  WARLOCK_TRAIT_COUNT,
  WIZARD_TRAIT_COUNT,
  CLERIC_TRAIT_COUNT,
} from './traits/classes'
