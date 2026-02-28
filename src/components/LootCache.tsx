import { useState } from 'react'
import { generateLoot, generateLegendaryLoot, RARITY_COLORS, type LootItem, type LootRarity } from '../data/lootGenerator'
import {
  BLACKSMITHING_ORE_BY_TIER,
  TAILORING_MATERIALS_BY_TIER,
  ALCHEMY_HERB_BY_TIER,
  ENCHANTING_MATERIALS_BY_TIER,
  TIER_COLORS,
  type CraftingTier,
} from '../data/craftingData'
import type { Character } from '../types'

interface LootCacheProps {
  character: Character
  onAddToInventory?: (item: LootItem) => void
  dmModeEnabled?: boolean
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

const TIERS: CraftingTier[] = ['common', 'uncommon', 'rare', 'epic', 'legendary']
const TIER_LABELS: Record<CraftingTier, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
}

// Human-readable names for material IDs
const MATERIAL_NAMES: Record<string, string> = {
  'iron-ore': 'Iron Ore',
  'copper-ore': 'Copper Ore',
  'iron-ore-unc': 'Iron Ore (Refined)',
  'copper-ore-unc': 'Copper Ore (Refined)',
  'silver-ore': 'Silver Ore',
  'gold-ore': 'Gold Ore',
  'mithril-ore': 'Mithril Ore',
  'adamantite-ore': 'Adamantite Ore',
  'mithril-ore-epic': 'Mithril Ore (Pure)',
  'adamantite-ore-epic': 'Adamantite Ore (Pure)',
  'obsidian-steel-ore': 'Obsidian Steel Ore',
  'linen-cloth': 'Linen Cloth',
  'wool-cloth': 'Wool Cloth',
  'light-hide': 'Light Hide',
  'silk-cloth': 'Silk Cloth',
  'cotton-cloth': 'Cotton Cloth',
  'thick-hide': 'Thick Hide',
  'enchanted-cloth': 'Enchanted Cloth',
  'scaled-hide': 'Scaled Hide',
  'shadowweave-cloth': 'Shadowweave Cloth',
  'wyvern-hide': 'Wyvern Hide',
  'void-silk': 'Void Silk',
  'dragonscale-leather': 'Dragonscale Leather',
  'common-herb-lavender': 'Lavender',
  'common-herb-mint': 'Mint Leaves',
  'uncommon-herb-foxglove': 'Foxglove',
  'uncommon-herb-wolfsbane': 'Wolfsbane',
  'rare-herb-mandrake': 'Mandrake Root',
  'rare-herb-bloodthorn': 'Bloodthorn',
  'rare-herb-nightshade': 'Nightshade',
  'rare-herb-phoenix': 'Phoenix Feather',
  'legendary-herb-starbloom': 'Starbloom',
  'legendary-herb-soulroot': 'Soulroot',
  'magical-dust': 'Magical Dust',
  'magical-shard': 'Magical Shard',
}

const matName = (id: string) =>
  MATERIAL_NAMES[id] ?? id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const WORK_SKILLS: { key: string; label: string; icon: string; byTier: Record<CraftingTier, string[]> }[] = [
  { key: 'blacksmithing', label: 'Blacksmithing', icon: '⚒️', byTier: BLACKSMITHING_ORE_BY_TIER },
  { key: 'tailoring', label: 'Tailoring', icon: '🧵', byTier: TAILORING_MATERIALS_BY_TIER },
  { key: 'alchemy', label: 'Alchemy', icon: '⚗️', byTier: ALCHEMY_HERB_BY_TIER },
  { key: 'enchanting', label: 'Enchanting', icon: '✨', byTier: ENCHANTING_MATERIALS_BY_TIER },
]

