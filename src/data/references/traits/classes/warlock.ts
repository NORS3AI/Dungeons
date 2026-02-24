/**
 * Warlock class trait references
 * Filtered view of traits specific to Warlock class
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const WARLOCK_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('warlock')
  )
)

export const WARLOCK_TRAIT_COUNT = Object.keys(WARLOCK_TRAITS).length
