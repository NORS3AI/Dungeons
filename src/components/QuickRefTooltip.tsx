import { useState, useEffect, useCallback } from 'react'
import {
  type SpellRef,
  type SkillRef,
  type AbilityRef,
  type WeaponRef,
  type ArmorRef,
  type ConditionRef,
  type TraitRef,
  type RuleRef,
  type RefType,
  getReference,
} from '../data/quickReference'

interface QuickRefTooltipProps {
  type: RefType
  id: string
  children: React.ReactNode
  className?: string
}

type AnyRef = SpellRef | SkillRef | AbilityRef | WeaponRef | ArmorRef | ConditionRef | TraitRef | RuleRef

/**
 * Get color scheme for different reference types
 */
function getTypeColors(type: RefType): { border: string; bg: string; accent: string } {
  switch (type) {
    case 'spell':
      return { border: 'border-purple-500', bg: 'bg-purple-900/20', accent: 'text-purple-400' }
    case 'skill':
      return { border: 'border-blue-500', bg: 'bg-blue-900/20', accent: 'text-blue-400' }
    case 'ability':
      return { border: 'border-green-500', bg: 'bg-green-900/20', accent: 'text-green-400' }
    case 'weapon':
      return { border: 'border-red-500', bg: 'bg-red-900/20', accent: 'text-red-400' }
    case 'armor':
      return { border: 'border-cyan-500', bg: 'bg-cyan-900/20', accent: 'text-cyan-400' }
    case 'condition':
      return { border: 'border-yellow-500', bg: 'bg-yellow-900/20', accent: 'text-yellow-400' }
    case 'trait':
      return { border: 'border-dnd-gold', bg: 'bg-dnd-gold/10', accent: 'text-dnd-gold' }
    case 'rule':
      return { border: 'border-emerald-500', bg: 'bg-emerald-900/20', accent: 'text-emerald-400' }
  }
}

/**
 * Render spell reference content
 */
function SpellContent({ spell }: { spell: SpellRef }) {
  return (
    <>
      <div className="text-sm text-gray-400 mb-3">
        {spell.level === 'cantrip' ? 'Cantrip' : `Level ${spell.level}`} {spell.school}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div><span className="text-gray-500">Casting Time:</span> <span className="text-white">{spell.castingTime}</span></div>
        <div><span className="text-gray-500">Range:</span> <span className="text-white">{spell.range}</span></div>
        <div className="col-span-2"><span className="text-gray-500">Components:</span> <span className="text-white">{spell.components}</span></div>
        <div className="col-span-2"><span className="text-gray-500">Duration:</span> <span className="text-white">{spell.duration}</span></div>
      </div>
      <p className="text-gray-300 text-sm">{spell.description}</p>
      {spell.higherLevels && (
        <p className="text-purple-300 text-sm mt-2 italic">{spell.higherLevels}</p>
      )}
    </>
  )
}

/**
 * Render skill reference content
 */
