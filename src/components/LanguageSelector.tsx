import { useState, useEffect } from 'react'
import {
  STANDARD_LANGUAGES,
  EXOTIC_LANGUAGES,
  SECRET_LANGUAGES,
  getSuggestedLanguages,
  getGrantedLanguages,
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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    currentLanguages.length > 0 ? currentLanguages : ['common'],
  )

  // Languages unconditionally granted by race/class (auto-selected, cannot be removed)
  const grantedLanguages = getGrantedLanguages({ raceName, className })

  // Free-choice suggestion hints (excluding grants — those are already locked in)
  const suggestions = getSuggestedLanguages({ raceName, className, backgroundName }).filter(
    (id) => !grantedLanguages.includes(id),
  )

  // Total max: Common (1) + 1 free choice = 2 always.
  // Class secret languages (Druidic, Thieves' Cant) consume the free slot.
  const effectiveMax = 2

  // Whenever race or class changes, rebuild selection:
  // keep Common + grants as the locked base, preserve up to 1 prior manual choice.
  useEffect(() => {
    const grants = getGrantedLanguages({ raceName, className })
    const max = 2
    setSelectedLanguages((prev: string[]) => {
      const base = ['common', ...grants.filter((id: string) => id !== 'common')]
      const freeSlots = max - base.length // always 1
      const prevManual = prev.filter((id: string) => !base.includes(id))
      const kept = prevManual.slice(0, freeSlots)
      const next = [...base, ...kept]
      // Avoid a re-render when nothing actually changed
      if (
        next.length === prev.length &&
        next.every((id: string, i: number) => id === prev[i])
      ) {
        return prev
      }
      return next
    })
  }, [raceName, className])

  // Propagate changes to parent
  useEffect(() => {
    onChange(selectedLanguages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguages])

  const isNonRemovable = (id: string) =>
    id === 'common' || grantedLanguages.includes(id)

  const toggleLanguage = (languageId: string) => {
    if (isNonRemovable(languageId)) return

    if (selectedLanguages.includes(languageId)) {
      setSelectedLanguages(selectedLanguages.filter((id: string) => id !== languageId))
    } else {
      if (selectedLanguages.length >= effectiveMax) return
      setSelectedLanguages([...selectedLanguages, languageId])
    }
  }

  const renderLanguageGroup = (title: string, languages: Language[]) => {
    const isAtLimit = selectedLanguages.length >= effectiveMax

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dnd-gold mb-3">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = selectedLanguages.includes(lang.id)
            const isGranted = isNonRemovable(lang.id)
            const isCommon = lang.id === 'common'
            const isSuggested = suggestions.includes(lang.id)
            const isDisabled = isGranted || (isAtLimit && !isSelected)

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => toggleLanguage(lang.id)}
                disabled={isDisabled}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-dnd-gold bg-dnd-gold/10'
                    : isSuggested
                      ? 'border-blue-500/50 bg-blue-900/20 hover:bg-blue-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{lang.name}</span>
                      {isCommon && (
                        <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
                          Always
                        </span>
                      )}
                      {!isCommon && isGranted && (
                        <span className="text-xs px-2 py-0.5 bg-orange-900/50 text-orange-400 rounded">
                          Granted
                        </span>
                      )}
                      {isSuggested && (
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
                  {isGranted && (
                    /* Lock icon for non-removable languages */
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${isCommon ? 'text-green-400' : 'text-orange-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {isSelected && !isGranted && (
                    /* Check icon for freely chosen languages */
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

  const freeChoiceCount = selectedLanguages.filter((id: string) => !isNonRemovable(id)).length
  const hasFreeChoice = freeChoiceCount > 0

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Languages</h2>
        <p className="text-gray-400 text-sm">
          All characters speak <span className="text-green-400 font-medium">Common</span>.
          Choose <span className="text-dnd-gold font-medium">1 additional language</span> of your choice.
          Your racial language is{' '}
          <span className="text-blue-400 font-medium">suggested</span> but you can pick any language you like.
        </p>
        {grantedLanguages.length > 0 && (
          <p className="text-orange-400 text-sm mt-1">
            Granted by your class:{' '}
            {grantedLanguages
              .map((id) => getLanguageById(id)?.name)
              .filter(Boolean)
              .join(', ')}
          </p>
        )}
        {suggestions.length > 0 && (
          <p className="text-blue-400 text-sm mt-1">
            Suggested for your character:{' '}
            {suggestions
              .map((id) => getLanguageById(id)?.name)
              .filter(Boolean)
              .join(', ')}
          </p>
        )}
      </div>

      {/* Status bar */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Languages known:</span>
          <span className={`font-medium ${hasFreeChoice ? 'text-green-400' : 'text-dnd-gold'}`}>
            {selectedLanguages.length} / {effectiveMax}
            {hasFreeChoice
              ? ' ✓'
              : <span className="ml-2 text-xs text-blue-400">(choose 1 more)</span>}
          </span>
        </div>
        {selectedLanguages.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedLanguages.map((id: string) => {
              const lang = getLanguageById(id)
              if (!lang) return null
              return (
                <span
                  key={id}
                  className={`text-xs px-2 py-1 rounded ${
                    isNonRemovable(id)
                      ? 'bg-orange-900/30 text-orange-300'
                      : 'bg-dnd-gold/20 text-dnd-gold'
                  }`}
                >
                  {lang.name}
                  {isNonRemovable(id) && ' 🔒'}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {renderLanguageGroup('Standard Languages', STANDARD_LANGUAGES)}
      {renderLanguageGroup('Exotic Languages', EXOTIC_LANGUAGES)}
      {/* Filter secret languages to only show relevant ones */}
      {(() => {
        const filteredSecretLanguages = SECRET_LANGUAGES.filter((lang) => {
          if (lang.id === 'druidic') return className?.toLowerCase().includes('druid')
          if (lang.id === 'thieves-cant') return className?.toLowerCase().includes('rogue')
          return true
        })
        return filteredSecretLanguages.length > 0
          ? renderLanguageGroup('Secret Languages', filteredSecretLanguages)
          : null
      })()}
    </div>
  )
}
