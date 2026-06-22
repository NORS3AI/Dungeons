import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { useAdventureStore } from '../stores/adventureStore'
import { useSettingsStore } from '../stores/settingsStore'
import { CharacterStatusBar } from '../components/adventure/CharacterStatusBar'
import { AdventureLog } from '../components/adventure/AdventureLog'
import { CombatPanel } from '../components/adventure/CombatPanel'
import { sendToAIDM, buildCombatContext } from '../services/aiDungeonMaster'
import {
  rollAttack,
  rollDamage,
  rollSkillCheck,
  rollSavingThrow,
  rollDeathSave,
  rollInitiative,
  getPlayerAttackBonus,
  getPlayerDamageNotation,
  applyDamageToEnemy,
  advanceTurn,
  isCombatOver,
} from '../utils/adventureCombat'
import { calculateModifier } from '../utils/calculations'
import type { GameAction, CombatEnemy } from '../types/adventure'

const RANDOM_HOOKS = [
  { label: 'Dungeon Crawl', icon: '&#x1F3DA;', prompt: 'I enter a mysterious dungeon that locals have warned me about. Strange sounds echo from within.' },
  { label: 'Tavern Brawl', icon: '&#x1F37A;', prompt: 'I\'m sitting in a rowdy tavern when a fight breaks out nearby.' },
  { label: 'Ambush on the Road', icon: '&#x1F332;', prompt: 'I\'m traveling down a forest road when I notice signs of an ambush ahead.' },
  { label: 'Missing Person', icon: '&#x1F50D;', prompt: 'A desperate villager begs me to find their missing child who wandered into the old ruins.' },
  { label: 'Dragon Sighting', icon: '&#x1F409;', prompt: 'A dragon has been spotted near the village. The townsfolk are terrified and looking for a hero.' },
  { label: 'Haunted Manor', icon: '&#x1F47B;', prompt: 'I approach an abandoned manor on a hill. Locals say it\'s haunted and no one who enters comes back.' },
  { label: 'Merchant Escort', icon: '&#x1F6D2;', prompt: 'A wealthy merchant hires me to escort their caravan through bandit territory.' },
  { label: 'Arena Champion', icon: '&#x2694;&#xFE0F;', prompt: 'I sign up for the gladiatorial arena, where the champion has been undefeated for years.' },
  { label: 'Shipwreck', icon: '&#x1F30A;', prompt: 'I wash ashore after a terrible storm destroyed my ship. I have only what I\'m carrying.' },
  { label: 'Political Intrigue', icon: '&#x1F451;', prompt: 'The king\'s advisor pulls me aside at a feast and whispers that there\'s a plot to assassinate the king tonight.' },
  { label: 'Undead Rising', icon: '&#x1F480;', prompt: 'The dead are rising from the cemetery outside town. Something dark is at work.' },
  { label: 'Lost Temple', icon: '&#x26EA;', prompt: 'I discover an ancient map leading to a temple that holds a legendary artifact.' },
  { label: 'Peaceful Life', icon: '&#x1F33E;', prompt: 'I arrive in a quiet farming village looking to settle down and live a simple life for a while.' },
  { label: 'The Heist', icon: '&#x1F4B0;', prompt: 'A thieves\' guild recruits me for an elaborate heist on the noble quarter\'s treasury.' },
  { label: 'Planar Rift', icon: '&#x1F31F;', prompt: 'A glowing rift tears open in the sky above the town square, and strange creatures begin pouring through.' },
  { label: 'Surprise Me', icon: '&#x1F3B2;', prompt: 'Begin an adventure that fits my character. Surprise me with something creative and unexpected.' },
]

const ABILITY_MAP: Record<string, 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'> = {
  strength: 'strength', str: 'strength',
  dexterity: 'dexterity', dex: 'dexterity',
  constitution: 'constitution', con: 'constitution',
  intelligence: 'intelligence', int: 'intelligence',
  wisdom: 'wisdom', wis: 'wisdom',
  charisma: 'charisma', cha: 'charisma',
}

