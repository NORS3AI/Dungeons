import { useEffect } from 'react'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Shortcut {
  key: string
  description: string
  context?: string
}

const shortcuts: Shortcut[] = [
  // Global shortcuts
  { key: 'Tab', description: 'Navigate forward between interactive elements', context: 'Global' },
  { key: 'Shift + Tab', description: 'Navigate backward between interactive elements', context: 'Global' },
  { key: 'Enter', description: 'Activate buttons or advance to next field', context: 'Global' },
  { key: 'Esc', description: 'Close modals and dialogs', context: 'Global' },
  { key: '?', description: 'Show this keyboard shortcuts guide', context: 'Global' },

  // Character creation
  { key: 'Enter', description: 'Move to next input field', context: 'Character Creation' },
  { key: 'Tab / Shift+Tab', description: 'Navigate between form fields', context: 'Character Creation' },

  // Character sheet
  { key: 'Arrow Keys', description: 'Navigate between tabs', context: 'Character Sheet' },
  { key: 'Enter', description: 'Activate selected tab or button', context: 'Character Sheet' },

  // Spell selection
  { key: 'Space', description: 'Select/deselect spell', context: 'Spell Selection' },
  { key: 'Arrow Keys', description: 'Navigate spell list', context: 'Spell Selection' },

  // Inventory
  { key: 'E', description: 'Equip/unequip selected item', context: 'Inventory' },
  { key: 'Delete', description: 'Remove selected item', context: 'Inventory' },
]

const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
  const context = shortcut.context || 'Other'
  if (!acc[context]) {
    acc[context] = []
  }
  acc[context].push(shortcut)
  return acc
}, {} as Record<string, Shortcut[]>)

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 id="shortcuts-title" className="text-2xl font-bold text-dnd-gold">
              Keyboard Shortcuts
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Navigate Dungeons efficiently with these keyboard shortcuts
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700
                     transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            aria-label="Close shortcuts guide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {Object.entries(groupedShortcuts).map(([context, contextShortcuts]) => (
            <div key={context}>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-dnd-gold rounded"></span>
                {context}
              </h3>
              <div className="space-y-2">
                {contextShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg
                             hover:bg-gray-900 transition-colors"
                  >
                    <span className="text-gray-300">{shortcut.description}</span>
                    <kbd className="px-3 py-1.5 text-sm font-mono bg-gray-700 text-white rounded border
                                   border-gray-600 shadow-sm min-w-[80px] text-center">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Tips */}
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded"></span>
              Tips
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-dnd-gold mt-1">•</span>
                <span>All interactive elements have focus indicators (gold outline) for easier keyboard navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-dnd-gold mt-1">•</span>
                <span>Forms auto-advance to the next field when you press Enter in text inputs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-dnd-gold mt-1">•</span>
                <span>Use Tab to navigate forward and Shift+Tab to navigate backward through any page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-dnd-gold mt-1">•</span>
                <span>Most modals can be closed with the Escape key for quick access</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-dnd-gold text-gray-900 font-semibold rounded-lg
                     hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2
                     focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
