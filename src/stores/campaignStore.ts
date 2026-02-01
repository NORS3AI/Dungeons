import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { Character } from '../types'

/**
 * NPC for campaign management
 */
export interface NPC {
  id: string
  name: string
  type: string // humanoid, beast, undead, etc.
  race?: string
  alignment?: string
  challengeRating?: string

  // Combat stats
  armorClass: number
  hitPoints: { current: number; maximum: number; formula?: string }
  speed: { walk: number; fly?: number; swim?: number; climb?: number; burrow?: number }

  // Ability scores
  abilityScores: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }

  // Optional class info
  class?: string
  level?: number

  // Combat
  actions: NPCAction[]
  reactions?: NPCAction[]
  legendaryActions?: NPCAction[]

  // Defenses
  savingThrows?: string[]
  skills?: string[]
  damageResistances?: string[]
  damageImmunities?: string[]
  conditionImmunities?: string[]

  // Senses
  senses?: string[]
  languages?: string[]

  // Spellcasting
  spellcasting?: {
    ability: string
    spellSaveDC: number
    spellAttackBonus: number
    slots?: Record<string, number>
    spells?: string[]
  }

  // Equipment and loot
  equipment?: string[]
  loot?: string[]

  // Notes
  description?: string
  notes?: string

  // Meta
  isTemplate: boolean
  createdAt: string
}

/**
 * NPC Action
 */
export interface NPCAction {
  name: string
  description: string
  attackBonus?: number
  damage?: string
  damageType?: string
}

/**
 * Campaign session notes
 */
export interface SessionNote {
  id: string
  characterId: string
  date: string
  content: string
}

/**
 * Initiative entry for combat
 */
export interface InitiativeEntry {
  id: string
  name: string
  initiative: number
  isPlayer: boolean
  characterId?: string
  npcId?: string
  currentHP?: number
  maxHP?: number
}

/**
 * Campaign state
 */
interface CampaignState {
  // Party characters (references to character IDs)
  partyCharacterIds: string[]

  // NPCs
  npcs: NPC[]

  // Session notes
  sessionNotes: SessionNote[]

  // Initiative tracker
  initiativeOrder: InitiativeEntry[]
  currentTurnIndex: number
  roundNumber: number

  // Actions
  addToParty: (characterId: string) => void
  removeFromParty: (characterId: string) => void

  // NPC management
  createNPC: (npc: Omit<NPC, 'id' | 'createdAt'>) => void
  updateNPC: (id: string, updates: Partial<NPC>) => void
  deleteNPC: (id: string) => void
  duplicateNPC: (id: string) => NPC | null

  // Session notes
  addSessionNote: (characterId: string, content: string) => void
  updateSessionNote: (noteId: string, content: string) => void
  deleteSessionNote: (noteId: string) => void
  getNotesForCharacter: (characterId: string) => SessionNote[]

  // Initiative
  addToInitiative: (entry: Omit<InitiativeEntry, 'id'>) => void
  removeFromInitiative: (id: string) => void
  updateInitiative: (id: string, initiative: number) => void
  sortInitiative: () => void
  nextTurn: () => void
  prevTurn: () => void
  resetCombat: () => void
  updateCombatantHP: (id: string, hp: number) => void
}

/**
 * Campaign store with persistence
 */
