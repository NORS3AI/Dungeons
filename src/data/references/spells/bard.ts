/**
 * Bard spell references
 * Filtered view of spells available to Bards
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const BARD_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) => 
    spell.classes.some(c => c.toLowerCase().includes('bard'))
  )
)

export const BARD_SPELL_COUNT = Object.keys(BARD_SPELLS).length
