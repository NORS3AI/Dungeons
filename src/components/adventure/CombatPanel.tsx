import type { CombatState } from '../../types/adventure'

interface CombatPanelProps {
  combat: CombatState
}

export function CombatPanel({ combat }: CombatPanelProps) {
  const aliveEnemies = combat.enemies.filter((e) => e.isActive && e.currentHP > 0)
  const deadEnemies = combat.enemies.filter((e) => !e.isActive || e.currentHP <= 0)

  return (
    <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Combat</h3>
        <span className="text-xs text-gray-500">Round {combat.round}</span>
      </div>

      {/* Turn order */}
      <div className="space-y-1">
        <div className="text-xs text-gray-500 font-medium mb-1">Turn Order</div>
        {combat.turnOrder.map((entry, idx) => {
          const isCurrent = idx === combat.currentTurnIndex
          const isDead = !entry.isPlayer && combat.enemies.find(
            (e) => e.id === entry.enemyId && (e.currentHP <= 0 || !e.isActive),
          )

          if (isDead) return null

          return (
            <div
              key={entry.id}
              className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${
                isCurrent
                  ? 'bg-yellow-900/30 border border-yellow-700/50 text-yellow-300'
                  : 'text-gray-400'
              }`}
            >
              <span className="w-5 text-right text-gray-600">{entry.initiative}</span>
              <span className={`flex-1 ${entry.isPlayer ? 'text-green-400 font-medium' : ''}`}>
                {entry.name}
              </span>
              {isCurrent && <span className="text-yellow-500 text-xs">&#x25C0;</span>}
            </div>
          )
        })}
      </div>

      {/* Enemies */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-medium">Enemies</div>
        {aliveEnemies.map((enemy) => {
          const hpPct = Math.round((enemy.currentHP / enemy.maxHP) * 100)
          return (
            <div key={enemy.id} className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">{enemy.name}</span>
                <span className="text-xs text-gray-500">AC {enemy.ac}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    hpPct > 50 ? 'bg-red-500' : hpPct > 25 ? 'bg-red-600' : 'bg-red-800'
                  }`}
                  style={{ width: `${hpPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{enemy.currentHP}/{enemy.maxHP} HP</span>
                {enemy.conditions.length > 0 && (
                  <div className="flex gap-1">
                    {enemy.conditions.map((c) => (
                      <span key={c} className="text-xs px-1 bg-purple-900/50 text-purple-300 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {deadEnemies.length > 0 && (
          <div className="text-xs text-gray-600 italic">
            Defeated: {deadEnemies.map((e) => e.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  )
}