function CollapseToggle({ open, onToggle, label }: { open: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
    >
      {open ? 'Hide' : 'Show'} {label}
      <svg
        className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export function LootCache({ character, onAddToInventory, dmModeEnabled = false }: LootCacheProps) {
  const [generatedLoot, setGeneratedLoot] = useState<LootItem[]>([])
  const [lootCount, setLootCount] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [legendaryLoot, setLegendaryLoot] = useState<LootItem[]>([])
  const [isGeneratingLegendary, setIsGeneratingLegendary] = useState(false)
  const [selectedRarity, setSelectedRarity] = useState<LootRarity>('rare')
  const [legendaryQuantity, setLegendaryQuantity] = useState<number>(1)

  // Collapse states
  const [showLegendaryResults, setShowLegendaryResults] = useState(true)
  const [showGeneratedLoot, setShowGeneratedLoot] = useState(true)
  const [showMatsReference, setShowMatsReference] = useState(false)

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
      setShowGeneratedLoot(true)
      setIsGenerating(false)
    }, 500)
  }

  const handleAddToInventory = (item: LootItem) => {
    if (onAddToInventory) onAddToInventory(item)
    setGeneratedLoot((prev) => prev.filter((i) => i.id !== item.id))
  }

  const handleAddLegendaryToInventory = (item: LootItem) => {
    if (onAddToInventory) onAddToInventory(item)
    setLegendaryLoot((prev) => prev.filter((i) => i.id !== item.id))
  }

  const handleGenerateLegendaryLoot = (rarity: LootRarity, quantity: number) => {
    setIsGeneratingLegendary(true)
    setTimeout(() => {
      const loot = generateLegendaryLoot(rarity, quantity)
      setLegendaryLoot((prev) => [...prev, ...loot])
      setShowLegendaryResults(true)
      setIsGeneratingLegendary(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Legendary Loot Generator (DM Only) */}
      {dmModeEnabled && (
        <div className="card bg-gradient-to-br from-purple-900/30 to-red-900/30 border-2 border-dnd-gold p-6">
          <h2 className="text-3xl font-bold text-dnd-gold mb-2">✨ Legendary Loot Generator</h2>
          <p className="text-gray-300 mb-4">
            <strong>Weekly Session Rewards</strong> - Pick a rarity and how many items to generate.
            Artifact items are extremely rare (0.5% chance) and game-breaking!
          </p>

          {/* Rarity Selection */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Rarity</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {RARITY_OPTIONS.map(({ rarity, label, hint }) => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedRarity === rarity
                      ? `${RARITY_COLORS[rarity].border} ${RARITY_COLORS[rarity].bg} ${RARITY_COLORS[rarity].glow} ring-2 ring-offset-2 ring-offset-gray-900 ring-dnd-gold`
                      : `${RARITY_COLORS[rarity].border} ${RARITY_COLORS[rarity].bg} ${RARITY_COLORS[rarity].glow} opacity-60`
                  }`}
                >
                  <div className={`text-xs sm:text-sm font-bold ${RARITY_COLORS[rarity].text}`}>{label}</div>
                  <div className="text-xs text-gray-400 mt-1">{hint}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection + Generate */}
          <div className="flex items-end gap-4 flex-wrap">
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

          {/* Mats by Quality — collapsible */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-dnd-gold">🪨 Mats by Quality</h3>
              <CollapseToggle
                open={showMatsReference}
                onToggle={() => setShowMatsReference(!showMatsReference)}
                label="reference"
              />
            </div>
            {showMatsReference && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3">
                {WORK_SKILLS.map(({ key, label, icon, byTier }) => (
                  <div key={key} className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{icon}</span>
                      <span className="font-bold text-white">{label}</span>
                    </div>
                    <div className="space-y-3">
                      {TIERS.map((tier) => {
                        const mats = byTier[tier]
                        const colors = TIER_COLORS[tier]
                        return (
                          <div key={tier}>
                            <div className={`text-xs font-bold uppercase mb-1 ${colors.text}`}>
                              {TIER_LABELS[tier]}
                            </div>
                            <div className="space-y-0.5">
                              {mats.map((matId) => (
                                <div
                                  key={matId}
                                  className={`text-xs px-2 py-1 rounded border ${colors.border} ${colors.bg} ${colors.text}`}
                                >
                                  {matName(matId)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legendary Loot Display — collapsible */}
      {dmModeEnabled && legendaryLoot.length > 0 && (
        <div className="card bg-gray-800 border-2 border-dnd-gold p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-dnd-gold">⚡ Legendary Loot</h3>
            <div className="flex items-center gap-3">
              <CollapseToggle
                open={showLegendaryResults}
                onToggle={() => setShowLegendaryResults(!showLegendaryResults)}
                label="loot"
              />
              <button
                onClick={() => setLegendaryLoot([])}
                className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
          {showLegendaryResults && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {legendaryLoot.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 sm:p-4 rounded-lg border-2 ${RARITY_COLORS[item.rarity].border} ${RARITY_COLORS[item.rarity].bg} ${RARITY_COLORS[item.rarity].glow} transition-all hover:scale-105`}
                >
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm sm:text-base ${RARITY_COLORS[item.rarity].text} break-words`}>{item.name}</div>
                      <div className={`text-xs uppercase font-bold mt-1 ${RARITY_COLORS[item.rarity].text}`}>
                        {item.rarity}
                      </div>
                    </div>
                    <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 mb-3 break-words">{item.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    {item.quantity && <div className="text-sm text-gray-400">Qty: {item.quantity}</div>}
                    <button
                      onClick={() => handleAddLegendaryToInventory(item)}
                      className="px-3 py-1.5 sm:py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-all whitespace-nowrap ml-auto"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Standard Loot Cache — header and controls */}
      <div className="card bg-gray-800 border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-dnd-gold mb-4">Standard Loot Cache</h2>
        <p className="text-gray-300 mb-4">
          Generate random loot appropriate for your character's level, class, and race.
          Higher levels increase chances of rare items.
        </p>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
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
          <span className="text-gray-400">Better loot at higher levels!</span>
        </div>
      </div>

      {/* Generated Loot — collapsible */}
      {generatedLoot.length > 0 && (
        <div className="card bg-gray-800 border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Generated Loot</h3>
            <CollapseToggle
              open={showGeneratedLoot}
              onToggle={() => setShowGeneratedLoot(!showGeneratedLoot)}
              label="loot"
            />
          </div>

          {showGeneratedLoot && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {generatedLoot.map((item) => {
                  const rarityColors = RARITY_COLORS[item.rarity] || RARITY_COLORS.common
                  return (
                    <div
                      key={item.id}
                      className={`p-3 sm:p-4 rounded-lg border-2 ${rarityColors.border} ${rarityColors.bg} ${rarityColors.glow} transition-all hover:scale-105`}
                    >
                      <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm sm:text-base ${rarityColors.text} break-words`}>{item.name}</div>
                          <div className={`text-xs uppercase font-medium mt-1 ${rarityColors.text}`}>
                            {item.rarity}
                          </div>
                        </div>
                        <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400 whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3 break-words">{item.description}</p>
                      <div className="flex items-center justify-between gap-2">
                        {item.quantity && <div className="text-sm text-gray-400">Qty: {item.quantity}</div>}
                        <button
                          onClick={() => handleAddToInventory(item)}
                          className="px-3 py-1.5 sm:py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-all whitespace-nowrap ml-auto"
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
            </>
          )}
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
          {[
            { color: 'bg-gray-500', text: 'text-gray-500', label: 'Trash' },
            { color: 'bg-gray-400', text: 'text-gray-400', label: 'Common' },
            { color: 'bg-green-400', text: 'text-green-400', label: 'Uncommon' },
            { color: 'bg-blue-400', text: 'text-blue-400', label: 'Rare' },
            { color: 'bg-purple-400', text: 'text-purple-400', label: 'Epic' },
            { color: 'bg-yellow-400', text: 'text-yellow-400', label: 'Legendary' },
            { color: 'bg-red-400', text: 'text-red-400', label: 'Artifact' },
          ].map(({ color, text, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`}></div>
              <span className={`text-xs ${text}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
