import type { Character } from '../types'

/**
 * Export character to JSON file
 */
export function exportCharacterToJSON(character: Character): void {
  const data = JSON.stringify(character, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${character.name || 'character'}-${character.id.slice(0, 8)}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Validate imported character data
 */
function validateCharacterData(data: unknown): data is Character {
  if (!data || typeof data !== 'object') return false

  const char = data as Record<string, unknown>

  // Check required fields
  if (typeof char.id !== 'string') return false
  if (typeof char.name !== 'string') return false
  if (typeof char.level !== 'number') return false
  if (!char.abilityScores || typeof char.abilityScores !== 'object') return false

  return true
}

/**
 * Import character from JSON file
 * Returns the character or throws an error
 */
export async function importCharacterFromJSON(file: File): Promise<Character> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result
        if (typeof text !== 'string') {
          throw new Error('Failed to read file')
        }

        const data = JSON.parse(text)

        if (!validateCharacterData(data)) {
          throw new Error('Invalid character data format')
        }

        // Generate new ID to avoid conflicts
        const importedCharacter: Character = {
          ...data,
          id: crypto.randomUUID(),
          name: data.name || 'Imported Character',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        resolve(importedCharacter)
      } catch (error) {
        reject(new Error(`Failed to parse character file: ${error instanceof Error ? error.message : 'Unknown error'}`))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}

/**
 * Export multiple characters to JSON file
 */
export function exportAllCharactersToJSON(characters: Character[]): void {
  const data = JSON.stringify(characters, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `all-characters-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
