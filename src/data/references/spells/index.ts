/**
 * Spell references by class
 * Enables lazy loading of class-specific spell subsets
 */

// Re-export all spells (for backward compatibility)
export { SPELLS } from '../spells'

// Class-specific spell subsets
export { WARLOCK_SPELLS, WARLOCK_SPELL_COUNT } from './warlock'
export { WIZARD_SPELLS, WIZARD_SPELL_COUNT } from './wizard'
export { CLERIC_SPELLS, CLERIC_SPELL_COUNT } from './cleric'
export { SORCERER_SPELLS, SORCERER_SPELL_COUNT } from './sorcerer'
export { DRUID_SPELLS, DRUID_SPELL_COUNT } from './druid'
export { BARD_SPELLS, BARD_SPELL_COUNT } from './bard'
