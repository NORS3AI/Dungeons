import { useEffect } from 'react'
import { QuickRefTooltip } from './QuickRefTooltip'

interface ContentReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'class' | 'race' | null
  name: string | null
}

interface ClassFeature {
  name: string
  id?: string // Optional ID for clickable features
}

interface ClassInfo {
  description: string
  hitDie: string
  primaryAbility: string
  saves: string
  features: ClassFeature[]
  spellcaster?: boolean
  sampleSpells?: string[] // Sample spell IDs to showcase
}

// Class information database
const CLASS_INFO: Record<string, ClassInfo> = {
  Barbarian: {
    description: 'A fierce warrior of primitive background who can enter a battle rage.',
    hitDie: 'd12',
    primaryAbility: 'Strength',
    saves: 'Strength & Constitution',
    features: [
      { name: 'Rage - Enter a fury that grants bonus damage and resistance to physical damage' },
      { name: 'Unarmored Defense - AC = 10 + DEX + CON when not wearing armor' },
      { name: 'Reckless Attack - Gain advantage on attacks but enemies get advantage on you' },
      { name: 'Danger Sense - Advantage on DEX saves you can see coming' },
      { name: 'Extra Attack - Attack twice with one Attack action' },
      { name: 'Fast Movement - +10 feet speed when not wearing heavy armor' },
    ],
  },
  Bard: {
    description: 'An inspiring magician whose power echoes the music of creation.',
    hitDie: 'd8',
    primaryAbility: 'Charisma',
    saves: 'Dexterity & Charisma',
    features: [
      { name: 'Spellcasting - Cast spells using Charisma' },
      { name: 'Bardic Inspiration - Grant allies a d6 bonus die they can add to rolls' },
      { name: 'Jack of All Trades - Add half proficiency to all ability checks' },
      { name: 'Song of Rest - Heal allies extra hit points during short rests' },
      { name: 'Expertise - Double proficiency bonus on two skills' },
      { name: 'Font of Inspiration - Regain Bardic Inspiration on short rest' },
    ],
    spellcaster: true,
    sampleSpells: ['vicious-mockery', 'healing-word', 'faerie-fire', 'shatter', 'hypnotic-pattern', 'polymorph', 'mass-cure-wounds'],
  },
  Cleric: {
    description: 'A priestly champion who wields divine magic in service of a higher power.',
    hitDie: 'd8',
    primaryAbility: 'Wisdom',
    saves: 'Wisdom & Charisma',
    features: [
      { name: 'Spellcasting - Prepare and cast divine spells using Wisdom' },
      { name: 'Divine Domain - Choose a deity domain (Life, Light, War, etc.)' },
      { name: 'Channel Divinity - Channel divine energy 1/short rest' },
      { name: 'Destroy Undead - Turn undead creatures, destroying low CR ones' },
      { name: 'Divine Intervention - Ask your deity to intervene on your behalf' },
    ],
    spellcaster: true,
    sampleSpells: ['sacred-flame', 'cure-wounds', 'guiding-bolt', 'spiritual-weapon', 'revivify', 'spirit-guardians', 'flame-strike'],
  },
  Druid: {
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    hitDie: 'd8',
    primaryAbility: 'Wisdom',
    saves: 'Intelligence & Wisdom',
    features: [
      { name: 'Spellcasting - Prepare and cast nature spells using Wisdom' },
      { name: 'Wild Shape - Transform into beasts you have seen' },
      { name: 'Druid Circle - Join Circle of the Land or Moon at level 2' },
      { name: 'Timeless Body - Age slower and cannot be magically aged' },
      { name: 'Beast Spells - Cast spells while in Wild Shape form' },
    ],
    spellcaster: true,
    sampleSpells: ['shillelagh', 'produce-flame', 'healing-word', 'spider-climb', 'conjure-elemental', 'polymorph', 'animal-shapes'],
  },
  Fighter: {
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 'd10',
    primaryAbility: 'Strength or Dexterity',
    saves: 'Strength & Constitution',
    features: [
      { name: 'Fighting Style - Choose archery, defense, dueling, or two-weapon fighting', id: 'fighting-style' },
      { name: 'Second Wind - Heal 1d10 + Fighter level as bonus action', id: 'second-wind' },
      { name: 'Action Surge - Take an additional action once per short rest', id: 'action-surge' },
      { name: 'Extra Attack - Attack twice (or more at higher levels) per action' },
      { name: 'Indomitable - Reroll a failed saving throw once per long rest' },
    ],
  },
  Monk: {
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
    hitDie: 'd8',
    primaryAbility: 'Dexterity & Wisdom',
    saves: 'Strength & Dexterity',
    features: [
      { name: 'Unarmored Defense - AC = 10 + DEX + WIS when not wearing armor' },
      { name: 'Martial Arts - Unarmed strikes scale with level (d4 to d10)' },
      { name: 'Ki - Spend ki points for Flurry of Blows, Patient Defense, Step of Wind' },
      { name: 'Unarmored Movement - Gain bonus speed when not wearing armor' },
      { name: 'Deflect Missiles - Reduce and catch ranged weapon attacks' },
      { name: 'Stunning Strike - Spend ki to stun enemies with unarmed strikes' },
    ],
  },
  Paladin: {
    description: 'A holy warrior bound to a sacred oath, wielding divine magic and martial prowess.',
    hitDie: 'd10',
    primaryAbility: 'Strength & Charisma',
    saves: 'Wisdom & Charisma',
    features: [
      { name: 'Divine Sense - Detect celestials, fiends, and undead within 60 feet' },
      { name: 'Lay on Hands - Heal up to 5 × your level HP per long rest' },
      { name: 'Fighting Style - Choose defense, dueling, or great weapon fighting' },
      { name: 'Spellcasting - Cast divine spells using Charisma' },
      { name: 'Divine Smite - Spend spell slots to add radiant damage to attacks' },
      { name: 'Sacred Oath - Swear Oath of Devotion, Vengeance, or Ancients' },
    ],
    spellcaster: true,
    sampleSpells: ['bless', 'cure-wounds', 'sanctuary', 'revivify', 'banishment', 'destructive-wave', 'holy-aura'],
  },
  Ranger: {
    description: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity & Wisdom',
    saves: 'Strength & Dexterity',
    features: [
      { name: 'Favored Enemy - Advantage on tracking and recall info about chosen enemy type' },
      { name: 'Natural Explorer - Expertise navigating and surviving in favored terrain' },
      { name: 'Fighting Style - Choose archery, defense, dueling, or two-weapon fighting' },
      { name: 'Spellcasting - Cast nature spells using Wisdom' },
      { name: "Hunter's Mark - Mark a target for bonus damage on every hit" },
      { name: 'Extra Attack - Attack twice per action' },
    ],
    spellcaster: true,
    sampleSpells: ['guided-arrow', 'cure-wounds', 'freezing-arrow', 'conjure-elemental', 'swift-quiver', 'tree-stride'],
  },
  Rogue: {
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    hitDie: 'd8',
    primaryAbility: 'Dexterity',
    saves: 'Dexterity & Intelligence',
    features: [
      { name: 'Expertise - Double proficiency on two skills (four at level 6)' },
      { name: 'Sneak Attack - Deal extra damage (d6s) when you have advantage or an ally nearby' },
      { name: 'Cunning Action - Dash, Disengage, or Hide as bonus action' },
      { name: 'Uncanny Dodge - Halve damage from one attack you can see' },
      { name: 'Evasion - Take no damage on successful DEX saves (half on failure)' },
      { name: 'Reliable Talent - Treat any d20 roll of 9 or lower as a 10 for checks' },
    ],
  },
  Sorcerer: {
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
    hitDie: 'd6',
    primaryAbility: 'Charisma',
    saves: 'Constitution & Charisma',
    features: [
      { name: 'Spellcasting - Cast spells using innate Charisma' },
      { name: 'Sorcerous Origin - Choose Draconic Bloodline or Wild Magic origin' },
      { name: 'Font of Magic - Convert spell slots to sorcery points and vice versa' },
      { name: 'Metamagic - Alter spells with Twinned Spell, Quickened Spell, etc.' },
      { name: 'Sorcerous Restoration - Regain 4 sorcery points on short rest' },
    ],
    spellcaster: true,
    sampleSpells: ['fire-bolt', 'chromatic-orb', 'magic-missile', 'scorching-ray', 'fireball', 'polymorph', 'chain-lightning'],
  },
  Warlock: {
    description: 'A wielder of magic derived from a bargain with an extraplanar entity.',
    hitDie: 'd8',
    primaryAbility: 'Charisma',
    saves: 'Wisdom & Charisma',
    features: [
      { name: 'Otherworldly Patron - Forge pact with Archfey, Fiend, Great Old One, etc.', id: 'otherworldly-patron' },
      { name: 'Pact Magic - Cast spells with few slots that recharge on short rest', id: 'pact-magic' },
      { name: 'Eldritch Invocations - Gain supernatural abilities like Agonizing Blast' },
      { name: 'Pact Boon - Gain a Pact of Chain, Blade, or Tome at level 3' },
      { name: 'Mystic Arcanum - Learn high-level spells (6th-9th) once per long rest' },
    ],
    spellcaster: true,
    sampleSpells: ['eldritch-blast', 'hex', 'armor-of-agathys', 'darkness', 'hunger-of-hadar', 'dimension-door', 'hold-monster'],
  },
  Wizard: {
    description: 'A scholarly magic-user capable of manipulating the structures of reality.',
    hitDie: 'd6',
    primaryAbility: 'Intelligence',
    saves: 'Intelligence & Wisdom',
    features: [
      { name: 'Spellcasting - Prepare and cast arcane spells using Intelligence' },
      { name: 'Arcane Recovery - Recover spell slots equal to half wizard level on short rest' },
      { name: 'Arcane Tradition - Choose school of magic (Evocation, Abjuration, etc.)' },
      { name: 'Spell Mastery - Cast one 1st and one 2nd level spell at will' },
      { name: 'Signature Spells - Cast two 3rd level spells once per short rest' },
    ],
    spellcaster: true,
    sampleSpells: ['mage-hand', 'shield', 'magic-missile', 'misty-step', 'fireball', 'counterspell', 'wall-of-force', 'wish'],
  },
  'Death Knight': {
    description: 'A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.',
    hitDie: 'd10',
    primaryAbility: 'Strength & Constitution',
    saves: 'Strength & Constitution',
    features: [
      { name: 'Runic Power - Resource pool equal to level + CON for dark abilities' },
      { name: 'Rune Weapon - Infuse weapon with necrotic energy for +1d6 damage' },
      { name: 'Death Strike - Deal massive necrotic damage with weapon attacks' },
      { name: 'Anti-Magic Shell - Create protective barrier against spells' },
      { name: 'Raise Dead - Command undead minions to fight for you' },
    ],
    spellcaster: true,
    sampleSpells: ['chill-touch', 'inflict-wounds', 'death-coil', 'raise-dead', 'death-strike', 'cloudkill', 'death-and-decay'],
  },
  Necromancer: {
    description: 'Master of the dark arts who commands undead minions and wields devastating curse magic.',
    hitDie: 'd6',
    primaryAbility: 'Intelligence',
    saves: 'Intelligence & Wisdom',
    features: [
      { name: 'Essence - Resource pool (10 + level) that regenerates from death' },
      { name: 'Raise Skeleton - Summon skeleton warriors (max = INT modifier)' },
      { name: 'Bone Spear - Launch piercing bone projectiles at enemies' },
      { name: 'Corpse Explosion - Detonate corpses for massive AoE damage' },
      { name: 'Army of the Dead - Summon massive horde of undead temporarily' },
    ],
    spellcaster: true,
    sampleSpells: ['chill-touch', 'inflict-wounds', 'bone-spear', 'corpse-explosion', 'create-undead', 'finger-of-death', 'army-of-the-dead'],
  },
  'Demon Hunter': {
    description: 'A relentless slayer who sacrificed part of their humanity to gain demonic powers.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity',
    saves: 'Dexterity & Charisma',
    features: [
      { name: 'Spectral Sight - See invisible creatures and into the Ethereal Plane' },
      { name: 'Fel Rush - Dash 30 feet dealing 2d8 fire damage to enemies you pass' },
      { name: 'Metamorphosis - Transform into demon form with wings and enhanced power' },
      { name: 'Blade Dance - Whirl through enemies dealing damage to all around you' },
      { name: 'Demonic Wards - Gain resistance to fire and necrotic damage' },
    ],
    spellcaster: true,
    sampleSpells: ['hellish-rebuke', 'burning-hands', 'fel-bolt', 'fel-rush', 'fireball', 'metamorphosis', 'eye-beam'],
  },
  Amazon: {
    description: 'A warrior from the Skovos Isles, master of javelin, bow, and spear combat with elemental magic.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity & Strength',
    saves: 'Dexterity & Wisdom',
    features: [
      { name: 'Fighting Style - Choose archery or thrown weapon fighting' },
      { name: 'Power Strike - Infuse attacks with elemental damage' },
      { name: 'Lightning Fury - Throw weapons that split into multiple bolts' },
      { name: 'Dodge - Gain enhanced defensive capabilities' },
      { name: 'Valkyrie - Summon a celestial warrior ally to fight beside you' },
    ],
    spellcaster: true,
    sampleSpells: ['magic-arrow', 'thunderwave', 'charged-strike', 'lightning-bolt', 'lightning-fury', 'chain-lightning', 'valkyrie'],
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
                <p className="text-xs text-gray-400 mb-3 italic">
                  {classInfo.features.some(f => f.id) ? 'Click features with trait IDs for more details' : 'Core abilities and powers of this class'}
                </p>
                <div className="grid gap-2">
                  {classInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700
                               hover:border-gold-500/50 transition-colors"
                    >
                      <span className="text-gold-500">•</span>
                      {feature.id ? (
                        <QuickRefTooltip type="trait" id={feature.id}>
                          <span className="text-gray-300 hover:text-gold-400 cursor-pointer underline decoration-dotted">
                            {feature.name}
                          </span>
                        </QuickRefTooltip>
                      ) : (
                        <span className="text-gray-300">{feature.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Spells Section */}
              {classInfo.spellcaster && classInfo.sampleSpells && (
                <div>
                  <h3 className="text-xl font-bold text-purple-500 mb-3 flex items-center gap-2">
                    <span>✨</span>
                    Signature Spells
                  </h3>
                  <p className="text-xs text-gray-400 mb-3 italic">
                    Click any spell to see full details including damage, range, and casting time
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {classInfo.sampleSpells.map((spellId) => (
                      <QuickRefTooltip key={spellId} type="spell" id={spellId}>
                        <div className="px-3 py-2 bg-purple-900/20 border border-purple-500/30 text-purple-300
                                      rounded-lg hover:bg-purple-900/40 hover:border-purple-400/50 cursor-pointer
                                      transition-all duration-200 transform hover:scale-105">
                          <span className="capitalize font-medium">
                            {spellId.replace(/-/g, ' ')}
                          </span>
                        </div>
                      </QuickRefTooltip>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-gray-500 italic">
                    {classInfo.sampleSpells.length} sample spells shown • This class has access to many more
                  </p>
                </div>
              )}
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
