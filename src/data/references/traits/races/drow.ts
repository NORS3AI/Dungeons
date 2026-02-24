/**
 * Drow racial trait references
 * Filtered view of traits specific to Drow characters
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const DROW_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('drow')
  )
)

export const DROW_TRAIT_COUNT = Object.keys(DROW_TRAITS).length
