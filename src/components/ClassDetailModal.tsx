import { useEffect } from 'react'
import type { Class } from '../types'

interface ClassDetailModalProps {
  classData: Class
  isOpen: boolean
  onClose: () => void
}

/**
 * Format ability name for display
 */
function formatAbilityName(key: string): string {
  const names: Record<string, string> = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  }
  return names[key] || key
}

/**
 * Get spellcasting label
 */
function getSpellcastingLabel(type: Class['spellcasting']): string | null {
  switch (type) {
    case 'full':
      return 'Full Caster'
    case 'half':
      return 'Half Caster'
    case 'third':
      return 'Third Caster'
    case 'pact':
      return 'Pact Magic'
    default:
      return null
  }
}

/**
 * Class Detail Modal Component
 * Full-screen modal with comprehensive class information
 */
export function ClassDetailModal({ classData, isOpen, onClose }: ClassDetailModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const spellcastingLabel = getSpellcastingLabel(classData.spellcasting)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-gray-900 rounded-2xl border border-dnd-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Class name and info */}
          <div>
            <h2 className="text-4xl font-bold text-dnd-gold mb-2">{classData.name}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {spellcastingLabel && (
                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-sm font-semibold rounded-full">
                  {spellcastingLabel}
                </span>
              )}
              {classData.spellcasting === 'none' && (
                <span className="px-3 py-1 bg-red-900/30 text-red-400 text-sm font-semibold rounded-full">
                  Martial
                </span>
              )}
              <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-semibold rounded-full">
                Hit Die: {classData.hitDie.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Primary Abilities: {classData.primaryAbility.map((a) => formatAbilityName(a)).join(' / ')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 overflow-x-hidden">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{classData.hitDie.toUpperCase()}</div>
              <div className="text-xs text-gray-500 uppercase">Hit Die</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{classData.skillChoices.choose}</div>
              <div className="text-xs text-gray-500 uppercase">Skill Choices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold uppercase">
                {classData.savingThrows.map((s) => s.slice(0, 3)).join(' & ')}
              </div>
              <div className="text-xs text-gray-500 uppercase">Saving Throws</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{classData.subclassLevel}</div>
              <div className="text-xs text-gray-500 uppercase">{classData.subclassName} Level</div>
            </div>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Overview
            </h3>
            <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <p className="text-gray-300 leading-relaxed break-words">{classData.description}</p>
            </div>
          </section>

          {/* Proficiencies */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Proficiencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/30 rounded-xl">
                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Armor</h4>
                <p className="text-gray-300 capitalize break-words">
                  {classData.armorProficiencies.join(', ') || 'None'}
                </p>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-xl">
                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Weapons</h4>
                <p className="text-gray-300 capitalize break-words">
                  {classData.weaponProficiencies.join(', ') || 'None'}
                </p>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-xl md:col-span-2">
                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Skills (Choose {classData.skillChoices.choose})
                </h4>
                <p className="text-gray-300 capitalize break-words">
                  {classData.skillChoices.from.map((s) => s.replace(/([A-Z])/g, ' $1').trim()).join(', ')}
                </p>
              </div>
            </div>
          </section>

          {/* Class Features */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Class Features
            </h3>
            <div className="space-y-3">
              {classData.features.map((feature) => (
                <div key={feature.id} className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-dnd-gold break-words">{feature.name}</h4>
                      <span className="text-xs text-gray-500">Gained at level {feature.level}</span>
                    </div>
                    {feature.charges && (
                      <span className="text-sm text-purple-400">
                        {typeof feature.charges.amount === 'number' ? feature.charges.amount : feature.charges.amount} / {feature.charges.rechargeOn}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 break-words">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fighting Styles (if applicable) */}
          {classData.fightingStyles && classData.fightingStyles.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Fighting Styles
              </h3>
              <div className="space-y-3">
                {classData.fightingStyles.map((style) => (
                  <div key={style.id} className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-2 break-words">{style.name}</h4>
                    <p className="text-gray-300 break-words">{style.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Spellcasting Info */}
          {classData.spellcasting !== 'none' && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Spellcasting
              </h3>
              <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400 font-semibold">{spellcastingLabel}</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {classData.spellcasting === 'full' && 'This class has access to the full spell progression table, learning powerful spells at higher levels.'}
                  {classData.spellcasting === 'half' && 'This class has access to half-caster spell progression, balancing martial prowess with magical abilities.'}
                  {classData.spellcasting === 'third' && 'This class has access to third-caster spell progression, supplementing combat abilities with limited magic.'}
                  {classData.spellcasting === 'pact' && 'This class uses Pact Magic, with fewer spell slots that recharge on short rests, allowing for frequent casting.'}
                </p>
                {classData.cantripsKnown && classData.cantripsKnown.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-800/50 rounded">
                    <span className="text-xs text-gray-500 uppercase">Cantrips Known at Level 1: </span>
                    <span className="text-white font-medium">{classData.cantripsKnown[0]}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Close Button */}
          <div className="pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-dnd-gold text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
