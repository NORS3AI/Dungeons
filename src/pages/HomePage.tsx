import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { exportCharacterToJSON, importCharacterFromJSON, exportAllCharactersToJSON } from '../utils/characterIO'

export function HomePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const { characters, loadCharacter, deleteCharacter, importCharacter } = useCharacterStore()

  const handleExportCharacter = (characterId: string) => {
    const character = characters.find((c) => c.id === characterId)
    if (character) {
      exportCharacterToJSON(character)
    }
  }

  const handleExportAll = () => {
    if (characters.length > 0) {
      exportAllCharactersToJSON(characters)
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setImportError(null)
      const character = await importCharacterFromJSON(file)
      importCharacter(character)
      navigate(`/character/${character.id}`)
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import character')
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleViewCharacter = (characterId: string) => {
    loadCharacter(characterId)
    navigate(`/character/${characterId}`)
  }

  const handleDeleteCharacter = (characterId: string, characterName: string) => {
    if (confirm(`Are you sure you want to delete ${characterName || 'this character'}?`)) {
      deleteCharacter(characterId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gold-500 mb-4">
          Dungeons
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          D&D 5th Edition Character Creator & DM Tool.
          Create characters with a simple click-and-create flow.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <Link to="/create" className="card hover:border-gold-500 transition-colors group">
          <div className="text-4xl mb-4">&#9876;</div>
          <h2 className="text-2xl font-bold text-gold-500 mb-2 group-hover:text-gold-400">
            Create Character
          </h2>
          <p className="text-gray-400">
            Build your hero step by step. Choose race, class, stats, spells, and equipment.
          </p>
        </Link>

        <Link to="/campaign" className="card hover:border-gold-500 transition-colors group">
          <div className="text-4xl mb-4">&#128220;</div>
          <h2 className="text-2xl font-bold text-gold-500 mb-2 group-hover:text-gold-400">
            DM Tools
          </h2>
          <p className="text-gray-400">
            Manage your campaign. Track characters, NPCs, and run encounters.
          </p>
        </Link>
      </div>

      {/* My Characters Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dnd-gold">My Characters</h2>
          <div className="flex gap-2">
            <button
              onClick={handleImportClick}
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                       transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            >
              Import Character
            </button>
            {characters.length > 0 && (
              <button
                onClick={handleExportAll}
                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                         transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold"
              >
                Export All
              </button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        {importError && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
            {importError}
          </div>
        )}

        {characters.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-400 mb-4">No characters yet.</p>
            <Link
              to="/create"
              className="text-dnd-gold hover:text-yellow-400 font-medium"
            >
              Create your first character
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {characters.map((character) => (
              <div
                key={character.id}
                className="card flex items-center justify-between hover:border-gray-600"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-white">
                    {character.name || 'Unnamed Character'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Level {character.level}{' '}
                    {character.race?.name || 'Unknown Race'}{' '}
                    {character.class?.name || 'Unknown Class'}
                    {character.subclass && ` (${character.subclass.name})`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewCharacter(character.id)}
                    className="px-3 py-1 text-sm bg-dnd-gold text-gray-900 rounded hover:bg-yellow-500
                             transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleExportCharacter(character.id)}
                    className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600
                             transition-colors"
                  >
                    Export
                  </button>
                  <button
                    onClick={() => handleDeleteCharacter(character.id, character.name)}
                    className="px-3 py-1 text-sm bg-red-900/30 text-red-400 rounded hover:bg-red-900/50
                             transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-lg text-gray-500 mb-4">Currently Supporting</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400">
          <div>
            <span className="text-gold-500 font-semibold">Fighter</span> (Champion, Battle Master)
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Warlock</span> (Great Old One, Fiend, Archfey)
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Human</span>
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Dwarf</span>
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Half-Elf</span>
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Drow</span>
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Tiefling</span>
          </div>
        </div>
      </div>
    </div>
  )
}
