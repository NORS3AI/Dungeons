/**
 * Class trait references
 *
 * Class-specific trait subsets (FIGHTER_TRAITS, WARLOCK_TRAITS, etc.) are NOT
 * statically exported to enable true lazy loading and chunk splitting.
 *
 * To access class-specific traits, use the dynamic loader:
 * import { loadClassTraits } from '../../loader'
 * const { traits } = await loadClassTraits('fighter')
 *
 * Or use the React hook:
 * import { useCharacterReferences } from '@/hooks/useCharacterReferences'
 * const { references } = useCharacterReferences({ classId: 'fighter' })
 */

// This file is intentionally minimal to prevent static imports
// Individual class trait files are loaded dynamically via loader.ts
