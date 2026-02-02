import { useState, useEffect } from 'react'
import type { Race } from '../types'
import { DROW, TIEFLING, HUMAN, HALF_ELF, DWARF } from '../types'
import { RaceCard } from './RaceCard'
import { RaceDetailModal } from './RaceDetailModal'
import { QuickRefTooltip } from './QuickRefTooltip'

// Available races for selection
const AVAILABLE_RACES: Race[] = [HUMAN, DWARF, HALF_ELF, DROW, TIEFLING]

interface RaceSelectorProps {
  initialRace?: Race | null
  onSelect: (race: Race) => void
  onBack: () => void
}

/**
 * Format ability bonus for detailed display
 */
function formatAbilityName(key: string): string {
  const names: Record<string, string> = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  }
  return names[key] || key
}

/**
 * Race Selector Component
 * Displays available races as cards and shows detailed traits when selected
 */
export function RaceSelector({ initialRace, onSelect, onBack }: RaceSelectorProps) {
  const [selectedRace, setSelectedRace] = useState<Race | null>(initialRace || null)
  const [modalRace, setModalRace] = useState<Race | null>(null)

  // Focus management for accessibility
  useEffect(() => {
    // Could focus on first card here if needed
  }, [])

  const handleReadMore = (race: Race) => {
    setModalRace(race)
  }

  const handleCloseModal = () => {
    setModalRace(null)
  }

  const handleRaceSelect = (race: Race) => {
    setSelectedRace(race)
  }

  const handleSubmit = () => {
    if (selectedRace) {
      onSelect(selectedRace)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Race</h2>
        <p className="text-gray-400">
          Select a race for your character. Each race provides unique traits, abilities, and bonuses.
        </p>
      </div>

      {/* Race Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {AVAILABLE_RACES.map((race) => (
          <RaceCard
            key={race.id}
            race={race}
            isSelected={selectedRace?.id === race.id}
            onSelect={handleRaceSelect}
            onReadMore={handleReadMore}
          />
        ))}
      </div>

      {/* Coming Soon Note */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 text-center">
          More races coming soon: Elf, Halfling, Half-Orc, Dragonborn, Gnome
        </p>
      </div>

      {/* Selected Race Details */}
      {selectedRace && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-dnd-gold/30">
          <h3 className="text-2xl font-bold text-dnd-gold mb-4">{selectedRace.name} Traits</h3>

          {/* Ability Score Increases */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Ability Score Increases
              <span className="text-xs font-normal text-gray-500 ml-2">(click ability names to learn more)</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(selectedRace.abilityBonuses)
                .filter(([, value]) => value !== undefined && value !== 0)
                .map(([ability, bonus]) => (
                  <div
                    key={ability}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg"
                  >
                    <QuickRefTooltip type="ability" id={ability}>
                      <span className="font-medium">{formatAbilityName(ability)}</span>
                    </QuickRefTooltip>
                    <span className="text-dnd-gold font-bold">+{bonus}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Racial Traits */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Racial Traits
              <span className="text-xs font-normal text-gray-500 ml-2">(click trait names for details)</span>
            </h4>
            <div className="space-y-3">
              {selectedRace.traits.map((trait) => (
                <div key={trait.id} className="p-4 bg-gray-700/30 rounded-lg">
                  <h5 className="mb-1">
                    <QuickRefTooltip type="trait" id={trait.id}>
                      <span className="font-semibold">{trait.name}</span>
                    </QuickRefTooltip>
                  </h5>
                  <p className="text-gray-300 text-sm">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Racial Spells */}
          {selectedRace.spells && selectedRace.spells.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Innate Spellcasting
                <span className="text-xs font-normal text-gray-500 ml-2">(click spell names for details)</span>
              </h4>
              <div className="space-y-2">
                {selectedRace.spells.map((spell) => (
                  <div
                    key={spell.spellId}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <QuickRefTooltip type="spell" id={spell.spellId}>
                        <span className="font-medium">{spell.spellName}</span>
                      </QuickRefTooltip>
                      <span className="text-gray-400 text-sm">
                        (Level {spell.levelGained}+)
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {spell.usesPerDay === 'atwill' ? 'At will' : `${spell.usesPerDay}/day`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proficiencies */}
          {selectedRace.weaponProficiencies && selectedRace.weaponProficiencies.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Weapon Proficiencies
                <span className="text-xs font-normal text-gray-500 ml-2">(click for weapon stats)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRace.weaponProficiencies.map((weapon) => (
                  <QuickRefTooltip key={weapon} type="weapon" id={weapon}>
                    <span className="px-3 py-1 bg-gray-700 text-sm rounded-full capitalize">
                      {weapon.replace('-', ' ')}
                    </span>
                  </QuickRefTooltip>
                ))}
              </div>
            </div>
          )}

          {/* Damage Resistances */}
          {selectedRace.damageResistances && selectedRace.damageResistances.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Damage Resistances
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRace.damageResistances.map((resistance) => (
                  <span
                    key={resistance}
                    className="px-3 py-1 bg-red-900/30 text-red-400 text-sm rounded-full capitalize"
                  >
                    {resistance}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Other Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Size</div>
              <div className="text-white font-medium capitalize">{selectedRace.size}</div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Speed</div>
              <div className="text-white font-medium">{selectedRace.speed} ft.</div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Vision</div>
              <div className="text-white font-medium">
                {selectedRace.visionRange ? `${selectedRace.visionRange} ft.` : 'Normal'}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Languages</div>
              <div className="text-white font-medium">{selectedRace.languages.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-700">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                   hover:border-gray-500 rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-dnd-gold"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedRace}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       selectedRace
                         ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                         : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                     }`}
        >
          Next: Choose Class
        </button>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="text-dnd-gold font-medium">New to D&D?</span>{' '}
          Click on any <span className="text-purple-400">highlighted text</span> to learn what it means!
          Abilities, traits, spells, and weapons all have detailed explanations.
          Click <span className="text-dnd-gold">Read More</span> on any race card for full lore and details.
        </p>
      </div>

      {/* Race Detail Modal */}
      {modalRace && (
        <RaceDetailModal
          race={modalRace}
          isOpen={!!modalRace}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
