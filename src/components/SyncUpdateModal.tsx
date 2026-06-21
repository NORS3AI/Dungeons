import { useState } from 'react'
import { useCharacterStore } from '../stores/characterStore'
import { useSettingsStore } from '../stores/settingsStore'
import { CONTENT_VERSION } from '../data/contentVersion'

interface SyncUpdateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SyncUpdateModal({ isOpen, onClose }: SyncUpdateModalProps) {
  const [syncResult, setSyncResult] = useState<{ synced: number; changes: string[] } | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const { syncAllContent } = useCharacterStore()
  const { setLastSyncedContentVersion } = useSettingsStore()

  if (!isOpen) return null

  const handleSync = () => {
    setIsSyncing(true)
    const result = syncAllContent()
    setLastSyncedContentVersion(CONTENT_VERSION)
    setSyncResult(result)
    setIsSyncing(false)
  }

  const handleDismiss = () => {
    setLastSyncedContentVersion(CONTENT_VERSION)
    onClose()
  }

  const handleClose = () => {
    setSyncResult(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-dnd-gold/50 overflow-hidden">
        {/* Header */}
        <div className="bg-dnd-gold/10 border-b border-dnd-gold/30 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-dnd-gold/20 rounded-full flex items-center justify-center text-dnd-gold text-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-dnd-gold">Content Update Available</h2>
            <p className="text-xs text-gray-400">New classes, features, or balance changes detected</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {!syncResult ? (
            <>
              <p className="text-gray-300 text-sm mb-4">
                The app has been updated with new content. Syncing will refresh your characters'
                class features, race traits, and subclass data to match the latest definitions.
              </p>
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 mb-4">
                <div className="text-xs font-bold text-gray-500 uppercase mb-2">What gets synced</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">+</span> Class features & descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">+</span> Subclass features & expanded spells
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">+</span> Race traits & ability bonuses
                  </li>
                </ul>
                <div className="text-xs font-bold text-gray-500 uppercase mt-3 mb-2">What stays the same</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">=</span> Your HP, level, ability scores
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">=</span> Equipment, inventory, gold
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">=</span> Chosen spells, skill proficiencies
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {syncResult.synced > 0 ? (
                <>
                  <div className="flex items-center gap-2 text-green-400 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {syncResult.synced} character{syncResult.synced !== 1 ? 's' : ''} updated
                  </div>
                  <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {syncResult.changes.map((change, i) => (
                      <p key={i} className="text-xs text-gray-400 py-0.5">{change}</p>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-blue-400 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All characters are already up to date
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex gap-3">
          {!syncResult ? (
            <>
              <button
                onClick={handleDismiss}
                className="flex-1 px-4 py-2.5 bg-gray-700 text-gray-300 font-medium rounded-lg
                         hover:bg-gray-600 transition-colors text-sm"
              >
                Later
              </button>
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="flex-1 px-4 py-2.5 bg-dnd-gold text-gray-900 font-bold rounded-lg
                         hover:bg-yellow-500 disabled:opacity-50 transition-colors text-sm"
              >
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              className="w-full px-4 py-2.5 bg-dnd-gold text-gray-900 font-bold rounded-lg
                       hover:bg-yellow-500 transition-colors text-sm"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
