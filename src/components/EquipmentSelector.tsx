import { useState, useEffect } from 'react'
import type { Class, Equipment, Weapon, Armor, Race } from '../types'
import { isWeapon, isArmor, isShield } from '../types/equipment'
import {
  ALL_WEAPONS,
  SHIELDS,
  ADVENTURING_GEAR,
} from '../data/equipment'
import { calculateTotalWeight } from '../utils/calculations'
import { formatWeight } from '../utils/formatting'

interface EquipmentSelectorProps {
  characterClass?: Class
  race?: Race | null
  onSubmit: (equipment: Equipment[]) => void
  onBack: () => void
}

type EquipmentTab = 'weapons' | 'armor'

/**
 * Standard starting equipment auto-added to all characters
 */
const STANDARD_STARTING_GEAR = [
  { id: 'backpack', quantity: 1 },
  { id: 'bedroll', quantity: 1 },
  { id: 'rations', quantity: 10 },
  { id: 'waterskin', quantity: 1 },
  { id: 'rope-hemp', quantity: 1 },
  { id: 'tinderbox', quantity: 1 },
  { id: 'torch', quantity: 10 },
  { id: 'component-pouch', quantity: 1 }, // For spellcasting
]

const MAX_WEAPONS = 3
const MAX_ARMOR = 1
const MAX_SHIELDS = 1

/**
 * The 12 simplified weapon types available to all classes.
 * IDs match entries in ALL_WEAPONS from equipment data.
 */
const SIMPLIFIED_WEAPON_IDS = [
  'mace',
  'hand-crossbow',
  'longbow',
  'dagger',
  'longsword',
  'flail',
  'pike',
  'quarterstaff',
  'battleaxe',
  'greataxe',
  'greatsword',
]

/**
 * Wand — simple ranged weapon, not in the base data set so defined inline.
 */
const WAND_WEAPON: Weapon = {
  id: 'wand',
  name: 'Wand',
  description: 'A slender magical rod used to channel arcane energy.',
  category: 'weapon',
  weaponType: 'simple',
  weaponCategory: 'ranged',
  damage: { dice: '1d4', type: 'force' },
  properties: ['finesse', 'light'],
  range: { normal: 30, long: 60 },
  weight: 1,
  cost: { copper: 0, silver: 0, gold: 10, platinum: 0 },
  quantity: 1,
}

/**
 * Gear sets — each set covers Helmet, Shoulder, Chest, Gauntlet, Pants, Boots.
 * Selecting a set grants the combined AC value as a single armor item.
 */
const GEAR_SETS: Armor[] = [
  {
    id: 'cloth-gear-set',
    name: 'Cloth Gear Set',
    description: 'A full set of cloth armor: Helmet, Shoulder, Chest, Gauntlet, Pants, Boots.',
    category: 'armor',
    armorType: 'light',
    baseAC: 8,
    stealthDisadvantage: false,
    weight: 8,
    cost: { copper: 0, silver: 0, gold: 10, platinum: 0 },
    quantity: 1,
  },
  {
    id: 'hide-gear-set',
    name: 'Hide Gear Set',
    description: 'A full set of hide armor: Helmet, Shoulder, Chest, Gauntlet, Pants, Boots.',
    category: 'armor',
    armorType: 'medium',
    baseAC: 12,
    maxDexBonus: 2,
    stealthDisadvantage: false,
    weight: 20,
    cost: { copper: 0, silver: 0, gold: 30, platinum: 0 },
    quantity: 1,
  },
  {
    id: 'chainmail-gear-set',
    name: 'Chainmail Gear Set',
    description: 'A full set of chainmail armor: Helmet, Shoulder, Chest, Gauntlet, Pants, Boots.',
    category: 'armor',
    armorType: 'heavy',
    baseAC: 15,
    maxDexBonus: 0,
    stealthDisadvantage: true,
    weight: 55,
    cost: { copper: 0, silver: 0, gold: 75, platinum: 0 },
    quantity: 1,
  },
  {
    id: 'platemail-gear-set',
    name: 'Platemail Gear Set',
    description: 'A full set of plate armor: Helmet, Shoulder, Chest, Gauntlet, Pants, Boots.',
    category: 'armor',
    armorType: 'heavy',
    baseAC: 20,
    maxDexBonus: 0,
    stealthDisadvantage: true,
    strengthRequirement: 15,
    weight: 65,
    cost: { copper: 0, silver: 0, gold: 1500, platinum: 0 },
    quantity: 1,
  },
]