export const useCampaignStore = create<CampaignState>()(
  devtools(
    persist(
      (set, get) => ({
        partyCharacterIds: [],
        npcs: [],
        sessionNotes: [],
        initiativeOrder: [],
        currentTurnIndex: 0,
        roundNumber: 1,

        addToParty: (characterId: string) => {
          const { partyCharacterIds } = get()
          if (!partyCharacterIds.includes(characterId)) {
            set({ partyCharacterIds: [...partyCharacterIds, characterId] })
          }
        },

        removeFromParty: (characterId: string) => {
          set((state) => ({
            partyCharacterIds: state.partyCharacterIds.filter((id) => id !== characterId),
          }))
        },

        createNPC: (npc) => {
          const newNPC: NPC = {
            ...npc,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          }
          set((state) => ({ npcs: [...state.npcs, newNPC] }))
        },

        updateNPC: (id: string, updates: Partial<NPC>) => {
          set((state) => ({
            npcs: state.npcs.map((npc) =>
              npc.id === id ? { ...npc, ...updates } : npc
            ),
          }))
        },

        deleteNPC: (id: string) => {
          set((state) => ({
            npcs: state.npcs.filter((npc) => npc.id !== id),
          }))
        },

        duplicateNPC: (id: string) => {
          const npc = get().npcs.find((n) => n.id === id)
          if (!npc) return null

          const duplicate: NPC = {
            ...npc,
            id: crypto.randomUUID(),
            name: `${npc.name} (Copy)`,
            createdAt: new Date().toISOString(),
          }

          set((state) => ({ npcs: [...state.npcs, duplicate] }))
          return duplicate
        },

        addSessionNote: (characterId: string, content: string) => {
          const note: SessionNote = {
            id: crypto.randomUUID(),
            characterId,
            date: new Date().toISOString(),
            content,
          }
          set((state) => ({ sessionNotes: [...state.sessionNotes, note] }))
        },

        updateSessionNote: (noteId: string, content: string) => {
          set((state) => ({
            sessionNotes: state.sessionNotes.map((note) =>
              note.id === noteId ? { ...note, content } : note
            ),
          }))
        },

        deleteSessionNote: (noteId: string) => {
          set((state) => ({
            sessionNotes: state.sessionNotes.filter((note) => note.id !== noteId),
          }))
        },

        getNotesForCharacter: (characterId: string) => {
          return get().sessionNotes.filter((note) => note.characterId === characterId)
        },

        addToInitiative: (entry) => {
          const newEntry: InitiativeEntry = {
            ...entry,
            id: crypto.randomUUID(),
          }
          set((state) => ({
            initiativeOrder: [...state.initiativeOrder, newEntry],
          }))
        },

        removeFromInitiative: (id: string) => {
          set((state) => ({
            initiativeOrder: state.initiativeOrder.filter((e) => e.id !== id),
          }))
        },

        updateInitiative: (id: string, initiative: number) => {
          set((state) => ({
            initiativeOrder: state.initiativeOrder.map((e) =>
              e.id === id ? { ...e, initiative } : e
            ),
          }))
        },

        sortInitiative: () => {
          set((state) => ({
            initiativeOrder: [...state.initiativeOrder].sort(
              (a, b) => b.initiative - a.initiative
            ),
          }))
        },

        nextTurn: () => {
          set((state) => {
            const nextIndex = (state.currentTurnIndex + 1) % state.initiativeOrder.length
            const newRound = nextIndex === 0 ? state.roundNumber + 1 : state.roundNumber

            return {
              currentTurnIndex: nextIndex,
              roundNumber: newRound,
            }
          })
        },

        prevTurn: () => {
          set((state) => {
            const prevIndex =
              state.currentTurnIndex === 0
                ? state.initiativeOrder.length - 1
                : state.currentTurnIndex - 1
            const newRound =
              state.currentTurnIndex === 0 && state.roundNumber > 1
                ? state.roundNumber - 1
                : state.roundNumber

            return {
              currentTurnIndex: prevIndex,
              roundNumber: newRound,
            }
          })
        },

        resetCombat: () => {
          set({
            initiativeOrder: [],
            currentTurnIndex: 0,
            roundNumber: 1,
          })
        },

        updateCombatantHP: (id: string, hp: number) => {
          set((state) => ({
            initiativeOrder: state.initiativeOrder.map((e) =>
              e.id === id ? { ...e, currentHP: hp } : e
            ),
          }))
        },
      }),
      {
        name: 'dungeons-campaign',
      }
    ),
    { name: 'CampaignStore' }
  )
)
