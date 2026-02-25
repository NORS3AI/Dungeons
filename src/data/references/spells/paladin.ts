/**
 * Paladin spell references
 * Filtered view of spells available to Paladins
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const PALADIN_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) =>
    spell.classes.some(c => c.toLowerCase().includes('paladin'))
  )
)

export const PALADIN_SPELL_COUNT = Object.keys(PALADIN_SPELLS).length
