/**
 * Ranger spell references
 * Filtered view of spells available to Rangers
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const RANGER_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) =>
    spell.classes.some(c => c.toLowerCase().includes('ranger'))
  )
)

export const RANGER_SPELL_COUNT = Object.keys(RANGER_SPELLS).length
