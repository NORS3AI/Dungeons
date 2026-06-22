import type { Character } from '../../types'
import type { CombatState } from '../../types/adventure'

interface CharacterStatusBarProps {
  character: Character
  combatState: CombatState | null
  gameState: string
  location: string
}

export function CharacterStatusBar({ character, combatState, gameState, location }: CharacterStatusBarProps) {
  const hp = character.hitPoints
  const hpPercent = hp.maximum > 0 ? Math.round((hp.current / hp.maximum) * 100) : 0
  const hpColor =
    hpPercent > 60 ? 'bg-green-500' :
    hpPercent > 30 ? 'bg-yellow-500' :
    hpPercent > 0 ? 'bg-red-500' :
    'bg-gray-600'

  const stateIcons: Record<string, string> = {
    exploring: 'Exploring',
    combat: 'Combat',
    dialogue: 'Dialogue',
    rest: 'Resting',
    shopping: 'Shopping',
    death: 'Death',
  }

  return (
    <div className="bg-gray-800/90 border-b border-gray-700 px-4 py-2 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-wrap max-w-5xl mx-auto">
        {/* Character name & class */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-bold text-dnd-gold truncate">{character.name || 'Adventurer'}</span>
          <span className="text-xs text-gray-500">
            L{character.level} {character.class?.name ?? ''}
          </span>
        </div>

        {/* HP bar */}
        <div className="flex items-center gap-2 flex-1 min-w-[140px] max-w-[220px]">
          <span className="text-xs text-gray-400 whitespace-nowrap">HP</span>
          <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden relative">
            <div
              className={`h-full ${hpColor} transition-all duration-300 rounded-full`}
              style={{ width: `${hpPercent}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
              {hp.current}/{hp.maximum}
              {hp.temporary > 0 && <span className="text-blue-300 ml-1">+{hp.temporary}</span>}
            </span>
          </div>
        </div>

        {/* AC */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">AC</span>
          <span className="text-sm font-bold text-white">{character.acOverride ?? character.armorClass}</span>
        </div>

        {/* Conditions */}
        {character.conditions.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {character.conditions.map((c) => (
              <span key={c} className="text-xs px-1.5 py-0.5 bg-red-900/50 border border-red-700 text-red-300 rounded">
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Game state & location */}
        <div className="ml-auto flex items-center gap-3 text-xs">
          <span className={`px-2 py-1 rounded font-medium ${
            gameState === 'combat' ? 'bg-red-900/50 text-red-300 border border-red-700' :
            gameState === 'death' ? 'bg-gray-900 text-gray-400 border border-gray-600' :
            'bg-gray-700/50 text-gray-400 border border-gray-600'
          }`}>
            {stateIcons[gameState] ?? gameState}
          </span>
          {location !== 'Unknown' && (
            <span className="text-gray-500 truncate max-w-[150px]">{location}</span>
          )}
        </div>

        {/* Combat info */}
        {combatState && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">Round {combatState.round}</span>
            <span className={combatState.isPlayerTurn ? 'text-green-400 font-bold' : 'text-red-400'}>
              {combatState.isPlayerTurn ? 'Your Turn' : 'Enemy Turn'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
