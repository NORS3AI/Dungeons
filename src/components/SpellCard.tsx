import { useState } from 'react'
import type { Spell } from '../types'

interface SpellCardProps {
  spell: Spell
  isSelected: boolean
  onToggle: (spell: Spell) => void
  disabled?: boolean
}

/**
 * Simple tooltip for spell terms
 */
function TermTooltip({ term, children }: { term: string; children: React.ReactNode }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const definitions: Record<string, string> = {
    // Action types
    'Action': 'Your main action each turn. You can attack, cast a spell, dash, disengage, dodge, help, hide, ready, search, or use an object.',
    'Bonus Action': 'A quick action you can take in addition to your main action. Not all characters have bonus actions available.',
    'Reaction': 'An instant response to a trigger. You get one reaction per round, which resets at the start of your turn.',
    // Components
    'V': 'Verbal - The spell requires you to speak magic words. You cannot cast this spell if you are silenced or gagged.',
    'S': 'Somatic - The spell requires hand gestures. You need at least one free hand to cast this spell.',
    'M': 'Material - The spell requires specific physical components. These can usually be replaced by a spellcasting focus.',
    // Duration
    'Concentration': 'You must maintain focus on this spell. Taking damage may break concentration (CON save DC 10 or half damage). You can only concentrate on one spell at a time.',
    'Ritual': 'This spell can be cast as a ritual, taking 10 extra minutes but not using a spell slot.',
  }

  const definition = definitions[term]
  if (!definition) return <>{children}</>

  return (
    <span
      className="relative cursor-help border-b border-dotted border-gray-500"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        e.stopPropagation()
        setShowTooltip(!showTooltip)
      }}
    >
      {children}
      {showTooltip && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-xl text-sm text-gray-300 font-normal">
          <span className="font-semibold text-dnd-gold block mb-1">{term}</span>
          {definition}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-600" />
        </span>
      )}
    </span>
  )
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
 * Format casting time with tooltip-friendly output
 */
