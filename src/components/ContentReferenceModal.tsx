import { useEffect } from 'react'

interface ContentReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'class' | 'race' | null
  name: string | null
}

// Class information database
const CLASS_INFO: Record<string, { description: string; hitDie: string; primaryAbility: string; saves: string; features: string[] }> = {
  Barbarian: {
    description: 'A fierce warrior of primitive background who can enter a battle rage.',
    hitDie: 'd12',
    primaryAbility: 'Strength',
    saves: 'Strength & Constitution',
    features: ['Rage', 'Unarmored Defense', 'Reckless Attack', 'Danger Sense', 'Extra Attack', 'Fast Movement'],
  },
  Bard: {
    description: 'An inspiring magician whose power echoes the music of creation.',
    hitDie: 'd8',
    primaryAbility: 'Charisma',
    saves: 'Dexterity & Charisma',
    features: ['Spellcasting', 'Bardic Inspiration', 'Jack of All Trades', 'Song of Rest', 'Expertise', 'Font of Inspiration'],
  },
  Cleric: {
    description: 'A priestly champion who wields divine magic in service of a higher power.',
    hitDie: 'd8',
    primaryAbility: 'Wisdom',
    saves: 'Wisdom & Charisma',
    features: ['Spellcasting', 'Divine Domain', 'Channel Divinity', 'Destroy Undead', 'Divine Intervention'],
  },
  Druid: {
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    hitDie: 'd8',
    primaryAbility: 'Wisdom',
    saves: 'Intelligence & Wisdom',
    features: ['Spellcasting', 'Wild Shape', 'Druid Circle', 'Timeless Body', 'Beast Spells'],
  },
  Fighter: {
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 'd10',
    primaryAbility: 'Strength or Dexterity',
    saves: 'Strength & Constitution',
    features: ['Fighting Style', 'Second Wind', 'Action Surge', 'Extra Attack', 'Indomitable'],
  },
  Monk: {
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
    hitDie: 'd8',
    primaryAbility: 'Dexterity & Wisdom',
    saves: 'Strength & Dexterity',
    features: ['Unarmored Defense', 'Martial Arts', 'Ki', 'Unarmored Movement', 'Deflect Missiles', 'Stunning Strike'],
  },
  Paladin: {
    description: 'A holy warrior bound to a sacred oath, wielding divine magic and martial prowess.',
    hitDie: 'd10',
    primaryAbility: 'Strength & Charisma',
    saves: 'Wisdom & Charisma',
    features: ['Divine Sense', 'Lay on Hands', 'Fighting Style', 'Spellcasting', 'Divine Smite', 'Sacred Oath'],
  },
  Ranger: {
    description: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity & Wisdom',
    saves: 'Strength & Dexterity',
    features: ['Favored Enemy', 'Natural Explorer', 'Fighting Style', 'Spellcasting', "Hunter's Mark", 'Extra Attack'],
  },
  Rogue: {
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    hitDie: 'd8',
    primaryAbility: 'Dexterity',
    saves: 'Dexterity & Intelligence',
    features: ['Expertise', 'Sneak Attack', 'Cunning Action', 'Uncanny Dodge', 'Evasion', 'Reliable Talent'],
  },
  Sorcerer: {
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
    hitDie: 'd6',
    primaryAbility: 'Charisma',
    saves: 'Constitution & Charisma',
    features: ['Spellcasting', 'Sorcerous Origin', 'Font of Magic', 'Metamagic', 'Sorcerous Restoration'],
  },
  Warlock: {
    description: 'A wielder of magic derived from a bargain with an extraplanar entity.',
    hitDie: 'd8',
    primaryAbility: 'Charisma',
    saves: 'Wisdom & Charisma',
    features: ['Otherworldly Patron', 'Pact Magic', 'Eldritch Invocations', 'Pact Boon', 'Mystic Arcanum'],
  },
  Wizard: {
    description: 'A scholarly magic-user capable of manipulating the structures of reality.',
    hitDie: 'd6',
    primaryAbility: 'Intelligence',
    saves: 'Intelligence & Wisdom',
    features: ['Spellcasting', 'Arcane Recovery', 'Arcane Tradition', 'Spell Mastery', 'Signature Spells'],
  },
  'Death Knight': {
    description: 'A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.',
    hitDie: 'd10',
    primaryAbility: 'Strength & Constitution',
    saves: 'Strength & Constitution',
    features: ['Runic Power', 'Rune Weapon', 'Death Strike', 'Anti-Magic Shell', 'Raise Dead'],
  },
  Necromancer: {
    description: 'Master of the dark arts who commands undead minions and wields devastating curse magic.',
    hitDie: 'd6',
    primaryAbility: 'Intelligence',
    saves: 'Intelligence & Wisdom',
    features: ['Essence', 'Raise Skeleton', 'Bone Spear', 'Corpse Explosion', 'Army of the Dead'],
  },
  'Demon Hunter': {
    description: 'A relentless slayer who sacrificed part of their humanity to gain demonic powers.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity',
    saves: 'Dexterity & Charisma',
    features: ['Spectral Sight', 'Fel Rush', 'Metamorphosis', 'Blade Dance', 'Demonic Wards'],
  },
  Amazon: {
    description: 'A warrior from the Skovos Isles, master of javelin, bow, and spear combat with elemental magic.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity & Strength',
    saves: 'Dexterity & Wisdom',
    features: ['Fighting Style', 'Power Strike', 'Lightning Fury', 'Dodge', 'Valkyrie'],
  },
}

