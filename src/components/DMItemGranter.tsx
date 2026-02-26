import { useState } from 'react'
import { useCharacterStore } from '../stores/characterStore'
import type { Equipment, Weapon, Armor, WeaponProperty, DamageType } from '../types'
import { EMPTY_CURRENCY } from '../types'
import { PREMADE_POTIONS, PREMADE_WEAPONS, PREMADE_ARMOR, PREMADE_GEAR } from '../data/premadeItems'

interface DMItemGranterProps {
  isOpen: boolean
  onClose: () => void
}

type ItemType = 'weapon' | 'armor' | 'potion' | 'gear' | 'custom'
type QuickAddCategory = 'potions' | 'weapons' | 'armor' | 'gear'

/**
 * DM Item Granter - Allow DMs to grant items to characters
 * Can grant to individual characters or all characters at once
 */
export function DMItemGranter({ isOpen, onClose }: DMItemGranterProps) {
  const characters = useCharacterStore((state) => state.characters)
  const grantItemToCharacter = useCharacterStore((state) => state.grantItemToCharacter)
  const grantItemToAllCharacters = useCharacterStore((state) => state.grantItemToAllCharacters)

  const [mode, setMode] = useState<'quick' | 'custom'>('quick')
  const [quickAddCategory, setQuickAddCategory] = useState<QuickAddCategory>('potions')
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [itemType, setItemType] = useState<ItemType>('gear')
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemRarity, setItemRarity] = useState<Equipment['rarity']>('common')
  const [itemQuantity, setItemQuantity] = useState(1)

  // Weapon-specific
  const [weaponDamage, setWeaponDamage] = useState('1d6')
  const [weaponDamageType, setWeaponDamageType] = useState<DamageType>('slashing')
  const [weaponProperties, setWeaponProperties] = useState<WeaponProperty[]>([])

  // Armor-specific
  const [armorAC, setArmorAC] = useState(11)
  const [armorType, setArmorType] = useState<'light' | 'medium' | 'heavy'>('light')

  const [successMessage, setSuccessMessage] = useState('')

  if (!isOpen) return null

  const handleToggleCharacter = (characterId: string) => {
    setSelectedCharacters((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCharacters.length === characters.length) {
      setSelectedCharacters([])
    } else {
      setSelectedCharacters(characters.map((c) => c.id))
    }
  }

  const handleQuickAddItem = (item: Equipment) => {
    if (selectedCharacters.length === 0) {
      setSuccessMessage('⚠️ Please select at least one character first')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    // Create unique copy for each character
    selectedCharacters.forEach((characterId) => {
      const itemCopy = {
        ...item,
        id: crypto.randomUUID(), // Generate unique ID for each character
      }
      grantItemToCharacter(characterId, itemCopy)
    })

    setSuccessMessage(`✅ Granted "${item.name}" to ${selectedCharacters.length} character(s)`)
    setTimeout(() => setSuccessMessage(''), 2500)
  }

  const handleQuickAddToAll = (item: Equipment) => {
    if (characters.length === 0) {
      setSuccessMessage('⚠️ No characters available')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    // Create unique copy for each character
    characters.forEach((character) => {
      const itemCopy = {
        ...item,
        id: crypto.randomUUID(),
      }
      grantItemToCharacter(character.id, itemCopy)
    })

    setSuccessMessage(`✅ Granted "${item.name}" to all ${characters.length} character(s)`)
    setTimeout(() => setSuccessMessage(''), 2500)
  }

  const createItem = (): Equipment => {
    const baseItem = {
      id: crypto.randomUUID(),
      name: itemName,
      description: itemDescription,
      rarity: itemRarity,
      quantity: itemQuantity,
      weight: 1,
      equipped: false,
      cost: { ...EMPTY_CURRENCY, gold: 0 },
    }

    if (itemType === 'weapon') {
      const weapon: Weapon = {
        ...baseItem,
        category: 'weapon',
        weaponType: 'simple',
        weaponCategory: 'melee',
        damage: {
          dice: weaponDamage,
          type: weaponDamageType,
        },
        properties: weaponProperties,
      }
      return weapon
    }

    if (itemType === 'armor') {
      const armor: Armor = {
        ...baseItem,
        category: 'armor',
        armorType: armorType,
        baseAC: armorAC,
        stealthDisadvantage: false,
      }
      return armor
    }

    // Default: adventuring gear, potion, or custom
    return {
      ...baseItem,
      category: itemType === 'potion' ? 'consumable' : 'adventuringGear',
    }
  }

  const handleGrantToSelected = () => {
    if (selectedCharacters.length === 0) {
      setSuccessMessage('⚠️ Please select at least one character')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    if (!itemName.trim()) {
      setSuccessMessage('⚠️ Please enter an item name')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    const item = createItem()
    selectedCharacters.forEach((characterId) => {
      grantItemToCharacter(characterId, item)
    })

    setSuccessMessage(`✅ Granted "${itemName}" to ${selectedCharacters.length} character(s)`)
    setTimeout(() => {
      setSuccessMessage('')
      resetForm()
    }, 2000)
  }

  const handleGrantToAll = () => {
    if (!itemName.trim()) {
      setSuccessMessage('⚠️ Please enter an item name')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    const item = createItem()
    grantItemToAllCharacters(item)

    setSuccessMessage(`✅ Granted "${itemName}" to all ${characters.length} character(s)`)
    setTimeout(() => {
      setSuccessMessage('')
      resetForm()
    }, 2000)
  }

  const resetForm = () => {
    setItemName('')
    setItemDescription('')
    setItemRarity('common')
    setItemQuantity(1)
    setWeaponDamage('1d6')
    setWeaponDamageType('slashing' as DamageType)
    setWeaponProperties([] as WeaponProperty[])
    setArmorAC(11)
    setArmorType('light')
    setSelectedCharacters([])
  }

  const getRarityColor = (rarity: Equipment['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400'
      case 'uncommon':
        return 'text-green-400'
      case 'rare':
        return 'text-blue-400'
      case 'epic':
        return 'text-purple-400'
      case 'legendary':
        return 'text-orange-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-dnd-gold rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-dnd-gold p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-dnd-gold">🎁 DM Item Granter</h2>
            <p className="text-gray-400 text-sm mt-1">Grant items to characters in your campaign</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Success Message */}
          {successMessage && (
            <div className={`border px-4 py-3 rounded-lg ${
              successMessage.startsWith('✅')
                ? 'bg-green-900/30 border-green-500 text-green-300'
                : 'bg-yellow-900/30 border-yellow-500 text-yellow-300'
            }`}>
              {successMessage}
            </div>
          )}

          {/* Mode Selection */}
          <div className="flex gap-4">
            <button
              onClick={() => setMode('quick')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                mode === 'quick'
                  ? 'bg-dnd-gold text-gray-900'
                  : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
              }`}
            >
              ⚡ Quick Add (Pre-made Items)
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                mode === 'custom'
                  ? 'bg-dnd-gold text-gray-900'
                  : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
              }`}
            >
              🛠️ Custom Create
            </button>
          </div>

          {/* Quick Add Mode */}
          {mode === 'quick' && (
            <div className="space-y-4">
              {/* Category Tabs */}
              <div className="flex gap-2 border-b border-gray-700 pb-2">
                {(['potions', 'weapons', 'armor', 'gear'] as QuickAddCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setQuickAddCategory(cat)}
                    className={`px-4 py-2 rounded-t-lg font-medium capitalize transition-all ${
                      quickAddCategory === cat
                        ? 'bg-gray-800 text-dnd-gold border-t border-x border-gray-600'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {cat === 'potions' && '🧪'}
                    {cat === 'weapons' && '⚔️'}
                    {cat === 'armor' && '🛡️'}
                    {cat === 'gear' && '🎒'}
                    {' '}
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
                {quickAddCategory === 'potions' &&
                  PREMADE_POTIONS.map((potion) => (
                    <div
                      key={potion.id}
                      className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className={`font-bold ${getRarityColor(potion.rarity)}`}>
                            {potion.name}
                          </h4>
                          <p className="text-xs text-gray-500 capitalize">{potion.rarity}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleQuickAddItem(potion)}
                            className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded transition-colors"
                            title="Add to selected characters"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleQuickAddToAll(potion)}
                            className="px-2 py-1 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-xs rounded font-bold transition-colors"
                            title="Add to all characters"
                          >
                            ALL
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{potion.description}</p>
                    </div>
                  ))}

                {quickAddCategory === 'weapons' &&
                  PREMADE_WEAPONS.map((weapon) => (
                    <div
                      key={weapon.id}
                      className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{weapon.name}</h4>
                          <p className="text-xs text-gray-400">
                            {weapon.damage.dice} {weapon.damage.type}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleQuickAddItem(weapon)}
                            className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded transition-colors"
                            title="Add to selected characters"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleQuickAddToAll(weapon)}
                            className="px-2 py-1 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-xs rounded font-bold transition-colors"
                            title="Add to all characters"
                          >
                            ALL
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{weapon.description}</p>
                    </div>
                  ))}

                {quickAddCategory === 'armor' &&
                  PREMADE_ARMOR.map((armor) => (
                    <div
                      key={armor.id}
                      className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{armor.name}</h4>
                          <p className="text-xs text-gray-400">
                            AC {armor.baseAC} • {armor.armorType}
                            {armor.stealthDisadvantage && ' • Stealth Disadv.'}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleQuickAddItem(armor)}
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
                            title="Add to selected characters"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleQuickAddToAll(armor)}
                            className="px-2 py-1 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-xs rounded font-bold transition-colors"
                            title="Add to all characters"
                          >
                            ALL
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{armor.description}</p>
                    </div>
                  ))}

                {quickAddCategory === 'gear' &&
                  PREMADE_GEAR.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.weight} lb</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleQuickAddItem(item)}
                            className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white text-xs rounded transition-colors"
                            title="Add to selected characters"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleQuickAddToAll(item)}
                            className="px-2 py-1 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-xs rounded font-bold transition-colors"
                            title="Add to all characters"
                          >
                            ALL
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Custom Create Mode */}
          {mode === 'custom' && (
            <div className="space-y-6">              {/* Item Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Item Type</label>
                <div className="grid grid-cols-5 gap-2">
                  {(['gear', 'weapon', 'armor', 'potion', 'custom'] as ItemType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setItemType(type)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${itemType === type ? 'bg-dnd-gold text-gray-900' : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Item Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Potion of Healing, Longsword, etc."
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rarity</label>
                  <select
                    value={itemRarity}
                    onChange={(e) => setItemRarity(e.target.value as Equipment['rarity'])}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                  >
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Very Rare</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  rows={3}
                  placeholder="Item description, effects, and notes..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold resize-none"
                />
              </div>

              {/* Weapon-specific fields */}
              {itemType === 'weapon' && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Damage</label>
                    <input
                      type="text"
                      value={weaponDamage}
                      onChange={(e) => setWeaponDamage(e.target.value)}
                      placeholder="1d6, 2d6, 1d8+2, etc."
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Damage Type</label>
                    <select
                      value={weaponDamageType}
                      onChange={(e) => setWeaponDamageType(e.target.value as any)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                    >
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                    />
                  </div>
                </div>
              )}

              {/* Armor-specific fields */}
              {itemType === 'armor' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Armor Type</label>
                    <select
                      value={armorType}
                      onChange={(e) => setArmorType(e.target.value as any)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                    >
                      <option value="light">Light</option>
                      <option value="medium">Medium</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Armor Class</label>
                    <input
                      type="number"
                      min="10"
                      max="20"
                      value={armorAC}
                      onChange={(e) => setArmorAC(parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                    />
                  </div>
                </div>
              )}

              {/* Quantity for non-weapons */}
              {itemType !== 'weapon' && itemType !== 'armor' && (
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold"
                  />
                </div>
              )}
            </div>
          )}

          {/* Character Selection (shared between modes) */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-gray-300">
                Select Characters ({selectedCharacters.length} selected)
              </label>
              <button
                onClick={handleSelectAll}
                className="text-sm text-dnd-gold hover:text-yellow-500 transition-colors"
              >
                {selectedCharacters.length === characters.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {characters.length === 0 ? (
              <p className="text-gray-500 text-center py-8 italic">
                No characters found. Create characters first to grant them items.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2">
                {characters.map((character) => (
                  <label
                    key={character.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${selectedCharacters.includes(character.id) ? 'bg-dnd-gold/20 border-2 border-dnd-gold' : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCharacters.includes(character.id)}
                      onChange={() => handleToggleCharacter(character.id)}
                      className="w-5 h-5 rounded border-gray-600 text-dnd-gold focus:ring-2 focus:ring-dnd-gold focus:ring-offset-gray-900"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-white">{character.name}</div>
                      <div className="text-xs text-gray-400">
                        {character.race?.name} {character.class?.name} (Level {character.level})
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons (only show in custom mode) */}
          {mode === 'custom' && (
            <div className="flex gap-4 pt-4 border-t border-gray-700">
              <button
                onClick={handleGrantToSelected}
                disabled={selectedCharacters.length === 0 || !itemName.trim()}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${selectedCharacters.length > 0 && itemName.trim() ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Grant to Selected ({selectedCharacters.length})
              </button>
              <button
                onClick={handleGrantToAll}
                disabled={characters.length === 0 || !itemName.trim()}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${characters.length > 0 && itemName.trim() ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Grant to All ({characters.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
