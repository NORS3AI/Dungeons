import { useState, useEffect } from 'react'
import type { Character } from '../types'
import { RACE_NAME_TABLES, generateRandomName } from '../data/names'

interface CharacterEditModalProps {
  character: Character
  isOpen: boolean
  onClose: () => void
  onSave: (details: {
    name: string
    firstName?: string
    surname?: string
    nickname?: string
    playerName: string
    gender?: 'male' | 'female' | 'other'
    age: string
    height: string
    weight: string
    backstory: string
  }) => void
}

const inputClass =
  'w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:border-transparent'

const labelClass = 'block text-sm font-medium text-gray-300 mb-2'

export function CharacterEditModal({ character, isOpen, onClose, onSave }: CharacterEditModalProps) {
  const [formData, setFormData] = useState({
    firstName: character.firstName ?? character.name ?? '',
    surname: character.surname ?? '',
    nickname: character.nickname ?? '',
    playerName: character.playerName,
    gender: character.gender,
    age: character.age,
    height: character.height,
    weight: character.weight,
    backstory: character.backstory,
  })

  // Default the generator race to the character's current race (if available in table)
  const defaultRace = RACE_NAME_TABLES.find((r) => r.raceId === character.race?.id)?.raceId ?? 'human'
  const [generatorRace, setGeneratorRace] = useState(defaultRace)

  // Sync when character prop changes
  useEffect(() => {
    setFormData({
      firstName: character.firstName ?? character.name ?? '',
      surname: character.surname ?? '',
      nickname: character.nickname ?? '',
      playerName: character.playerName,
      gender: character.gender,
      age: character.age,
      height: character.height,
      weight: character.weight,
      backstory: character.backstory,
    })
    setGeneratorRace(
      RACE_NAME_TABLES.find((r) => r.raceId === character.race?.id)?.raceId ?? 'human'
    )
  }, [character])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
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

  const composeName = (first: string, surname: string) =>
    [first.trim(), surname.trim()].filter(Boolean).join(' ')

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateName = () => {
    const gender: 'male' | 'female' | 'neutral' =
      formData.gender === 'male' ? 'male' :
      formData.gender === 'female' ? 'female' :
      'neutral'
    const { firstName, surname } = generateRandomName(generatorRace, gender)
    setFormData((prev) => ({ ...prev, firstName, surname }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { firstName, surname, nickname, ...rest } = formData
    onSave({
      ...rest,
      firstName,
      surname,
      nickname,
      name: composeName(firstName, surname),
    })
    onClose()
  }

  const fullNamePreview = [
    formData.firstName.trim(),
    formData.nickname.trim() ? `"${formData.nickname.trim()}"` : '',
    formData.surname.trim(),
  ].filter(Boolean).join(' ')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* ── Name Section ── */}
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Name</h3>

            {/* Generator row */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className={labelClass}>Race (for name generator)</label>
                <select
                  value={generatorRace}
                  onChange={(e) => setGeneratorRace(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                >
                  {RACE_NAME_TABLES.map((r) => (
                    <option key={r.raceId} value={r.raceId}>{r.label}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleGenerateName}
                className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors whitespace-nowrap"
                title="Generate a random name based on race and gender"
              >
                🎲 Generate Name
              </button>
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
                className={inputClass}
                placeholder="e.g., Araevin"
              />
            </div>

            {/* Surname + Nickname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="surname" className={labelClass}>
                  Surname <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleChange('surname', e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Moonwhisper"
                />
              </div>
              <div>
                <label htmlFor="nickname" className={labelClass}>
                  Nickname <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleChange('nickname', e.target.value)}
                  className={inputClass}
                  placeholder='e.g., "Quickhand"'
                />
              </div>
            </div>

            {/* Full name preview */}
            {formData.firstName.trim() && (
              <div className="text-sm text-gray-400">
                Full name:{' '}
                <span className="text-dnd-gold font-medium">{fullNamePreview}</span>
              </div>
            )}
          </div>

          {/* Player Name */}
          <div>
            <label htmlFor="playerName" className={labelClass}>Player Name</label>
            <input
              id="playerName"
              type="text"
              value={formData.playerName}
              onChange={(e) => handleChange('playerName', e.target.value)}
              className={inputClass}
              placeholder="Enter player name"
            />
          </div>

          {/* Gender */}
          <div>
            <label className={labelClass}>Gender</label>
            <div className="flex gap-3">
              {(['male', 'female', 'other'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleChange('gender', g)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 capitalize
                             focus:outline-none focus:ring-2 focus:ring-dnd-gold
                             ${
                               formData.gender === g
                                 ? 'bg-dnd-gold text-gray-900'
                                 : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
                             }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Age / Height / Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['age', 'height', 'weight'] as const).map((field) => (
              <div key={field}>
                <label htmlFor={field} className={labelClass}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  type="text"
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className={inputClass}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}
          </div>

          {/* Backstory */}
          <div>
            <label htmlFor="backstory" className={labelClass}>Backstory</label>
            <textarea
              id="backstory"
              value={formData.backstory}
              onChange={(e) => handleChange('backstory', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:border-transparent resize-none"
              placeholder="Enter character backstory..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-dnd-gold text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
