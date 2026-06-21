import type { Character } from '../types'
import type { GameState, ConversationEntry, GameAction, CombatEnemy } from '../types/adventure'
import { buildCharacterSummary } from '../utils/adventureCombat'

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'
const MAX_CONTEXT_MESSAGES = 40

interface DMResponse {
  narrative: string
  actions: GameAction[]
}

function buildSystemPrompt(character: Character, gameState: GameState, location: string): string {
  const charSummary = buildCharacterSummary(character)

  return `You are the Dungeon Master for a D&D 5th Edition (2024 rules) text adventure. You guide the player through an immersive, reactive world.

## Your Role
- Narrate in second person ("You see...", "You walk into...")
- Be vivid but concise — 2-4 paragraphs per response
- React to ANYTHING the player does — there are no wrong actions
- Balance combat, exploration, roleplay, and downtime naturally
- Create memorable NPCs with distinct personalities
- The world should feel alive and responsive

## The Player's Character
${charSummary}

## Current State
- Game State: ${gameState}
- Location: ${location}

## Combat Rules
When combat happens, you MUST include structured enemy data. Use this exact JSON format in your response, wrapped in <game_actions> tags:

<game_actions>
[{"type": "combat_start", "enemies": [{"name": "Goblin", "ac": 13, "maxHP": 7, "attackBonus": 4, "damage": "1d6+2", "damageType": "slashing"}]}]
</game_actions>

## Action Tags
Always include a <game_actions> block when game mechanics are involved. Available action types:

- combat_start: Start combat with enemies (include name, ac, maxHP, attackBonus, damage, damageType for each)
- combat_end: End combat (include victory: true/false, xpReward)
- damage: Deal damage to player (include amount, damageType)
- heal: Heal the player (include amount)
- skill_check: Request a skill check (include skill name, dc, ability)
- saving_throw: Request a saving throw (include ability, dc)
- loot: Award loot (include gold amount and/or item names)
- condition_add: Apply a condition (include condition name)
- condition_remove: Remove a condition
- rest_opportunity: Offer a rest (include restType: "short" or "long")
- state_change: Change game state (exploring, combat, dialogue, rest, shopping)
- location_change: Move to a new location (include location name, description)

If no game mechanics are involved, include an empty actions array:
<game_actions>[]</game_actions>

## Important Guidelines
- NEVER decide the outcome of player dice rolls — the system handles that
- When a skill check or save is needed, request it via game_actions and WAIT for the result
- Scale difficulty to the character's level (${character.level})
- Keep track of narrative continuity
- If the player is at low HP, create tension but give fair chances to recover
- Death should be possible but never arbitrary — always give the player agency
- When the player rests, note it but the system handles HP/slot recovery
- Be creative with treasure and encounters — surprise the player!

## Starting the Adventure
If this is the beginning, introduce the setting with atmosphere and give the player a clear hook — something to investigate, someone to talk to, or danger approaching. Let the player choose their first action.`
}

