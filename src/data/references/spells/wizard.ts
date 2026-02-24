/**
 * Wizard spell references
 * Filtered view of spells available to Wizards
 */
import type { SpellRef } from '../types'
import { SPELLS } from '../spells'

export const WIZARD_SPELLS: Record<string, SpellRef> = Object.fromEntries(
  Object.entries(SPELLS).filter(([_, spell]) => 
    spell.classes.some(c => c.toLowerCase().includes('wizard'))
  )
)

export const WIZARD_SPELL_COUNT = Object.keys(WIZARD_SPELLS).length
