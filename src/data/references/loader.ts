/**
 * Character Reference Loader
 * Dynamically loads only the references needed for a specific character
 * Reduces initial bundle size by lazy loading race/class-specific data
 */

import type { SpellRef, TraitRef } from './types'

// Type definitions for loaded references
export interface CharacterReferences {
  classSpells?: Record<string, SpellRef>
  classTraits?: Record<string, TraitRef>
  raceTraits?: Record<string, TraitRef>
  spellCount?: number
  classTraitCount?: number
  raceTraitCount?: number
}

/**
 * Lazy load spell references for a specific class
 * @param classId - The class identifier (e.g., 'warlock', 'wizard', 'fighter')
 * @returns Promise resolving to class-specific spells and count
 */
export async function loadClassSpells(classId: string): Promise<{ spells: Record<string, SpellRef>; count: number }> {
  try {
    const normalizedClass = classId.toLowerCase()

    switch (normalizedClass) {
      case 'warlock': {
        const { WARLOCK_SPELLS, WARLOCK_SPELL_COUNT } = await import('./spells/warlock')
        return { spells: WARLOCK_SPELLS, count: WARLOCK_SPELL_COUNT }
      }
      case 'wizard': {
        const { WIZARD_SPELLS, WIZARD_SPELL_COUNT } = await import('./spells/wizard')
        return { spells: WIZARD_SPELLS, count: WIZARD_SPELL_COUNT }
      }
      case 'cleric': {
        const { CLERIC_SPELLS, CLERIC_SPELL_COUNT } = await import('./spells/cleric')
        return { spells: CLERIC_SPELLS, count: CLERIC_SPELL_COUNT }
      }
      case 'sorcerer': {
        const { SORCERER_SPELLS, SORCERER_SPELL_COUNT } = await import('./spells/sorcerer')
        return { spells: SORCERER_SPELLS, count: SORCERER_SPELL_COUNT }
      }
      case 'druid': {
        const { DRUID_SPELLS, DRUID_SPELL_COUNT } = await import('./spells/druid')
        return { spells: DRUID_SPELLS, count: DRUID_SPELL_COUNT }
      }
      case 'bard': {
        const { BARD_SPELLS, BARD_SPELL_COUNT } = await import('./spells/bard')
        return { spells: BARD_SPELLS, count: BARD_SPELL_COUNT }
      }
      default:
        console.warn(`No spell subset found for class: ${classId}`)
        return { spells: {}, count: 0 }
    }
  } catch (error) {
    console.error(`Failed to load spells for class ${classId}:`, error)
    return { spells: {}, count: 0 }
  }
}

/**
 * Lazy load trait references for a specific class
 * @param classId - The class identifier (e.g., 'fighter', 'warlock')
 * @returns Promise resolving to class-specific traits and count
 */
export async function loadClassTraits(classId: string): Promise<{ traits: Record<string, TraitRef>; count: number }> {
  try {
    const normalizedClass = classId.toLowerCase()

    switch (normalizedClass) {
      case 'fighter': {
        const { FIGHTER_TRAITS, FIGHTER_TRAIT_COUNT } = await import('./traits/classes/fighter')
        return { traits: FIGHTER_TRAITS, count: FIGHTER_TRAIT_COUNT }
      }
      case 'warlock': {
        const { WARLOCK_TRAITS, WARLOCK_TRAIT_COUNT } = await import('./traits/classes/warlock')
        return { traits: WARLOCK_TRAITS, count: WARLOCK_TRAIT_COUNT }
      }
      case 'wizard': {
        const { WIZARD_TRAITS, WIZARD_TRAIT_COUNT } = await import('./traits/classes/wizard')
        return { traits: WIZARD_TRAITS, count: WIZARD_TRAIT_COUNT }
      }
      case 'cleric': {
        const { CLERIC_TRAITS, CLERIC_TRAIT_COUNT } = await import('./traits/classes/cleric')
        return { traits: CLERIC_TRAITS, count: CLERIC_TRAIT_COUNT }
      }
      default:
        console.warn(`No trait subset found for class: ${classId}`)
        return { traits: {}, count: 0 }
    }
  } catch (error) {
    console.error(`Failed to load traits for class ${classId}:`, error)
    return { traits: {}, count: 0 }
  }
}

