import type { Race } from '../types'

interface RaceCardProps {
  race: Race
  isSelected: boolean
  onSelect: (race: Race) => void
}

/**
 * Format ability bonuses for display
 */
function formatAbilityBonuses(bonuses: Race['abilityBonuses']): string[] {
  const abilityNames: Record<string, string> = {
    strength: 'STR',
    dexterity: 'DEX',
    constitution: 'CON',
    intelligence: 'INT',
    wisdom: 'WIS',
    charisma: 'CHA',
  }

  return Object.entries(bonuses)
    .filter(([, value]) => value !== undefined && value !== 0)
    .map(([key, value]) => `+${value} ${abilityNames[key] || key}`)
}

/**
 * Get vision description
 */
function getVisionDescription(vision: Race['vision'], range?: number): string {
  const visionNames: Record<string, string> = {
    normal: 'Normal Vision',
    darkvision: 'Darkvision',
    superiorDarkvision: 'Superior Darkvision',
    blindsight: 'Blindsight',
    truesight: 'Truesight',
  }

  const name = visionNames[vision] || vision
  return range ? `${name} (${range} ft.)` : name
}

/**
 * Race Card Component
 * Displays a race option with visual styling and key information
 */
export function RaceCard({ race, isSelected, onSelect }: RaceCardProps) {
  const abilityBonuses = formatAbilityBonuses(race.abilityBonuses)

  return (
    <button
      type="button"
      onClick={() => onSelect(race)}
      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-900
                 ${
                   isSelected
                     ? 'border-dnd-gold bg-gray-800 shadow-lg shadow-dnd-gold/20'
                     : 'border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
                 }`}
      aria-pressed={isSelected}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-xl font-bold ${isSelected ? 'text-dnd-gold' : 'text-white'}`}>
            {race.name}
          </h3>
          <p className="text-sm text-gray-400 capitalize">{race.size} creature</p>
        </div>
        {isSelected && (
          <div className="flex items-center justify-center w-6 h-6 bg-dnd-gold rounded-full">
            <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{race.description}</p>

      {/* Ability Bonuses */}
      <div className="flex flex-wrap gap-2 mb-4">
        {abilityBonuses.map((bonus) => (
          <span
            key={bonus}
            className="px-3 py-1 bg-dnd-gold/20 text-dnd-gold text-sm font-semibold rounded-full"
          >
            {bonus}
          </span>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Speed: {race.speed} ft.</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{getVisionDescription(race.vision, race.visionRange)}</span>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <span className="text-xs text-gray-500">Languages: </span>
        <span className="text-xs text-gray-400">{race.languages.join(', ')}</span>
      </div>
    </button>
  )
}
