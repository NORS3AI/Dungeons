import type { Character } from '../types'
import html2pdf from 'html2pdf.js'

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

/**
 * Export character sheet to PDF
 * This function captures the current character sheet and converts it to PDF
 */
export async function exportCharacterToPDF(character: Character): Promise<void> {
  // Find the character sheet element
  const element = document.querySelector('.max-w-6xl') as HTMLElement

  if (!element) {
    throw new Error('Character sheet element not found')
  }

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement

  // Remove buttons and other interactive elements from the clone
  const buttons = clone.querySelectorAll('button')
  buttons.forEach(btn => btn.remove())

  // Remove tabs navigation
  const tabsNav = clone.querySelector('.flex.gap-2.mb-6.border-b')
  if (tabsNav) tabsNav.remove()

  // Configure PDF options
  const opt = {
    margin: 0.5,
    filename: `${character.name || 'character'}-${character.id.slice(0, 8)}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'in' as const,
      format: 'letter' as const,
      orientation: 'portrait' as const
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as const }
  }

  try {
    await html2pdf().set(opt).from(clone).save()
  } catch (error) {
    console.error('PDF export failed:', error)
    throw new Error('Failed to export PDF. Please try again.')
  }
}
