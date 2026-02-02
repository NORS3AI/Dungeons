import type { ReactNode } from 'react'

export type PanelType = 'character' | 'npc' | 'initiative' | 'notes' | 'dice'
export type LayoutType = 'single' | 'split' | 'grid' | 'main-sidebar'

interface Panel {
  id: string
  type: PanelType
  title: string
  content: ReactNode
  color?: 'ally' | 'enemy' | 'neutral'
  minimized?: boolean
}

interface MultiPanelLayoutProps {
  panels: Panel[]
  layout: LayoutType
  onLayoutChange: (layout: LayoutType) => void
  onPanelClose: (id: string) => void
  onPanelMinimize: (id: string) => void
}

export function MultiPanelLayout({
  panels,
  layout,
  onLayoutChange,
  onPanelClose,
  onPanelMinimize,
}: MultiPanelLayoutProps) {
  const visiblePanels = panels.filter((p) => !p.minimized)
  const minimizedPanels = panels.filter((p) => p.minimized)

  const getLayoutClasses = () => {
    switch (layout) {
      case 'split':
        return 'grid grid-cols-2 gap-4'
      case 'grid':
        return 'grid grid-cols-2 grid-rows-2 gap-4'
      case 'main-sidebar':
        return 'grid grid-cols-3 gap-4'
      default:
        return 'flex flex-col gap-4'
    }
  }

  const getPanelClasses = (index: number) => {
    if (layout === 'main-sidebar' && index === 0) {
      return 'col-span-2 row-span-2'
    }
    return ''
  }

  const getColorClasses = (color?: Panel['color']) => {
    switch (color) {
      case 'ally':
        return 'border-green-600'
      case 'enemy':
        return 'border-red-600'
      case 'neutral':
        return 'border-blue-600'
      default:
        return 'border-gray-700'
    }
  }

  return (
    <div className="space-y-4">
      {/* Layout Controls */}
      <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Layout:</span>
          <div className="flex gap-1">
            {(['single', 'split', 'grid', 'main-sidebar'] as LayoutType[]).map((l) => (
              <button
                key={l}
                onClick={() => onLayoutChange(l)}
                className={`p-2 rounded transition-colors ${
                  layout === l
                    ? 'bg-dnd-gold text-gray-900'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={l.replace('-', ' ')}
              >
                <LayoutIcon type={l} />
              </button>
            ))}
          </div>
        </div>

        {/* Minimized Panels */}
        {minimizedPanels.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Minimized:</span>
            {minimizedPanels.map((panel) => (
              <button
                key={panel.id}
                onClick={() => onPanelMinimize(panel.id)}
                className={`px-3 py-1 rounded text-sm transition-colors ${getColorClasses(panel.color)} border bg-gray-700 hover:bg-gray-600 text-white`}
              >
                {panel.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Panel Grid */}
      {visiblePanels.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400">No panels open. Add panels from the menu above.</p>
        </div>
      ) : (
        <div className={getLayoutClasses()}>
          {visiblePanels.map((panel, index) => (
            <div
              key={panel.id}
              className={`bg-gray-800 rounded-xl border-2 ${getColorClasses(panel.color)} overflow-hidden flex flex-col ${getPanelClasses(index)}`}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  {panel.color && (
                    <span
                      className={`w-3 h-3 rounded-full ${
                        panel.color === 'ally'
                          ? 'bg-green-500'
                          : panel.color === 'enemy'
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}
                    />
                  )}
                  <h3 className="font-semibold text-white">{panel.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onPanelMinimize(panel.id)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Minimize"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onPanelClose(panel.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="Close"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {panel.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LayoutIcon({ type }: { type: LayoutType }) {
  switch (type) {
    case 'single':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="2" width="16" height="16" rx="1" />
        </svg>
      )
    case 'split':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="2" width="7" height="16" rx="1" />
          <rect x="11" y="2" width="7" height="16" rx="1" />
        </svg>
      )
    case 'grid':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="2" width="7" height="7" rx="1" />
          <rect x="11" y="2" width="7" height="7" rx="1" />
          <rect x="2" y="11" width="7" height="7" rx="1" />
          <rect x="11" y="11" width="7" height="7" rx="1" />
        </svg>
      )
    case 'main-sidebar':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="2" width="11" height="16" rx="1" />
          <rect x="15" y="2" width="3" height="7" rx="1" />
          <rect x="15" y="11" width="3" height="7" rx="1" />
        </svg>
      )
  }
}

// NPC Stat Block Display
export function NPCStatBlock({ npc }: { npc: { name: string; type: string; alignment?: string; armorClass: number; hitPoints: { current: number; maximum: number }; speed: { walk: number }; abilityScores: Record<string, number>; actions?: { name: string; description: string }[] } }) {
  const getMod = (score: number) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  return (
    <div className="space-y-3 text-sm">
      <div className="border-b border-red-800 pb-2">
        <h4 className="text-lg font-bold text-red-400">{npc.name}</h4>
        <p className="text-gray-400 italic">{npc.type}{npc.alignment && `, ${npc.alignment}`}</p>
      </div>

      <div className="border-b border-gray-700 pb-2">
        <p><span className="text-red-400 font-semibold">AC</span> {npc.armorClass}</p>
        <p><span className="text-red-400 font-semibold">HP</span> {npc.hitPoints.current}/{npc.hitPoints.maximum}</p>
        <p><span className="text-red-400 font-semibold">Speed</span> {npc.speed.walk} ft.</p>
      </div>

      <div className="grid grid-cols-6 gap-2 text-center border-b border-gray-700 pb-2">
        {Object.entries(npc.abilityScores).map(([ability, score]) => (
          <div key={ability}>
            <div className="text-xs text-gray-500 uppercase">{ability.slice(0, 3)}</div>
            <div className="text-white">{score}</div>
            <div className="text-gray-400 text-xs">({getMod(score)})</div>
          </div>
        ))}
      </div>

      {npc.actions && npc.actions.length > 0 && (
        <div>
          <h5 className="text-red-400 font-semibold border-b border-red-800 pb-1 mb-2">Actions</h5>
          {npc.actions.map((action, i) => (
            <div key={i} className="mb-2">
              <span className="font-semibold text-white italic">{action.name}. </span>
              <span className="text-gray-300">{action.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
