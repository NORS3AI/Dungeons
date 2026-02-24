/**
 * React hook for lazy loading character-specific references
 * Automatically loads and caches references based on character race/class
 */

import { useState, useEffect, useCallback } from 'react'
import {
  loadCharacterReferences,
  type CharacterReferences,
} from '../data/references/loader'

interface UseCharacterReferencesOptions {
  race?: string
  classId?: string
  autoLoad?: boolean // If false, requires manual trigger via loadReferences()
}

interface UseCharacterReferencesResult {
  references: CharacterReferences | null
  loading: boolean
  error: Error | null
  loadReferences: () => Promise<void>
  refetch: () => Promise<void>
}

/**
 * Hook for lazy loading character-specific references
 *
 * @param options - Configuration options
 * @returns Object containing references, loading state, and load functions
 *
 * @example
 * // Auto-load when race/class changes
 * const { references, loading } = useCharacterReferences({
 *   race: character.race.id,
 *   classId: character.class.id,
 *   autoLoad: true
 * })
 *
 * @example
 * // Manual loading
 * const { references, loading, loadReferences } = useCharacterReferences({
 *   race: 'drow',
 *   classId: 'warlock',
 *   autoLoad: false
 * })
 * // Later...
 * await loadReferences()
 */
export function useCharacterReferences(
  options: UseCharacterReferencesOptions
): UseCharacterReferencesResult {
  const { race, classId, autoLoad = true } = options

  const [references, setReferences] = useState<CharacterReferences | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loadReferences = useCallback(async () => {
    // Only load if we have at least one identifier
    if (!race && !classId) {
      setReferences(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const loadedRefs = await loadCharacterReferences({ race, classId })
      setReferences(loadedRefs)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load references')
      setError(error)
      console.error('Failed to load character references:', error)
    } finally {
      setLoading(false)
    }
  }, [race, classId])

  // Auto-load when race/class changes (if enabled)
  useEffect(() => {
    if (autoLoad) {
      loadReferences()
    }
  }, [autoLoad, loadReferences])

  return {
    references,
    loading,
    error,
    loadReferences,
    refetch: loadReferences, // Alias for convenience
  }
}

/**
 * Hook for preloading character references in the background
 * Useful for warming up the cache during character creation
 *
 * @example
 * // In character creation wizard
 * const preload = usePreloadReferences()
 *
 * // When user selects race on step 2
 * preload({ race: 'drow' })
 *
 * // When user selects class on step 3
 * preload({ race: 'drow', classId: 'warlock' })
 */
export function usePreloadReferences() {
  return useCallback((options: { race?: string; classId?: string }) => {
    // Fire-and-forget preload
    loadCharacterReferences(options).catch((err) => {
      console.warn('Failed to preload references:', err)
    })
  }, [])
}
