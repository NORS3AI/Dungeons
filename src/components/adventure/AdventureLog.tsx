import { useEffect, useRef } from 'react'
import type { AdventureMessage } from '../../types/adventure'

interface AdventureLogProps {
  messages: AdventureMessage[]
  streamingText: string
  isAIResponding: boolean
}

function RollDisplay({ rollData }: { rollData: AdventureMessage['rollData'] }) {
  if (!rollData) return null

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-mono ${
      rollData.critical ? 'bg-yellow-900/40 border-yellow-600 text-yellow-300' :
      rollData.fumble ? 'bg-red-900/40 border-red-600 text-red-300' :
      rollData.success ? 'bg-green-900/40 border-green-700 text-green-300' :
      rollData.success === false ? 'bg-red-900/30 border-red-800 text-red-400' :
      'bg-gray-700/50 border-gray-600 text-gray-300'
    }`}>
      <span className="text-xs text-gray-500">{rollData.label}</span>
      <span className="font-bold">{rollData.notation}</span>
      <span className="text-gray-500">→</span>
      <span className="text-xs text-gray-400">[{rollData.rolls.join(', ')}]</span>
      {rollData.modifier !== 0 && (
        <span className="text-xs text-gray-400">
          {rollData.modifier >= 0 ? '+' : ''}{rollData.modifier}
        </span>
      )}
      <span className="text-gray-500">=</span>
      <span className={`font-bold text-lg ${
        rollData.critical ? 'text-yellow-300' :
        rollData.fumble ? 'text-red-400' :
        rollData.success ? 'text-green-300' :
        rollData.success === false ? 'text-red-400' :
        'text-white'
      }`}>
        {rollData.total}
      </span>
      {rollData.critical && <span className="text-yellow-400 font-bold">CRIT!</span>}
      {rollData.fumble && <span className="text-red-400 font-bold">FUMBLE!</span>}
      {rollData.success !== undefined && !rollData.critical && !rollData.fumble && (
        <span className={rollData.success ? 'text-green-400' : 'text-red-400'}>
          {rollData.success ? 'Success' : 'Fail'}
        </span>
      )}
    </div>
  )
}

function MessageBubble({ message }: { message: AdventureMessage }) {
  if (message.role === 'roll') {
    return (
      <div className="flex justify-center my-2">
        <RollDisplay rollData={message.rollData} />
      </div>
    )
  }

  if (message.role === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="px-4 py-2 bg-blue-900/20 border border-blue-800/50 rounded-lg text-sm text-blue-300 italic max-w-lg text-center">
          {message.content}
        </div>
      </div>
    )
  }

  if (message.role === 'player') {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[80%] px-4 py-3 bg-blue-700/30 border border-blue-600/50 rounded-xl rounded-br-sm text-white">
          {message.content}
        </div>
      </div>
    )
  }

  // DM message
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[85%]">
        <div className="text-xs text-dnd-gold font-bold mb-1 flex items-center gap-1.5">
          <span className="w-5 h-5 bg-dnd-gold/20 rounded-full flex items-center justify-center text-dnd-gold text-xs">D</span>
          Dungeon Master
        </div>
        <div className="px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl rounded-tl-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  )
}

export function AdventureLog({ messages, streamingText, isAIResponding }: AdventureLogProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-1"
    >
      {messages.length === 0 && !isAIResponding && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-6xl mb-4">&#x2694;&#xFE0F;</div>
          <h2 className="text-2xl font-bold text-dnd-gold mb-2">Your Adventure Awaits</h2>
          <p className="text-gray-500 max-w-md">
            The Dungeon Master is preparing your story. Type anything to begin your journey.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Streaming response */}
      {isAIResponding && streamingText && (
        <div className="flex justify-start mb-3">
          <div className="max-w-[85%]">
            <div className="text-xs text-dnd-gold font-bold mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-dnd-gold/20 rounded-full flex items-center justify-center text-dnd-gold text-xs">D</span>
              Dungeon Master
            </div>
            <div className="px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl rounded-tl-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {streamingText}
              <span className="inline-block w-2 h-4 bg-dnd-gold/70 animate-pulse ml-0.5" />
            </div>
          </div>
        </div>
      )}

      {/* Typing indicator */}
      {isAIResponding && !streamingText && (
        <div className="flex justify-start mb-3">
          <div className="max-w-[85%]">
            <div className="text-xs text-dnd-gold font-bold mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-dnd-gold/20 rounded-full flex items-center justify-center text-dnd-gold text-xs">D</span>
              Dungeon Master
            </div>
            <div className="px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl rounded-tl-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-dnd-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-dnd-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-dnd-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}
