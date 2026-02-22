import { useState } from 'react'
import type { Character } from '../types'

interface HPEditorProps {
  character: Character
  onUpdateHP: (hp: Partial<Character['hitPoints']>) => void
  onClose: () => void
}

export function HPEditor({ character, onUpdateHP, onClose }: HPEditorProps) {
  const [currentHP, setCurrentHP] = useState(character.hitPoints.current)
  const [maxHP, setMaxHP] = useState(character.hitPoints.maximum)
  const [tempHP, setTempHP] = useState(character.hitPoints.temporary)

  const handleApplyDamage = (amount: number) => {
    const newCurrent = Math.max(0, currentHP - amount)
    setCurrentHP(newCurrent)
  }

  const handleApplyHealing = (amount: number) => {
    const newCurrent = Math.min(maxHP, currentHP + amount)
    setCurrentHP(newCurrent)
  }

  const handleSave = () => {
    onUpdateHP({
      current: currentHP,
      maximum: maxHP,
      temporary: tempHP,
    })
    onClose()
  }

  const quickDamageAmounts = [1, 5, 10, 20]
  const quickHealAmounts: (number | string)[] = [5, 10, 20, 'Full']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-gray-900 border-2 border-dnd-gold rounded-xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-dnd-gold to-yellow-600 p-4 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">Edit Hit Points</h2>
          <p className="text-sm text-gray-800">Adjust HP for damage, healing, or poison</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Current HP Display */}
          <div className="bg-gray-800 border-2 border-red-600 rounded-lg p-6 text-center">
            <div className="text-sm text-gray-400 mb-2">Current HP</div>
            <div className="text-5xl font-bold text-red-400 mb-2">
              {currentHP} / {maxHP}
            </div>
            {tempHP > 0 && (
              <div className="text-sm text-blue-400">
                +{tempHP} Temp HP
              </div>
            )}
          </div>

          {/* Quick Damage */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Take Damage</h3>
            <div className="grid grid-cols-4 gap-2">
              {quickDamageAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleApplyDamage(amount)}
                  className="px-3 py-2 bg-red-900/50 hover:bg-red-800 border border-red-600 text-red-300 font-semibold rounded-lg transition-all"
                >
                  -{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Healing */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Heal</h3>
            <div className="grid grid-cols-4 gap-2">
              {quickHealAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    if (amount === 'Full') {
                      setCurrentHP(maxHP)
                    } else {
                      handleApplyHealing(amount as number)
                    }
                  }}
                  className="px-3 py-2 bg-green-900/50 hover:bg-green-800 border border-green-600 text-green-300 font-semibold rounded-lg transition-all"
                >
                  +{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400">Manual Adjustment</h3>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Current HP</label>
              <input
                type="number"
                value={currentHP}
                onChange={(e) => setCurrentHP(Math.max(0, Math.min(maxHP, Number(e.target.value))))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                min={0}
                max={maxHP}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Maximum HP</label>
              <input
                type="number"
                value={maxHP}
                onChange={(e) => setMaxHP(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                min={1}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Temporary HP</label>
              <input
                type="number"
                value={tempHP}
                onChange={(e) => setTempHP(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-gray-800 border border-blue-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                min={0}
              />
              <p className="text-xs text-gray-500 mt-1">
                Temp HP is lost first before real HP
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface HPEditorButtonProps {
  onClick: () => void
}

export function HPEditorButton({ onClick }: HPEditorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="ml-2 px-2 py-1 bg-red-900/50 hover:bg-red-800 border border-red-600 text-red-300 text-xs rounded transition-all"
      title="Edit HP"
    >
      Edit
    </button>
  )
}
