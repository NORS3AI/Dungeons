import { useState } from 'react'
import { useCampaignStore, type InitiativeEntry } from '../../stores/campaignStore'
import { useCharacterStore } from '../../stores/characterStore'
import { calculateModifier } from '../../utils/calculations'
import { rollDice } from '../../types/dice'

export function InitiativeTracker() {
  const { characters } = useCharacterStore()
  const {
    initiativeOrder,
    currentTurnIndex,
    roundNumber,
    partyCharacterIds,
    npcs,
    addToInitiative,
    removeFromInitiative,
    updateInitiative,
    sortInitiative,
    nextTurn,
    prevTurn,
    resetCombat,
    updateCombatantHP,
  } = useCampaignStore()

  const [showAddModal, setShowAddModal] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customInitiative, setCustomInitiative] = useState('')
  const [customHP, setCustomHP] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const partyCharacters = characters.filter((c) => partyCharacterIds.includes(c.id))

  const handleAddCharacter = (characterId: string) => {
    const character = characters.find((c) => c.id === characterId)
    if (!character) return

    const initMod = calculateModifier(character.abilityScores.dexterity)
    const roll = rollDice('1d20')
    const initiative = (roll?.grandTotal || 10) + initMod

    addToInitiative({
      name: character.name || 'Unknown',
      initiative,
      isPlayer: true,
      characterId,
      currentHP: character.hitPoints.current,
      maxHP: character.hitPoints.maximum,
    })
  }

  const handleAddNPC = (npcId: string) => {
    const npc = npcs.find((n) => n.id === npcId)
    if (!npc) return

    const initMod = calculateModifier(npc.abilityScores.dexterity)
    const roll = rollDice('1d20')
    const initiative = (roll?.grandTotal || 10) + initMod

    addToInitiative({
      name: npc.name,
      initiative,
      isPlayer: false,
      npcId,
      currentHP: npc.hitPoints.current,
      maxHP: npc.hitPoints.maximum,
    })
  }

  const handleAddCustom = () => {
    if (!customName.trim()) return

    addToInitiative({
      name: customName.trim(),
      initiative: parseInt(customInitiative) || 10,
      isPlayer: false,
      currentHP: parseInt(customHP) || undefined,
      maxHP: parseInt(customHP) || undefined,
    })

    setCustomName('')
    setCustomInitiative('')
    setCustomHP('')
    setShowAddModal(false)
  }

  const handleRollAll = () => {
    // Roll initiative for all party members not yet in order
    partyCharacters.forEach((char) => {
      const alreadyAdded = initiativeOrder.some((e) => e.characterId === char.id)
      if (!alreadyAdded) {
        handleAddCharacter(char.id)
      }
    })
    sortInitiative()
  }

  const handleEditInit = (id: string, currentValue: number) => {
    setEditingId(id)
    setEditValue(currentValue.toString())
  }

  const handleSaveInit = () => {
    if (editingId) {
      updateInitiative(editingId, parseInt(editValue) || 0)
      setEditingId(null)
      setEditValue('')
    }
  }

  const handleDamage = (entry: InitiativeEntry, amount: number) => {
    if (entry.currentHP !== undefined) {
      const newHP = Math.max(0, entry.currentHP - amount)
      updateCombatantHP(entry.id, newHP)
    }
  }

  const handleHeal = (entry: InitiativeEntry, amount: number) => {
    if (entry.currentHP !== undefined && entry.maxHP !== undefined) {
      const newHP = Math.min(entry.maxHP, entry.currentHP + amount)
      updateCombatantHP(entry.id, newHP)
    }
  }

  const currentCombatant = initiativeOrder[currentTurnIndex]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dnd-gold">Initiative Tracker</h2>
          {initiativeOrder.length > 0 && (
            <p className="text-gray-400">Round {roundNumber}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRollAll}
            className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Roll Party Initiative
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Add Combatant
          </button>
          {initiativeOrder.length > 0 && (
            <button
              onClick={resetCombat}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Turn Controls */}
      {initiativeOrder.length > 0 && (
        <div className="flex items-center justify-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <button
            onClick={prevTurn}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <div className="text-sm text-gray-400">Current Turn</div>
            <div className="text-xl font-bold text-white">{currentCombatant?.name || '-'}</div>
          </div>
          <button
            onClick={nextTurn}
            className="p-2 bg-dnd-gold hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Initiative Order */}
      {initiativeOrder.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400 mb-4">No combatants in initiative order.</p>
          <p className="text-gray-500 text-sm">Click "Roll Party Initiative" or "Add Combatant" to begin.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {initiativeOrder.map((entry, index) => (
            <InitiativeRow
              key={entry.id}
              entry={entry}
              isActive={index === currentTurnIndex}
              isEditing={editingId === entry.id}
              editValue={editValue}
              onEditInit={() => handleEditInit(entry.id, entry.initiative)}
              onEditChange={setEditValue}
              onSaveInit={handleSaveInit}
              onRemove={() => removeFromInitiative(entry.id)}
              onDamage={(amount) => handleDamage(entry, amount)}
              onHeal={(amount) => handleHeal(entry, amount)}
            />
          ))}
        </div>
      )}

      {/* Sort Button */}
      {initiativeOrder.length > 1 && (
        <button
          onClick={sortInitiative}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
        >
          Sort by Initiative
        </button>
      )}

      {/* Add Combatant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-lg bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Add Combatant</h3>

            {/* Party Characters */}
            {partyCharacters.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Party Members</h4>
                <div className="flex flex-wrap gap-2">
                  {partyCharacters.map((char) => {
                    const alreadyAdded = initiativeOrder.some((e) => e.characterId === char.id)
                    return (
                      <button
                        key={char.id}
                        onClick={() => {
                          handleAddCharacter(char.id)
                          setShowAddModal(false)
                        }}
                        disabled={alreadyAdded}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          alreadyAdded
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-green-700 hover:bg-green-600 text-white'
                        }`}
                      >
                        {char.name || 'Unnamed'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* NPCs */}
            {npcs.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">NPCs</h4>
                <div className="flex flex-wrap gap-2">
                  {npcs.map((npc) => (
                    <button
                      key={npc.id}
                      onClick={() => {
                        handleAddNPC(npc.id)
                        setShowAddModal(false)
                      }}
                      className="px-3 py-1.5 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                    >
                      {npc.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Entry */}
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Custom Entry</h4>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Name"
                  className="col-span-3 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500"
                />
                <input
                  type="number"
                  value={customInitiative}
                  onChange={(e) => setCustomInitiative(e.target.value)}
                  placeholder="Initiative"
                  className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500"
                />
                <input
                  type="number"
                  value={customHP}
                  onChange={(e) => setCustomHP(e.target.value)}
                  placeholder="HP"
                  className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500"
                />
                <button
                  onClick={handleAddCustom}
                  className="px-3 py-2 bg-dnd-gold hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface InitiativeRowProps {
  entry: InitiativeEntry
  isActive: boolean
  isEditing: boolean
  editValue: string
  onEditInit: () => void
  onEditChange: (value: string) => void
  onSaveInit: () => void
  onRemove: () => void
  onDamage: (amount: number) => void
  onHeal: (amount: number) => void
}

function InitiativeRow({
  entry,
  isActive,
  isEditing,
  editValue,
  onEditInit,
  onEditChange,
  onSaveInit,
  onRemove,
  onDamage,
  onHeal,
}: InitiativeRowProps) {
  const [damageInput, setDamageInput] = useState('')

  const hpPercent = entry.maxHP && entry.currentHP !== undefined
    ? (entry.currentHP / entry.maxHP) * 100
    : 100
  const hpColor = hpPercent > 50 ? 'bg-green-500' : hpPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'

  const handleDamageHeal = (isDamage: boolean) => {
    const amount = parseInt(damageInput) || 0
    if (amount > 0) {
      isDamage ? onDamage(amount) : onHeal(amount)
      setDamageInput('')
    }
  }

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
        isActive
          ? 'bg-dnd-gold/20 border-2 border-dnd-gold'
          : 'bg-gray-800 border border-gray-700'
      }`}
    >
      {/* Initiative */}
      <div className="w-16 text-center">
        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            onBlur={onSaveInit}
            onKeyDown={(e) => e.key === 'Enter' && onSaveInit()}
            className="w-full px-2 py-1 bg-gray-900 border border-dnd-gold rounded text-white text-center"
            autoFocus
          />
        ) : (
          <button
            onClick={onEditInit}
            className="text-2xl font-bold text-white hover:text-dnd-gold transition-colors"
          >
            {entry.initiative}
          </button>
        )}
      </div>

      {/* Name & Type */}
      <div className="flex-1">
        <div className={`font-semibold ${entry.isPlayer ? 'text-green-400' : 'text-red-400'}`}>
          {entry.name}
        </div>
        <div className="text-xs text-gray-500">
          {entry.isPlayer ? 'Player' : 'NPC/Enemy'}
        </div>
      </div>

      {/* HP */}
      {entry.currentHP !== undefined && entry.maxHP !== undefined && (
        <div className="w-48">
          <div className="flex items-center gap-2 mb-1">
            <input
              type="number"
              value={damageInput}
              onChange={(e) => setDamageInput(e.target.value)}
              placeholder="0"
              className="w-16 px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-center text-sm"
            />
            <button
              onClick={() => handleDamageHeal(true)}
              className="px-2 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded transition-colors"
            >
              DMG
            </button>
            <button
              onClick={() => handleDamageHeal(false)}
              className="px-2 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded transition-colors"
            >
              HEAL
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${hpColor} transition-all`} style={{ width: `${Math.min(100, hpPercent)}%` }} />
            </div>
            <span className="text-sm text-gray-400 w-16 text-right">
              {entry.currentHP}/{entry.maxHP}
            </span>
          </div>
        </div>
      )}

      {/* Remove */}
      <button
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
