import { useState, useEffect } from 'react'
import type { Character } from '../types'

interface CharacterEditModalProps {
  character: Character
  isOpen: boolean
  onClose: () => void
  onSave: (details: {
    name: string
    playerName: string
    age: string
    height: string
    weight: string
    backstory: string
  }) => void
}

export function CharacterEditModal({ character, isOpen, onClose, onSave }: CharacterEditModalProps) {
  const [formData, setFormData] = useState({
    name: character.name,
    playerName: character.playerName,
    age: character.age,
    height: character.height,
    weight: character.weight,
    backstory: character.backstory,
  })

  // Update form when character changes
  useEffect(() => {
    setFormData({
      name: character.name,
      playerName: character.playerName,
      age: character.age,
      height: character.height,
      weight: character.weight,
      backstory: character.backstory,
    })
  }, [character])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dnd-gold">Edit Character Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Character Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Character Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:ring-2
                       focus:ring-dnd-gold focus:border-transparent"
              placeholder="Enter character name"
            />
          </div>

          {/* Player Name */}
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-300 mb-2">
              Player Name
            </label>
            <input
              id="playerName"
              type="text"
              value={formData.playerName}
              onChange={(e) => handleChange('playerName', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:ring-2
                       focus:ring-dnd-gold focus:border-transparent"
              placeholder="Enter player name"
            />
          </div>

          {/* Age, Height, Weight (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                Age
              </label>
              <input
                id="age"
                type="text"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:ring-2
                         focus:ring-dnd-gold focus:border-transparent"
                placeholder="Age"
              />
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                Height
              </label>
              <input
                id="height"
                type="text"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:ring-2
                         focus:ring-dnd-gold focus:border-transparent"
                placeholder="Height"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                Weight
              </label>
              <input
                id="weight"
                type="text"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:ring-2
                         focus:ring-dnd-gold focus:border-transparent"
                placeholder="Weight"
              />
            </div>
          </div>

          {/* Backstory */}
          <div>
            <label htmlFor="backstory" className="block text-sm font-medium text-gray-300 mb-2">
              Backstory
            </label>
            <textarea
              id="backstory"
              value={formData.backstory}
              onChange={(e) => handleChange('backstory', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:ring-2
                       focus:ring-dnd-gold focus:border-transparent resize-none"
              placeholder="Enter character backstory..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600
                       transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-dnd-gold text-gray-900 rounded-lg hover:bg-yellow-500
                       transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
