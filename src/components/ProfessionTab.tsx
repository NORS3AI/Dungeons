import { useState } from 'react'
import type { Character, SailorRole, ShipDetails } from '../types'
import { useCharacterStore } from '../stores/characterStore'
import { ALL_PROFESSIONS, CATEGORY_INFO } from '../data/professions'

// ------------------------------------------------------------------
// Profession flavour data — traits, perks, duties per profession ID
// ------------------------------------------------------------------

interface ProfessionFlavour {
  icon: string
  duties: string[]
  perks: string[]
  skills: string[]
}

const PROFESSION_FLAVOUR: Record<string, ProfessionFlavour> = {
  sailor: {
    icon: '⚓',
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
    skills: ['Athletics', 'Perception', 'Navigation', 'Knot-tying'],
  },
  'ship-captain': {
    icon: '🚢',
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
    skills: ['Athletics', 'Perception', 'Persuasion', 'Navigation', 'Leadership'],
  },
  soldier: {
    icon: '⚔️',
    duties: [
      'Patrol assigned routes and guard posts',
      'Train daily with arms and formation drills',
      'Obey orders from commanding officers',
      'Maintain armour, weapons, and kit',
      'Participate in campaigns and sieges',
    ],
    perks: [
      'Proficiency with all martial weapons',
      'Military rank — guards and soldiers show deference',
      'Access to military supply depots and fortifications',
      'Veteran\'s instinct — advantage on Initiative rolls',
      'Brotherhood — fellow soldiers will vouch for you',
    ],
    skills: ['Athletics', 'Intimidation', 'Survival', 'History (military)'],
  },
  merchant: {
    icon: '💰',
    duties: [
      'Source and purchase goods at competitive prices',
      'Transport merchandise safely to market',
      'Negotiate deals and manage supplier relationships',
      'Keep accurate accounts and ledgers',
      'Hire guards and staff as needed',
    ],
    perks: [
      'Proficiency with merchant\'s scales and ledgers',
      'Advantage on Insight to detect dishonest deals',
      'Network of buyers, sellers, and money changers',
      'Access to rare goods and black market contacts',
      'Letters of credit accepted at major cities',
    ],
    skills: ['Persuasion', 'Insight', 'Deception', 'History (trade)'],
  },
  scholar: {
    icon: '📚',
    duties: [
      'Research assigned topics and compile findings',
      'Teach students or apprentices',
      'Copy and preserve important texts',
      'Advise nobles or institutions on matters of learning',
      'Translate ancient languages and decipher documents',
    ],
    perks: [
      'Access to university libraries and rare manuscripts',
      'Advantage on History and Arcana checks',
      'Scholarly correspondence network across the realm',
      'Respected in educated circles — invitations to salons',
      'Institutional backing for legitimate research',
    ],
    skills: ['History', 'Arcana', 'Investigation', 'Linguistics'],
  },
  physician: {
    icon: '⚕️',
    duties: [
      'Diagnose and treat injuries and ailments',
      'Prepare medicines, salves, and tinctures',
      'Advise patients on diet, rest, and lifestyle',
      'Perform surgery when necessary',
      'Keep detailed patient records',
    ],
    perks: [
      'Proficiency with healer\'s kit and herbalism kit',
      'Advantage on Medicine checks',
      'Access to rare medicinal ingredients',
      'Clients in wealthy and noble circles',
      'Legal authority to prescribe controlled substances',
    ],
    skills: ['Medicine', 'Nature', 'Perception', 'Alchemy'],
  },
  craftsman: {
    icon: '🔨',
    duties: [
      'Produce goods to order and to standard',
      'Maintain tools, forge, or workshop',
      'Source quality raw materials',
      'Train apprentices in the craft',
      'Fulfil guild contracts and quotas',
    ],
    perks: [
      'Proficiency with relevant artisan\'s tools',
      'Advantage on checks to appraise crafted goods',
      'Guild membership — legal protection and support',
      'Wholesale pricing on materials',
      'Reputation among buyers who seek quality work',
    ],
    skills: ['Relevant tool proficiency', 'History (craft)', 'Athletics'],
  },
  priest: {
    icon: '🛐',
    duties: [
      'Lead religious ceremonies and rites',
      'Counsel and comfort the faithful',
      'Maintain the temple and its grounds',
      'Collect tithes and manage temple finances',
      'Carry out the will and edicts of the faith',
    ],
    perks: [
      'Advantage on Religion checks',
      'Shelter and aid at any temple of your faith',
      'Access to divine spellcasting components',
      'Moral authority over the faithful',
      'Channel through temple communication network',
    ],
    skills: ['Religion', 'Persuasion', 'Medicine', 'Insight'],
  },
  hunter: {
    icon: '🏹',
    duties: [
      'Track, stalk, and take game in the wilderness',
      'Prepare and sell hides, meat, and trophies',
      'Maintain traps, snares, and hunting gear',
      'Know the territory and seasonal patterns',
      'Cull dangerous animals threatening settlements',
    ],
    perks: [
      'Proficiency with ranged weapons and hunting tools',
      'Advantage on Survival checks in the wild',
      'Favoured terrain — your hunting grounds',
      'Contacts among trappers, fur traders, and rangers',
      'Monster-hunting reputation if you tackle big prey',
    ],
    skills: ['Survival', 'Stealth', 'Perception', 'Nature'],
  },
}

const DEFAULT_FLAVOUR: ProfessionFlavour = {
  icon: '🪙',
  duties: ['Perform your trade faithfully each day', 'Maintain your reputation and contacts'],
  perks: ['Steady daily income', 'Professional network in your field'],
  skills: ['Relevant profession skills'],
}

// ------------------------------------------------------------------
// Sailor role picker and ship details form
// ------------------------------------------------------------------

const SAILOR_ROLES: { id: SailorRole; label: string; icon: string; description: string }[] = [
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
  {
    id: 'navy',
    label: 'Navy Sailor',
    icon: '🎖️',
    description: 'You serve the crown or a military order. You have rank, discipline, and a chain of command.',
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
  notes: '',
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
  const isCapt = role === 'captain'
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
        ].map((chip) => (
          <span
            key={chip.label}
            className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${chip.color}`}
          >
            {chip.label}: {chip.value}
          </span>
        ))}
      </div>

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
  const profId = income
    ? ALL_PROFESSIONS.find(
        (p) => p.name.toLowerCase() === income.professionName.toLowerCase()
      )?.id ?? ''
    : ''

  const flavour = PROFESSION_FLAVOUR[profId] ?? DEFAULT_FLAVOUR

  // Is this a maritime profession?
  const isMaritime = ['sailor', 'ship-captain'].includes(profId)
  const sailorRole: SailorRole = professionData.sailorRole ?? (profId === 'ship-captain' ? 'captain' : 'crew')
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
    ? `${income.amount} ${income.currency === 'gold' ? 'GP' : income.currency === 'silver' ? 'SP' : 'CP'}/day`
    : null

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gray-800/60 rounded-xl p-5 border border-gray-700">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{flavour.icon}</span>
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

      {/* Relevant Skills */}
      {flavour.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {flavour.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

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

      {/* Income reminder */}
      <div className="text-xs text-gray-500 text-center">
        Daily income is collected via the <span className="text-gray-400 font-medium">New Day</span> button on the Overview tab.
      </div>
    </div>
  )
}
