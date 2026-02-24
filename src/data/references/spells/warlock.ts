/**
 * Warlock spell references
 * Filtered view of spells available to Warlocks
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

// Filter spells available to Warlocks
export const WARLOCK_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) => 
    spell.classes.some(c => c.toLowerCase().includes('warlock'))
  )
)

// Export count for debugging
export const WARLOCK_SPELL_COUNT = Object.keys(WARLOCK_SPELLS).length
