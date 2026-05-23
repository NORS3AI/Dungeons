import { useState } from 'react'
import type { Character, SailorRole, ShipDetails } from '../types'
import { useCharacterStore } from '../stores/characterStore'
import { ALL_PROFESSIONS, CATEGORY_INFO, PROFESSION_COST_LADDER, getProfessionByRoll, formatIncome, type Profession } from '../data/professions'

// Sailor/Ship Captain flavour (not in PROFESSIONS data since they're handled specially)
const SAILOR_FLAVOUR = {
  sailor: {
    duties: [
      'Maintain rigging, sails, and hull integrity',
      'Stand watch and navigate by stars',
      'Load and secure cargo in the hold',
      'Operate the ship\'s cannons in battle',
      'Row when wind fails or in tight harbour',
    ],
    perks: [
      'Proficiency with navigator\'s tools & vehicles (water)',
      'Advantage on Athletics and Perception checks aboard ships',
      'Speak the sailor\'s cant — a shorthand known to seafarers',
      'Free passage on most merchant vessels',
      'Network of sailors, dock-hands, and harbour masters',
    ],
  },
  'ship-captain': {
    duties: [
      'Command the crew and set the ship\'s course',
      'Manage cargo manifests and trade agreements',
      'Navigate safely through storms and shallow waters',
      'Negotiate port fees and docking rights',
      'Maintain discipline and crew morale',
    ],
    perks: [
      'Proficiency with navigator\'s tools & vehicles (water)',
      'Advantage on Persuasion checks with harbour officials',
      'Legal authority over crew conduct aboard your vessel',
      'Established trade contacts in multiple ports',
      'Command of a fully crewed merchant or war vessel',
    ],
  },
}

const DEFAULT_FLAVOUR = {
  duties: ['Perform your trade faithfully each day', 'Maintain your reputation and contacts'],
  perks: ['Steady daily income', 'Professional network in your field'],
}

// ------------------------------------------------------------------
// Sailor role picker and ship details form
// ------------------------------------------------------------------

const SAILOR_ROLES: { id: SailorRole; label: string; icon: string; description: string }[] = [
  {
    id: 'admiral',
    label: 'Lord Admiral',
    icon: '👑',
    description: 'You command an entire fleet. Multiple ships sail under your banner, crewed by your sailors and soldiers.',
  },
  {
    id: 'captain',
    label: 'Captain',
    icon: '⚓',
    description: 'You own your vessel and command your crew. The ship is yours — your name is on the papers.',
  },
  {
    id: 'crew',
    label: 'Crew Member',
    icon: '🪝',
    description: 'You sail under another captain. You earn your wage but someone else calls the shots.',
  },
]

const EMPTY_SHIP: ShipDetails = {
  name: '',
  captainFirstName: '',
  captainSurname: '',
  hullPoints: 300,
  armorClass: 15,
  speed: 30,
  cargoCapacity: 100,
  cannons: 0,
  crew: 20,
  fleetCount: 0,
  militiaCount: 0,
  standingMilitary: 0,
  fleetCrew: 0,
  notes: '',
}

