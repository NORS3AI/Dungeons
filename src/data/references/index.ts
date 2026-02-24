/**
 * Reference System Index
 * Central export point for all reference data modules
 *
 * Note: Class/race-specific filtered views (WARLOCK_SPELLS, DROW_TRAITS, etc.)
 * are intentionally NOT exported from this index to enable true lazy loading.
 * Use the dynamic import loader from './loader' to access filtered references.
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

// Export all spells (main database)
export { SPELLS } from './spells'

// Export all traits (main database)
export { TRAITS } from './traits'

// For lazy loading of class/race-specific references, use:
// import { loadCharacterReferences } from './loader'
// Or use the React hook:
// import { useCharacterReferences } from '@/hooks/useCharacterReferences'
