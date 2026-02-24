/**
 * Tiefling racial trait references
 * Filtered view of traits specific to Tiefling characters
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const TIEFLING_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('tiefling')
  )
)

export const TIEFLING_TRAIT_COUNT = Object.keys(TIEFLING_TRAITS).length
