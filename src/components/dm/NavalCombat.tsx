import { useState, useRef, useEffect, useCallback } from 'react'
import type {
  Ship, ShipFaction, ShipAbility, AmmoType, ShipCondition,
  BattleLogEntry, Projectile, CombatTurnPhase,
} from '../../types/naval'
import {
  rollReload, rollToHit, rollCannonDamage, rollRepairDuration, rollRepairResult,
  applyConditionEffects, getACWithConditions, getFunctionalCannonsWithConditions,
  isFleetDefeated, buildTurnOrder, getDamageNotation,
} from '../../utils/navalCombat'

// ─── Constants ────────────────────────────────────────────────────────────────

const CONDITION_LABELS: Record<ShipCondition, { label: string; icon: string; color: string }> = {
  on_fire: { label: 'On Fire', icon: '🔥', color: 'text-orange-400' },
  taking_water: { label: 'Taking Water', icon: '🌊', color: 'text-blue-400' },
  mast_damaged: { label: 'Mast Damaged', icon: '⚓', color: 'text-yellow-400' },
  crew_swept: { label: 'Crew Swept', icon: '💀', color: 'text-red-400' },
  bracing: { label: 'Bracing', icon: '🛡️', color: 'text-sky-400' },
}

const LOG_COLORS: Record<BattleLogEntry['type'], string> = {
  attack: 'text-white',
  reload: 'text-cyan-300',
  repair: 'text-green-300',
  ability: 'text-purple-300',
  status: 'text-gray-400',
  damage: 'text-red-400',
  heal: 'text-green-400',
  info: 'text-blue-300',
  critical: 'text-yellow-300',
  fumble: 'text-red-500',
  miss: 'text-gray-500',
}

const DEFAULT_ABILITIES: ShipAbility[] = [
  { id: 'ram', name: 'Ram', description: 'Ram the enemy ship for 2d10 damage (takes 1d6 self damage)' },
  { id: 'boarding', name: 'Boarding Party', description: 'Send crew to board enemy ship (contested d20 check)' },
  { id: 'greek-fire', name: 'Greek Fire', description: 'Launch incendiary projectile — sets target on fire' },
  { id: 'brace', name: 'Brace for Impact', description: '+2 AC until next turn, but cannot fire' },
  { id: 'harpoon', name: 'Harpoon Shot', description: '1d20 vs AC — 1d8 damage + entangles target (applies Mast Damaged)' },
  { id: 'fore-cannons', name: 'Fore Cannons', description: 'Fire bow chasers: 1d20+2 vs AC for 1d10 damage — no reload needed' },
  { id: 'aft-cannons', name: 'Aft Cannons', description: 'Fire stern chasers while retreating: 1d20 vs AC for 1d8 damage + +2 AC until next turn' },
  { id: 'smoke-screen', name: 'Smoke Screen', description: 'Deploy smoke — attackers suffer -2 to hit this ship until next turn (+2 AC)' },
  { id: 'grapeshot', name: 'Grapeshot', description: 'Anti-crew scatter fire: 1d20 vs AC, half damage but always applies Crew Swept' },
  { id: 'broadside-volley', name: 'Broadside Volley', description: 'All-out broadside: double cannon damage dice but applies Mast Damaged to self' },
]

function createShipId(): string {
  return `ship-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createLogId(): string {
  return `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

// ─── Ship SVG ─────────────────────────────────────────────────────────────────

function ShipSVG({ faction, size = 80, sinking = false }: { faction: ShipFaction; size?: number; sinking?: boolean }) {
  const color = faction === 'player' ? '#3b82f6' : '#ef4444'
  const sail = faction === 'player' ? '#60a5fa' : '#f87171'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={sinking ? 'opacity-40' : ''}>
      {/* Hull */}
      <path
        d="M15,65 Q20,80 50,82 Q80,80 85,65 L80,55 L20,55 Z"
        fill={color}
        stroke="#1e293b"
        strokeWidth="2"
      />
      {/* Deck */}
      <rect x="22" y="52" width="56" height="6" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1" />
      {/* Mast */}
      <line x1="50" y1="52" x2="50" y2="15" stroke="#78350f" strokeWidth="3" />
      {/* Sail */}
      <path
        d={faction === 'player'
          ? 'M50,18 Q65,30 50,48 Q35,30 50,18'
          : 'M50,18 Q35,30 50,48 Q65,30 50,18'}
        fill={sail}
        stroke="#1e293b"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {/* Flag */}
      <line x1="50" y1="15" x2="50" y2="8" stroke="#78350f" strokeWidth="2" />
      <polygon
        points={faction === 'player' ? '50,8 62,13 50,16' : '50,8 38,13 50,16'}
        fill={faction === 'player' ? '#fbbf24' : '#9333ea'}
      />
      {/* Cannon ports */}
      <circle cx="28" cy="60" r="2" fill="#1e293b" />
      <circle cx="38" cy="60" r="2" fill="#1e293b" />
      <circle cx="50" cy="60" r="2" fill="#1e293b" />
      <circle cx="62" cy="60" r="2" fill="#1e293b" />
      <circle cx="72" cy="60" r="2" fill="#1e293b" />
    </svg>
  )
}

// ─── HP Bar ───────────────────────────────────────────────────────────────────

function HPBar({ current, max, showText = true }: { current: number; max: number; showText?: boolean }) {
  const pct = max > 0 ? Math.max(0, (current / max) * 100) : 0
  const color = pct > 60 ? 'bg-green-500' : pct > 30 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs text-center mt-0.5 text-gray-300 font-mono">
          {current}/{max} HP
        </div>
      )}
    </div>
  )
}

// ─── Ship Card (Setup) ───────────────────────────────────────────────────────

