import { useState } from 'react'
import type { Character, Material, CraftingSkills } from '../types'
import {
  BLACKSMITHING_RECIPES,
  TAILORING_RECIPES,
  ALCHEMY_RECIPES,
  ENCHANTING_RECIPES,
  TIER_COLORS,
  TIER_SKILL_RANGES,
  getTierForSkill,
  type CraftedItem,
  type CraftingTier,
} from '../data/craftingData'
import { useCharacterStore } from '../stores/characterStore'

interface WorkTabProps {
  character: Character
}

type Profession = 'blacksmithing' | 'tailoring' | 'alchemy' | 'enchanting'

const PROFESSION_INFO: Record<Profession, {
  label: string
  icon: string
  description: string
  matLabel: string
  matCategory: Material['category'][]
  recipes: CraftedItem[]
  skill: keyof CraftingSkills
}> = {
  blacksmithing: {
    label: 'Blacksmithing',
    icon: '⚒️',
    description: 'Forge weapons from ore mined in the world.',
    matLabel: 'Ores',
    matCategory: ['ore'],
    recipes: BLACKSMITHING_RECIPES,
    skill: 'blacksmithing',
  },
  tailoring: {
    label: 'Tailoring',
    icon: '🧵',
    description: 'Craft armor from cloth and animal hides.',
    matLabel: 'Cloth & Hides',
    matCategory: ['cloth', 'hide', 'leather'],
    recipes: TAILORING_RECIPES,
    skill: 'tailoring',
  },
  alchemy: {
    label: 'Alchemy',
    icon: '⚗️',
    description: 'Brew powerful potions from rare herbs.',
    matLabel: 'Herbs',
    matCategory: ['herb'],
    recipes: ALCHEMY_RECIPES,
    skill: 'alchemy',
  },
  enchanting: {
    label: 'Enchanting',
    icon: '✨',
    description: 'Weave magical scrolls from Dust and Shards.',
    matLabel: 'Dust & Shards',
    matCategory: ['dust', 'shard'],
    recipes: ENCHANTING_RECIPES,
    skill: 'enchanting',
  },
}

const TIER_LABELS: Record<CraftingTier, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
}

