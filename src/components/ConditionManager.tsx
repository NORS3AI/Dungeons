import { useState } from 'react'
import type { Character, Condition } from '../types'
import { CONDITIONS } from '../data/quickReference'

interface ConditionManagerProps {
  character: Character
  onAddCondition: (condition: Condition) => void
  onRemoveCondition: (condition: Condition) => void
  onClose: () => void
}

// Injury conditions for easy access
const INJURY_CONDITIONS: Condition[] = [
  'bleeding-minor',
  'bleeding-moderate',
  'bleeding-severe',
  'broken-bone',
  'concussed',
  'infected',
]

// Standard D&D conditions
const STANDARD_CONDITIONS: Condition[] = [
  'blinded',
  'charmed',
  'deafened',
  'frightened',
  'grappled',
  'incapacitated',
  'invisible',
  'paralyzed',
  'petrified',
  'poisoned',
  'prone',
  'restrained',
  'stunned',
  'unconscious',
]

// Combat conditions
const COMBAT_CONDITIONS: Condition[] = [
  'enraged',
]

// Exhaustion levels
const EXHAUSTION_CONDITIONS: Condition[] = [
  'exhaustion1',
  'exhaustion2',
  'exhaustion3',
  'exhaustion4',
  'exhaustion5',
  'exhaustion6',
]

export function ConditionManager({ character, onAddCondition, onRemoveCondition, onClose }: ConditionManagerProps) {
  const [activeCategory, setActiveCategory] = useState<'injury' | 'standard' | 'combat' | 'exhaustion'>('injury')

  const hasCondition = (condition: Condition) => character.conditions.includes(condition)

  const toggleCondition = (condition: Condition) => {
    if (hasCondition(condition)) {
      onRemoveCondition(condition)
    } else {
      onAddCondition(condition)
    }
  }

  const getConditionList = () => {
    switch (activeCategory) {
      case 'injury':
        return INJURY_CONDITIONS
      case 'standard':
        return STANDARD_CONDITIONS
      case 'combat':
        return COMBAT_CONDITIONS
      case 'exhaustion':
        return EXHAUSTION_CONDITIONS
      default:
        return []
    }
  }

  const getConditionColor = (category: typeof activeCategory) => {
    switch (category) {
      case 'injury':
        return 'red'
      case 'standard':
        return 'blue'
      case 'combat':
        return 'orange'
      case 'exhaustion':
        return 'purple'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-900 border-2 border-dnd-gold rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
          <h2 className="text-3xl font-bold text-white">Manage Conditions</h2>
          <p className="text-red-100 mt-2">
            Apply or remove status effects for {character.name}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-700 bg-gray-800 px-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategory('injury')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeCategory === 'injury'
                  ? 'border-red-500 text-red-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Injuries
            </button>
            <button
              onClick={() => setActiveCategory('standard')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeCategory === 'standard'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setActiveCategory('combat')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeCategory === 'combat'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Combat
            </button>
            <button
              onClick={() => setActiveCategory('exhaustion')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeCategory === 'exhaustion'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Exhaustion
            </button>
          </div>
        </div>

        {/* Active Conditions Summary */}
        {character.conditions.length > 0 && (
          <div className="bg-yellow-900/30 border-b border-yellow-700 p-4">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">Active Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {character.conditions.map((condition) => (
                <span
                  key={condition}
                  className="px-3 py-1 bg-yellow-900/50 border border-yellow-600 text-yellow-300 text-sm rounded-lg"
                >
                  {CONDITIONS[condition]?.name || condition}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {getConditionList().map((condition) => {
              const isActive = hasCondition(condition)
              const conditionData = CONDITIONS[condition]
              const color = getConditionColor(activeCategory)

              return (
                <button
                  key={condition}
                  onClick={() => toggleCondition(condition)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isActive
                      ? `border-${color}-500 bg-${color}-900/30`
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-white">
                      {conditionData?.name || condition}
                    </div>
                    {isActive && (
                      <span className={`text-xs px-2 py-1 bg-${color}-900 text-${color}-300 rounded`}>
                        Active
                      </span>
                    )}
                  </div>
                  {conditionData && (
                    <div className="space-y-1">
                      {conditionData.effects.map((effect, idx) => (
                        <div key={idx} className="text-xs text-gray-400">
                          • {effect}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 bg-gray-800/50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

interface ConditionManagerButtonProps {
  onClick: () => void
  activeCount: number
}

export function ConditionManagerButton({ onClick, activeCount }: ConditionManagerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-red-900/50 hover:bg-red-800 border border-red-600 text-red-300 rounded-lg transition-all relative"
      title="Manage conditions and injuries"
    >
      Conditions
      {activeCount > 0 && (
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </button>
  )
}
