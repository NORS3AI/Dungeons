import { useState } from 'react'
import type { Character, Spell } from '../types'
import { WARLOCK_CANTRIPS, WARLOCK_LEVEL_1_SPELLS } from '../data/spells/warlock'

interface LevelUpSpellSelectorProps {
  character: Character
  newLevel: number
  onAddSpells: (spells: Spell[]) => void
  onClose: () => void
}

/**
 * Get the number of spells/cantrips a character should know at a given level
 */
function getSpellsKnown(characterClass: string, level: number): { cantrips: number; spells: number } {
  // Warlock progression (PHB 2024)
  const warlockCantrips = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
  const warlockSpells = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]

  if (characterClass.toLowerCase().includes('warlock')) {
    return {
      cantrips: warlockCantrips[level - 1] || 0,
      spells: warlockSpells[level - 1] || 0,
    }
  }

  // TODO: Add other spellcaster classes
  return { cantrips: 0, spells: 0 }
}

/**
 * Get available spell list for a class and level
 */
function getAvailableSpells(characterClass: string, level: number, includeCantrips: boolean): Spell[] {
  const className = characterClass.toLowerCase()

  if (className.includes('warlock')) {
    const spells: Spell[] = []

    if (includeCantrips) {
      spells.push(...WARLOCK_CANTRIPS)
    }

    // Add spells up to the highest level they can cast
    // For now, only level 1 spells are available
    if (level >= 1) spells.push(...WARLOCK_LEVEL_1_SPELLS)
    // TODO: Add level 2+ spells when available

    return spells
  }

  // TODO: Add other classes
  return []
}

export function LevelUpSpellSelector({ character, newLevel, onAddSpells, onClose }: LevelUpSpellSelectorProps) {
  const previousLevel = newLevel - 1
  const className = character.class?.name || ''

  const previousKnown = getSpellsKnown(className, previousLevel)
  const newKnown = getSpellsKnown(className, newLevel)

  const cantripsToGain = Math.max(0, newKnown.cantrips - previousKnown.cantrips)
  const spellsToGain = Math.max(0, newKnown.spells - previousKnown.spells)

  const currentCantrips = character.knownSpells.filter(s => s.level === 0)
  const currentSpells = character.knownSpells.filter(s => s.level > 0)

  const [selectedCantrips, setSelectedCantrips] = useState<Spell[]>([])
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([])

  const availableCantrips = getAvailableSpells(className, newLevel, true).filter(s => s.level === 0)
  const availableSpells = getAvailableSpells(className, newLevel, false).filter(s => s.level > 0)

  const handleToggleCantrip = (spell: Spell) => {
    if (selectedCantrips.find(s => s.id === spell.id)) {
      setSelectedCantrips(selectedCantrips.filter(s => s.id !== spell.id))
    } else if (selectedCantrips.length < cantripsToGain) {
      setSelectedCantrips([...selectedCantrips, spell])
    }
  }

  const handleToggleSpell = (spell: Spell) => {
    if (selectedSpells.find(s => s.id === spell.id)) {
      setSelectedSpells(selectedSpells.filter(s => s.id !== spell.id))
    } else if (selectedSpells.length < spellsToGain) {
      setSelectedSpells([...selectedSpells, spell])
    }
  }

  const handleSave = () => {
    onAddSpells([...selectedCantrips, ...selectedSpells])
    onClose()
  }

  const canSave = selectedCantrips.length === cantripsToGain && selectedSpells.length === spellsToGain

  // If no spells to gain, auto-close
  if (cantripsToGain === 0 && spellsToGain === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-900 border-2 border-dnd-gold rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white">Level {newLevel} - Select New Spells</h2>
          <p className="text-blue-100 mt-2">
            You've reached level {newLevel}! Choose your new spells.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current spells summary */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-dnd-gold mb-2">Current Knowledge</h3>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-gray-400">Cantrips: </span>
                <span className="text-white font-medium">{currentCantrips.length}</span>
              </div>
              <div>
                <span className="text-gray-400">Spells: </span>
                <span className="text-white font-medium">{currentSpells.length}</span>
              </div>
            </div>
          </div>

          {/* Cantrips Selection */}
          {cantripsToGain > 0 && (
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">
                Select {cantripsToGain} New Cantrip{cantripsToGain > 1 ? 's' : ''}
                <span className="text-sm text-gray-400 ml-2">
                  ({selectedCantrips.length}/{cantripsToGain})
                </span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {availableCantrips
                  .filter(spell => !currentCantrips.find(s => s.id === spell.id))
                  .map(spell => {
                    const isSelected = !!selectedCantrips.find(s => s.id === spell.id)
                    return (
                      <button
                        key={spell.id}
                        onClick={() => handleToggleCantrip(spell)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-900/30'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-white">{spell.name}</div>
                        <div className="text-sm text-gray-400 mt-1">{spell.description}</div>
                      </button>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Spells Selection */}
          {spellsToGain > 0 && (
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">
                Select {spellsToGain} New Spell{spellsToGain > 1 ? 's' : ''}
                <span className="text-sm text-gray-400 ml-2">
                  ({selectedSpells.length}/{spellsToGain})
                </span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {availableSpells
                  .filter(spell => !currentSpells.find(s => s.id === spell.id))
                  .map(spell => {
                    const isSelected = !!selectedSpells.find(s => s.id === spell.id)
                    return (
                      <button
                        key={spell.id}
                        onClick={() => handleToggleSpell(spell)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-purple-500 bg-purple-900/30'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-white">{spell.name}</div>
                          <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">
                            Level {spell.level}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">{spell.description}</div>
                      </button>
                    )
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 bg-gray-800/50">
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="flex-1 px-6 py-3 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canSave ? 'Confirm Selection' : `Select ${cantripsToGain + spellsToGain - selectedCantrips.length - selectedSpells.length} More`}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