function SkillBar({ value, profession }: { value: number; profession: Profession }) {
  const tier = getTierForSkill(value)
  const colors = TIER_COLORS[tier]
  const pct = value

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-300 font-medium">
          {PROFESSION_INFO[profession].label} Skill
        </span>
        <span className={`text-sm font-bold ${colors.text}`}>
          {value} / 100 — <span className="capitalize">{TIER_LABELS[tier]}</span>
        </span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            tier === 'legendary' ? 'bg-yellow-500' :
            tier === 'epic'      ? 'bg-purple-500' :
            tier === 'rare'      ? 'bg-blue-500' :
            tier === 'uncommon'  ? 'bg-green-500' :
                                   'bg-gray-400'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-0.5">
        {(['common', 'uncommon', 'rare', 'epic', 'legendary'] as CraftingTier[]).map((t) => {
          const [lo, hi] = TIER_SKILL_RANGES[t]
          return (
            <span key={t} className={tier === t ? TIER_COLORS[t].text : ''}>
              {lo}–{hi}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function MaterialRow({ mat }: { mat: Material }) {
  const rarityColors: Record<string, string> = {
    trash: 'text-gray-500',
    common: 'text-white',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
    artifact: 'text-red-400',
  }
  return (
    <div className="flex items-center justify-between px-3 py-1.5 rounded bg-gray-800/50 border border-gray-700">
      <span className={`text-sm font-medium ${rarityColors[mat.rarity] ?? 'text-white'}`}>
        {mat.name}
      </span>
      <span className="text-sm text-gray-400 ml-3">×{mat.quantity}</span>
    </div>
  )
}

interface CraftCardProps {
  item: CraftedItem
  skill: number
  materials: Material[]
  onCraft: (item: CraftedItem) => void
}

function CraftCard({ item, skill, materials, onCraft }: CraftCardProps) {
  const colors = TIER_COLORS[item.tier]
  const isUnlocked = skill >= item.minSkill

  // Check if the character has enough materials
  const canAfford = item.materials.every((cost) => {
    const owned = materials.find((m) => m.id === cost.materialId)
    return owned && owned.quantity >= cost.quantity
  })

  const isDisabled = !isUnlocked || !canAfford

  return (
    <div
      className={`p-3 rounded-lg border ${colors.border} ${colors.bg} ${
        !isUnlocked ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <span className={`font-semibold ${colors.text}`}>{item.name}</span>
          {item.damage && (
            <span className="ml-2 text-xs text-gray-400">
              {item.damage} {item.damageType}
            </span>
          )}
        </div>
        <span className={`text-xs px-1.5 py-0.5 rounded border ${colors.border} ${colors.text} whitespace-nowrap`}>
          Skill {item.minSkill}+
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-2">{item.bonus}</p>

      <div className="flex flex-wrap gap-1 mb-2">
        {item.materials.map((cost) => {
          const owned = materials.find((m) => m.id === cost.materialId)
          const qty = owned?.quantity ?? 0
          const enough = qty >= cost.quantity
          return (
            <span
              key={cost.materialId}
              className={`text-xs px-1.5 py-0.5 rounded ${
                enough ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
              }`}
            >
              {cost.label} ×{cost.quantity} ({qty} owned)
            </span>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onCraft(item)}
        disabled={isDisabled}
        className={`w-full text-xs py-1.5 rounded font-medium transition-colors ${
          isDisabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-dnd-gold text-gray-900 hover:bg-yellow-500 cursor-pointer'
        }`}
      >
        {!isUnlocked
          ? `Requires Skill ${item.minSkill}`
          : !canAfford
          ? 'Not enough materials'
          : 'Craft'}
      </button>
    </div>
  )
}

export function WorkTab({ character }: WorkTabProps) {
  const { incrementCraftingSkill, addEquipment, changeMaterialQuantity } =
    useCharacterStore()

  const [activeProfession, setActiveProfession] = useState<Profession>('blacksmithing')
  const [craftedNotif, setCraftedNotif] = useState<string | null>(null)

  const skills = character.craftingSkills ?? {
    blacksmithing: 1,
    tailoring: 1,
    alchemy: 1,
    enchanting: 1,
  }

  const info = PROFESSION_INFO[activeProfession]
  const skillValue = skills[info.skill]
  const ownedMats = character.materials.filter((m) =>
    info.matCategory.includes(m.category as Material['category'])
  )
  // Group recipes by tier
  const recipesByTier = info.recipes.reduce<Record<CraftingTier, CraftedItem[]>>(
    (acc: Record<CraftingTier, CraftedItem[]>, r: CraftedItem) => {
      acc[r.tier].push(r)
      return acc
    },
    { common: [], uncommon: [], rare: [], epic: [], legendary: [] }
  )

  function handleCraft(item: CraftedItem) {
    // Deduct materials
    for (const cost of item.materials) {
      changeMaterialQuantity(cost.materialId, -cost.quantity)
    }

    // Add crafted item to inventory
    const rarityMap: Record<CraftingTier, 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'> = {
      common: 'common',
      uncommon: 'uncommon',
      rare: 'rare',
      epic: 'epic',
      legendary: 'legendary',
    }

    const newItem = {
      id: `crafted-${item.id}-${Date.now()}`,
      name: item.name,
      description: item.bonus,
      category: 'adventuringGear' as const,
      weight: item.weight,
      cost: { copper: 0, silver: 0, gold: 0, platinum: 0 },
      quantity: 1,
      rarity: rarityMap[item.tier],
    }
    addEquipment(newItem)

    // Increment skill (+1 per craft)
    incrementCraftingSkill(info.skill, 1)

    // Notify
    setCraftedNotif(`Crafted ${item.name}!`)
    setTimeout(() => setCraftedNotif(null), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {craftedNotif && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium shadow-lg">
          {craftedNotif}
        </div>
      )}

      {/* Profession tabs */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(PROFESSION_INFO) as Profession[]).map((p) => {
          const pi = PROFESSION_INFO[p]
          const active = activeProfession === p
          return (
            <button
              key={p}
              type="button"
              onClick={() => setActiveProfession(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-dnd-gold text-gray-900'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {pi.icon} {pi.label}
            </button>
          )
        })}
      </div>

      {/* Skill bar + profession info */}
      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 mb-3">{info.description}</p>
        <SkillBar value={skillValue} profession={activeProfession} />
      </div>

      {/* Available materials */}
      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">{info.matLabel} in Inventory</h3>
        {ownedMats.length === 0 ? (
          <p className="text-sm text-gray-500">
            No {info.matLabel.toLowerCase()} found. Go explore and gather materials!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {ownedMats.map((m) => (
              <MaterialRow key={m.id} mat={m} />
            ))}
          </div>
        )}
      </div>

      {/* Craftable items by tier */}
      <div className="space-y-4">
        {(Object.keys(recipesByTier) as CraftingTier[]).map((t) => {
          const tierRecipes = recipesByTier[t]
          if (tierRecipes.length === 0) return null
          const tColors = TIER_COLORS[t]
          const [lo] = TIER_SKILL_RANGES[t]
          const tierUnlocked = skillValue >= lo
          return (
            <div key={t}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-base font-bold capitalize ${tColors.text}`}>
                  {TIER_LABELS[t]}
                </h3>
                {!tierUnlocked && (
                  <span className="text-xs text-gray-500">(requires skill {lo})</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tierRecipes.map((recipe) => (
                  <CraftCard
                    key={recipe.id}
                    item={recipe}
                    skill={skillValue}
                    materials={character.materials}
                    onCraft={handleCraft}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
