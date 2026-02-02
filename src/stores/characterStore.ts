import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type {
  Character,
  AbilityScores,
  Race,
  Class,
  Subclass,
  Background,
  Equipment,
  Currency,
  Spell,
  Condition,
} from '../types'
import { DEFAULT_ABILITY_SCORES, EMPTY_CURRENCY } from '../types'

/**
 * Character creation step
 */
export type CreationStep =
  | 'details'
  | 'race'
  | 'class'
  | 'background'
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
    hitPoints: { current: 0, maximum: 0, temporary: 0 },
    armorClass: 10,
    initiative: 0,
    speed: 30,
    deathSaves: { successes: 0, failures: 0 },
    conditions: [],
    featureCharges: [],
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Undo/Redo state history
 */
interface HistoryState {
  past: Character[]
  future: Character[]
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
  setAbilityScores: (scores: AbilityScores) => void
  addSpell: (spell: Spell) => void
  removeSpell: (spellId: string) => void
  addEquipment: (item: Equipment) => void
  removeEquipment: (itemId: string) => void
  toggleEquipment: (itemId: string) => void
  updateCurrency: (currency: Partial<Currency>) => void

  // Combat/Session updates
  updateHitPoints: (hp: Partial<Character['hitPoints']>) => void
  addCondition: (condition: Condition) => void
  removeCondition: (condition: Condition) => void
  useFeatureCharge: (featureId: string) => void
  restoreFeatureCharge: (featureId: string, amount?: number) => void
  useSpellSlot: (level: number) => void
  shortRest: () => void
  longRest: () => void

  // Leveling
  levelUp: () => void
  setLevel: (level: number) => void

  // Undo/Redo
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

/**
 * Creation step order
 */
const STEP_ORDER: CreationStep[] = ['details', 'race', 'class', 'background', 'stats', 'spells', 'equipment', 'review']

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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
          })
        },

        setRace: (race: Race) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, race },
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
          })
        },

        setSubclass: (subclass: Subclass) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, subclass },
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
          })
        },

        setBackground: (background: Background) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, background },
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
          })
        },

        setAbilityScores: (scores: AbilityScores) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: { ...currentCharacter, abilityScores: scores },
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
          })
        },

        toggleEquipment: (itemId: string) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          const item = currentCharacter.equipment.find((e) => e.id === itemId)
          if (!item) return

          // For armor, unequip other armor when equipping this one
          // For shields, unequip other shields when equipping this one
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
            return e
          })

          set({
            currentCharacter: {
              ...currentCharacter,
              equipment,
            },
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
          })
        },

        updateCurrency: (currency: Partial<Currency>) => {
          const { currentCharacter, history } = get()
          if (!currentCharacter) return

          set({
            currentCharacter: {
              ...currentCharacter,
              currency: { ...currentCharacter.currency, ...currency },
            },
            history: {
              past: [...history.past, currentCharacter],
              future: [],
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
            history: {
              past: [...history.past, currentCharacter],
              future: [],
            },
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
