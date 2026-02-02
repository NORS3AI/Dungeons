import { useState, useCallback } from 'react'
import { rollDice, rollWithAdvantage, rollWithDisadvantage } from '../types/dice'
import type { DiceRoll, DieResult } from '../types/dice'

interface DiceRollerProps {
  onRoll?: (roll: DiceRoll) => void
  compact?: boolean
}

type QuickDie = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'

const QUICK_DICE: QuickDie[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']

export function DiceRoller({ onRoll, compact = false }: DiceRollerProps) {
  const [notation, setNotation] = useState('1d20')
  const [modifier, setModifier] = useState(0)
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([])
  const [currentRoll, setCurrentRoll] = useState<DiceRoll | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const performRoll = useCallback((
    rollNotation: string,
    rollType: 'normal' | 'advantage' | 'disadvantage' = 'normal'
  ) => {
    setIsRolling(true)

    // Brief animation delay
    setTimeout(() => {
      const fullNotation = modifier !== 0
        ? `${rollNotation}${modifier >= 0 ? '+' : ''}${modifier}`
        : rollNotation

      let result: DiceRoll | null = null

      switch (rollType) {
        case 'advantage':
          result = rollWithAdvantage(fullNotation)
          break
        case 'disadvantage':
          result = rollWithDisadvantage(fullNotation)
          break
        default:
          result = rollDice(fullNotation)
      }

      if (result) {
        setCurrentRoll(result)
        setRollHistory((prev) => [result!, ...prev.slice(0, 9)])
        onRoll?.(result)
      }

      setIsRolling(false)
    }, 300)
  }, [modifier, onRoll])

  const handleQuickRoll = (die: QuickDie) => {
    setNotation(`1${die}`)
    performRoll(`1${die}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performRoll(notation)
  }

  const clearHistory = () => {
    setRollHistory([])
    setCurrentRoll(null)
  }

  const getDieColor = (result: DieResult): string => {
    if (result.isMax) return 'text-green-400 bg-green-900/30'
    if (result.isMin) return 'text-red-400 bg-red-900/30'
    return 'text-white bg-gray-700'
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={notation}
          onChange={(e) => setNotation(e.target.value)}
          className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
          placeholder="1d20"
        />
        <button
          onClick={() => performRoll(notation)}
          disabled={isRolling}
          className="px-3 py-1 bg-dnd-gold text-gray-900 rounded text-sm font-medium
                   hover:bg-yellow-500 disabled:opacity-50"
        >
          Roll
        </button>
        {currentRoll && (
          <span className="font-bold text-dnd-gold">{currentRoll.grandTotal}</span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-xl font-bold text-dnd-gold mb-4">Dice Roller</h3>

      {/* Quick Dice */}
      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_DICE.map((die) => (
          <button
            key={die}
            onClick={() => handleQuickRoll(die)}
            disabled={isRolling}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                     font-medium transition-colors disabled:opacity-50"
          >
            {die}
          </button>
        ))}
      </div>

      {/* Custom Roll Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={notation}
          onChange={(e) => setNotation(e.target.value)}
          placeholder="e.g., 2d6, 1d20+5, 4d6"
          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg
                   text-white placeholder-gray-500 focus:border-dnd-gold focus:outline-none"
        />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setModifier((m) => m - 1)}
            className="px-2 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-l-lg"
          >
            -
          </button>
          <span className="px-3 py-2 bg-gray-900 text-white min-w-[3rem] text-center">
            {modifier >= 0 ? `+${modifier}` : modifier}
          </span>
          <button
            type="button"
            onClick={() => setModifier((m) => m + 1)}
            className="px-2 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-r-lg"
          >
            +
          </button>
        </div>
      </form>

      {/* Roll Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => performRoll(notation)}
          disabled={isRolling}
          className="flex-1 px-4 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                   hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {isRolling ? 'Rolling...' : 'Roll'}
        </button>
        <button
          onClick={() => performRoll(notation, 'advantage')}
          disabled={isRolling}
          className="px-4 py-3 bg-green-700 text-white rounded-lg font-medium
                   hover:bg-green-600 transition-colors disabled:opacity-50"
          title="Roll with Advantage"
        >
          ADV
        </button>
        <button
          onClick={() => performRoll(notation, 'disadvantage')}
          disabled={isRolling}
          className="px-4 py-3 bg-red-700 text-white rounded-lg font-medium
                   hover:bg-red-600 transition-colors disabled:opacity-50"
          title="Roll with Disadvantage"
        >
          DIS
        </button>
      </div>

      {/* Current Roll Result */}
      {currentRoll && (
        <div className={`mb-6 p-4 rounded-xl border transition-all ${
          isRolling ? 'animate-pulse bg-gray-900 border-gray-600' : 'bg-gray-900 border-dnd-gold'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">
              {currentRoll.notation}
              {currentRoll.advantage && ' (Advantage)'}
              {currentRoll.disadvantage && ' (Disadvantage)'}
            </span>
            <span className={`text-4xl font-bold ${
              currentRoll.results.some((r) => r.isMax && r.sides === 20)
                ? 'text-green-400'
                : currentRoll.results.some((r) => r.isMin && r.sides === 20)
                ? 'text-red-400'
                : 'text-dnd-gold'
            }`}>
              {currentRoll.grandTotal}
            </span>
          </div>

          {/* Individual Dice */}
          <div className="flex flex-wrap gap-2 mb-2">
            {currentRoll.results.map((result, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getDieColor(result)}`}
              >
                d{result.sides}: {result.value}
              </span>
            ))}
          </div>

          {/* Breakdown */}
          {currentRoll.modifierTotal !== 0 && (
            <div className="text-sm text-gray-400">
              {currentRoll.diceTotal} (dice) {currentRoll.modifierTotal >= 0 ? '+' : ''}{currentRoll.modifierTotal} (modifier) = {currentRoll.grandTotal}
            </div>
          )}
        </div>
      )}

      {/* Roll History */}
      {rollHistory.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-400">Recent Rolls</h4>
            <button
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {rollHistory.slice(1).map((roll) => (
              <div
                key={roll.id}
                className="flex items-center justify-between py-1 px-2 bg-gray-900/50 rounded text-sm"
              >
                <span className="text-gray-400">
                  {roll.notation}
                  {roll.advantage && ' (A)'}
                  {roll.disadvantage && ' (D)'}
                </span>
                <span className="text-white font-medium">{roll.grandTotal}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Floating dice button for quick access
export function DiceRollerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-dnd-gold text-gray-900 rounded-full
               shadow-lg hover:bg-yellow-500 transition-colors flex items-center justify-center
               text-2xl font-bold z-40"
      title="Open Dice Roller"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/>
      </svg>
    </button>
  )
}

// Modal wrapper for the dice roller
export function DiceRollerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 hover:bg-gray-600
                   text-white rounded-full flex items-center justify-center z-10"
        >
          x
        </button>
        <DiceRoller />
      </div>
    </div>
  )
}