function ShipForm({
  faction,
  onAdd,
  editingShip,
  onUpdate,
  onCancelEdit,
}: {
  faction: ShipFaction
  onAdd: (ship: Ship) => void
  editingShip?: Ship | null
  onUpdate?: (ship: Ship) => void
  onCancelEdit?: () => void
}) {
  const [name, setName] = useState('')
  const [acStr, setAcStr] = useState('15')
  const [hpStr, setHpStr] = useState('100')
  const [cannonsStr, setCannonsStr] = useState('20')
  const [speedStr, setSpeedStr] = useState('30')
  const [crewStr, setCrewStr] = useState('20')
  const [damageStr, setDamageStr] = useState(getDamageNotation(20))
  const [damageIsAuto, setDamageIsAuto] = useState(true)
  const [abilities, setAbilities] = useState<ShipAbility[]>([])
  const [showAbilities, setShowAbilities] = useState(false)
  const [customAbilityName, setCustomAbilityName] = useState('')
  const [customAbilityDesc, setCustomAbilityDesc] = useState('')

  const acVal = Math.max(1, parseInt(acStr) || 0)
  const hpVal = Math.max(1, parseInt(hpStr) || 0)
  const cannonsVal = Math.max(1, parseInt(cannonsStr) || 1)
  const speedVal = Math.max(10, parseInt(speedStr) || 10)
  const crewVal = Math.max(0, parseInt(crewStr) || 0)

  useEffect(() => {
    if (editingShip) {
      setName(editingShip.name)
      setAcStr(String(editingShip.ac))
      setHpStr(String(editingShip.maxHP))
      setCannonsStr(String(editingShip.totalCannons))
      setSpeedStr(String(editingShip.speed))
      setCrewStr(String(editingShip.crew))
      if (editingShip.damageOverride) {
        setDamageStr(editingShip.damageOverride)
        setDamageIsAuto(false)
      } else {
        setDamageStr(getDamageNotation(editingShip.totalCannons))
        setDamageIsAuto(true)
      }
      setAbilities([...editingShip.abilities])
      setShowAbilities(editingShip.abilities.length > 0)
    }
  }, [editingShip])

  const resetForm = () => {
    setName('')
    setAcStr('15')
    setHpStr('100')
    setCannonsStr('20')
    setSpeedStr('30')
    setCrewStr('20')
    setDamageStr(getDamageNotation(20))
    setDamageIsAuto(true)
    setAbilities([])
    setShowAbilities(false)
    setCustomAbilityName('')
    setCustomAbilityDesc('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    const dmgOverride = damageIsAuto ? undefined : (damageStr.trim() || undefined)
    if (editingShip && onUpdate) {
      onUpdate({
        ...editingShip,
        name: name.trim(),
        ac: acVal,
        maxHP: hpVal,
        currentHP: hpVal,
        speed: speedVal,
        crew: crewVal,
        totalCannons: cannonsVal,
        functionalCannons: cannonsVal,
        damageOverride: dmgOverride,
        abilities: [...abilities],
      })
      resetForm()
      return
    }
    onAdd({
      id: createShipId(),
      name: name.trim(),
      faction,
      ac: acVal,
      maxHP: hpVal,
      currentHP: hpVal,
      speed: speedVal,
      crew: crewVal,
      totalCannons: cannonsVal,
      functionalCannons: cannonsVal,
      loadedCannons: 0,
      ammoType: 'ball',
      damageOverride: dmgOverride,
      abilities: [...abilities],
      status: 'active',
      repairTurnsRemaining: 0,
      conditions: [],
    })
    resetForm()
  }

  const toggleAbility = (ability: ShipAbility) => {
    setAbilities(prev =>
      prev.find(a => a.id === ability.id)
        ? prev.filter(a => a.id !== ability.id)
        : [...prev, ability]
    )
  }

  const addCustomAbility = () => {
    if (!customAbilityName.trim()) return
    setAbilities(prev => [...prev, {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: customAbilityName.trim(),
      description: customAbilityDesc.trim(),
    }])
    setCustomAbilityName('')
    setCustomAbilityDesc('')
  }

  const customAbilities = abilities.filter(a => !DEFAULT_ABILITIES.find(d => d.id === a.id))
  const inputClass = 'w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-dnd-gold focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className={`bg-gray-800 rounded-lg p-3 sm:p-4 border ${editingShip ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-gray-700'}`}>
      {editingShip && (
        <div className="text-xs text-blue-400 font-bold mb-2">Editing: {editingShip.name}</div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs text-gray-400 mb-1">Ship Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={faction === 'player' ? 'HMS Victory' : 'The Black Pearl'}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Armor Class</label>
          <input type="text" inputMode="numeric" value={acStr}
            onChange={e => setAcStr(e.target.value)}
            onBlur={e => setAcStr(String(Math.max(1, parseInt(e.target.value) || 15)))}
            className={inputClass} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Hit Points</label>
          <input type="text" inputMode="numeric" value={hpStr}
            onChange={e => setHpStr(e.target.value)}
            onBlur={e => setHpStr(String(Math.max(1, parseInt(e.target.value) || 100)))}
            className={inputClass} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Cannon Count</label>
          <input type="text" inputMode="numeric" value={cannonsStr}
            onChange={e => {
              setCannonsStr(e.target.value)
              if (damageIsAuto) {
                const n = Math.max(1, parseInt(e.target.value) || 1)
                setDamageStr(getDamageNotation(n))
              }
            }}
            onBlur={e => setCannonsStr(String(Math.max(1, parseInt(e.target.value) || 1)))}
            className={inputClass} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Speed (ft) <span className="text-cyan-500 text-[10px]">+{Math.floor(speedVal / 10)} init</span>
          </label>
          <input type="text" inputMode="numeric" value={speedStr}
            onChange={e => setSpeedStr(e.target.value)}
            onBlur={e => setSpeedStr(String(Math.max(10, parseInt(e.target.value) || 30)))}
            className={inputClass} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Crew Size</label>
          <input type="text" inputMode="numeric" value={crewStr}
            onChange={e => setCrewStr(e.target.value)}
            onBlur={e => setCrewStr(String(Math.max(0, parseInt(e.target.value) || 0)))}
            className={inputClass} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1 flex items-center gap-1">
            Damage
            {!damageIsAuto && (
              <button
                type="button"
                onClick={() => { setDamageIsAuto(true); setDamageStr(getDamageNotation(cannonsVal)) }}
                className="ml-1 text-[10px] text-cyan-400 hover:text-cyan-300 underline"
              >
                ↺ auto
              </button>
            )}
          </label>
          <input
            type="text"
            value={damageStr}
            onChange={e => { setDamageStr(e.target.value); setDamageIsAuto(false) }}
            placeholder={getDamageNotation(cannonsVal)}
            className={`${inputClass} font-mono ${damageIsAuto ? 'text-dnd-gold' : 'text-white'}`}
          />
          {damageIsAuto && (
            <div className="text-[10px] text-gray-600 mt-0.5">Auto from cannon count</div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={() => setShowAbilities(!showAbilities)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {showAbilities ? '▼' : '▶'} Ship Abilities ({abilities.length} selected)
        </button>
        {showAbilities && (
          <div className="mt-2 space-y-1">
            {DEFAULT_ABILITIES.map(ability => (
              <label key={ability.id} className="flex items-start gap-2 cursor-pointer p-1.5 rounded hover:bg-gray-700">
                <input
                  type="checkbox"
                  checked={abilities.some(a => a.id === ability.id)}
                  onChange={() => toggleAbility(ability)}
                  className="mt-0.5 accent-dnd-gold"
                />
                <div>
                  <span className="text-sm text-white font-medium">{ability.name}</span>
                  <p className="text-xs text-gray-400">{ability.description}</p>
                </div>
              </label>
            ))}

            {/* Custom abilities already added */}
            {customAbilities.length > 0 && (
              <div className="border-t border-gray-700 pt-2 mt-1">
                <div className="text-[10px] text-purple-400 uppercase tracking-wider mb-1">Custom Abilities</div>
                {customAbilities.map(a => (
                  <div key={a.id} className="flex items-start gap-2 p-1.5 rounded bg-purple-900/20 border border-purple-700/30 mb-1">
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-purple-300 font-medium">{a.name}</span>
                      {a.description && <p className="text-xs text-gray-400">{a.description}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => setAbilities(prev => prev.filter(x => x.id !== a.id))}
                      className="text-gray-600 hover:text-red-400 transition-colors text-xs flex-shrink-0 mt-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add custom ability */}
            <div className="border-t border-gray-700 pt-2 mt-1">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Add custom ability</div>
              <div className="flex gap-2 mb-1.5">
                <input
                  type="text"
                  value={customAbilityName}
                  onChange={e => setCustomAbilityName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomAbility() } }}
                  placeholder="Ability name..."
                  className="flex-1 bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomAbility}
                  disabled={!customAbilityName.trim()}
                  className="px-2 py-1 rounded text-xs font-bold bg-purple-900 text-purple-300 hover:bg-purple-800
                             disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  + Add
                </button>
              </div>
              <input
                type="text"
                value={customAbilityDesc}
                onChange={e => setCustomAbilityDesc(e.target.value)}
                placeholder="Description (optional)..."
                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 py-2 rounded font-bold text-sm transition-colors
                     bg-dnd-gold text-gray-900 hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {editingShip ? 'Save Changes' : `Add ${faction === 'player' ? 'Ally' : 'Enemy'} Ship`}
        </button>
        {editingShip && onCancelEdit && (
          <button
            type="button"
            onClick={() => { resetForm(); onCancelEdit() }}
            className="px-4 py-2 rounded font-bold text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

function SetupShipCard({ ship, onRemove, onEdit, onDuplicate }: {
  ship: Ship
  onRemove: () => void
  onEdit: () => void
  onDuplicate: () => void
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${
      ship.faction === 'player'
        ? 'bg-blue-900/20 border-blue-700/50'
        : 'bg-red-900/20 border-red-700/50'
    }`}>
      <ShipSVG faction={ship.faction} size={50} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-sm truncate">{ship.name}</div>
        <div className="text-xs text-gray-400">
          AC {ship.ac} | HP {ship.maxHP} | {ship.totalCannons} cannons ({ship.damageOverride || getDamageNotation(ship.totalCannons)}) | Spd {ship.speed}ft{ship.crew > 0 ? ` | Crew ${ship.crew}` : ''}
        </div>
        {ship.abilities.length > 0 && (
          <div className="text-xs text-purple-400 mt-0.5">
            {ship.abilities.map(a => a.name).join(', ')}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onEdit} className="text-gray-500 hover:text-blue-400 transition-colors p-1" title="Edit ship">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={onDuplicate} className="text-gray-500 hover:text-green-400 transition-colors p-1" title="Duplicate ship">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button onClick={onRemove} className="text-gray-500 hover:text-red-400 transition-colors p-1" title="Remove ship">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Battle Visualization ────────────────────────────────────────────────────

function BattleScene({
  ships,
  projectiles,
  currentShipId,
}: {
  ships: Ship[]
  projectiles: Projectile[]
  currentShipId: string | null
}) {
  const playerShips = ships.filter(s => s.faction === 'player')
  const enemyShips = ships.filter(s => s.faction === 'enemy')
  const shipRefs = useRef<Record<string, HTMLDivElement | null>>({})

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-700"
         style={{ minHeight: '200px', background: 'linear-gradient(180deg, #0c4a6e 0%, #164e63 30%, #155e75 60%, #0e7490 100%)' }}>
      {/* Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[200%] bottom-0 left-0" style={{ height: '60px' }}>
          <svg viewBox="0 0 1200 60" className="w-full h-full opacity-20 animate-wave-slow">
            <path d="M0,30 Q150,10 300,30 Q450,50 600,30 Q750,10 900,30 Q1050,50 1200,30 L1200,60 L0,60 Z" fill="#67e8f9" />
          </svg>
        </div>
        <div className="absolute w-[200%] bottom-0 left-0" style={{ height: '40px' }}>
          <svg viewBox="0 0 1200 40" className="w-full h-full opacity-15 animate-wave-fast">
            <path d="M0,20 Q150,5 300,20 Q450,35 600,20 Q750,5 900,20 Q1050,35 1200,20 L1200,40 L0,40 Z" fill="#a5f3fc" />
          </svg>
        </div>
      </div>

      {/* Ships */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-stretch sm:items-start px-3 sm:px-4 pt-3 sm:pt-4 pb-2 gap-3 sm:gap-4">
        {/* Player Fleet */}
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider text-center mb-1">Ally Fleet</div>
          {playerShips.map(ship => (
            <div
              key={ship.id}
              ref={el => { shipRefs.current[ship.id] = el }}
              className={`relative p-2 rounded-lg border transition-all duration-300 ${
                ship.currentHP <= 0
                  ? 'bg-gray-900/60 border-gray-700 opacity-50'
                  : currentShipId === ship.id
                    ? 'bg-blue-900/50 border-blue-400 ring-2 ring-blue-400/50'
                    : 'bg-gray-900/40 border-blue-700/40'
              }`}
            >
              {ship.conditions.includes('on_fire') && (
                <div className="absolute -top-2 -right-2 text-lg animate-pulse">🔥</div>
              )}
              {ship.conditions.includes('taking_water') && (
                <div className="absolute -bottom-2 -right-2 text-lg animate-bounce">🌊</div>
              )}
              {ship.status === 'repairing' && (
                <div className="absolute -top-2 -left-2 text-lg animate-spin-slow">🔧</div>
              )}
              <div className="flex items-center gap-2">
                <ShipSVG faction="player" size={48} sinking={ship.currentHP <= 0} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{ship.name}</div>
                  <HPBar current={ship.currentHP} max={ship.maxHP} />
                  <div className="flex gap-1 mt-1 flex-wrap">
                    <span className="text-[10px] bg-gray-800 px-1 rounded text-gray-300">AC {getACWithConditions(ship)}</span>
                    <span className="text-[10px] bg-gray-800 px-1 rounded text-cyan-300">
                      {ship.functionalCannons}/{ship.totalCannons} guns
                    </span>
                    <span className="text-[10px] bg-gray-800 px-1 rounded text-green-300">
                      {ship.speed}ft
                    </span>
                    {ship.conditions.map(c => (
                      <span key={c} className={`text-[10px] ${CONDITION_LABELS[c].color}`}>
                        {CONDITION_LABELS[c].icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Battle Area */}
        <div className="flex sm:flex-col items-center justify-center px-2 py-2 sm:py-8 sm:min-w-[80px]">
          <div className="text-2xl sm:text-4xl sm:mb-2 mr-2 sm:mr-0">⚔️</div>
          <div className="text-xs text-gray-300 font-bold uppercase tracking-widest">VS</div>
          {projectiles.length > 0 && (
            <div className="ml-2 sm:ml-0 sm:mt-2 text-xl sm:text-2xl animate-bounce">💥</div>
          )}
        </div>

        {/* Enemy Fleet */}
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          <div className="text-xs font-bold text-red-300 uppercase tracking-wider text-center mb-1">Enemy Fleet</div>
          {enemyShips.map(ship => (
            <div
              key={ship.id}
              ref={el => { shipRefs.current[ship.id] = el }}
              className={`relative p-2 rounded-lg border transition-all duration-300 ${
                ship.currentHP <= 0
                  ? 'bg-gray-900/60 border-gray-700 opacity-50'
                  : currentShipId === ship.id
                    ? 'bg-red-900/50 border-red-400 ring-2 ring-red-400/50'
                    : 'bg-gray-900/40 border-red-700/40'
              }`}
            >
              {ship.conditions.includes('on_fire') && (
                <div className="absolute -top-2 -right-2 text-lg animate-pulse">🔥</div>
              )}
              {ship.conditions.includes('taking_water') && (
                <div className="absolute -bottom-2 -right-2 text-lg animate-bounce">🌊</div>
              )}
              {ship.status === 'repairing' && (
                <div className="absolute -top-2 -left-2 text-lg animate-spin-slow">🔧</div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0 text-right">
                  <div className="text-xs font-bold text-white truncate">{ship.name}</div>
                  <HPBar current={ship.currentHP} max={ship.maxHP} />
                  <div className="flex gap-1 mt-1 flex-wrap justify-end">
                    <span className="text-[10px] bg-gray-800 px-1 rounded text-gray-300">AC {getACWithConditions(ship)}</span>
                    <span className="text-[10px] bg-gray-800 px-1 rounded text-cyan-300">
                      {ship.functionalCannons}/{ship.totalCannons} guns
                    </span>
                    <span className="text-[10px] bg-gray-800 px-1 rounded text-green-300">
                      {ship.speed}ft
                    </span>
                    {ship.conditions.map(c => (
                      <span key={c} className={`text-[10px] ${CONDITION_LABELS[c].color}`}>
                        {CONDITION_LABELS[c].icon}
                      </span>
                    ))}
                  </div>
                </div>
                <ShipSVG faction="enemy" size={48} sinking={ship.currentHP <= 0} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-fast {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }
        .animate-wave-slow { animation: wave-slow 8s linear infinite; }
        .animate-wave-fast { animation: wave-fast 5s linear infinite; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
      `}</style>
    </div>
  )
}

// ─── Battle Log ──────────────────────────────────────────────────────────────

function BattleLog({ entries }: { entries: BattleLogEntry[] }) {
  const logRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [entries.length])

  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm py-8">
        Battle log will appear here...
      </div>
    )
  }

  return (
    <div ref={logRef} className="space-y-1 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
      {entries.map(entry => (
        <div key={entry.id} className={`text-xs py-1 border-b border-gray-800 ${LOG_COLORS[entry.type]}`}>
          <span className="text-gray-600 font-mono mr-1">R{entry.round}</span>
          <span className="font-bold">{entry.shipName}</span>
          {entry.targetShipName && <span className="text-gray-500"> → {entry.targetShipName}</span>}
          <span className="ml-1">{entry.message}</span>
          {entry.rolls && entry.rolls.length > 0 && (
            <span className="ml-1 text-gray-500">
              [{entry.rolls.map(r => `${r.notation}: ${r.result}`).join(', ')}]
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Turn Phase Indicator ────────────────────────────────────────────────────

function PhaseIndicator({ phase }: { phase: CombatTurnPhase }) {
  const phases: { key: CombatTurnPhase; label: string; icon: string }[] = [
    { key: 'reload', label: 'Reload', icon: '🔄' },
    { key: 'load', label: 'Load', icon: '💣' },
    { key: 'aim', label: 'Aim', icon: '🎯' },
    { key: 'fire', label: 'Fire!', icon: '💥' },
    { key: 'resolve', label: 'Resolve', icon: '📊' },
    { key: 'dm_actions', label: 'DM', icon: '🎭' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1">
      {phases.map((p, i) => (
        <div key={p.key} className="flex items-center">
          <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-bold transition-all ${
            p.key === phase
              ? 'bg-dnd-gold text-gray-900 scale-110'
              : phases.findIndex(x => x.key === phase) > i
                ? 'bg-green-800 text-green-300'
                : 'bg-gray-800 text-gray-500'
          }`}>
            <span className="hidden sm:inline">{p.icon} </span>{p.label}
          </div>
          {i < phases.length - 1 && <span className="text-gray-600 mx-0.5 hidden sm:inline">›</span>}
        </div>
      ))}
    </div>
  )
}

// ─── Fleet Loadouts ─────────────────────────────────────────────────────────

interface ShipTemplate {
  name: string
  ac: number
  maxHP: number
  speed: number
  crew: number
  totalCannons: number
  damageOverride?: string
  abilities: ShipAbility[]
}

interface FleetLoadout {
  id: string
  name: string
  faction: ShipFaction
  ships: ShipTemplate[]
  savedAt: number
}

const LOADOUT_STORAGE_KEY = 'dungeons-naval-loadouts'

function loadSavedLoadouts(): FleetLoadout[] {
  try {
    const raw = localStorage.getItem(LOADOUT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistLoadouts(loadouts: FleetLoadout[]) {
  localStorage.setItem(LOADOUT_STORAGE_KEY, JSON.stringify(loadouts))
}

function FleetLoadoutPanel({
  faction,
  currentShips,
  onLoadFleet,
  loadouts,
  onSaveLoadout,
  onDeleteLoadout,
  onOverwriteLoadout,
}: {
  faction: ShipFaction
  currentShips: Ship[]
  onLoadFleet: (ships: ShipTemplate[], faction: ShipFaction) => void
  loadouts: FleetLoadout[]
  onSaveLoadout: (loadout: FleetLoadout) => void
  onDeleteLoadout: (id: string) => void
  onOverwriteLoadout: (id: string) => void
}) {
  const [saving, setSaving] = useState(false)
  const [saveName, setSaveName] = useState('')

  const factionLoadouts = loadouts.filter(l => l.faction === faction)
  const factionLabel = faction === 'player' ? 'Ally' : 'Enemy'

  const handleSave = () => {
    if (!saveName.trim() || currentShips.length === 0) return
    onSaveLoadout({
      id: `loadout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: saveName.trim(),
      faction,
      ships: currentShips.map(s => ({
        name: s.name,
        ac: s.ac,
        maxHP: s.maxHP,
        speed: s.speed,
        crew: s.crew,
        totalCannons: s.totalCannons,
        damageOverride: s.damageOverride,
        abilities: [...s.abilities],
      })),
      savedAt: Date.now(),
    })
    setSaveName('')
    setSaving(false)
  }

  const handleLoad = (loadout: FleetLoadout) => {
    onLoadFleet(loadout.ships, faction)
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Saved {factionLabel} Fleets</h4>
        {currentShips.length > 0 && !saving && (
          <button
            onClick={() => setSaving(true)}
            className="text-xs px-2 py-1 rounded bg-gray-700 text-dnd-gold hover:bg-gray-600 transition-colors"
          >
            Save Current Fleet
          </button>
        )}
      </div>

      {saving && (
        <div className="flex gap-2">
          <input
            type="text"
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setSaving(false) }}
            placeholder="Fleet name..."
            autoFocus
            className="flex-1 bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-xs
                       focus:border-dnd-gold focus:outline-none"
          />
          <button
            onClick={handleSave}
            disabled={!saveName.trim()}
            className="px-2 py-1 rounded text-xs font-bold bg-dnd-gold text-gray-900 hover:bg-yellow-400
                       disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => { setSaving(false); setSaveName('') }}
            className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {factionLoadouts.length === 0 && !saving && (
        <div className="text-xs text-gray-600 text-center py-2">No saved fleets</div>
      )}

      {factionLoadouts.map(loadout => (
        <div key={loadout.id} className="flex items-center gap-2 bg-gray-900/50 rounded px-2 py-1.5">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{loadout.name}</div>
            <div className="text-[10px] text-gray-500">
              {loadout.ships.length} ship{loadout.ships.length !== 1 ? 's' : ''}: {loadout.ships.map(s => s.name).join(', ')}
            </div>
          </div>
          <button
            onClick={() => handleLoad(loadout)}
            className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/50 text-green-400 hover:bg-green-800 transition-colors whitespace-nowrap"
          >
            Load
          </button>
          {currentShips.length > 0 && (
            <button
              onClick={() => onOverwriteLoadout(loadout.id)}
              className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/50 text-blue-400 hover:bg-blue-800 transition-colors whitespace-nowrap"
              title="Overwrite this loadout with the current fleet"
            >
              Update
            </button>
          )}
          <button
            onClick={() => onDeleteLoadout(loadout.id)}
            className="text-gray-600 hover:text-red-400 transition-colors p-0.5"
            title="Delete loadout"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function NavalCombat() {
  // State
  const [ships, setShips] = useState<Ship[]>([])
  const [phase, setPhase] = useState<'setup' | 'combat' | 'finished'>('setup')
  const [turnOrder, setTurnOrder] = useState<string[]>([])
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [round, setRound] = useState(1)
  const [turnPhase, setTurnPhase] = useState<CombatTurnPhase>('reload')
  const [battleLog, setBattleLog] = useState<BattleLogEntry[]>([])
  const [projectiles, setProjectiles] = useState<Projectile[]>([])
  const [victor, setVictor] = useState<ShipFaction | null>(null)

  const projectileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (projectileTimerRef.current) clearTimeout(projectileTimerRef.current)
    }
  }, [])

  // Turn state
  const [reloadResult, setReloadResult] = useState<{ roll: number; functional: number; fumble: boolean; critical: boolean } | null>(null)
  const [cannonsToLoad, setCannonsToLoad] = useState(0)
  const [selectedAmmo, setSelectedAmmo] = useState<AmmoType>('ball')
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
  const [hitResult, setHitResult] = useState<{ roll: number; total: number; hit: boolean; critical: boolean; fumble: boolean } | null>(null)
  const [damageResult, setDamageResult] = useState<{ total: number; hullDamage: number; notation: string; rolls: number[]; conditionApplied: ShipCondition | null } | null>(null)

  const currentShipId = turnOrder[currentTurnIndex] ?? null
  const currentShip = ships.find(s => s.id === currentShipId) ?? null

  const addLog = useCallback((
    shipId: string,
    shipName: string,
    message: string,
    type: BattleLogEntry['type'],
    extra?: Partial<BattleLogEntry>,
  ) => {
    setBattleLog(prev => [...prev, {
      id: createLogId(),
      round,
      shipId,
      shipName,
      message,
      type,
      timestamp: Date.now(),
      ...extra,
    }])
  }, [round])

  // ── Loadout Management ───────────────────────────────────────────────────

  const [loadouts, setLoadouts] = useState<FleetLoadout[]>(loadSavedLoadouts)

  const saveLoadout = (loadout: FleetLoadout) => {
    const updated = [...loadouts, loadout]
    setLoadouts(updated)
    persistLoadouts(updated)
  }

  const deleteLoadout = (id: string) => {
    const updated = loadouts.filter(l => l.id !== id)
    setLoadouts(updated)
    persistLoadouts(updated)
  }

  const overwriteLoadout = (id: string, faction: ShipFaction) => {
    const currentShips = ships.filter(s => s.faction === faction)
    if (currentShips.length === 0) return
    const updated = loadouts.map(l =>
      l.id === id
        ? {
            ...l,
            ships: currentShips.map(s => ({
              name: s.name,
              ac: s.ac,
              maxHP: s.maxHP,
              speed: s.speed,
              crew: s.crew,
              totalCannons: s.totalCannons,
              damageOverride: s.damageOverride,
              abilities: [...s.abilities],
            })),
            savedAt: Date.now(),
          }
        : l
    )
    setLoadouts(updated)
    persistLoadouts(updated)
  }

  // ── Ship Management ──────────────────────────────────────────────────────

  const [editingShip, setEditingShip] = useState<Ship | null>(null)

  const addShip = (ship: Ship) => setShips(prev => [...prev, ship])
  const removeShip = (id: string) => setShips(prev => prev.filter(s => s.id !== id))
  const updateShip = (ship: Ship) => {
    setShips(prev => prev.map(s => s.id === ship.id ? ship : s))
    setEditingShip(null)
  }
  const duplicateShip = (ship: Ship) => {
    setShips(prev => [...prev, { ...ship, id: createShipId(), name: `${ship.name} (Copy)` }])
  }
  const loadFleet = (templates: ShipTemplate[], faction: ShipFaction) => {
    const newShips: Ship[] = templates.map(t => ({
      id: createShipId(),
      name: t.name,
      faction,
      ac: t.ac,
      maxHP: t.maxHP,
      currentHP: t.maxHP,
      speed: t.speed ?? 30,
      crew: t.crew ?? 0,
      totalCannons: t.totalCannons,
      functionalCannons: t.totalCannons,
      loadedCannons: 0,
      ammoType: 'ball' as const,
      damageOverride: t.damageOverride,
      abilities: [...t.abilities],
      status: 'active' as const,
      repairTurnsRemaining: 0,
      conditions: [],
    }))
    setShips(prev => [...prev.filter(s => s.faction !== faction), ...newShips])
  }

  // ── Start Battle ─────────────────────────────────────────────────────────

  const startBattle = () => {
    const order = buildTurnOrder(ships)
    setTurnOrder(order)
    setCurrentTurnIndex(0)
    setRound(1)
    setPhase('combat')
    setTurnPhase('reload')
    setProjectiles([])
    setBattleLog([{
      id: createLogId(), round: 1, shipId: 'system', shipName: 'Battle',
      message: 'Naval combat begins! All hands to battle stations!', type: 'info', timestamp: Date.now(),
    }])
  }

  // ── Combat Actions ───────────────────────────────────────────────────────

  const handleReload = () => {
    if (!currentShip) return

    // Clear bracing from this ship's previous turn
    if (currentShip.conditions.includes('bracing')) {
      setShips(prev => prev.map(s =>
        s.id === currentShip.id
          ? { ...s, conditions: s.conditions.filter(c => c !== ('bracing')) }
          : s
      ))
    }

    // Track effective HP through this function to avoid stale-closure reads
    let effectiveHP = currentShip.currentHP

    // Apply condition effects first
    const conditionEffects = applyConditionEffects(currentShip)
    if (conditionEffects.damage > 0) {
      effectiveHP = Math.max(0, effectiveHP - conditionEffects.damage)
      setShips(prev => prev.map(s =>
        s.id === currentShip.id
          ? {
              ...s,
              currentHP: Math.max(0, s.currentHP - conditionEffects.damage),
              conditions: s.conditions.filter(c => !conditionEffects.removedConditions.includes(c)),
              status: Math.max(0, s.currentHP - conditionEffects.damage) <= 0 ? 'sunk' as const : s.status,
            }
          : s
      ))
      conditionEffects.messages.forEach(msg => {
        addLog(currentShip.id, currentShip.name, msg, 'status')
      })
    }

    // Ship killed by condition damage — skip
    if (effectiveHP <= 0) {
      addLog(currentShip.id, currentShip.name, `${currentShip.name} has been sunk by condition damage!`, 'damage')
      advanceTurn()
      return
    }

    // Handle repairing ships
    if (currentShip.status === 'repairing') {
      const remaining = currentShip.repairTurnsRemaining - 1
      if (remaining <= 0) {
        const repair = rollRepairResult()
        setShips(prev => prev.map(s =>
          s.id === currentShip.id
            ? { ...s, status: 'active', repairTurnsRemaining: 0, currentHP: Math.min(s.maxHP, s.currentHP + repair.healAmount) }
            : s
        ))
        const healed = Math.min(repair.healAmount, currentShip.maxHP - effectiveHP)
        addLog(currentShip.id, currentShip.name,
          `Repairs complete! Rolled ${repair.roll} — restored ${healed} HP`,
          'heal',
          { rolls: [{ notation: '1d20', result: repair.roll, details: `+${repair.healAmount} HP` }] },
        )
      } else {
        setShips(prev => prev.map(s =>
          s.id === currentShip.id ? { ...s, repairTurnsRemaining: remaining } : s
        ))
        addLog(currentShip.id, currentShip.name, `Still repairing... ${remaining} turn(s) remaining`, 'repair')
      }
      advanceTurn()
      return
    }

    // Sunk or dead ship — skip
    if (currentShip.currentHP <= 0) {
      addLog(currentShip.id, currentShip.name, 'Ship is sunk — skipping turn', 'status')
      advanceTurn()
      return
    }

    const result = rollReload(currentShip.totalCannons)
    const adjusted = getFunctionalCannonsWithConditions(result.functionalCannons, currentShip.conditions)

    setReloadResult({ roll: result.roll, functional: adjusted, fumble: result.fumble, critical: result.critical })
    setCannonsToLoad(adjusted)
    setSelectedAmmo('ball')
    setSelectedTarget(null)
    setHitResult(null)
    setDamageResult(null)

    setShips(prev => prev.map(s =>
      s.id === currentShip.id ? { ...s, functionalCannons: adjusted } : s
    ))

    if (result.fumble) {
      addLog(currentShip.id, currentShip.name,
        `FUMBLE! Chaotic reload — only ${adjusted} cannons functional (rolled ${result.roll})`,
        'fumble',
        { rolls: [{ notation: '1d20', result: result.roll }] },
      )
    } else if (result.critical) {
      addLog(currentShip.id, currentShip.name,
        `PERFECT reload! All ${adjusted} cannons ready and crew is inspired!`,
        'critical',
        { rolls: [{ notation: '1d20', result: result.roll }] },
      )
    } else {
      addLog(currentShip.id, currentShip.name,
        `Reload: ${adjusted} of ${currentShip.totalCannons} cannons functional`,
        'reload',
        { rolls: [{ notation: '1d20', result: result.roll }] },
      )
    }

    setTurnPhase('load')
  }

  const handleConfirmLoad = () => {
    setTurnPhase('aim')
  }

  const handleFire = () => {
    if (!currentShip || !selectedTarget) return
    const target = ships.find(s => s.id === selectedTarget)
    if (!target) return

    const targetAC = getACWithConditions(target)
    const bonus = reloadResult?.critical ? 2 : 0
    const result = rollToHit(targetAC, bonus)
    setHitResult(result)

    if (result.hit) {
      const dmg = rollCannonDamage(cannonsToLoad, selectedAmmo, result.critical, currentShip.damageOverride)
      setDamageResult(dmg)

      setShips(prev => prev.map(s => {
        if (s.id === selectedTarget) {
          const newConditions = [...s.conditions]
          if (dmg.conditionApplied && !newConditions.includes(dmg.conditionApplied)) {
            newConditions.push(dmg.conditionApplied)
          }
          return {
            ...s,
            currentHP: Math.max(0, s.currentHP - dmg.hullDamage),
            conditions: newConditions,
            status: Math.max(0, s.currentHP - dmg.hullDamage) <= 0 ? 'sunk' as const : s.status,
          }
        }
        return s
      }))

      setProjectiles([{
        id: createLogId(),
        fromShipId: currentShip.id,
        toShipId: selectedTarget,
        ammoType: selectedAmmo,
        hit: true,
        damage: dmg.hullDamage,
        startTime: Date.now(),
      }])
      if (projectileTimerRef.current) clearTimeout(projectileTimerRef.current)
      projectileTimerRef.current = setTimeout(() => setProjectiles([]), 1500)

      const critText = result.critical ? 'CRITICAL HIT! ' : ''
      const chainText = selectedAmmo === 'chain'
        ? ` (Chain shot: ${dmg.hullDamage} hull damage${dmg.conditionApplied ? ` + ${CONDITION_LABELS[dmg.conditionApplied].label}` : ''})`
        : ''
      addLog(currentShip.id, currentShip.name,
        `${critText}HIT! ${cannonsToLoad} cannons fire ${selectedAmmo === 'chain' ? 'chain shot' : 'cannonballs'} at ${target.name} for ${dmg.hullDamage} damage!${chainText}`,
        result.critical ? 'critical' : 'attack',
        {
          rolls: [
            { notation: '1d20', result: result.roll, details: `vs AC ${targetAC}` },
            { notation: dmg.notation, result: dmg.total, details: `[${dmg.rolls.join(', ')}]` },
          ],
          damage: dmg.hullDamage,
          targetShipName: target.name,
        },
      )

      if (target.currentHP - dmg.hullDamage <= 0) {
        addLog(selectedTarget, target.name, `${target.name} has been sunk!`, 'damage')
      }
    } else {
      setProjectiles([{
        id: createLogId(),
        fromShipId: currentShip.id,
        toShipId: selectedTarget,
        ammoType: selectedAmmo,
        hit: false,
        damage: 0,
        startTime: Date.now(),
      }])
      if (projectileTimerRef.current) clearTimeout(projectileTimerRef.current)
      projectileTimerRef.current = setTimeout(() => setProjectiles([]), 1500)

      const fumbleText = result.fumble ? 'FUMBLE! ' : ''
      addLog(currentShip.id, currentShip.name,
        `${fumbleText}MISS! Cannonballs splash harmlessly past ${target.name}`,
        result.fumble ? 'fumble' : 'miss',
        {
          rolls: [{ notation: '1d20', result: result.roll, details: `vs AC ${targetAC}` }],
          targetShipName: target.name,
        },
      )
    }

    setTurnPhase('resolve')
  }

  const shipsRef = useRef(ships)
  shipsRef.current = ships

  const advanceTurn = useCallback(() => {
    setReloadResult(null)
    setHitResult(null)
    setDamageResult(null)
    setCannonsToLoad(0)
    setSelectedTarget(null)

    // Use ref to read current ships (avoids stale closure)
    const currentShips = shipsRef.current

    // Check victory
    if (isFleetDefeated(currentShips, 'enemy')) {
      setVictor('player')
      setPhase('finished')
      setBattleLog(prev => [...prev, {
        id: createLogId(), round: 0, shipId: 'system', shipName: 'Battle',
        message: 'VICTORY! The enemy fleet has been destroyed!', type: 'info', timestamp: Date.now(),
      }])
      return
    }
    if (isFleetDefeated(currentShips, 'player')) {
      setVictor('enemy')
      setPhase('finished')
      setBattleLog(prev => [...prev, {
        id: createLogId(), round: 0, shipId: 'system', shipName: 'Battle',
        message: 'DEFEAT! Your fleet has been destroyed...', type: 'info', timestamp: Date.now(),
      }])
      return
    }

    let nextIndex = currentTurnIndex + 1
    let nextRound = round
    if (nextIndex >= turnOrder.length) {
      nextIndex = 0
      nextRound += 1
    }

    // Skip sunk ships
    let attempts = 0
    while (attempts < turnOrder.length) {
      const nextShip = currentShips.find(s => s.id === turnOrder[nextIndex])
      if (nextShip && nextShip.currentHP > 0 && nextShip.status !== 'sunk') break
      nextIndex++
      if (nextIndex >= turnOrder.length) {
        nextIndex = 0
        nextRound += 1
      }
      attempts++
    }

    setCurrentTurnIndex(nextIndex)
    setRound(nextRound)
    setTurnPhase('reload')
  }, [currentTurnIndex, turnOrder, round])

  const handleEndTurn = () => {
    setTurnPhase('dm_actions')
  }

  const handleNextTurn = () => {
    advanceTurn()
  }

  // ── DM Actions ───────────────────────────────────────────────────────────

  const applyCondition = (shipId: string, condition: ShipCondition) => {
    const ship = ships.find(s => s.id === shipId)
    if (!ship) return
    setShips(prev => prev.map(s =>
      s.id === shipId && !s.conditions.includes(condition)
        ? { ...s, conditions: [...s.conditions, condition] }
        : s
    ))
    addLog(shipId, ship.name, `${CONDITION_LABELS[condition].icon} ${CONDITION_LABELS[condition].label} applied!`, 'status')
  }

  const removeCondition = (shipId: string, condition: ShipCondition) => {
    setShips(prev => prev.map(s =>
      s.id === shipId ? { ...s, conditions: s.conditions.filter(c => c !== condition) } : s
    ))
  }

  const startRepair = (shipId: string) => {
    const ship = ships.find(s => s.id === shipId)
    if (!ship || ship.status === 'repairing') return
    const duration = rollRepairDuration()
    setShips(prev => prev.map(s =>
      s.id === shipId ? { ...s, status: 'repairing', repairTurnsRemaining: duration.turns } : s
    ))
    addLog(shipId, ship.name,
      `Beginning repairs! Will take ${duration.turns} turn(s) (rolled ${duration.roll} on 1d4). Cannot fire during repairs.`,
      'repair',
      { rolls: [{ notation: '1d4', result: duration.roll }] },
    )
  }

  const dmHealShip = (shipId: string, amount: number) => {
    const ship = ships.find(s => s.id === shipId)
    if (!ship) return
    const healed = Math.min(amount, ship.maxHP - ship.currentHP)
    setShips(prev => prev.map(s =>
      s.id === shipId ? { ...s, currentHP: Math.min(s.maxHP, s.currentHP + amount) } : s
    ))
    addLog(shipId, ship.name, `DM heals ${healed} HP`, 'heal')
  }

  const dmDamageShip = (shipId: string, amount: number) => {
    const ship = ships.find(s => s.id === shipId)
    if (!ship) return
    setShips(prev => prev.map(s =>
      s.id === shipId ? {
        ...s,
        currentHP: Math.max(0, s.currentHP - amount),
        status: Math.max(0, s.currentHP - amount) <= 0 ? 'sunk' as const : s.status,
      } : s
    ))
    addLog(shipId, ship.name, `DM deals ${amount} damage`, 'damage', { damage: amount })
  }

  const handleAbility = (shipId: string, ability: ShipAbility, targetId?: string) => {
    const ship = ships.find(s => s.id === shipId)
    const target = targetId ? ships.find(s => s.id === targetId) : null
    if (!ship) return

    switch (ability.id) {
      case 'ram': {
        if (!target) return
        const ramDmg = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 2
        const selfDmg = Math.floor(Math.random() * 6) + 1
        setShips(prev => prev.map(s => {
          if (s.id === targetId) return { ...s, currentHP: Math.max(0, s.currentHP - ramDmg) }
          if (s.id === shipId) return { ...s, currentHP: Math.max(0, s.currentHP - selfDmg) }
          return s
        }))
        addLog(shipId, ship.name, `RAMS ${target.name} for ${ramDmg} damage! (takes ${selfDmg} self damage)`, 'ability', {
          damage: ramDmg, targetShipName: target.name,
        })
        break
      }
      case 'greek-fire': {
        if (!target) return
        applyCondition(targetId!, 'on_fire')
        addLog(shipId, ship.name, `Launches Greek Fire at ${target.name}!`, 'ability', { targetShipName: target.name })
        break
      }
      case 'brace': {
        if (!ship.conditions.includes('bracing')) {
          setShips(prev => prev.map(s =>
            s.id === shipId ? { ...s, conditions: [...s.conditions, 'bracing'] } : s
          ))
        }
        addLog(shipId, ship.name, 'Braces for impact! +2 AC until next turn', 'ability')
        break
      }
      case 'boarding': {
        if (!target) return
        const attackRoll = Math.floor(Math.random() * 20) + 1
        const defendRoll = Math.floor(Math.random() * 20) + 1
        const success = attackRoll > defendRoll
        addLog(shipId, ship.name,
          `Sends boarding party to ${target.name}! Attack: ${attackRoll} vs Defense: ${defendRoll} — ${success ? 'SUCCESS! Enemy crew captured!' : 'FAILED! Boarding party repelled!'}`,
          success ? 'critical' : 'fumble',
          { targetShipName: target.name },
        )
        if (success) {
          setShips(prev => prev.map(s =>
            s.id === targetId && !s.conditions.includes('crew_swept')
              ? { ...s, conditions: [...s.conditions, 'crew_swept'] }
              : s
          ))
        }
        break
      }
      case 'harpoon': {
        if (!target) return
        const harpoonHit = rollToHit(getACWithConditions(target))
        if (harpoonHit.hit) {
          const dmg = Math.floor(Math.random() * 8) + 1
          setShips(prev => prev.map(s => {
            if (s.id === targetId) {
              const newConds = [...s.conditions]
              if (!newConds.includes('mast_damaged')) newConds.push('mast_damaged')
              return { ...s, currentHP: Math.max(0, s.currentHP - dmg), conditions: newConds, status: Math.max(0, s.currentHP - dmg) <= 0 ? 'sunk' as const : s.status }
            }
            return s
          }))
          addLog(shipId, ship.name, `Harpoon Shot HITS ${target.name} for ${dmg} damage! Target entangled (Mast Damaged)`, 'ability', {
            damage: dmg, targetShipName: target.name,
            rolls: [{ notation: '1d20', result: harpoonHit.roll, details: `vs AC ${getACWithConditions(target)}` }, { notation: '1d8', result: dmg }],
          })
        } else {
          addLog(shipId, ship.name, `Harpoon Shot misses ${target.name}! (rolled ${harpoonHit.roll})`, 'miss', { targetShipName: target.name })
        }
        break
      }
      case 'fore-cannons': {
        if (!target) return
        const foreHit = rollToHit(getACWithConditions(target), 2)
        if (foreHit.hit) {
          const dmg = Math.floor(Math.random() * 10) + 1
          setShips(prev => prev.map(s =>
            s.id === targetId ? { ...s, currentHP: Math.max(0, s.currentHP - dmg), status: Math.max(0, s.currentHP - dmg) <= 0 ? 'sunk' as const : s.status } : s
          ))
          addLog(shipId, ship.name, `Fore Cannons HITS ${target.name} for ${dmg} damage! (bow chasers, no reload required)`, 'ability', {
            damage: dmg, targetShipName: target.name,
            rolls: [{ notation: '1d20+2', result: foreHit.total, details: `vs AC ${getACWithConditions(target)}` }, { notation: '1d10', result: dmg }],
          })
        } else {
          addLog(shipId, ship.name, `Fore Cannons miss ${target.name}! (rolled ${foreHit.roll}+2=${foreHit.total})`, 'miss', { targetShipName: target.name })
        }
        break
      }
      case 'aft-cannons': {
        if (!target) return
        setShips(prev => prev.map(s =>
          s.id === shipId && !s.conditions.includes('bracing')
            ? { ...s, conditions: [...s.conditions, 'bracing'] }
            : s
        ))
        const aftHit = rollToHit(getACWithConditions(target))
        if (aftHit.hit) {
          const dmg = Math.floor(Math.random() * 8) + 1
          setShips(prev => prev.map(s =>
            s.id === targetId ? { ...s, currentHP: Math.max(0, s.currentHP - dmg), status: Math.max(0, s.currentHP - dmg) <= 0 ? 'sunk' as const : s.status } : s
          ))
          addLog(shipId, ship.name, `Aft Cannons HITS ${target.name} for ${dmg} damage while retreating! (+2 AC until next turn)`, 'ability', {
            damage: dmg, targetShipName: target.name,
            rolls: [{ notation: '1d20', result: aftHit.roll, details: `vs AC ${getACWithConditions(target)}` }, { notation: '1d8', result: dmg }],
          })
        } else {
          addLog(shipId, ship.name, `Aft Cannons miss ${target.name}! Retreating with +2 AC. (rolled ${aftHit.roll})`, 'miss', { targetShipName: target.name })
        }
        break
      }
      case 'smoke-screen': {
        setShips(prev => prev.map(s =>
          s.id === shipId && !s.conditions.includes('bracing')
            ? { ...s, conditions: [...s.conditions, 'bracing'] }
            : s
        ))
        addLog(shipId, ship.name, 'Deploys smoke screen! Attackers suffer -2 to hit this ship (+2 AC) until next turn', 'ability')
        break
      }
      case 'grapeshot': {
        if (!target) return
        const grapeHit = rollToHit(getACWithConditions(target))
        if (grapeHit.hit) {
          const fullDmg = rollCannonDamage(ship.functionalCannons, 'ball', grapeHit.critical, ship.damageOverride)
          const dmg = Math.floor(fullDmg.total / 2)
          setShips(prev => prev.map(s => {
            if (s.id === targetId) {
              const newConds = [...s.conditions]
              if (!newConds.includes('crew_swept')) newConds.push('crew_swept')
              return { ...s, currentHP: Math.max(0, s.currentHP - dmg), conditions: newConds, status: Math.max(0, s.currentHP - dmg) <= 0 ? 'sunk' as const : s.status }
            }
            return s
          }))
          addLog(shipId, ship.name, `Grapeshot HITS ${target.name} for ${dmg} scatter damage — Crew Swept!`, 'ability', {
            damage: dmg, targetShipName: target.name,
            rolls: [{ notation: '1d20', result: grapeHit.roll, details: `vs AC ${getACWithConditions(target)}` }],
          })
        } else {
          addLog(shipId, ship.name, `Grapeshot misses ${target.name}! (rolled ${grapeHit.roll})`, 'miss', { targetShipName: target.name })
        }
        break
      }
      case 'broadside-volley': {
        if (!target) return
        setShips(prev => prev.map(s =>
          s.id === shipId && !s.conditions.includes('mast_damaged')
            ? { ...s, conditions: [...s.conditions, 'mast_damaged'] }
            : s
        ))
        const broadsideHit = rollToHit(getACWithConditions(target))
        if (broadsideHit.hit) {
          const dmg = rollCannonDamage(ship.functionalCannons, 'ball', true, ship.damageOverride)
          setShips(prev => prev.map(s =>
            s.id === targetId ? { ...s, currentHP: Math.max(0, s.currentHP - dmg.hullDamage), status: Math.max(0, s.currentHP - dmg.hullDamage) <= 0 ? 'sunk' as const : s.status } : s
          ))
          addLog(shipId, ship.name, `BROADSIDE VOLLEY HITS ${target.name} for ${dmg.hullDamage} damage! (double dice — Mast Damaged to self)`, 'critical', {
            damage: dmg.hullDamage, targetShipName: target.name,
            rolls: [
              { notation: '1d20', result: broadsideHit.roll, details: `vs AC ${getACWithConditions(target)}` },
              { notation: dmg.notation, result: dmg.total, details: `[${dmg.rolls.join(', ')}]` },
            ],
          })
        } else {
          addLog(shipId, ship.name, `Broadside Volley misses ${target.name}! Took Mast Damaged for nothing. (rolled ${broadsideHit.roll})`, 'fumble', { targetShipName: target.name })
        }
        break
      }
      default: {
        addLog(shipId, ship.name, `Uses ${ability.name}${target ? ` on ${target.name}` : ''}: ${ability.description}`, 'ability', {
          targetShipName: target?.name,
        })
        break
      }
    }
  }

  const resetBattle = () => {
    if (projectileTimerRef.current) clearTimeout(projectileTimerRef.current)
    setShips([])
    setPhase('setup')
    setTurnOrder([])
    setCurrentTurnIndex(0)
    setRound(1)
    setBattleLog([])
    setProjectiles([])
    setVictor(null)
  }

  const returnToSetup = () => {
    if (projectileTimerRef.current) clearTimeout(projectileTimerRef.current)
    setShips(prev => prev.map(s => ({
      ...s,
      currentHP: s.maxHP,
      functionalCannons: s.totalCannons,
      loadedCannons: 0,
      status: 'active' as const,
      repairTurnsRemaining: 0,
      conditions: [],
    })))
    setPhase('setup')
    setTurnOrder([])
    setCurrentTurnIndex(0)
    setRound(1)
    setBattleLog([])
    setProjectiles([])
    setVictor(null)
  }

  // ── Render ───────────────────────────────────────────────────────────────

  const playerShips = ships.filter(s => s.faction === 'player')
  const enemyShips = ships.filter(s => s.faction === 'enemy')
  const canStartBattle = playerShips.length > 0 && enemyShips.length > 0

  const enemyTargets = ships.filter(s =>
    s.faction !== currentShip?.faction && s.currentHP > 0 && s.status !== 'sunk'
  )

  useEffect(() => {
    if (turnPhase === 'load' && enemyTargets.length === 1 && !selectedTarget) {
      setSelectedTarget(enemyTargets[0].id)
    }
  }, [turnPhase, enemyTargets.length, selectedTarget])

  // ── Setup Phase ──────────────────────────────────────────────────────────

  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dnd-gold flex items-center justify-center gap-3">
            <span className="text-4xl">⚓</span> Naval Battle Simulator <span className="text-4xl">🏴‍☠️</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">Configure your fleets and engage in ship-to-ship combat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Player Fleet */}
          <div>
            <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
              <span className="text-xl">🛡️</span> Player / Ally Fleet
            </h3>
            <div className="space-y-2 mb-3">
              {playerShips.map(ship => (
                <SetupShipCard
                  key={ship.id}
                  ship={ship}
                  onRemove={() => removeShip(ship.id)}
                  onEdit={() => setEditingShip(ship)}
                  onDuplicate={() => duplicateShip(ship)}
                />
              ))}
              {playerShips.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-4 border border-dashed border-gray-700 rounded-lg">
                  No ally ships added yet
                </div>
              )}
            </div>
            <ShipForm
              faction="player"
              onAdd={addShip}
              editingShip={editingShip?.faction === 'player' ? editingShip : null}
              onUpdate={updateShip}
              onCancelEdit={() => setEditingShip(null)}
            />
            <div className="mt-3">
              <FleetLoadoutPanel faction="player" currentShips={playerShips} onLoadFleet={loadFleet} loadouts={loadouts} onSaveLoadout={saveLoadout} onDeleteLoadout={deleteLoadout} onOverwriteLoadout={id => overwriteLoadout(id, 'player')} />
            </div>
          </div>

          {/* Enemy Fleet */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
              <span className="text-xl">☠️</span> Enemy Fleet
            </h3>
            <div className="space-y-2 mb-3">
              {enemyShips.map(ship => (
                <SetupShipCard
                  key={ship.id}
                  ship={ship}
                  onRemove={() => removeShip(ship.id)}
                  onEdit={() => setEditingShip(ship)}
                  onDuplicate={() => duplicateShip(ship)}
                />
              ))}
              {enemyShips.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-4 border border-dashed border-gray-700 rounded-lg">
                  No enemy ships added yet
                </div>
              )}
            </div>
            <ShipForm
              faction="enemy"
              onAdd={addShip}
              editingShip={editingShip?.faction === 'enemy' ? editingShip : null}
              onUpdate={updateShip}
              onCancelEdit={() => setEditingShip(null)}
            />
            <div className="mt-3">
              <FleetLoadoutPanel faction="enemy" currentShips={enemyShips} onLoadFleet={loadFleet} loadouts={loadouts} onSaveLoadout={saveLoadout} onDeleteLoadout={deleteLoadout} onOverwriteLoadout={id => overwriteLoadout(id, 'enemy')} />
            </div>
          </div>
        </div>

        {/* Damage Reference */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-sm font-bold text-dnd-gold mb-2">Cannon Damage Reference</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
            <div className="bg-gray-900 p-2 rounded">
              <div className="text-lg font-bold text-gray-300 font-mono">1d8</div>
              <div className="text-[10px] text-gray-500 mt-0.5">1–8 cannons</div>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <div className="text-lg font-bold text-white font-mono">2d8</div>
              <div className="text-[10px] text-gray-500 mt-0.5">9–15 cannons</div>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <div className="text-lg font-bold text-yellow-300 font-mono">3d8</div>
              <div className="text-[10px] text-gray-500 mt-0.5">16–25 cannons</div>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <div className="text-lg font-bold text-dnd-gold font-mono">4d8</div>
              <div className="text-[10px] text-gray-500 mt-0.5">26–40 cannons</div>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <div className="text-lg font-bold text-orange-400 font-mono">5d8</div>
              <div className="text-[10px] text-gray-500 mt-0.5">41–58 cannons</div>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <div className="text-lg font-bold text-red-400 font-mono">6d8</div>
              <div className="text-[10px] text-gray-500 mt-0.5">59+ cannons</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs text-gray-400">
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-white font-bold">Ball Shot</span> — Standard cannonball. Full damage to hull.
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-white font-bold">Chain Shot</span> — Targets mast and deck. Half damage + applies condition (Mast Damaged or Crew Swept).
            </div>
          </div>
        </div>

        <button
          onClick={startBattle}
          disabled={!canStartBattle}
          className="w-full py-4 rounded-lg text-xl font-bold transition-all
                     bg-gradient-to-r from-red-700 to-orange-600 text-white
                     hover:from-red-600 hover:to-orange-500 hover:shadow-lg hover:shadow-red-900/50
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          ⚔️ Engage! Begin Naval Combat ⚔️
        </button>
      </div>
    )
  }

  // ── Victory / Defeat Screen ──────────────────────────────────────────────

  if (phase === 'finished') {
    return (
      <div className="space-y-6">
        <BattleScene ships={ships} projectiles={[]} currentShipId={null} />

        <div className={`text-center p-8 rounded-xl border-2 ${
          victor === 'player'
            ? 'bg-green-900/30 border-green-500'
            : victor === 'enemy'
              ? 'bg-red-900/30 border-red-500'
              : 'bg-gray-800/50 border-gray-500'
        }`}>
          <div className="text-6xl mb-4">{victor === 'player' ? '🏆' : victor === 'enemy' ? '💀' : '⚓'}</div>
          <h2 className="text-4xl font-bold mb-2" style={{ color: victor === 'player' ? '#4ade80' : victor === 'enemy' ? '#f87171' : '#9ca3af' }}>
            {victor === 'player' ? 'VICTORY!' : victor === 'enemy' ? 'DEFEAT!' : 'Battle Ended'}
          </h2>
          <p className="text-gray-300">
            {victor === 'player'
              ? 'The enemy fleet has been destroyed! Collect the spoils!'
              : victor === 'enemy'
                ? 'Your fleet has been sunk... The sea claims all.'
                : 'The DM has ended the battle.'}
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Battle lasted {round} round{round !== 1 ? 's' : ''} | {battleLog.length} actions logged
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-dnd-gold mb-3">Battle Report</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {ships.map(ship => (
              <div key={ship.id} className={`p-3 rounded-lg border ${
                ship.faction === 'player' ? 'border-blue-700/50' : 'border-red-700/50'
              } ${ship.currentHP <= 0 ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2">
                  <ShipSVG faction={ship.faction} size={30} sinking={ship.currentHP <= 0} />
                  <div>
                    <span className="text-white font-bold text-sm">{ship.name}</span>
                    <span className={`ml-2 text-xs ${ship.currentHP <= 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {ship.currentHP <= 0 ? 'SUNK' : `${ship.currentHP}/${ship.maxHP} HP`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <BattleLog entries={battleLog} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={returnToSetup}
            className="flex-1 py-3 rounded-lg font-bold bg-blue-700 text-white hover:bg-blue-600 transition-colors"
          >
            ⚙️ Edit Ships & Rematch
          </button>
          <button
            onClick={resetBattle}
            className="flex-1 py-3 rounded-lg font-bold bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            🆕 New Battle (Clear Ships)
          </button>
        </div>
      </div>
    )
  }

  // ── Combat Phase ─────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dnd-gold">⚓ Naval Combat</h2>
          <div className="text-sm text-gray-400">Round {round}</div>
        </div>
        <button
          onClick={() => {
            setPhase('finished')
            setVictor(null)
            addLog('system', 'Battle', 'Battle ended by DM', 'info')
          }}
          className="px-4 py-2 rounded bg-red-900 text-red-300 hover:bg-red-800 transition-colors text-sm font-bold"
        >
          End Battle
        </button>
      </div>

      {/* Battle Visualization */}
      <BattleScene ships={ships} projectiles={projectiles} currentShipId={currentShipId} />

      {/* Current Turn */}
      {currentShip && (
        <div className={`rounded-xl p-4 border-2 ${
          currentShip.faction === 'player' ? 'border-blue-500 bg-blue-950/30' : 'border-red-500 bg-red-950/30'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div className="flex items-center gap-3">
              <ShipSVG faction={currentShip.faction} size={40} />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{currentShip.name}'s Turn</h3>
                <div className="text-xs text-gray-400">
                  HP: {currentShip.currentHP}/{currentShip.maxHP} | AC: {getACWithConditions(currentShip)} | Cannons: {currentShip.totalCannons}
                </div>
              </div>
            </div>
            <PhaseIndicator phase={turnPhase} />
          </div>

          {/* Phase: Reload */}
          {turnPhase === 'reload' && (
            <div className="text-center py-4">
              <p className="text-gray-300 mb-3">Roll to reload cannons and check how many are functional this round</p>
              <button
                onClick={handleReload}
                className="px-8 py-3 rounded-lg bg-cyan-700 text-white font-bold text-lg hover:bg-cyan-600 transition-colors"
              >
                🔄 Roll Reload (1d20)
              </button>
            </div>
          )}

          {/* Phase: Load */}
          {turnPhase === 'load' && reloadResult && (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold font-mono text-dnd-gold">{reloadResult.roll}</span>
                  <span className="text-gray-400 ml-2">→ {reloadResult.functional} cannons functional</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Cannon Count */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Cannons to Load</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={reloadResult.functional}
                      value={cannonsToLoad}
                      onChange={e => setCannonsToLoad(Number(e.target.value))}
                      className="flex-1 accent-dnd-gold"
                    />
                    <span className="text-white font-mono w-10 text-right">{cannonsToLoad}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Damage: <span className="text-dnd-gold font-mono">{currentShip?.damageOverride || getDamageNotation(cannonsToLoad)}</span>
                  </div>
                </div>

                {/* Ammo Type */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Ammunition</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedAmmo('ball')}
                      className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${
                        selectedAmmo === 'ball'
                          ? 'bg-orange-700 text-white ring-2 ring-orange-400'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      🔴 Ball
                    </button>
                    <button
                      onClick={() => setSelectedAmmo('chain')}
                      className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${
                        selectedAmmo === 'chain'
                          ? 'bg-purple-700 text-white ring-2 ring-purple-400'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      ⛓️ Chain
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedAmmo === 'ball' ? 'Full hull damage' : 'Half damage + condition'}
                  </div>
                </div>

                {/* Target */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Target</label>
                  <select
                    value={selectedTarget || ''}
                    onChange={e => setSelectedTarget(e.target.value || null)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm
                               focus:border-dnd-gold focus:outline-none"
                  >
                    <option value="">Select target...</option>
                    {enemyTargets.map(ship => (
                      <option key={ship.id} value={ship.id}>
                        {ship.name} (HP: {ship.currentHP}/{ship.maxHP}, AC: {getACWithConditions(ship)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleConfirmLoad}
                  disabled={cannonsToLoad === 0 || !selectedTarget}
                  className="flex-1 py-2 rounded-lg font-bold transition-colors text-sm sm:text-base
                             bg-dnd-gold text-gray-900 hover:bg-yellow-400
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🎯 Confirm Load & Aim ({cannonsToLoad} cannons, {selectedAmmo} shot)
                </button>
                <button
                  onClick={handleEndTurn}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors text-sm"
                >
                  Skip Fire
                </button>
              </div>
            </div>
          )}

          {/* Phase: Aim / Fire */}
          {turnPhase === 'aim' && (
            <div className="text-center py-4">
              <div className="mb-3">
                <span className="text-gray-400">Firing</span>{' '}
                <span className="text-dnd-gold font-bold">{cannonsToLoad}</span>{' '}
                <span className="text-gray-400">{selectedAmmo === 'chain' ? 'chain shot' : 'cannonballs'} at</span>{' '}
                <span className="text-red-400 font-bold">{ships.find(s => s.id === selectedTarget)?.name}</span>
              </div>
              <button
                onClick={handleFire}
                className="px-10 py-4 rounded-lg bg-gradient-to-r from-red-700 to-orange-600 text-white font-bold text-xl
                           hover:from-red-600 hover:to-orange-500 transition-all hover:shadow-lg hover:shadow-red-900/50
                           animate-pulse"
              >
                💥 FIRE! (1d20 to Hit)
              </button>
            </div>
          )}

          {/* Phase: Resolve */}
          {turnPhase === 'resolve' && hitResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-3 sm:p-4 rounded-lg text-center ${
                  hitResult.hit ? 'bg-green-900/40 border border-green-500' : 'bg-red-900/40 border border-red-500'
                }`}>
                  <div className="text-xs text-gray-400 mb-1">Attack Roll</div>
                  <div className={`text-4xl font-bold font-mono ${
                    hitResult.critical ? 'text-yellow-300' : hitResult.fumble ? 'text-red-500' : 'text-white'
                  }`}>
                    {hitResult.roll}
                  </div>
                  <div className="text-sm mt-1">
                    {hitResult.critical && <span className="text-yellow-300 font-bold">NATURAL 20!</span>}
                    {hitResult.fumble && <span className="text-red-500 font-bold">NATURAL 1!</span>}
                    {!hitResult.critical && !hitResult.fumble && (
                      <span className={hitResult.hit ? 'text-green-400' : 'text-red-400'}>
                        Total: {hitResult.total} vs AC {getACWithConditions(ships.find(s => s.id === selectedTarget)!)}
                      </span>
                    )}
                  </div>
                  <div className={`text-lg font-bold mt-1 ${hitResult.hit ? 'text-green-400' : 'text-red-400'}`}>
                    {hitResult.hit ? 'HIT!' : 'MISS!'}
                  </div>
                </div>

                {hitResult.hit && damageResult && (
                  <div className="p-3 sm:p-4 rounded-lg text-center bg-orange-900/40 border border-orange-500">
                    <div className="text-xs text-gray-400 mb-1">Damage ({damageResult.notation})</div>
                    <div className="text-4xl font-bold font-mono text-orange-300">
                      {damageResult.hullDamage}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      [{damageResult.rolls.join(' + ')}]{selectedAmmo === 'chain' ? ` = ${damageResult.total} ÷ 2` : ''}
                    </div>
                    {damageResult.conditionApplied && (
                      <div className={`text-sm mt-1 font-bold ${CONDITION_LABELS[damageResult.conditionApplied].color}`}>
                        {CONDITION_LABELS[damageResult.conditionApplied].icon} {CONDITION_LABELS[damageResult.conditionApplied].label}!
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleEndTurn}
                className="w-full py-2 rounded-lg bg-dnd-gold text-gray-900 font-bold hover:bg-yellow-400 transition-colors"
              >
                Continue → DM Actions
              </button>
            </div>
          )}

          {/* Phase: DM Actions */}
          {turnPhase === 'dm_actions' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-400 mb-2">Apply conditions, use abilities, heal/damage ships, then advance to next turn.</div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {ships.filter(s => s.currentHP > 0 && s.status !== 'sunk').map(ship => (
                  <div key={ship.id} className={`p-2 rounded-lg border text-xs ${
                    ship.faction === 'player' ? 'border-blue-700/50' : 'border-red-700/50'
                  }`}>
                    <div className="font-bold text-white truncate mb-1">{ship.name}</div>
                    <HPBar current={ship.currentHP} max={ship.maxHP} />
                    <div className="flex flex-wrap gap-1 mt-2">
                      <button
                        onClick={() => applyCondition(ship.id, 'on_fire')}
                        className="px-1.5 py-0.5 rounded bg-orange-900/50 text-orange-300 hover:bg-orange-800 transition-colors"
                        title="Set On Fire"
                      >
                        🔥
                      </button>
                      <button
                        onClick={() => applyCondition(ship.id, 'taking_water')}
                        className="px-1.5 py-0.5 rounded bg-blue-900/50 text-blue-300 hover:bg-blue-800 transition-colors"
                        title="Taking Water"
                      >
                        🌊
                      </button>
                      <button
                        onClick={() => startRepair(ship.id)}
                        className="px-1.5 py-0.5 rounded bg-green-900/50 text-green-300 hover:bg-green-800 transition-colors"
                        title="Start Repairs"
                      >
                        🔧
                      </button>
                      <button
                        onClick={() => {
                          const amt = prompt(`Heal ${ship.name} — enter HP amount:`)
                          if (amt && !isNaN(Number(amt))) dmHealShip(ship.id, Number(amt))
                        }}
                        className="px-1.5 py-0.5 rounded bg-green-900/50 text-green-300 hover:bg-green-800 transition-colors"
                        title="DM Heal"
                      >
                        💚
                      </button>
                      <button
                        onClick={() => {
                          const amt = prompt(`Damage ${ship.name} — enter HP amount:`)
                          if (amt && !isNaN(Number(amt))) dmDamageShip(ship.id, Number(amt))
                        }}
                        className="px-1.5 py-0.5 rounded bg-red-900/50 text-red-300 hover:bg-red-800 transition-colors"
                        title="DM Damage"
                      >
                        💔
                      </button>
                      {ship.conditions.length > 0 && (
                        <span className="text-gray-500">|</span>
                      )}
                      {ship.conditions.map(c => (
                        <button
                          key={c}
                          onClick={() => removeCondition(ship.id, c)}
                          className="px-1.5 py-0.5 rounded bg-gray-800 hover:bg-red-900 transition-colors"
                          title={`Remove ${CONDITION_LABELS[c].label}`}
                        >
                          <span className={CONDITION_LABELS[c].color}>{CONDITION_LABELS[c].icon}✕</span>
                        </button>
                      ))}
                    </div>
                    {/* Abilities */}
                    {ship.abilities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-gray-700">
                        {ship.abilities.map(ability => (
                          <button
                            key={ability.id}
                            onClick={() => {
                              const needsTarget = ['ram', 'greek-fire', 'boarding', 'harpoon', 'fore-cannons', 'aft-cannons', 'grapeshot', 'broadside-volley'].includes(ability.id)
                              if (needsTarget) {
                                const targets = ships.filter(s => s.faction !== ship.faction && s.currentHP > 0)
                                if (targets.length === 1) {
                                  handleAbility(ship.id, ability, targets[0].id)
                                } else if (targets.length > 1) {
                                  const targetName = prompt(`Target for ${ability.name}?\n${targets.map((t, i) => `${i + 1}. ${t.name}`).join('\n')}`)
                                  const idx = parseInt(targetName || '') - 1
                                  if (idx >= 0 && idx < targets.length) {
                                    handleAbility(ship.id, ability, targets[idx].id)
                                  }
                                }
                              } else {
                                handleAbility(ship.id, ability)
                              }
                            }}
                            className="px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 hover:bg-purple-800 transition-colors"
                            title={ability.description}
                          >
                            {ability.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleNextTurn}
                className="w-full py-3 rounded-lg bg-dnd-gold text-gray-900 font-bold text-lg
                           hover:bg-yellow-400 transition-colors"
              >
                ⚓ Next Ship's Turn
              </button>
            </div>
          )}
        </div>
      )}

      {/* Battle Log */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-bold text-dnd-gold mb-2 flex items-center gap-2">
          📜 Battle Log
        </h3>
        <BattleLog entries={battleLog} />
      </div>
    </div>
  )
}
