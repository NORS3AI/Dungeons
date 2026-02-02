import { useState } from 'react'
import { useCampaignStore, type NPC } from '../../stores/campaignStore'
import { useCharacterStore } from '../../stores/characterStore'
import { calculateModifier } from '../../utils/calculations'
import { rollDice } from '../../types/dice'

interface EncounterCombatant {
  id: string
  name: string
  isPlayer: boolean
  npcId?: string
  characterId?: string
  initiative: number
  currentHP: number
  maxHP: number
  ac: number
  conditions: string[]
}

export function EncounterBuilder() {
  const { npcs, partyCharacterIds } = useCampaignStore()
  const { characters } = useCharacterStore()

  const [combatants, setCombatants] = useState<EncounterCombatant[]>([])
  const [currentTurn, setCurrentTurn] = useState(0)
  const [round, setRound] = useState(1)
  const [inCombat, setInCombat] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [npcCounts, setNpcCounts] = useState<Record<string, number>>({})

  const partyCharacters = characters.filter((c) => partyCharacterIds.includes(c.id))

  const addPartyToEncounter = () => {
    const newCombatants: EncounterCombatant[] = partyCharacters.map((char) => ({
      id: crypto.randomUUID(),
      name: char.name || 'Unknown',
      isPlayer: true,
      characterId: char.id,
      initiative: 0,
      currentHP: char.hitPoints.current,
      maxHP: char.hitPoints.maximum,
      ac: char.armorClass,
      conditions: [...char.conditions],
    }))
    setCombatants([...combatants, ...newCombatants])
  }

  const addNPCToEncounter = (npc: NPC, count: number = 1) => {
    const currentCount = npcCounts[npc.id] || 0
    setNpcCounts({ ...npcCounts, [npc.id]: currentCount + count })

    const newCombatants: EncounterCombatant[] = Array.from({ length: count }, (_, i) => ({
      id: crypto.randomUUID(),
      name: count > 1 || currentCount > 0 ? `${npc.name} ${currentCount + i + 1}` : npc.name,
      isPlayer: false,
      npcId: npc.id,
      initiative: 0,
      currentHP: npc.hitPoints.maximum,
      maxHP: npc.hitPoints.maximum,
      ac: npc.armorClass,
      conditions: [],
    }))
    setCombatants([...combatants, ...newCombatants])
  }

  const removeCombatant = (id: string) => {
    setCombatants(combatants.filter((c) => c.id !== id))
  }

  const rollAllInitiative = () => {
    const updated = combatants.map((c) => {
      let initMod = 0
      if (c.characterId) {
        const char = characters.find((ch) => ch.id === c.characterId)
        if (char) initMod = calculateModifier(char.abilityScores.dexterity)
      } else if (c.npcId) {
        const npc = npcs.find((n) => n.id === c.npcId)
        if (npc) initMod = calculateModifier(npc.abilityScores.dexterity)
      }

      const roll = rollDice('1d20')
      return { ...c, initiative: (roll?.grandTotal || 10) + initMod }
    })

    // Sort by initiative
    updated.sort((a, b) => b.initiative - a.initiative)
    setCombatants(updated)
  }

  const startCombat = () => {
    if (combatants.length === 0) return
    rollAllInitiative()
    setInCombat(true)
    setCurrentTurn(0)
    setRound(1)
  }

  const nextTurn = () => {
    const next = (currentTurn + 1) % combatants.length
    if (next === 0) setRound(round + 1)
    setCurrentTurn(next)
  }

  const prevTurn = () => {
    if (currentTurn === 0 && round > 1) {
      setCurrentTurn(combatants.length - 1)
      setRound(round - 1)
    } else if (currentTurn > 0) {
      setCurrentTurn(currentTurn - 1)
    }
  }

  const endCombat = () => {
    setInCombat(false)
    setCurrentTurn(0)
    setRound(1)
  }

  const updateCombatantHP = (id: string, delta: number) => {
    setCombatants(combatants.map((c) => {
      if (c.id === id) {
        const newHP = Math.max(0, Math.min(c.maxHP, c.currentHP + delta))
        return { ...c, currentHP: newHP }
      }
      return c
    }))
  }

  const updateCombatantInit = (id: string, initiative: number) => {
    setCombatants(combatants.map((c) => (c.id === id ? { ...c, initiative } : c)))
  }

  const toggleCondition = (id: string, condition: string) => {
    setCombatants(combatants.map((c) => {
      if (c.id === id) {
        const conditions = c.conditions.includes(condition)
          ? c.conditions.filter((cond) => cond !== condition)
          : [...c.conditions, condition]
        return { ...c, conditions }
      }
      return c
    }))
  }

  const currentCombatant = combatants[currentTurn]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dnd-gold">Encounter Builder</h2>
          {inCombat && (
            <p className="text-gray-400">Round {round} - {currentCombatant?.name}'s Turn</p>
          )}
        </div>
        <div className="flex gap-2">
          {!inCombat ? (
            <>
              <button
                onClick={addPartyToEncounter}
                disabled={partyCharacters.length === 0}
                className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Add Party
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Add NPCs
              </button>
              <button
                onClick={startCombat}
                disabled={combatants.length === 0}
                className="px-4 py-2 bg-dnd-gold hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Start Combat
              </button>
            </>
          ) : (
            <>
              <button
                onClick={prevTurn}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextTurn}
                className="px-4 py-2 bg-dnd-gold hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Next Turn
              </button>
              <button
                onClick={endCombat}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                End Combat
              </button>
            </>
          )}
        </div>
      </div>

      {/* Combatant List */}
      {combatants.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400 mb-4">No combatants in this encounter.</p>
          <p className="text-gray-500 text-sm">Add party members and NPCs to build your encounter.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {combatants.map((combatant, index) => (
            <CombatantRow
              key={combatant.id}
              combatant={combatant}
              isActive={inCombat && index === currentTurn}
              onRemove={() => removeCombatant(combatant.id)}
              onUpdateHP={(delta) => updateCombatantHP(combatant.id, delta)}
              onUpdateInit={(init) => updateCombatantInit(combatant.id, init)}
              onToggleCondition={(cond) => toggleCondition(combatant.id, cond)}
              inCombat={inCombat}
            />
          ))}
        </div>
      )}

      {/* Add NPC Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-lg bg-gray-800 rounded-xl border border-gray-700 p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Add NPCs to Encounter</h3>

            {npcs.length === 0 ? (
              <p className="text-gray-400">No NPCs created yet. Create some in the NPC Creator first.</p>
            ) : (
              <div className="space-y-3">
                {npcs.map((npc) => (
                  <div
                    key={npc.id}
                    className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-white">{npc.name}</div>
                      <div className="text-sm text-gray-400">
                        CR {npc.challengeRating} | AC {npc.armorClass} | HP {npc.hitPoints.maximum}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addNPCToEncounter(npc, 1)}
                        className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => addNPCToEncounter(npc, 2)}
                        className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-colors"
                      >
                        +2
                      </button>
                      <button
                        onClick={() => addNPCToEncounter(npc, 4)}
                        className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-colors"
                      >
                        +4
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Done
              </button>
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

const CONDITIONS = [
  'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled',
  'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned',
  'Prone', 'Restrained', 'Stunned', 'Unconscious'
]

interface CombatantRowProps {
  combatant: EncounterCombatant
  isActive: boolean
  onRemove: () => void
  onUpdateHP: (delta: number) => void
  onUpdateInit: (initiative: number) => void
  onToggleCondition: (condition: string) => void
  inCombat: boolean
}

function CombatantRow({
  combatant,
  isActive,
  onRemove,
  onUpdateHP,
  onUpdateInit,
  onToggleCondition,
  inCombat,
}: CombatantRowProps) {
  const [hpInput, setHpInput] = useState('')
  const [showConditions, setShowConditions] = useState(false)
  const [editingInit, setEditingInit] = useState(false)
  const [initInput, setInitInput] = useState(combatant.initiative.toString())

  const hpPercent = (combatant.currentHP / combatant.maxHP) * 100
  const hpColor = hpPercent > 50 ? 'bg-green-500' : hpPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
  const isDead = combatant.currentHP === 0

  const handleHPChange = (isDamage: boolean) => {
    const amount = parseInt(hpInput) || 0
    if (amount > 0) {
      onUpdateHP(isDamage ? -amount : amount)
      setHpInput('')
    }
  }

  const handleInitSave = () => {
    onUpdateInit(parseInt(initInput) || 0)
    setEditingInit(false)
  }

  return (
    <div
      className={`p-4 rounded-lg transition-all ${
        isActive
          ? 'bg-dnd-gold/20 border-2 border-dnd-gold'
          : isDead
          ? 'bg-gray-900 border border-gray-800 opacity-60'
          : combatant.isPlayer
          ? 'bg-green-900/20 border border-green-800'
          : 'bg-red-900/20 border border-red-800'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Initiative */}
        <div className="w-16 text-center">
          {editingInit ? (
            <input
              type="number"
              value={initInput}
              onChange={(e) => setInitInput(e.target.value)}
              onBlur={handleInitSave}
              onKeyDown={(e) => e.key === 'Enter' && handleInitSave()}
              className="w-full px-2 py-1 bg-gray-900 border border-dnd-gold rounded text-white text-center text-lg"
              autoFocus
            />
          ) : (
            <button
              onClick={() => {
                setInitInput(combatant.initiative.toString())
                setEditingInit(true)
              }}
              className="text-2xl font-bold text-white hover:text-dnd-gold transition-colors"
            >
              {combatant.initiative}
            </button>
          )}
          <div className="text-xs text-gray-500">Init</div>
        </div>

        {/* Name & Info */}
        <div className="flex-1">
          <div className={`font-semibold text-lg ${combatant.isPlayer ? 'text-green-400' : 'text-red-400'}`}>
            {combatant.name}
            {isDead && <span className="text-gray-500 ml-2">(Dead)</span>}
          </div>
          <div className="text-sm text-gray-400">
            AC {combatant.ac}
            {combatant.conditions.length > 0 && (
              <span className="ml-2">
                | {combatant.conditions.join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* HP Management */}
        <div className="w-64">
          <div className="flex items-center gap-2 mb-1">
            <input
              type="number"
              value={hpInput}
              onChange={(e) => setHpInput(e.target.value)}
              placeholder="0"
              className="w-16 px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-center text-sm"
            />
            <button
              onClick={() => handleHPChange(true)}
              className="px-2 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded transition-colors"
            >
              Damage
            </button>
            <button
              onClick={() => handleHPChange(false)}
              className="px-2 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded transition-colors"
            >
              Heal
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${hpColor} transition-all`} style={{ width: `${Math.min(100, hpPercent)}%` }} />
            </div>
            <span className="text-sm text-white font-medium w-20 text-right">
              {combatant.currentHP} / {combatant.maxHP}
            </span>
          </div>
        </div>

        {/* Conditions */}
        <button
          onClick={() => setShowConditions(!showConditions)}
          className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          title="Conditions"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Remove */}
        {!inCombat && (
          <button
            onClick={onRemove}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Conditions Panel */}
      {showConditions && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((condition) => (
              <button
                key={condition}
                onClick={() => onToggleCondition(condition)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  combatant.conditions.includes(condition)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
