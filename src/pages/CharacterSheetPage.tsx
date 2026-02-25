import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { DiceRollerButton, DiceRollerModal } from '../components/DiceRoller'
import { calculateModifier, calculateProficiencyBonus, rollDice } from '../types/dice'
import { isWeapon, isArmor, isShield, isCloak, autoConvertCurrency, EMPTY_CURRENCY } from '../types/equipment'
import type { Character, Ability, Equipment, Weapon, Currency, Material, Class } from '../types'
import {
  FIGHTER,
  WARLOCK,
  ROGUE,
  WIZARD,
  CLERIC,
  BARBARIAN,
  BARD,
  DRUID,
  MONK,
  PALADIN,
  RANGER,
  SORCERER,
} from '../types'
import { CATEGORY_INFO, formatIncome, getProfessionByRoll, type Profession } from '../data/professions'
import { exportCharacterToJSON, exportCharacterToPDF } from '../utils/characterIO'
import { QuickRefTooltip } from '../components/QuickRefTooltip'
import { SPELLS } from '../data/quickReference'
import { CharacterEditModal } from '../components/CharacterEditModal'
import { DMAbilityScoreEditor } from '../components/DMAbilityScoreEditor'
import { FightingStanceSelector } from '../components/FightingStanceSelector'
import { LootCache } from '../components/LootCache'
import { HPEditor, HPEditorButton } from '../components/HPEditor'
import { LevelUpSpellSelector } from '../components/LevelUpSpellSelector'
import { NinthLevelSpellSelector } from '../components/NinthLevelSpellSelector'
import { SpellSelector } from '../components/SpellSelector'
import { AlignmentSelector } from '../components/AlignmentSelector'
import { EquipmentEditor } from '../components/EquipmentEditor'
import { FIGHTING_STANCES } from '../data/fightingStances'
import type { LootItem } from '../data/lootGenerator'
import type { Spell } from '../types'

const ABILITY_NAMES: Record<Ability, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
}

type SkillKey = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' |
  'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' |
  'perception' | 'performance' | 'persuasion' | 'religion' | 'sleightOfHand' | 'stealth' | 'survival'

const SKILLS: { name: string; ability: Ability; key: SkillKey; refId: string }[] = [
  { name: 'Acrobatics', ability: 'dexterity', key: 'acrobatics', refId: 'acrobatics' },
  { name: 'Animal Handling', ability: 'wisdom', key: 'animalHandling', refId: 'animal-handling' },
  { name: 'Arcana', ability: 'intelligence', key: 'arcana', refId: 'arcana' },
  { name: 'Athletics', ability: 'strength', key: 'athletics', refId: 'athletics' },
  { name: 'Deception', ability: 'charisma', key: 'deception', refId: 'deception' },
  { name: 'History', ability: 'intelligence', key: 'history', refId: 'history' },
  { name: 'Insight', ability: 'wisdom', key: 'insight', refId: 'insight' },
  { name: 'Intimidation', ability: 'charisma', key: 'intimidation', refId: 'intimidation' },
  { name: 'Investigation', ability: 'intelligence', key: 'investigation', refId: 'investigation' },
  { name: 'Medicine', ability: 'wisdom', key: 'medicine', refId: 'medicine' },
  { name: 'Nature', ability: 'intelligence', key: 'nature', refId: 'nature' },
  { name: 'Perception', ability: 'wisdom', key: 'perception', refId: 'perception' },
  { name: 'Performance', ability: 'charisma', key: 'performance', refId: 'performance' },
  { name: 'Persuasion', ability: 'charisma', key: 'persuasion', refId: 'persuasion' },
  { name: 'Religion', ability: 'intelligence', key: 'religion', refId: 'religion' },
  { name: 'Sleight of Hand', ability: 'dexterity', key: 'sleightOfHand', refId: 'sleight-of-hand' },
  { name: 'Stealth', ability: 'dexterity', key: 'stealth', refId: 'stealth' },
  { name: 'Survival', ability: 'wisdom', key: 'survival', refId: 'survival' },
]

