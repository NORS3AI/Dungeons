import type { Spell } from '../types'

interface SpellCardProps {
  spell: Spell
  isSelected: boolean
  onToggle: (spell: Spell) => void
  disabled?: boolean
}

/**
 * Get spell level display text
 */
function getSpellLevelText(level: number): string {
  if (level === 0) return 'Cantrip'
  if (level === 1) return '1st Level'
  if (level === 2) return '2nd Level'
  if (level === 3) return '3rd Level'
  return `${level}th Level`
}

/**
 * Get spell school color
 */
function getSchoolColor(school: Spell['school']): string {
  const colors: Record<string, string> = {
    abjuration: 'text-blue-400 bg-blue-900/30',
    conjuration: 'text-yellow-400 bg-yellow-900/30',
    divination: 'text-cyan-400 bg-cyan-900/30',
    enchantment: 'text-pink-400 bg-pink-900/30',
    evocation: 'text-red-400 bg-red-900/30',
    illusion: 'text-purple-400 bg-purple-900/30',
    necromancy: 'text-gray-400 bg-gray-700/50',
    transmutation: 'text-green-400 bg-green-900/30',
  }
  return colors[school] || 'text-gray-400 bg-gray-700/50'
}

/**
 * Format casting time
 */
function formatCastingTime(castingTime: Spell['castingTime']): string {
  const units: Record<string, string> = {
    action: 'Action',
    bonusAction: 'Bonus Action',
    reaction: 'Reaction',
    minute: 'Min',
    hour: 'Hr',
  }
  const unit = units[castingTime.unit] || castingTime.unit
  return castingTime.amount === 1 ? unit : `${castingTime.amount} ${unit}`
}

/**
 * Format range
 */
function formatRange(range: Spell['range']): string {
  if (range.type === 'self') {
    if (range.shape && range.shapeSize) {
      return `Self (${range.shapeSize}ft ${range.shape})`
    }
    return 'Self'
  }
  if (range.type === 'touch') return 'Touch'
  if (range.type === 'sight') return 'Sight'
  if (range.distance) return `${range.distance} ft.`
  return range.type
}

/**
 * Format components
 */
function formatComponents(components: Spell['components']): string {
  const parts: string[] = []
  if (components.verbal) parts.push('V')
  if (components.somatic) parts.push('S')
  if (components.material) parts.push('M')
  return parts.join(', ')
}

/**
 * Spell Card Component
 * Displays a spell with its key information
 */
export function SpellCard({ spell, isSelected, onToggle, disabled }: SpellCardProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle(spell)}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-1 focus:ring-offset-gray-900
                 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                 ${
                   isSelected
                     ? 'border-dnd-gold bg-gray-800 shadow-md shadow-dnd-gold/10'
                     : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                 }`}
      aria-pressed={isSelected}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <h4 className={`font-semibold ${isSelected ? 'text-dnd-gold' : 'text-white'}`}>
            {spell.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getSchoolColor(spell.school)}`}>
              {spell.school}
            </span>
            <span className="text-xs text-gray-500">{getSpellLevelText(spell.level)}</span>
          </div>
        </div>
        {isSelected && (
          <div className="flex items-center justify-center w-5 h-5 bg-dnd-gold rounded-full flex-shrink-0">
            <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
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
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{spell.description}</p>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>
          <span className="text-gray-600">Cast:</span> {formatCastingTime(spell.castingTime)}
        </span>
        <span>
          <span className="text-gray-600">Range:</span> {formatRange(spell.range)}
        </span>
        <span>
          <span className="text-gray-600">Comp:</span> {formatComponents(spell.components)}
        </span>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-2">
        {spell.concentration && (
          <span className="text-xs px-2 py-0.5 bg-orange-900/30 text-orange-400 rounded-full">
            Concentration
          </span>
        )}
        {spell.ritual && (
          <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full">
            Ritual
          </span>
        )}
        {spell.damage && (
          <span className="text-xs px-2 py-0.5 bg-red-900/30 text-red-400 rounded-full">
            {spell.damage.dice} {spell.damage.type}
          </span>
        )}
      </div>
    </button>
  )
}
