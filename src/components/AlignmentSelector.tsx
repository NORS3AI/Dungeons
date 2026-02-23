import { useState } from 'react'
import type { Alignment } from '../types'
import { ScrollNavigation } from './ScrollNavigation'

interface AlignmentSelectorProps {
  initialAlignment?: Alignment | null
  onSelect: (alignment: Alignment) => void
  onBack: () => void
}

/**
 * Alignment configuration with colors, examples, and descriptions
 */
const ALIGNMENT_CONFIG: Record<Alignment, {
  name: string
  shortName: string
  color: string
  borderColor: string
  hoverColor: string
  example: string
  description: string
}> = {
  'lawful-good': {
    name: 'Lawful Good',
    shortName: 'LG',
    color: 'bg-blue-900/40',
    borderColor: 'border-blue-500',
    hoverColor: 'hover:bg-blue-800/50',
    example: 'A knight who follows a strict code of honor',
    description: 'Act with compassion and honor within the law. Believes in order and goodness.',
  },
  'neutral-good': {
    name: 'Neutral Good',
    shortName: 'NG',
    color: 'bg-cyan-900/40',
    borderColor: 'border-cyan-500',
    hoverColor: 'hover:bg-cyan-800/50',
    example: 'A healer who helps anyone in need',
    description: 'Do the best that a good person can do. Values goodness above all else.',
  },
  'chaotic-good': {
    name: 'Chaotic Good',
    shortName: 'CG',
    color: 'bg-sky-900/40',
    borderColor: 'border-sky-500',
    hoverColor: 'hover:bg-sky-800/50',
    example: 'A rebel fighting against tyranny',
    description: 'Act with kindness and freedom. Follows your conscience regardless of laws.',
  },
  'lawful-neutral': {
    name: 'Lawful Neutral',
    shortName: 'LN',
    color: 'bg-slate-900/40',
    borderColor: 'border-slate-500',
    hoverColor: 'hover:bg-slate-800/50',
    example: 'A judge who follows the letter of the law',
    description: 'Act in accordance with law, tradition, or personal codes. Values order.',
  },
  'true-neutral': {
    name: 'True Neutral',
    shortName: 'N',
    color: 'bg-gray-900/40',
    borderColor: 'border-gray-500',
    hoverColor: 'hover:bg-gray-800/50',
    example: 'A druid maintaining natural balance',
    description: 'Act naturally without prejudice or compulsion. Seeks balance in all things.',
  },
  'chaotic-neutral': {
    name: 'Chaotic Neutral',
    shortName: 'CN',
    color: 'bg-amber-900/40',
    borderColor: 'border-amber-500',
    hoverColor: 'hover:bg-amber-800/50',
    example: 'A free spirit following whims and impulses',
    description: 'Follow your whims. Values personal freedom above all else.',
  },
  'lawful-evil': {
    name: 'Lawful Evil',
    shortName: 'LE',
    color: 'bg-red-950/50',
    borderColor: 'border-red-700',
    hoverColor: 'hover:bg-red-900/60',
    example: 'A tyrant who uses laws to oppress others',
    description: 'Methodically take what you want within a code of tradition. Values order and power.',
  },
  'neutral-evil': {
    name: 'Neutral Evil',
    shortName: 'NE',
    color: 'bg-rose-950/50',
    borderColor: 'border-rose-700',
    hoverColor: 'hover:bg-rose-900/60',
    example: 'A mercenary who kills for profit',
    description: 'Do whatever you can get away with. Values self-interest above all.',
  },
  'chaotic-evil': {
    name: 'Chaotic Evil',
    shortName: 'CE',
    color: 'bg-orange-950/50',
    borderColor: 'border-orange-700',
    hoverColor: 'hover:bg-orange-900/60',
    example: 'A demon spreading destruction and chaos',
    description: 'Act with arbitrary violence, spurred by greed, hatred, or bloodlust.',
  },
}

/**
 * Alignment grid layout (3x3)
 */
const ALIGNMENT_GRID: Alignment[][] = [
  ['lawful-good', 'neutral-good', 'chaotic-good'],
  ['lawful-neutral', 'true-neutral', 'chaotic-neutral'],
  ['lawful-evil', 'neutral-evil', 'chaotic-evil'],
]

/**
 * Alignment Selector Component
 * Interactive 3x3 grid for choosing character alignment
 */
