/**
 * Spell references by class
 *
 * Class-specific spell subsets (WARLOCK_SPELLS, WIZARD_SPELLS, etc.) are NOT
 * statically exported to enable true lazy loading and chunk splitting.
 *
 * To access class-specific spells, use the dynamic loader:
 * import { loadClassSpells } from '../loader'
 * const { spells } = await loadClassSpells('warlock')
 *
 * Or use the React hook:
 * import { useCharacterReferences } from '@/hooks/useCharacterReferences'
 * const { references } = useCharacterReferences({ classId: 'warlock' })
 */

// This file is intentionally minimal to prevent static imports
// Individual class spell files are loaded dynamically via loader.ts
