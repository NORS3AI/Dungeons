import type { StateStorage } from 'zustand/middleware'

/**
 * Create a debounced storage wrapper for Zustand persist middleware
 * This prevents excessive localStorage writes during rapid state changes
 */
export function createDebouncedStorage(delay: number = 1000): StateStorage {
  const pending = new Map<string, number>()

  return {
    getItem: (name: string): string | null => {
      try {
        return localStorage.getItem(name)
      } catch (err) {
        console.error(`Failed to get item ${name} from localStorage:`, err)
        return null
      }
    },

    setItem: (name: string, value: string): void => {
      // Clear any pending write for this key
      const existingTimeout = pending.get(name)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }

      // Schedule new write
      const timeout = setTimeout(() => {
        try {
          localStorage.setItem(name, value)
          pending.delete(name)
        } catch (err) {
          console.error(`Failed to set item ${name} in localStorage:`, err)
          // Check if quota exceeded
          if (err instanceof Error && err.name === 'QuotaExceededError') {
            console.warn('localStorage quota exceeded. Consider clearing old data.')
          }
        }
      }, delay)

      pending.set(name, timeout)
    },

    removeItem: (name: string): void => {
      // Clear any pending write
      const existingTimeout = pending.get(name)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
        pending.delete(name)
      }

      try {
        localStorage.removeItem(name)
      } catch (err) {
        console.error(`Failed to remove item ${name} from localStorage:`, err)
      }
    },
  }
}
