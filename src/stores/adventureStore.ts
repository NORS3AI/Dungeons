import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AdventureState,
  AdventureMessage,
  GameState,
  CombatState,
  CombatEnemy,
  GameAction,
  QuestEntry,
  RollResult,
} from '../types/adventure'

interface AdventureActions {
  startAdventure: (characterId: string) => void
  endAdventure: () => void

  addMessage: (role: AdventureMessage['role'], content: string, rollData?: RollResult, gameActions?: GameAction[]) => void
  clearMessages: () => void

  setGameState: (state: GameState) => void
  setLocation: (location: string) => void
  setIsAIResponding: (responding: boolean) => void

  startCombat: (enemies: CombatEnemy[], playerInitiative: number) => void
  updateCombat: (combat: CombatState) => void
  endCombat: () => void

  addConversationEntry: (role: 'user' | 'assistant', content: string) => void
  addQuest: (quest: Omit<QuestEntry, 'id' | 'timestamp' | 'isComplete'>) => void
  completeQuest: (questId: string) => void
  addXP: (amount: number) => void

  processGameActions: (actions: GameAction[]) => GameAction[]
}

type AdventureStore = AdventureState & AdventureActions

function createMessage(
  role: AdventureMessage['role'],
  content: string,
  rollData?: RollResult,
  gameActions?: GameAction[],
): AdventureMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: Date.now(),
    rollData,
    gameActions,
  }
}

export const useAdventureStore = create<AdventureStore>()(
  persist(
    (set, get) => ({
      isActive: false,
      characterId: null,
      gameState: 'exploring',
      messages: [],
      combatState: null,
      currentLocation: 'Unknown',
      questLog: [],
      adventureSeed: Date.now(),
      isAIResponding: false,
      conversationContext: [],
      totalXPEarned: 0,

      startAdventure: (characterId: string) => {
        set({
          isActive: true,
          characterId,
          gameState: 'exploring',
          messages: [],
          combatState: null,
          currentLocation: 'Unknown',
          questLog: [],
          adventureSeed: Date.now(),
          isAIResponding: false,
          conversationContext: [],
          totalXPEarned: 0,
        })
      },

      endAdventure: () => {
        set({
          isActive: false,
          characterId: null,
          gameState: 'exploring',
          messages: [],
          combatState: null,
          isAIResponding: false,
          conversationContext: [],
          questLog: [],
          totalXPEarned: 0,
          currentLocation: 'Unknown',
        })
      },

      addMessage: (role, content, rollData, gameActions) => {
        set((state) => ({
          messages: [...state.messages, createMessage(role, content, rollData, gameActions)],
        }))
      },

      clearMessages: () => set({ messages: [] }),

      setGameState: (gameState: GameState) => set({ gameState }),

      setLocation: (location: string) => set({ currentLocation: location }),

      setIsAIResponding: (isAIResponding: boolean) => set({ isAIResponding }),

      startCombat: (enemies: CombatEnemy[], playerInitiative: number) => {
        const entries = [
          { id: 'player', name: 'You', initiative: playerInitiative, isPlayer: true },
          ...enemies.map((e) => ({
            id: e.id,
            name: e.name,
            initiative: e.initiative,
            isPlayer: false,
            enemyId: e.id,
          })),
        ].sort((a, b) => b.initiative - a.initiative)

        set({
          gameState: 'combat',
          combatState: {
            enemies,
            turnOrder: entries,
            currentTurnIndex: 0,
            round: 1,
            playerInitiative,
            isPlayerTurn: entries[0].isPlayer,
          },
        })
      },

      updateCombat: (combat: CombatState) => set({ combatState: combat }),

      endCombat: () => set({ combatState: null, gameState: 'exploring' }),

      addConversationEntry: (role, content) => {
        set((state) => ({
          conversationContext: [...state.conversationContext, { role, content }],
        }))
      },

      addQuest: (quest) => {
        set((state) => ({
          questLog: [
            ...state.questLog,
            {
              ...quest,
              id: `quest-${Date.now()}`,
              timestamp: Date.now(),
              isComplete: false,
            },
          ],
        }))
      },

      completeQuest: (questId: string) => {
        set((state) => ({
          questLog: state.questLog.map((q) =>
            q.id === questId ? { ...q, isComplete: true } : q,
          ),
        }))
      },

      addXP: (amount: number) => {
        set((state) => ({ totalXPEarned: state.totalXPEarned + amount }))
      },

      processGameActions: (actions: GameAction[]): GameAction[] => {
        const pendingActions: GameAction[] = []

        for (const action of actions) {
          switch (action.type) {
            case 'state_change':
              get().setGameState(action.newState)
              break
            case 'location_change':
              get().setLocation(action.location)
              break
            default:
              pendingActions.push(action)
              break
          }
        }

        return pendingActions
      },
    }),
    {
      name: 'dungeons-adventure',
      partialize: (state) => ({
        isActive: state.isActive,
        characterId: state.characterId,
        gameState: state.gameState,
        messages: state.messages.slice(-100),
        combatState: state.combatState,
        currentLocation: state.currentLocation,
        questLog: state.questLog,
        adventureSeed: state.adventureSeed,
        conversationContext: state.conversationContext.slice(-40),
        totalXPEarned: state.totalXPEarned,
      }),
    },
  ),
)
