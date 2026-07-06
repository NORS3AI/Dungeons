import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../../stores/characterStore'
import { useCampaignStore } from '../../stores/campaignStore'
import { calculateModifier } from '../../utils/calculations'

interface PartyMemberSwitcherProps {
  currentCharacterId?: string
  compact?: boolean
}

/**
 * Party Member Switcher Component
 * Allows DM to quickly switch between party members' character sheets
 * Can be used in encounters, initiative tracker, or any DM view
 */
export function PartyMemberSwitcher({ currentCharacterId, compact = false }: PartyMemberSwitcherProps) {
  const navigate = useNavigate()
  const { characters } = useCharacterStore()
  const { partyCharacterIds } = useCampaignStore()
  const [isOpen, setIsOpen] = useState(false)

  const partyCharacters = characters.filter((c) => partyCharacterIds.includes(c.id))

  const handleSelectCharacter = (characterId: string) => {
    navigate(`/character/${characterId}`)
    setIsOpen(false)
  }

  if (partyCharacters.length === 0) {
    return null
  }

  const currentCharacter = partyCharacters.find((c) => c.id === currentCharacterId)

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${
          compact
            ? 'px-3 py-1.5 text-sm'
            : 'px-4 py-2'
        } bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-gray-600`}
        title="Switch Party Member"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="hidden sm:inline">
          {currentCharacter ? currentCharacter.name || 'Party' : 'Party'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 z-50 w-72 sm:w-80 max-h-96 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase border-b border-gray-700 mb-2">
                Party Members
              </div>

              {partyCharacters.map((character) => {
                const hpPercent = character.hitPoints.maximum > 0
                  ? (character.hitPoints.current / character.hitPoints.maximum) * 100
                  : 100
                const hpColor = hpPercent > 50 ? 'bg-green-500' : hpPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
                const isActive = character.id === currentCharacterId

                return (
                  <button
                    key={character.id}
                    onClick={() => handleSelectCharacter(character.id)}
                    className={`w-full p-3 rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-dnd-gold/20 border-2 border-dnd-gold'
                        : 'bg-gray-900/50 hover:bg-gray-700 border border-transparent'
                    }`}
                  >
                    {/* Character Name & Class */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {character.name || 'Unnamed'}
                        </div>
                        <div className="text-xs text-gray-400">
                          Lv {character.level} {character.race?.name} {character.class?.name}
                        </div>
                      </div>
                      {isActive && (
                        <svg className="w-5 h-5 text-dnd-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>

                    {/* HP Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">HP</span>
                        <span className="text-gray-300">
                          {character.hitPoints.current} / {character.hitPoints.maximum}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${hpColor} transition-all`}
                          style={{ width: `${Math.min(100, hpPercent)}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gray-800 rounded px-2 py-1">
                        <div className="text-[10px] text-gray-500">AC</div>
                        <div className="text-sm font-bold text-white">{character.armorClass}</div>
                      </div>
                      <div className="bg-gray-800 rounded px-2 py-1">
                        <div className="text-[10px] text-gray-500">Init</div>
                        <div className="text-sm font-bold text-white">
                          {calculateModifier(character.abilityScores.dexterity) >= 0 ? '+' : ''}
                          {calculateModifier(character.abilityScores.dexterity)}
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded px-2 py-1">
                        <div className="text-[10px] text-gray-500">Speed</div>
                        <div className="text-sm font-bold text-white">{character.speed || 30}</div>
                      </div>
                    </div>

                    {/* Conditions */}
                    {(character.conditions ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(character.conditions ?? []).slice(0, 3).map((condition) => (
                          <span
                            key={condition}
                            className="px-1.5 py-0.5 bg-red-900/50 text-red-300 text-[10px] rounded"
                          >
                            {condition}
                          </span>
                        ))}
                        {(character.conditions ?? []).length > 3 && (
                          <span className="px-1.5 py-0.5 bg-red-900/50 text-red-300 text-[10px] rounded">
                            +{(character.conditions ?? []).length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
