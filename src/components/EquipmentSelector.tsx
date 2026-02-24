import { useState, useMemo, useEffect } from 'react'
import type { Class, Equipment, Weapon, Race } from '../types'
import { isArmor, isShield } from '../types/equipment'
import {
  ALL_WEAPONS,
  ALL_ARMOR,
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

type EquipmentTab = 'weapons' | 'armor' | 'gear'

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

export function EquipmentSelector({ characterClass, race, onSubmit, onBack }: EquipmentSelectorProps) {
  const [activeTab, setActiveTab] = useState<EquipmentTab>('weapons')
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])

  // Auto-add standard starting gear on mount
  useEffect(() => {
    const startingGear: Equipment[] = []

    // Add standard starting gear
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

  // Filter weapons based on class AND racial proficiencies
  const availableWeapons = useMemo(() => {
    if (!characterClass) return ALL_WEAPONS

    const hasSimple = characterClass.weaponProficiencies.includes('simple')
    const hasMartial = characterClass.weaponProficiencies.includes('martial')
    const racialProficiencies = race?.weaponProficiencies || []

    return ALL_WEAPONS.filter((weapon) => {
      if (hasMartial) return true
      if (hasSimple && weapon.weaponType === 'simple') return true
      // Check class-specific proficiencies
      if (characterClass.weaponProficiencies.includes(weapon.id)) return true
      // Check racial proficiencies
      if (racialProficiencies.includes(weapon.id)) return true
      return false
    })
  }, [characterClass, race])

  // Filter armor based on class proficiencies
  const availableArmor = useMemo(() => {
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
  }, [characterClass])

  // Check if class can use shields
  const canUseShields = useMemo(() => {
    if (!characterClass) return true
    return characterClass.armorProficiencies.includes('shields')
  }, [characterClass])

  // Count selected weapons
  const selectedWeaponCount = selectedEquipment.filter(
    (e) => 'weaponType' in e && (e.weaponType === 'simple' || e.weaponType === 'martial')
  ).length

  // Count selected armor (not shields)
  const selectedArmorCount = selectedEquipment.filter(
    (e) => 'armorType' in e && e.armorType !== undefined
  ).length

  // Count selected shields
  const selectedShieldCount = selectedEquipment.filter(
    (e) => 'acBonus' in e && !('armorType' in e)
  ).length

  const MAX_WEAPONS = 3
  const MAX_ARMOR = 1
  const MAX_SHIELDS = 1

  const toggleEquipment = (item: Equipment) => {
    setSelectedEquipment((prev) => {
      const exists = prev.find((e) => e.id === item.id)
      if (exists) {
        return prev.filter((e) => e.id !== item.id)
      }

      // Check limits
      const isWeapon = 'weaponType' in item && (item.weaponType === 'simple' || item.weaponType === 'martial')
      const isArmorItem = 'armorType' in item && item.armorType !== undefined
      const isShieldItem = 'acBonus' in item && !('armorType' in item)

      if (isWeapon && selectedWeaponCount >= MAX_WEAPONS) return prev
      if (isArmorItem && selectedArmorCount >= MAX_ARMOR) return prev
      if (isShieldItem && selectedShieldCount >= MAX_SHIELDS) return prev

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const isSelected = (itemId: string) => {
    return selectedEquipment.some((e) => e.id === itemId)
  }

  const canSelectWeapon = (weaponId: string) => {
    return isSelected(weaponId) || selectedWeaponCount < MAX_WEAPONS
  }

  const canSelectArmor = (itemId: string, item: Equipment) => {
    if (isSelected(itemId)) return true
    const isArmorItem = 'armorType' in item && item.armorType !== undefined
    const isShieldItem = 'acBonus' in item && !('armorType' in item)
    if (isArmorItem) return selectedArmorCount < MAX_ARMOR
    if (isShieldItem) return selectedShieldCount < MAX_SHIELDS
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
                Select up to {MAX_ARMOR} armor{canUseShields && ` and ${MAX_SHIELDS} shield`}
              </span>
              <div className="flex gap-4">
                <span className={`text-sm font-medium ${selectedArmorCount >= MAX_ARMOR ? 'text-green-400' : 'text-dnd-gold'}`}>
                  Armor: {selectedArmorCount} / {MAX_ARMOR}
                </span>
                {canUseShields && (
                  <span className={`text-sm font-medium ${selectedShieldCount >= MAX_SHIELDS ? 'text-green-400' : 'text-dnd-gold'}`}>
                    Shield: {selectedShieldCount} / {MAX_SHIELDS}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {availableArmor.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your class has no armor proficiencies.
              </div>
            ) : (
              availableArmor.map((item) => {
                const canSelect = canSelectArmor(item.id, item)
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
                      <p className="text-xs text-gray-500">{item.weight} lb</p>
                    </div>
                  </button>
                )
              })
            )}
            </div>
          </div>
        )}

        {activeTab === 'gear' && (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {ADVENTURING_GEAR.filter((item) => {
              // Hide thieves' tools from non-Rogues (Rogues get it auto-added)
              if (item.id === 'thieves-tools' && characterClass?.name !== 'Rogue') {
                return false
              }
              // Hide holy symbol and arcane focus (everyone gets component pouch)
              if (item.id === 'holy-symbol' || item.id === 'arcane-focus') {
                return false
              }
              return true
            }).map((item) => (
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
                  <p className="text-xs text-gray-500">{item.weight} lb</p>
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
