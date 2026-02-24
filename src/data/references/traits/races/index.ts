/**
 * Racial trait references
 *
 * Race-specific trait subsets (DROW_TRAITS, TIEFLING_TRAITS, etc.) are NOT
 * statically exported to enable true lazy loading and chunk splitting.
 *
 * To access race-specific traits, use the dynamic loader:
 * import { loadRaceTraits } from '../../loader'
 * const { traits } = await loadRaceTraits('drow')
 *
 * Or use the React hook:
 * import { useCharacterReferences } from '@/hooks/useCharacterReferences'
 * const { references } = useCharacterReferences({ race: 'drow' })
 */

// This file is intentionally minimal to prevent static imports
// Individual race trait files are loaded dynamically via loader.ts
