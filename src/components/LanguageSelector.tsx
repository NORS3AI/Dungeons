import { useState } from 'react'

const BONUS_LANGUAGES = [
  { id: 'dwarvish', name: 'Dwarvish' },
  { id: 'elvish', name: 'Elvish' },
  { id: 'gnomish', name: 'Gnomish' },
  { id: 'goblin', name: 'Goblin' },
  { id: 'halfling', name: 'Halfling' },
  { id: 'orc', name: 'Orc' },
  { id: 'celestial', name: 'Celestial' },
  { id: 'abyssal', name: 'Abyssal' },
  { id: 'deep-speech', name: 'Deep Speech' },
  { id: 'draconic', name: 'Draconic' },
  { id: 'infernal', name: 'Infernal' },
  { id: 'primordial', name: 'Primordial' },
  { id: 'sylvan', name: 'Sylvan' },
  { id: 'undercommon', name: 'Undercommon' },
]

/**
 * Friendly display name for a language id.
 * Falls back to title-casing the id if not in the list.
 */
function langName(id: string): string {
  const found = BONUS_LANGUAGES.find((l) => l.id === id)
  if (found) return found.name
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

interface LanguageSelectorProps {
  currentLanguages: string[]
  /** Languages granted by the race — always shown as locked, not selectable */
  racialLanguages?: string[]
  /** How many additional languages the player may choose (default 1) */
  bonusLanguageCount?: number
  raceName?: string
  className?: string
  backgroundName?: string
  onChange: (languages: string[]) => void
}

export function LanguageSelector({
  currentLanguages,
  racialLanguages,
  bonusLanguageCount = 1,
  onChange,
}: LanguageSelectorProps) {
  // Normalise everything to lowercase ids
  const racialIds: string[] = (racialLanguages ?? ['common']).map((l) =>
    l.toLowerCase()
  )

  // Derive the initial bonus selections from currentLanguages (anything not in racialIds)
  const initialBonuses: (string | null)[] = (() => {
    const extras = currentLanguages.filter(
      (l) => !racialIds.includes(l.toLowerCase())
    )
    const slots: (string | null)[] = []
    for (let i = 0; i < bonusLanguageCount; i++) {
      slots.push(extras[i] ?? null)
    }
    return slots
  })()

  const [bonusSelections, setBonusSelections] = useState<(string | null)[]>(initialBonuses)

  const toggleBonus = (slotIndex: number, id: string) => {
    setBonusSelections((prev) => {
      const next = [...prev]
      next[slotIndex] = prev[slotIndex] === id ? null : id
      // Emit the full language list
      const chosen = next.filter(Boolean) as string[]
      onChange([...racialIds, ...chosen])
      return next
    })
  }

  // Languages already taken by another bonus slot (so they can't be double-picked)
  const takenByOtherSlots = (slotIndex: number) =>
    new Set(
      bonusSelections.filter((s, i) => i !== slotIndex && s !== null) as string[]
    )

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white mb-2">Languages</h2>
        <p className="text-gray-400 text-sm">
          Your racial languages are fixed.{' '}
          {bonusLanguageCount > 0 && (
            <>
              Choose{' '}
              <span className="text-dnd-gold font-medium">
                {bonusLanguageCount} additional language
                {bonusLanguageCount > 1 ? 's' : ''}
              </span>{' '}
              below.
            </>
          )}
        </p>
      </div>

      {/* Racial (locked) languages */}
      <div className="mb-4 flex flex-wrap gap-2">
        {racialIds.map((id) => (
          <div
            key={id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-green-700/50 bg-green-900/10"
          >
            <svg
              className="w-4 h-4 text-green-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-white text-sm">{langName(id)}</span>
            <span className="ml-1 text-xs px-1.5 py-0.5 bg-green-900/50 text-green-400 rounded">
              Racial
            </span>
          </div>
        ))}
      </div>

      {/* Bonus language pickers */}
      {bonusLanguageCount > 0 &&
        Array.from({ length: bonusLanguageCount }).map((_, slotIndex) => {
          const selected = bonusSelections[slotIndex]
          const taken = takenByOtherSlots(slotIndex)
          return (
            <div key={slotIndex} className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">
                  {bonusLanguageCount > 1
                    ? `Bonus language ${slotIndex + 1}:`
                    : 'Choose 1 additional language:'}
                </span>
                <span
                  className={`text-sm font-medium ${selected ? 'text-green-400' : 'text-dnd-gold'}`}
                >
                  {selected ? `✓ ${langName(selected)}` : 'None selected'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {BONUS_LANGUAGES.filter(
                  (lang) =>
                    // Hide languages already granted racially
                    !racialIds.includes(lang.id) &&
                    // Hide languages picked in another slot
                    !taken.has(lang.id)
                ).map((lang) => {
                  const isSelected = selected === lang.id
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => toggleBonus(slotIndex, lang.id)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-dnd-gold bg-dnd-gold/10 text-white'
                          : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-750'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{lang.name}</span>
                        {isSelected && (
                          <svg
                            className="w-4 h-4 text-dnd-gold flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
    </div>
  )
}
