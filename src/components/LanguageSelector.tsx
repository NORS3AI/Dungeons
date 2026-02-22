import { useState, useEffect } from 'react'
import {
  STANDARD_LANGUAGES,
  EXOTIC_LANGUAGES,
  SECRET_LANGUAGES,
  getSuggestedLanguages,
  getLanguageById,
  type Language,
} from '../data/languages'

interface LanguageSelectorProps {
  currentLanguages: string[]
  raceName?: string
  className?: string
  backgroundName?: string
  onChange: (languages: string[]) => void
}

export function LanguageSelector({
  currentLanguages,
  raceName,
  className,
  backgroundName,
  onChange,
}: LanguageSelectorProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(currentLanguages)

  // Get suggested languages based on character
  const suggestions = getSuggestedLanguages({
    raceName,
    className,
    backgroundName,
  })

  // Update parent when languages change
  useEffect(() => {
    onChange(selectedLanguages)
  }, [selectedLanguages, onChange])

  const toggleLanguage = (languageId: string) => {
    // Cannot remove Common
    if (languageId === 'common') return

    if (selectedLanguages.includes(languageId)) {
      setSelectedLanguages(selectedLanguages.filter((id) => id !== languageId))
    } else {
      setSelectedLanguages([...selectedLanguages, languageId])
    }
  }

  const renderLanguageGroup = (title: string, languages: Language[]) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dnd-gold mb-3">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = selectedLanguages.includes(lang.id)
            const isSuggested = suggestions.includes(lang.id)
            const isCommon = lang.id === 'common'

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => toggleLanguage(lang.id)}
                disabled={isCommon}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-dnd-gold bg-dnd-gold/10'
                    : isSuggested
                      ? 'border-blue-500/50 bg-blue-900/20 hover:bg-blue-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                } ${isCommon ? 'opacity-100 cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{lang.name}</span>
                      {isCommon && (
                        <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
                          Default
                        </span>
                      )}
                      {isSuggested && !isCommon && (
                        <span className="text-xs px-2 py-0.5 bg-blue-900/50 text-blue-400 rounded">
                          Suggested
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {lang.script && `Script: ${lang.script} • `}
                      {lang.speakers.join(', ')}
                    </div>
                  </div>
                  {isSelected && !isCommon && (
                    <svg
                      className="w-5 h-5 text-dnd-gold flex-shrink-0"
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
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Languages</h2>
        <p className="text-gray-400 text-sm">
          Select the languages your character knows. All characters speak Common by default.
          {suggestions.length > 0 && (
            <span className="block mt-1 text-blue-400">
              Based on your race, class, and background, we recommend: {suggestions.map((id) => getLanguageById(id)?.name).filter(Boolean).join(', ')}
            </span>
          )}
        </p>
      </div>

      {/* Selected Count */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="text-sm">
          <span className="text-gray-400">Selected Languages:</span>{' '}
          <span className="text-dnd-gold font-medium">{selectedLanguages.length}</span>
        </div>
        {selectedLanguages.length > 1 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedLanguages.map((id) => {
              const lang = getLanguageById(id)
              if (!lang) return null
              return (
                <span
                  key={id}
                  className="text-xs px-2 py-1 bg-dnd-gold/20 text-dnd-gold rounded"
                >
                  {lang.name}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {renderLanguageGroup('Standard Languages', STANDARD_LANGUAGES)}
      {renderLanguageGroup('Exotic Languages', EXOTIC_LANGUAGES)}
      {renderLanguageGroup('Secret Languages', SECRET_LANGUAGES)}
    </div>
  )
}
