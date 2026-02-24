/**
 * Cleric spell references
 * Filtered view of spells available to Clerics
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const CLERIC_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) => 
    spell.classes.some(c => c.toLowerCase().includes('cleric'))
  )
)

export const CLERIC_SPELL_COUNT = Object.keys(CLERIC_SPELLS).length
