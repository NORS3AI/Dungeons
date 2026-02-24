/**
 * Sorcerer spell references
 * Filtered view of spells available to Sorcerers
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const SORCERER_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) => 
    spell.classes.some(c => c.toLowerCase().includes('sorcerer'))
  )
)

export const SORCERER_SPELL_COUNT = Object.keys(SORCERER_SPELLS).length
