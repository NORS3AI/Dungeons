import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { exportCharacterToJSON, importCharacterFromJSON, exportAllCharactersToJSON } from '../utils/characterIO'
import { ContentReferenceModal } from '../components/ContentReferenceModal'

export function HomePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [showFullContent, setShowFullContent] = useState(false)
  const [referenceModal, setReferenceModal] = useState<{ type: 'class' | 'race' | null; name: string | null }>({ type: null, name: null })
  const { characters, loadCharacter, deleteCharacter, importCharacter } = useCharacterStore()

  const handleShowReference = (type: 'class' | 'race', name: string) => {
    setReferenceModal({ type, name })
  }

  const handleCloseReference = () => {
    setReferenceModal({ type: null, name: null })
  }

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
      <div className="text-center mb-16 animate-in fade-in duration-700">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold-400 via-yellow-500 to-gold-600
                       bg-clip-text text-transparent mb-6 pb-4 leading-[1.2] overflow-visible">
          Dungeons
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          D&D 5th Edition Character Creator & DM Tool
        </p>
        <p className="text-gray-500 mt-2">
          Create characters with a simple click-and-create flow
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 px-2 py-4">
        <Link to="/create" className="group relative overflow-visible">
          <div className="card-interactive relative z-10 overflow-visible">
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              &#9876;
            </div>
            <h2 className="text-2xl font-bold text-gold-500 mb-3 group-hover:text-gold-400 transition-colors">
              Create Character
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Build your hero step by step. Choose race, class, stats, spells, and equipment.
            </p>
            <div className="mt-4 flex items-center text-gold-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
              Get Started
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0
                          group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </Link>

        <Link to="/campaign" className="group relative overflow-visible">
          <div className="card-interactive relative z-10 overflow-visible">
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              &#128220;
            </div>
            <h2 className="text-2xl font-bold text-gold-500 mb-3 group-hover:text-gold-400 transition-colors">
              DM Tools
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Manage your campaign. Track characters, NPCs, and run encounters.
            </p>
            <div className="mt-4 flex items-center text-gold-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
              Launch Tools
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0
                          group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </Link>
      </div>

      {/* My Characters Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-yellow-600
                         bg-clip-text text-transparent">
            My Characters
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600
                       text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
            {characters.length > 0 && (
              <button
                onClick={handleExportAll}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600
                         text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-dnd-gold"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
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
          <div className="card text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🎭</div>
            <p className="text-gray-400 mb-4 text-lg">No characters yet</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-600 to-yellow-600
                       text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                       transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create your first character
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {characters.map((character, index) => (
              <div
                key={character.id}
                className="card hover:border-gold-500/50 group transition-all duration-300
                          hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                      {character.name || 'Unnamed Character'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-gold-600/20 text-gold-400 rounded-md font-medium border border-gold-600/30">
                        Level {character.level}
                      </span>
                      <span className="text-gray-400">
                        {character.race?.name || 'Unknown Race'}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">
                        {character.class?.name || 'Unknown Class'}
                        {character.subclass && ` (${character.subclass.name})`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleViewCharacter(character.id)}
                      className="flex items-center gap-1 px-4 py-2 text-sm bg-gradient-to-r from-gold-600 to-yellow-600
                               text-white font-medium rounded-lg shadow-md hover:shadow-lg
                               transform hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => handleExportCharacter(character.id)}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 text-gray-300
                               rounded-lg hover:bg-gray-600 shadow-md hover:shadow-lg
                               transform hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Export
                    </button>
                    <button
                      onClick={() => handleDeleteCharacter(character.id, character.name)}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-red-900/30 text-red-400
                               rounded-lg hover:bg-red-900/50 border border-red-800/50
                               shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Overview Section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="card text-center">
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="flex items-center justify-center gap-2 mx-auto text-gold-500 hover:text-gold-400
                     font-semibold transition-colors group"
          >
            <span className="text-lg">
              {showFullContent ? 'Hide Full Content List' : 'View All Available Content'}
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${showFullContent ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showFullContent && (
            <div className="mt-8 pt-8 border-t border-gray-700 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Summary Stats */}
              <div className="mb-8 p-4 bg-gradient-to-r from-gold-600/10 to-yellow-600/10 rounded-lg border border-gold-500/30">
                <p className="text-center text-2xl font-bold text-gold-400">
                  658 Total Pieces of Game Content
                </p>
                <p className="text-center text-sm text-gray-400 mt-1">
                  Everything you need to start playing D&D 5e right now
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Classes Column */}
                <div>
                  <h3 className="text-xl font-bold text-gold-500 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚔️</span>
                    Classes & Subclasses
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 italic">Click any class to learn more</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { name: 'Amazon', subcount: '3 disciplines', custom: true },
                      { name: 'Barbarian', subcount: '2 subclasses' },
                      { name: 'Bard', subcount: '2 subclasses' },
                      { name: 'Cleric', subcount: '2 domains' },
                      { name: 'Death Knight', subcount: '3 specializations', custom: true },
                      { name: 'Demon Hunter', subcount: '3 specializations', custom: true },
                      { name: 'Druid', subcount: '2 subclasses' },
                      { name: 'Fighter', subcount: '3 subclasses' },
                      { name: 'Monk', subcount: '2 subclasses' },
                      { name: 'Necromancer', subcount: '3 paths', custom: true },
                      { name: 'Paladin', subcount: '2 oaths' },
                      { name: 'Ranger', subcount: '2 subclasses' },
                      { name: 'Rogue', subcount: '2 subclasses' },
                      { name: 'Sorcerer', subcount: '2 origins' },
                      { name: 'Warlock', subcount: '5 patrons' },
                      { name: 'Wizard', subcount: '2 schools' },
                    ].map((cls) => (
                      <button
                        key={cls.name}
                        onClick={() => handleShowReference('class', cls.name)}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-700/50 transition-colors
                                 border border-transparent hover:border-gold-500/30 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-white group-hover:text-gold-400 transition-colors">
                              {cls.name}
                            </span>
                            <span className="text-gray-400"> - {cls.subcount}</span>
                          </div>
                          {cls.custom && (
                            <span className="px-2 py-0.5 bg-purple-900/30 text-purple-400 text-xs rounded font-medium">
                              Custom
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-gold-400 font-medium">
                    Total: 16 Classes (12 PHB + 4 Custom), 40 Subclasses
                  </p>
                </div>

                {/* Races & Content Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gold-500 mb-4 flex items-center gap-2">
                      <span className="text-2xl">👥</span>
                      Playable Races
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 italic">Click any race to learn more</p>

                    <div className="flex flex-wrap gap-2 text-sm">
                      {['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling',
                        'Dragonborn', 'Drow', 'Aasimar', 'Goliath', 'Tabaxi', 'Kenku', 'Firbolg',
                        'Lizardfolk', 'Triton', 'Tortle', 'Yuan-ti Pureblood', 'Kobold', 'Aarakocra', 'Eladrin', 'Sea Elf']
                        .map(race => (
                          <button
                            key={race}
                            onClick={() => handleShowReference('race', race)}
                            className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded-md
                                     hover:bg-gold-600/20 hover:text-gold-400 hover:border-gold-500/50
                                     border border-transparent transition-all duration-200
                                     transform hover:scale-105 font-medium"
                          >
                            {race}
                          </button>
                        ))}
                    </div>
                    <p className="mt-3 text-gold-400 font-medium">
                      Total: 23 Races
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gold-500 mb-4 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      Spells & Features
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Spells (Cantrips - 9th Level)</span>
                        <span className="font-semibold text-white">401</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Class Features & Traits</span>
                        <span className="font-semibold text-white">96</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Feats</span>
                        <span className="font-semibold text-white">18</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Weapons</span>
                        <span className="font-semibold text-white">37</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Armor & Shields</span>
                        <span className="font-semibold text-white">13</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conditions</span>
                        <span className="font-semibold text-white">14</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-gray-500 text-sm">
                  Based on D&D 5th Edition 2024 Player's Handbook
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Reference Modal */}
      <ContentReferenceModal
        isOpen={referenceModal.type !== null}
        onClose={handleCloseReference}
        type={referenceModal.type}
        name={referenceModal.name}
      />
    </div>
  )
}
