/**
 * Wizard class trait references
 * Filtered view of traits specific to Wizard class
 */
import type { TraitRef } from '../../types'
import { TRAITS } from '../../traits'

export const WIZARD_TRAITS: Record<string, TraitRef> = Object.fromEntries(
  Object.entries(TRAITS).filter(([_, trait]) => 
    trait.source.toLowerCase().includes('wizard')
  )
)

export const WIZARD_TRAIT_COUNT = Object.keys(WIZARD_TRAITS).length
