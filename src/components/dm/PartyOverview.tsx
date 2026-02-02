import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCharacterStore } from '../../stores/characterStore'
import { useCampaignStore } from '../../stores/campaignStore'
import type { Character } from '../../types'
import { calculateModifier, calculateProficiencyBonus } from '../../utils/calculations'

interface PartyOverviewProps {
  onSelectCharacter?: (character: Character) => void
}

export function PartyOverview({ onSelectCharacter }: PartyOverviewProps) {
  const { characters } = useCharacterStore()
  const { partyCharacterIds, addToParty, removeFromParty, addSessionNote, getNotesForCharacter } = useCampaignStore()
  const [showAddCharacter, setShowAddCharacter] = useState(false)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [noteContent, setNoteContent] = useState('')

  const partyCharacters = characters.filter((c) => partyCharacterIds.includes(c.id))
  const availableCharacters = characters.filter((c) => !partyCharacterIds.includes(c.id))

  const handleAddNote = (characterId: string) => {
    if (noteContent.trim()) {
      addSessionNote(characterId, noteContent.trim())
      setNoteContent('')
      setEditingNotes(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dnd-gold">Party Overview</h2>
        <button
          onClick={() => setShowAddCharacter(!showAddCharacter)}
          className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          {showAddCharacter ? 'Cancel' : 'Add to Party'}
        </button>
      </div>

      {/* Add Character Dropdown */}
      {showAddCharacter && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Add Character to Party</h3>
          {availableCharacters.length === 0 ? (
            <p className="text-gray-400">No available characters. Create one first.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableCharacters.map((char) => (
                <button
                  key={char.id}
                  onClick={() => {
                    addToParty(char.id)
                    setShowAddCharacter(false)
                  }}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                >
                  <div className="font-medium text-white">{char.name || 'Unnamed'}</div>
                  <div className="text-sm text-gray-400">
                    {char.race?.name || 'Unknown'} {char.class?.name || 'Unknown'}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Party Characters */}
      {partyCharacters.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400 mb-4">No characters in party yet.</p>
          <button
            onClick={() => setShowAddCharacter(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Add Your First Character
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {partyCharacters.map((character) => (
            <PartyCharacterCard
              key={character.id}
              character={character}
              notes={getNotesForCharacter(character.id)}
              editingNotes={editingNotes === character.id}
              noteContent={noteContent}
              onEditNotes={() => setEditingNotes(character.id)}
              onNoteChange={setNoteContent}
              onSaveNote={() => handleAddNote(character.id)}
              onCancelNote={() => {
                setEditingNotes(null)
                setNoteContent('')
              }}
              onRemove={() => removeFromParty(character.id)}
              onSelect={() => onSelectCharacter?.(character)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface PartyCharacterCardProps {
  character: Character
  notes: { id: string; content: string; date: string }[]
  editingNotes: boolean
  noteContent: string
  onEditNotes: () => void
  onNoteChange: (content: string) => void
  onSaveNote: () => void
  onCancelNote: () => void
  onRemove: () => void
  onSelect?: () => void
}

function PartyCharacterCard({
  character,
  notes,
  editingNotes,
  noteContent,
  onEditNotes,
  onNoteChange,
  onSaveNote,
  onCancelNote,
  onRemove,
  onSelect,
}: PartyCharacterCardProps) {
  const [showNotes, setShowNotes] = useState(false)

  const hpPercent = character.hitPoints.maximum > 0
    ? (character.hitPoints.current / character.hitPoints.maximum) * 100
    : 100
  const hpColor = hpPercent > 50 ? 'bg-green-500' : hpPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">{character.name || 'Unnamed'}</h3>
            <p className="text-sm text-gray-400">
              Level {character.level} {character.race?.name || ''} {character.class?.name || ''}
            </p>
          </div>
          <div className="flex gap-1">
            <Link
              to={`/character/${character.id}`}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="View Character Sheet"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
            <button
              onClick={onRemove}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Remove from Party"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        {/* HP Bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">HP</span>
            <span className="text-white font-medium">
              {character.hitPoints.current} / {character.hitPoints.maximum}
              {character.hitPoints.temporary > 0 && (
                <span className="text-blue-400"> (+{character.hitPoints.temporary})</span>
              )}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full ${hpColor} transition-all`} style={{ width: `${Math.min(100, hpPercent)}%` }} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="text-xs text-gray-400">AC</div>
            <div className="text-lg font-bold text-white">{character.armorClass}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="text-xs text-gray-400">Init</div>
            <div className="text-lg font-bold text-white">
              {calculateModifier(character.abilityScores.dexterity) >= 0 ? '+' : ''}
              {calculateModifier(character.abilityScores.dexterity)}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="text-xs text-gray-400">Prof</div>
            <div className="text-lg font-bold text-white">+{calculateProficiencyBonus(character.level)}</div>
          </div>
        </div>

        {/* Conditions */}
        {character.conditions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {character.conditions.map((condition) => (
              <span
                key={condition}
                className="px-2 py-0.5 bg-red-900/50 text-red-300 text-xs rounded-full"
              >
                {condition}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Notes ({notes.length})
          </button>
          {onSelect && (
            <button
              onClick={onSelect}
              className="flex-1 px-3 py-1.5 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-sm font-medium rounded-lg transition-colors"
            >
              Select
            </button>
          )}
        </div>
      </div>

      {/* Session Notes */}
      {showNotes && (
        <div className="p-4 border-t border-gray-700 bg-gray-900/50">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Session Notes</h4>

          {notes.length === 0 && !editingNotes && (
            <p className="text-gray-500 text-sm mb-2">No notes yet.</p>
          )}

          {notes.slice(0, 3).map((note) => (
            <div key={note.id} className="mb-2 p-2 bg-gray-800 rounded text-sm">
              <div className="text-gray-500 text-xs mb-1">
                {new Date(note.date).toLocaleDateString()}
              </div>
              <div className="text-gray-300">{note.content}</div>
            </div>
          ))}

          {editingNotes ? (
            <div className="space-y-2">
              <textarea
                value={noteContent}
                onChange={(e) => onNoteChange(e.target.value)}
                placeholder="Add a session note..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm resize-none focus:border-dnd-gold focus:outline-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={onSaveNote}
                  className="px-3 py-1 bg-dnd-gold text-gray-900 text-sm rounded font-medium hover:bg-yellow-500"
                >
                  Save
                </button>
                <button
                  onClick={onCancelNote}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onEditNotes}
              className="text-sm text-dnd-gold hover:text-yellow-400 transition-colors"
            >
              + Add Note
            </button>
          )}
        </div>
      )}
    </div>
  )
}
