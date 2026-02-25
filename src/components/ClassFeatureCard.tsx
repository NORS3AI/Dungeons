import type { ClassFeature, Character } from '../types'
import { QuickRefTooltip } from './QuickRefTooltip'

interface ClassFeatureCardProps {
  feature: ClassFeature
  character: Character
  currentCharges?: number
  maxCharges?: number
  onUse?: () => void
}

export function ClassFeatureCard({
  feature,
  character,
  currentCharges,
  maxCharges,
  onUse,
}: ClassFeatureCardProps) {
  // Determine feature type and styling
  const isActive = feature.charges && currentCharges !== undefined && maxCharges !== undefined
  const isPassive = !feature.charges
  const canUse = isActive && currentCharges! > 0

  // Calculate Sneak Attack damage for Rogues
  const getSneakAttackDamage = () => {
    if (feature.id !== 'sneak-attack' || character.class?.id !== 'rogue') return null
    const level = character.level
    if (level < 3) return '1d6'
    if (level < 5) return '2d6'
    if (level < 7) return '3d6'
    if (level < 9) return '4d6'
    if (level < 11) return '5d6'
    if (level < 13) return '6d6'
    if (level < 15) return '7d6'
    if (level < 17) return '8d6'
    if (level < 19) return '9d6'
    return '10d6'
  }

  const sneakAttackDamage = getSneakAttackDamage()

  // Determine action type
  const getActionType = () => {
    const desc = feature.description.toLowerCase()
    if (desc.includes('bonus action')) return 'Bonus Action'
    if (desc.includes('reaction')) return 'Reaction'
    if (desc.includes('as an action')) return 'Action'
    if (isPassive) return 'Passive'
    return 'Special'
  }

  const actionType = getActionType()

  return (
    <div
      className={`relative p-4 rounded-lg border-2 transition-all ${
        isPassive
          ? 'bg-gray-900 border-gray-700'
          : canUse
          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500 hover:border-purple-400'
          : 'bg-gray-900/50 border-gray-600 opacity-60'
      }`}
    >
      {/* Action Type Badge */}
      <div className="absolute top-2 right-2">
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold ${
            actionType === 'Bonus Action'
              ? 'bg-blue-600 text-white'
              : actionType === 'Reaction'
              ? 'bg-orange-600 text-white'
              : actionType === 'Action'
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 text-gray-300'
          }`}
        >
          {actionType}
        </span>
      </div>

      <div className="flex items-start justify-between mb-2 pr-24">
        <div className="flex-1">
          <QuickRefTooltip type="trait" id={feature.id}>
            <h4 className="font-bold text-white hover:text-purple-300 cursor-pointer">
              {feature.name}
            </h4>
          </QuickRefTooltip>

          {/* Special displays */}
          {sneakAttackDamage && (
            <div className="mt-1 text-lg font-bold text-red-400">
              {sneakAttackDamage} damage
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{feature.description}</p>

      {/* Charges/Availability Display */}
      <div className="flex items-center justify-between">
        {isActive ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Uses:</span>
            <span className={`text-lg font-bold ${canUse ? 'text-purple-400' : 'text-gray-500'}`}>
              {currentCharges}/{maxCharges}
            </span>
            {feature.charges?.rechargeOn && (
              <span className="text-xs text-gray-500">
                ({feature.charges.rechargeOn === 'shortRest' ? 'Short Rest' : 'Long Rest'})
              </span>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            {isPassive ? 'Always Active' : 'Available'}
          </div>
        )}

        {/* Use Button for active abilities */}
        {isActive && onUse && (
          <button
            onClick={onUse}
            disabled={!canUse}
            className={`px-3 py-1 rounded font-medium text-sm transition-colors ${
              canUse
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Use
          </button>
        )}
      </div>
    </div>
  )
}
