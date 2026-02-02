import { useState } from 'react'
import type { Class, Equipment, Weapon } from '../types'
import { isArmor, isShield } from '../types/equipment'
import {
  ALL_WEAPONS,
  ALL_ARMOR,
  SHIELDS,
  ADVENTURING_GEAR,
  EQUIPMENT_PACKS,
} from '../data/equipment'

interface EquipmentSelectorProps {
  characterClass?: Class
  onSubmit: (equipment: Equipment[]) => void
  onBack: () => void
}

type EquipmentTab = 'packs' | 'weapons' | 'armor' | 'gear'

export function EquipmentSelector({ characterClass, onSubmit, onBack }: EquipmentSelectorProps) {
  const [activeTab, setActiveTab] = useState<EquipmentTab>('packs')
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null)

  // Filter weapons based on class proficiencies
  const getAvailableWeapons = () => {
    if (!characterClass) return ALL_WEAPONS

    const hasSimple = characterClass.weaponProficiencies.includes('simple')
    const hasMartial = characterClass.weaponProficiencies.includes('martial')

    return ALL_WEAPONS.filter((weapon) => {
      if (hasMartial) return true
      if (hasSimple && weapon.weaponType === 'simple') return true
      return characterClass.weaponProficiencies.includes(weapon.id)
    })
  }

  // Filter armor based on class proficiencies
  const getAvailableArmor = () => {
    if (!characterClass) return [...ALL_ARMOR, ...SHIELDS]

    const hasLight = characterClass.armorProficiencies.includes('light')
    const hasMedium = characterClass.armorProficiencies.includes('medium')
    const hasHeavy = characterClass.armorProficiencies.includes('heavy')
    const hasShields = characterClass.armorProficiencies.includes('shields')

    const armor = ALL_ARMOR.filter((a) => {
      if (a.armorType === 'light' && hasLight) return true
      if (a.armorType === 'medium' && hasMedium) return true
      if (a.armorType === 'heavy' && hasHeavy) return true
      return false
    })

    if (hasShields) {
      return [...armor, ...SHIELDS]
    }
    return armor
  }

  const toggleEquipment = (item: Equipment) => {
    setSelectedEquipment((prev) => {
      const exists = prev.find((e) => e.id === item.id)
      if (exists) {
        return prev.filter((e) => e.id !== item.id)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const isSelected = (itemId: string) => {
    return selectedEquipment.some((e) => e.id === itemId)
  }

  const selectPack = (packId: string) => {
    setSelectedPackId(packId)
    // Add pack items to equipment
    const pack = EQUIPMENT_PACKS.find((p) => p.id === packId)
    if (pack) {
      const packItems = pack.items
        .map((itemId) => ADVENTURING_GEAR.find((g) => g.id === itemId))
        .filter((item): item is typeof ADVENTURING_GEAR[number] => item !== undefined)

      // Count duplicates and set quantities
      const itemCounts: Record<string, number> = {}
      packItems.forEach((item) => {
        itemCounts[item.id] = (itemCounts[item.id] || 0) + 1
      })

      const uniqueItems: Equipment[] = Object.entries(itemCounts).map(([id, count]) => {
        const foundItem = ADVENTURING_GEAR.find((g) => g.id === id)
        if (!foundItem) throw new Error(`Item ${id} not found`)
        return { ...foundItem, quantity: count }
      })

      setSelectedEquipment((prev) => {
        // Remove old pack items and add new ones
        const nonPackItems = prev.filter(
          (equipItem) => !ADVENTURING_GEAR.some((g) => g.id === equipItem.id)
        )
        return [...nonPackItems, ...uniqueItems]
      })
    }
  }

  const handleSubmit = () => {
    onSubmit(selectedEquipment)
  }

  const formatCost = (item: Equipment) => {
    if (item.cost.gold > 0) return `${item.cost.gold} gp`
    if (item.cost.silver > 0) return `${item.cost.silver} sp`
    if (item.cost.copper > 0) return `${item.cost.copper} cp`
    return 'Free'
  }

  const formatProperties = (weapon: Weapon) => {
    const propNames: Record<string, string> = {
      ammunition: 'Ammunition',
      finesse: 'Finesse',
      heavy: 'Heavy',
      light: 'Light',
      loading: 'Loading',
      range: 'Range',
      reach: 'Reach',
      special: 'Special',
      thrown: 'Thrown',
      twoHanded: 'Two-Handed',
      versatile: 'Versatile',
    }
    return weapon.properties.map((p) => propNames[p] || p).join(', ')
  }

  const tabs: { id: EquipmentTab; label: string }[] = [
    { id: 'packs', label: 'Starting Packs' },
    { id: 'weapons', label: 'Weapons' },
    { id: 'armor', label: 'Armor' },
    { id: 'gear', label: 'Gear' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Equipment</h2>
        <p className="text-gray-400">
          Select your starting equipment. Your class determines which weapons and armor you can use.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-dnd-gold text-gray-900'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'packs' && (
          <div className="grid md:grid-cols-2 gap-4">
            {EQUIPMENT_PACKS.map((pack) => (
              <button
                key={pack.id}
                onClick={() => selectPack(pack.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedPackId === pack.id
                    ? 'border-dnd-gold bg-dnd-gold/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white">{pack.name}</h3>
                  <span className="text-sm text-dnd-gold">{pack.cost.gold} gp</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{pack.description}</p>
                <p className="text-xs text-gray-500">
                  Includes: Backpack, bedroll, rations, rope, torches, and more
                </p>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'weapons' && (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {getAvailableWeapons().map((weapon) => (
              <button
                key={weapon.id}
                onClick={() => toggleEquipment(weapon)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isSelected(weapon.id)
                    ? 'border-dnd-gold bg-dnd-gold/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white">{weapon.name}</h3>
                    <p className="text-sm text-gray-400">
                      {weapon.damage.dice} {weapon.damage.type}
                      {weapon.versatileDamage && ` (${weapon.versatileDamage} two-handed)`}
                    </p>
                    {weapon.properties.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{formatProperties(weapon)}</p>
                    )}
                    {weapon.range && (
                      <p className="text-xs text-gray-500">
                        Range: {weapon.range.normal}/{weapon.range.long} ft
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-dnd-gold">{formatCost(weapon)}</span>
                    <p className="text-xs text-gray-500">{weapon.weight} lb</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'armor' && (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {getAvailableArmor().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your class has no armor proficiencies.
              </div>
            ) : (
              getAvailableArmor().map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleEquipment(item)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    isSelected(item.id)
                      ? 'border-dnd-gold bg-dnd-gold/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{item.name}</h3>
                      {isArmor(item) && (
                        <>
                          <p className="text-sm text-gray-400">
                            AC {item.baseAC}
                            {item.maxDexBonus !== undefined && item.maxDexBonus > 0
                              ? ` + DEX (max ${item.maxDexBonus})`
                              : item.maxDexBonus === undefined
                              ? ' + DEX'
                              : ''}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.armorType} armor
                            {item.stealthDisadvantage && ' | Stealth Disadvantage'}
                            {item.strengthRequirement && ` | STR ${item.strengthRequirement} required`}
                          </p>
                        </>
                      )}
                      {isShield(item) && (
                        <p className="text-sm text-gray-400">+{item.acBonus} AC</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-dnd-gold">{formatCost(item)}</span>
                      <p className="text-xs text-gray-500">{item.weight} lb</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {activeTab === 'gear' && (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {ADVENTURING_GEAR.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleEquipment(item)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isSelected(item.id)
                    ? 'border-dnd-gold bg-dnd-gold/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-dnd-gold">{formatCost(item)}</span>
                    <p className="text-xs text-gray-500">{item.weight} lb</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Equipment Summary */}
      {selectedEquipment.length > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <h3 className="font-semibold text-white mb-3">
            Selected Equipment ({selectedEquipment.length} items)
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedEquipment.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 bg-dnd-gold/20 text-dnd-gold text-sm rounded-full flex items-center gap-2"
              >
                {item.name}
                {item.quantity > 1 && ` (x${item.quantity})`}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleEquipment(item)
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  x
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between text-sm">
            <span className="text-gray-400">
              Total Weight: {selectedEquipment.reduce((sum, item) => sum + item.weight * item.quantity, 0).toFixed(1)} lb
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                   hover:border-gray-500 rounded-lg transition-colors duration-200"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                   hover:bg-yellow-500 transition-colors duration-200"
        >
          Next: Review
        </button>
      </div>
    </div>
  )
}
