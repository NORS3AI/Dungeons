import { useState, useEffect } from 'react'
import type { Character, Ability, AbilityScores } from '../types'

interface DMAbilityScoreEditorProps {
  character: Character
  isOpen: boolean
  onClose: () => void
  onSave: (scores: AbilityScores) => void
}

const ABILITY_NAMES: Record<Ability, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
}

export function DMAbilityScoreEditor({ character, isOpen, onClose, onSave }: DMAbilityScoreEditorProps) {
  const [scores, setScores] = useState<AbilityScores>(character.abilityScores)

  // Update scores when character changes
  useEffect(() => {
    setScores(character.abilityScores)
  }, [character.abilityScores])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleScoreChange = (ability: Ability, value: string) => {
    const numValue = parseInt(value) || 0
    // Clamp between 1 and 30
    const clampedValue = Math.max(1, Math.min(30, numValue))
    setScores((prev) => ({ ...prev, [ability]: clampedValue }))

    // Auto-save on change
    onSave({ ...scores, [ability]: clampedValue })
  }

  const calculateModifier = (score: number): number => {
    return Math.floor((score - 10) / 2)
  }

  const formatModifier = (mod: number): string => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800 rounded-xl border-2 border-dnd-gold shadow-2xl max-w-2xl w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-dnd-gold">⚙️ DM: Edit Ability Scores</h2>
              <p className="text-sm text-gray-400 mt-1">
                Editing {character.name}'s ability scores (auto-saves on change)
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Ability Scores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(ABILITY_NAMES) as Ability[]).map((ability) => {
              const score = scores[ability]
              const modifier = calculateModifier(score)
              return (
                <div
                  key={ability}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-700"
                >
                  <label className="block text-xs font-medium text-gray-400 uppercase mb-2">
                    {ABILITY_NAMES[ability]}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={score}
                      onChange={(e) => handleScoreChange(ability, e.target.value)}
                      className="w-20 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-center text-xl font-bold focus:border-dnd-gold focus:outline-none"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500">Modifier</span>
                      <span className={`text-lg font-bold ${modifier >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatModifier(modifier)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <span className="font-bold">💡 DM Note:</span> Changes are saved automatically as you type.
              Valid range: 1-30. Press ESC or click outside to close.
            </p>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
