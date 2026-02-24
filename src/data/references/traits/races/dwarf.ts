/**
 * Dwarf racial trait references
 * Filtered view of traits specific to Dwarf characters
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const DWARF_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('dwarf')
  )
)

export const DWARF_TRAIT_COUNT = Object.keys(DWARF_TRAITS).length
