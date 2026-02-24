/**
 * Druid spell references
 * Filtered view of spells available to Druids
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const DRUID_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) => 
    spell.classes.some(c => c.toLowerCase().includes('druid'))
  )
)

export const DRUID_SPELL_COUNT = Object.keys(DRUID_SPELLS).length
