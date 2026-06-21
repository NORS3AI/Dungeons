import type { Character } from '../types'
import { CLASS_MAP, SUBCLASS_MAP, RACE_MAP } from '../data/contentVersion'

interface SyncResult {
  synced: number
  changes: string[]
}

/**
 * Refreshes embedded class, subclass, and race data in a character
 * to match the current static definitions. Preserves user-specific
 * state (HP, spells chosen, equipment, etc.).
 */
export function syncCharacterContent(character: Character): { character: Character; changed: boolean; details: string[] } {
  const details: string[] = []
  let updated = { ...character }

  // Sync class data
  if (updated.class) {
    const current = CLASS_MAP.get(updated.class.id)
    if (current) {
      const oldFeatureCount = updated.class.features.length
      const newFeatureCount = current.features.length
      if (JSON.stringify(updated.class) !== JSON.stringify(current)) {
        updated = { ...updated, class: current }
        if (newFeatureCount !== oldFeatureCount) {
          details.push(`${current.name}: ${oldFeatureCount} → ${newFeatureCount} features`)
        } else {
          details.push(`${current.name}: class data refreshed`)
        }
      }
    }
  }

  // Sync subclass data
  if (updated.subclass) {
    const current = SUBCLASS_MAP.get(updated.subclass.id)
    if (current) {
      if (JSON.stringify(updated.subclass) !== JSON.stringify(current)) {
        updated = { ...updated, subclass: current }
        details.push(`${current.name}: subclass data refreshed`)
      }
    }
  }

  // Sync race data
  if (updated.race) {
    const current = RACE_MAP.get(updated.race.id)
    if (current) {
      if (JSON.stringify(updated.race) !== JSON.stringify(current)) {
        updated = { ...updated, race: current }
        details.push(`${current.name}: race data refreshed`)
      }
    }
  }

  if (details.length > 0) {
    updated.updatedAt = new Date().toISOString()
  }

  return { character: updated, changed: details.length > 0, details }
}

/**
 * Syncs all characters and returns a summary of what changed.
 */
export function syncAllCharacters(characters: Character[]): { characters: Character[]; result: SyncResult } {
  let synced = 0
  const changes: string[] = []

  const updatedCharacters = characters.map((char) => {
    const { character: updated, changed, details } = syncCharacterContent(char)
    if (changed) {
      synced++
      changes.push(`${char.name}: ${details.join(', ')}`)
    }
    return updated
  })

  return {
    characters: updatedCharacters,
    result: { synced, changes },
  }
}
