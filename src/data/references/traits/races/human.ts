/**
 * Human racial trait references
 * Filtered view of traits specific to Human characters
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const HUMAN_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('human')
  )
)

export const HUMAN_TRAIT_COUNT = Object.keys(HUMAN_TRAITS).length
