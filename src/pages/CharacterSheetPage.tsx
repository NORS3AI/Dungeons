import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { DiceRoller, DiceRollerButton, DiceRollerModal } from '../components/DiceRoller'
import { calculateModifier, calculateProficiencyBonus } from '../types/dice'
import { isWeapon, isArmor, isShield, isCloak, autoConvertCurrency } from '../types/equipment'
import type { Character, Ability, Equipment, Weapon, Armor, Shield, Cloak, Currency, Class } from '../types'
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
import { FightingStanceSelector } from '../components/FightingStanceSelector'
import { LootCache } from '../components/LootCache'
import { HPEditor, HPEditorButton } from '../components/HPEditor'
import { LevelUpSpellSelector } from '../components/LevelUpSpellSelector'
import { NinthLevelSpellSelector } from '../components/NinthLevelSpellSelector'
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
  const { characters, loadCharacter, currentCharacter, levelUp, levelDown, updateCurrency, setDailyIncome, updateCharacterDetails, removeEquipment, toggleEquipment, changeEquipmentQuantity, setFightingStance, addEquipment, updateHitPoints, addSpell, removeSpell, useItemCharge, saveCharacter } = useCharacterStore()
  const [showDiceRoller, setShowDiceRoller] = useState(false)
  const [activeTab, setActiveTab] = useState<'main' | 'spells' | 'inventory' | 'features' | 'loot'>('main')
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

  useEffect(() => {
    if (id) {
      const char = characters.find((c) => c.id === id)
      if (char) {
        loadCharacter(id)
      }
    }
  }, [id, characters, loadCharacter])

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

  const handleUpdateHP = (hp: Partial<Character['hitPoints']>) => {
    updateHitPoints(hp)
    saveCharacter()
  }

  const handleLevelUp = () => {
    const newLevel = character.level + 1

    // Level up the character
    levelUp()

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
    { id: 'spells', label: 'Spells' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'features', label: 'Features' },
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Ability Scores */}
          <div className="space-y-6">
            {/* Ability Scores */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Ability Scores</h3>
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
              <div className="text-xs text-gray-500 uppercase mb-1">Proficiency Bonus</div>
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
                  <div className="text-xs text-gray-500 uppercase mb-1">AC</div>
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
                  <div className="text-xs text-gray-500 uppercase mb-1">Speed</div>
                  <div className="text-2xl font-bold text-white">
                    {character.race?.speed || 30} ft
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-xs text-gray-500 uppercase mb-1">Initiative</div>
                  <div className="text-xl font-bold text-white">
                    {formatMod(getAbilityMod('dexterity'))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-xs text-gray-500 uppercase mb-1">Hit Die</div>
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
                    <span className="text-gray-500">Vision</span>
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
                    <span className="text-gray-500">Languages</span>
                    <span className="text-gray-300">{character.race.languages.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dice Roller */}
            <DiceRoller />
          </div>
        </div>
      )}

      {activeTab === 'spells' && (
        <div className="space-y-6">
          {/* Add Spell Button */}
          <div className="flex justify-end">
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
          {/* Equipped Gear Section */}
          <EquippedGearSection
            equipment={character.equipment}
            character={character}
            onToggleEquip={(itemId) => {
              toggleEquipment(itemId)
              saveCharacter()
            }}
            onUseCharge={(itemId) => {
              useItemCharge(itemId)
              saveCharacter()
            }}
            calculateAC={calculateAC}
          />

          {/* Currency */}
          <div className="card bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Currency</h3>
              <div className="flex gap-2">
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

                      const earned: Partial<Currency> = {}
                      if (character.dailyIncome.currency === 'gold') earned.gold = character.dailyIncome.amount
                      else if (character.dailyIncome.currency === 'silver') earned.silver = character.dailyIncome.amount
                      else if (character.dailyIncome.currency === 'copper') earned.copper = character.dailyIncome.amount

                      const newCurrency = { ...character.currency }
                      for (const [key, value] of Object.entries(earned)) {
                        newCurrency[key as keyof Currency] += value
                      }
                      updateCurrency(newCurrency)
                      saveCharacter()
                    }}
                    className="px-3 py-1 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title={character.dailyIncome ? `Collect ${character.dailyIncome.amount} ${character.dailyIncome.currency === 'gold' ? 'GP' : character.dailyIncome.currency === 'silver' ? 'SP' : 'CP'} from ${character.dailyIncome.professionName}` : 'New Day'}
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
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'platinum', label: 'PP', color: 'text-gray-300', bgColor: 'bg-gray-600/20' },
                { key: 'gold', label: 'GP', color: 'text-yellow-400', bgColor: 'bg-yellow-600/20' },
                { key: 'silver', label: 'SP', color: 'text-gray-400', bgColor: 'bg-gray-500/20' },
                { key: 'copper', label: 'CP', color: 'text-orange-400', bgColor: 'bg-orange-600/20' },
              ].map(({ key, label, color, bgColor }) => (
                <div key={key} className={`${bgColor} bg-gray-900 rounded-lg px-4 py-2 text-center min-w-[80px]`}>
                  <div className={`text-xl font-bold ${color}`}>
                    {character.currency[key as keyof typeof character.currency]}
                  </div>
                  <div className="text-xs text-gray-500">{label}</div>
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

          {/* All Equipment (Inventory) */}
          <div className="card bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Inventory</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Equip all items
                    character.equipment.forEach((item) => {
                      if (!item.equipped) {
                        toggleEquipment(item.id)
                      }
                    })
                    saveCharacter()
                  }}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  title="Equip all items in inventory"
                >
                  ⚔️ Equip All
                </button>
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
                  className="px-4 py-2 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
                  title="Add custom item to inventory"
                >
                  <span className="text-lg font-bold">+</span>
                  Add Item
                </button>
              </div>
            </div>
            {character.equipment.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No equipment.</p>
            ) : (
              <div className="space-y-2">
                {character.equipment.map((item) => (
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

// Equipped Gear Section
function EquippedGearSection({
  equipment,
  character,
  onToggleEquip,
  onUseCharge,
  calculateAC,
}: {
  equipment: Equipment[]
  character: Character
  onToggleEquip: (itemId: string) => void
  onUseCharge: (itemId: string) => void
  calculateAC: () => number
}) {
  const equippedWeapons = equipment.filter((e) => isWeapon(e) && e.equipped) as Weapon[]
  const equippedArmor = equipment.find((e) => isArmor(e) && e.equipped) as Armor | undefined
  const equippedShield = equipment.find((e) => isShield(e) && e.equipped) as Shield | undefined
  const equippedCloak = equipment.find((e) => isCloak(e) && e.equipped) as Cloak | undefined
  const equippedGeneric = equipment.filter((e) => !isWeapon(e) && !isArmor(e) && !isShield(e) && !isCloak(e) && e.equipped)

  const getAbilityMod = (ability: Ability): number => {
    return calculateModifier(character.abilityScores[ability])
  }
  const profBonus = calculateProficiencyBonus(character.level)

  const getConditionDamageBonus = (): number => {
    let bonus = 0
    if (character.conditions.includes('enraged')) {
      bonus += 1
    }
    return bonus
  }

  const hasEquippedGear = equippedWeapons.length > 0 || equippedArmor || equippedShield || equippedCloak || equippedGeneric.length > 0

  return (
    <div className="card bg-gray-800 border-gray-700 p-4 border-l-4 border-l-dnd-gold">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-dnd-gold">Equipped Gear</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Total AC:</span>
          <span className="text-xl font-bold text-white bg-gray-900 px-3 py-1 rounded-lg">{calculateAC()}</span>
        </div>
      </div>

      {!hasEquippedGear ? (
        <p className="text-gray-400 text-center py-4">No gear equipped. Equip items from your inventory below.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Equipped Weapons */}
          {equippedWeapons.map((weapon) => {
            const isFinesse = weapon.properties.includes('finesse')
            const attackMod = isFinesse
              ? Math.max(getAbilityMod('strength'), getAbilityMod('dexterity'))
              : weapon.weaponCategory === 'ranged'
              ? getAbilityMod('dexterity')
              : getAbilityMod('strength')
            const attackBonus = attackMod + profBonus
            const conditionDamageBonus = getConditionDamageBonus()
            const damageMod = attackMod
            const totalDamageMod = damageMod + conditionDamageBonus

            return (
              <div key={weapon.id} className="p-3 bg-green-900/20 rounded-lg border border-green-600/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-green-400 uppercase font-medium">
                    {weapon.charges ? '✨ Magical Weapon' : 'Weapon'}
                  </span>
                  <button
                    onClick={() => onToggleEquip(weapon.id)}
                    className="text-xs text-gray-400 hover:text-red-400"
                  >
                    Unequip
                  </button>
                </div>
                <div className="font-semibold text-white">{weapon.name}</div>
                <div className="text-sm text-gray-300">
                  <span className="text-dnd-gold">+{attackBonus}</span> to hit |{' '}
                  <span className="text-red-400">{weapon.damage.dice}{totalDamageMod >= 0 ? '+' : ''}{totalDamageMod}</span> {weapon.damage.type}
                  {conditionDamageBonus > 0 && (
                    <span className="text-orange-400 ml-1">(+{conditionDamageBonus} enraged)</span>
                  )}
                </div>
                {weapon.charges && (
                  <div className="mt-2 p-2 bg-purple-900/30 border border-purple-600/50 rounded">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium text-purple-300">{weapon.charges.spellName}</div>
                        <div className="text-xs text-purple-400">
                          {weapon.charges.damageDice} {weapon.charges.damageType} damage
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-300">
                          {weapon.charges.currentCharges}/{weapon.charges.maxCharges}
                        </div>
                        <div className="text-xs text-purple-400">charges</div>
                      </div>
                    </div>
                    {weapon.charges.currentCharges > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onUseCharge(weapon.id)
                        }}
                        className="mt-2 w-full px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-all"
                      >
                        Use 1 Charge
                      </button>
                    )}
                    {weapon.charges.rechargeRate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Recharges: {weapon.charges.rechargeRate}
                      </div>
                    )}
                  </div>
                )}
                {weapon.properties.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {weapon.properties.join(', ')}
                  </div>
                )}
              </div>
            )
          })}

          {/* Equipped Armor */}
          {equippedArmor && (
            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-600/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-blue-400 uppercase font-medium">Armor</span>
                <button
                  onClick={() => onToggleEquip(equippedArmor.id)}
                  className="text-xs text-gray-400 hover:text-red-400"
                >
                  Unequip
                </button>
              </div>
              <div className="font-semibold text-white">{equippedArmor.name}</div>
              <div className="text-sm text-gray-300">
                Base AC: <span className="text-blue-400">{equippedArmor.baseAC}</span>
                {equippedArmor.maxDexBonus !== undefined && (
                  <span className="text-gray-500"> (+DEX max {equippedArmor.maxDexBonus})</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1 capitalize">{equippedArmor.armorType} armor</div>
            </div>
          )}

          {/* Equipped Shield */}
          {equippedShield && (
            <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-600/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-purple-400 uppercase font-medium">Shield</span>
                <button
                  onClick={() => onToggleEquip(equippedShield.id)}
                  className="text-xs text-gray-400 hover:text-red-400"
                >
                  Unequip
                </button>
              </div>
              <div className="font-semibold text-white">{equippedShield.name}</div>
              <div className="text-sm text-gray-300">
                AC Bonus: <span className="text-purple-400">+{equippedShield.acBonus}</span>
              </div>
            </div>
          )}

          {/* Equipped Cloak */}
          {equippedCloak && (
            <div className="p-3 bg-indigo-900/20 rounded-lg border border-indigo-600/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-indigo-400 uppercase font-medium">✨ Cloak</span>
                <button
                  onClick={() => onToggleEquip(equippedCloak.id)}
                  className="text-xs text-gray-400 hover:text-red-400"
                >
                  Unequip
                </button>
              </div>
              <div className="font-semibold text-white">{equippedCloak.name}</div>
              {equippedCloak.description && (
                <div className="text-sm text-gray-300 mt-1">{equippedCloak.description}</div>
              )}
              {equippedCloak.acBonus !== undefined && equippedCloak.acBonus > 0 && (
                <div className="text-sm text-gray-300 mt-1">
                  AC Bonus: <span className="text-indigo-400">+{equippedCloak.acBonus}</span>
                </div>
              )}
              {equippedCloak.magicalEffect && (
                <div className="text-sm text-indigo-300 mt-2 italic">
                  {equippedCloak.magicalEffect}
                </div>
              )}
              {equippedCloak.charges && (
                <div className="mt-2 p-2 bg-purple-900/30 border border-purple-600/50 rounded">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-purple-300">{equippedCloak.charges.spellName}</div>
                      <div className="text-xs text-purple-400">
                        {equippedCloak.charges.damageDice} {equippedCloak.charges.damageType} damage
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-300">
                        {equippedCloak.charges.currentCharges}/{equippedCloak.charges.maxCharges}
                      </div>
                      <div className="text-xs text-purple-400">Charges</div>
                    </div>
                  </div>
                  {equippedCloak.charges.currentCharges > 0 && (
                    <button
                      onClick={() => onUseCharge(equippedCloak.id)}
                      className="w-full mt-2 px-2 py-1 bg-purple-700 hover:bg-purple-600 text-white text-xs rounded transition-colors"
                    >
                      Use 1 Charge
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Equipped Generic Items */}
          {equippedGeneric.map((item) => (
            <div key={item.id} className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-yellow-400 uppercase font-medium capitalize">
                  {item.charges ? '✨ Magical ' : ''}{item.category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => onToggleEquip(item.id)}
                  className="text-xs text-gray-400 hover:text-red-400"
                >
                  Unequip
                </button>
              </div>
              <div className="font-semibold text-white">{item.name}</div>
              {item.description && (
                <div className="text-sm text-gray-300 mt-1">{item.description}</div>
              )}
              {item.charges && (
                <div className="mt-2 p-2 bg-purple-900/30 border border-purple-600/50 rounded">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-purple-300">{item.charges.spellName}</div>
                      <div className="text-xs text-purple-400">
                        {item.charges.damageDice} {item.charges.damageType} damage
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-300">
                        {item.charges.currentCharges}/{item.charges.maxCharges}
                      </div>
                      <div className="text-xs text-purple-400">charges</div>
                    </div>
                  </div>
                  {item.charges.currentCharges > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onUseCharge(item.id)
                      }}
                      className="mt-2 w-full px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-all"
                    >
                      Use 1 Charge
                    </button>
                  )}
                  {item.charges.rechargeRate && (
                    <div className="text-xs text-gray-500 mt-1">
                      Recharges: {item.charges.rechargeRate}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Equipment item component
function EquipmentItem({ item, character, onRemove, onToggleEquip, onChangeQuantity, onUse }: { item: Equipment; character: Character; onRemove: () => void; onToggleEquip: () => void; onChangeQuantity: (change: number) => void; onUse: () => void }) {
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
      <div className={`p-3 rounded-lg flex items-center justify-between group ${
        isEquipped ? 'bg-green-900/30 border border-green-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white hover:text-dnd-gold">
                {weapon.name}
              </span>
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
        <div className="flex items-center gap-3">
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
      <div className={`p-3 rounded-lg flex items-center justify-between group ${
        isEquipped ? 'bg-blue-900/30 border border-blue-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{item.name}</span>
              {isEquipped && <span className="text-xs text-blue-400 bg-blue-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            <div className="text-sm text-gray-400">
              AC {item.baseAC} | {item.armorType}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
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
      <div className={`p-3 rounded-lg flex items-center justify-between group ${
        isEquipped ? 'bg-purple-900/30 border border-purple-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{item.name}</span>
              {isEquipped && <span className="text-xs text-purple-400 bg-purple-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            <div className="text-sm text-gray-400">
              +{item.acBonus} AC
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
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
      <div className={`p-3 rounded-lg flex items-center justify-between group ${
        isEquipped ? 'bg-indigo-900/30 border border-indigo-600/50' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-3">
          <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{item.name}</span>
              {isEquipped && <span className="text-xs text-indigo-400 bg-indigo-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            </div>
            {item.description && (
              <div className="text-sm text-gray-400">{item.description}</div>
            )}
            {item.acBonus && (
              <div className="text-sm text-gray-400">
                +{item.acBonus} AC
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
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
    <div className={`p-3 rounded-lg flex items-center justify-between group ${
      isEquipped ? 'bg-yellow-900/30 border border-yellow-600/50' : 'bg-gray-900'
    }`}>
      <div className="flex items-center gap-3">
        <EquipToggle equipped={!!isEquipped} onToggle={onToggleEquip} canEquip={canEquip} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{item.name}</span>
            {isEquipped && <span className="text-xs text-yellow-400 bg-yellow-900/50 px-1.5 py-0.5 rounded">Equipped</span>}
            {isConsumable && <span className="text-xs text-green-400 bg-green-900/50 px-1.5 py-0.5 rounded">Consumable</span>}
          </div>
          {item.quantity > 1 && (
            <span className="text-gray-500 ml-1">x{item.quantity}</span>
          )}
          <div className="text-sm text-gray-400">{item.description}</div>
          <div className="text-xs text-gray-500 mt-1 capitalize">{item.category.replace(/([A-Z])/g, ' $1').trim()}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
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
