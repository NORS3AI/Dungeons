import type { Background } from '../types/background'

interface BackgroundCardProps {
  background: Background
  isSelected: boolean
  onSelect: (background: Background) => void
}

/**
 * Format skill name for display
 */
function formatSkillName(skill: string): string {
  const names: Record<string, string> = {
    'acrobatics': 'Acrobatics',
    'animal-handling': 'Animal Handling',
    'arcana': 'Arcana',
    'athletics': 'Athletics',
    'deception': 'Deception',
    'history': 'History',
    'insight': 'Insight',
    'intimidation': 'Intimidation',
    'investigation': 'Investigation',
    'medicine': 'Medicine',
    'nature': 'Nature',
    'perception': 'Perception',
    'performance': 'Performance',
    'persuasion': 'Persuasion',
    'religion': 'Religion',
    'sleight-of-hand': 'Sleight of Hand',
    'stealth': 'Stealth',
    'survival': 'Survival',
  }
  return names[skill] || skill.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Background Card Component
 * Displays a background option with visual styling and key information
 */
export function BackgroundCard({ background, isSelected, onSelect }: BackgroundCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(background)}
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
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`text-xl font-bold ${isSelected ? 'text-dnd-gold' : 'text-white'}`}>
            {background.name}
          </h3>
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
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{background.description}</p>

      {/* Skill Proficiencies */}
      <div className="mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">Skills:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {background.skillProficiencies.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs font-medium rounded"
            >
              {formatSkillName(skill)}
            </span>
          ))}
        </div>
      </div>

      {/* Tool Proficiencies or Languages */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        {background.toolProficiencies && background.toolProficiencies.length > 0 && (
          <div>
            <span className="text-gray-500">Tools: </span>
            {background.toolProficiencies.map(t => t.replace(/-/g, ' ')).join(', ')}
          </div>
        )}
        {background.languages && background.languages > 0 && (
          <div>
            <span className="text-gray-500">Languages: </span>
            {background.languages} of your choice
          </div>
        )}
      </div>

      {/* Feature Preview */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <span className="text-xs text-gray-500">Feature: </span>
        <span className="text-xs text-dnd-gold">{background.feature.name}</span>
      </div>
    </button>
  )
}
