/**
 * Death Knight spell references
 * Filtered view of spells available to Death Knights
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const DEATH_KNIGHT_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) =>
    spell.classes.some(c => c.toLowerCase().includes('death-knight') || c.toLowerCase().includes('death knight'))
  )
)

export const DEATH_KNIGHT_SPELL_COUNT = Object.keys(DEATH_KNIGHT_SPELLS).length
