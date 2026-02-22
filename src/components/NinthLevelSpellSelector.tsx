import { useState } from 'react'
import { SPELLS, type SpellRef } from '../data/quickReference'
import type { Spell } from '../types'
import { convertSpellRefToSpell } from '../utils/spellConverter'

interface NinthLevelSpellSelectorProps {
  onSelectSpell: (spell: Spell) => void
  onClose: () => void
}

/**
 * Modal for selecting a 9th level spell from loot
 * When a player finds a 9th level spell scroll, they can choose any 9th level spell
 */
export function NinthLevelSpellSelector({ onSelectSpell, onClose }: NinthLevelSpellSelectorProps) {
  const [selectedSpellId, setSelectedSpellId] = useState<string | null>(null)

  // Get all 9th level spells
  const ninthLevelSpells = Object.values(SPELLS).filter(
    (spell): spell is SpellRef => spell.level === 9
  ).sort((a, b) => a.name.localeCompare(b.name))

  const handleConfirm = () => {
    if (!selectedSpellId) return

    const spellRef = SPELLS[selectedSpellId]
    if (!spellRef) return

    // Convert SpellRef to Spell type
    const spell = convertSpellRefToSpell(spellRef)

    onSelectSpell(spell)
    onClose()
  }

  const selectedSpell = selectedSpellId ? SPELLS[selectedSpellId] : null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-purple-600 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 border-b border-purple-600">
          <h2 className="text-3xl font-bold text-white mb-2">
            ✨ 9th Level Spell Scroll Found!
          </h2>
          <p className="text-purple-200">
            You have discovered a legendary spell scroll! Choose one 9th level spell to permanently add to your character.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6 p-6 max-h-[calc(90vh-200px)]">
          {/* Spell List */}
          <div className="overflow-auto pr-2">
            <h3 className="text-xl font-semibold text-purple-400 mb-4 sticky top-0 bg-gray-900 py-2 z-10">
              Available Spells ({ninthLevelSpells.length})
            </h3>
            <div className="space-y-2">
              {ninthLevelSpells.map((spell) => (
                <button
                  key={spell.id}
                  onClick={() => setSelectedSpellId(spell.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedSpellId === spell.id
                      ? 'bg-purple-900/50 border-purple-500 shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800 border-gray-700 hover:border-purple-600 hover:bg-gray-750'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-white text-lg">{spell.name}</div>
                      <div className="text-sm text-purple-400 mt-1">{spell.school}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {spell.castingTime} • {spell.range}
                      </div>
                    </div>
                    {selectedSpellId === spell.id && (
                      <div className="text-purple-400 text-2xl">✓</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Spell Details */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 overflow-auto">
            {selectedSpell ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-purple-300">{selectedSpell.name}</h3>
                  <div className="text-sm text-purple-400 mt-1">
                    Level 9 {selectedSpell.school}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Casting Time</div>
                    <div className="text-white">{selectedSpell.castingTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Range</div>
                    <div className="text-white">{selectedSpell.range}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Components</div>
                    <div className="text-white">{selectedSpell.components}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Duration</div>
                    <div className="text-white">{selectedSpell.duration}</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 text-sm mb-2">Description</div>
                  <div className="text-white text-sm leading-relaxed">
                    {selectedSpell.description}
                  </div>
                </div>

                {selectedSpell.higherLevels && (
                  <div className="border-t border-gray-700 pt-4">
                    <div className="text-gray-400 text-sm mb-2">At Higher Levels</div>
                    <div className="text-white text-sm leading-relaxed">
                      {selectedSpell.higherLevels}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 text-sm mb-2">Available To</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpell.classes.map((className) => (
                      <span
                        key={className}
                        className="px-2 py-1 bg-blue-900/30 border border-blue-700/50 rounded text-xs text-blue-300"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📜</div>
                <div className="text-lg">Select a spell to view details</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 border-t border-gray-700 p-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {selectedSpell ? (
              <span className="text-purple-400">
                Selected: <strong>{selectedSpell.name}</strong>
              </span>
            ) : (
              'Choose a spell from the list'
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedSpellId}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
            >
              ✨ Learn Spell Forever
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
