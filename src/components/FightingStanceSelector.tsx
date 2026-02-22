import type { FightingStance } from '../types/character'
import { FIGHTING_STANCE_LIST } from '../data/fightingStances'

interface FightingStanceSelectorProps {
  currentStance?: FightingStance
  onChange: (stance: FightingStance) => void
}

export function FightingStanceSelector({ currentStance, onChange }: FightingStanceSelectorProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-dnd-gold mb-3">Fighting Stance</h3>
      <div className="space-y-2">
        {FIGHTING_STANCE_LIST.map((stance) => {
          const isSelected = currentStance === stance.id

          return (
            <button
              key={stance.id}
              onClick={() => onChange(stance.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-dnd-gold bg-dnd-gold/10'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className={`font-semibold ${isSelected ? 'text-dnd-gold' : 'text-white'}`}>
                  {stance.name}
                </span>
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-400">Damage: <span className="text-white font-medium">{stance.damage}</span></span>
                  {stance.acModifier !== 0 && (
                    <span className="text-gray-400">
                      AC: <span className={`font-medium ${stance.acModifier > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stance.acModifier > 0 ? '+' : ''}{stance.acModifier}
                      </span>
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400">{stance.description}</p>
            </button>
          )
        })}
      </div>

      {currentStance && (
        <div className="mt-3 p-2 bg-blue-900/20 border border-blue-700/50 rounded text-sm text-blue-300">
          <strong>Current:</strong> {FIGHTING_STANCE_LIST.find(s => s.id === currentStance)?.name}
        </div>
      )}
    </div>
  )
}
