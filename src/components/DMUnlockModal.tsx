import { useState } from 'react'
import { useSettingsStore } from '../stores/settingsStore'

interface DMUnlockModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DMUnlockModal({ isOpen, onClose }: DMUnlockModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const { unlockDMMode, dmModeEnabled } = useSettingsStore()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = unlockDMMode(code)

    if (success) {
      setError('')
      setCode('')
      // Show success message briefly then close
      setTimeout(() => {
        onClose()
      }, 1500)
    } else {
      setError('Invalid code. Please try again.')
      setCode('')
    }
  }

  const handleDisableDMMode = () => {
    useSettingsStore.getState().setDMMode(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">DM Tools</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {dmModeEnabled ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-900/30 border border-green-600/50 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">DM Mode Enabled</span>
              </div>
              <p className="text-sm text-gray-300">
                You have access to DM tools and features throughout the app. Look for purple "DM Edit" buttons on character sheets.
              </p>
            </div>

            <button
              onClick={handleDisableDMMode}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors"
            >
              Disable DM Mode
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">
              Enter the secret code to unlock DM tools and enhanced editing features.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="dm-code" className="block text-sm font-medium text-gray-400 mb-2">
                  Secret Code
                </label>
                <input
                  id="dm-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter code..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           placeholder-gray-500"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-600/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!code.trim()}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700
                         disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors
                         disabled:cursor-not-allowed"
              >
                Unlock DM Mode
              </button>
            </form>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center">
                DM tools include enhanced character editing, HP management, condition tracking, and more.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