function SkillContent({ skill }: { skill: SkillRef }) {
  return (
    <>
      <div className="text-sm text-gray-400 mb-3 capitalize">
        {skill.ability} Skill
      </div>
      <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
      <div className="mt-2">
        <span className="text-xs text-gray-500 uppercase">Examples:</span>
        <ul className="mt-1 text-sm text-gray-400">
          {skill.examples.map((ex, i) => (
            <li key={i} className="flex items-center gap-1">
              <span className="text-blue-400">&#8226;</span> {ex}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

/**
 * Render ability reference content
 */
function AbilityContent({ ability }: { ability: AbilityRef }) {
  return (
    <>
      <div className="text-sm text-gray-400 mb-3">
        {ability.abbreviation}
      </div>
      <p className="text-gray-300 text-sm mb-3">{ability.description}</p>
      {ability.skills.length > 0 && (
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase">Associated Skills:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {ability.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      <div>
        <span className="text-xs text-gray-500 uppercase">Common Uses:</span>
        <ul className="mt-1 text-sm text-gray-400">
          {ability.commonUses.map((use, i) => (
            <li key={i} className="flex items-center gap-1">
              <span className="text-green-400">&#8226;</span> {use}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

/**
 * Render weapon reference content
 */
function WeaponContent({ weapon }: { weapon: WeaponRef }) {
  return (
    <>
      <div className="text-sm text-gray-400 mb-3 capitalize">
        {weapon.category} {weapon.type} Weapon
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div><span className="text-gray-500">Damage:</span> <span className="text-white">{weapon.damage} {weapon.damageType}</span></div>
        <div><span className="text-gray-500">Cost:</span> <span className="text-white">{weapon.cost}</span></div>
        <div><span className="text-gray-500">Weight:</span> <span className="text-white">{weapon.weight}</span></div>
      </div>
      {weapon.properties.length > 0 && (
        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase">Properties:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {weapon.properties.map((prop) => (
              <span key={prop} className="px-2 py-0.5 bg-red-900/30 text-red-300 text-xs rounded">
                {prop}
              </span>
            ))}
          </div>
        </div>
      )}
      {weapon.description && (
        <p className="text-gray-300 text-sm italic">{weapon.description}</p>
      )}
    </>
  )
}

/**
 * Render armor reference content
 */
function ArmorContent({ armor }: { armor: ArmorRef }) {
  return (
    <>
      <div className="text-sm text-gray-400 mb-3 capitalize">
        {armor.category} Armor
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div><span className="text-gray-500">AC:</span> <span className="text-white">{armor.ac}</span></div>
        <div><span className="text-gray-500">Cost:</span> <span className="text-white">{armor.cost}</span></div>
        <div><span className="text-gray-500">Weight:</span> <span className="text-white">{armor.weight}</span></div>
        {armor.strength && (
          <div><span className="text-gray-500">Str Required:</span> <span className="text-white">{armor.strength}</span></div>
        )}
      </div>
      <div className="flex gap-2 text-xs">
        {armor.stealthDisadvantage && (
          <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-300 rounded">Stealth Disadvantage</span>
        )}
      </div>
      {armor.description && (
        <p className="text-gray-300 text-sm italic mt-2">{armor.description}</p>
      )}
    </>
  )
}

/**
 * Render condition reference content
 */
function ConditionContent({ condition }: { condition: ConditionRef }) {
  return (
    <>
      <ul className="text-sm text-gray-300 space-y-2">
        {condition.effects.map((effect, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">&#8226;</span>
            <span>{effect}</span>
          </li>
        ))}
      </ul>
      {condition.endCondition && (
        <p className="text-gray-400 text-sm mt-3 italic">{condition.endCondition}</p>
      )}
    </>
  )
}

/**
 * Render trait reference content
 */
function TraitContent({ trait }: { trait: TraitRef }) {
  return (
    <>
      <div className="text-sm text-gray-400 mb-3">
        Source: {trait.source}
      </div>
      <p className="text-gray-300 text-sm mb-3">{trait.description}</p>
      {trait.mechanics && (
        <div className="p-2 bg-dnd-gold/10 rounded text-sm">
          <span className="text-dnd-gold font-medium">Mechanics: </span>
          <span className="text-gray-300">{trait.mechanics}</span>
        </div>
      )}
    </>
  )
}

/**
 * Render rule/game mechanics reference content
 */
function RuleContent({ rule }: { rule: RuleRef }) {
  const categoryColors: Record<string, string> = {
    spellcasting: 'text-purple-400',
    combat: 'text-red-400',
    rest: 'text-blue-400',
    movement: 'text-cyan-400',
    general: 'text-gray-400',
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs uppercase tracking-wide ${categoryColors[rule.category]}`}>
          {rule.category}
        </span>
      </div>
      <p className="text-emerald-300 text-sm font-medium mb-2">{rule.summary}</p>
      <p className="text-gray-300 text-sm mb-3">{rule.description}</p>

      {rule.table && (
        <div className="mb-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-emerald-900/30">
                {rule.table.headers.map((header, i) => (
                  <th key={i} className="px-2 py-1 text-left text-emerald-400 border border-emerald-800">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rule.table.rows.map((row, i) => (
                <tr key={i} className="hover:bg-emerald-900/20">
                  {row.map((cell, j) => (
                    <td key={j} className="px-2 py-1 text-gray-300 border border-emerald-800/50">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rule.examples && rule.examples.length > 0 && (
        <div className="mb-3">
          <div className="text-emerald-400 text-sm font-medium mb-1">Examples:</div>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            {rule.examples.map((example, i) => (
              <li key={i}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      {rule.relatedRules && rule.relatedRules.length > 0 && (
        <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-700">
          Related: {rule.relatedRules.join(', ')}
        </div>
      )}
    </>
  )
}

/**
 * Render content based on reference type
 */
function ReferenceContent({ type, data }: { type: RefType; data: AnyRef }) {
  switch (type) {
    case 'spell':
      return <SpellContent spell={data as SpellRef} />
    case 'skill':
      return <SkillContent skill={data as SkillRef} />
    case 'ability':
      return <AbilityContent ability={data as AbilityRef} />
    case 'weapon':
      return <WeaponContent weapon={data as WeaponRef} />
    case 'armor':
      return <ArmorContent armor={data as ArmorRef} />
    case 'condition':
      return <ConditionContent condition={data as ConditionRef} />
    case 'trait':
      return <TraitContent trait={data as TraitRef} />
    case 'rule':
      return <RuleContent rule={data as RuleRef} />
  }
}

/**
 * Quick Reference Tooltip Component
 * Wraps any content and shows a tooltip popup on click with D&D reference information
 */
export function QuickRefTooltip({ type, id, children, className = '' }: QuickRefTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<AnyRef | null>(null)

  const colors = getTypeColors(type)

  useEffect(() => {
    if (isOpen) {
      const refData = getReference(type, id)
      setData(refData)
    }
  }, [isOpen, type, id])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1 ${colors.accent} hover:underline cursor-pointer ${className}`}
      >
        {children}
        <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className={`relative bg-gray-900 ${colors.border} border-2 rounded-xl p-5 max-w-md w-full shadow-2xl max-h-[80vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {data ? (
              <>
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold ${colors.accent}`}>{data.name}</h3>
                  <button
                    onClick={handleClose}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ReferenceContent type={type} data={data} />
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>Reference not found: {id}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Inline Quick Reference Link
 * A simpler version that just styles the text as a clickable reference
 */
export function QuickRefLink({ type, id, children, className = '' }: QuickRefTooltipProps) {
  return (
    <QuickRefTooltip type={type} id={id} className={className}>
      {children}
    </QuickRefTooltip>
  )
}
