import { useState } from 'react'
import type { Background } from '../types/background'
import { QuickRefTooltip } from './QuickRefTooltip'

interface BackgroundCardProps {
  background: Background
  isSelected: boolean
  onSelect: (background: Background) => void
}

/**
 * Format skill name for display
 */
function formatSkillName(skill: string): string {
  const names: Record<string, string> = {
    'acrobatics': 'Acrobatics',
    'animal-handling': 'Animal Handling',
    'arcana': 'Arcana',
    'athletics': 'Athletics',
    'deception': 'Deception',
    'history': 'History',
    'insight': 'Insight',
    'intimidation': 'Intimidation',
    'investigation': 'Investigation',
    'medicine': 'Medicine',
    'nature': 'Nature',
    'perception': 'Perception',
    'performance': 'Performance',
    'persuasion': 'Persuasion',
    'religion': 'Religion',
    'sleight-of-hand': 'Sleight of Hand',
    'stealth': 'Stealth',
    'survival': 'Survival',
  }
  return names[skill] || skill.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Background Card Component
 * Displays a background option with visual styling, expandable lore, and clickable skills
 */
export function BackgroundCard({ background, isSelected, onSelect }: BackgroundCardProps) {
  const [showLore, setShowLore] = useState(false)
  const [showFeature, setShowFeature] = useState(false)

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowLore(!showLore)
  }

  const handleFeatureClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFeature(!showFeature)
  }

  return (
    <div
      onClick={() => onSelect(background)}
      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-900
                 ${
                   isSelected
                     ? 'border-dnd-gold bg-gray-800 shadow-lg shadow-dnd-gold/20'
                     : 'border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
                 }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(background)
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`text-xl font-bold ${isSelected ? 'text-dnd-gold' : 'text-white'}`}>
            {background.name}
          </h3>
        </div>
        {isSelected && (
          <div className="flex items-center justify-center w-6 h-6 bg-dnd-gold rounded-full">
            <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-3">{background.description}</p>

      {/* Read More Button */}
      <button
        onClick={handleReadMore}
        className="text-dnd-gold hover:text-yellow-400 text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
      >
        {showLore ? 'Show Less' : 'Read More'}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showLore ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Lore */}
      {showLore && (
        <div className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <h4 className="text-sm font-semibold text-dnd-gold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Story Lore
          </h4>
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2">
            {background.lore}
          </div>
        </div>
      )}

      {/* Skill Proficiencies - Clickable */}
      <div className="mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">Skills (click to learn more):</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {background.skillProficiencies.map((skill) => (
            <div
              key={skill}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 bg-purple-900/30 text-purple-300 text-sm font-medium rounded-lg border border-purple-800/50 hover:border-purple-500 transition-colors"
            >
              <QuickRefTooltip type="skill" id={skill}>
                {formatSkillName(skill)}
              </QuickRefTooltip>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Proficiencies or Languages */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
        {background.toolProficiencies && background.toolProficiencies.length > 0 && (
          <div>
            <span className="text-gray-500">Tools: </span>
            {background.toolProficiencies.map(t => t.replace(/-/g, ' ')).join(', ')}
          </div>
        )}
        {background.languages && background.languages > 0 && (
          <div>
            <span className="text-gray-500">Languages: </span>
            {background.languages} of your choice
          </div>
        )}
      </div>

      {/* Feature - Clickable for details */}
      <div className="pt-3 border-t border-gray-700">
        <button
          onClick={handleFeatureClick}
          className="w-full text-left hover:bg-gray-700/50 rounded-lg p-2 -m-2 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">Feature: </span>
              <span className="text-sm text-dnd-gold font-medium">{background.feature.name}</span>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showFeature ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Feature Description Expanded */}
        {showFeature && (
          <div className="mt-3 p-3 bg-dnd-gold/10 rounded-lg border border-dnd-gold/30">
            <p className="text-sm text-gray-300 leading-relaxed">
              {background.feature.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