function getCastingTimeDisplay(castingTime: Spell['castingTime']): { text: string; term: string } {
  const units: Record<string, string> = {
    action: 'Action',
    bonusAction: 'Bonus Action',
    reaction: 'Reaction',
    minute: 'Min',
    hour: 'Hr',
  }
  const term = units[castingTime.unit] || castingTime.unit
  const text = castingTime.amount === 1 ? term : `${castingTime.amount} ${term}`
  return { text, term }
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
 * Format duration
 */
function formatDuration(duration: Spell['duration']): string {
  if (duration.type === 'instantaneous') return 'Instantaneous'
  if (duration.type === 'untilDispelled') return 'Until Dispelled'
  if (duration.type === 'special') return 'Special'
  if (duration.type === 'concentration' || duration.type === 'timed') {
    const prefix = duration.type === 'concentration' ? 'Concentration, up to ' : ''
    const unitMap: Record<string, string> = {
      round: duration.amount === 1 ? 'round' : 'rounds',
      minute: duration.amount === 1 ? 'minute' : 'minutes',
      hour: duration.amount === 1 ? 'hour' : 'hours',
      day: duration.amount === 1 ? 'day' : 'days',
    }
    return `${prefix}${duration.amount} ${unitMap[duration.unit || 'minute'] || duration.unit}`
  }
  return 'Unknown'
}

/**
 * Spell Card Component
 * Displays a spell with its key information and expandable details
 */
export function SpellCard({ spell, isSelected, onToggle, disabled }: SpellCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const castingTime = getCastingTimeDisplay(spell.castingTime)

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  return (
    <div
      onClick={() => !disabled && onToggle(spell)}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-1 focus:ring-offset-gray-900
                 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                 ${
                   isSelected
                     ? 'border-dnd-gold bg-gray-800 shadow-md shadow-dnd-gold/10'
                     : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                 }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (!disabled) onToggle(spell)
        }
      }}
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
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{spell.description}</p>

      {/* Read More Button */}
      <button
        onClick={handleReadMore}
        className="text-dnd-gold hover:text-yellow-400 text-xs font-medium mb-3 flex items-center gap-1 transition-colors"
      >
        {showDetails ? 'Show Less' : 'Read More'}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Details */}
      {showDetails && (
        <div className="mb-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700 text-sm">
          {/* Full Description */}
          <p className="text-gray-300 mb-3">{spell.description}</p>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <span className="text-gray-500">Casting Time: </span>
              <TermTooltip term={castingTime.term}>
                <span className="text-white">{castingTime.text}</span>
              </TermTooltip>
              {spell.castingTime.reactionTrigger && (
                <span className="text-gray-400 block ml-2">({spell.castingTime.reactionTrigger})</span>
              )}
            </div>
            <div>
              <span className="text-gray-500">Range: </span>
              <span className="text-white">{formatRange(spell.range)}</span>
            </div>
            <div>
              <span className="text-gray-500">Components: </span>
              <span className="text-white">
                {spell.components.verbal && <TermTooltip term="V"><span className="mr-1">V</span></TermTooltip>}
                {spell.components.somatic && <TermTooltip term="S"><span className="mr-1">S</span></TermTooltip>}
                {spell.components.material && <TermTooltip term="M"><span>M</span></TermTooltip>}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Duration: </span>
              {spell.concentration ? (
                <TermTooltip term="Concentration">
                  <span className="text-orange-400">{formatDuration(spell.duration)}</span>
                </TermTooltip>
              ) : (
                <span className="text-white">{formatDuration(spell.duration)}</span>
              )}
            </div>
          </div>

          {/* Material Components Detail */}
          {spell.components.material && spell.components.materialDescription && (
            <div className="text-xs mb-3 p-2 bg-gray-800 rounded">
              <span className="text-gray-500">Materials: </span>
              <span className="text-gray-300 italic">{spell.components.materialDescription}</span>
            </div>
          )}

          {/* Attack/Save Info */}
          {(spell.attackRoll || spell.savingThrow) && (
            <div className="text-xs mb-2">
              {spell.attackRoll && (
                <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded mr-2">
                  Spell Attack Roll
                </span>
              )}
              {spell.savingThrow && (
                <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded">
                  {spell.savingThrow.ability.toUpperCase()} Save ({spell.savingThrow.effect})
                </span>
              )}
            </div>
          )}

          {/* At Higher Levels */}
          {spell.atHigherLevels && (
            <div className="text-xs p-2 bg-purple-900/20 rounded border border-purple-500/30">
              <span className="text-purple-400 font-medium">At Higher Levels: </span>
              <span className="text-gray-300">{spell.atHigherLevels}</span>
            </div>
          )}
        </div>
      )}

      {/* Stats Row (Compact) */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>
          <span className="text-gray-600">Cast: </span>
          <TermTooltip term={castingTime.term}>
            <span>{castingTime.text}</span>
          </TermTooltip>
        </span>
        <span>
          <span className="text-gray-600">Range: </span>{formatRange(spell.range)}
        </span>
        <span>
          <span className="text-gray-600">Comp: </span>
          {spell.components.verbal && <TermTooltip term="V"><span className="mr-0.5">V</span></TermTooltip>}
          {spell.components.verbal && (spell.components.somatic || spell.components.material) && ', '}
          {spell.components.somatic && <TermTooltip term="S"><span className="mr-0.5">S</span></TermTooltip>}
          {spell.components.somatic && spell.components.material && ', '}
          {spell.components.material && <TermTooltip term="M"><span>M</span></TermTooltip>}
        </span>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-2">
        {spell.concentration && (
          <TermTooltip term="Concentration">
            <span className="text-xs px-2 py-0.5 bg-orange-900/30 text-orange-400 rounded-full">
              Concentration
            </span>
          </TermTooltip>
        )}
        {spell.ritual && (
          <TermTooltip term="Ritual">
            <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full">
              Ritual
            </span>
          </TermTooltip>
        )}
        {spell.damage && (
          <span className="text-xs px-2 py-0.5 bg-red-900/30 text-red-400 rounded-full">
            {spell.damage.dice} {spell.damage.type}
          </span>
        )}
      </div>
    </div>
  )
}
