/**
 * Cleric class trait references
 * Filtered view of traits specific to Cleric class
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const CLERIC_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('cleric')
  )
)

export const CLERIC_TRAIT_COUNT = Object.keys(CLERIC_TRAITS).length
