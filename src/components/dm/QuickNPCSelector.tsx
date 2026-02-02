import { useState } from 'react'
import { useCampaignStore } from '../../stores/campaignStore'
import { NPC_TEMPLATES, NPC_TEMPLATE_CATEGORIES } from '../../data/npcs/templates'

interface QuickNPCSelectorProps {
  onNPCCreated?: () => void
}

export function QuickNPCSelector({ onNPCCreated }: QuickNPCSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { createNPC } = useCampaignStore()

  const handleSelectNPC = (templateKey: string) => {
    const template = NPC_TEMPLATES[templateKey]
    if (template) {
      createNPC({
        ...template,
        name: template.name,
      })
      setIsOpen(false)
      setSelectedCategory(null)
      onNPCCreated?.()
    }
  }

  const categories = Object.entries(NPC_TEMPLATE_CATEGORIES)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Quick NPC</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => {
              setIsOpen(false)
              setSelectedCategory(null)
            }}
          />

          {/* Dropdown panel */}
          <div className="fixed inset-x-4 bottom-4 top-auto sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden max-h-[70vh] sm:max-h-96 flex flex-col">
            {/* Header */}
            <div className="p-3 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-dnd-gold">
                {selectedCategory ? selectedCategory : 'Quick Add NPC'}
              </h3>
              {selectedCategory ? (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setSelectedCategory(null)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              {!selectedCategory ? (
                // Category list
                <div className="p-2">
                  {categories.map(([category, templates]) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {getCategoryIcon(category)}
                        </span>
                        <div>
                          <div className="font-medium text-white">{category}</div>
                          <div className="text-xs text-gray-400">{templates.length} templates</div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                // NPC list for selected category
                <div className="p-2 grid grid-cols-1 gap-1">
                  {(NPC_TEMPLATE_CATEGORIES as Record<string, string[]>)[selectedCategory]?.map((templateKey) => {
                    const template = NPC_TEMPLATES[templateKey]
                    if (!template) return null

                    return (
                      <button
                        key={templateKey}
                        onClick={() => handleSelectNPC(templateKey)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left active:bg-gray-600"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-lg">
                          {getNPCIcon(template.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">{template.name}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>CR {template.challengeRating}</span>
                            <span className="text-gray-600">|</span>
                            <span>HP {template.hitPoints.maximum}</span>
                            <span className="text-gray-600">|</span>
                            <span>AC {template.armorClass}</span>
                          </div>
                        </div>
                        <div className="text-green-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="p-2 bg-gray-900 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-500">Tap to instantly add to your NPC library</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case 'Townsfolk': return '🏠'
    case 'Guards & Soldiers': return '🛡️'
    case 'Criminals': return '🗡️'
    case 'Beasts': return '🐺'
    case 'Undead': return '💀'
    case 'Monsters': return '👹'
    case 'Powerful': return '⚔️'
    default: return '👤'
  }
}

function getNPCIcon(type: string): string {
  switch (type) {
    case 'Beast': return '🐾'
    case 'Undead': return '💀'
    case 'Giant': return '🦶'
    case 'Humanoid': return '👤'
    default: return '👹'
  }
}
