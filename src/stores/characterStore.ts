import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type {
  Character,
  AbilityScores,
  Race,
  Class,
  Subclass,
  Background,
  Alignment,
  Equipment,
  Currency,
  Material,
  Spell,
  Condition,
  FightingStance,
  ClassFeature,
} from '../types'
import { DEFAULT_ABILITY_SCORES, EMPTY_CURRENCY, autoConvertCurrency } from '../types'

/**
 * Character creation step
 */
export type CreationStep =
  | 'details'
  | 'race'
  | 'class'
  | 'background'
  | 'alignment'
  | 'stats'
  | 'spells'
  | 'equipment'
  | 'review'

/**
 * Create a new empty character
 */
function createEmptyCharacter(): Character {
  return {
    id: crypto.randomUUID(),
    name: '',
    playerName: '',
    age: '',
    height: '',
    weight: '',
    backstory: '',
    level: 1,
    experiencePoints: 0,
    race: null,
    class: null,
    subclass: null,
    background: null,
    alignment: null,
    abilityScores: { ...DEFAULT_ABILITY_SCORES },
    skills: {
      athletics: 'none',
      acrobatics: 'none',
      sleightOfHand: 'none',
      stealth: 'none',
      arcana: 'none',
      history: 'none',
      investigation: 'none',
      nature: 'none',
      religion: 'none',
      animalHandling: 'none',
      insight: 'none',
      medicine: 'none',
      perception: 'none',
      survival: 'none',
      deception: 'none',
      intimidation: 'none',
      performance: 'none',
      persuasion: 'none',
    },
    savingThrows: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    },
    languages: ['Common'],
    hitPoints: { current: 0, maximum: 0, temporary: 0 },
    armorClass: 10,
    initiative: 0,
    speed: 30,
    deathSaves: { successes: 0, failures: 0 },
    conditions: [],
    featureCharges: [],
    itemFeatures: [],
    spellSlots: {
      level1: { used: 0, max: 0 },
      level2: { used: 0, max: 0 },
      level3: { used: 0, max: 0 },
      level4: { used: 0, max: 0 },
      level5: { used: 0, max: 0 },
      level6: { used: 0, max: 0 },
      level7: { used: 0, max: 0 },
      level8: { used: 0, max: 0 },
      level9: { used: 0, max: 0 },
    },
    knownSpells: [],
    preparedSpells: [],
    equipment: [],
    currency: { ...EMPTY_CURRENCY },
    materials: [],
    carryingCapacity: {
      current: 0,
      maximum: 150, // Will be updated when STR is set
    },
    foodRations: 0,
    waterSupply: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Maximum number of history states to keep (prevents memory leak)
 */
const MAX_HISTORY_SIZE = 50

/**
 * Undo/Redo state history
 */
interface HistoryState {
  past: Character[]
  future: Character[]
}

/**
 * Add a state to history with size limit
 */
function addToHistory(history: HistoryState, state: Character): HistoryState {
  const newPast = [...history.past, state]
  // Keep only the last MAX_HISTORY_SIZE states
  const trimmedPast = newPast.length > MAX_HISTORY_SIZE
    ? newPast.slice(-MAX_HISTORY_SIZE)
    : newPast

  return {
    past: trimmedPast,
    future: [],
  }
}

/**
 * Character store state
 */
interface CharacterState {
  // All saved characters
  characters: Character[]

  // Currently active character (being created or viewed)
  currentCharacter: Character | null

  // Creation wizard step
  creationStep: CreationStep

  // History for undo/redo
  history: HistoryState

  // Actions
  createNewCharacter: () => void
  loadCharacter: (id: string) => void
  saveCharacter: () => void
  deleteCharacter: (id: string) => void
  importCharacter: (character: Character) => void

  // Creation wizard
  setCreationStep: (step: CreationStep) => void
  nextStep: () => void
  prevStep: () => void

  // Character updates
  updateCharacterDetails: (details: Partial<Pick<Character, 'name' | 'playerName' | 'age' | 'height' | 'weight' | 'backstory'>>) => void
  setRace: (race: Race) => void
  setClass: (characterClass: Class) => void
  setSubclass: (subclass: Subclass) => void
  setBackground: (background: Background) => void
  setAlignment: (alignment: Alignment) => void
  setAbilityScores: (scores: AbilityScores) => void
  setLanguages: (languages: string[]) => void
  addSpell: (spell: Spell) => void
  removeSpell: (spellId: string) => void
  addEquipment: (item: Equipment) => void
  removeEquipment: (itemId: string) => void
  toggleEquipment: (itemId: string) => void
  equipAll: () => void
  unequipAll: () => void
  changeEquipmentQuantity: (itemId: string, change: number) => void
  useItemCharge: (itemId: string) => void
  updateCurrency: (currency: Partial<Currency>) => void
  addMaterial: (material: Material) => void // Auto-consolidates if material already exists
  removeMaterial: (materialId: string) => void
  changeMaterialQuantity: (materialId: string, change: number) => void
  setDailyIncome: (professionName: string, amount: number, currency: 'copper' | 'silver' | 'gold') => void
  setFightingStance: (stance: FightingStance) => void

  // Carrying Capacity & Supplies
  updateCarryingCapacity: () => void // Recalculate based on STR and equipment weight
  addFoodRations: (days: number) => void
  consumeFoodRations: (days: number) => void
  addWaterSupply: (days: number) => void
  consumeWaterSupply: (days: number) => void

  // Combat/Session updates
  updateHitPoints: (hp: Partial<Character['hitPoints']>) => void
  addCondition: (condition: Condition) => void
  removeCondition: (condition: Condition) => void
  useFeatureCharge: (featureId: string) => void
  restoreFeatureCharge: (featureId: string, amount?: number) => void
  addItemFeature: (feature: ClassFeature) => void
  removeItemFeature: (featureId: string) => void
  useSpellSlot: (level: number) => void
  shortRest: () => void
  longRest: () => void

  // Leveling
  levelUp: () => void
  levelDown: () => void
  setLevel: (level: number) => void
  initializeHP: (rollResult: number) => void
  setLevelWithHP: (level: number, maxHP: number) => void

  // Undo/Redo
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

/**
 * Creation step order
 */
const STEP_ORDER: CreationStep[] = ['details', 'race', 'class', 'background', 'alignment', 'stats', 'spells', 'equipment', 'review']

/**
 * Character store with persistence
 */
export const useCharacterStore = create<CharacterState>()(
  devtools(
    persist(
      (set, get) => ({
        characters: [],
        currentCharacter: null,
        creationStep: 'details',
        history: { past: [], future: [] },

        createNewCharacter: () => {
          const newCharacter = createEmptyCharacter()
          set({
            currentCharacter: newCharacter,
            creationStep: 'details',
            history: { past: [], future: [] },
          })
        },

        loadCharacter: (id: string) => {
          const character = get().characters.find((c) => c.id === id)
          if (character) {
            set({
              currentCharacter: { ...character },
              history: { past: [], future: [] },
            })
          }
        },

        saveCharacter: () => {
          const { currentCharacter, characters } = get()
          if (!currentCharacter) return

          const updated = {
            ...currentCharacter,
            updatedAt: new Date().toISOString(),
          }

          const existingIndex = characters.findIndex((c) => c.id === updated.id)

          if (existingIndex >= 0) {
            const newCharacters = [...characters]
            newCharacters[existingIndex] = updated
            set({ characters: newCharacters, currentCharacter: updated })
          } else {
            set({
              characters: [...characters, updated],
              currentCharacter: updated,
            })
          }
        },

        deleteCharacter: (id: string) => {
          set((state) => ({
            characters: state.characters.filter((c) => c.id !== id),
            currentCharacter: state.currentCharacter?.id === id ? null : state.currentCharacter,
          }))
        },

        importCharacter: (character: Character) => {
          set((state) => ({
            characters: [...state.characters, character],
            currentCharacter: character,
          }))
        },

        setCreationStep: (step: CreationStep) => {
          set({ creationStep: step })
        },

        nextStep: () => {
          const currentIndex = STEP_ORDER.indexOf(get().creationStep)
          if (currentIndex < STEP_ORDER.length - 1) {
            set({ creationStep: STEP_ORDER[currentIndex + 1] })
          }
        },

        prevStep: () => {
          const currentIndex = STEP_ORDER.indexOf(get().creationStep)
          if (currentIndex > 0) {
            set({ creationStep: STEP_ORDER[currentIndex - 1] })
          }
        },

        updateCharacterDetails: (details) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, ...details },
            history: addToHistory(history, currentCharacter),
          })
        },

        setRace: (race: Race) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, race },
            history: addToHistory(history, currentCharacter),
          })
        },

        setClass: (characterClass: Class) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Apply class saving throws
          const savingThrows = { ...currentCharacter.savingThrows }
          characterClass.savingThrows.forEach((ability) => {
            savingThrows[ability] = true
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              class: characterClass,
              savingThrows,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        setSubclass: (subclass: Subclass) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, subclass },
            history: addToHistory(history, currentCharacter),
          })
        },

        setBackground: (background: Background) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Apply skill proficiencies from background
          const updatedSkills = { ...currentCharacter.skills }
          const skillMapping: Record<string, keyof typeof updatedSkills> = {
            'athletics': 'athletics',
            'acrobatics': 'acrobatics',
            'sleight-of-hand': 'sleightOfHand',
            'stealth': 'stealth',
            'arcana': 'arcana',
            'history': 'history',
            'investigation': 'investigation',
            'nature': 'nature',
            'religion': 'religion',
            'animal-handling': 'animalHandling',
            'insight': 'insight',
            'medicine': 'medicine',
            'perception': 'perception',
            'survival': 'survival',
            'deception': 'deception',
            'intimidation': 'intimidation',
            'performance': 'performance',
            'persuasion': 'persuasion',
          }

          background.skillProficiencies.forEach((skill) => {
            const skillKey = skillMapping[skill]
            if (skillKey && updatedSkills[skillKey] === 'none') {
              updatedSkills[skillKey] = 'proficient'
            }
          })

          // Add starting gold from background
          const updatedCurrency = {
            ...currentCharacter.currency,
            gold: currentCharacter.currency.gold + background.startingGold,
          }

          // Convert starting equipment to Equipment items
          const startingEquipment: Equipment[] = background.startingEquipment.map((item, idx) => ({
            id: `${background.id}-equipment-${idx}`,
            name: item,
            description: `Starting equipment from ${background.name} background`,
            category: 'adventuringGear' as const,
            weight: 1,
            cost: { copper: 0, silver: 0, gold: 0, platinum: 0 },
            quantity: 1,
            equipped: false,
          }))

          set({
            currentCharacter: {
              ...currentCharacter,
              background,
              skills: updatedSkills,
              currency: updatedCurrency,
              equipment: [...currentCharacter.equipment, ...startingEquipment],
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        setAlignment: (alignment: Alignment) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, alignment },
            history: addToHistory(history, currentCharacter),
          })
        },

        setAbilityScores: (scores: AbilityScores) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, abilityScores: scores },
            history: addToHistory(history, currentCharacter),
          })
        },

        setLanguages: (languages: string[]) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Ensure Common is always included
          const languagesWithCommon = languages.includes('Common')
            ? languages
            : ['Common', ...languages]

          set({
            currentCharacter: { ...currentCharacter, languages: languagesWithCommon },
            history: addToHistory(history, currentCharacter),
          })
        },

        addSpell: (spell: Spell) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              knownSpells: [...currentCharacter.knownSpells, spell],
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        removeSpell: (spellId: string) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              knownSpells: currentCharacter.knownSpells.filter((s) => s.id !== spellId),
              preparedSpells: currentCharacter.preparedSpells.filter((id) => id !== spellId),
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        addEquipment: (item: Equipment) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment: [...currentCharacter.equipment, item],
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        removeEquipment: (itemId: string) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment: currentCharacter.equipment.filter((e) => e.id !== itemId),
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        toggleEquipment: (itemId: string) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          const item = currentCharacter.equipment.find((e) => e.id === itemId)
          if (!item) return

          // For armor, unequip other armor when equipping this one
          // For shields, unequip other shields when equipping this one
          // For cloaks, unequip other cloaks when equipping this one
          const equipment = currentCharacter.equipment.map((e) => {
            if (e.id === itemId) {
              return { ...e, equipped: !e.equipped }
            }
            // If equipping armor, unequip other armor
            if (item.category === 'armor' && e.category === 'armor' && !item.equipped) {
              return { ...e, equipped: false }
            }
            // If equipping shield, unequip other shields
            if (item.category === 'shield' && e.category === 'shield' && !item.equipped) {
              return { ...e, equipped: false }
            }
            // If equipping cloak, unequip other cloaks
            if (item.category === 'cloak' && e.category === 'cloak' && !item.equipped) {
              return { ...e, equipped: false }
            }
            return e
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        equipAll: () => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Equip all items, ensuring only one armor/shield/cloak is equipped
          let hasArmor = false
          let hasShield = false
          let hasCloak = false

          const equipment = currentCharacter.equipment.map((e) => {
            // Skip equipping armor if we already have one equipped
            if (e.category === 'armor') {
              if (!hasArmor) {
                hasArmor = true
                return { ...e, equipped: true }
              }
              return { ...e, equipped: false }
            }
            // Skip equipping shield if we already have one equipped
            if (e.category === 'shield') {
              if (!hasShield) {
                hasShield = true
                return { ...e, equipped: true }
              }
              return { ...e, equipped: false }
            }
            // Skip equipping cloak if we already have one equipped
            if (e.category === 'cloak') {
              if (!hasCloak) {
                hasCloak = true
                return { ...e, equipped: true }
              }
              return { ...e, equipped: false }
            }
            // Equip all other items
            return { ...e, equipped: true }
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        unequipAll: () => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Unequip all items
          const equipment = currentCharacter.equipment.map((e) => ({
            ...e,
            equipped: false,
          }))

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        changeEquipmentQuantity: (itemId: string, change: number) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          const equipment = currentCharacter.equipment.map((e) => {
            if (e.id === itemId) {
              const newQuantity = Math.max(1, e.quantity + change)
              return { ...e, quantity: newQuantity }
            }
            return e
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        useItemCharge: (itemId: string) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          const equipment = currentCharacter.equipment.map((e) => {
            if (e.id === itemId && e.charges && e.charges.currentCharges > 0) {
              return {
                ...e,
                charges: {
                  ...e.charges,
                  currentCharges: e.charges.currentCharges - 1,
                },
              }
            }
            return e
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        updateCurrency: (currency: Partial<Currency>) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Merge new currency and auto-convert to higher denominations
          const updatedCurrency = autoConvertCurrency({
            ...currentCharacter.currency,
            ...currency,
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              currency: updatedCurrency,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        addMaterial: (material: Material) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // Check if material already exists - consolidate by ID
          const existingIndex = currentCharacter.materials.findIndex((m) => m.id === material.id)

          let materials: Material[]
          if (existingIndex >= 0) {
            // Material exists - add to quantity
            materials = currentCharacter.materials.map((m, index) =>
              index === existingIndex ? { ...m, quantity: m.quantity + material.quantity } : m
            )
          } else {
            // New material - add to array
            materials = [...currentCharacter.materials, material]
          }

          set({
            currentCharacter: {
              ...currentCharacter,
              materials,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        removeMaterial: (materialId: string) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          const materials = currentCharacter.materials.filter((m) => m.id !== materialId)

          set({
            currentCharacter: {
              ...currentCharacter,
              materials,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        changeMaterialQuantity: (materialId: string, change: number) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          const materials = currentCharacter.materials
            .map((m) => {
              if (m.id === materialId) {
                const newQuantity = m.quantity + change
                return newQuantity > 0 ? { ...m, quantity: newQuantity } : null
              }
              return m
            })
            .filter((m): m is Material => m !== null)

          set({
            currentCharacter: {
              ...currentCharacter,
              materials,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        setDailyIncome: (professionName: string, amount: number, currency: 'copper' | 'silver' | 'gold') => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              dailyIncome: { professionName, amount, currency },
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        setFightingStance: (stance: FightingStance) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              fightingStance: stance,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        updateCarryingCapacity: () => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          const strength = currentCharacter.abilityScores.strength
          const totalWeight = currentCharacter.equipment.reduce(
            (total, item) => total + (item.weight * item.quantity),
            0
          )

          set({
            currentCharacter: {
              ...currentCharacter,
              carryingCapacity: {
                current: totalWeight,
                maximum: strength * 15,
              },
            },
          })
        },

        addFoodRations: (days: number) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              foodRations: currentCharacter.foodRations + days,
            },
          })
        },

        consumeFoodRations: (days: number) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              foodRations: Math.max(0, currentCharacter.foodRations - days),
            },
          })
        },

        addWaterSupply: (days: number) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              waterSupply: currentCharacter.waterSupply + days,
            },
          })
        },

        consumeWaterSupply: (days: number) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              waterSupply: Math.max(0, currentCharacter.waterSupply - days),
            },
          })
        },

        updateHitPoints: (hp) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              hitPoints: { ...currentCharacter.hitPoints, ...hp },
            },
          })
        },

        addCondition: (condition: Condition) => {
          const { currentCharacter } = get()
          if (!currentCharacter || currentCharacter.conditions.includes(condition)) return

          set({
            currentCharacter: {
              ...currentCharacter,
              conditions: [...currentCharacter.conditions, condition],
            },
          })
        },

        removeCondition: (condition: Condition) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              conditions: currentCharacter.conditions.filter((c) => c !== condition),
            },
          })
        },

        useFeatureCharge: (featureId: string) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              featureCharges: currentCharacter.featureCharges.map((f) =>
                f.id === featureId && f.current > 0
                  ? { ...f, current: f.current - 1 }
                  : f
              ),
            },
          })
        },

        restoreFeatureCharge: (featureId: string, amount = 1) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              featureCharges: currentCharacter.featureCharges.map((f) =>
                f.id === featureId
                  ? { ...f, current: Math.min(f.current + amount, f.maximum) }
                  : f
              ),
            },
          })
        },

        addItemFeature: (feature: ClassFeature) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          // Check if feature already exists (don't add duplicates)
          const exists = currentCharacter.itemFeatures.some(f => f.id === feature.id)
          if (exists) return

          set({
            currentCharacter: {
              ...currentCharacter,
              itemFeatures: [...currentCharacter.itemFeatures, feature],
            },
          })
        },

        removeItemFeature: (featureId: string) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              itemFeatures: currentCharacter.itemFeatures.filter(f => f.id !== featureId),
            },
          })
        },

        useSpellSlot: (level: number) => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          const slotKey = `level${level}` as keyof typeof currentCharacter.spellSlots
          const slot = currentCharacter.spellSlots[slotKey]

          if (slot.used < slot.max) {
            set({
              currentCharacter: {
                ...currentCharacter,
                spellSlots: {
                  ...currentCharacter.spellSlots,
                  [slotKey]: { ...slot, used: slot.used + 1 },
                },
              },
            })
          }
        },

        shortRest: () => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          // Restore short rest features
          const featureCharges = currentCharacter.featureCharges.map((f) =>
            f.rechargeOn === 'shortRest' ? { ...f, current: f.maximum } : f
          )

          set({
            currentCharacter: {
              ...currentCharacter,
              featureCharges,
            },
          })
        },

        longRest: () => {
          const { currentCharacter } = get()
          if (!currentCharacter) return

          // Restore all features and spell slots
          const featureCharges = currentCharacter.featureCharges.map((f) =>
            f.rechargeOn === 'shortRest' || f.rechargeOn === 'longRest'
              ? { ...f, current: f.maximum }
              : f
          )

          // Reset spell slots
          const spellSlots = { ...currentCharacter.spellSlots }
          for (const key of Object.keys(spellSlots) as (keyof typeof spellSlots)[]) {
            spellSlots[key] = { ...spellSlots[key], used: 0 }
          }

          // Restore HP to max
          const hitPoints = {
            ...currentCharacter.hitPoints,
            current: currentCharacter.hitPoints.maximum,
          }

          set({
            currentCharacter: {
              ...currentCharacter,
              featureCharges,
              spellSlots,
              hitPoints,
              deathSaves: { successes: 0, failures: 0 },
            },
          })
        },

        levelUp: () => {
          const { currentCharacter, history } = get()
          if (!currentCharacter || currentCharacter.level >= 20) return

          const newLevel = currentCharacter.level + 1

          // Calculate HP increase (average + CON modifier)
          // For d10 (Fighter): average is 6
          // For d8 (Warlock): average is 5
          const hitDieAverage = currentCharacter.class?.hitDie === 'd10' ? 6 :
                                currentCharacter.class?.hitDie === 'd8' ? 5 :
                                currentCharacter.class?.hitDie === 'd12' ? 7 :
                                currentCharacter.class?.hitDie === 'd6' ? 4 : 5
          const conModifier = Math.floor((currentCharacter.abilityScores.constitution - 10) / 2)
          const hpIncrease = Math.max(1, hitDieAverage + conModifier)

          const newMaxHP = currentCharacter.hitPoints.maximum + hpIncrease
          const newCurrentHP = currentCharacter.hitPoints.current + hpIncrease

          set({
            currentCharacter: {
              ...currentCharacter,
              level: newLevel,
              hitPoints: {
                ...currentCharacter.hitPoints,
                maximum: newMaxHP,
                current: newCurrentHP,
              },
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        levelDown: () => {
          const { currentCharacter, history } = get()
          if (!currentCharacter || currentCharacter.level <= 1) return

          const newLevel = currentCharacter.level - 1

          // Calculate HP decrease (average + CON modifier, same as level up)
          const hitDieAverage = currentCharacter.class?.hitDie === 'd10' ? 6 :
                                currentCharacter.class?.hitDie === 'd8' ? 5 :
                                currentCharacter.class?.hitDie === 'd12' ? 7 :
                                currentCharacter.class?.hitDie === 'd6' ? 4 : 5
          const conModifier = Math.floor((currentCharacter.abilityScores.constitution - 10) / 2)
          const hpDecrease = Math.max(1, hitDieAverage + conModifier)

          const newMaxHP = Math.max(1, currentCharacter.hitPoints.maximum - hpDecrease)
          const newCurrentHP = Math.max(1, Math.min(currentCharacter.hitPoints.current - hpDecrease, newMaxHP))

          set({
            currentCharacter: {
              ...currentCharacter,
              level: newLevel,
              hitPoints: {
                ...currentCharacter.hitPoints,
                maximum: newMaxHP,
                current: newCurrentHP,
              },
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        setLevel: (level: number) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter || level < 1 || level > 20) return

          set({
            currentCharacter: {
              ...currentCharacter,
              level,
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        initializeHP: (rollResult: number) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          // For level 1: HP = hit die roll + CON modifier
          const conModifier = Math.floor((currentCharacter.abilityScores.constitution - 10) / 2)
          const maxHP = Math.max(1, rollResult + conModifier)

          set({
            currentCharacter: {
              ...currentCharacter,
              hitPoints: {
                current: maxHP,
                maximum: maxHP,
                temporary: 0,
              },
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        setLevelWithHP: (level: number, maxHP: number) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter || level < 1 || level > 20) return

          set({
            currentCharacter: {
              ...currentCharacter,
              level,
              hitPoints: {
                current: maxHP,
                maximum: maxHP,
                temporary: currentCharacter.hitPoints.temporary,
              },
            },
            history: addToHistory(history, currentCharacter),
          })
        },

        undo: () => {
          const { history, currentCharacter } = get()
          if (history.past.length === 0 || !currentCharacter) return

          const previous = history.past[history.past.length - 1]
          const newPast = history.past.slice(0, -1)

          set({
            currentCharacter: previous,
            history: {
              past: newPast,
              future: [currentCharacter, ...history.future],
            },
          })
        },

        redo: () => {
          const { history, currentCharacter } = get()
          if (history.future.length === 0 || !currentCharacter) return

          const next = history.future[0]
          const newFuture = history.future.slice(1)

          set({
            currentCharacter: next,
            history: {
              past: [...history.past, currentCharacter],
              future: newFuture,
            },
          })
        },

        canUndo: () => get().history.past.length > 0,
        canRedo: () => get().history.future.length > 0,
      }),
      {
        name: 'dungeons-characters',
        partialize: (state) => ({
          characters: state.characters,
        }),
      }
    ),
    { name: 'CharacterStore' }
  )
)
