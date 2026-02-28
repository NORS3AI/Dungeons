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

interface LanguageSelectorProps {
  currentLanguages: string[]
  raceName?: string
  className?: string
  backgroundName?: string
  onChange: (languages: string[]) => void
}

export function LanguageSelector({ currentLanguages, onChange }: LanguageSelectorProps) {
  // Determine bonus language from currentLanguages (anything that isn't 'common')
  const initialBonus =
    currentLanguages.find((l) => l.toLowerCase() !== 'common') ?? null

  const [bonusLanguage, setBonusLanguage] = useState<string | null>(initialBonus)

  const selectBonus = (id: string) => {
    const next = bonusLanguage === id ? null : id
    setBonusLanguage(next)
    onChange(next ? ['common', next] : ['common'])
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white mb-2">Languages</h2>
        <p className="text-gray-400 text-sm">
          All characters speak{' '}
          <span className="text-green-400 font-medium">Common</span>.
          Choose <span className="text-dnd-gold font-medium">1 additional language</span> below.
        </p>
      </div>

      {/* Common — always known */}
      <div className="mb-4 flex items-center gap-3 p-3 rounded-lg border border-green-700/50 bg-green-900/10">
        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium text-white">Common</span>
        <span className="ml-auto text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
          Always Known
        </span>
      </div>

      {/* Bonus language picker */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Choose 1 additional language:</span>
          <span
            className={`text-sm font-medium ${bonusLanguage ? 'text-green-400' : 'text-dnd-gold'}`}
          >
            {bonusLanguage
              ? `✓ ${BONUS_LANGUAGES.find((l) => l.id === bonusLanguage)?.name}`
              : 'None selected'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {BONUS_LANGUAGES.map((lang) => {
            const isSelected = bonusLanguage === lang.id
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => selectBonus(lang.id)}
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
    </div>
  )
}