const SKILL_ABILITY: Record<string, string> = {
  athletics: 'strength',
  acrobatics: 'dexterity', sleightOfHand: 'dexterity', stealth: 'dexterity',
  arcana: 'intelligence', history: 'intelligence', investigation: 'intelligence',
  nature: 'intelligence', religion: 'intelligence',
  animalHandling: 'wisdom', insight: 'wisdom', medicine: 'wisdom',
  perception: 'wisdom', survival: 'wisdom',
  deception: 'charisma', intimidation: 'charisma', performance: 'charisma', persuasion: 'charisma',
}

export function AdventurePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { loadCharacter, updateHitPoints, addCondition, removeCondition, useSpellSlot, shortRest, longRest, updateCurrency, saveCharacter } = useCharacterStore()
  const character = useCharacterStore((s) => s.currentCharacter)
  const { apiKey } = useSettingsStore()

  const {
    isActive, gameState, messages, combatState, currentLocation,
    isAIResponding, conversationContext,
    startAdventure, addMessage, setIsAIResponding,
    addConversationEntry, processGameActions,
    startCombat, updateCombat, endCombat, setGameState, addXP,
  } = useAdventureStore()
  const totalXPEarned = useAdventureStore((s) => s.totalXPEarned)
  const questLog = useAdventureStore((s) => s.questLog)

  const [input, setInput] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingAction, setPendingAction] = useState<GameAction | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (id) loadCharacter(id)
  }, [id, loadCharacter])

  const savedCharacterId = useAdventureStore((s) => s.characterId)

  useEffect(() => {
    if (!character) return
    // Only start fresh if no adventure exists for this character
    if (!isActive || savedCharacterId !== character.id) {
      startAdventure(character.id)
    }
  }, [character?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isAIResponding) inputRef.current?.focus()
  }, [isAIResponding])

  const executeGameActions = useCallback((actions: GameAction[]) => {
    if (!character) return

    const pending = processGameActions(actions)

    for (const action of pending) {
      switch (action.type) {
        case 'damage': {
          if (action.target === 'player') {
            const newHP = Math.max(0, character.hitPoints.current - action.amount)
            updateHitPoints({ current: newHP })
            saveCharacter()
            addMessage('system', `You take ${action.amount} ${action.damageType} damage! (HP: ${newHP}/${character.hitPoints.maximum})`)
            if (newHP === 0) {
              setGameState('death')
              addMessage('system', 'You fall unconscious! Death saves begin...')
            }
          }
          break
        }
        case 'heal': {
          if (action.target === 'player') {
            const newHP = Math.min(character.hitPoints.maximum, character.hitPoints.current + action.amount)
            updateHitPoints({ current: newHP })
            saveCharacter()
            addMessage('system', `You are healed for ${action.amount} HP! (HP: ${newHP}/${character.hitPoints.maximum})`)
          }
          break
        }
        case 'combat_start': {
          const dexMod = calculateModifier(character.abilityScores.dexterity)
          const playerInit = rollInitiative(dexMod)
          startCombat(action.enemies, playerInit)
          const enemyNames = action.enemies.map((e: CombatEnemy) => e.name).join(', ')
          addMessage('system', `Combat begins! You roll initiative: ${playerInit}. Enemies: ${enemyNames}`)
          break
        }
        case 'combat_end': {
          endCombat()
          if (action.xpReward) addXP(action.xpReward)
          addMessage('system', action.victory
            ? `Victory! ${action.xpReward ? `You earn ${action.xpReward} XP.` : ''}`
            : 'The battle ends...',
          )
          break
        }
        case 'loot': {
          const parts: string[] = []
          if (action.gold) {
            parts.push(`${action.gold} gold`)
            const currentGold = character.currency?.gold ?? 0
            updateCurrency({ gold: currentGold + action.gold })
            saveCharacter()
          }
          if (action.items?.length) parts.push(action.items.join(', '))
          if (parts.length > 0) addMessage('system', `Loot acquired: ${parts.join(', ')}`)
          break
        }
        case 'condition_add': {
          if (action.target === 'player') {
            addCondition(action.condition)
            addMessage('system', `Condition applied: ${action.condition}`)
          }
          break
        }
        case 'condition_remove': {
          if (action.target === 'player') {
            removeCondition(action.condition)
            addMessage('system', `Condition removed: ${action.condition}`)
          }
          break
        }
        case 'rest_opportunity': {
          setPendingAction(action)
          addMessage('system', `A ${action.restType} rest opportunity presents itself. Type "rest" to take it, or continue adventuring.`)
          break
        }
        case 'skill_check': {
          setPendingAction(action)
          const abilityKey = ABILITY_MAP[action.ability.toLowerCase()] ?? 'wisdom'
          addMessage('system', `The DM calls for a ${action.skill} check (DC ${action.dc}, ${abilityKey}). Type "roll" to make the check.`)
          break
        }
        case 'saving_throw': {
          setPendingAction(action)
          const abilityKey = ABILITY_MAP[action.ability.toLowerCase()] ?? 'dexterity'
          addMessage('system', `Make a ${abilityKey} saving throw! (DC ${action.dc}). Type "roll" to make the save.`)
          break
        }
        case 'use_spell_slot': {
          useSpellSlot(action.level)
          addMessage('system', `Spell slot (level ${action.level}) consumed.`)
          break
        }
      }
    }
  }, [character, processGameActions, updateHitPoints, addMessage, startCombat, endCombat, setGameState, addCondition, removeCondition, useSpellSlot, updateCurrency, saveCharacter, addXP])

  const sendMessage = useCallback(async (playerText: string) => {
    if (!character || !apiKey || isAIResponding) return

    setError(null)
    setStreamingText('')

    const combatContext = buildCombatContext(gameState, combatState)
    const fullMessage = playerText + combatContext

    addMessage('player', playerText)
    addConversationEntry('user', fullMessage)
    setIsAIResponding(true)

    try {
      const response = await sendToAIDM(
        apiKey,
        character,
        gameState,
        currentLocation,
        conversationContext,
        fullMessage,
        (displayText) => setStreamingText(displayText),
      )

      setStreamingText('')
      addMessage('dm', response.narrative, undefined, response.actions)
      addConversationEntry('assistant', response.narrative)

      if (response.actions.length > 0) {
        executeGameActions(response.actions)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMsg)
      addMessage('system', `Error communicating with the AI DM: ${errorMsg}`)
    } finally {
      setIsAIResponding(false)
    }
  }, [character, apiKey, isAIResponding, gameState, combatState, currentLocation, conversationContext, addMessage, addConversationEntry, setIsAIResponding, executeGameActions])

  const handleCommand = useCallback((text: string) => {
    const lower = text.toLowerCase()

    // Roll for pending action
    if (lower === 'roll' && pendingAction && character) {
      if (pendingAction.type === 'skill_check') {
        const abilityKey = ABILITY_MAP[pendingAction.ability.toLowerCase()] ?? 'wisdom'
        const score = character.abilityScores[abilityKey] ?? 10
        const skillKey = pendingAction.skill.toLowerCase().replace(/\s+/g, '') as keyof typeof SKILL_ABILITY
        const isProficient = character.skills[skillKey as keyof typeof character.skills] !== 'none'
        const result = rollSkillCheck(score, isProficient, character.level, pendingAction.dc)
        addMessage('roll', `${pendingAction.skill} check (DC ${pendingAction.dc})`, result)
        setPendingAction(null)
        sendMessage(`[Skill check result: ${pendingAction.skill} - rolled ${result.total} vs DC ${pendingAction.dc} - ${result.success ? 'SUCCESS' : 'FAILURE'}${result.critical ? ' (Natural 20!)' : ''}${result.fumble ? ' (Natural 1!)' : ''}]`)
        return
      }
      if (pendingAction.type === 'saving_throw') {
        const abilityKey = ABILITY_MAP[pendingAction.ability.toLowerCase()] ?? 'dexterity'
        const score = character.abilityScores[abilityKey] ?? 10
        const isProficient = character.savingThrows[abilityKey] ?? false
        const result = rollSavingThrow(score, isProficient, character.level, pendingAction.dc)
        addMessage('roll', `${abilityKey} saving throw (DC ${pendingAction.dc})`, result)
        setPendingAction(null)
        sendMessage(`[Saving throw result: ${abilityKey} - rolled ${result.total} vs DC ${pendingAction.dc} - ${result.success ? 'SUCCESS' : 'FAILURE'}${result.critical ? ' (Natural 20!)' : ''}${result.fumble ? ' (Natural 1!)' : ''}]`)
        return
      }
    }

    // Rest command
    if (lower === 'rest' && pendingAction?.type === 'rest_opportunity') {
      if (pendingAction.restType === 'short') {
        shortRest()
        addMessage('system', 'You take a short rest. Some resources restored.')
      } else {
        longRest()
        addMessage('system', 'You take a long rest. HP, spell slots, and features fully restored.')
      }
      setPendingAction(null)
      sendMessage(`[The player takes a ${pendingAction.restType} rest]`)
      return
    }

    // Death save (works with empty input — just press Enter)
    if (gameState === 'death' && character) {
      const result = rollDeathSave()
      addMessage('roll', 'Death Save', result)
      if (result.critical) {
        updateHitPoints({ current: 1 })
        setGameState('exploring')
        addMessage('system', 'Natural 20! You regain 1 HP and stabilize!')
        sendMessage('[The player rolled a natural 20 on their death save and regained consciousness with 1 HP!]')
      } else if (result.fumble) {
        addMessage('system', 'Natural 1! That counts as two failures!')
        sendMessage('[The player rolled a natural 1 on their death save - two failures!]')
      } else {
        sendMessage(`[Death save result: ${result.success ? 'success' : 'failure'} (rolled ${result.total})]`)
      }
      return
    }

    // Attack command in combat
    if (combatState && character && (lower.startsWith('attack') || lower.startsWith('hit') || lower.startsWith('strike'))) {
      const target = combatState.enemies.find((e) => e.isActive && e.currentHP > 0)
      if (!target) {
        addMessage('system', 'No valid targets!')
        return
      }

      const attackBonus = getPlayerAttackBonus(character)
      const attackResult = rollAttack(attackBonus, target.ac)
      addMessage('roll', `Attack vs ${target.name} (AC ${target.ac})`, attackResult)

      if (attackResult.success) {
        const { notation, type } = getPlayerDamageNotation(character)
        const damageResult = rollDamage(notation, attackResult.critical)
        addMessage('roll', `Damage to ${target.name}`, damageResult)

        const newCombat = applyDamageToEnemy(combatState, target.id, damageResult.total)
        updateCombat(newCombat)

        const updatedTarget = newCombat.enemies.find((e) => e.id === target.id)
        if (updatedTarget && updatedTarget.currentHP <= 0) {
          addMessage('system', `${target.name} is defeated!`)
        }

        const { over } = isCombatOver(newCombat)
        if (over) {
          endCombat()
          sendMessage(`[Combat resolved: The player attacked ${target.name} for ${damageResult.total} ${type} damage${attackResult.critical ? ' (CRITICAL HIT!)' : ''}. ${target.name} is defeated. All enemies defeated - victory!]`)
          return
        }

        const advanced = advanceTurn(newCombat)
        updateCombat(advanced)

        if (!advanced.isPlayerTurn) {
          sendMessage(`[The player attacked ${target.name} for ${damageResult.total} ${type} damage${attackResult.critical ? ' (CRITICAL HIT!)' : ''}. ${updatedTarget ? `${target.name} has ${updatedTarget.currentHP}/${updatedTarget.maxHP} HP.` : ''} It is now the enemies' turn. Narrate enemy attacks and include damage actions.]`)
          return
        }
      } else {
        const advanced = advanceTurn(combatState)
        updateCombat(advanced)

        if (!advanced.isPlayerTurn) {
          sendMessage(`[The player attacked ${target.name} but missed${attackResult.fumble ? ' (Natural 1 - fumble!)' : ''}. It is now the enemies' turn. Narrate enemy attacks and include damage actions.]`)
          return
        }
        addMessage('system', `Miss! ${attackResult.fumble ? 'Fumble!' : ''}`)
      }
      return
    }

    if (!text) return
    sendMessage(text)
  }, [character, pendingAction, gameState, combatState, addMessage, sendMessage, shortRest, longRest, updateHitPoints, setGameState, updateCombat, endCombat])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text && gameState !== 'death') return
    setInput('')
    handleCommand(text)
  }, [input, gameState, handleCommand])

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">&#x2694;&#xFE0F;</div>
          <h2 className="text-xl text-gray-400 mb-4">No character loaded</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">&#x1F511;</div>
          <h2 className="text-xl text-gray-400 mb-2">API Key Required</h2>
          <p className="text-gray-500 mb-4">
            Open Settings and add your Claude API key to use the AI Dungeon Master.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // Adventure starter screen — shown when no messages yet
  if (messages.length === 0 && !isAIResponding) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <CharacterStatusBar
          character={character}
          combatState={null}
          gameState="exploring"
          location="Unknown"
        />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-3">&#x2694;&#xFE0F;</div>
              <h1 className="text-3xl font-bold text-dnd-gold mb-2">Begin Your Adventure</h1>
              <p className="text-gray-400 max-w-md mx-auto">
                Choose an adventure hook below, or write your own opening. The AI Dungeon Master will take it from there.
              </p>
            </div>

            {/* Random adventure hooks */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Adventure Hooks</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {RANDOM_HOOKS.map((hook) => (
                  <button
                    key={hook.label}
                    onClick={() => sendMessage(hook.prompt)}
                    className="p-3 bg-gray-800 border border-gray-700 rounded-xl text-left hover:border-dnd-gold/50 hover:bg-gray-800/80 transition-all group"
                  >
                    <div className="text-xl mb-1" dangerouslySetInnerHTML={{ __html: hook.icon }} />
                    <div className="text-sm font-medium text-gray-300 group-hover:text-dnd-gold transition-colors">
                      {hook.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom opening */}
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Or Write Your Own</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (input.trim()) {
                    sendMessage(input.trim())
                    setInput('')
                  }
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I walk into a dark forest looking for treasure..."
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white
                           placeholder:text-gray-500 focus:outline-none focus:border-dnd-gold transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-5 py-3 bg-dnd-gold text-gray-900 font-bold rounded-xl
                           hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Begin
                </button>
              </form>
            </div>

            {/* Back button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate(`/character/${character.id}`)}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                &#x2190; Back to Character Sheet
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <CharacterStatusBar
        character={character}
        combatState={combatState}
        gameState={gameState}
        location={currentLocation}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Main adventure log */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdventureLog
            messages={messages}
            streamingText={streamingText}
            isAIResponding={isAIResponding}
          />

          {/* Error display */}
          {error && (
            <div className="mx-4 mb-2 px-4 py-2 bg-red-900/30 border border-red-700 rounded-lg text-sm text-red-300">
              {error}
              <button onClick={() => setError(null)} className="ml-2 text-red-400 hover:text-red-200">dismiss</button>
            </div>
          )}

          {/* Input area */}
          <div className="border-t border-gray-700 bg-gray-800/90 px-4 py-3 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-5xl mx-auto">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  gameState === 'death' ? 'Press Enter to roll a death save...' :
                  gameState === 'combat' && combatState?.isPlayerTurn ? 'Type "attack" or describe your action...' :
                  pendingAction?.type === 'skill_check' ? 'Type "roll" to make the check...' :
                  pendingAction?.type === 'saving_throw' ? 'Type "roll" to make the save...' :
                  pendingAction?.type === 'rest_opportunity' ? 'Type "rest" to rest, or continue...' :
                  messages.length === 0 ? 'Describe how your adventure begins...' :
                  'What do you do?'
                }
                disabled={isAIResponding}
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white
                         placeholder:text-gray-500 focus:outline-none focus:border-dnd-gold
                         disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={isAIResponding || (!input.trim() && gameState !== 'death')}
                className="px-5 py-3 bg-dnd-gold text-gray-900 font-bold rounded-xl
                         hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors whitespace-nowrap"
              >
                {isAIResponding ? '...' : gameState === 'death' ? 'Roll' : 'Send'}
              </button>
            </form>

            {/* Quick action buttons in combat */}
            {gameState === 'combat' && combatState?.isPlayerTurn && !isAIResponding && (
              <div className="flex gap-2 mt-2 max-w-5xl mx-auto flex-wrap">
                <button
                  type="button"
                  onClick={() => handleCommand('attack')}
                  className="px-3 py-1.5 bg-red-700/50 text-red-300 text-xs font-medium rounded-lg border border-red-700 hover:bg-red-700/70 transition-colors"
                >
                  Attack
                </button>
                <button
                  type="button"
                  onClick={() => setInput('I cast ')}
                  className="px-3 py-1.5 bg-blue-700/50 text-blue-300 text-xs font-medium rounded-lg border border-blue-700 hover:bg-blue-700/70 transition-colors"
                >
                  Cast Spell
                </button>
                <button
                  type="button"
                  onClick={() => setInput('I dodge')}
                  className="px-3 py-1.5 bg-green-700/50 text-green-300 text-xs font-medium rounded-lg border border-green-700 hover:bg-green-700/70 transition-colors"
                >
                  Dodge
                </button>
                <button
                  type="button"
                  onClick={() => setInput('I disengage and move away')}
                  className="px-3 py-1.5 bg-yellow-700/50 text-yellow-300 text-xs font-medium rounded-lg border border-yellow-700 hover:bg-yellow-700/70 transition-colors"
                >
                  Disengage
                </button>
                <button
                  type="button"
                  onClick={() => setInput('I use a healing potion')}
                  className="px-3 py-1.5 bg-pink-700/50 text-pink-300 text-xs font-medium rounded-lg border border-pink-700 hover:bg-pink-700/70 transition-colors"
                >
                  Use Item
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Side panel — combat / quest info */}
        {showSidebar && (
          <div className="w-72 border-l border-gray-700 bg-gray-900/50 overflow-y-auto p-4 space-y-4 hidden lg:block">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Adventure</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-600 hover:text-gray-400 text-xs"
              >
                Hide
              </button>
            </div>

            {/* Combat panel */}
            {combatState && <CombatPanel combat={combatState} />}

            {/* Character quick stats */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase">Quick Stats</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const).map((ability) => {
                  const score = character.abilityScores[ability]
                  const mod = calculateModifier(score)
                  return (
                    <div key={ability} className="bg-gray-900/50 rounded p-1.5">
                      <div className="text-xs text-gray-500 uppercase">{ability.slice(0, 3)}</div>
                      <div className="text-sm font-bold text-white">{score}</div>
                      <div className="text-xs text-gray-400">{mod >= 0 ? '+' : ''}{mod}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Spell slots */}
            {character.knownSpells.length > 0 && (
              <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 space-y-2">
                <div className="text-xs font-bold text-gray-500 uppercase">Spell Slots</div>
                <div className="space-y-1">
                  {Object.entries(character.spellSlots || {}).map(([level, slot]) => {
                    const s = slot as { max: number; used: number }
                    if (!s.max) return null
                    const remaining = s.max - (s.used || 0)
                    return (
                      <div key={level} className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 w-6">L{level}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: s.max }, (_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full border ${
                                i < remaining
                                  ? 'bg-blue-500 border-blue-400'
                                  : 'bg-gray-700 border-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Gold & XP */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3">
              <div className="text-xs font-bold text-gray-500 uppercase mb-2">Resources</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-400">Gold</span>
                <span className="font-bold text-yellow-300">{character.currency?.gold ?? 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-blue-400">XP Earned</span>
                <span className="font-bold text-blue-300">{totalXPEarned}</span>
              </div>
            </div>

            {/* Quest log */}
            {questLog.length > 0 && (
              <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3">
                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Quests</div>
                <div className="space-y-1.5">
                  {questLog.map((quest) => (
                    <div key={quest.id} className={`text-xs ${quest.isComplete ? 'text-gray-600 line-through' : 'text-gray-300'}`}>
                      {quest.isComplete ? '&#x2714; ' : '&#x25CB; '}{quest.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* End adventure */}
            <button
              onClick={() => {
                if (window.confirm('End this adventure? Your progress will be lost.')) {
                  useAdventureStore.getState().endAdventure()
                  navigate(`/character/${character.id}`)
                }
              }}
              className="w-full px-3 py-2 bg-gray-800 text-gray-500 text-xs rounded-lg border border-gray-700 hover:border-red-700 hover:text-red-400 transition-colors"
            >
              End Adventure
            </button>
          </div>
        )}

        {/* Sidebar toggle when hidden */}
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="absolute right-2 top-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400 hover:text-white transition-colors hidden lg:block"
          >
            Show Panel
          </button>
        )}
      </div>
    </div>
  )
}