function parseGameActions(text: string): { narrative: string; actions: GameAction[] } {
  const actionMatch = text.match(/<game_actions>\s*([\s\S]*?)\s*<\/game_actions>/)
  const narrative = text.replace(/<game_actions>[\s\S]*?<\/game_actions>/g, '').trim()

  if (!actionMatch) {
    return { narrative, actions: [] }
  }

  try {
    const raw = JSON.parse(actionMatch[1]) as Record<string, unknown>[]
    const actions: GameAction[] = []

    for (const action of raw) {
      switch (action.type) {
        case 'combat_start': {
          const enemies = (action.enemies as Record<string, unknown>[]).map(
            (e, i): CombatEnemy => ({
              id: `enemy-${Date.now()}-${i}`,
              name: String(e.name ?? 'Enemy'),
              ac: Number(e.ac ?? 12),
              maxHP: Number(e.maxHP ?? 10),
              currentHP: Number(e.maxHP ?? 10),
              initiative: Math.floor(Math.random() * 20) + 1,
              attackBonus: Number(e.attackBonus ?? 3),
              damage: String(e.damage ?? '1d6'),
              damageType: String(e.damageType ?? 'slashing'),
              conditions: [],
              isActive: true,
            }),
          )
          actions.push({ type: 'combat_start', enemies })
          break
        }
        case 'combat_end':
          actions.push({
            type: 'combat_end',
            victory: Boolean(action.victory),
            xpReward: Number(action.xpReward ?? 0),
          })
          break
        case 'damage':
          actions.push({
            type: 'damage',
            target: String(action.target ?? 'player'),
            amount: Number(action.amount ?? 0),
            damageType: String(action.damageType ?? 'bludgeoning'),
          })
          break
        case 'heal':
          actions.push({
            type: 'heal',
            target: String(action.target ?? 'player'),
            amount: Number(action.amount ?? 0),
          })
          break
        case 'skill_check':
          actions.push({
            type: 'skill_check',
            skill: String(action.skill ?? 'perception'),
            dc: Number(action.dc ?? 10),
            ability: String(action.ability ?? 'wisdom'),
          })
          break
        case 'saving_throw':
          actions.push({
            type: 'saving_throw',
            ability: String(action.ability ?? 'dexterity'),
            dc: Number(action.dc ?? 13),
          })
          break
        case 'loot':
          actions.push({
            type: 'loot',
            gold: action.gold != null ? Number(action.gold) : undefined,
            items: Array.isArray(action.items) ? action.items.map(String) : undefined,
          })
          break
        case 'condition_add':
          actions.push({
            type: 'condition_add',
            condition: String(action.condition ?? 'poisoned') as any,
            target: String(action.target ?? 'player'),
          })
          break
        case 'condition_remove':
          actions.push({
            type: 'condition_remove',
            condition: String(action.condition) as any,
            target: String(action.target ?? 'player'),
          })
          break
        case 'rest_opportunity':
          actions.push({
            type: 'rest_opportunity',
            restType: action.restType === 'long' ? 'long' : 'short',
          })
          break
        case 'state_change':
          actions.push({
            type: 'state_change',
            newState: String(action.newState ?? 'exploring') as GameState,
          })
          break
        case 'location_change':
          actions.push({
            type: 'location_change',
            location: String(action.location ?? 'Unknown'),
            description: action.description ? String(action.description) : undefined,
          })
          break
        case 'use_spell_slot':
          actions.push({ type: 'use_spell_slot', level: Number(action.level ?? 1) })
          break
      }
    }

    return { narrative, actions }
  } catch {
    return { narrative, actions: [] }
  }
}

function trimContext(history: ConversationEntry[]): ConversationEntry[] {
  if (history.length <= MAX_CONTEXT_MESSAGES) return history
  return history.slice(-MAX_CONTEXT_MESSAGES)
}

export async function sendToAIDM(
  apiKey: string,
  character: Character,
  gameState: GameState,
  location: string,
  conversationHistory: ConversationEntry[],
  playerMessage: string,
  onStream?: (chunk: string) => void,
): Promise<DMResponse> {
  const systemPrompt = buildSystemPrompt(character, gameState, location)
  const trimmed = trimContext(conversationHistory)

  const messages = [
    ...trimmed.map((entry) => ({
      role: entry.role as 'user' | 'assistant',
      content: entry.content,
    })),
    { role: 'user' as const, content: playerMessage },
  ]

  if (onStream) {
    return streamResponse(apiKey, systemPrompt, messages, onStream)
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`AI DM error (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text ?? ''
  return parseGameActions(text)
}

async function streamResponse(
  apiKey: string,
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  onStream: (chunk: string) => void,
): Promise<DMResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages,
      stream: true,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`AI DM error (${response.status}): ${errorText}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('No response body')

  const decoder = new TextDecoder()
  let fullText = ''
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') continue

      try {
        const parsed = JSON.parse(data)
        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
          const chunk = parsed.delta.text
          fullText += chunk
          const cleanChunk = chunk.replace(/<game_actions>[\s\S]*?<\/game_actions>/g, '')
          if (cleanChunk) onStream(cleanChunk)
        }
      } catch {
        // Skip non-JSON lines
      }
    }
  }

  return parseGameActions(fullText)
}

export function buildCombatContext(
  gameState: GameState,
  combatState: { enemies: CombatEnemy[]; round: number; isPlayerTurn: boolean } | null,
): string {
  if (gameState !== 'combat' || !combatState) return ''

  const enemyStatus = combatState.enemies
    .filter((e) => e.isActive)
    .map((e) => `${e.name}: ${e.currentHP}/${e.maxHP} HP, AC ${e.ac}${e.conditions.length > 0 ? ` [${e.conditions.join(', ')}]` : ''}`)
    .join('\n')

  return `\n\n[COMBAT - Round ${combatState.round}]\nEnemies:\n${enemyStatus}\nIt is ${combatState.isPlayerTurn ? 'the player\'s' : 'the enemies\''} turn.`
}