export function CharacterSheetPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { characters, loadCharacter, currentCharacter, levelDown, updateCurrency, setDailyIncome, updateCharacterDetails, removeEquipment, toggleEquipment, changeEquipmentQuantity, renameEquipment, setFightingStance, addEquipment, addMaterial, removeMaterial, changeMaterialQuantity, updateHitPoints, addSpell, removeSpell, saveCharacter, addFoodRations, addWaterSupply, addItemFeature, setAlignment, setAbilityScores, migrateCurrentCharacter, needsMigration, setLevelWithHP, shortRest, longRest, initializeResourcePools, initializeFeatureCharges, useFeatureCharge } = useCharacterStore()
  const [showDiceRoller, setShowDiceRoller] = useState(false)
  const [activeTab, setActiveTab] = useState<'main' | 'actions' | 'spells' | 'inventory' | 'features' | 'story' | 'loot'>('main')
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [showIncomeRoller, setShowIncomeRoller] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showHPEditor, setShowHPEditor] = useState(false)
  const [showSpellSelector, setShowSpellSelector] = useState(false)
  const [showNinthLevelSpellSelector, setShowNinthLevelSpellSelector] = useState(false)
  const [showEquipmentEditor, setShowEquipmentEditor] = useState(false)
  const [editingLootItem, setEditingLootItem] = useState<LootItem | null>(null)
  const [levelingUpTo, setLevelingUpTo] = useState<number | null>(null)
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [showClassChangeModal, setShowClassChangeModal] = useState(false)
  const [showSpellScrollModal, setShowSpellScrollModal] = useState(false)
  const [spellScrollLevel, setSpellScrollLevel] = useState<number | null>(null)
  const [consumableItemToRemove, setConsumableItemToRemove] = useState<string | null>(null)
  const [showConsumableNotification, setShowConsumableNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)
  const [showManualSpellAdd, setShowManualSpellAdd] = useState(false)
  const [showClassSpellSelector, setShowClassSpellSelector] = useState(false)
  const [showAlignmentSelector, setShowAlignmentSelector] = useState(false)
  const [weaponRolls, setWeaponRolls] = useState<Record<string, { hit?: number; damage?: number }>>({})
  const [spellRolls, setSpellRolls] = useState<Record<string, { hit?: number; damage?: number; healing?: number }>>({})
  const [showDMAbilityEditor, setShowDMAbilityEditor] = useState(false)
  const [lastHealingRoll, setLastHealingRoll] = useState<{ itemId: string; amount: number } | null>(null)
  const [showMigrationSuccess, setShowMigrationSuccess] = useState(false)
  const [restNotification, setRestNotification] = useState<{ type: 'short' | 'long' | 'trance'; message: string } | null>(null)
  const [sellConfirmation, setSellConfirmation] = useState<{ itemName: string; value: number; currencyType: 'cp' | 'sp' | 'gp' | 'pp'; onConfirm: () => void } | null>(null)
  const [abilityNotification, setAbilityNotification] = useState<{ featureName: string; message: string } | null>(null)

  useEffect(() => {
    if (id) {
      const char = characters.find((c) => c.id === id)
      if (char) {
        loadCharacter(id)
      }
    }
  }, [id, characters, loadCharacter])

  // Scroll to top when character loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  // Initialize resource pools if character doesn't have any
  useEffect(() => {
    if (currentCharacter && currentCharacter.class && currentCharacter.resourcePools.length === 0) {
      initializeResourcePools()
    }
  }, [currentCharacter?.id, currentCharacter?.class?.id, initializeResourcePools])

  // Initialize feature charges if character doesn't have any
  useEffect(() => {
    if (currentCharacter && currentCharacter.class && currentCharacter.featureCharges.length === 0) {
      initializeFeatureCharges()
    }
  }, [currentCharacter?.id, currentCharacter?.class?.id, currentCharacter?.level, initializeFeatureCharges])

  const character = currentCharacter

  if (!character) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">Character not found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-dnd-gold hover:text-yellow-400"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  const profBonus = calculateProficiencyBonus(character.level)

  const getAbilityMod = (ability: Ability): number => {
    return calculateModifier(character.abilityScores[ability])
  }

  const formatMod = (mod: number): string => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const calculateAC = (): number => {
    let baseAC = 10 + getAbilityMod('dexterity')

    // Check equipped armor
    const equippedArmor = character.equipment.find(
      (e) => isArmor(e) && e.equipped
    )
    if (equippedArmor && isArmor(equippedArmor)) {
      const dexMod = getAbilityMod('dexterity')
      if (equippedArmor.maxDexBonus !== undefined) {
        baseAC = equippedArmor.baseAC + Math.min(dexMod, equippedArmor.maxDexBonus)
      } else if (equippedArmor.armorType === 'heavy') {
        baseAC = equippedArmor.baseAC
      } else {
        baseAC = equippedArmor.baseAC + dexMod
      }
    }

    // Check equipped shield
    const equippedShield = character.equipment.find(
      (e) => isShield(e) && e.equipped
    )
    if (equippedShield && isShield(equippedShield)) {
      baseAC += equippedShield.acBonus
    }

    // Check equipped cloak
    const equippedCloak = character.equipment.find(
      (e) => isCloak(e) && e.equipped
    )
    if (equippedCloak && isCloak(equippedCloak) && equippedCloak.acBonus) {
      baseAC += equippedCloak.acBonus
    }

    // Apply fighting stance modifier for Fighters
    if (character.class?.name.toLowerCase().includes('fighter') && character.fightingStance) {
      const stance = FIGHTING_STANCES[character.fightingStance]
      if (stance) {
        baseAC += stance.acModifier
      }
    }

    // Apply enraged condition penalty
    if (character.conditions.includes('enraged')) {
      baseAC -= 1
    }

    return baseAC
  }

  const getSkillMod = (skill: { name: string; ability: Ability; key: SkillKey }): number => {
    const abilityMod = getAbilityMod(skill.ability)
    const profLevel = character.skills[skill.key]
    const isProficient = profLevel === 'proficient' || profLevel === 'expertise'
    const isExpert = profLevel === 'expertise'

    if (isExpert) return abilityMod + profBonus * 2
    if (isProficient) return abilityMod + profBonus
    return abilityMod
  }

  const isSkillProficient = (skillKey: SkillKey): boolean => {
    const profLevel = character.skills[skillKey]
    return profLevel === 'proficient' || profLevel === 'expertise'
  }

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true)
      await exportCharacterToPDF(character)
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExportingPDF(false)
    }
  }

  const handleSaveDetails = (details: {
    name: string
    playerName: string
    age: string
    height: string
    weight: string
    backstory: string
  }) => {
    updateCharacterDetails(details)
    saveCharacter()
  }

  const handleManualConvertCurrency = () => {
    if (!character) return
    const converted = autoConvertCurrency(character.currency)
    updateCurrency(converted)
    saveCharacter()
  }

  const handleAddLootToInventory = (lootItem: LootItem) => {
    // Check if this is a 9th level spell scroll
    if (lootItem.id.startsWith('spell-scroll-9')) {
      // Trigger the 9th level spell selection modal
      setShowNinthLevelSpellSelector(true)
      return
    }

    // Auto-store food items to foodRations
    if (lootItem.category === 'Food' && lootItem.foodDays) {
      addFoodRations(lootItem.foodDays)
      saveCharacter()
      return
    }

    // Auto-store water items to waterSupply
    if (lootItem.category === 'Water' && lootItem.waterDays) {
      addWaterSupply(lootItem.waterDays)
      saveCharacter()
      return
    }

    // Crafting materials (herbs, ores, leathers, hides) go to Mats inventory
    if (lootItem.category === 'Crafting Material') {
      // Determine material category based on name
      const nameLower = lootItem.name.toLowerCase()
      let materialCategory: 'herb' | 'ore' | 'leather' | 'hide' | 'gem' | 'other' = 'other'

      if (nameLower.includes('herb') || nameLower.includes('lavender') || nameLower.includes('mint') ||
          nameLower.includes('sage') || nameLower.includes('thyme') || nameLower.includes('basil') ||
          nameLower.includes('rosemary') || nameLower.includes('chamomile') || nameLower.includes('petal') ||
          nameLower.includes('root') || nameLower.includes('flower')) {
        materialCategory = 'herb'
      } else if (nameLower.includes('ore') || nameLower.includes('ingot') || nameLower.includes('metal') ||
                 nameLower.includes('iron') || nameLower.includes('copper') || nameLower.includes('gold') ||
                 nameLower.includes('silver') || nameLower.includes('mithril') || nameLower.includes('adamantine')) {
        materialCategory = 'ore'
      } else if (nameLower.includes('leather')) {
        materialCategory = 'leather'
      } else if (nameLower.includes('hide') || nameLower.includes('pelt') || nameLower.includes('fur')) {
        materialCategory = 'hide'
      } else if (nameLower.includes('gem') || nameLower.includes('diamond') || nameLower.includes('ruby') ||
                 nameLower.includes('sapphire') || nameLower.includes('emerald') || nameLower.includes('amethyst')) {
        materialCategory = 'gem'
      }

      const material: Material = {
        id: lootItem.id, // Use consistent ID for consolidation
        name: lootItem.name,
        description: lootItem.description,
        category: materialCategory,
        quantity: lootItem.quantity || 1,
        rarity: lootItem.rarity as any,
        weight: 0.1, // 0.1 pounds per unit
      }

      addMaterial(material)
      saveCharacter()
      return
    }

    // Consumables (potions, scrolls, elixirs) go directly to inventory
    const nameLower = lootItem.name.toLowerCase()
    const isConsumable = lootItem.category === 'consumable' ||
                        nameLower.includes('potion') ||
                        nameLower.includes('scroll') ||
                        nameLower.includes('elixir')

    if (isConsumable) {
      const consumableItem: Equipment = {
        id: lootItem.id + '-' + Date.now(),
        name: lootItem.name,
        description: lootItem.description,
        category: 'consumable',
        equipped: false,
        rarity: lootItem.rarity,
        quantity: lootItem.quantity || 1,
        weight: 0.1,
        cost: {
          ...EMPTY_CURRENCY,
          gold: lootItem.value || 0,
        },
      }
      addEquipment(consumableItem)
      saveCharacter()
      return
    }

    // Items with special abilities (like invisibility cloak) -> add to Features
    if (lootItem.feature) {
      addItemFeature(lootItem.feature)
      // Still add to inventory so player can see they have it
      setEditingLootItem(lootItem)
      setShowEquipmentEditor(true)
      return
    }

    // Auto-add accessories (cloaks, rings, trinkets, necklaces, orbs, books) without editor
    const isAccessory = lootItem.category === 'Cloak' ||
                       lootItem.category === 'cloak' ||
                       lootItem.category === 'jewelry' ||
                       lootItem.category === 'trinket' ||
                       nameLower.includes('ring') ||
                       nameLower.includes('necklace') ||
                       nameLower.includes('orb') ||
                       nameLower.includes('book')

    if (isAccessory) {
      // Determine proper category
      let category: 'cloak' | 'jewelry' | 'trinket' | 'adventuringGear' = 'adventuringGear'
      if (lootItem.category === 'Cloak' || lootItem.category === 'cloak' || nameLower.includes('cloak')) {
        category = 'cloak'
      } else if (lootItem.category === 'jewelry' || nameLower.includes('ring') || nameLower.includes('necklace')) {
        category = 'jewelry'
      } else if (lootItem.category === 'trinket' || nameLower.includes('orb') || nameLower.includes('book')) {
        category = 'trinket'
      }

      const accessoryItem: Equipment = {
        id: lootItem.id + '-' + Date.now(),
        name: lootItem.name,
        description: lootItem.description,
        category,
        equipped: true, // Auto-equip accessories
        rarity: lootItem.rarity,
        quantity: lootItem.quantity || 1,
        weight: 0.5,
        cost: {
          ...EMPTY_CURRENCY,
          gold: lootItem.value || 0,
        },
      }
      addEquipment(accessoryItem)
      saveCharacter()
      return
    }

    // Open equipment editor for all other items
    setEditingLootItem(lootItem)
    setShowEquipmentEditor(true)
  }

  const handleSaveEquipment = (equipment: Equipment) => {
    addEquipment(equipment)
    saveCharacter()
    setShowEquipmentEditor(false)
    setEditingLootItem(null)
  }

  const handleSellItem = (itemId: string) => {
    const item = character.equipment.find(e => e.id === itemId)
    if (!item || !item.rarity) return

    // Calculate sell price based on rarity
    let copperValue = 0

    // Check if it's a gem (gems sell for 1 gold each)
    if (item.name.toLowerCase().includes('gem') ||
        item.name.toLowerCase().includes('diamond') ||
        item.name.toLowerCase().includes('emerald') ||
        item.name.toLowerCase().includes('ruby') ||
        item.name.toLowerCase().includes('sapphire') ||
        item.name.toLowerCase().includes('amethyst')) {
      copperValue = 100 * (item.quantity || 1) // 1 gold = 100 copper
    } else {
      // Crafting materials sell based on rarity
      const rarityPrices: Record<string, number> = {
        'trash': 0,
        'common': 5,
        'uncommon': 10,
        'rare': 20,
        'epic': 35,
        'legendary': 50,
        'artifact': 100, // Artifact materials worth more
      }
      copperValue = (rarityPrices[item.rarity] || 0) * (item.quantity || 1)
    }

    // Convert to appropriate currency type
    let value = copperValue
    let currencyType: 'cp' | 'sp' | 'gp' | 'pp' = 'cp'

    if (copperValue >= 10000) {
      value = copperValue / 10000
      currencyType = 'pp'
    } else if (copperValue >= 100) {
      value = copperValue / 100
      currencyType = 'gp'
    } else if (copperValue >= 10) {
      value = copperValue / 10
      currencyType = 'sp'
    }

    // Show confirmation modal
    setSellConfirmation({
      itemName: item.name,
      value,
      currencyType,
      onConfirm: () => {
        // Add currency to character
        const currentCurrency = { ...character.currency }
        currentCurrency.copper += copperValue
        updateCurrency(autoConvertCurrency(currentCurrency))

        // Remove item from inventory
        removeEquipment(itemId)
        saveCharacter()
        setSellConfirmation(null)
      }
    })
  }

  const handleSellMaterial = (materialId: string) => {
    const material = character.materials.find(m => m.id === materialId)
    if (!material) return

    // Calculate sell price based on rarity and category
    let copperValue = 0

    // Check if it's a gem (gems sell for 1 gold each)
    if (material.category === 'gem') {
      copperValue = 100 * material.quantity // 1 gold = 100 copper
    } else {
      // Other materials sell based on rarity
      const rarityPrices: Record<string, number> = {
        'trash': 0,
        'common': 5,
        'uncommon': 10,
        'rare': 20,
        'epic': 35,
        'legendary': 50,
        'artifact': 100,
      }
      copperValue = (rarityPrices[material.rarity] || 0) * material.quantity
    }

    // Convert to appropriate currency type
    let value = copperValue
    let currencyType: 'cp' | 'sp' | 'gp' | 'pp' = 'cp'

    if (copperValue >= 10000) {
      value = copperValue / 10000
      currencyType = 'pp'
    } else if (copperValue >= 100) {
      value = copperValue / 100
      currencyType = 'gp'
    } else if (copperValue >= 10) {
      value = copperValue / 10
      currencyType = 'sp'
    }

    // Show confirmation modal
    setSellConfirmation({
      itemName: material.name,
      value,
      currencyType,
      onConfirm: () => {
        // Add currency to character
        const currentCurrency = { ...character.currency }
        currentCurrency.copper += copperValue
        updateCurrency(autoConvertCurrency(currentCurrency))

        // Remove material from inventory
        removeMaterial(materialId)
        saveCharacter()
        setSellConfirmation(null)
      }
    })
  }

  // Parse healing amount from potion description
  const parseHealingAmount = (description: string): string | null => {
    // Look for patterns like "2d4+2", "restores 10 hit points", "heals 2d8", etc.
    const dicePattern = /(\d+d\d+(?:\s*[+\-]\s*\d+)?)/i
    const hpPattern = /(\d+)\s*hit points?/i
    const healsPattern = /heals?\s+(\d+d\d+(?:\s*[+\-]\s*\d+)?|\d+)/i

    let match = description.match(healsPattern)
    if (match) return match[1]

    match = description.match(dicePattern)
    if (match) return match[1]

    match = description.match(hpPattern)
    if (match) return match[1]

    return null
  }

  // Handle using a potion/consumable
  const handleUsePotion = (itemId: string) => {
    const item = character.equipment.find(eq => eq.id === itemId)
    if (!item) return

    // Try to roll healing dice if this is a healing potion
    const healingFormula = parseHealingAmount(item.description)
    let healingRoll: number | null = null

    if (healingFormula) {
      // Check if it's a dice formula or flat number
      if (healingFormula.includes('d')) {
        const roll = rollDice(healingFormula)
        if (roll) {
          healingRoll = roll.grandTotal
        }
      } else {
        // It's a flat number
        healingRoll = parseInt(healingFormula)
      }
    }

    // Store the healing roll result
    if (healingRoll !== null) {
      setLastHealingRoll({ itemId, amount: healingRoll })

      // Clear after 5 seconds
      setTimeout(() => {
        setLastHealingRoll(null)
      }, 5000)
    }

    // Check if it has multiple quantities
    if (item.quantity && item.quantity > 1) {
      changeEquipmentQuantity(itemId, item.quantity - 1)
      const message = healingRoll !== null
        ? `Used ${item.name}. Healed ${healingRoll} HP! ${item.quantity - 1} remaining.`
        : `Used ${item.name}. ${item.quantity - 1} remaining.`
      setShowConsumableNotification({
        message,
        type: 'success'
      })
    } else {
      // Remove the item entirely
      removeEquipment(itemId)
      const message = healingRoll !== null
        ? `Used ${item.name}. Healed ${healingRoll} HP! Item removed from inventory.`
        : `Used ${item.name}. Item removed from inventory.`
      setShowConsumableNotification({
        message,
        type: 'success'
      })
    }

    saveCharacter()

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowConsumableNotification(null)
    }, 3000)
  }

  // Roll to hit for weapon attack
  const handleRollToHit = (weaponId: string, attackBonus: number) => {
    const roll = rollDice('1d20')
    if (!roll) return
    const totalRoll = roll.grandTotal + attackBonus
    setWeaponRolls(prev => ({
      ...prev,
      [weaponId]: { ...prev[weaponId], hit: totalRoll }
    }))

    // Clear after 5 seconds
    setTimeout(() => {
      setWeaponRolls(prev => {
        const newRolls = { ...prev }
        if (newRolls[weaponId]) {
          delete newRolls[weaponId].hit
        }
        return newRolls
      })
    }, 5000)
  }

  // Roll damage for weapon
  const handleRollDamage = (weaponId: string, damageDice: string) => {
    const roll = rollDice(damageDice)
    if (!roll) return
    setWeaponRolls(prev => ({
      ...prev,
      [weaponId]: { ...prev[weaponId], damage: roll.grandTotal }
    }))

    // Clear after 5 seconds
    setTimeout(() => {
      setWeaponRolls(prev => {
        const newRolls = { ...prev }
        if (newRolls[weaponId]) {
          delete newRolls[weaponId].damage
        }
        return newRolls
      })
    }, 5000)
  }

  const handleRollSpellAttack = (spellId: string, spellcastingAbility: string) => {
    const abilityScore = character.abilityScores[spellcastingAbility as keyof typeof character.abilityScores]
    const abilityMod = Math.floor((abilityScore - 10) / 2)
    const profBonus = calculateProficiencyBonus(character.level)
    const attackBonus = abilityMod + profBonus

    const roll = rollDice('1d20')
    if (!roll) return
    const totalRoll = roll.grandTotal + attackBonus
    setSpellRolls(prev => ({
      ...prev,
      [spellId]: { ...prev[spellId], hit: totalRoll }
    }))

    // Clear after 5 seconds
    setTimeout(() => {
      setSpellRolls(prev => {
        const newRolls = { ...prev }
        if (newRolls[spellId]) {
          delete newRolls[spellId].hit
        }
        return newRolls
      })
    }, 5000)
  }

  const handleRollSpellDamage = (spellId: string, damageDice: string) => {
    const roll = rollDice(damageDice)
    if (!roll) return
    setSpellRolls(prev => ({
      ...prev,
      [spellId]: { ...prev[spellId], damage: roll.grandTotal }
    }))

    // Clear after 5 seconds
    setTimeout(() => {
      setSpellRolls(prev => {
        const newRolls = { ...prev }
        if (newRolls[spellId]) {
          delete newRolls[spellId].damage
        }
        return newRolls
      })
    }, 5000)
  }

  const handleRollSpellHealing = (spellId: string, healingDice: string) => {
    const roll = rollDice(healingDice)
    if (!roll) return
    setSpellRolls(prev => ({
      ...prev,
      [spellId]: { ...prev[spellId], healing: roll.grandTotal }
    }))

    // Clear after 5 seconds
    setTimeout(() => {
      setSpellRolls(prev => {
        const newRolls = { ...prev }
        if (newRolls[spellId]) {
          delete newRolls[spellId].healing
        }
        return newRolls
      })
    }, 5000)
  }

  const handleUpdateHP = (hp: Partial<Character['hitPoints']>) => {
    updateHitPoints(hp)
    saveCharacter()
  }

  const handleUpdateAbilityScores = (scores: Character['abilityScores']) => {
    setAbilityScores(scores)
    saveCharacter()
  }

  const handleMigrateCharacter = () => {
    migrateCurrentCharacter()
    setShowMigrationSuccess(true)
    setTimeout(() => {
      setShowMigrationSuccess(false)
    }, 5000)
  }

  const handleShortRest = () => {
    shortRest()
    saveCharacter()
    setRestNotification({
      type: 'short',
      message: '🛌 Short Rest complete! Some abilities and half of long rest resources restored.'
    })
    setTimeout(() => setRestNotification(null), 5000)
  }

  const handleLongRest = () => {
    longRest()
    saveCharacter()
    setRestNotification({
      type: 'long',
      message: '😴 Long Rest complete! HP, spell slots, and all resources fully restored. Daily income added!'
    })
    setTimeout(() => setRestNotification(null), 5000)
  }

  const handleTrance = () => {
    // Trance is equivalent to a long rest for elves (4 hours instead of 8)
    longRest()
    saveCharacter()
    setRestNotification({
      type: 'trance',
      message: '🧘 Trance complete! (4 hours) HP, spell slots, and all resources fully restored. Daily income added!'
    })
    setTimeout(() => setRestNotification(null), 5000)
  }

  const handleUseAbility = (featureId: string, featureName: string) => {
    // Check if character has charges remaining
    const feature = character.featureCharges.find(f => f.id === featureId)
    if (!feature || feature.current <= 0) {
      setAbilityNotification({
        featureName,
        message: `❌ No charges remaining for ${featureName}!`
      })
      setTimeout(() => setAbilityNotification(null), 3000)
      return
    }

    // Use the charge
    useFeatureCharge(featureId)

    // Special handling for Second Wind (Fighter healing ability)
    if (featureId === 'second-wind') {
      const healRoll = Math.floor(Math.random() * 10) + 1 // 1d10
      const healAmount = healRoll + character.level
      const newHP = Math.min(character.hitPoints.current + healAmount, character.hitPoints.maximum)

      updateHitPoints({ current: newHP })

      setAbilityNotification({
        featureName,
        message: `💚 Second Wind! Healed ${healAmount} HP (${healRoll} + ${character.level})`
      })
    } else {
      // Generic ability use notification
      setAbilityNotification({
        featureName,
        message: `⚡ Used ${featureName}!`
      })
    }

    saveCharacter()
    setTimeout(() => setAbilityNotification(null), 5000)
  }

  const handleLevelUp = () => {
    const newLevel = character.level + 1
    const conModifier = calculateModifier(character.abilityScores.constitution)

    // Calculate HP increase: use average of hit die (rounded up) + CON modifier
    // Hit dice: d6=4, d8=5, d10=6, d12=7
    const hitDie = character.class?.hitDie || '1d8'
    const dieSize = parseInt(hitDie.match(/\d+$/)?.[0] || '8')
    const avgRoll = Math.ceil(dieSize / 2) + 1
    const hpIncrease = Math.max(1, avgRoll + conModifier)
    const newMaxHP = character.hitPoints.maximum + hpIncrease

    // Update level and HP
    setLevelWithHP(newLevel, newMaxHP)

    // Save immediately to persist the level change
    saveCharacter()

    // Check if this is a spellcaster and if they gain spells
    const isSpellcaster = character.class?.spellcasting !== undefined

    if (isSpellcaster) {
      // Set the level they're leveling up to and show spell selector
      setLevelingUpTo(newLevel)
      setShowSpellSelector(true)
    }
  }

  const handleAddLevelUpSpells = (spells: Spell[]) => {
    spells.forEach(spell => addSpell(spell))
    saveCharacter()
    setLevelingUpTo(null)
  }

  const handleSelectNinthLevelSpell = (spell: Spell) => {
    addSpell(spell)
    saveCharacter()
    setShowNinthLevelSpellSelector(false)
  }

  const handleUseConsumable = (item: Equipment) => {
    // Tome of Reincarnation - class change
    if (item.id === 'tome-class-change') {
      setConsumableItemToRemove(item.id)
      setShowClassChangeModal(true)
      return
    }

    // Spell Scrolls - learn a spell
    if (item.name.toLowerCase().includes('spell scroll')) {
      const levelMatch = item.name.match(/\((\d+)(?:st|nd|rd|th) Level\)/i)
      if (levelMatch) {
        const level = parseInt(levelMatch[1])
        setSpellScrollLevel(level)
        setConsumableItemToRemove(item.id)
        setShowSpellScrollModal(true)
      }
      return
    }

    // Currency items - add gold
    if (item.name.toLowerCase().includes('hoard') ||
        item.name.toLowerCase().includes('fortune') ||
        item.name.toLowerCase().includes('treasure') ||
        item.category === 'treasure') {
      const goldValue = item.cost.gold || 0
      if (goldValue > 0) {
        updateCurrency({ gold: character.currency.gold + goldValue })
        removeEquipment(item.id)
        saveCharacter()
        setShowConsumableNotification({
          message: `Added ${goldValue} gold to your purse!`,
          type: 'success'
        })
        setTimeout(() => setShowConsumableNotification(null), 3000)
      }
      return
    }

    // Weapon/Armor bonus items
    if (item.name.toLowerCase().includes('weapon +') || item.name.toLowerCase().includes('armor +')) {
      const bonusMatch = item.name.match(/\+(\d+)/)
      if (bonusMatch) {
        const bonus = parseInt(bonusMatch[1])
        const type = item.name.toLowerCase().includes('weapon') ? 'weapons' : 'armor'
        removeEquipment(item.id)
        saveCharacter()
        setShowConsumableNotification({
          message: `Applied +${bonus} permanent bonus to all ${type}!`,
          type: 'success'
        })
        setTimeout(() => setShowConsumableNotification(null), 3000)
      }
      return
    }
  }

  const handleClassChange = (newClass: Class) => {
    if (!character) return

    // Remove all current class spells and features
    const updatedCharacter = {
      ...character,
      class: newClass,
      level: 1,
      knownSpells: [],
      hitPoints: {
        current: newClass.hitDie === 'd10' ? 10 :
                 newClass.hitDie === 'd8' ? 8 :
                 newClass.hitDie === 'd12' ? 12 :
                 newClass.hitDie === 'd6' ? 6 : 8,
        maximum: newClass.hitDie === 'd10' ? 10 :
                 newClass.hitDie === 'd8' ? 8 :
                 newClass.hitDie === 'd12' ? 12 :
                 newClass.hitDie === 'd6' ? 6 : 8,
        temporary: 0
      }
    }

    // Apply new class saving throws
    const savingThrows = { ...character.savingThrows }
    Object.keys(savingThrows).forEach(key => {
      savingThrows[key as keyof typeof savingThrows] = false
    })
    newClass.savingThrows.forEach((ability) => {
      savingThrows[ability] = true
    })
    updatedCharacter.savingThrows = savingThrows

    // Remove the tome from inventory
    if (consumableItemToRemove) {
      removeEquipment(consumableItemToRemove)
    }

    // Update character with new class
    useCharacterStore.setState({ currentCharacter: updatedCharacter })
    saveCharacter()

    setShowClassChangeModal(false)
    setConsumableItemToRemove(null)
    setShowConsumableNotification({
      message: `Reincarnated as a level 1 ${newClass.name}!`,
      type: 'success'
    })
    setTimeout(() => setShowConsumableNotification(null), 3000)
  }

  const handleSpellScrollUse = (spell: Spell) => {
    addSpell(spell)
    if (consumableItemToRemove) {
      removeEquipment(consumableItemToRemove)
    }
    saveCharacter()
    setShowSpellScrollModal(false)
    setConsumableItemToRemove(null)
    setSpellScrollLevel(null)
    setShowConsumableNotification({
      message: `Learned ${spell.name} from the spell scroll!`,
      type: 'success'
    })
    setTimeout(() => setShowConsumableNotification(null), 3000)
  }

  const tabs = [
    { id: 'main', label: 'Overview' },
    { id: 'actions', label: 'Actions' },
    { id: 'spells', label: 'Spells' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'features', label: 'Features' },
    { id: 'story', label: 'Story' },
    { id: 'loot', label: 'Loot Cache' },
  ] as const

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-dnd-gold mb-2">
            {character.name || 'Unnamed Character'}
          </h1>
          <p className="text-xl text-gray-400">
            Level {character.level} {character.race?.name || 'Unknown'}{' '}
            {character.class?.name || 'Unknown'}
            {character.subclass && ` (${character.subclass.name})`}
          </p>
          {character.background && (
            <p className="text-gray-500">{character.background.name} Background</p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleLevelUp}
            disabled={character.level >= 20}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg
                     transition-colors focus:outline-none focus:ring-2 focus:ring-green-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            title="Advance to next level"
          >
            Level Up
          </button>
          <button
            onClick={() => {
              levelDown()
              saveCharacter()
            }}
            disabled={character.level <= 1}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg
                     transition-colors focus:outline-none focus:ring-2 focus:ring-red-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            title="Decrease character level"
          >
            Level Down
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg
                     transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            title="Print character sheet"
          >
            Print
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg
                     transition-colors focus:outline-none focus:ring-2 focus:ring-red-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export character as PDF file"
          >
            {isExportingPDF ? 'Exporting...' : 'Export PDF'}
          </button>
          <button
            onClick={() => exportCharacterToJSON(character)}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg
                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Export character as JSON file"
          >
            Export JSON
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                     transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            title="Edit character details"
          >
            Edit Details
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-dnd-gold text-gray-900'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'main' && (
        <>
          {/* Migration Warning/Success Banner */}
          {needsMigration() && !showMigrationSuccess && (
            <div className="mb-6 p-4 bg-yellow-900/30 border-2 border-yellow-600/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">⚠️ Character Data Update Available</h3>
                  <p className="text-yellow-200/90 text-sm">
                    This character was created with an older version of the app. Click "Fix Character Data" to update it to the latest format. This will ensure all features work correctly.
                  </p>
                </div>
                <button
                  onClick={handleMigrateCharacter}
                  className="ml-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  Fix Character Data
                </button>
              </div>
            </div>
          )}

          {/* Migration Success Banner */}
          {showMigrationSuccess && (
            <div className="mb-6 p-4 bg-green-900/30 border-2 border-green-600/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-green-400 font-bold text-lg">Character Data Updated!</h3>
                  <p className="text-green-200/90 text-sm">
                    Your character has been successfully updated to the latest data format. All features should now work correctly.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Ability Scores */}
            <div className="space-y-6">
            {/* Ability Scores */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Ability Scores</h3>
                <button
                  onClick={() => setShowDMAbilityEditor(true)}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
                  title="DM: Edit Ability Scores"
                >
                  ⚙️ DM Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(ABILITY_NAMES) as Ability[]).map((ability) => (
                  <div
                    key={ability}
                    className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700"
                  >
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {ABILITY_NAMES[ability]}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {character.abilityScores[ability]}
                    </div>
                    <div className="text-lg text-dnd-gold font-medium">
                      {formatMod(getAbilityMod(ability))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saving Throws */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Saving Throws</h3>
              <div className="space-y-2">
                {(Object.keys(ABILITY_NAMES) as Ability[]).map((ability) => {
                  const isProficient = character.class?.savingThrows.includes(ability)
                  const mod = getAbilityMod(ability) + (isProficient ? profBonus : 0)
                  return (
                    <div
                      key={ability}
                      className="flex items-center justify-between py-1 px-2 rounded bg-gray-900/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isProficient ? 'bg-dnd-gold' : 'bg-gray-600'}`} />
                        <span className="text-gray-300 text-sm">{ABILITY_NAMES[ability]}</span>
                      </div>
                      <span className="text-white font-medium">{formatMod(mod)}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Proficiency Bonus */}
            <div className="card bg-gray-800 border-gray-700 p-4 text-center">
              <QuickRefTooltip type="rule" id="proficiency-bonus">
                <div className="text-xs text-gray-500 uppercase mb-1 cursor-pointer hover:text-gray-300">Proficiency Bonus</div>
              </QuickRefTooltip>
              <div className="text-3xl font-bold text-dnd-gold">+{profBonus}</div>
            </div>
          </div>

          {/* Middle Column - Combat Stats & Skills */}
          <div className="space-y-6">
            {/* Combat Stats */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Combat</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <QuickRefTooltip type="rule" id="armor-class">
                    <div className="text-xs text-gray-500 uppercase mb-1 cursor-pointer hover:text-gray-300">AC</div>
                  </QuickRefTooltip>
                  <div className="text-2xl font-bold text-white">
                    {calculateAC()}
                    {character.conditions.includes('enraged') && (
                      <span className="text-xs text-orange-400 ml-1">(-1)</span>
                    )}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-red-900/50">
                  <div className="text-xs text-gray-500 uppercase mb-1 flex items-center justify-center">
                    HP
                    <HPEditorButton onClick={() => setShowHPEditor(true)} />
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {character.hitPoints.current}/{character.hitPoints.maximum}
                  </div>
                  {character.hitPoints.temporary > 0 && (
                    <div className="text-xs text-blue-400 mt-1">
                      +{character.hitPoints.temporary} temp
                    </div>
                  )}
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <QuickRefTooltip type="rule" id="speed">
                    <div className="text-xs text-gray-500 uppercase mb-1 cursor-pointer hover:text-gray-300">Speed</div>
                  </QuickRefTooltip>
                  <div className="text-2xl font-bold text-white">
                    {character.race?.speed || 30} ft
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <QuickRefTooltip type="rule" id="initiative">
                    <div className="text-xs text-gray-500 uppercase mb-1 cursor-pointer hover:text-gray-300">Initiative</div>
                  </QuickRefTooltip>
                  <div className="text-xl font-bold text-white">
                    {formatMod(getAbilityMod('dexterity'))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <QuickRefTooltip type="rule" id="hit-die">
                    <div className="text-xs text-gray-500 uppercase mb-1 cursor-pointer hover:text-gray-300">Hit Die</div>
                  </QuickRefTooltip>
                  <div className="text-xl font-bold text-white">
                    {character.level}{character.class?.hitDie || 'd8'}
                  </div>
                </div>
              </div>
            </div>

            {/* Fighting Stance (Fighter only) */}
            {character.class?.name.toLowerCase().includes('fighter') && (
              <FightingStanceSelector
                currentStance={character.fightingStance}
                onChange={(stance) => {
                  setFightingStance(stance)
                  saveCharacter()
                }}
              />
            )}

            {/* Skills */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Skills</h3>
              <div className="space-y-1 max-h-80 overflow-y-auto pr-2">
                {SKILLS.map((skill) => (
                  <div
                    key={skill.key}
                    className="flex items-center justify-between py-1 px-2 rounded bg-gray-900/50 hover:bg-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        isSkillProficient(skill.key) ? 'bg-dnd-gold' : 'bg-gray-600'
                      }`} />
                      <QuickRefTooltip type="skill" id={skill.refId}>
                        <span className="text-gray-300 text-sm">
                          {skill.name}
                        </span>
                      </QuickRefTooltip>
                      <span className="text-xs text-gray-600">({ABILITY_NAMES[skill.ability]})</span>
                    </div>
                    <span className="text-white font-medium">{formatMod(getSkillMod(skill))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info & Dice */}
          <div className="space-y-6">
            {/* Character Info */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Character Info</h3>
              <div className="space-y-3 text-sm">
                {/* Alignment */}
                <div className="flex justify-between items-center">
                  <QuickRefTooltip type="rule" id="alignment">
                    <span className="text-gray-500 cursor-pointer hover:text-gray-300">Alignment</span>
                  </QuickRefTooltip>
                  <div className="flex items-center gap-2">
                    <span className={character.alignment ? "text-gray-300" : "text-red-400 italic"}>
                      {character.alignment
                        ? character.alignment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                        : 'Not Selected'
                      }
                    </span>
                    <button
                      onClick={() => setShowAlignmentSelector(true)}
                      className="text-xs px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors"
                      title={character.alignment ? "Change alignment" : "Choose alignment"}
                    >
                      {character.alignment ? '✏️' : '➕'}
                    </button>
                  </div>
                </div>
                {character.playerName && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Player</span>
                    <span className="text-gray-300">{character.playerName}</span>
                  </div>
                )}
                {character.age && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Age</span>
                    <span className="text-gray-300">{character.age}</span>
                  </div>
                )}
                {character.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Height</span>
                    <span className="text-gray-300">{character.height}</span>
                  </div>
                )}
                {character.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight</span>
                    <span className="text-gray-300">{character.weight}</span>
                  </div>
                )}
                {character.race?.vision && (
                  <div className="flex justify-between">
                    <QuickRefTooltip
                      type="rule"
                      id={
                        character.race.vision === 'superiorDarkvision' ? 'superior-darkvision' :
                        character.race.vision === 'darkvision' ? 'darkvision' :
                        'vision'
                      }
                    >
                      <span className="text-gray-500 cursor-pointer hover:text-gray-300">Vision</span>
                    </QuickRefTooltip>
                    <span className="text-gray-300">
                      {character.race.vision === 'superiorDarkvision'
                        ? `Superior Darkvision (${character.race.visionRange} ft)`
                        : character.race.vision === 'darkvision'
                        ? `Darkvision (${character.race.visionRange} ft)`
                        : 'Normal'}
                    </span>
                  </div>
                )}
                {character.race?.languages && (
                  <div className="flex justify-between">
                    <QuickRefTooltip type="rule" id="languages">
                      <span className="text-gray-500 cursor-pointer hover:text-gray-300">Languages</span>
                    </QuickRefTooltip>
                    <span className="text-gray-300">{character.race.languages.join(', ')}</span>
                  </div>
                )}
                {character.race?.damageResistances && character.race.damageResistances.length > 0 && (
                  <div className="flex justify-between">
                    <QuickRefTooltip type="rule" id="resistance">
                      <span className="text-gray-500 cursor-pointer hover:text-gray-300">Resistances</span>
                    </QuickRefTooltip>
                    <span className="text-green-400 font-medium capitalize">
                      {character.race.damageResistances.join(', ')}
                    </span>
                  </div>
                )}
                {character.race?.conditionImmunities && character.race.conditionImmunities.length > 0 && (
                  <div className="flex justify-between">
                    <QuickRefTooltip type="rule" id="immunity">
                      <span className="text-gray-500 cursor-pointer hover:text-gray-300">Immunities</span>
                    </QuickRefTooltip>
                    <span className="text-blue-400 font-medium capitalize">
                      {character.race.conditionImmunities.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {activeTab === 'spells' && (
        <div className="space-y-6">
          {/* Spell Action Buttons */}
          <div className="flex justify-end gap-3">
            {/* Choose Class Spells - only for spellcasting classes */}
            {character.class && character.class.spellcasting !== 'none' && (
              <button
                onClick={() => setShowClassSpellSelector(true)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                title="Choose spells from your class spell list"
              >
                <span className="text-lg">📚</span>
                Choose Class Spells
              </button>
            )}
            {/* Add Any Spell - for shops or other sources */}
            <button
              onClick={() => setShowManualSpellAdd(true)}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              title="Add spell from shop or other source"
            >
              <span className="text-lg font-bold">+</span>
              Add Spell
            </button>
          </div>

          {character.knownSpells.length === 0 ? (
            <div className="card bg-gray-800 border-gray-700 p-8 text-center">
              <p className="text-gray-400">No spells known.</p>
            </div>
          ) : (
            <>
              {/* Cantrips */}
              {character.knownSpells.filter((s) => s.level === 0).length > 0 && (
                <div className="card bg-gray-800 border-gray-700 p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Cantrips</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {character.knownSpells
                      .filter((s) => s.level === 0)
                      .map((spell) => (
                        <div key={spell.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all flex items-center justify-between group">
                          <QuickRefTooltip type="spell" id={spell.id}>
                            <div className="cursor-pointer flex-1">
                              <div className="font-medium text-purple-400 hover:text-purple-300">{spell.name}</div>
                              <div className="text-xs text-gray-500">{spell.school} cantrip</div>
                            </div>
                          </QuickRefTooltip>
                          <TrashIcon onClick={() => { removeSpell(spell.id); saveCharacter(); }} />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Leveled Spells */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
                const spellsAtLevel = character.knownSpells.filter((s) => s.level === level)
                if (spellsAtLevel.length === 0) return null
                return (
                  <div key={level} className="card bg-gray-800 border-gray-700 p-4">
                    <h3 className="text-lg font-bold text-white mb-4">Level {level} Spells</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {spellsAtLevel.map((spell) => (
                        <div key={spell.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all flex items-center justify-between group">
                          <QuickRefTooltip type="spell" id={spell.id}>
                            <div className="cursor-pointer flex-1">
                              <div className="font-medium text-purple-400 hover:text-purple-300">{spell.name}</div>
                              <div className="text-xs text-gray-500">
                                {spell.school} | {spell.castingTime.amount} {spell.castingTime.unit}
                              </div>
                            </div>
                          </QuickRefTooltip>
                          <TrashIcon onClick={() => { removeSpell(spell.id); saveCharacter(); }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Currency */}
          <div className="card bg-gray-800 border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-white">Currency</h3>
              <div className="flex flex-wrap gap-2">
                {!character.dailyIncome ? (
                  <button
                    onClick={() => setShowIncomeRoller(true)}
                    className="px-3 py-1 text-sm bg-dnd-gold text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Daily Income
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!character.dailyIncome) return

                      // Earn daily income
                      const earned: Partial<Currency> = {}
                      if (character.dailyIncome.currency === 'gold') earned.gold = character.dailyIncome.amount
                      else if (character.dailyIncome.currency === 'silver') earned.silver = character.dailyIncome.amount
                      else if (character.dailyIncome.currency === 'copper') earned.copper = character.dailyIncome.amount

                      const newCurrency = { ...character.currency }
                      for (const [key, value] of Object.entries(earned)) {
                        newCurrency[key as keyof Currency] += value
                      }
                      updateCurrency(newCurrency)

                      // Consume 1 food ration per day
                      if (character.foodRations > 0) {
                        addFoodRations(-1)
                      }

                      saveCharacter()
                    }}
                    className="px-3 py-1 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title={character.dailyIncome ? `Collect ${character.dailyIncome.amount} ${character.dailyIncome.currency === 'gold' ? 'GP' : character.dailyIncome.currency === 'silver' ? 'SP' : 'CP'} from ${character.dailyIncome.professionName} (Consumes 1 food)` : 'New Day'}
                  >
                    New Day
                  </button>
                )}
                <button
                  onClick={() => setShowCurrencyModal(true)}
                  className="px-3 py-1 text-sm bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add Currency
                </button>
                <button
                  onClick={handleManualConvertCurrency}
                  className="px-3 py-1 text-sm bg-yellow-700 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  title="Convert currency to higher denominations (100 copper → 1 silver, 100 silver → 1 gold, 100 gold → 1 platinum)"
                >
                  💱 Convert
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'platinum', label: 'PP', color: 'text-gray-300', bgColor: 'bg-gray-600/20' },
                { key: 'gold', label: 'GP', color: 'text-yellow-400', bgColor: 'bg-yellow-600/20' },
                { key: 'silver', label: 'SP', color: 'text-gray-400', bgColor: 'bg-gray-500/20' },
                { key: 'copper', label: 'CP', color: 'text-orange-400', bgColor: 'bg-orange-600/20' },
              ].map(({ key, label, color, bgColor }) => (
                <div key={key} className={`${bgColor} bg-gray-900 rounded-lg px-4 py-3 text-center`}>
                  <div className={`text-2xl sm:text-xl font-bold ${color}`}>
                    {character.currency[key as keyof typeof character.currency]}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
            {character.dailyIncome && (
              <div className="mt-3 p-3 bg-blue-900/20 border border-blue-600/50 rounded-lg">
                <div className="text-sm text-blue-400 font-medium">{character.dailyIncome.professionName}</div>
                <div className="text-xs text-gray-400">
                  Daily Income: {character.dailyIncome.amount} {character.dailyIncome.currency === 'gold' ? 'GP' : character.dailyIncome.currency === 'silver' ? 'SP' : 'CP'}/day
                </div>
              </div>
            )}
          </div>

          {/* Total Carrying Weight */}
          <div className="card bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-orange-600 p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-bold text-orange-400">⚖️ Total Carrying Weight</h3>
                <p className="text-xs text-gray-400 mt-1">Combined weight of all equipped and inventory items</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-300">
                  {character.equipment.reduce((total, item) => {
                    const itemWeight = item.weight || 0
                    const quantity = item.quantity || 1
                    return total + (itemWeight * quantity)
                  }, 0).toFixed(1)} lbs
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {character.materials?.reduce((total, mat) => total + (mat.weight * mat.quantity), 0).toFixed(1) || '0'} lbs from materials
                </div>
              </div>
            </div>
          </div>

          {/* Food & Water Supplies */}
          <div className="card bg-gradient-to-br from-green-900/30 to-teal-900/30 border-2 border-green-600 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">🍖 Food & Water Supplies</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Track your food rations and water supply. Each day consumes 1 unit of food.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Food Rations */}
              <div className="p-4 bg-green-900/40 border-2 border-green-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥖</span>
                    <div>
                      <h4 className="font-bold text-green-300">Food Rations</h4>
                      <p className="text-xs text-gray-400">Days of food remaining</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-200">
                    {character.foodRations}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (character.foodRations > 0) {
                        addFoodRations(-1)
                        saveCharacter()
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors text-sm"
                    disabled={character.foodRations <= 0}
                  >
                    − Remove 1
                  </button>
                  <button
                    onClick={() => {
                      addFoodRations(1)
                      saveCharacter()
                    }}
                    className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    + Add 1
                  </button>
                </div>
              </div>

              {/* Water Supply */}
              <div className="p-4 bg-teal-900/40 border-2 border-teal-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💧</span>
                    <div>
                      <h4 className="font-bold text-teal-300">Water Supply</h4>
                      <p className="text-xs text-gray-400">Days of water remaining</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-teal-200">
                    {character.waterSupply}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (character.waterSupply > 0) {
                        addWaterSupply(-1)
                        saveCharacter()
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors text-sm"
                    disabled={character.waterSupply <= 0}
                  >
                    − Remove 1
                  </button>
                  <button
                    onClick={() => {
                      addWaterSupply(1)
                      saveCharacter()
                    }}
                    className="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    + Add 1
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
              <p className="text-xs sm:text-sm text-green-300">
                <span className="font-bold">💡 Tip:</span> Food rations are automatically consumed when you click "New Day" in the Currency section above!
              </p>
            </div>
          </div>

          {/* Mats (Crafting Materials) */}
          {character.materials && character.materials.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">📦 Mats (Crafting Materials)</h3>
              <div className="space-y-2">
                {character.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{material.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-900/50 text-purple-300 rounded">
                          {material.category}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          material.rarity === 'legendary' ? 'bg-orange-900/50 text-orange-300' :
                          material.rarity === 'epic' ? 'bg-purple-900/50 text-purple-300' :
                          material.rarity === 'rare' ? 'bg-blue-900/50 text-blue-300' :
                          material.rarity === 'uncommon' ? 'bg-green-900/50 text-green-300' :
                          'bg-gray-700/50 text-gray-400'
                        }`}>
                          {material.rarity}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{material.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Quantity: {material.quantity} ({(material.weight * material.quantity).toFixed(1)} lbs)
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          changeMaterialQuantity(material.id, -1)
                          saveCharacter()
                        }}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-colors"
                        title="Decrease quantity"
                        disabled={material.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          changeMaterialQuantity(material.id, 1)
                          saveCharacter()
                        }}
                        className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded transition-colors"
                        title="Increase quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleSellMaterial(material.id)}
                        className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/30 rounded transition-colors"
                        title={`Sell for ${material.category === 'gem' ? material.quantity :
                          material.rarity === 'legendary' ? material.quantity * 50 :
                          material.rarity === 'epic' ? material.quantity * 35 :
                          material.rarity === 'rare' ? material.quantity * 20 :
                          material.rarity === 'uncommon' ? material.quantity * 10 :
                          material.quantity * 5} copper`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipped Weapons */}
          {character.equipment.filter(item => isWeapon(item) && item.equipped === true).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">⚔️ Equipped Weapons</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter((item): item is Weapon => isWeapon(item) && item.equipped === true)
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onRename={(newName) => {
                        renameEquipment(item.id, newName)
                        saveCharacter()
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Unequipped Weapons */}
          {character.equipment.filter(item => isWeapon(item) && item.equipped !== true).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-gray-400 mb-4">⚔️ Unequipped Weapons</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter((item): item is Weapon => isWeapon(item) && item.equipped !== true)
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onRename={(newName) => {
                        renameEquipment(item.id, newName)
                        saveCharacter()
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Equipped Armor & Cloaks */}
          {character.equipment.filter(item => (isArmor(item) || item.category === 'cloak') && item.equipped === true).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">🛡️ Equipped Armor & Cloaks</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter((item) => (isArmor(item) || item.category === 'cloak') && item.equipped === true)
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onRename={(newName) => {
                        renameEquipment(item.id, newName)
                        saveCharacter()
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Unequipped Armor & Cloaks */}
          {character.equipment.filter(item => (isArmor(item) || item.category === 'cloak') && item.equipped !== true).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-gray-400 mb-4">🛡️ Unequipped Armor & Cloaks</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter((item) => (isArmor(item) || item.category === 'cloak') && item.equipped !== true)
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onRename={(newName) => {
                        renameEquipment(item.id, newName)
                        saveCharacter()
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Equipped Shields */}
          {character.equipment.filter(item =>
            item.equipped === true &&
            item.category === 'shield'
          ).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">🛡 Equipped Shields</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter(item =>
                    item.equipped === true &&
                    item.category === 'shield'
                  )
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onRename={(newName) => {
                        renameEquipment(item.id, newName)
                        saveCharacter()
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Unequipped Shields */}
          {character.equipment.filter(item =>
            item.equipped !== true &&
            item.category === 'shield'
          ).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-gray-400 mb-4">🛡 Unequipped Shields</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter(item =>
                    item.equipped !== true &&
                    item.category === 'shield'
                  )
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onRename={(newName) => {
                        renameEquipment(item.id, newName)
                        saveCharacter()
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Jewelry & Trinkets */}
          {character.equipment.filter(item =>
            item.equipped === true &&
            (item.category === 'jewelry' || item.category === 'trinket')
          ).length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">💎 Jewelry & Trinkets</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter(item =>
                    item.equipped === true &&
                    (item.category === 'jewelry' || item.category === 'trinket')
                  )
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Crafting Materials */}
          {character.equipment.filter(item => item.category === 'Crafting Material').length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">🔨 Crafting Materials</h3>
              <div className="space-y-2">
                {character.equipment
                  .filter(item => item.category === 'Crafting Material')
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                      onSell={() => handleSellItem(item.id)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Backpack (Everything Else) */}
          <div className="card bg-gray-800 border-gray-700 p-4">
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <h3 className="text-lg font-bold text-white">🎒 Backpack & Misc Items</h3>
              <button
                onClick={() => {
                  setEditingLootItem({
                    id: 'custom-item',
                    name: 'New Item',
                    description: 'Add item description',
                    value: 0,
                    rarity: 'common',
                    category: 'treasure',
                  })
                  setShowEquipmentEditor(true)
                }}
                className="px-2 py-1.5 sm:px-4 sm:py-2 bg-dnd-gold hover:bg-yellow-600 text-gray-900 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 sm:gap-2"
                title="Add custom item to inventory"
              >
                <span className="text-base sm:text-lg font-bold">+</span>
                Add Item
              </button>
            </div>
            {character.equipment.filter(item =>
              !isWeapon(item) &&
              !isArmor(item) &&
              item.category !== 'shield' &&
              item.category !== 'cloak' &&
              item.category !== 'jewelry' &&
              item.category !== 'Crafting Material' &&
              item.category !== 'consumable' &&
              !item.name.toLowerCase().includes('potion') &&
              !item.name.toLowerCase().includes('scroll') &&
              !item.name.toLowerCase().includes('elixir') &&
              item.id !== 'waterskin' &&
              item.id !== 'rations'
            ).length === 0 ? (
              <p className="text-gray-400 text-center py-4">Backpack is empty.</p>
            ) : (
              <div className="space-y-2">
                {character.equipment
                  .filter(item =>
                    !isWeapon(item) &&
                    !isArmor(item) &&
                    item.category !== 'shield' &&
                    item.category !== 'cloak' &&
                    item.category !== 'jewelry' &&
                    item.category !== 'Crafting Material' &&
                    item.category !== 'consumable' &&
                    !item.name.toLowerCase().includes('potion') &&
                    !item.name.toLowerCase().includes('scroll') &&
                    !item.name.toLowerCase().includes('elixir') &&
                    item.id !== 'waterskin' &&
                    item.id !== 'rations'
                  )
                  .map((item) => (
                    <EquipmentItem
                      key={item.id}
                      item={item}
                      character={character}
                      onRemove={() => {
                        removeEquipment(item.id)
                        saveCharacter()
                      }}
                      onToggleEquip={() => {
                        toggleEquipment(item.id)
                        saveCharacter()
                      }}
                      onChangeQuantity={(change) => {
                        changeEquipmentQuantity(item.id, change)
                        saveCharacter()
                      }}
                      onUse={() => handleUseConsumable(item)}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Currency Modal */}
          {showCurrencyModal && (
            <CurrencyModal
              currency={character.currency}
              onUpdate={(currency) => {
                updateCurrency(currency)
                saveCharacter()
              }}
              onClose={() => setShowCurrencyModal(false)}
            />
          )}

          {/* Daily Income Roller */}
          {showIncomeRoller && (
            <DailyIncomeRoller
              onEarn={(currency) => {
                const newCurrency = { ...character.currency }
                for (const [key, value] of Object.entries(currency)) {
                  newCurrency[key as keyof Currency] += value
                }
                updateCurrency(newCurrency)
                saveCharacter()
              }}
              onSetProfession={(professionName, amount, currency) => {
                setDailyIncome(professionName, amount, currency)
                saveCharacter()
              }}
              onClose={() => setShowIncomeRoller(false)}
            />
          )}
        </div>
      )}

      {activeTab === 'features' && (
        <div className="space-y-6">
          {/* Racial Traits */}
          {character.race?.traits && character.race.traits.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4 text-left">Racial Traits</h3>
              <div className="space-y-3 text-left">
                {character.race.traits.map((trait) => (
                  <QuickRefTooltip key={trait.id} type="trait" id={trait.id}>
                    <div className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer transition-all text-left">
                      <div className="font-medium text-dnd-gold hover:text-yellow-400 text-left">{trait.name}</div>
                      <div className="text-sm text-gray-400 mt-1 text-left">{trait.description}</div>
                    </div>
                  </QuickRefTooltip>
                ))}
              </div>
            </div>
          )}

          {/* Class Features */}
          {character.class?.features && character.class.features.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Class Features</h3>
              <div className="space-y-3">
                {character.class.features
                  .filter((f) => f.level <= character.level)
                  .map((feature) => (
                    <QuickRefTooltip key={feature.id} type="trait" id={feature.id}>
                      <div className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer transition-all">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-dnd-gold hover:text-yellow-400">{feature.name}</span>
                          <span className="text-xs text-gray-500">Level {feature.level}</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{feature.description}</div>
                      </div>
                    </QuickRefTooltip>
                  ))}
              </div>
            </div>
          )}

          {/* Background Feature */}
          {character.background?.feature && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Background Feature</h3>
              <div className="p-3 bg-gray-900 rounded-lg">
                <div className="font-medium text-dnd-gold">{character.background.feature.name}</div>
                <div className="text-sm text-gray-400 mt-1">{character.background.feature.description}</div>
              </div>
            </div>
          )}

          {/* Backstory */}
          {character.backstory && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Backstory</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{character.backstory}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="card bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-dnd-gold p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-dnd-gold mb-2">⚔️ Actions - What Can I Do?</h2>
            <p className="text-sm sm:text-base text-gray-300">
              All your available actions, attacks, spells, and consumables in one place. Perfect for quick reference during combat!
            </p>
          </div>

          {/* Rest System */}
          <div className="card bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-purple-600 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-3 sm:mb-4">😴 Rest & Recovery</h3>

            {/* Rest Notification */}
            {restNotification && (
              <div className={`mb-4 p-3 sm:p-4 rounded-lg border-2 animate-pulse ${
                restNotification.type === 'short' ? 'bg-blue-900/30 border-blue-600 text-blue-200' :
                restNotification.type === 'trance' ? 'bg-cyan-900/30 border-cyan-600 text-cyan-200' :
                'bg-green-900/30 border-green-600 text-green-200'
              }`}>
                <p className="text-sm sm:text-base font-medium">{restNotification.message}</p>
              </div>
            )}

            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Restore your health, spell slots, and class resources by resting.
            </p>

            {/* Rest Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Short Rest */}
              <button
                onClick={handleShortRest}
                className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 border-2 border-blue-400 rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="text-3xl sm:text-4xl mb-2">🛌</div>
                <div className="font-bold text-base sm:text-lg text-white mb-1">Short Rest</div>
                <div className="text-xs sm:text-sm text-blue-100">
                  ~1 hour. Restores short rest abilities and half of long rest resources.
                </div>
              </button>

              {/* Long Rest */}
              <button
                onClick={handleLongRest}
                className="p-4 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border-2 border-green-400 rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="text-3xl sm:text-4xl mb-2">😴</div>
                <div className="font-bold text-base sm:text-lg text-white mb-1">Long Rest</div>
                <div className="text-xs sm:text-sm text-green-100">
                  8 hours. Fully restores HP, spells, and all resources. Adds daily income.
                </div>
              </button>

              {/* Trance (Elf Only) */}
              {character.race?.id === 'elf' || character.race?.id === 'drow' ? (
                <button
                  onClick={handleTrance}
                  className="p-4 bg-gradient-to-br from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 border-2 border-cyan-400 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  <div className="text-3xl sm:text-4xl mb-2">🧘</div>
                  <div className="font-bold text-base sm:text-lg text-white mb-1">Trance</div>
                  <div className="text-xs sm:text-sm text-cyan-100">
                    4 hours (Elf/Drow). Counts as a long rest. Fully restores everything.
                  </div>
                </button>
              ) : (
                <div className="p-4 bg-gray-800/50 border-2 border-gray-700 rounded-lg opacity-50">
                  <div className="text-3xl sm:text-4xl mb-2">🧘</div>
                  <div className="font-bold text-base sm:text-lg text-gray-400 mb-1">Trance</div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Only available for Elves and Drow
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resource Pools */}
          {character.resourcePools.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">💎 Resource Pools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {character.resourcePools.map((pool) => (
                  <div key={pool.id} className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-cyan-400 text-sm sm:text-base">{pool.name}</h4>
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        {pool.current} / {pool.maximum}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2">
                      Restores on: <span className="text-blue-400 font-medium">{pool.rechargeOn === 'shortRest' ? 'Short Rest' : 'Long Rest'}</span>
                    </p>

                    {/* Visual bar */}
                    <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${(pool.current / pool.maximum) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-cyan-900/20 border border-cyan-700/30 rounded-lg">
                <p className="text-xs sm:text-sm text-cyan-300">
                  <span className="font-bold">💡 Tip:</span> Resources automatically restore when you rest above!
                </p>
              </div>
            </div>
          )}

          {/* Racial Abilities */}
          {character.race?.spells && character.race.spells.length > 0 && (
            <div className="card bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-2 border-emerald-600 p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-3 sm:mb-4">
                🧬 Racial Abilities - {character.race.name}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 mb-4">
                Innate magical abilities from your racial heritage. These abilities unlock as you level up.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {character.race.spells.map((racialSpell) => {
                  const isUnlocked = character.level >= racialSpell.levelGained
                  const abilityMod = Math.floor(
                    (character.abilityScores[racialSpell.castingAbility] - 10) / 2
                  )

                  return (
                    <div
                      key={racialSpell.spellId}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? 'bg-emerald-900/40 border-emerald-500 hover:border-emerald-400'
                          : 'bg-gray-800/50 border-gray-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <QuickRefTooltip type="spell" id={racialSpell.spellId}>
                          <h4 className={`font-bold text-base sm:text-lg cursor-pointer hover:text-emerald-200 ${
                            isUnlocked ? 'text-emerald-300' : 'text-gray-500'
                          }`}>
                            {racialSpell.spellName}
                          </h4>
                        </QuickRefTooltip>
                        {!isUnlocked && (
                          <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-400 rounded">
                            Lv {racialSpell.levelGained}
                          </span>
                        )}
                      </div>

                      {isUnlocked ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Casting Ability:</span>
                            <span className="text-white font-medium capitalize">
                              {racialSpell.castingAbility.slice(0, 3).toUpperCase()} ({abilityMod >= 0 ? '+' : ''}{abilityMod})
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Uses:</span>
                            <span className="text-emerald-300 font-bold">
                              {racialSpell.usesPerDay === 'atwill' ? 'At Will' : `${racialSpell.usesPerDay}/day`}
                            </span>
                          </div>

                          <div className="mt-3 pt-3 border-t border-emerald-700/30">
                            <p className="text-xs text-emerald-200">
                              <span className="font-bold">Unlocked at Level {racialSpell.levelGained}</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          <p>🔒 Unlocks at character level {racialSpell.levelGained}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-lg">
                <p className="text-xs sm:text-sm text-emerald-300">
                  <span className="font-bold">💡 Tip:</span> Racial abilities are innate to your heritage and don't require preparation or spell slots!
                </p>
              </div>
            </div>
          )}

          {/* Spells */}
          {character.knownSpells && character.knownSpells.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">✨ Spells</h3>

              {/* Spell Slots Summary */}
              {character.class?.spellcasting !== 'none' && (
                <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-2">Spell Slots</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(character.spellSlots).map(([level, slots]) => {
                      if (slots.max === 0) return null
                      return (
                        <div key={level} className="px-3 py-2 bg-purple-900/30 rounded border border-purple-500/50">
                          <span className="text-purple-300 font-bold">
                            {level === '1' ? '1st' : level === '2' ? '2nd' : level === '3' ? '3rd' : `${level}th`}:
                          </span>{' '}
                          <span className="text-white">{slots.current}/{slots.max}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Group spells by level */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((spellLevel) => {
                const spellsOfLevel = character.knownSpells.filter(s => s.level === spellLevel)
                if (spellsOfLevel.length === 0) return null

                return (
                  <div key={spellLevel} className="mb-6">
                    <h4 className="text-lg font-bold text-purple-400 mb-3">
                      {spellLevel === 0 ? 'Cantrips' :
                       spellLevel === 1 ? '1st Level Spells' :
                       spellLevel === 2 ? '2nd Level Spells' :
                       spellLevel === 3 ? '3rd Level Spells' :
                       `${spellLevel}th Level Spells`}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {spellsOfLevel.map((spell) => {
                        const isPrepared = character.preparedSpells.includes(spell.id)
                        const spellcastingAbility = character.class?.spellcastingAbility || 'intelligence'

                        return (
                          <div
                            key={spell.id}
                            className={`p-4 bg-gray-900 rounded-lg border relative ${
                              isPrepared ? 'border-purple-500' : 'border-gray-700'
                            }`}
                          >
                            {/* Roll buttons in top right */}
                            {(spell.attackRoll || spell.damage || spell.healing) && (
                              <div className="absolute top-2 right-2 flex gap-1">
                                {spell.attackRoll && (
                                  <button
                                    onClick={() => handleRollSpellAttack(spell.id, spellcastingAbility)}
                                    className="w-7 h-7 bg-green-700 hover:bg-green-600 text-white rounded font-bold text-xs flex items-center justify-center transition-colors"
                                    title="Roll spell attack (1d20 + spellcasting modifier + proficiency)"
                                  >
                                    H
                                  </button>
                                )}
                                {spell.damage && (
                                  <button
                                    onClick={() => handleRollSpellDamage(spell.id, spell.damage?.dice || '1d8')}
                                    className="w-7 h-7 bg-red-700 hover:bg-red-600 text-white rounded text-xs flex items-center justify-center transition-colors"
                                    title={`Roll damage (${spell.damage?.dice || '1d8'})`}
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M10 2L2 6v4c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4zm0 2.18l6 3v3.82c0 4.52-3.12 8.75-7 9.86V4.18z"/>
                                      <circle cx="10" cy="10" r="2"/>
                                    </svg>
                                  </button>
                                )}
                                {spell.healing && (
                                  <button
                                    onClick={() => handleRollSpellHealing(spell.id, spell.healing?.dice || '1d8')}
                                    className="w-7 h-7 bg-green-600 hover:bg-green-500 text-white rounded text-xs flex items-center justify-center transition-colors"
                                    title={`Roll healing (${spell.healing?.dice || '1d8'})`}
                                  >
                                    ❤️
                                  </button>
                                )}
                              </div>
                            )}

                            <div className="flex items-start justify-between mb-2 pr-16">
                              <div className="flex-1">
                                <QuickRefTooltip type="spell" id={spell.id}>
                                  <h5 className="font-bold text-white hover:text-purple-300 cursor-pointer">
                                    {spell.name}
                                  </h5>
                                </QuickRefTooltip>
                                <p className="text-xs text-gray-400">{spell.school}</p>
                              </div>
                              {isPrepared && (
                                <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs rounded">
                                  Prepared
                                </span>
                              )}
                            </div>

                            <div className="space-y-1 text-sm">
                              {spell.attackRoll && (
                                <div className="flex items-center gap-2">
                                  <span className="text-green-400 font-bold">Attack:</span>
                                  <span className="text-white">+{
                                    Math.floor((character.abilityScores[spellcastingAbility as keyof typeof character.abilityScores] - 10) / 2) +
                                    calculateProficiencyBonus(character.level)
                                  } to hit</span>
                                  {spellRolls[spell.id]?.hit !== undefined && (
                                    <span className="ml-2 px-2 py-0.5 bg-green-600 text-white rounded font-bold animate-pulse">
                                      {spellRolls[spell.id].hit}
                                    </span>
                                  )}
                                </div>
                              )}
                              {spell.damage && (
                                <div className="flex items-center gap-2">
                                  <span className="text-red-400 font-bold">Damage:</span>
                                  <span className="text-white">{spell.damage.dice} {spell.damage.type}</span>
                                  {spellRolls[spell.id]?.damage !== undefined && (
                                    <span className="ml-2 px-2 py-0.5 bg-red-600 text-white rounded font-bold animate-pulse">
                                      {spellRolls[spell.id].damage}
                                    </span>
                                  )}
                                </div>
                              )}
                              {spell.healing && (
                                <div className="flex items-center gap-2">
                                  <span className="text-green-400 font-bold">Healing:</span>
                                  <span className="text-white">{spell.healing.dice} HP</span>
                                  {spellRolls[spell.id]?.healing !== undefined && (
                                    <span className="ml-2 px-2 py-0.5 bg-green-600 text-white rounded font-bold animate-pulse">
                                      ❤️ {spellRolls[spell.id].healing} HP
                                    </span>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-blue-400">⏱</span>
                                <span>{spell.castingTime.amount} {spell.castingTime.unit}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-400">📏</span>
                                <span>
                                  Range: {spell.range.type === 'ranged' ? `${spell.range.distance} ft` : spell.range.type}
                                </span>
                              </div>
                              {spell.concentration && (
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 text-xs rounded">
                                    Concentration
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                              {spell.description}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {character.class?.spellcasting !== 'none' && (
                <div className="mt-4 p-3 bg-purple-900/20 border border-purple-700/30 rounded-lg">
                  <p className="text-sm text-purple-300">
                    <span className="font-bold">💡 Tip:</span> Click spell names for full details!
                    {(character.class?.id === 'cleric' || character.class?.id === 'druid' ||
                      character.class?.id === 'paladin' || character.class?.id === 'wizard') &&
                      ' Remember to prepare your spells each day.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Weapon Attacks */}
          <div className="card bg-gray-800 border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">🗡️ Weapon Attacks</h3>
            {character.equipment.filter(item => isWeapon(item) && item.equipped === true).length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {character.equipment
                  .filter((item): item is Weapon => isWeapon(item) && item.equipped === true)
                  .map((weapon) => {
                    const attackBonus = weapon.properties?.includes('finesse')
                      ? Math.max(
                          calculateModifier(character.abilityScores.strength),
                          calculateModifier(character.abilityScores.dexterity)
                        ) + calculateProficiencyBonus(character.level)
                      : calculateModifier(character.abilityScores.strength) + calculateProficiencyBonus(character.level)

                    return (
                      <div key={weapon.id} className="p-4 bg-gray-900 border border-gray-700 rounded-lg relative">
                        {/* Roll buttons in top right */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            onClick={() => handleRollToHit(weapon.id, attackBonus)}
                            className="w-7 h-7 bg-green-700 hover:bg-green-600 text-white rounded font-bold text-xs flex items-center justify-center transition-colors"
                            title="Roll to hit (1d20 + attack bonus)"
                          >
                            H
                          </button>
                          <button
                            onClick={() => handleRollDamage(weapon.id, weapon.damage.dice)}
                            className="w-7 h-7 bg-red-700 hover:bg-red-600 text-white rounded text-xs flex items-center justify-center transition-colors"
                            title={`Roll damage (${weapon.damage.dice})`}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2L2 6v4c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4zm0 2.18l6 3v3.82c0 4.52-3.12 8.75-7 9.86V4.18z"/>
                              <circle cx="10" cy="10" r="2"/>
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-start justify-between mb-2 pr-16">
                          <div>
                            <h4 className="font-bold text-white">{weapon.name}</h4>
                            <p className="text-sm text-gray-400">{weapon.weaponType}</p>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-green-400 font-bold">Attack:</span>
                            <span className="text-white">+{attackBonus} to hit</span>
                            {weaponRolls[weapon.id]?.hit !== undefined && (
                              <span className="ml-2 px-2 py-0.5 bg-green-600 text-white rounded font-bold animate-pulse">
                                {weaponRolls[weapon.id].hit}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">Damage:</span>
                            <span className="text-white">{weapon.damage.dice} {weapon.damage.type}</span>
                            {weaponRolls[weapon.id]?.damage !== undefined && (
                              <span className="ml-2 px-2 py-0.5 bg-red-600 text-white rounded font-bold animate-pulse">
                                {weaponRolls[weapon.id].damage}
                              </span>
                            )}
                          </div>
                          {weapon.properties && weapon.properties.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400 font-bold">Properties:</span>
                              <span className="text-gray-300 text-xs">{weapon.properties.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-gray-500 italic">No weapons equipped</p>
            )}
          </div>

          {/* Consumables (Potions, Scrolls, etc.) */}
          <div className="card bg-gray-800 border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">🧪 Consumables & Items</h3>

            {/* Notification */}
            {showConsumableNotification && (
              <div className={`mb-4 p-3 rounded-lg ${
                showConsumableNotification.type === 'success'
                  ? 'bg-green-900/30 border border-green-700 text-green-300'
                  : 'bg-blue-900/30 border border-blue-700 text-blue-300'
              }`}>
                {showConsumableNotification.message}
              </div>
            )}

            {character.equipment.filter(item =>
              item.category === 'consumable' ||
              item.name.toLowerCase().includes('potion') ||
              item.name.toLowerCase().includes('scroll') ||
              item.name.toLowerCase().includes('elixir')
            ).length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {character.equipment
                  .filter(item =>
                    item.category === 'consumable' ||
                    item.name.toLowerCase().includes('potion') ||
                    item.name.toLowerCase().includes('scroll') ||
                    item.name.toLowerCase().includes('elixir')
                  )
                  .map((item) => {
                    const healingAmount = parseHealingAmount(item.description)
                    return (
                      <div key={item.id} className="p-4 bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-700 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-green-400">{item.name}</h4>
                            {item.quantity && item.quantity > 1 && (
                              <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                            )}
                            {healingAmount && (
                              <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 mt-1">
                                <span>❤️ Heals: {healingAmount}</span>
                                {lastHealingRoll?.itemId === item.id && (
                                  <span className="px-2 py-0.5 bg-emerald-600 text-white rounded font-bold animate-pulse">
                                    {lastHealingRoll.amount} HP
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                        {item.charges && (
                          <div className="text-xs text-blue-300 mb-3">
                            Magical: {item.charges.spellName}
                          </div>
                        )}
                        <button
                          onClick={() => handleUsePotion(item.id)}
                          className="w-full px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
                        >
                          Use
                        </button>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-gray-500 italic">No consumables in inventory</p>
            )}
          </div>

          {/* Special Abilities & Features */}
          {(character.featureCharges.length > 0 || character.itemFeatures.length > 0) && (
            <div className="card bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-yellow-600 p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4">⚡ Class Abilities & Features</h3>

              {/* Ability Notification */}
              {abilityNotification && (
                <div className="mb-4 p-3 sm:p-4 rounded-lg border-2 bg-green-900/30 border-green-600 text-green-200 animate-pulse">
                  <p className="text-sm sm:text-base font-medium">{abilityNotification.message}</p>
                </div>
              )}

              <p className="text-sm sm:text-base text-gray-300 mb-4">
                Limited-use abilities that recharge during rests. Click "Use" to activate!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Class Features with Charges */}
                {character.featureCharges.map((feature) => {
                  // Get full feature info from class
                  const classFeature = character.class?.features.find(f => f.id === feature.id)
                  const isUsable = feature.current > 0

                  return (
                    <div
                      key={feature.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUsable
                          ? 'bg-yellow-900/40 border-yellow-500 hover:border-yellow-400'
                          : 'bg-gray-800/50 border-gray-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <QuickRefTooltip type="trait" id={feature.id}>
                          <h4 className="font-bold text-base sm:text-lg text-yellow-400 cursor-pointer hover:text-yellow-300">
                            {feature.name}
                          </h4>
                        </QuickRefTooltip>
                        <div className={`text-xl sm:text-2xl font-bold ${
                          isUsable ? 'text-yellow-300' : 'text-gray-500'
                        }`}>
                          {feature.current}/{feature.maximum}
                        </div>
                      </div>

                      {classFeature && (
                        <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2">
                          {classFeature.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-yellow-700/30">
                        <span className="text-xs text-gray-400">
                          {feature.rechargeOn === 'shortRest' ? '🛌 Short Rest' : '😴 Long Rest'}
                        </span>

                        <button
                          onClick={() => handleUseAbility(feature.id, feature.name)}
                          disabled={!isUsable}
                          className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                            isUsable
                              ? 'bg-yellow-600 hover:bg-yellow-500 text-white transform hover:scale-105 active:scale-95'
                              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isUsable ? 'Use' : 'No Charges'}
                        </button>
                      </div>
                    </div>
                  )
                })}

                {/* Item Features */}
                {character.itemFeatures.map((feature) => (
                  <div key={feature.id} className="p-4 bg-cyan-900/40 border-2 border-cyan-700 rounded-lg hover:border-cyan-600 transition-all">
                    <h4 className="font-bold text-base sm:text-lg text-cyan-400 mb-2">{feature.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-300">{feature.description}</p>
                    <div className="mt-2 text-xs text-cyan-300">
                      ✨ From magical item
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-300">
                  <span className="font-bold">💡 Tip:</span> Use rest buttons above to restore your ability charges!
                </p>
              </div>
            </div>
          )}

          {/* Skill Checks - d20 Rolls */}
          <div className="card bg-gray-800 border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">🎲 Skill Checks (d20)</h3>
            <p className="text-gray-400 mb-6">
              When the DM asks you to make a skill check, roll a d20 and add the bonus shown below.
              <span className="text-dnd-gold font-bold"> Proficient</span> skills get extra bonuses!
            </p>

            {/* Skills grouped by ability */}
            <div className="space-y-6">
              {/* Strength Skills */}
              <div>
                <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                  <span>💪 Strength</span>
                  <span className="text-sm font-normal text-gray-400">
                    (Modifier: {calculateModifier(character.abilityScores.strength) >= 0 ? '+' : ''}{calculateModifier(character.abilityScores.strength)})
                  </span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Athletics */}
                  {(() => {
                    const modifier = calculateModifier(character.abilityScores.strength)
                    const profBonus = character.skills.athletics !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills.athletics === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    return (
                      <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id="athletics">
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">Athletics</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (STR)
                          {character.skills.athletics === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills.athletics === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Dexterity Skills */}
              <div>
                <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span>🤸 Dexterity</span>
                  <span className="text-sm font-normal text-gray-400">
                    (Modifier: {calculateModifier(character.abilityScores.dexterity) >= 0 ? '+' : ''}{calculateModifier(character.abilityScores.dexterity)})
                  </span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Acrobatics */}
                  {(() => {
                    const modifier = calculateModifier(character.abilityScores.dexterity)
                    const profBonus = character.skills.acrobatics !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills.acrobatics === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    return (
                      <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id="acrobatics">
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">Acrobatics</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (DEX)
                          {character.skills.acrobatics === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills.acrobatics === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })()}
                  {/* Sleight of Hand */}
                  {(() => {
                    const modifier = calculateModifier(character.abilityScores.dexterity)
                    const profBonus = character.skills.sleightOfHand !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills.sleightOfHand === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    return (
                      <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id="sleight-of-hand">
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">Sleight of Hand</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (DEX)
                          {character.skills.sleightOfHand === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills.sleightOfHand === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })()}
                  {/* Stealth */}
                  {(() => {
                    const modifier = calculateModifier(character.abilityScores.dexterity)
                    const profBonus = character.skills.stealth !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills.stealth === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    return (
                      <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id="stealth">
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">Stealth</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (DEX)
                          {character.skills.stealth === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills.stealth === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Intelligence Skills */}
              <div>
                <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <span>🧠 Intelligence</span>
                  <span className="text-sm font-normal text-gray-400">
                    (Modifier: {calculateModifier(character.abilityScores.intelligence) >= 0 ? '+' : ''}{calculateModifier(character.abilityScores.intelligence)})
                  </span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['arcana', 'history', 'investigation', 'nature', 'religion'].map((skillKey) => {
                    const skill = skillKey as keyof typeof character.skills
                    const modifier = calculateModifier(character.abilityScores.intelligence)
                    const profBonus = character.skills[skill] !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills[skill] === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    const displayName = skillKey === 'sleightOfHand' ? 'Sleight of Hand' :
                                       skillKey === 'animalHandling' ? 'Animal Handling' :
                                       skillKey.charAt(0).toUpperCase() + skillKey.slice(1)
                    return (
                      <div key={skill} className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id={skillKey === 'sleightOfHand' ? 'sleight-of-hand' : skillKey === 'animalHandling' ? 'animal-handling' : skillKey}>
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">{displayName}</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (INT)
                          {character.skills[skill] === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills[skill] === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Wisdom Skills */}
              <div>
                <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <span>🦉 Wisdom</span>
                  <span className="text-sm font-normal text-gray-400">
                    (Modifier: {calculateModifier(character.abilityScores.wisdom) >= 0 ? '+' : ''}{calculateModifier(character.abilityScores.wisdom)})
                  </span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['animalHandling', 'insight', 'medicine', 'perception', 'survival'].map((skillKey) => {
                    const skill = skillKey as keyof typeof character.skills
                    const modifier = calculateModifier(character.abilityScores.wisdom)
                    const profBonus = character.skills[skill] !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills[skill] === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    const displayName = skillKey === 'animalHandling' ? 'Animal Handling' :
                                       skillKey.charAt(0).toUpperCase() + skillKey.slice(1)
                    return (
                      <div key={skill} className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id={skillKey === 'animalHandling' ? 'animal-handling' : skillKey}>
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">{displayName}</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (WIS)
                          {character.skills[skill] === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills[skill] === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Charisma Skills */}
              <div>
                <h4 className="text-lg font-bold text-pink-400 mb-3 flex items-center gap-2">
                  <span>✨ Charisma</span>
                  <span className="text-sm font-normal text-gray-400">
                    (Modifier: {calculateModifier(character.abilityScores.charisma) >= 0 ? '+' : ''}{calculateModifier(character.abilityScores.charisma)})
                  </span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['deception', 'intimidation', 'performance', 'persuasion'].map((skillKey) => {
                    const skill = skillKey as keyof typeof character.skills
                    const modifier = calculateModifier(character.abilityScores.charisma)
                    const profBonus = character.skills[skill] !== 'none' ? calculateProficiencyBonus(character.level) : 0
                    const expertiseBonus = character.skills[skill] === 'expertise' ? calculateProficiencyBonus(character.level) : 0
                    const total = modifier + profBonus + expertiseBonus
                    const displayName = skillKey.charAt(0).toUpperCase() + skillKey.slice(1)
                    return (
                      <div key={skill} className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <QuickRefTooltip type="skill" id={skillKey}>
                            <span className="font-bold text-white hover:text-blue-300 cursor-pointer">{displayName}</span>
                          </QuickRefTooltip>
                          <span className="text-2xl font-bold text-green-400">{total >= 0 ? '+' : ''}{total}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {modifier >= 0 ? '+' : ''}{modifier} (CHA)
                          {character.skills[skill] === 'proficient' && ` + ${profBonus} (Proficient)`}
                          {character.skills[skill] === 'expertise' && ` + ${profBonus + expertiseBonus} (Expertise)`}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">📚 How to Use Skill Checks</h4>
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  <strong>1. DM asks for a check:</strong> "Make a Perception check to spot the trap."
                </p>
                <p>
                  <strong>2. Roll d20 and add your bonus:</strong> If you rolled 15 and your Perception is +3, your total is 18.
                </p>
                <p>
                  <strong>3. Tell the DM your total:</strong> The DM compares it to a target number (DC) to see if you succeed.
                </p>
                <p className="text-dnd-gold font-bold mt-3">
                  💡 Higher bonuses mean you're better at that skill! Click skill names to learn what each one does.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="card bg-blue-900/20 border border-blue-700 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-blue-400 mb-1">Quick Tip for New Players</h4>
                <p className="text-sm text-gray-300">
                  On your turn, you can: <strong>Move</strong> up to your speed, take one <strong>Action</strong> (attack, cast a spell, use an item),
                  and sometimes a <strong>Bonus Action</strong> (if you have abilities that use it). Click the dice button to roll for attacks!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'story' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="card bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-dnd-gold p-6">
            <h2 className="text-3xl font-bold text-dnd-gold mb-2">📖 Character Story & Lore</h2>
            <p className="text-gray-300">
              Write your character's backstory, personality traits, goals, relationships, and any important events or notes.
            </p>
          </div>

          {/* Story Editor */}
          <div className="card bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Character Story</h3>
              <button
                onClick={() => {
                  updateCharacterDetails({ backstory: character.backstory })
                  saveCharacter()
                  setShowConsumableNotification({
                    message: 'Story saved successfully',
                    type: 'success'
                  })
                  setTimeout(() => setShowConsumableNotification(null), 3000)
                }}
                className="px-4 py-2 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                💾 Save Story
              </button>
            </div>
            <textarea
              value={character.backstory || ''}
              onChange={(e) => updateCharacterDetails({ backstory: e.target.value })}
              className="w-full h-96 p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-dnd-gold resize-none"
              placeholder="Write your character's story here...&#10;&#10;Include:&#10;• Backstory - Where did they come from?&#10;• Personality - What are they like?&#10;• Goals - What do they want to achieve?&#10;• Relationships - Family, friends, rivals, enemies&#10;• Important Events - Key moments in their life&#10;• Notes - Anything else important to remember"
            />
            <p className="text-sm text-gray-500 mt-2">
              This is a free-form text area. Press Ctrl+Enter (or Cmd+Enter on Mac) to add line breaks.
            </p>
          </div>

          {/* Quick Reference Guide */}
          <div className="card bg-blue-900/20 border-blue-600/50 p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">📝 Story Writing Guide</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-white mb-1">Backstory</h4>
                  <p className="text-gray-400">Where were they born? What was their childhood like? What events shaped who they are?</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Personality</h4>
                  <p className="text-gray-400">Are they brave or cautious? Kind or cynical? Serious or humorous?</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Goals & Motivations</h4>
                  <p className="text-gray-400">What drives them? What do they want to achieve? Why are they adventuring?</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-white mb-1">Relationships</h4>
                  <p className="text-gray-400">Who matters to them? Family, friends, mentors, rivals, or enemies?</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Important Events</h4>
                  <p className="text-gray-400">What major moments have happened in their life or during the campaign?</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Campaign Notes</h4>
                  <p className="text-gray-400">Track quest details, important NPCs met, or secrets discovered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'loot' && (
        <LootCache
          character={character}
          onAddToInventory={handleAddLootToInventory}
        />
      )}

      {/* Floating Dice Button */}
      <DiceRollerButton onClick={() => setShowDiceRoller(true)} />
      <DiceRollerModal isOpen={showDiceRoller} onClose={() => setShowDiceRoller(false)} character={character} />

      {/* Edit Character Modal */}
      <CharacterEditModal
        character={character}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveDetails}
      />

      {/* DM Ability Score Editor Modal */}
      <DMAbilityScoreEditor
        character={character}
        isOpen={showDMAbilityEditor}
        onClose={() => setShowDMAbilityEditor(false)}
        onSave={handleUpdateAbilityScores}
      />

      {/* HP Editor Modal */}
      {showHPEditor && (
        <HPEditor
          character={character}
          onUpdateHP={handleUpdateHP}
          onClose={() => setShowHPEditor(false)}
        />
      )}

      {/* Level Up Spell Selector */}
      {showSpellSelector && levelingUpTo && (
        <LevelUpSpellSelector
          character={character}
          newLevel={levelingUpTo}
          onAddSpells={handleAddLevelUpSpells}
          onClose={() => {
            setShowSpellSelector(false)
            setLevelingUpTo(null)
            saveCharacter()
          }}
        />
      )}

      {/* Ninth Level Spell Selector */}
      {showNinthLevelSpellSelector && (
        <NinthLevelSpellSelector
          onSelectSpell={handleSelectNinthLevelSpell}
          onClose={() => setShowNinthLevelSpellSelector(false)}
        />
      )}

      {/* Equipment Editor */}
      {showEquipmentEditor && editingLootItem && (
        <EquipmentEditor
          lootItem={editingLootItem}
          onSave={handleSaveEquipment}
          onCancel={() => {
            setShowEquipmentEditor(false)
            setEditingLootItem(null)
          }}
        />
      )}

      {/* Class Change Modal */}
      {showClassChangeModal && (
        <ClassChangeModal
          onSelectClass={handleClassChange}
          onClose={() => {
            setShowClassChangeModal(false)
            setConsumableItemToRemove(null)
          }}
        />
      )}

      {/* Spell Scroll Modal */}
      {showSpellScrollModal && spellScrollLevel !== null && (
        <SpellScrollModal
          level={spellScrollLevel}
          onSelectSpell={handleSpellScrollUse}
          onClose={() => {
            setShowSpellScrollModal(false)
            setSpellScrollLevel(null)
            setConsumableItemToRemove(null)
          }}
        />
      )}

      {/* Sell Confirmation Modal */}
      {sellConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border-2 border-yellow-600 rounded-xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6">
              <h2 className="text-2xl font-bold text-white">💰 Confirm Sale</h2>
            </div>

            <div className="p-6">
              <p className="text-lg text-gray-300 mb-4">
                Do you really want to sell <span className="font-bold text-white">"{sellConfirmation.itemName}"</span>?
              </p>

              <div className="p-4 bg-yellow-900/20 border-2 border-yellow-600 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">You will receive:</div>
                  <div className="text-3xl font-bold text-yellow-300">
                    {sellConfirmation.value} {
                      sellConfirmation.currencyType === 'cp' ? 'Copper' :
                      sellConfirmation.currencyType === 'sp' ? 'Silver' :
                      sellConfirmation.currencyType === 'gp' ? 'Gold' :
                      'Platinum'
                    }
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({sellConfirmation.currencyType.toUpperCase()})
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSellConfirmation(null)}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sellConfirmation.onConfirm}
                  className="flex-1 px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium transition-colors"
                >
                  Sell Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Spell Adder Modal */}
      {showManualSpellAdd && (
        <ManualSpellAdderModal
          onSelectSpell={(spell) => {
            addSpell(spell)
            saveCharacter()
            setShowManualSpellAdd(false)
            setShowConsumableNotification({
              message: `Learned spell: ${spell.name}`,
              type: 'success'
            })
            setTimeout(() => setShowConsumableNotification(null), 3000)
          }}
          onClose={() => setShowManualSpellAdd(false)}
        />
      )}

      {/* Class Spell Selector Modal */}
      {showClassSpellSelector && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg border-2 border-dnd-gold max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-dnd-gold">Choose Class Spells</h2>
                  <p className="text-gray-400 mt-1">
                    Select spells from your {character.class?.name || 'class'} spell list
                  </p>
                </div>
                <button
                  onClick={() => setShowClassSpellSelector(false)}
                  className="text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <SpellSelector
                characterClass={character.class}
                subclass={character.subclass}
                level={character.level}
                isCharacterCreation={false}
                onSubmit={(cantrips, spells) => {
                  // Add all selected spells
                  cantrips.forEach((spell) => addSpell(spell))
                  spells.forEach((spell) => addSpell(spell))
                  saveCharacter()
                  setShowClassSpellSelector(false)
                  setShowConsumableNotification({
                    message: `Added ${cantrips.length + spells.length} spell(s)`,
                    type: 'success'
                  })
                  setTimeout(() => setShowConsumableNotification(null), 3000)
                }}
                onBack={() => setShowClassSpellSelector(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Alignment Selector Modal */}
      {showAlignmentSelector && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg border-2 border-dnd-gold max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-dnd-gold">
                    {character.alignment ? 'Change Alignment' : 'Choose Alignment'}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Select your character's moral and ethical outlook
                  </p>
                </div>
                <button
                  onClick={() => setShowAlignmentSelector(false)}
                  className="text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <AlignmentSelector
                initialAlignment={character.alignment}
                onSelect={(alignment) => {
                  setAlignment(alignment)
                  saveCharacter()
                  setShowAlignmentSelector(false)
                  setShowConsumableNotification({
                    message: `Alignment ${character.alignment ? 'changed' : 'set'} to ${alignment.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
                    type: 'success'
                  })
                  setTimeout(() => setShowConsumableNotification(null), 3000)
                }}
                onBack={() => setShowAlignmentSelector(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Consumable Notification */}
      {showConsumableNotification && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className={`px-6 py-3 rounded-lg shadow-lg border-2 ${
            showConsumableNotification.type === 'success'
              ? 'bg-green-900/90 border-green-500 text-green-100'
              : 'bg-blue-900/90 border-blue-500 text-blue-100'
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{showConsumableNotification.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Trash icon component
function TrashIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded transition-colors"
      title="Remove item"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}

// Equip toggle button component
function EquipToggle({ equipped, onToggle, canEquip = true }: { equipped: boolean; onToggle: () => void; canEquip?: boolean }) {
  if (!canEquip) return null
  return (
    <button
      onClick={onToggle}
      className={`p-1.5 rounded transition-colors ${
        equipped
          ? 'text-green-400 bg-green-900/30 hover:bg-green-900/50'
          : 'text-gray-500 hover:text-green-400 hover:bg-green-900/30'
      }`}
      title={equipped ? 'Unequip' : 'Equip'}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {equipped ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        )}
      </svg>
    </button>
  )
}


// Equipment item component
function EquipmentItem({ item, character, onRemove, onToggleEquip, onChangeQuantity, onUse, onSell, onRename }: { item: Equipment; character: Character; onRemove: () => void; onToggleEquip: () => void; onChangeQuantity: (change: number) => void; onUse: () => void; onSell?: () => void; onRename?: (newName: string) => void }) {
  const getAbilityMod = (ability: Ability): number => {
    return calculateModifier(character.abilityScores[ability])
  }
  const profBonus = calculateProficiencyBonus(character.level)
  const canEquip = true // All items can be equipped
  const isEquipped = item.equipped

  if (isWeapon(item)) {
    const weapon = item as Weapon
    const isFinesse = weapon.properties.includes('finesse')
    const attackMod = isFinesse
      ? Math.max(getAbilityMod('strength'), getAbilityMod('dexterity'))
      : weapon.weaponCategory === 'ranged'
      ? getAbilityMod('dexterity')
      : getAbilityMod('strength')
    const attackBonus = attackMod + profBonus

    return (
      <div className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between group gap-3 ${
        isEquipped ? 'bg-green-900/30 border border-green-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-white hover:text-dnd-gold">
                {weapon.name}
              </span>
              {onRename && (
                <button
                  onClick={() => {
                    const newName = prompt('Enter new name for weapon:', weapon.name)
                    if (newName && newName.trim()) {
                      onRename(newName.trim())
                    }
                  }}
                  className="text-gray-500 hover:text-dnd-gold transition-colors p-0.5"
                  title="Rename weapon"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
              {isEquipped && <span className="text-xs text-green-400 bg-green-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            {weapon.quantity > 1 && (
              <span className="text-gray-500 ml-1">x{weapon.quantity}</span>
            )}
            <div className="text-sm text-gray-400">
              {weapon.damage.dice} {weapon.damage.type}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-dnd-gold font-medium">
              +{attackBonus} to hit
            </div>
            <div className="text-xs text-gray-500">{weapon.weight} lb</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onChangeQuantity(-1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Decrease quantity"
            >
              −
            </button>
            <button
              onClick={() => onChangeQuantity(1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Increase quantity"
            >
              +
            </button>
          </div>
          <TrashIcon onClick={onRemove} />
        </div>
      </div>
    )
  }

  if (isArmor(item)) {
    return (
      <div className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between group gap-3 ${
        isEquipped ? 'bg-blue-900/30 border border-blue-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-white">{item.name}</span>
              {onRename && (
                <button
                  onClick={() => {
                    const newName = prompt('Enter new name for armor:', item.name)
                    if (newName && newName.trim()) {
                      onRename(newName.trim())
                    }
                  }}
                  className="text-gray-500 hover:text-dnd-gold transition-colors p-0.5"
                  title="Rename armor"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
              {isEquipped && <span className="text-xs text-blue-400 bg-blue-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            <div className="text-sm text-gray-400">
              AC {item.baseAC} | {item.armorType}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-500">{item.weight} lb</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onChangeQuantity(-1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Decrease quantity"
            >
              −
            </button>
            <button
              onClick={() => onChangeQuantity(1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Increase quantity"
            >
              +
            </button>
          </div>
          <TrashIcon onClick={onRemove} />
        </div>
      </div>
    )
  }

  if (isShield(item)) {
    return (
      <div className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between group gap-3 ${
        isEquipped ? 'bg-purple-900/30 border border-purple-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-white">{item.name}</span>
              {isEquipped && <span className="text-xs text-purple-400 bg-purple-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            <div className="text-sm text-gray-400">
              +{item.acBonus} AC
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-500">{item.weight} lb</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onChangeQuantity(-1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Decrease quantity"
            >
              −
            </button>
            <button
              onClick={() => onChangeQuantity(1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Increase quantity"
            >
              +
            </button>
          </div>
          <TrashIcon onClick={onRemove} />
        </div>
      </div>
    )
  }

  if (isCloak(item)) {
    return (
      <div className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between group gap-3 ${
        isEquipped ? 'bg-indigo-900/30 border border-indigo-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-white">{item.name}</span>
              {isEquipped && <span className="text-xs text-indigo-400 bg-indigo-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            {item.description && (
              <div className="text-sm text-gray-400 break-words">{item.description}</div>
            )}
            {item.acBonus && (
              <div className="text-sm text-gray-400">
                +{item.acBonus} AC
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-500">{item.weight} lb</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onChangeQuantity(-1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Decrease quantity"
            >
              −
            </button>
            <button
              onClick={() => onChangeQuantity(1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
              title="Increase quantity"
            >
              +
            </button>
          </div>
          <TrashIcon onClick={onRemove} />
        </div>
      </div>
    )
  }

  // Generic equipment (trinkets, treasures, adventuring gear, etc.)
  const isConsumable = item.category === 'consumable' || item.category === 'treasure' ||
                       item.name.toLowerCase().includes('spell scroll') ||
                       item.id === 'tome-class-change' ||
                       item.name.toLowerCase().includes('hoard') ||
                       item.name.toLowerCase().includes('fortune')

  return (
    <div className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between group gap-3 ${
      isEquipped ? 'bg-yellow-900/30 border border-yellow-600/50' : 'bg-gray-900'
    }`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-white">{item.name}</span>
            {isEquipped && <span className="text-xs text-yellow-400 bg-yellow-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            {isConsumable && <span className="text-xs text-green-400 bg-green-900/50 px-1.5 py-0.5 rounded">Consumable</span>}
          </div>
          {item.quantity > 1 && (
            <span className="text-gray-500 ml-1">x{item.quantity}</span>
          )}
          <div className="text-sm text-gray-400 break-words">{item.description}</div>
          <div className="text-xs text-gray-500 mt-1 capitalize">{item.category.replace(/([A-Z])/g, ' $1').trim()}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-between sm:justify-end flex-shrink-0">
        <div className="text-right">
          <div className="text-xs text-gray-500">{item.weight} lb</div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeQuantity(-1)}
            className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
            title="Decrease quantity"
          >
            −
          </button>
          <button
            onClick={() => onChangeQuantity(1)}
            className="w-6 h-6 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-bold transition-colors"
            title="Increase quantity"
          >
            +
          </button>
        </div>
        {isConsumable && (
          <button
            onClick={onUse}
            className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded transition-colors"
            title="Use consumable"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}
        {item.category === 'Crafting Material' && onSell && (
          <button
            onClick={onSell}
            className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/30 rounded transition-colors"
            title="Sell item for currency"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
        <TrashIcon onClick={onRemove} />
      </div>
    </div>
  )
}

// Currency Modal
function CurrencyModal({
  currency,
  onUpdate,
  onClose,
}: {
  currency: Currency
  onUpdate: (currency: Partial<Currency>) => void
  onClose: () => void
}) {
  const [values, setValues] = useState({
    platinum: 0,
    gold: 0,
    silver: 0,
    copper: 0,
  })
  const [mode, setMode] = useState<'add' | 'subtract'>('add')

  const handleSubmit = () => {
    const updates: Partial<Currency> = {}
    for (const [key, value] of Object.entries(values)) {
      if (value !== 0) {
        const currencyKey = key as keyof Currency
        if (mode === 'add') {
          updates[currencyKey] = currency[currencyKey] + value
        } else {
          updates[currencyKey] = Math.max(0, currency[currencyKey] - value)
        }
      }
    }
    if (Object.keys(updates).length > 0) {
      onUpdate(updates)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Manage Currency</h3>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('add')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'add'
                ? 'bg-green-700 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setMode('subtract')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'subtract'
                ? 'bg-red-700 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Subtract
          </button>
        </div>

        {/* Currency Inputs */}
        <div className="space-y-3">
          {[
            { key: 'platinum', label: 'Platinum (PP)', color: 'text-gray-300' },
            { key: 'gold', label: 'Gold (GP)', color: 'text-yellow-400' },
            { key: 'silver', label: 'Silver (SP)', color: 'text-gray-400' },
            { key: 'copper', label: 'Copper (CP)', color: 'text-orange-400' },
          ].map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-3">
              <label className={`w-32 ${color} font-medium`}>{label}</label>
              <span className="text-gray-500 w-16 text-right">
                ({currency[key as keyof Currency]})
              </span>
              <input
                type="number"
                min="0"
                value={values[key as keyof typeof values]}
                onChange={(e) => setValues({ ...values, [key]: parseInt(e.target.value) || 0 })}
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-dnd-gold"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'add'
                ? 'bg-green-700 text-white hover:bg-green-600'
                : 'bg-red-700 text-white hover:bg-red-600'
            }`}
          >
            {mode === 'add' ? 'Add' : 'Subtract'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Daily Income Roller
function DailyIncomeRoller({
  onEarn,
  onSetProfession,
  onClose,
}: {
  onEarn: (currency: Partial<Currency>) => void
  onSetProfession: (professionName: string, amount: number, currency: 'copper' | 'silver' | 'gold') => void
  onClose: () => void
}) {
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null)
  const [rollResult, setRollResult] = useState<number | null>(null)
  const [earnedAmount, setEarnedAmount] = useState<{ amount: number; currency: string } | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const handleRandomProfession = () => {
    setIsRolling(true)
    setEarnedAmount(null)

    // Animate the roll
    let count = 0
    const interval = setInterval(() => {
      const roll = Math.floor(Math.random() * 100) + 1
      setRollResult(roll)
      count++
      if (count >= 15) {
        clearInterval(interval)
        const finalRoll = Math.floor(Math.random() * 100) + 1
        setRollResult(finalRoll)
        const profession = getProfessionByRoll(finalRoll)
        setSelectedProfession(profession)
        setIsRolling(false)
      }
    }, 50)
  }

  const handleCollectIncome = () => {
    if (!selectedProfession) return

    const { amount, currency } = selectedProfession.dailyIncome
    setEarnedAmount({ amount, currency })

    // Save profession permanently
    onSetProfession(selectedProfession.name, amount, currency)

    // Convert to currency object
    const earned: Partial<Currency> = {}
    if (currency === 'gold') earned.gold = amount
    else if (currency === 'silver') earned.silver = amount
    else if (currency === 'copper') earned.copper = amount

    onEarn(earned)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-dnd-gold mb-4">Daily Income Roller</h3>
        <p className="text-gray-400 text-sm mb-4">
          Roll d100 once to determine your daily profession and earnings.
        </p>

        {/* Roll Section */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Roll for Profession</span>
            <button
              onClick={handleRandomProfession}
              disabled={isRolling || selectedProfession !== null}
              className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRolling ? 'Rolling...' : selectedProfession ? 'Already Rolled' : 'Roll d100'}
            </button>
          </div>
          {rollResult !== null && (
            <div className="text-center">
              <div className="text-4xl font-bold text-dnd-gold mb-2">{rollResult}</div>
              {selectedProfession && !isRolling && (
                <div className="text-white">
                  <span className={CATEGORY_INFO[selectedProfession.category].color}>
                    {selectedProfession.name}
                  </span>
                  <span className="text-gray-400 ml-2">
                    ({formatIncome(selectedProfession.dailyIncome)}/day)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Profession Details */}
        {selectedProfession && (
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className={`text-lg font-bold ${CATEGORY_INFO[selectedProfession.category].color}`}>
                {selectedProfession.name}
              </h4>
              <span className="text-dnd-gold font-bold">
                {formatIncome(selectedProfession.dailyIncome)}/day
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{selectedProfession.description}</p>
            <div className="text-sm">
              <span className="text-gray-500">Lifestyle: </span>
              <span className={CATEGORY_INFO[selectedProfession.category].color}>
                {CATEGORY_INFO[selectedProfession.category].name}
              </span>
            </div>
          </div>
        )}

        {/* Earned Amount Display */}
        {earnedAmount && (
          <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-4 text-center">
            <p className="text-green-400 font-medium">
              Collected {earnedAmount.amount} {earnedAmount.currency === 'gold' ? 'GP' : earnedAmount.currency === 'silver' ? 'SP' : 'CP'}!
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          {selectedProfession && !earnedAmount && (
            <button
              onClick={handleCollectIncome}
              className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Collect {formatIncome(selectedProfession.dailyIncome)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Class Change Modal
function ClassChangeModal({
  onSelectClass,
  onClose,
}: {
  onSelectClass: (classData: Class) => void
  onClose: () => void
}) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // All available classes
  const allClasses = [
    FIGHTER,
    WARLOCK,
    ROGUE,
    WIZARD,
    CLERIC,
    BARBARIAN,
    BARD,
    DRUID,
    MONK,
    PALADIN,
    RANGER,
    SORCERER,
  ]

  const handleClassSelect = (classData: Class) => {
    setSelectedClass(classData)
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    if (selectedClass) {
      onSelectClass(selectedClass)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-900 border-2 border-dnd-gold rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
          <h2 className="text-3xl font-bold text-white">Tome of Reincarnation</h2>
          <p className="text-orange-100 mt-2">
            Choose your new class. Warning: This will reset you to level 1 and remove all current spells and class features!
          </p>
        </div>

        {/* Content */}
        {!showConfirmation ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allClasses.map((classData) => (
                <button
                  key={classData.id}
                  onClick={() => handleClassSelect(classData)}
                  className="p-4 bg-gray-800 border-2 border-gray-700 hover:border-dnd-gold rounded-lg text-left transition-all"
                >
                  <div className="font-bold text-dnd-gold text-lg mb-2">{classData.name}</div>
                  <div className="text-sm text-gray-400 mb-2">{classData.description}</div>
                  <div className="text-xs text-gray-500">
                    Hit Die: {classData.hitDie} | Primary: {classData.primaryAbility.join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto bg-gray-800 border-2 border-orange-500 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Confirm Reincarnation</h3>
              <p className="text-white mb-4">
                You are about to reincarnate as a <span className="font-bold text-dnd-gold">{selectedClass?.name}</span>.
              </p>
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-red-400 mb-2">Warning:</h4>
                <ul className="text-sm text-red-300 space-y-1 list-disc list-inside">
                  <li>Your character will be reset to level 1</li>
                  <li>All current spells will be removed</li>
                  <li>All class features will be removed</li>
                  <li>Hit points will be recalculated for the new class</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-bold"
                >
                  Confirm Reincarnation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Manual Spell Adder Modal - for adding spells from shops or other sources
function ManualSpellAdderModal({
  onSelectSpell,
  onClose,
}: {
  onSelectSpell: (spell: Spell) => void
  onClose: () => void
}) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null)

  // Get all available spells for the selected level
  const availableSpells = selectedLevel !== null
    ? Object.values(SPELLS as Record<string, any>)
        .filter((spell: any) => spell.level === selectedLevel)
        .map((spell: any) => ({
          id: spell.id,
          name: spell.name,
          description: spell.description,
          level: spell.level === 'cantrip' ? 0 : spell.level,
          school: spell.school.toLowerCase(),
          castingTime: {
            amount: 1,
            unit: 'action' as const,
          },
          range: {
            type: 'ranged' as const,
            distance: 60,
          },
          components: {
            verbal: spell.components.includes('V'),
            somatic: spell.components.includes('S'),
            material: spell.components.includes('M'),
          },
          duration: {
            type: 'instantaneous' as const,
          },
          ritual: false,
          classes: spell.classes,
        } as Spell))
    : []

  const handleConfirm = () => {
    if (selectedSpell) {
      onSelectSpell(selectedSpell)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-900 border-2 border-purple-600 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white">Add Spell</h2>
          <p className="text-purple-100 mt-2">
            Select a spell level, then choose a spell to add to your character
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedLevel === null ? (
            // Level Selection
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className="p-4 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-purple-500 hover:bg-gray-750 transition-all text-center"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {level === 0 ? 'C' : level}
                  </div>
                  <div className="text-xs text-gray-400">
                    {level === 0 ? 'Cantrips' : `Level ${level}`}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Spell Selection
            <>
              <button
                onClick={() => {
                  setSelectedLevel(null)
                  setSelectedSpell(null)
                }}
                className="mb-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                ← Back to Level Selection
              </button>
              <div className="grid md:grid-cols-2 gap-3">
                {availableSpells.map((spell) => {
                  const isSelected = selectedSpell?.id === spell.id
                  return (
                    <button
                      key={spell.id}
                      onClick={() => setSelectedSpell(spell)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-white">{spell.name}</div>
                        <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded capitalize">
                          {spell.school}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">{spell.description}</div>
                      {spell.classes && (
                        <div className="text-xs text-gray-500 mt-2">
                          Classes: {spell.classes.join(', ')}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          {selectedSpell && (
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
            >
              Add Spell
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Spell Scroll Modal
function SpellScrollModal({
  level,
  onSelectSpell,
  onClose,
}: {
  level: number
  onSelectSpell: (spell: Spell) => void
  onClose: () => void
}) {
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null)

  // Get all available spells from quickReference
  const availableSpells = Object.values(SPELLS as Record<string, any>)
    .filter((spell: any) => spell.level === level)
    .map((spell: any) => ({
      id: spell.id,
      name: spell.name,
      description: spell.description,
      level: spell.level === 'cantrip' ? 0 : spell.level,
      school: spell.school.toLowerCase(),
      castingTime: {
        amount: 1,
        unit: 'action' as const,
      },
      range: {
        type: 'ranged' as const,
        distance: 60,
      },
      components: {
        verbal: spell.components.includes('V'),
        somatic: spell.components.includes('S'),
        material: spell.components.includes('M'),
      },
      duration: {
        type: 'instantaneous' as const,
      },
      ritual: false,
      classes: spell.classes,
    } as Spell))

  const handleSpellSelect = (spell: Spell) => {
    setSelectedSpell(spell)
  }

  const handleConfirm = () => {
    if (selectedSpell) {
      onSelectSpell(selectedSpell)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-900 border-2 border-purple-600 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white">Spell Scroll - Level {level}</h2>
          <p className="text-purple-100 mt-2">
            Choose a spell to learn from this scroll. The scroll will be consumed.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-3">
            {availableSpells.map((spell) => {
              const isSelected = selectedSpell?.id === spell.id
              return (
                <button
                  key={spell.id}
                  onClick={() => handleSpellSelect(spell)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-white">{spell.name}</div>
                    <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded capitalize">
                      {spell.school}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{spell.description}</div>
                  {spell.classes && (
                    <div className="text-xs text-gray-500 mt-2">
                      Classes: {spell.classes.join(', ')}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedSpell}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Learn Spell
          </button>
        </div>
      </div>
    </div>
  )
}
