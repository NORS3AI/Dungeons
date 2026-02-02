import { useState } from 'react'
import { PartyOverview, InitiativeTracker, NPCCreator, EncounterBuilder, QuickNPCSelector } from '../components/dm'
import { useCampaignStore, type NPC } from '../stores/campaignStore'
import { DiceRoller } from '../components/DiceRoller'

type Tab = 'party' | 'initiative' | 'npcs' | 'encounter' | 'dice'

export function CampaignPage() {
  const [activeTab, setActiveTab] = useState<Tab>('party')
  const [showNPCCreator, setShowNPCCreator] = useState(false)
  const [editingNPC, setEditingNPC] = useState<NPC | null>(null)
  const { npcs, deleteNPC, duplicateNPC } = useCampaignStore()

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'party',
      label: 'Party',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'initiative',
      label: 'Initiative',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'npcs',
      label: 'NPCs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'encounter',
      label: 'Encounter',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'dice',
      label: 'Dice',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z" />
        </svg>
      ),
    },
  ]

  const handleEditNPC = (npc: NPC) => {
    setEditingNPC(npc)
    setShowNPCCreator(true)
  }

  const handleCloseNPCCreator = () => {
    setShowNPCCreator(false)
    setEditingNPC(null)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header - mobile optimized */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-dnd-gold">DM Campaign Tools</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Manage your party, NPCs, and encounters</p>
        </div>
      </div>

      {/* Tab Navigation - horizontally scrollable on mobile */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto">
          <nav className="flex overflow-x-auto scrollbar-hide -mx-1 px-2 sm:px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap min-w-max ${
                  activeTab === tab.id
                    ? 'text-dnd-gold border-dnd-gold bg-gray-900/50'
                    : 'text-gray-400 border-transparent hover:text-white active:bg-gray-700/50'
                }`}
              >
                {tab.icon}
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Party Overview */}
        {activeTab === 'party' && <PartyOverview />}

        {/* Initiative Tracker */}
        {activeTab === 'initiative' && <InitiativeTracker />}

        {/* NPCs */}
        {activeTab === 'npcs' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Header with actions - stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-dnd-gold">NPC Library</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <QuickNPCSelector />
                <button
                  onClick={() => setShowNPCCreator(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Custom NPC</span>
                </button>
              </div>
            </div>

            {npcs.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-gray-800 rounded-lg border border-gray-700">
                <div className="text-4xl mb-3">👤</div>
                <p className="text-gray-400 mb-4">No NPCs created yet.</p>
                <p className="text-gray-500 text-sm mb-4">Use Quick NPC for common characters or create a custom one.</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center px-4">
                  <QuickNPCSelector />
                  <button
                    onClick={() => setShowNPCCreator(true)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Create Custom NPC
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {npcs.map((npc) => (
                  <NPCCard
                    key={npc.id}
                    npc={npc}
                    onEdit={() => handleEditNPC(npc)}
                    onDelete={() => deleteNPC(npc.id)}
                    onDuplicate={() => duplicateNPC(npc.id)}
                  />
                ))}
              </div>
            )}

            {/* NPC Creator Modal - fullscreen on mobile */}
            {showNPCCreator && (
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
                <div className="absolute inset-0 bg-black/70" onClick={handleCloseNPCCreator} />
                <div className="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-gray-800 sm:rounded-xl rounded-t-xl">
                  <NPCCreator onSave={handleCloseNPCCreator} editingNPC={editingNPC} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Encounter Builder */}
        {activeTab === 'encounter' && <EncounterBuilder />}

        {/* Dice Roller */}
        {activeTab === 'dice' && (
          <div className="max-w-md mx-auto">
            <DiceRoller />
          </div>
        )}
      </div>
    </div>
  )
}

interface NPCCardProps {
  npc: NPC
  onEdit: () => void
  onDelete: () => void
  onDuplicate: () => void
}

function NPCCard({ npc, onEdit, onDelete, onDuplicate }: NPCCardProps) {
  const [showActions, setShowActions] = useState(false)

  const getMod = (score: number) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-red-900/30 border-b border-red-800">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-red-400">{npc.name}</h3>
            <p className="text-sm text-gray-400">
              {npc.type}{npc.race && ` (${npc.race})`}
              {npc.alignment && ` - ${npc.alignment}`}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            {showActions && (
              <div className="absolute right-0 mt-1 w-32 bg-gray-700 rounded-lg shadow-lg overflow-hidden z-10">
                <button
                  onClick={() => {
                    onEdit()
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDuplicate()
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    onDelete()
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="text-xs text-gray-400">AC</div>
            <div className="text-lg font-bold text-white">{npc.armorClass}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="text-xs text-gray-400">HP</div>
            <div className="text-lg font-bold text-white">{npc.hitPoints.maximum}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="text-xs text-gray-400">CR</div>
            <div className="text-lg font-bold text-white">{npc.challengeRating || '-'}</div>
          </div>
        </div>

        {/* Ability Scores */}
        <div className="grid grid-cols-6 gap-1 text-center">
          {(Object.entries(npc.abilityScores) as [string, number][]).map(([ability, score]) => (
            <div key={ability} className="bg-gray-900 rounded p-1">
              <div className="text-[10px] text-gray-500 uppercase">{ability.slice(0, 3)}</div>
              <div className="text-sm text-white font-medium">{score}</div>
              <div className="text-[10px] text-gray-400">{getMod(score)}</div>
            </div>
          ))}
        </div>

        {/* Speed */}
        <div className="text-sm text-gray-400">
          <span className="text-gray-500">Speed:</span> {npc.speed.walk} ft.
          {npc.speed.fly && ` / Fly ${npc.speed.fly} ft.`}
          {npc.speed.swim && ` / Swim ${npc.speed.swim} ft.`}
        </div>

        {/* Actions Preview */}
        {npc.actions.length > 0 && (
          <div className="pt-2 border-t border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Actions:</div>
            <div className="flex flex-wrap gap-1">
              {npc.actions.slice(0, 3).map((action, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-900 text-gray-300 text-xs rounded">
                  {action.name}
                </span>
              ))}
              {npc.actions.length > 3 && (
                <span className="px-2 py-0.5 text-gray-500 text-xs">
                  +{npc.actions.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
