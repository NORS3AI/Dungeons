import { useState } from 'react'
import { generateLoot, generateLegendaryLoot, getClassLootSuggestions, getRaceLootSuggestions, RARITY_COLORS, type LootItem, type LootRarity } from '../data/lootGenerator'
import type { Character } from '../types'

interface LootCacheProps {
  character: Character
  onAddToInventory?: (item: LootItem) => void
}

const QUANTITY_OPTIONS = [1, 3, 5, 10, 25] as const
const RARITY_OPTIONS: { rarity: LootRarity; label: string; hint: string }[] = [
  { rarity: 'artifact', label: 'ARTIFACT', hint: '0.5% chance' },
  { rarity: 'legendary', label: 'LEGENDARY', hint: 'Very rare' },
  { rarity: 'epic', label: 'EPIC', hint: 'Very rare' },
  { rarity: 'rare', label: 'RARE', hint: 'Rare' },
  { rarity: 'uncommon', label: 'UNCOMMON', hint: 'Uncommon' },
  { rarity: 'common', label: 'COMMON', hint: 'Common' },
  { rarity: 'trash', label: 'TRASH', hint: 'Worthless' },
]

export function LootCache({ character, onAddToInventory }: LootCacheProps) {
  const [generatedLoot, setGeneratedLoot] = useState<LootItem[]>([])
  const [lootCount, setLootCount] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [legendaryLoot, setLegendaryLoot] = useState<LootItem[]>([])
  const [isGeneratingLegendary, setIsGeneratingLegendary] = useState(false)
  const [selectedRarity, setSelectedRarity] = useState<LootRarity>('rare')
  const [legendaryQuantity, setLegendaryQuantity] = useState<number>(1)

  const handleGenerateLoot = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const loot = generateLoot({
        characterLevel: character.level,
        className: character.class?.name,
        raceName: character.race?.name,
        count: lootCount,
      })
      setGeneratedLoot(loot)
      setIsGenerating(false)
    }, 500)
  }

  const handleAddToInventory = (item: LootItem) => {
    if (onAddToInventory) {
      onAddToInventory(item)
    }
    // Remove from generated loot
    setGeneratedLoot((prev) => prev.filter((i) => i.id !== item.id))
  }

  const handleAddLegendaryToInventory = (item: LootItem) => {
    if (onAddToInventory) {
      onAddToInventory(item)
    }
    // Remove from legendary loot
    setLegendaryLoot((prev) => prev.filter((i) => i.id !== item.id))
  }

  const handleGenerateLegendaryLoot = (rarity: LootRarity, quantity: number) => {
    setIsGeneratingLegendary(true)

    setTimeout(() => {
      const loot = generateLegendaryLoot(rarity, quantity)
      setLegendaryLoot((prev) => [...prev, ...loot])
      setIsGeneratingLegendary(false)
    }, 500)
  }

  const classSuggestions = getClassLootSuggestions(character.class?.name)
  const raceSuggestions = getRaceLootSuggestions(character.race?.name)

  return (
    <div className="space-y-6">
      {/* Legendary Loot Generator (DM Only) */}
      <div className="card bg-gradient-to-br from-purple-900/30 to-red-900/30 border-2 border-dnd-gold p-6">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">✨ Legendary Loot Generator</h2>
        <p className="text-gray-300 mb-4">
          <strong>Weekly Session Rewards</strong> - Pick a rarity and how many items to generate.
          Artifact items are extremely rare (0.5% chance) and game-breaking!
        </p>

        {/* Rarity Selection */}
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block">Rarity</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {RARITY_OPTIONS.map(({ rarity, label, hint }) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedRarity === rarity
                    ? `${RARITY_COLORS[rarity].border} ${RARITY_COLORS[rarity].bg} ${RARITY_COLORS[rarity].glow} ring-2 ring-offset-2 ring-offset-gray-900 ring-dnd-gold`
                    : `${RARITY_COLORS[rarity].border} ${RARITY_COLORS[rarity].bg} ${RARITY_COLORS[rarity].glow} opacity-60`
                }`}
              >
                <div className={`text-sm font-bold ${RARITY_COLORS[rarity].text}`}>{label}</div>
                <div className="text-xs text-gray-400 mt-1">{hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection + Generate */}
        <div className="flex items-end gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Quantity</label>
            <div className="flex gap-2">
              {QUANTITY_OPTIONS.map((qty) => (
                <button
                  key={qty}
                  onClick={() => setLegendaryQuantity(qty)}
                  className={`w-12 h-10 rounded-lg border-2 text-sm font-bold transition-all ${
                    legendaryQuantity === qty
                      ? 'border-dnd-gold bg-dnd-gold/20 text-dnd-gold'
                      : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleGenerateLegendaryLoot(selectedRarity, legendaryQuantity)}
            disabled={isGeneratingLegendary}
            className={`px-6 py-2.5 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 ${RARITY_COLORS[selectedRarity].border} ${RARITY_COLORS[selectedRarity].bg} ${RARITY_COLORS[selectedRarity].text} hover:scale-105`}
          >
            {isGeneratingLegendary ? 'Generating...' : `Generate ${legendaryQuantity} ${selectedRarity.charAt(0).toUpperCase() + selectedRarity.slice(1)}`}
          </button>
        </div>

        {isGeneratingLegendary && (
          <div className="text-center text-dnd-gold animate-pulse mt-4">
            ✨ Generating legendary loot...
          </div>
        )}
      </div>

      {/* Legendary Loot Display */}
      {legendaryLoot.length > 0 && (
        <div className="card bg-gray-800 border-2 border-dnd-gold p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-dnd-gold">⚡ Legendary Loot</h3>
            <button
              onClick={() => setLegendaryLoot([])}
              className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-all"
            >
              Clear All
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {legendaryLoot.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 ${RARITY_COLORS[item.rarity].border} ${RARITY_COLORS[item.rarity].bg} ${RARITY_COLORS[item.rarity].glow} transition-all hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className={`font-bold ${RARITY_COLORS[item.rarity].text}`}>{item.name}</div>
                    <div className={`text-xs uppercase font-bold mt-1 ${RARITY_COLORS[item.rarity].text}`}>
                      {item.rarity}
                    </div>
                  </div>
                  <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-3">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-yellow-500 font-medium">{item.value} gp</span>
                    {item.quantity && (
                      <span className="text-gray-400 ml-2">x{item.quantity}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddLegendaryToInventory(item)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-all"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header and Info */}
      <div className="card bg-gray-800 border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-dnd-gold mb-4">Standard Loot Cache</h2>
        <p className="text-gray-300 mb-4">
          Generate random loot appropriate for your character's level, class, and race.
          Higher levels increase chances of rare items.
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">Items to Generate:</label>
            <select
              value={lootCount}
              onChange={(e) => setLootCount(Number(e.target.value))}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
            >
              <option value={1}>1 item</option>
              <option value={3}>3 items</option>
              <option value={5}>5 items</option>
              <option value={10}>10 items</option>
            </select>
          </div>

          <button
            onClick={handleGenerateLoot}
            disabled={isGenerating}
            className="px-6 py-2 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : '🎲 Generate Loot'}
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Character Level: {character.level}</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">
            Better loot at higher levels!
          </span>
        </div>
      </div>

      {/* Class/Race Preferences */}
      <div className="grid md:grid-cols-2 gap-4">
        {classSuggestions.length > 0 && (
          <div className="card bg-gray-800 border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              {character.class?.name} Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {classSuggestions.slice(0, 8).map((suggestion, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-900/30 border border-blue-700/50 rounded text-xs text-blue-300"
                >
                  {suggestion}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Items your class typically uses
            </p>
          </div>
        )}

        {raceSuggestions.length > 0 && (
          <div className="card bg-gray-800 border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              {character.race?.name} Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {raceSuggestions.map((suggestion, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-900/30 border border-green-700/50 rounded text-xs text-green-300"
                >
                  {suggestion}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Cultural items for your race
            </p>
          </div>
        )}
      </div>

      {/* Generated Loot */}
      {generatedLoot.length > 0 && (
        <div className="card bg-gray-800 border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Generated Loot</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedLoot.map((item) => {
              // Handle old rarities that don't exist in new system
              const rarityColors = RARITY_COLORS[item.rarity] || RARITY_COLORS.common
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-2 ${rarityColors.border} ${rarityColors.bg} ${rarityColors.glow} transition-all hover:scale-105`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className={`font-semibold ${rarityColors.text}`}>{item.name}</div>
                      <div className={`text-xs uppercase font-medium mt-1 ${rarityColors.text}`}>
                        {item.rarity}
                      </div>
                    </div>
                    <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-yellow-500 font-medium">{item.value} gp</span>
                      {item.quantity && (
                        <span className="text-gray-400 ml-2">x{item.quantity}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToInventory(item)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-all"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded text-sm text-blue-300">
            <strong>Tip:</strong> Click "Add" to transfer items to your inventory. Generate new loot as often as you like!
          </div>
        </div>
      )}

      {/* Empty State */}
      {generatedLoot.length === 0 && !isGenerating && (
        <div className="card bg-gray-800 border-gray-700 p-12 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Loot Generated Yet</h3>
          <p className="text-gray-500">
            Click "Generate Loot" above to discover treasures for your character!
          </p>
        </div>
      )}

      {/* Rarity Legend */}
      <div className="card bg-gray-800 border-gray-700 p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Rarity Guide</h4>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-xs text-gray-500">Trash</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-xs text-gray-400">Common</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-green-400">Uncommon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-xs text-blue-400">Rare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <span className="text-xs text-purple-400">Epic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs text-yellow-400">Legendary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-xs text-red-400">Artifact</span>
          </div>
        </div>
      </div>
    </div>
  )
}
