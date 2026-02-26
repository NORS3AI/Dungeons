/**
 * Quick Reference Data for D&D Content
 *
 * OPTIMIZED FOR CODE-SPLITTING:
 * This file re-exports references but does NOT import large datasets (SPELLS, TRAITS, RULES).
 * Those must be imported directly where needed to enable proper code-splitting.
 *
 * Small references are safely imported: skills, abilities, weapons, armor, conditions (~1000 lines)
 * Large references should be imported directly: spells, traits, rules (~7500 lines)
 */

// Re-export all types
export * from './references/types'

// Small references - safe to import (commonly needed, ~1000 lines total)
export { SKILLS } from './references/skills'
export { ABILITIES } from './references/abilities'
export { WEAPONS } from './references/weapons'
export { ARMOR } from './references/armor'
export { CONDITIONS } from './references/conditions'

// LARGE references - DO NOT import here to avoid bloating main bundle
// Import these directly where needed:
// import { SPELLS } from './references/spells'    (~3949 lines)
// import { TRAITS } from './references/traits'    (~3548 lines)
// import { RULES } from './references/rules'      (~762 lines)

// Helper type
export type RefType = 'spell' | 'skill' | 'ability' | 'weapon' | 'armor' | 'condition' | 'trait' | 'rule'

// Cache for lazy-loaded large datasets
let spellsCache: Record<string, any> | null = null
let traitsCache: Record<string, any> | null = null
let rulesCache: Record<string, any> | null = null

// Import small datasets synchronously
import { SKILLS as SKILLS_DATA } from './references/skills'
import { ABILITIES as ABILITIES_DATA } from './references/abilities'
import { WEAPONS as WEAPONS_DATA } from './references/weapons'
import { ARMOR as ARMOR_DATA } from './references/armor'
import { CONDITIONS as CONDITIONS_DATA } from './references/conditions'

/**
 * Get a reference by type and ID
 * Small references (skill, ability, weapon, armor, condition) load synchronously
 * Large references (spell, trait, rule) load asynchronously on first access
 */
export async function getReference(type: RefType, id: string) {
  switch (type) {
    case 'spell':
      if (!spellsCache) {
        const { SPELLS } = await import('./references/spells')
        spellsCache = SPELLS
      }
      return spellsCache[id]

    case 'trait':
      if (!traitsCache) {
        const { TRAITS } = await import('./references/traits')
        traitsCache = TRAITS
      }
      return traitsCache[id]

    case 'rule':
      if (!rulesCache) {
        const { RULES } = await import('./references/rules')
        rulesCache = RULES
      }
      return rulesCache[id]

    case 'skill':
      return SKILLS_DATA[id]
    case 'ability':
      return ABILITIES_DATA[id]
    case 'weapon':
      return WEAPONS_DATA[id]
    case 'armor':
      return ARMOR_DATA[id]
    case 'condition':
      return CONDITIONS_DATA[id]

    default:
      return undefined
  }
}