function InfoPopup({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-gray-800 border border-gray-600 rounded-xl p-5 max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-gray-200 leading-relaxed">{text}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-1.5 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors w-full"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

function InfoLabel({ label, info }: { label: string; info: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <label className="flex items-center gap-1 text-xs text-gray-400 mb-1">
        {label}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-4 h-4 rounded-full bg-blue-700/60 text-[10px] text-blue-200 font-bold leading-none hover:bg-blue-600 transition-colors"
          title="More info"
        >
          ?
        </button>
      </label>
      {open && <InfoPopup text={info} onClose={() => setOpen(false)} />}
    </>
  )
}

function ShipDetailsForm({
  ship,
  role,
  onChange,
}: {
  ship: ShipDetails
  role: SailorRole
  onChange: (updated: Partial<ShipDetails>) => void
}) {
  const isCapt = role === 'captain' || role === 'admiral'
  const captainLabel = isCapt ? 'Your Name (Captain)' : 'Captain\'s First Name'

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-dnd-gold flex items-center gap-2">
        🚢 Ship Details
      </h3>

      {/* Ship Name */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Ship Name</label>
        <input
          type="text"
          value={ship.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. The Iron Wyvern"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Captain Name — only shown for crew/navy */}
      {role !== 'captain' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">{captainLabel}</label>
            <input
              type="text"
              value={ship.captainFirstName}
              onChange={(e) => onChange({ captainFirstName: e.target.value })}
              placeholder="First name"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Captain's Surname</label>
            <input
              type="text"
              value={ship.captainSurname}
              onChange={(e) => onChange({ captainSurname: e.target.value })}
              placeholder="Surname"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Combat/Movement stats */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Hull Points</label>
          <input
            type="number"
            min={0}
            value={ship.hullPoints}
            onChange={(e) => onChange({ hullPoints: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Armor Class</label>
          <input
            type="number"
            min={0}
            value={ship.armorClass}
            onChange={(e) => onChange({ armorClass: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Speed (ft)</label>
          <input
            type="number"
            min={0}
            value={ship.speed}
            onChange={(e) => onChange({ speed: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Crew & cargo */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Crew (min)</label>
          <input
            type="number"
            min={0}
            value={ship.crew}
            onChange={(e) => onChange({ crew: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Cannons</label>
          <input
            type="number"
            min={0}
            value={ship.cannons}
            onChange={(e) => onChange({ cannons: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Cargo (tons)</label>
          <input
            type="number"
            min={0}
            value={ship.cargoCapacity}
            onChange={(e) => onChange({ cargoCapacity: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Stat summary chips */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[
          { label: 'HP', value: ship.hullPoints, color: 'bg-red-900/40 border-red-700/50 text-red-300' },
          { label: 'AC', value: ship.armorClass, color: 'bg-blue-900/40 border-blue-700/50 text-blue-300' },
          { label: 'SPD', value: `${ship.speed} ft`, color: 'bg-green-900/40 border-green-700/50 text-green-300' },
          { label: 'Crew', value: ship.crew, color: 'bg-yellow-900/40 border-yellow-700/50 text-yellow-300' },
          { label: '⚙ Cargo', value: `${ship.cargoCapacity}t`, color: 'bg-purple-900/40 border-purple-700/50 text-purple-300' },
          ...(ship.cannons > 0 ? [{ label: '💣 Cannons', value: ship.cannons, color: 'bg-orange-900/40 border-orange-700/50 text-orange-300' }] : []),
          ...(role === 'admiral' && ship.fleetCount > 0 ? [{ label: '⚓ Fleet', value: ship.fleetCount, color: 'bg-cyan-900/40 border-cyan-700/50 text-cyan-300' }] : []),
        ].map((chip) => (
          <span
            key={chip.label}
            className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${chip.color}`}
          >
            {chip.label}: {chip.value}
          </span>
        ))}
      </div>

      {/* Lord Admiral — Fleet Fields */}
      {role === 'admiral' && (
        <div className="space-y-4 pt-2 border-t border-yellow-700/30">
          <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wide flex items-center gap-2">
            👑 Fleet Command
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <InfoLabel
                label="Fleet Count"
                info="This is the count of how many ships are in the Lord Admiral's fleet."
              />
              <input
                type="number"
                min={0}
                value={ship.fleetCount}
                onChange={(e) => onChange({ fleetCount: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <InfoLabel
                label="Militia Count"
                info="This is the count of how many militia are on the main ship."
              />
              <input
                type="number"
                min={0}
                value={ship.militiaCount}
                onChange={(e) => onChange({ militiaCount: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <InfoLabel
                label="Standing Military"
                info="This is the count of how many military soldiers stand on each of the ships. This is notwithstanding how many crew members are aboard the fleet."
              />
              <input
                type="number"
                min={0}
                value={ship.standingMilitary}
                onChange={(e) => onChange({ standingMilitary: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <InfoLabel
                label="Fleet Crew"
                info="This is the count of the total number of crew members for the whole of the fleet."
              />
              <input
                type="number"
                min={0}
                value={ship.fleetCrew}
                onChange={(e) => onChange({ fleetCrew: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Notes</label>
        <textarea
          rows={3}
          value={ship.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Ship history, modifications, special cargo, notable voyages…"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// Main ProfessionTab component
// ------------------------------------------------------------------

export function ProfessionTab({ character }: { character: Character }) {
  const { setProfessionData, saveCharacter } = useCharacterStore()

  const professionData = character.professionData ?? {}
  const income = character.dailyIncome

  // Find full profession record from data file
  const profRecord = income
    ? ALL_PROFESSIONS.find(
        (p) => p.name.toLowerCase() === income.professionName.toLowerCase()
      )
    : null
  const profId = profRecord?.id ?? ''

  // Use flavour from data file, fall back to sailor flavour or default
  const flavour = profRecord?.flavour
    ?? (SAILOR_FLAVOUR as Record<string, typeof DEFAULT_FLAVOUR>)[profId]
    ?? DEFAULT_FLAVOUR

  // Is this a maritime profession?
  const isMaritime = ['sailor', 'ship-captain'].includes(profId)
  const rawRole = professionData.sailorRole
  const sailorRole: SailorRole = (rawRole === 'admiral' || rawRole === 'captain' || rawRole === 'crew')
    ? rawRole
    : (profId === 'ship-captain' ? 'captain' : 'crew')
  const ship: ShipDetails = professionData.ship ?? { ...EMPTY_SHIP }

  // Track unsaved ship changes locally so we don't save on every keystroke
  const [localShip, setLocalShip] = useState<ShipDetails>(ship)
  const [shipDirty, setShipDirty] = useState(false)

  function handleRoleSelect(role: SailorRole) {
    setProfessionData({ sailorRole: role })
    saveCharacter()
  }

  function handleShipChange(partial: Partial<ShipDetails>) {
    const updated = { ...localShip, ...partial }
    setLocalShip(updated)
    setShipDirty(true)
  }

  function saveShip() {
    setProfessionData({ ship: localShip })
    saveCharacter()
    setShipDirty(false)
  }

  if (!income) {
    return (
      <div className="p-6 text-center text-gray-400">
        <div className="text-4xl mb-3">💼</div>
        <p className="text-lg font-medium text-gray-300 mb-1">No Profession Set</p>
        <p className="text-sm">
          Roll for daily income using the <span className="text-dnd-gold">New Day</span> button on
          the Overview tab to assign a profession.
        </p>
      </div>
    )
  }

  const categoryInfo = income ? CATEGORY_INFO[
    ALL_PROFESSIONS.find((p) => p.name.toLowerCase() === income.professionName.toLowerCase())?.category ?? 'modest'
  ] : null

  const incomeStr = income
    ? `${income.amount} ${income.currency === 'platinum' ? 'PP' : income.currency === 'gold' ? 'GP' : income.currency === 'silver' ? 'SP' : 'CP'}/day`
    : null

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gray-800/60 rounded-xl p-5 border border-gray-700">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">💼</span>
            <div>
              <h2 className="text-2xl font-bold text-dnd-gold">{income.professionName}</h2>
              {categoryInfo && (
                <span className={`text-sm font-medium ${categoryInfo.color}`}>
                  {categoryInfo.name} Lifestyle
                </span>
              )}
            </div>
          </div>
          {incomeStr && (
            <div className="text-right shrink-0">
              <div className="text-xs text-gray-400 uppercase tracking-wide">Daily Income</div>
              <div className="text-xl font-bold text-yellow-400">{incomeStr}</div>
            </div>
          )}
        </div>
      </div>

      {/* Duties & Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Duties */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
            ⚙ Duties & Responsibilities
          </h3>
          <ul className="space-y-1.5">
            {flavour.duties.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-400">
                <span className="text-gray-600 shrink-0">•</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Perks */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
            ✨ Perks & Benefits
          </h3>
          <ul className="space-y-1.5">
            {flavour.perks.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-400">
                <span className="text-green-500 shrink-0">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Maritime Section */}
      {isMaritime && (
        <div className="bg-gray-800/40 rounded-xl p-5 border border-blue-800/50 space-y-5">
          {/* Role Picker */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
              ⚓ Sailor Role
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SAILOR_ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleSelect(r.id)}
                  className={`rounded-xl p-3 border text-left transition-all ${
                    sailorRole === r.id
                      ? 'bg-blue-900/50 border-blue-500 text-white'
                      : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="text-xl mb-1">{r.icon}</div>
                  <div className="text-xs font-bold">{r.label}</div>
                </button>
              ))}
            </div>
            {/* Role description */}
            <p className="text-xs text-gray-400 mt-2 italic">
              {SAILOR_ROLES.find((r) => r.id === sailorRole)?.description}
            </p>
          </div>

          {/* Ship Form */}
          <ShipDetailsForm
            ship={localShip}
            role={sailorRole}
            onChange={handleShipChange}
          />

          {/* Save ship button */}
          {shipDirty && (
            <div className="flex justify-end">
              <button
                onClick={saveShip}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Save Ship Details
              </button>
            </div>
          )}
        </div>
      )}

      {/* Additional Professions */}
      <AdditionalProfessionSection character={character} />

      {/* Income reminder */}
      <div className="text-xs text-gray-500 text-center">
        Daily income is collected via the <span className="text-gray-400 font-medium">New Day</span> button on the Overview tab.
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// Multi-profession purchase & roll UI
// ------------------------------------------------------------------

function AdditionalProfessionSection({ character }: { character: Character }) {
  const { setProfessionData, updateCurrency, saveCharacter } = useCharacterStore()

  const professionData = character.professionData ?? {}
  const purchased = professionData.professionsPurchased ?? 0
  const additionalProfessions = professionData.additionalProfessions ?? []
  const canBuyMore = purchased < 10
  const nextCost = canBuyMore ? PROFESSION_COST_LADDER[purchased] : null

  const [showRoller, setShowRoller] = useState(false)
  const [rolledProfession, setRolledProfession] = useState<Profession | null>(null)
  const [rollResult, setRollResult] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const playerGold = character.currency.gold

  const handlePurchaseAndRoll = () => {
    if (!nextCost || playerGold < nextCost) return
    setShowRoller(true)
    setRolledProfession(null)
    setRollResult(null)
    setConfirmed(false)
  }

  const handleRoll = () => {
    if (isRolling) return
    setIsRolling(true)
    setRolledProfession(null)
    setConfirmed(false)

    let count = 0
    const interval = setInterval(() => {
      const d1 = Math.floor(Math.random() * 100) + 1
      const d2 = Math.floor(Math.random() * 100) + 1
      setRollResult(d1 + d2)
      count++
      if (count >= 15) {
        clearInterval(interval)
        const f1 = Math.floor(Math.random() * 100) + 1
        const f2 = Math.floor(Math.random() * 100) + 1
        const finalRoll = f1 + f2
        setRollResult(finalRoll)
        setRolledProfession(getProfessionByRoll(finalRoll))
        setIsRolling(false)
      }
    }, 50)
  }

  const handleConfirmPurchase = () => {
    if (!rolledProfession || !nextCost) return

    // Deduct gold
    const newGold = character.currency.gold - nextCost
    updateCurrency({ gold: newGold })

    // Add to additional professions
    const newAdditional = [
      ...additionalProfessions,
      {
        professionName: rolledProfession.name,
        amount: rolledProfession.dailyIncome.amount,
        currency: rolledProfession.dailyIncome.currency as 'copper' | 'silver' | 'gold' | 'platinum',
      },
    ]

    setProfessionData({
      additionalProfessions: newAdditional,
      professionsPurchased: purchased + 1,
    })

    setConfirmed(true)
    saveCharacter()
  }

  return (
    <div className="bg-gray-800/40 rounded-xl p-5 border border-yellow-800/40 space-y-4">
      <h3 className="text-sm font-bold text-dnd-gold uppercase tracking-wide flex items-center gap-2">
        💼 Additional Professions
      </h3>

      <p className="text-xs text-gray-400">
        Keep your current profession and pay gold to roll for another. You can hold up to 10 additional professions.
        Each additional profession earns its own daily income when you press New Day.
      </p>

      {/* Current additional professions */}
      {additionalProfessions.length > 0 && (
        <div className="space-y-2">
          {additionalProfessions.map((ap, i) => {
            const match = ALL_PROFESSIONS.find(
              (p) => p.name.toLowerCase() === ap.professionName.toLowerCase()
            )
            const catInfo = match ? CATEGORY_INFO[match.category] : null
            const currLabel = ap.currency === 'platinum' ? 'PP' : ap.currency === 'gold' ? 'GP' : ap.currency === 'silver' ? 'SP' : 'CP'
            return (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-900/60 rounded-lg px-3 py-2 border border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono w-5">#{i + 1}</span>
                  <span className={`font-medium text-sm ${catInfo?.color ?? 'text-gray-300'}`}>
                    {ap.professionName}
                  </span>
                  {catInfo && (
                    <span className={`text-xs ${catInfo.color} opacity-60`}>
                      ({catInfo.name})
                    </span>
                  )}
                </div>
                <span className="text-yellow-400 text-sm font-bold">
                  {ap.amount} {currLabel}/day
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Cost ladder */}
      <div className="flex flex-wrap gap-1.5">
        {PROFESSION_COST_LADDER.map((cost, i) => (
          <span
            key={i}
            className={`px-2 py-0.5 rounded text-xs font-mono border ${
              i < purchased
                ? 'bg-green-900/30 border-green-700/40 text-green-400 line-through'
                : i === purchased
                ? 'bg-yellow-900/40 border-yellow-600/60 text-yellow-300 font-bold'
                : 'bg-gray-900/40 border-gray-700/40 text-gray-500'
            }`}
          >
            {cost.toLocaleString()}g
          </span>
        ))}
      </div>

      {/* Purchase button */}
      {canBuyMore && nextCost && (
        <button
          onClick={handlePurchaseAndRoll}
          disabled={playerGold < nextCost}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
            playerGold >= nextCost
              ? 'bg-gradient-to-r from-yellow-700 to-amber-800 hover:from-yellow-600 hover:to-amber-700 text-white border border-yellow-500'
              : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
          }`}
        >
          {playerGold >= nextCost
            ? `Roll for Additional Profession (${nextCost.toLocaleString()} GP)`
            : `Need ${nextCost.toLocaleString()} GP (have ${playerGold.toLocaleString()} GP)`}
        </button>
      )}

      {!canBuyMore && (
        <div className="text-center text-xs text-gray-500 italic">
          Maximum additional professions reached (10/10).
        </div>
      )}

      {/* Roll modal */}
      {showRoller && nextCost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => { if (!isRolling) setShowRoller(false) }}>
          <div
            className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-yellow-700 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 text-lg">💼</span>
              <h3 className="text-xl font-bold text-dnd-gold">Roll Additional Profession</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Cost: <span className="text-yellow-400 font-bold">{nextCost.toLocaleString()} GP</span>
              {' '}&mdash; Purchase #{purchased + 1} of 10
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Roll 2d100</span>
                <button
                  onClick={handleRoll}
                  disabled={isRolling || confirmed}
                  className="px-4 py-2 bg-yellow-700 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRolling ? 'Rolling...' : rolledProfession && !confirmed ? 'Reroll' : confirmed ? 'Done' : 'Roll 2d100'}
                </button>
              </div>
              {rollResult !== null && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">{rollResult}</div>
                  {rolledProfession && !isRolling && (
                    <div className="text-white">
                      <span className={CATEGORY_INFO[rolledProfession.category].color}>
                        {rolledProfession.name}
                      </span>
                      <span className="text-gray-400 ml-2">
                        ({formatIncome(rolledProfession.dailyIncome)}/day)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {rolledProfession && !isRolling && (
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-lg font-bold ${CATEGORY_INFO[rolledProfession.category].color}`}>
                    {rolledProfession.name}
                  </h4>
                  <span className="text-dnd-gold font-bold">
                    {formatIncome(rolledProfession.dailyIncome)}/day
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{rolledProfession.description}</p>
                <div className="text-sm">
                  <span className="text-gray-500">Lifestyle: </span>
                  <span className={CATEGORY_INFO[rolledProfession.category].color}>
                    {CATEGORY_INFO[rolledProfession.category].name}
                  </span>
                </div>
              </div>
            )}

            {confirmed && (
              <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 mb-4 text-center">
                <p className="text-green-400 font-medium text-sm">
                  Added {rolledProfession?.name}! Spent {nextCost.toLocaleString()} GP.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowRoller(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                {confirmed ? 'Done' : 'Cancel'}
              </button>
              {rolledProfession && !isRolling && !confirmed && (
                <button
                  onClick={handleConfirmPurchase}
                  className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Confirm &amp; Pay {nextCost.toLocaleString()} GP
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