// Race information database
const RACE_INFO: Record<string, { description: string; size: string; speed: string; traits: string[] }> = {
  Human: {
    description: 'Versatile and ambitious, humans are the most adaptable and driven of the common races.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Ability Score Increase (+1 to all)', 'Extra Language', 'Skills Versatility'],
  },
  Elf: {
    description: 'Graceful and long-lived, elves are masters of magic and marksmanship.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Darkvision (60 ft)', 'Keen Senses', 'Fey Ancestry', 'Trance'],
  },
  Dwarf: {
    description: 'Bold and hardy, dwarves are skilled warriors, miners, and workers of stone and metal.',
    size: 'Medium',
    speed: '25 feet',
    traits: ['Darkvision (60 ft)', 'Dwarven Resilience', 'Dwarven Combat Training', 'Stonecunning'],
  },
  Halfling: {
    description: 'Small and practical, halflings are adept at fitting into communities of other races.',
    size: 'Small',
    speed: '25 feet',
    traits: ['Lucky', 'Brave', 'Halfling Nimbleness', 'Naturally Stealthy'],
  },
  Gnome: {
    description: 'Energetic and inventive, gnomes are tinkerers and explorers with a zest for life.',
    size: 'Small',
    speed: '25 feet',
    traits: ['Darkvision (60 ft)', 'Gnome Cunning', 'Natural Illusionist', 'Speak with Small Beasts'],
  },
  'Half-Elf': {
    description: 'Walking in two worlds but belonging to neither, half-elves combine human and elven traits.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Darkvision (60 ft)', 'Fey Ancestry', 'Skill Versatility', 'Ability Score Increase'],
  },
  'Half-Orc': {
    description: 'Born of human and orc heritage, half-orcs possess remarkable strength and endurance.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Darkvision (60 ft)', 'Menacing', 'Relentless Endurance', 'Savage Attacks'],
  },
  Tiefling: {
    description: 'Bearing an infernal bloodline, tieflings are often met with suspicion but possess innate magic.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Darkvision (60 ft)', 'Hellish Resistance', 'Infernal Legacy', 'Fire Resistance'],
  },
  Dragonborn: {
    description: 'Proud dragon-kin who walk as humanoids, breathing destructive energy.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance', 'Draconic Language'],
  },
  Drow: {
    description: 'Dark elves from the Underdark, wielding innate magic and superior darkvision.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Superior Darkvision (120 ft)', 'Sunlight Sensitivity', 'Drow Magic', 'Drow Weapon Training'],
  },
  Aasimar: {
    description: 'Mortals touched by celestial power, aasimar are guided by divine beings.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Darkvision (60 ft)', 'Celestial Resistance', 'Healing Hands', 'Light Bearer'],
  },
  Goliath: {
    description: 'Towering mountain dwellers known for their strength and competitive nature.',
    size: 'Medium',
    speed: '30 feet',
    traits: ["Stone's Endurance", "Powerful Build", 'Mountain Born', 'Natural Athlete'],
  },
  Tabaxi: {
    description: 'Feline humanoids driven by curiosity and wanderlust.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Darkvision (60 ft)', 'Feline Agility', "Cat's Claws", "Cat's Talent"],
  },
  Kenku: {
    description: 'Cursed bird-folk who have lost their wings and their voices.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Expert Forgery', 'Kenku Training', 'Mimicry', 'Cursed by the Gods'],
  },
  Firbolg: {
    description: 'Gentle forest guardians with innate magic and a connection to nature.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Firbolg Magic', 'Hidden Step', 'Powerful Build', 'Speech of Beast and Leaf'],
  },
  Lizardfolk: {
    description: 'Reptilian humanoids with alien thought processes and natural weapons.',
    size: 'Medium',
    speed: '30 feet (swim 30 feet)',
    traits: ['Bite', 'Hold Breath', 'Natural Armor', "Hunter's Lore"],
  },
  Triton: {
    description: 'Aquatic guardians from the Elemental Plane of Water.',
    size: 'Medium',
    speed: '30 feet (swim 30 feet)',
    traits: ['Amphibious', 'Control Air and Water', 'Emissary of the Sea', 'Guardians of the Depths'],
  },
  Tortle: {
    description: 'Turtle-like humanoids with natural armor and a contemplative nature.',
    size: 'Medium',
    speed: '30 feet',
    traits: ['Natural Armor', 'Shell Defense', 'Hold Breath', 'Survival Instinct'],
  },
}

