import { useState } from 'react'
import type { Character, Spell } from '../types'
import {
  BARD_CANTRIPS,
  BARD_LEVEL_1_SPELLS,
  BARD_LEVEL_2_SPELLS,
  BARD_LEVEL_3_SPELLS,
  BARD_LEVEL_4_SPELLS,
  BARD_LEVEL_5_SPELLS,
  BARD_LEVEL_6_SPELLS,
  BARD_LEVEL_7_SPELLS,
  BARD_LEVEL_8_SPELLS,
  BARD_LEVEL_9_SPELLS,
  CLERIC_CANTRIPS,
  CLERIC_LEVEL_1_SPELLS,
  CLERIC_LEVEL_2_SPELLS,
  CLERIC_LEVEL_3_SPELLS,
  CLERIC_LEVEL_4_SPELLS,
  CLERIC_LEVEL_5_SPELLS,
  CLERIC_LEVEL_6_SPELLS,
  CLERIC_LEVEL_7_SPELLS,
  CLERIC_LEVEL_8_SPELLS,
  CLERIC_LEVEL_9_SPELLS,
  DRUID_CANTRIPS,
  DRUID_LEVEL_1_SPELLS,
  DRUID_LEVEL_2_SPELLS,
  DRUID_LEVEL_3_SPELLS,
  DRUID_LEVEL_4_SPELLS,
  DRUID_LEVEL_5_SPELLS,
  DRUID_LEVEL_6_SPELLS,
  DRUID_LEVEL_7_SPELLS,
  DRUID_LEVEL_8_SPELLS,
  DRUID_LEVEL_9_SPELLS,
  NECROMANCER_CANTRIPS,
  NECROMANCER_LEVEL_1_SPELLS,
  NECROMANCER_LEVEL_2_SPELLS,
  NECROMANCER_LEVEL_3_SPELLS,
  NECROMANCER_LEVEL_4_SPELLS,
  NECROMANCER_LEVEL_5_SPELLS,
  NECROMANCER_LEVEL_6_SPELLS,
  NECROMANCER_LEVEL_7_SPELLS,
  NECROMANCER_LEVEL_8_SPELLS,
  NECROMANCER_LEVEL_9_SPELLS,
  SORCERER_CANTRIPS,
  SORCERER_LEVEL_1_SPELLS,
  SORCERER_LEVEL_2_SPELLS,
  SORCERER_LEVEL_3_SPELLS,
  SORCERER_LEVEL_4_SPELLS,
  SORCERER_LEVEL_5_SPELLS,
  SORCERER_LEVEL_6_SPELLS,
  SORCERER_LEVEL_7_SPELLS,
  SORCERER_LEVEL_8_SPELLS,
  SORCERER_LEVEL_9_SPELLS,
  WARLOCK_CANTRIPS,
  WARLOCK_LEVEL_1_SPELLS,
  WARLOCK_LEVEL_2_SPELLS,
  WARLOCK_LEVEL_3_SPELLS,
  WARLOCK_LEVEL_4_SPELLS,
  WARLOCK_LEVEL_5_SPELLS,
  WARLOCK_LEVEL_6_SPELLS,
  WARLOCK_LEVEL_7_SPELLS,
  WARLOCK_LEVEL_8_SPELLS,
  WARLOCK_LEVEL_9_SPELLS,
  WIZARD_CANTRIPS,
  WIZARD_LEVEL_1_SPELLS,
  WIZARD_LEVEL_2_SPELLS,
  WIZARD_LEVEL_3_SPELLS,
  WIZARD_LEVEL_4_SPELLS,
  WIZARD_LEVEL_5_SPELLS,
  WIZARD_LEVEL_6_SPELLS,
  WIZARD_LEVEL_7_SPELLS,
  WIZARD_LEVEL_8_SPELLS,
  WIZARD_LEVEL_9_SPELLS,
} from '../data/spells'

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
  const className = characterClass.toLowerCase()

  // Bard progression (PHB 2024)
  if (className.includes('bard')) {
    const bardCantrips = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    const bardSpells = [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22]
    return {
      cantrips: bardCantrips[level - 1] || 0,
      spells: bardSpells[level - 1] || 0,
    }
  }

  // Cleric progression (PHB 2024) - prepares spells = level + WIS modifier
  if (className.includes('cleric')) {
    const clericCantrips = [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    return {
      cantrips: clericCantrips[level - 1] || 0,
      spells: 0, // Clerics prepare spells, not learn them
    }
  }

  // Druid progression (PHB 2024) - prepares spells = level + WIS modifier
  if (className.includes('druid')) {
    const druidCantrips = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    return {
      cantrips: druidCantrips[level - 1] || 0,
      spells: 0, // Druids prepare spells, not learn them
    }
  }

  // Sorcerer progression (PHB 2024)
  if (className.includes('sorcerer')) {
    const sorcererCantrips = [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
    const sorcererSpells = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
    return {
      cantrips: sorcererCantrips[level - 1] || 0,
      spells: sorcererSpells[level - 1] || 0,
    }
  }

  // Wizard progression (PHB 2024) - learns 2 spells per level
  if (className.includes('wizard')) {
    const wizardCantrips = [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    return {
      cantrips: wizardCantrips[level - 1] || 0,
      spells: level === 1 ? 6 : 2, // 6 at level 1, then 2 per level
    }
  }

  // Necromancer progression (PHB 2024) - same as Wizard
  if (className.includes('necromancer')) {
    const necromancerCantrips = [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    return {
      cantrips: necromancerCantrips[level - 1] || 0,
      spells: level === 1 ? 6 : 2, // 6 at level 1, then 2 per level
    }
  }

  // Warlock progression (PHB 2024)
  if (className.includes('warlock')) {
    const warlockCantrips = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    const warlockSpells = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
    return {
      cantrips: warlockCantrips[level - 1] || 0,
      spells: warlockSpells[level - 1] || 0,
    }
  }

  return { cantrips: 0, spells: 0 }
}

/**
 * Get available spell list for a class and level
 */
function getAvailableSpells(characterClass: string, level: number, includeCantrips: boolean): Spell[] {
  const className = characterClass.toLowerCase()
  const spells: Spell[] = []

  // Bard spells - full caster with standard progression
  if (className.includes('bard')) {
    if (includeCantrips) {
      spells.push(...BARD_CANTRIPS)
    }
    if (level >= 1) spells.push(...BARD_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...BARD_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...BARD_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...BARD_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...BARD_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...BARD_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...BARD_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...BARD_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...BARD_LEVEL_9_SPELLS)
    return spells
  }

  // Cleric spells - full caster with standard progression
  if (className.includes('cleric')) {
    if (includeCantrips) {
      spells.push(...CLERIC_CANTRIPS)
    }
    if (level >= 1) spells.push(...CLERIC_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...CLERIC_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...CLERIC_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...CLERIC_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...CLERIC_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...CLERIC_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...CLERIC_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...CLERIC_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...CLERIC_LEVEL_9_SPELLS)
    return spells
  }

  // Druid spells - full caster with standard progression
  if (className.includes('druid')) {
    if (includeCantrips) {
      spells.push(...DRUID_CANTRIPS)
    }
    if (level >= 1) spells.push(...DRUID_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...DRUID_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...DRUID_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...DRUID_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...DRUID_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...DRUID_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...DRUID_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...DRUID_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...DRUID_LEVEL_9_SPELLS)
    return spells
  }

  // Sorcerer spells - full caster with standard progression
  if (className.includes('sorcerer')) {
    if (includeCantrips) {
      spells.push(...SORCERER_CANTRIPS)
    }
    if (level >= 1) spells.push(...SORCERER_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...SORCERER_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...SORCERER_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...SORCERER_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...SORCERER_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...SORCERER_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...SORCERER_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...SORCERER_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...SORCERER_LEVEL_9_SPELLS)
    return spells
  }

  // Wizard spells - full caster with standard progression
  if (className.includes('wizard')) {
    if (includeCantrips) {
      spells.push(...WIZARD_CANTRIPS)
    }
    if (level >= 1) spells.push(...WIZARD_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...WIZARD_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...WIZARD_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...WIZARD_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...WIZARD_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...WIZARD_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...WIZARD_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...WIZARD_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...WIZARD_LEVEL_9_SPELLS)
    return spells
  }

  // Necromancer spells - full caster with standard progression (same as Wizard)
  if (className.includes('necromancer')) {
    if (includeCantrips) {
      spells.push(...NECROMANCER_CANTRIPS)
    }
    if (level >= 1) spells.push(...NECROMANCER_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...NECROMANCER_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...NECROMANCER_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...NECROMANCER_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...NECROMANCER_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...NECROMANCER_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...NECROMANCER_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...NECROMANCER_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...NECROMANCER_LEVEL_9_SPELLS)
    return spells
  }

  // Warlock spells - pact magic with standard progression
  if (className.includes('warlock')) {
    if (includeCantrips) {
      spells.push(...WARLOCK_CANTRIPS)
    }
    if (level >= 1) spells.push(...WARLOCK_LEVEL_1_SPELLS)
    if (level >= 3) spells.push(...WARLOCK_LEVEL_2_SPELLS)
    if (level >= 5) spells.push(...WARLOCK_LEVEL_3_SPELLS)
    if (level >= 7) spells.push(...WARLOCK_LEVEL_4_SPELLS)
    if (level >= 9) spells.push(...WARLOCK_LEVEL_5_SPELLS)
    if (level >= 11) spells.push(...WARLOCK_LEVEL_6_SPELLS)
    if (level >= 13) spells.push(...WARLOCK_LEVEL_7_SPELLS)
    if (level >= 15) spells.push(...WARLOCK_LEVEL_8_SPELLS)
    if (level >= 17) spells.push(...WARLOCK_LEVEL_9_SPELLS)
    return spells
  }

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
