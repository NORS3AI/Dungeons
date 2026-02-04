import { useState, useCallback } from 'react'
import type { AbilityScores, Race } from '../types'
import type { Background } from '../types/background'
import { STANDARD_ARRAY, POINT_BUY_COSTS, DEFAULT_ABILITY_SCORES, calculateModifier } from '../types'

type AllocationMethod = 'standard' | 'pointBuy' | 'roll'
type AbilityKey = keyof AbilityScores

const ABILITIES: { key: AbilityKey; name: string; abbr: string }[] = [
  { key: 'strength', name: 'Strength', abbr: 'STR' },
  { key: 'dexterity', name: 'Dexterity', abbr: 'DEX' },
  { key: 'constitution', name: 'Constitution', abbr: 'CON' },
  { key: 'intelligence', name: 'Intelligence', abbr: 'INT' },
  { key: 'wisdom', name: 'Wisdom', abbr: 'WIS' },
  { key: 'charisma', name: 'Charisma', abbr: 'CHA' },
]

const POINT_BUY_TOTAL = 27
const POINT_BUY_MIN = 8
const POINT_BUY_MAX = 15

interface StatAllocatorProps {
  initialScores?: AbilityScores
  race?: Race | null
  background?: Background | null
  onSubmit: (scores: AbilityScores) => void
  onBack: () => void
}

/**
 * Roll 4d6 drop lowest, 3 times, and take the highest
 */
function roll4d6DropLowest(): number {
  const results: number[] = []

  // Roll 3 times
  for (let attempt = 0; attempt < 3; attempt++) {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
    rolls.sort((a, b) => b - a)
    const result = rolls[0] + rolls[1] + rolls[2]
    results.push(result)
  }

  // Return the highest of the 3 attempts
  return Math.max(...results)
}

/**
 * Get racial bonus for an ability
 */
function getRacialBonus(race: Race | null | undefined, ability: AbilityKey): number {
  if (!race?.abilityBonuses) return 0
  return race.abilityBonuses[ability] || 0
}

/**
 * Get background bonus for an ability
 */
function getBackgroundBonus(background: Background | null | undefined, ability: AbilityKey): number {
  if (!background?.abilityBonuses) return 0
  const bonus = background.abilityBonuses.find(b => b.ability === ability)
  return bonus?.bonus || 0
}

/**
 * Calculate point buy cost for current scores
 */
function calculatePointsSpent(scores: AbilityScores): number {
  return ABILITIES.reduce((total, { key }) => {
    const score = scores[key]
    return total + (POINT_BUY_COSTS[score] || 0)
  }, 0)
}

/**
 * Stat Allocator Component
 * Allows users to allocate ability scores using three methods
 */
