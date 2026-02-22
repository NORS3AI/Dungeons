import { useState, useCallback } from 'react'
import { rollDice, rollWithAdvantage, rollWithDisadvantage } from '../types/dice'
import type { DiceRoll, RollModifier } from '../types/dice'

type QuickDie = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'
type RollMode = 'normal' | 'advantage' | 'disadvantage'

const QUICK_DICE: QuickDie[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']

interface QuickDiceRollerProps {
  onClose?: () => void
}

export function QuickDiceRoller({ onClose }: QuickDiceRollerProps) {
  const [notation, setNotation] = useState('1d20')
  const [modifier, setModifier] = useState(0)
  const [rollMode, setRollMode] = useState<RollMode>('normal')
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([])
  const [currentRoll, setCurrentRoll] = useState<DiceRoll | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const handleRoll = useCallback(() => {
    setIsRolling(true)

    setTimeout(() => {
      let result: DiceRoll | null = null
      const modifiers: RollModifier[] = modifier !== 0 ? [{ type: 'flat', value: modifier }] : []

      if (rollMode === 'advantage') {
        result = rollWithAdvantage(notation, modifiers)
      } else if (rollMode === 'disadvantage') {
        result = rollWithDisadvantage(notation, modifiers)
      } else {
        result = rollDice(notation, modifiers)
      }

      if (result) {
        setCurrentRoll(result)
        setRollHistory((prev) => [result!, ...prev].slice(0, 10))
      }

      setIsRolling(false)
    }, 400)
  }, [notation, modifier, rollMode])

  const quickRoll = (die: QuickDie, mod: number = 0) => {
    setNotation(`1${die}`)
    setModifier(mod)
    setIsRolling(true)

    setTimeout(() => {
      const modifiers: RollModifier[] = mod !== 0 ? [{ type: 'flat', value: mod }] : []
      const result = rollDice(`1${die}`, modifiers)
      if (result) {
        setCurrentRoll(result)
        setRollHistory((prev) => [result, ...prev].slice(0, 10))
      }
      setIsRolling(false)
    }, 400)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dnd-gold">Dice Roller</h2>
            <p className="text-sm text-gray-400">Roll checks, attacks, saves, and more</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Roll Display */}
          {currentRoll && (
            <div className="bg-gradient-to-br from-dnd-gold/20 to-yellow-900/20 border border-dnd-gold/50 rounded-xl p-6 text-center">
              <div className="text-6xl font-bold text-dnd-gold mb-2">
                {isRolling ? (
                  <span className="animate-bounce">🎲</span>
                ) : (
                  currentRoll.grandTotal
                )}
              </div>
              {!isRolling && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-300">
                    {currentRoll.notation}
                    {currentRoll.modifierTotal !== 0 && (
                      <span className="ml-1">
                        {currentRoll.modifierTotal > 0 ? '+' : ''}
                        {currentRoll.modifierTotal}
                      </span>
                    )}
                  </div>
                  {currentRoll.results.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentRoll.results.map((result, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-lg font-medium ${
                            result.isMax
                              ? 'bg-green-900/50 text-green-400 border border-green-500'
                              : result.isMin
                                ? 'bg-red-900/50 text-red-400 border border-red-500'
                                : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {result.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick Dice */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Roll</h3>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_DICE.map((die) => (
                <button
                  key={die}
                  onClick={() => quickRoll(die)}
                  className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  {die}
                </button>
              ))}
              <button
                onClick={() => quickRoll('d20', 0)}
                className="p-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors col-span-4"
              >
                Roll d20
              </button>
            </div>
          </div>

          {/* Custom Roll */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Custom Roll</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Notation</label>
                  <input
                    type="text"
                    value={notation}
                    onChange={(e) => setNotation(e.target.value)}
                    placeholder="1d20"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Modifier</label>
                  <input
                    type="number"
                    value={modifier}
                    onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                  />
                </div>
              </div>

              {/* Roll Mode */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">Roll Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setRollMode('normal')}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      rollMode === 'normal'
                        ? 'bg-dnd-gold text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setRollMode('advantage')}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      rollMode === 'advantage'
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Advantage
                  </button>
                  <button
                    onClick={() => setRollMode('disadvantage')}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      rollMode === 'disadvantage'
                        ? 'bg-red-700 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Disadvantage
                  </button>
                </div>
              </div>

              <button
                onClick={handleRoll}
                disabled={isRolling}
                className="w-full px-6 py-3 bg-dnd-gold text-gray-900 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRolling ? 'Rolling...' : 'Roll'}
              </button>
            </div>
          </div>

          {/* Common D&D Rolls */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Common D&D Rolls</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setNotation('1d20')
                  setModifier(0)
                  setRollMode('normal')
                  handleRoll()
                }}
                className="p-2 bg-blue-900/50 hover:bg-blue-900/70 text-blue-300 rounded-lg text-sm transition-colors"
              >
                Ability Check
              </button>
              <button
                onClick={() => {
                  setNotation('1d20')
                  setModifier(0)
                  setRollMode('normal')
                  handleRoll()
                }}
                className="p-2 bg-red-900/50 hover:bg-red-900/70 text-red-300 rounded-lg text-sm transition-colors"
              >
                Attack Roll
              </button>
              <button
                onClick={() => {
                  setNotation('1d20')
                  setModifier(0)
                  setRollMode('normal')
                  handleRoll()
                }}
                className="p-2 bg-purple-900/50 hover:bg-purple-900/70 text-purple-300 rounded-lg text-sm transition-colors"
              >
                Saving Throw
              </button>
              <button
                onClick={() => {
                  setNotation('1d4')
                  setModifier(0)
                  setRollMode('normal')
                  handleRoll()
                }}
                className="p-2 bg-green-900/50 hover:bg-green-900/70 text-green-300 rounded-lg text-sm transition-colors"
              >
                Initiative (d20+DEX)
              </button>
            </div>
          </div>

          {/* Roll History */}
          {rollHistory.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Rolls</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {rollHistory.map((roll, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-900 rounded-lg text-sm"
                  >
                    <span className="text-gray-400">
                      {roll.notation}
                      {roll.modifierTotal !== 0 && (
                        <span className="ml-1">
                          {roll.modifierTotal > 0 ? '+' : ''}
                          {roll.modifierTotal}
                        </span>
                      )}
                    </span>
                    <span className="text-dnd-gold font-medium">{roll.grandTotal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Floating button component
export function QuickDiceRollerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-dnd-gold hover:bg-yellow-500 text-gray-900 rounded-full shadow-2xl hover:shadow-dnd-gold/50 transition-all duration-200 transform hover:scale-110 flex items-center justify-center group"
      title="Quick Dice Roller"
    >
      <span className="text-3xl group-hover:rotate-12 transition-transform duration-200">🎲</span>
    </button>
  )
}
