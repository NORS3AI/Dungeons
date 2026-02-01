import type { Class } from '../types'

interface ClassCardProps {
  classData: Class
  isSelected: boolean
  onSelect: (classData: Class) => void
}

/**
 * Format hit die for display
 */
function formatHitDie(hitDie: Class['hitDie']): string {
  return hitDie.toUpperCase()
}

/**
 * Format abilities for display
 */
function formatAbilities(abilities: Class['primaryAbility']): string {
  const abilityNames: Record<string, string> = {
    strength: 'STR',
    dexterity: 'DEX',
    constitution: 'CON',
    intelligence: 'INT',
    wisdom: 'WIS',
    charisma: 'CHA',
  }
  return abilities.map((a) => abilityNames[a] || a).join(' / ')
}

/**
 * Get spellcasting label
 */
function getSpellcastingLabel(type: Class['spellcasting']): string | null {
  switch (type) {
    case 'full':
      return 'Full Caster'
    case 'half':
      return 'Half Caster'
    case 'third':
      return 'Third Caster'
    case 'pact':
      return 'Pact Magic'
    default:
      return null
  }
}

/**
 * Class Card Component
 * Displays a class option with visual styling and key information
 */
export function ClassCard({ classData, isSelected, onSelect }: ClassCardProps) {
  const spellcastingLabel = getSpellcastingLabel(classData.spellcasting)

  return (
    <button
      type="button"
      onClick={() => onSelect(classData)}
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
            {classData.name}
          </h3>
          <p className="text-sm text-gray-400">
            Hit Die: {formatHitDie(classData.hitDie)} | {formatAbilities(classData.primaryAbility)}
          </p>
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
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{classData.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {spellcastingLabel && (
          <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-sm font-semibold rounded-full">
            {spellcastingLabel}
          </span>
        )}
        {classData.spellcasting === 'none' && (
          <span className="px-3 py-1 bg-red-900/30 text-red-400 text-sm font-semibold rounded-full">
            Martial
          </span>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>{classData.armorProficiencies.length > 0 ? classData.armorProficiencies.join(', ') : 'None'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Subclass at {classData.subclassLevel}</span>
        </div>
      </div>

      {/* Saving Throws */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <span className="text-xs text-gray-500">Saving Throws: </span>
        <span className="text-xs text-gray-400 uppercase">
          {classData.savingThrows.map((s) => s.slice(0, 3)).join(', ')}
        </span>
      </div>
    </button>
  )
}
