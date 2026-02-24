/**
 * Elf racial trait references
 * Filtered view of traits specific to Elf characters (excluding Drow)
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const ELF_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    (trait.source.toLowerCase().includes('elf') || trait.source.toLowerCase().includes('half-elf')) &&
    !trait.source.toLowerCase().includes('drow')
  )
)

export const ELF_TRAIT_COUNT = Object.keys(ELF_TRAITS).length
