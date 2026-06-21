import { useEffect, useRef, useState } from 'react'
import { useSettingsStore, THEME_NAMES, FONT_SIZE_VALUES, FONT_FAMILY_NAMES, type Theme, type FontSize, type FontFamily } from '../stores/settingsStore'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const { theme, fontSize, fontFamily, showQuickRefTooltips, apiKey, setTheme, setFontSize, setFontFamily, toggleQuickRefTooltips, setApiKey, logout, resetAllCache } = useSettingsStore()

  // Close on escape key
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

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const themes: Theme[] = ['dark', 'light', 'lighter', 'darker', 'dnd', 'wow', 'final-fantasy', 'diablo']
  const fontSizes: FontSize[] = ['small', 'medium', 'large', 'xlarge']
  const fontFamilies: FontFamily[] = ['default', 'dyslexic']

  const fontSizeLabels: Record<FontSize, string> = {
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    xlarge: 'Extra Large',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 id="settings-title" className="text-2xl font-bold text-dnd-gold">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700
                     transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Theme</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all
                             focus:outline-none focus:ring-2 focus:ring-dnd-gold
                             ${
                               theme === t
                                 ? 'bg-dnd-gold text-gray-900'
                                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                             }`}
                >
                  {THEME_NAMES[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Font Size
              <span className="text-gray-500 font-normal ml-2">({FONT_SIZE_VALUES[fontSize]})</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const idx = fontSizes.indexOf(fontSize)
                  if (idx > 0) setFontSize(fontSizes[idx - 1])
                }}
                disabled={fontSize === 'small'}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50
                         disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                aria-label="Decrease font size"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="flex-1 text-center">
                <span className="text-white font-medium">{fontSizeLabels[fontSize]}</span>
              </div>
              <button
                onClick={() => {
                  const idx = fontSizes.indexOf(fontSize)
                  if (idx < fontSizes.length - 1) setFontSize(fontSizes[idx + 1])
                }}
                disabled={fontSize === 'xlarge'}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50
                         disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                aria-label="Increase font size"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            {/* Font size preview */}
            <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
              <p style={{ fontSize: FONT_SIZE_VALUES[fontSize] }} className="text-gray-300">
                Preview: The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Font Family
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fontFamilies.map((family) => (
                <button
                  key={family}
                  onClick={() => setFontFamily(family)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all
                             focus:outline-none focus:ring-2 focus:ring-dnd-gold
                             ${
                               fontFamily === family
                                 ? 'bg-dnd-gold text-gray-900'
                                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                             }`}
                >
                  {FONT_FAMILY_NAMES[family]}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Dyslexia Friendly font uses OpenDyslexic, designed to make reading easier for people with dyslexia.
            </p>
          </div>

          {/* Quick Reference Tooltips */}
          <div>
            <label className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-300">Quick Reference Tooltips</span>
              <button
                onClick={toggleQuickRefTooltips}
                className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold
                           ${showQuickRefTooltips ? 'bg-dnd-gold' : 'bg-gray-600'}`}
                role="switch"
                aria-checked={showQuickRefTooltips}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                             ${showQuickRefTooltips ? 'left-7' : 'left-1'}`}
                />
              </button>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Show tooltips when hovering over spells, abilities, and other game terms.
            </p>
          </div>

          {/* Claude API Key */}
          <div className="pt-4 border-t border-gray-700">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Claude API Key</label>
            <p className="text-xs text-gray-500 mb-3">
              Required for AI Dungeon Master adventures. Your key is stored locally in your browser only.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm
                           placeholder:text-gray-600 focus:outline-none focus:border-dnd-gold transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                >
                  {showApiKey ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {apiKey && (
              <p className="text-xs text-green-400 mt-2">
                API key saved
              </p>
            )}
          </div>

          {/* Logout */}
          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={() => {
                logout()
                onClose()
              }}
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 font-medium rounded-lg
                       hover:bg-gray-600 border border-gray-600 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Lock App (Logout)
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Locks the app behind the passcode screen. Your data and API key remain saved.
            </p>
          </div>

          {/* Reset Cache */}
          <div className="pt-4 border-t border-gray-700">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Reset All Cache</label>
            <p className="text-xs text-gray-500 mb-3">
              Clears all saved data including characters, settings, and cached files. Use this if you're experiencing display issues.
            </p>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full px-4 py-2 bg-red-900/50 text-red-400 font-medium rounded-lg
                         hover:bg-red-900/70 border border-red-800 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reset All Cache
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-400 font-medium">
                  Are you sure? This will delete all saved characters and settings!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 font-medium rounded-lg
                             hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={resetAllCache}
                    className="flex-1 px-4 py-2 bg-red-700 text-white font-medium rounded-lg
                             hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Yes, Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-dnd-gold text-gray-900 font-semibold rounded-lg
                     hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2
                     focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