export function StatAllocator({ initialScores, race, background, onSubmit, onBack }: StatAllocatorProps) {
  // Default to roll method, standard and point buy are disabled for now
  const [method, setMethod] = useState<AllocationMethod>('roll')
  const [baseScores, setBaseScores] = useState<AbilityScores>(
    initialScores || { ...DEFAULT_ABILITY_SCORES }
  )
  const [standardAssignments, setStandardAssignments] = useState<Record<AbilityKey, number | null>>({
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null,
  })
  const [rolledScores, setRolledScores] = useState<number[]>([])
  const [rollAssignments, setRollAssignments] = useState<Record<AbilityKey, number | null>>({
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null,
  })

  // Calculate final scores with racial bonuses
  const getFinalScore = useCallback(
    (ability: AbilityKey): number => {
      let base = 10
      if (method === 'standard') {
        base = standardAssignments[ability] ?? 10
      } else if (method === 'pointBuy') {
        base = baseScores[ability]
      } else if (method === 'roll') {
        base = rollAssignments[ability] ?? 10
      }
      return base + getRacialBonus(race, ability) + getBackgroundBonus(background, ability)
    },
    [method, standardAssignments, baseScores, rollAssignments, race, background]
  )

  // Standard Array handlers
  const getAvailableStandardValues = (): number[] => {
    const assigned = Object.values(standardAssignments).filter((v) => v !== null) as number[]
    return STANDARD_ARRAY.filter((v) => !assigned.includes(v))
  }

  const handleStandardAssign = (ability: AbilityKey, value: number | null) => {
    setStandardAssignments((prev) => ({ ...prev, [ability]: value }))
  }

  // Point Buy handlers
  const pointsSpent = calculatePointsSpent(baseScores)
  const pointsRemaining = POINT_BUY_TOTAL - pointsSpent

  const handlePointBuyChange = (ability: AbilityKey, delta: number) => {
    const currentScore = baseScores[ability]
    const newScore = currentScore + delta

    if (newScore < POINT_BUY_MIN || newScore > POINT_BUY_MAX) return

    const currentCost = POINT_BUY_COSTS[currentScore] || 0
    const newCost = POINT_BUY_COSTS[newScore] || 0
    const costDelta = newCost - currentCost

    if (pointsRemaining - costDelta < 0) return

    setBaseScores((prev) => ({ ...prev, [ability]: newScore }))
  }

  // Roll handlers
  const handleRollAll = () => {
    const scores = Array.from({ length: 6 }, () => roll4d6DropLowest())
    scores.sort((a, b) => b - a)
    setRolledScores(scores)
    setRollAssignments({
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null,
    })
  }

  const getAvailableRollValues = (): number[] => {
    const assigned = Object.values(rollAssignments).filter((v) => v !== null) as number[]
    // Create a copy of rolled scores to track availability
    const available: number[] = [...rolledScores]

    // Remove assigned values one by one (handles duplicates correctly)
    for (const val of assigned) {
      const idx = available.indexOf(val)
      if (idx !== -1) {
        available.splice(idx, 1)
      }
    }

    return available
  }

  const handleRollAssign = (ability: AbilityKey, value: number | null) => {
    setRollAssignments((prev) => ({ ...prev, [ability]: value }))
  }

  // Check if allocation is complete
  const isComplete = (): boolean => {
    if (method === 'standard') {
      return Object.values(standardAssignments).every((v) => v !== null)
    } else if (method === 'pointBuy') {
      return true // Always valid
    } else {
      return rolledScores.length === 6 && Object.values(rollAssignments).every((v) => v !== null)
    }
  }

  // Get final scores for submission
  const getFinalScores = (): AbilityScores => {
    const scores: AbilityScores = { ...DEFAULT_ABILITY_SCORES }
    ABILITIES.forEach(({ key }) => {
      scores[key] = getFinalScore(key)
    })
    return scores
  }

  const handleSubmit = () => {
    if (isComplete()) {
      onSubmit(getFinalScores())
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Allocate Ability Scores</h2>
        <p className="text-gray-400">
          Choose how to determine your character's six ability scores.
        </p>
      </div>

      {/* Method Selection */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          { id: 'standard', name: 'Standard Array', desc: '15, 14, 13, 12, 10, 8', disabled: true },
          { id: 'pointBuy', name: 'Point Buy', desc: '27 points to spend', disabled: true },
          { id: 'roll', name: 'Roll', desc: '4d6 drop lowest × 3, take highest', disabled: false },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => !m.disabled && setMethod(m.id as AllocationMethod)}
            disabled={m.disabled}
            className={`flex-1 min-w-[150px] p-4 rounded-lg border-2 transition-all duration-200 relative
                       ${
                         m.disabled
                           ? 'border-gray-800 bg-gray-900/50 cursor-not-allowed opacity-50'
                           : method === m.id
                             ? 'border-dnd-gold bg-gray-800'
                             : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                       }`}
          >
            <div className={`font-bold ${m.disabled ? 'text-gray-600' : method === m.id ? 'text-dnd-gold' : 'text-white'}`}>
              {m.name}
            </div>
            <div className={`text-sm ${m.disabled ? 'text-gray-700' : 'text-gray-400'}`}>{m.desc}</div>
            {m.disabled && (
              <div className="absolute top-1 right-2 px-2 py-0.5 bg-gray-700 text-gray-500 text-xs rounded">
                Coming Soon
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Racial Bonuses Display */}
      {race && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <span className="text-sm text-gray-400">Racial Bonuses ({race.name}): </span>
          <span className="text-dnd-gold font-medium">
            {Object.entries(race.abilityBonuses || {})
              .filter(([, v]) => v)
              .map(([k, v]) => `+${v} ${k.slice(0, 3).toUpperCase()}`)
              .join(', ')}
          </span>
        </div>
      )}

      {/* Standard Array Method */}
      {method === 'standard' && (
        <div className="mb-8">
          <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Available values: </span>
            <span className="text-white font-medium">
              {getAvailableStandardValues().join(', ') || 'All assigned!'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ABILITIES.map(({ key, name }) => (
              <div key={key} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">{name}</div>
                <div className="flex items-center gap-3">
                  <select
                    value={standardAssignments[key] ?? ''}
                    onChange={(e) =>
                      handleStandardAssign(key, e.target.value ? Number(e.target.value) : null)
                    }
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white
                             focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                  >
                    <option value="">Select...</option>
                    {[...(standardAssignments[key] !== null ? [standardAssignments[key]] : []), ...getAvailableStandardValues()]
                      .sort((a, b) => (b ?? 0) - (a ?? 0))
                      .map((v) => (
                        <option key={v} value={v ?? ''}>
                          {v}
                        </option>
                      ))}
                  </select>
                  <div className="text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-white">{getFinalScore(key)}</div>
                    <div className="text-xs text-dnd-gold">
                      {calculateModifier(getFinalScore(key)) >= 0 ? '+' : ''}
                      {calculateModifier(getFinalScore(key))}
                    </div>
                  </div>
                </div>
                {(getRacialBonus(race, key) > 0 || getBackgroundBonus(background, key) > 0) && (
                  <div className="text-xs mt-1 space-x-2">
                    {getRacialBonus(race, key) > 0 && (
                      <span className="text-dnd-gold">+{getRacialBonus(race, key)} racial</span>
                    )}
                    {getBackgroundBonus(background, key) > 0 && (
                      <span className="text-blue-400">+{getBackgroundBonus(background, key)} background</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Point Buy Method */}
      {method === 'pointBuy' && (
        <div className="mb-8">
          <div className="mb-4 p-4 bg-gray-800/50 rounded-lg flex justify-between items-center">
            <span className="text-gray-400">Points Remaining:</span>
            <span className={`text-2xl font-bold ${pointsRemaining > 0 ? 'text-dnd-gold' : 'text-green-500'}`}>
              {pointsRemaining}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ABILITIES.map(({ key, name }) => {
              const baseScore = baseScores[key]
              const canDecrease = baseScore > POINT_BUY_MIN
              const canIncrease = baseScore < POINT_BUY_MAX && pointsRemaining > 0

              return (
                <div key={key} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">{name}</div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handlePointBuyChange(key, -1)}
                      disabled={!canDecrease}
                      className={`w-10 h-10 rounded-lg font-bold text-xl transition-colors
                               ${canDecrease ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                    >
                      -
                    </button>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{getFinalScore(key)}</div>
                      <div className="text-xs text-gray-500">
                        Base: {baseScore} | Cost: {POINT_BUY_COSTS[baseScore]}
                      </div>
                      <div className="text-xs text-dnd-gold">
                        {calculateModifier(getFinalScore(key)) >= 0 ? '+' : ''}
                        {calculateModifier(getFinalScore(key))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePointBuyChange(key, 1)}
                      disabled={!canIncrease}
                      className={`w-10 h-10 rounded-lg font-bold text-xl transition-colors
                               ${canIncrease ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                    >
                      +
                    </button>
                  </div>
                  {(getRacialBonus(race, key) > 0 || getBackgroundBonus(background, key) > 0) && (
                    <div className="text-xs mt-1 text-center space-x-1">
                      {getRacialBonus(race, key) > 0 && (
                        <span className="text-dnd-gold">+{getRacialBonus(race, key)} racial</span>
                      )}
                      {getBackgroundBonus(background, key) > 0 && (
                        <span className="text-blue-400">+{getBackgroundBonus(background, key)} bg</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Point Buy Cost Reference */}
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">Point Cost Reference:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(POINT_BUY_COSTS).map(([score, cost]) => (
                <span key={score} className="px-2 py-1 bg-gray-700 rounded text-xs">
                  <span className="text-white">{score}</span>
                  <span className="text-gray-400"> = {cost}pts</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roll Method */}
      {method === 'roll' && (
        <div className="mb-8">
          <p className="text-gray-400 mb-4 text-sm">
            Each ability will roll <span className="text-dnd-gold font-medium">4d6 drop lowest, 3 times</span>,
            and automatically use the <span className="text-green-400 font-medium">highest result</span>.
          </p>
          <div className="mb-4 flex items-center gap-4">
            <button
              type="button"
              onClick={handleRollAll}
              className="px-6 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                       hover:bg-yellow-500 transition-colors duration-200"
            >
              Roll for All Abilities (3 attempts each)
            </button>
            {rolledScores.length > 0 && (
              <div className="text-gray-400">
                Rolled: <span className="text-white font-medium">{rolledScores.join(', ')}</span>
              </div>
            )}
          </div>

          {rolledScores.length > 0 && (
            <>
              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-400">Available to assign: </span>
                <span className="text-white font-medium">
                  {getAvailableRollValues().join(', ') || 'All assigned!'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ABILITIES.map(({ key, name }) => (
                  <div key={key} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">{name}</div>
                    <div className="flex items-center gap-3">
                      <select
                        value={rollAssignments[key] ?? ''}
                        onChange={(e) =>
                          handleRollAssign(key, e.target.value ? Number(e.target.value) : null)
                        }
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white
                                 focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                      >
                        <option value="">Select...</option>
                        {[...(rollAssignments[key] !== null ? [rollAssignments[key]] : []), ...getAvailableRollValues()]
                          .filter((v, i, arr) => arr.indexOf(v) === i)
                          .sort((a, b) => (b ?? 0) - (a ?? 0))
                          .map((v, i) => (
                            <option key={`${v}-${i}`} value={v ?? ''}>
                              {v}
                            </option>
                          ))}
                      </select>
                      <div className="text-center min-w-[60px]">
                        <div className="text-2xl font-bold text-white">{getFinalScore(key)}</div>
                        <div className="text-xs text-dnd-gold">
                          {calculateModifier(getFinalScore(key)) >= 0 ? '+' : ''}
                          {calculateModifier(getFinalScore(key))}
                        </div>
                      </div>
                    </div>
                    {(getRacialBonus(race, key) > 0 || getBackgroundBonus(background, key) > 0) && (
                      <div className="text-xs mt-1 space-x-2">
                        {getRacialBonus(race, key) > 0 && (
                          <span className="text-dnd-gold">+{getRacialBonus(race, key)} racial</span>
                        )}
                        {getBackgroundBonus(background, key) > 0 && (
                          <span className="text-blue-400">+{getBackgroundBonus(background, key)} background</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {rolledScores.length === 0 && (
            <div className="p-8 bg-gray-800/50 rounded-lg text-center">
              <p className="text-gray-400">Click the button above to roll your ability scores.</p>
              <p className="text-gray-500 text-sm mt-2">Each score is generated by rolling 4d6 and dropping the lowest die.</p>
            </div>
          )}
        </div>
      )}

      {/* Stats Summary */}
      {isComplete() && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-green-500/30">
          <h3 className="text-lg font-bold text-green-400 mb-4">Final Ability Scores</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
            {ABILITIES.map(({ key, abbr }) => (
              <div key={key}>
                <div className="text-xs text-gray-500">{abbr}</div>
                <div className="text-2xl font-bold text-white">{getFinalScore(key)}</div>
                <div className="text-sm text-dnd-gold">
                  {calculateModifier(getFinalScore(key)) >= 0 ? '+' : ''}
                  {calculateModifier(getFinalScore(key))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-700">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                   hover:border-gray-500 rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-dnd-gold"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isComplete()}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       isComplete()
                         ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                         : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                     }`}
        >
          Next: Choose Spells
        </button>
      </div>
    </div>
  )
}
