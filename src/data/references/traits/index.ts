/**
 * Trait references organized by race and class
 *
 * Race and class-specific trait subsets are NOT statically exported to enable
 * true lazy loading and chunk splitting.
 *
 * To access filtered traits, use the dynamic loader:
 * import { loadRaceTraits, loadClassTraits } from '../loader'
 * const { traits: raceTraits } = await loadRaceTraits('drow')
 * const { traits: classTraits } = await loadClassTraits('fighter')
 *
 * Or use the React hook:
 * import { useCharacterReferences } from '@/hooks/useCharacterReferences'
 * const { references } = useCharacterReferences({ race: 'drow', classId: 'fighter' })
 */

// This file is intentionally minimal to prevent static imports
// Individual trait files are loaded dynamically via loader.ts