export function ContentReferenceModal({ isOpen, onClose, type, name }: ContentReferenceModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !type || !name) return null

  const classInfo = type === 'class' ? CLASS_INFO[name] : null
  const raceInfo = type === 'race' ? RACE_INFO[name] : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700
                   animate-in fade-in slide-in-from-bottom-4 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reference-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <div className="flex items-center gap-3">
              <h2 id="reference-title" className="text-3xl font-bold text-gold-500">
                {name}
              </h2>
              {type === 'class' && ['Death Knight', 'Necromancer', 'Demon Hunter', 'Amazon'].includes(name) && (
                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-sm rounded font-medium border border-purple-500/30">
                  Custom Class
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {type === 'class' ? (
                ['Death Knight', 'Necromancer', 'Demon Hunter', 'Amazon'].includes(name)
                  ? 'Custom Character Class (WoW/Diablo)'
                  : 'PHB 2024 Character Class'
              ) : (
                'Playable Race'
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700
                     transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="Close reference"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {classInfo && (
            <>
              <div>
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "{classInfo.description}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Hit Die</div>
                  <div className="text-2xl font-bold text-gold-400">{classInfo.hitDie}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Primary Ability</div>
                  <div className="text-lg font-semibold text-white">{classInfo.primaryAbility}</div>
                </div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Saving Throw Proficiencies</div>
                <div className="text-lg font-semibold text-white">{classInfo.saves}</div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gold-500 mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  Key Features
                </h3>
                <div className="grid gap-2">
                  {classInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700
                               hover:border-gold-500/50 transition-colors"
                    >
                      <span className="text-gold-500">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {raceInfo && (
            <>
              <div>
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "{raceInfo.description}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Size</div>
                  <div className="text-lg font-semibold text-white">{raceInfo.size}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Speed</div>
                  <div className="text-lg font-semibold text-white">{raceInfo.speed}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gold-500 mb-3 flex items-center gap-2">
                  <span>✨</span>
                  Racial Traits
                </h3>
                <div className="grid gap-2">
                  {raceInfo.traits.map((trait, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700
                               hover:border-gold-500/50 transition-colors"
                    >
                      <span className="text-gold-500">•</span>
                      <span className="text-gray-300">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-gold-600 to-yellow-600 text-white font-semibold rounded-lg
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
