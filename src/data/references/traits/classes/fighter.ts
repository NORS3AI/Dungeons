/**
 * Fighter class trait references
 * Filtered view of traits specific to Fighter class
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const FIGHTER_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('fighter')
  )
)

export const FIGHTER_TRAIT_COUNT = Object.keys(FIGHTER_TRAITS).length
