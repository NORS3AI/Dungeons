import { useState } from 'react'
import type { Character, SailorRole, ShipDetails, ProfessionData } from '../types'
import { useCharacterStore } from '../stores/characterStore'
import { useSettingsStore } from '../stores/settingsStore'
import { ALL_PROFESSIONS, CATEGORY_INFO, PROFESSION_COST_LADDER, getProfessionByRoll, formatIncome, type Profession } from '../data/professions'
import { getSubProfessionsForId, type SubProfessionFlavour, type DynamicFieldConfig } from '../data/subProfessions'

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
// DM: Manual profession picker dropdown
// ------------------------------------------------------------------

function DMProfessionPicker({
  currentProfession,
  onSelect,
}: {
  currentProfession?: string
  onSelect: (profession: Profession) => void
}) {
  const [selectedId, setSelectedId] = useState('')

  const grouped = Object.entries(CATEGORY_INFO).map(([cat, info]) => ({
    category: cat as Profession['category'],
    label: info.name,
    color: info.color,
    professions: ALL_PROFESSIONS.filter((p) => p.category === cat),
  }))

  const handleChange = (id: string) => {
    setSelectedId(id)
    const prof = ALL_PROFESSIONS.find((p) => p.id === id)
    if (prof) onSelect(prof)
  }

  return (
    <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-purple-400 text-xs font-bold uppercase tracking-wide">DM: Assign Profession</span>
      </div>
      <select
        value={selectedId}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-gray-900 border border-purple-700/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
      >
        <option value="">
          {currentProfession ? `Current: ${currentProfession}` : '— Select a profession —'}
        </option>
        {grouped.map((g) => (
          <optgroup key={g.category} label={`${g.label} (${formatIncome(g.professions[0]?.dailyIncome)} – ${formatIncome(g.professions[g.professions.length - 1]?.dailyIncome)}/day)`}>
            {g.professions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {formatIncome(p.dailyIncome)}/day
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

// ------------------------------------------------------------------
// Total daily income display (aggregated across all professions)
// ------------------------------------------------------------------

function toGoldEquivalent(amount: number, currency: string): number {
  if (currency === 'platinum') return amount * 100
  if (currency === 'gold') return amount
  if (currency === 'silver') return amount / 100
  return amount / 10000
}

function TotalDailyIncome({
  primary,
  additional,
}: {
  primary: { amount: number; currency: string }
  additional: { amount: number; currency: string }[]
}) {
  let totalGpEquiv = toGoldEquivalent(primary.amount, primary.currency)
  for (const ap of additional) {
    totalGpEquiv += toGoldEquivalent(ap.amount, ap.currency)
  }
  const display = totalGpEquiv >= 100
    ? `${(totalGpEquiv / 100).toFixed(1)} PP`
    : totalGpEquiv >= 1
    ? `${totalGpEquiv.toFixed(1)} GP`
    : `${(totalGpEquiv * 100).toFixed(0)} SP`

  return (
    <div className="mt-1 text-xs text-green-400">
      Total: ~{display}/day
    </div>
  )
}

// ------------------------------------------------------------------
// Profession detail popup (shows full info for any profession)
// ------------------------------------------------------------------

function ProfessionDetailPopup({
  profession,
  onClose,
}: {
  profession: Profession
  onClose: () => void
}) {
  const catInfo = CATEGORY_INFO[profession.category]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-gray-800 border border-gray-600 rounded-xl p-5 max-w-md w-full shadow-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-lg font-bold ${catInfo.color}`}>{profession.name}</h3>
          <span className="text-dnd-gold font-bold text-sm">{formatIncome(profession.dailyIncome)}/day</span>
        </div>
        <p className="text-sm text-gray-300 mb-3">{profession.description}</p>
        <div className="text-xs mb-3">
          <span className="text-gray-500">Lifestyle: </span>
          <span className={catInfo.color}>{catInfo.name}</span>
          <span className="text-gray-600 ml-2">| Roll: {profession.d100Range[0]}–{profession.d100Range[1]}</span>
        </div>

        {profession.flavour && (
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gray-900/60 rounded-lg p-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Duties</h4>
              <ul className="space-y-1">
                {profession.flavour.duties.map((d, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-400">
                    <span className="text-gray-600 shrink-0">•</span>{d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Perks</h4>
              <ul className="space-y-1">
                {profession.flavour.perks.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-400">
                    <span className="text-green-500 shrink-0">✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors w-full"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// Main ProfessionTab component
// ------------------------------------------------------------------

export function ProfessionTab({ character }: { character: Character }) {
  const { setProfessionData, setDailyIncome, saveCharacter } = useCharacterStore()
  const { dmModeEnabled } = useSettingsStore()

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
        <p className="text-sm mb-4">
          Roll for daily income using the <span className="text-dnd-gold">New Day</span> button on
          the Overview tab to assign a profession.
        </p>
        {dmModeEnabled && (
          <DMProfessionPicker
            onSelect={(prof) => {
              setDailyIncome(prof.name, prof.dailyIncome.amount, prof.dailyIncome.currency)
              saveCharacter()
            }}
          />
        )}
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
              <div className="text-xs text-gray-400 uppercase tracking-wide">Primary Income</div>
              <div className="text-xl font-bold text-yellow-400">{incomeStr}</div>
              {(professionData.additionalProfessions ?? []).length > 0 && (
                <TotalDailyIncome primary={income} additional={professionData.additionalProfessions ?? []} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* DM: Manual profession picker */}
      {dmModeEnabled && (
        <DMProfessionPicker
          currentProfession={income.professionName}
          onSelect={(prof) => {
            setDailyIncome(prof.name, prof.dailyIncome.amount, prof.dailyIncome.currency)
            saveCharacter()
          }}
        />
      )}

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

      {/* Sub-Profession Specialisation */}
      <SubProfessionSection
        profId={profId}
        professionData={professionData}
        onSave={(subId, fields) => {
          setProfessionData({ subProfessionId: subId, subProfessionFields: fields })
          saveCharacter()
        }}
      />

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
// Sub-profession specialisation UI
// ------------------------------------------------------------------

function SubProfessionSection({
  profId,
  professionData,
  onSave,
}: {
  profId: string
  professionData: ProfessionData
  onSave: (subId: string, fields: Record<string, string | number>) => void
}) {
  const subOptions = getSubProfessionsForId(profId)
  const currentSubId = (professionData.subProfessionId as string) ?? ''
  const savedFields = (professionData.subProfessionFields as Record<string, string | number>) ?? {}

  const [selectedId, setSelectedId] = useState(currentSubId)
  const [localFields, setLocalFields] = useState<Record<string, string | number>>(savedFields)
  const [dirty, setDirty] = useState(false)

  if (subOptions.length === 0) return null

  const selected = subOptions.find((s) => s.id === selectedId) ?? null

  function handleSelect(sub: SubProfessionFlavour) {
    setSelectedId(sub.id)
    if (sub.id !== currentSubId) {
      const defaults: Record<string, string | number> = {}
      for (const f of sub.fields) {
        defaults[f.key] = f.type === 'number' ? (f.min ?? 0) : ''
      }
      setLocalFields(defaults)
      setDirty(true)
    } else {
      setLocalFields(savedFields)
      setDirty(false)
    }
  }

  function handleFieldChange(key: string, value: string | number) {
    setLocalFields((prev) => ({ ...prev, [key]: value }))
    setDirty(true)
  }

  function handleSave() {
    onSave(selectedId, localFields)
    setDirty(false)
  }

  return (
    <div className="bg-gray-800/40 rounded-xl p-5 border border-indigo-800/40 space-y-4">
      <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide flex items-center gap-2">
        🎭 Specialisation
      </h3>

      {/* Sub-profession cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {subOptions.map((sub) => (
          <button
            key={sub.id}
            onClick={() => handleSelect(sub)}
            className={`rounded-xl p-3 border text-left transition-all ${
              selectedId === sub.id
                ? 'bg-indigo-900/50 border-indigo-500 text-white'
                : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
          >
            <div className="text-xl mb-1">{sub.icon}</div>
            <div className="text-xs font-bold truncate">{sub.label}</div>
          </button>
        ))}
      </div>

      {/* Description */}
      {selected && (
        <p className="text-xs text-gray-400 italic">{selected.description}</p>
      )}

      {/* Dynamic fields */}
      {selected && selected.fields.length > 0 && (
        <div className="space-y-3">
          {selected.fields.map((field: DynamicFieldConfig) => (
            <div key={field.key}>
              {field.info ? (
                <InfoLabel label={field.label} info={field.info} />
              ) : (
                <label className="block text-xs text-gray-400 mb-1">{field.label}</label>
              )}
              {field.type === 'number' ? (
                <input
                  type="number"
                  min={field.min ?? 0}
                  value={(localFields[field.key] as number) ?? 0}
                  onChange={(e) => handleFieldChange(field.key, Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <input
                  type="text"
                  value={(localFields[field.key] as string) ?? ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder ?? ''}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Save button */}
      {dirty && selectedId && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-700 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            Save Specialisation
          </button>
        </div>
      )}
    </div>
  )
}

// ------------------------------------------------------------------
// Multi-profession purchase & roll UI
// ------------------------------------------------------------------

function AdditionalProfessionSection({ character }: { character: Character }) {
  const { setProfessionData, updateCurrency, saveCharacter } = useCharacterStore()
  const { dmModeEnabled } = useSettingsStore()

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
  const [goldDeducted, setGoldDeducted] = useState(false)
  const [detailPopup, setDetailPopup] = useState<Profession | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const playerGoldEquivalent = character.currency.gold + (character.currency.platinum * 100)

  const allOwnedNames = new Set<string>()
  if (character.dailyIncome) allOwnedNames.add(character.dailyIncome.professionName.toLowerCase())
  for (const ap of additionalProfessions) allOwnedNames.add(ap.professionName.toLowerCase())

  function rollNonDuplicate(): { roll: number; prof: Profession } {
    let attempts = 0
    while (attempts < 200) {
      const f1 = Math.floor(Math.random() * 100) + 1
      const f2 = Math.floor(Math.random() * 100) + 1
      const roll = f1 + f2
      const prof = getProfessionByRoll(roll)
      if (!allOwnedNames.has(prof.name.toLowerCase())) return { roll, prof }
      attempts++
    }
    const f1 = Math.floor(Math.random() * 100) + 1
    const f2 = Math.floor(Math.random() * 100) + 1
    return { roll: f1 + f2, prof: getProfessionByRoll(f1 + f2) }
  }

  const handlePurchaseAndRoll = () => {
    if (!nextCost || playerGoldEquivalent < nextCost) return

    let remaining = nextCost
    let newGold = character.currency.gold
    let newPlatinum = character.currency.platinum
    if (newGold >= remaining) {
      newGold -= remaining
    } else {
      remaining -= newGold
      newGold = 0
      const ppNeeded = Math.ceil(remaining / 100)
      newPlatinum -= ppNeeded
      newGold += (ppNeeded * 100) - remaining
    }
    updateCurrency({ gold: newGold, platinum: newPlatinum })

    setShowRoller(true)
    setRolledProfession(null)
    setRollResult(null)
    setConfirmed(false)
    setGoldDeducted(true)
    setIsRolling(true)

    let count = 0
    const interval = setInterval(() => {
      const d1 = Math.floor(Math.random() * 100) + 1
      const d2 = Math.floor(Math.random() * 100) + 1
      setRollResult(d1 + d2)
      count++
      if (count >= 15) {
        clearInterval(interval)
        const result = rollNonDuplicate()
        setRollResult(result.roll)
        setRolledProfession(result.prof)
        setIsRolling(false)

        const newAdditional = [
          ...additionalProfessions,
          {
            professionName: result.prof.name,
            amount: result.prof.dailyIncome.amount,
            currency: result.prof.dailyIncome.currency as 'copper' | 'silver' | 'gold' | 'platinum',
          },
        ]
        setProfessionData({
          additionalProfessions: newAdditional,
          professionsPurchased: purchased + 1,
        })
        setConfirmed(true)
        saveCharacter()
      }
    }, 50)
  }

  const handleDeleteProfession = (index: number) => {
    const updated = additionalProfessions.filter((_, i) => i !== index)
    setProfessionData({ additionalProfessions: updated })
    saveCharacter()
  }

  return (
    <div className="bg-gray-800/40 rounded-xl p-5 border border-yellow-800/40 space-y-4">
      <h3 className="text-sm font-bold text-dnd-gold uppercase tracking-wide flex items-center gap-2">
        💼 Additional Professions
      </h3>

      <p className="text-xs text-gray-400">
        Pay gold to roll for another profession. You can hold up to 10 additional professions.
        Each earns its own daily income. Duplicates are blocked — you will never roll a profession you already have.
      </p>

      {/* Current additional professions — compact list */}
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
                  <button
                    onClick={() => match && setDetailPopup(match)}
                    className={`font-medium text-sm underline decoration-dotted underline-offset-2 hover:brightness-125 ${catInfo?.color ?? 'text-gray-300'}`}
                  >
                    {ap.professionName}
                  </button>
                  {catInfo && (
                    <span className={`text-xs ${catInfo.color} opacity-60`}>
                      ({catInfo.name})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm font-bold">
                    {ap.amount} {currLabel}/day
                  </span>
                  {dmModeEnabled && (
                    <button
                      onClick={() => handleDeleteProfession(i)}
                      className="text-red-500 hover:text-red-400 text-sm px-1 transition-colors"
                      title="Remove profession (DM only, no refund)"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Collapsible full details */}
      {additionalProfessions.length > 0 && (
        <div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span className={`transform transition-transform ${showDetails ? 'rotate-90' : ''}`}>▶</span>
            {showDetails ? 'Hide' : 'Show'} Profession Details ({additionalProfessions.length})
          </button>

          {showDetails && (
            <div className="mt-3 space-y-3">
              {additionalProfessions.map((ap, i) => {
                const match = ALL_PROFESSIONS.find(
                  (p) => p.name.toLowerCase() === ap.professionName.toLowerCase()
                )
                if (!match) return null
                const catInfo = CATEGORY_INFO[match.category]
                return (
                  <div key={i} className="bg-gray-900/60 rounded-lg p-4 border border-gray-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold ${catInfo.color}`}>{match.name}</h4>
                      <span className="text-dnd-gold text-sm font-bold">{formatIncome(match.dailyIncome)}/day</span>
                    </div>
                    <p className="text-xs text-gray-400">{match.description}</p>
                    {match.flavour && (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-1">Duties</h5>
                          <ul className="space-y-0.5">
                            {match.flavour.duties.map((d, j) => (
                              <li key={j} className="text-[11px] text-gray-500 flex gap-1">
                                <span className="shrink-0">•</span>{d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-1">Perks</h5>
                          <ul className="space-y-0.5">
                            {match.flavour.perks.map((p, j) => (
                              <li key={j} className="text-[11px] text-green-500/70 flex gap-1">
                                <span className="shrink-0">✓</span>{p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
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
          disabled={playerGoldEquivalent < nextCost}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
            playerGoldEquivalent >= nextCost
              ? 'bg-gradient-to-r from-yellow-700 to-amber-800 hover:from-yellow-600 hover:to-amber-700 text-white border border-yellow-500'
              : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
          }`}
        >
          {playerGoldEquivalent >= nextCost
            ? `Roll for Additional Profession (${nextCost.toLocaleString()} GP)`
            : `Need ${nextCost.toLocaleString()} GP (have ${playerGoldEquivalent.toLocaleString()} GP equiv.)`}
        </button>
      )}

      {!canBuyMore && (
        <div className="text-center text-xs text-gray-500 italic">
          Maximum additional professions reached (10/10).
        </div>
      )}

      {/* Roll modal — no cancel, payment already deducted */}
      {showRoller && goldDeducted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-yellow-700 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 text-lg">💼</span>
              <h3 className="text-xl font-bold text-dnd-gold">Rolling Additional Profession</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Paid: <span className="text-yellow-400 font-bold">{nextCost ? nextCost.toLocaleString() : PROFESSION_COST_LADDER[purchased - 1]?.toLocaleString()} GP</span>
              {' '}&mdash; Purchase #{purchased + (confirmed ? 0 : 1)} of 10
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Roll 2d100</span>
                {isRolling && <span className="text-yellow-400 text-sm animate-pulse">Rolling...</span>}
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
                  Added {rolledProfession?.name}!
                </p>
              </div>
            )}

            {confirmed && (
              <button
                onClick={() => { setShowRoller(false); setGoldDeducted(false) }}
                className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}

      {/* Detail popup */}
      {detailPopup && (
        <ProfessionDetailPopup profession={detailPopup} onClose={() => setDetailPopup(null)} />
      )}
    </div>
  )
}
