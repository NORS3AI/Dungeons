import { useState } from 'react'
import type { Equipment, Weapon, Armor, Shield, GenericEquipment, Currency } from '../types'
import type { LootItem } from '../data/lootGenerator'

interface EquipmentEditorProps {
  lootItem: LootItem
  onSave: (equipment: Equipment) => void
  onCancel: () => void
}

/**
 * Modal for editing and converting loot items to proper equipment
 */
export function EquipmentEditor({ lootItem, onSave, onCancel }: EquipmentEditorProps) {
  const [equipmentType, setEquipmentType] = useState<'weapon' | 'armor' | 'shield' | 'generic'>('generic')
  const [name, setName] = useState(lootItem.name)
  const [description, setDescription] = useState(lootItem.description)
  const [weight, setWeight] = useState(0)
  const [goldValue, setGoldValue] = useState(lootItem.value)
  const [quantity, setQuantity] = useState(lootItem.quantity || 1)

  // Weapon-specific fields
  const [damageDice, setDamageDice] = useState('1d6')
  const [damageType, setDamageType] = useState('slashing')
  const [weaponType, setWeaponType] = useState<'simple' | 'martial'>('simple')
  const [weaponCategory, setWeaponCategory] = useState<'melee' | 'ranged'>('melee')
  const [properties, setProperties] = useState<string[]>([])

  // Armor-specific fields
  const [baseAC, setBaseAC] = useState(10)
  const [armorType, setArmorType] = useState<'light' | 'medium' | 'heavy'>('light')
  const [maxDexBonus, setMaxDexBonus] = useState<number | undefined>(undefined)
  const [strengthRequired, setStrengthRequired] = useState<number | undefined>(undefined)
  const [stealthDisadvantage, setStealthDisadvantage] = useState(false)

  // Shield-specific fields
  const [acBonus, setAcBonus] = useState(2)

  // Generic equipment category
  const [genericCategory, setGenericCategory] = useState<GenericEquipment['category']>('treasure')

  // Magical item charges
  const [hasMagicalCharges, setHasMagicalCharges] = useState(false)
  const [spellName, setSpellName] = useState('')
  const [spellDamageDice, setSpellDamageDice] = useState('')
  const [spellDamageType, setSpellDamageType] = useState<string>('fire')
  const [currentCharges, setCurrentCharges] = useState(7)
  const [maxCharges, setMaxCharges] = useState(7)
  const [rechargeRate, setRechargeRate] = useState('1d6+1 at dawn')

  const handleSave = () => {
    const cost: Currency = {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: goldValue,
      platinum: 0,
    }

    // Create charges object if magical charges are enabled
    const charges = hasMagicalCharges && spellName && spellDamageDice ? {
      spellName,
      damageDice: spellDamageDice,
      damageType: spellDamageType as any,
      currentCharges,
      maxCharges,
      rechargeRate,
    } : undefined

    let equipment: Equipment

    if (equipmentType === 'weapon') {
      equipment = {
        id: `${lootItem.id}-${Date.now()}`,
        name,
        category: 'weapon',
        description,
        damage: { dice: damageDice, type: damageType },
        weight,
        cost,
        weaponCategory,
        weaponType,
        properties,
        equipped: false,
        quantity,
        charges,
      } as Weapon
    } else if (equipmentType === 'armor') {
      equipment = {
        id: `${lootItem.id}-${Date.now()}`,
        name,
        category: 'armor',
        description,
        baseAC,
        armorType,
        maxDexBonus,
        strengthRequired,
        stealthDisadvantage,
        weight,
        cost,
        equipped: false,
        quantity,
        charges,
      } as Armor
    } else if (equipmentType === 'shield') {
      equipment = {
        id: `${lootItem.id}-${Date.now()}`,
        name,
        category: 'shield',
        acBonus,
        weight,
        cost,
        equipped: false,
        quantity,
        charges,
      } as Shield
    } else {
      equipment = {
        id: `${lootItem.id}-${Date.now()}`,
        name,
        category: genericCategory,
        description,
        weight,
        cost,
        equipped: false,
        quantity,
        charges,
      } as GenericEquipment
    }

    onSave(equipment)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-dnd-gold rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-900 to-orange-900 p-6 border-b border-dnd-gold">
          <h2 className="text-3xl font-bold text-white mb-2">
            📦 Add to Inventory
          </h2>
          <p className="text-yellow-200">
            Customize this item before adding it to your character
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)] space-y-6">
          {/* Equipment Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Equipment Type</label>
            <div className="grid grid-cols-4 gap-2">
              {(['weapon', 'armor', 'shield', 'generic'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setEquipmentType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    equipmentType === type
                      ? 'bg-dnd-gold text-gray-900'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Weight (lb)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Value (GP)</label>
              <input
                type="number"
                min="0"
                value={goldValue}
                onChange={(e) => setGoldValue(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
              />
            </div>
          </div>

          {equipmentType === 'generic' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select
                  value={genericCategory}
                  onChange={(e) => setGenericCategory(e.target.value as GenericEquipment['category'])}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                >
                  <option value="adventuringGear">Adventuring Gear</option>
                  <option value="consumable">Consumable</option>
                  <option value="trinket">Trinket</option>
                  <option value="treasure">Treasure</option>
                  <option value="tool">Tool</option>
                </select>
              </div>
            </>
          )}

          {equipmentType === 'weapon' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Damage Dice</label>
                  <input
                    type="text"
                    value={damageDice}
                    onChange={(e) => setDamageDice(e.target.value)}
                    placeholder="1d6, 2d4, etc."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Damage Type</label>
                  <select
                    value={damageType}
                    onChange={(e) => setDamageType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  >
                    <option value="slashing">Slashing</option>
                    <option value="piercing">Piercing</option>
                    <option value="bludgeoning">Bludgeoning</option>
                    <option value="fire">Fire</option>
                    <option value="cold">Cold</option>
                    <option value="lightning">Lightning</option>
                    <option value="thunder">Thunder</option>
                    <option value="poison">Poison</option>
                    <option value="acid">Acid</option>
                    <option value="psychic">Psychic</option>
                    <option value="necrotic">Necrotic</option>
                    <option value="radiant">Radiant</option>
                    <option value="force">Force</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Weapon Type</label>
                  <select
                    value={weaponType}
                    onChange={(e) => setWeaponType(e.target.value as 'simple' | 'martial')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  >
                    <option value="simple">Simple</option>
                    <option value="martial">Martial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Weapon Category</label>
                  <select
                    value={weaponCategory}
                    onChange={(e) => setWeaponCategory(e.target.value as 'melee' | 'ranged')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  >
                    <option value="melee">Melee</option>
                    <option value="ranged">Ranged</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Properties (comma separated)</label>
                <input
                  type="text"
                  value={properties.join(', ')}
                  onChange={(e) => setProperties(e.target.value.split(',').map(p => p.trim()).filter(Boolean))}
                  placeholder="finesse, light, versatile, etc."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                />
              </div>
            </div>
          )}

          {equipmentType === 'armor' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Base AC</label>
                  <input
                    type="number"
                    min="10"
                    max="20"
                    value={baseAC}
                    onChange={(e) => setBaseAC(parseInt(e.target.value) || 10)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Armor Type</label>
                  <select
                    value={armorType}
                    onChange={(e) => setArmorType(e.target.value as 'light' | 'medium' | 'heavy')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Max Dex Bonus (optional)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={maxDexBonus ?? ''}
                    onChange={(e) => setMaxDexBonus(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="Leave empty for unlimited"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Strength Required (optional)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={strengthRequired ?? ''}
                    onChange={(e) => setStrengthRequired(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="Leave empty for none"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="stealth-disadvantage"
                  checked={stealthDisadvantage}
                  onChange={(e) => setStealthDisadvantage(e.target.checked)}
                  className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-dnd-gold"
                />
                <label htmlFor="stealth-disadvantage" className="text-sm text-gray-400">
                  Imposes disadvantage on Stealth checks
                </label>
              </div>
            </div>
          )}

          {equipmentType === 'shield' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">AC Bonus</label>
              <input
                type="number"
                min="1"
                max="5"
                value={acBonus}
                onChange={(e) => setAcBonus(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
              />
            </div>
          )}

          {/* Magical Item Charges */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="has-magical-charges"
                checked={hasMagicalCharges}
                onChange={(e) => setHasMagicalCharges(e.target.checked)}
                className="w-5 h-5 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
              />
              <label htmlFor="has-magical-charges" className="text-lg font-medium text-purple-400">
                ✨ This is a magical item with charges
              </label>
            </div>

            {hasMagicalCharges && (
              <div className="space-y-4 bg-purple-900/10 border border-purple-700/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Spell/Effect Name</label>
                    <input
                      type="text"
                      value={spellName}
                      onChange={(e) => setSpellName(e.target.value)}
                      placeholder="e.g., Fireball, Lightning Bolt"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Damage Dice</label>
                    <input
                      type="text"
                      value={spellDamageDice}
                      onChange={(e) => setSpellDamageDice(e.target.value)}
                      placeholder="e.g., 8d6, 10d8"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Damage Type</label>
                    <select
                      value={spellDamageType}
                      onChange={(e) => setSpellDamageType(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="fire">Fire</option>
                      <option value="cold">Cold</option>
                      <option value="lightning">Lightning</option>
                      <option value="thunder">Thunder</option>
                      <option value="acid">Acid</option>
                      <option value="poison">Poison</option>
                      <option value="force">Force</option>
                      <option value="necrotic">Necrotic</option>
                      <option value="radiant">Radiant</option>
                      <option value="psychic">Psychic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Recharge Rate</label>
                    <input
                      type="text"
                      value={rechargeRate}
                      onChange={(e) => setRechargeRate(e.target.value)}
                      placeholder="e.g., 1d6+1 at dawn, never"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Current Charges</label>
                    <input
                      type="number"
                      min="0"
                      max={maxCharges}
                      value={currentCharges}
                      onChange={(e) => setCurrentCharges(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Maximum Charges</label>
                    <input
                      type="number"
                      min="1"
                      value={maxCharges}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value) || 1
                        setMaxCharges(newMax)
                        if (currentCharges > newMax) setCurrentCharges(newMax)
                      }}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-sm text-purple-300 bg-purple-900/20 p-3 rounded-lg">
                  💡 <strong>Example:</strong> Wand of Fireballs - Fireball (8d6 fire damage), 7/7 charges, recharges 1d6+1 at dawn
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 border-t border-gray-700 p-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Original loot: <span className="text-gray-300">{lootItem.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all"
            >
              Add to Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
