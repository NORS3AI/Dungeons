import { useState, useEffect, useMemo } from 'react'
import type { Race } from '../types'
import { ALL_RACES, RACE_CATEGORIES, getRacesByCategory } from '../data/races'
import { RaceCard } from './RaceCard'
import { RaceDetailModal } from './RaceDetailModal'
import { QuickRefTooltip } from './QuickRefTooltip'
import { ScrollNavigation } from './ScrollNavigation'

type CategoryKey = keyof typeof RACE_CATEGORIES

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
 * Displays available races as cards with category filtering and subrace support
 */
export function RaceSelector({ initialRace, onSelect, onBack }: RaceSelectorProps) {
  const [selectedRace, setSelectedRace] = useState<Race | null>(initialRace || null)
  const [selectedSubrace, setSelectedSubrace] = useState<Race | null>(null)
  const [modalRace, setModalRace] = useState<Race | null>(null)
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get the effective race (subrace if selected, otherwise main race)
  const effectiveRace = selectedSubrace || selectedRace

  // Filter races based on category and search
  const filteredRaces = useMemo(() => {
    let races = activeCategory === 'all' ? ALL_RACES : getRacesByCategory(activeCategory)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      races = races.filter(
        (race) =>
          race.name.toLowerCase().includes(query) ||
          race.description.toLowerCase().includes(query)
      )
    }

    return races
  }, [activeCategory, searchQuery])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_RACES.length }
    for (const key of Object.keys(RACE_CATEGORIES)) {
      counts[key] = getRacesByCategory(key).length
    }
    return counts
  }, [])

  // Focus management for accessibility
  useEffect(() => {
    // Could focus on first card here if needed
  }, [])

  // Reset subrace when main race changes
  useEffect(() => {
    setSelectedSubrace(null)
  }, [selectedRace?.id])

  const handleReadMore = (race: Race) => {
    setModalRace(race)
  }

  const handleCloseModal = () => {
    setModalRace(null)
  }

  const handleRaceSelect = (race: Race) => {
    setSelectedRace(race)
    setSelectedSubrace(null)
  }

  const handleSubraceSelect = (subrace: Race) => {
    setSelectedSubrace(subrace)
  }

  const handleSubmit = () => {
    if (effectiveRace) {
      onSelect(effectiveRace)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Race</h2>
        <p className="text-gray-400">
          Select a race for your character. Each race provides unique traits, abilities, and bonuses.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search races..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                   text-white placeholder-gray-500 focus:outline-none focus:ring-2
                   focus:ring-dnd-gold focus:border-transparent"
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-dnd-gold text-gray-900'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All ({categoryCounts.all})
        </button>
        {(Object.entries(RACE_CATEGORIES) as [CategoryKey, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === key
                ? 'bg-dnd-gold text-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {label} ({categoryCounts[key]})
          </button>
        ))}
      </div>

      {/* Race Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredRaces.map((race) => (
          <RaceCard
            key={race.id}
            race={race}
            isSelected={selectedRace?.id === race.id}
            onSelect={handleRaceSelect}
            onReadMore={handleReadMore}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredRaces.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No races found matching your search.
        </div>
      )}

      {/* Subrace Selection */}
      {selectedRace?.subraces && selectedRace.subraces.length > 0 && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-dnd-gold/30">
          <h3 className="text-xl font-bold text-dnd-gold mb-4">
            Choose {selectedRace.name} Subrace
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedRace.subraces.map((subrace) => (
              <div
                key={subrace.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSubrace?.id === subrace.id
                    ? 'border-dnd-gold bg-gray-700'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <button
                  onClick={() => handleSubraceSelect(subrace)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    {subrace.icon && (
                      <span className="text-2xl">{subrace.icon}</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white">{subrace.name}</div>
                      <div className="text-sm text-gray-400 line-clamp-2">
                        {subrace.description}
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleReadMore(subrace)
                  }}
                  className="mt-2 text-xs text-dnd-gold hover:text-yellow-400 transition-colors"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Race Details */}
      {effectiveRace && (
        <div className="mb-6 p-6 bg-gray-800 rounded-xl border border-dnd-gold/30">
          <div className="flex items-center gap-3 mb-4">
            {effectiveRace.icon && (
              <span className="text-4xl">{effectiveRace.icon}</span>
            )}
            <h3 className="text-2xl font-bold text-dnd-gold">{effectiveRace.name} Traits</h3>
          </div>

          {/* Ability Score Increases */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Ability Score Increases
              <span className="text-xs font-normal text-gray-500 ml-2">(click ability names to learn more)</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(effectiveRace.abilityBonuses)
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
              {Object.keys(effectiveRace.abilityBonuses).length === 0 && (
                <span className="text-gray-400">Choose ability scores (flexible)</span>
              )}
            </div>
          </div>

          {/* Racial Traits */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Racial Traits
              <span className="text-xs font-normal text-gray-500 ml-2">(click trait names for details)</span>
            </h4>
            <div className="space-y-3">
              {effectiveRace.traits.map((trait) => (
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
          {effectiveRace.spells && effectiveRace.spells.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Innate Spellcasting
                <span className="text-xs font-normal text-gray-500 ml-2">(click spell names for details)</span>
              </h4>
              <div className="space-y-2">
                {effectiveRace.spells.map((spell) => (
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
          {effectiveRace.weaponProficiencies && effectiveRace.weaponProficiencies.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Weapon Proficiencies
                <span className="text-xs font-normal text-gray-500 ml-2">(click for weapon stats)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {effectiveRace.weaponProficiencies.map((weapon) => (
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
          {effectiveRace.damageResistances && effectiveRace.damageResistances.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Damage Resistances
              </h4>
              <div className="flex flex-wrap gap-2">
                {effectiveRace.damageResistances.map((resistance) => (
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

          {/* Movement Speeds */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Size</div>
              <div className="text-white font-medium capitalize">{effectiveRace.size}</div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Speed</div>
              <div className="text-white font-medium">{effectiveRace.speed} ft.</div>
            </div>
            {effectiveRace.flySpeed && (
              <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                <div className="text-xs text-blue-400 uppercase">Fly</div>
                <div className="text-white font-medium">{effectiveRace.flySpeed} ft.</div>
              </div>
            )}
            {effectiveRace.swimSpeed && (
              <div className="text-center p-3 bg-cyan-900/30 rounded-lg">
                <div className="text-xs text-cyan-400 uppercase">Swim</div>
                <div className="text-white font-medium">{effectiveRace.swimSpeed} ft.</div>
              </div>
            )}
            {effectiveRace.climbSpeed && (
              <div className="text-center p-3 bg-green-900/30 rounded-lg">
                <div className="text-xs text-green-400 uppercase">Climb</div>
                <div className="text-white font-medium">{effectiveRace.climbSpeed} ft.</div>
              </div>
            )}
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Vision</div>
              <div className="text-white font-medium">
                {effectiveRace.visionRange ? `${effectiveRace.visionRange} ft.` : 'Normal'}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Languages</div>
              <div className="text-white font-medium">{effectiveRace.languages.length}</div>
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
          disabled={!effectiveRace}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       effectiveRace
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

      {/* Scroll Navigation */}
      <ScrollNavigation />
    </div>
  )
}