export function EquipmentSelector({ characterClass, onSubmit, onBack }: EquipmentSelectorProps) {
  const [activeTab, setActiveTab] = useState<EquipmentTab>('weapons')
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])

  // Auto-add standard starting gear on mount
  useEffect(() => {
    const startingGear: Equipment[] = []

    STANDARD_STARTING_GEAR.forEach(({ id, quantity }) => {
      const item = ADVENTURING_GEAR.find((g) => g.id === id)
      if (item) {
        startingGear.push({ ...item, quantity })
      }
    })

    // Auto-add thieves' tools for Rogues
    if (characterClass?.name === 'Rogue') {
      const thievesTools = ADVENTURING_GEAR.find((g) => g.id === 'thieves-tools')
      if (thievesTools) {
        startingGear.push({ ...thievesTools, quantity: 1 })
      }
    }

    setSelectedEquipment(startingGear)
  }, [characterClass])

  // Build simplified weapon list: pick the 11 known IDs from data + add Wand
  const availableWeapons: Weapon[] = [
    ...ALL_WEAPONS.filter((w) => SIMPLIFIED_WEAPON_IDS.includes(w.id)),
    WAND_WEAPON,
  ]

  // Count selected weapons, armor sets, and shields
  const selectedWeaponCount = selectedEquipment.filter(isWeapon).length
  const selectedArmorCount = selectedEquipment.filter(isArmor).length
  const selectedShieldCount = selectedEquipment.filter(isShield).length

  const toggleEquipment = (item: Equipment) => {
    setSelectedEquipment((prev) => {
      const exists = prev.find((e) => e.id === item.id)
      if (exists) {
        return prev.filter((e) => e.id !== item.id)
      }

      if (isWeapon(item) && selectedWeaponCount >= MAX_WEAPONS) return prev
      if (isArmor(item) && selectedArmorCount >= MAX_ARMOR) return prev
      if (isShield(item) && selectedShieldCount >= MAX_SHIELDS) return prev

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const isSelected = (itemId: string) => {
    return selectedEquipment.some((e) => e.id === itemId)
  }

  const canSelectWeapon = (weaponId: string) => {
    return isSelected(weaponId) || selectedWeaponCount < MAX_WEAPONS
  }

  const canSelectArmorItem = (itemId: string, item: Equipment) => {
    if (isSelected(itemId)) return true
    if (isArmor(item)) return selectedArmorCount < MAX_ARMOR
    if (isShield(item)) return selectedShieldCount < MAX_SHIELDS
    return true
  }

  const handleSubmit = () => {
    onSubmit(selectedEquipment)
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
    { id: 'weapons', label: 'Weapons' },
    { id: 'armor', label: 'Armor' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Equipment</h2>
        <p className="text-gray-400">
          Select your starting equipment. All weapons and armor are available to every class.
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
        {activeTab === 'weapons' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Select up to {MAX_WEAPONS} weapons</span>
              <span className={`text-sm font-medium ${selectedWeaponCount >= MAX_WEAPONS ? 'text-green-400' : 'text-dnd-gold'}`}>
                {selectedWeaponCount} / {MAX_WEAPONS} selected
              </span>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {availableWeapons.map((weapon) => {
                const canSelect = canSelectWeapon(weapon.id)
                return (
                  <button
                    key={weapon.id}
                    onClick={() => toggleEquipment(weapon)}
                    disabled={!canSelect}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected(weapon.id)
                        ? 'border-dnd-gold bg-dnd-gold/10'
                        : canSelect
                          ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                          : 'border-gray-800 bg-gray-900 opacity-50 cursor-not-allowed'
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
                      <p className="text-xs text-gray-500">{weapon.weight} lb</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'armor' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">
                Select 1 gear set and up to {MAX_SHIELDS} shield
              </span>
              <div className="flex gap-4">
                <span className={`text-sm font-medium ${selectedArmorCount >= MAX_ARMOR ? 'text-green-400' : 'text-dnd-gold'}`}>
                  Gear Set: {selectedArmorCount} / {MAX_ARMOR}
                </span>
                <span className={`text-sm font-medium ${selectedShieldCount >= MAX_SHIELDS ? 'text-green-400' : 'text-dnd-gold'}`}>
                  Shield: {selectedShieldCount} / {MAX_SHIELDS}
                </span>
              </div>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {/* Gear Sets */}
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1 mb-1">
                Gear Sets (Helmet, Shoulder, Chest, Gauntlet, Pants, Boots)
              </p>
              {GEAR_SETS.map((gearSet) => {
                const canSelect = canSelectArmorItem(gearSet.id, gearSet)
                return (
                  <button
                    key={gearSet.id}
                    onClick={() => toggleEquipment(gearSet)}
                    disabled={!canSelect}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected(gearSet.id)
                        ? 'border-dnd-gold bg-dnd-gold/10'
                        : canSelect
                          ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                          : 'border-gray-800 bg-gray-900 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{gearSet.name}</h3>
                        <p className="text-sm text-gray-400">
                          AC {gearSet.baseAC}
                          {gearSet.maxDexBonus === undefined
                            ? ' + DEX'
                            : gearSet.maxDexBonus > 0
                            ? ` + DEX (max ${gearSet.maxDexBonus})`
                            : ''}
                        </p>
                        <p className="text-xs text-gray-500">
                          {gearSet.armorType} armor
                          {gearSet.stealthDisadvantage && ' | Stealth Disadvantage'}
                          {gearSet.strengthRequirement && ` | STR ${gearSet.strengthRequirement} required`}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">{gearSet.weight} lb</p>
                    </div>
                  </button>
                )
              })}

              {/* Shields */}
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1 mt-4 mb-1">
                Shields
              </p>
              {SHIELDS.map((item) => {
                const canSelect = canSelectArmorItem(item.id, item)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleEquipment(item)}
                    disabled={!canSelect}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected(item.id)
                        ? 'border-dnd-gold bg-dnd-gold/10'
                        : canSelect
                          ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                          : 'border-gray-800 bg-gray-900 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        {isShield(item) && (
                          <p className="text-sm text-gray-400">+{item.acBonus} AC</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{item.weight} lb</p>
                    </div>
                  </button>
                )
              })}
            </div>
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
              Total Weight: {formatWeight(calculateTotalWeight(selectedEquipment))} lb
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