export function AlignmentSelector({ initialAlignment, onSelect, onBack }: AlignmentSelectorProps) {
  const [selectedAlignment, setSelectedAlignment] = useState<Alignment | null>(initialAlignment || null)
  const [hoveredAlignment, setHoveredAlignment] = useState<Alignment | null>(null)

  const handleAlignmentSelect = (alignment: Alignment) => {
    setSelectedAlignment(alignment)
  }

  const handleSubmit = () => {
    if (selectedAlignment) {
      onSelect(selectedAlignment)
    }
  }

  const displayAlignment = hoveredAlignment || selectedAlignment

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Alignment</h2>
        <p className="text-gray-400">
          Alignment represents your character's moral and ethical outlook. It influences how you interact
          with the world and make decisions.
        </p>
      </div>

      {/* Alignment Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {ALIGNMENT_GRID.map((row, rowIdx) => (
            row.map((alignment) => {
              const config = ALIGNMENT_CONFIG[alignment]
              const isSelected = selectedAlignment === alignment
              const isHovered = hoveredAlignment === alignment

              return (
                <button
                  key={alignment}
                  onClick={() => handleAlignmentSelect(alignment)}
                  onMouseEnter={() => setHoveredAlignment(alignment)}
                  onMouseLeave={() => setHoveredAlignment(null)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-200
                    ${config.color} ${config.borderColor} ${config.hoverColor}
                    ${isSelected ? 'ring-4 ring-dnd-gold ring-opacity-50 scale-105' : 'scale-100'}
                    ${isHovered ? 'scale-105' : ''}
                    focus:outline-none focus:ring-2 focus:ring-dnd-gold
                  `}
                >
                  {/* Alignment Short Name Badge */}
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs font-mono font-bold text-gray-300">
                      {config.shortName}
                    </span>
                  </div>

                  {/* Alignment Name */}
                  <h3 className="text-lg font-bold text-white text-center mb-2">
                    {config.name}
                  </h3>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-dnd-gold text-2xl">
                      ✓
                    </div>
                  )}
                </button>
              )
            })
          ))}
        </div>

        {/* Axis Labels */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-500 mb-2">
          <div>Lawful</div>
          <div>Neutral</div>
          <div>Chaotic</div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 px-4">
          <div className="transform -rotate-90 origin-center">Good</div>
          <div className="transform -rotate-90 origin-center">Neutral</div>
          <div className="transform -rotate-90 origin-center">Evil</div>
        </div>
      </div>

      {/* Selected Alignment Details */}
      {displayAlignment && (
        <div className={`
          mb-8 p-6 rounded-xl border-2 transition-all duration-200
          ${ALIGNMENT_CONFIG[displayAlignment].color}
          ${ALIGNMENT_CONFIG[displayAlignment].borderColor}
        `}>
          <h3 className="text-2xl font-bold text-dnd-gold mb-3">
            {ALIGNMENT_CONFIG[displayAlignment].name}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-4 text-lg">
            {ALIGNMENT_CONFIG[displayAlignment].description}
          </p>

          {/* Example */}
          <div className="p-4 bg-black/20 rounded-lg border border-white/10">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Example Character:
            </span>
            <p className="text-white mt-1">
              {ALIGNMENT_CONFIG[displayAlignment].example}
            </p>
          </div>
        </div>
      )}

      {/* Alignment Philosophy */}
      {!displayAlignment && (
        <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-white mb-2">Understanding Alignment</h4>
          <p className="text-sm text-gray-400 mb-3">
            Alignment is a combination of two factors: one identifies morality (good, evil, or neutral),
            and the other describes attitudes toward society and order (lawful, chaotic, or neutral).
          </p>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li><span className="text-blue-400">Good</span> alignments help others and oppose evil</li>
            <li><span className="text-gray-400">Neutral</span> alignments balance between extremes</li>
            <li><span className="text-red-400">Evil</span> alignments harm others for personal gain</li>
            <li><span className="text-slate-400">Lawful</span> characters value order and tradition</li>
            <li><span className="text-amber-400">Chaotic</span> characters value freedom and change</li>
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-700">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                   hover:border-gray-500 rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-dnd-gold"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedAlignment}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       selectedAlignment
                         ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                         : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                     }`}
        >
          Next: Allocate Stats
        </button>
      </div>

      {/* New Player Tip */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="text-dnd-gold font-medium">New to D&D?</span>{' '}
          Your alignment is a guide for roleplaying, not a restriction. It can change based on your
          character's actions and experiences. Hover over each alignment to learn more!
        </p>
      </div>

      {/* Scroll Navigation */}
      <ScrollNavigation />
    </div>
  )
}