/**
 * Lazy load trait references for a specific race
 * @param raceId - The race identifier (e.g., 'drow', 'tiefling', 'human')
 * @returns Promise resolving to race-specific traits and count
 */
export async function loadRaceTraits(raceId: string): Promise<{ traits: Record<string, TraitRef>; count: number }> {
  try {
    const normalizedRace = raceId.toLowerCase()

    switch (normalizedRace) {
      case 'drow': {
        const { DROW_TRAITS, DROW_TRAIT_COUNT } = await import('./traits/races/drow')
        return { traits: DROW_TRAITS, count: DROW_TRAIT_COUNT }
      }
      case 'tiefling': {
        const { TIEFLING_TRAITS, TIEFLING_TRAIT_COUNT } = await import('./traits/races/tiefling')
        return { traits: TIEFLING_TRAITS, count: TIEFLING_TRAIT_COUNT }
      }
      case 'elf':
      case 'half-elf': {
        const { ELF_TRAITS, ELF_TRAIT_COUNT } = await import('./traits/races/elf')
        return { traits: ELF_TRAITS, count: ELF_TRAIT_COUNT }
      }
      case 'human': {
        const { HUMAN_TRAITS, HUMAN_TRAIT_COUNT } = await import('./traits/races/human')
        return { traits: HUMAN_TRAITS, count: HUMAN_TRAIT_COUNT }
      }
      case 'dwarf': {
        const { DWARF_TRAITS, DWARF_TRAIT_COUNT } = await import('./traits/races/dwarf')
        return { traits: DWARF_TRAITS, count: DWARF_TRAIT_COUNT }
      }
      default:
        console.warn(`No trait subset found for race: ${raceId}`)
        return { traits: {}, count: 0 }
    }
  } catch (error) {
    console.error(`Failed to load traits for race ${raceId}:`, error)
    return { traits: {}, count: 0 }
  }
}

/**
 * Load all references for a specific character
 * This is the main entry point for lazy loading character-specific data
 *
 * @param options - Character race and class identifiers
 * @returns Promise resolving to all character-specific references
 *
 * @example
 * const refs = await loadCharacterReferences({
 *   race: 'drow',
 *   classId: 'warlock'
 * })
 * console.log(`Loaded ${refs.spellCount} spells, ${refs.raceTraitCount} race traits, ${refs.classTraitCount} class traits`)
 */
export async function loadCharacterReferences(options: {
  race?: string
  classId?: string
}): Promise<CharacterReferences> {
  const { race, classId } = options

  // Load all references in parallel for maximum performance
  const [classSpellsResult, classTraitsResult, raceTraitsResult] = await Promise.all([
    classId ? loadClassSpells(classId) : Promise.resolve({ spells: {}, count: 0 }),
    classId ? loadClassTraits(classId) : Promise.resolve({ traits: {}, count: 0 }),
    race ? loadRaceTraits(race) : Promise.resolve({ traits: {}, count: 0 }),
  ])

  return {
    classSpells: classSpellsResult.spells,
    classTraits: classTraitsResult.traits,
    raceTraits: raceTraitsResult.traits,
    spellCount: classSpellsResult.count,
    classTraitCount: classTraitsResult.count,
    raceTraitCount: raceTraitsResult.count,
  }
}

/**
 * Preload references for a character
 * Useful for preloading data in the background while the user is on character creation
 *
 * @param options - Character race and class identifiers
 * @returns Promise that resolves when preloading is complete
 *
 * @example
 * // Preload in background when user selects race/class
 * preloadCharacterReferences({ race: 'drow', classId: 'warlock' })
 *   .then(() => console.log('References preloaded!'))
 */
export async function preloadCharacterReferences(options: {
  race?: string
  classId?: string
}): Promise<void> {
  await loadCharacterReferences(options)
}
