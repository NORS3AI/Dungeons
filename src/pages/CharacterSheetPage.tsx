import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { DiceRoller, DiceRollerButton, DiceRollerModal } from '../components/DiceRoller'
import { calculateModifier, calculateProficiencyBonus } from '../types/dice'
import { isWeapon, isArmor, isShield } from '../types/equipment'
import type { Character, Ability, Equipment, Weapon } from '../types'

const ABILITY_NAMES: Record<Ability, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
}

type SkillKey = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' |
  'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' |
  'perception' | 'performance' | 'persuasion' | 'religion' | 'sleightOfHand' | 'stealth' | 'survival'

const SKILLS: { name: string; ability: Ability; key: SkillKey }[] = [
  { name: 'Acrobatics', ability: 'dexterity', key: 'acrobatics' },
  { name: 'Animal Handling', ability: 'wisdom', key: 'animalHandling' },
  { name: 'Arcana', ability: 'intelligence', key: 'arcana' },
  { name: 'Athletics', ability: 'strength', key: 'athletics' },
  { name: 'Deception', ability: 'charisma', key: 'deception' },
  { name: 'History', ability: 'intelligence', key: 'history' },
  { name: 'Insight', ability: 'wisdom', key: 'insight' },
  { name: 'Intimidation', ability: 'charisma', key: 'intimidation' },
  { name: 'Investigation', ability: 'intelligence', key: 'investigation' },
  { name: 'Medicine', ability: 'wisdom', key: 'medicine' },
  { name: 'Nature', ability: 'intelligence', key: 'nature' },
  { name: 'Perception', ability: 'wisdom', key: 'perception' },
  { name: 'Performance', ability: 'charisma', key: 'performance' },
  { name: 'Persuasion', ability: 'charisma', key: 'persuasion' },
  { name: 'Religion', ability: 'intelligence', key: 'religion' },
  { name: 'Sleight of Hand', ability: 'dexterity', key: 'sleightOfHand' },
  { name: 'Stealth', ability: 'dexterity', key: 'stealth' },
  { name: 'Survival', ability: 'wisdom', key: 'survival' },
]

export function CharacterSheetPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { characters, loadCharacter, currentCharacter, levelUp } = useCharacterStore()
  const [showDiceRoller, setShowDiceRoller] = useState(false)
  const [activeTab, setActiveTab] = useState<'main' | 'spells' | 'inventory' | 'features'>('main')

  useEffect(() => {
    if (id) {
      const char = characters.find((c) => c.id === id)
      if (char) {
        loadCharacter(id)
      }
    }
  }, [id, characters, loadCharacter])

  const character = currentCharacter

  if (!character) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">Character not found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-dnd-gold hover:text-yellow-400"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  const profBonus = calculateProficiencyBonus(character.level)

  const getAbilityMod = (ability: Ability): number => {
    return calculateModifier(character.abilityScores[ability])
  }

  const formatMod = (mod: number): string => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const calculateAC = (): number => {
    let baseAC = 10 + getAbilityMod('dexterity')

    // Check equipped armor
    const equippedArmor = character.equipment.find(
      (e) => isArmor(e) && e.equipped
    )
    if (equippedArmor && isArmor(equippedArmor)) {
      const dexMod = getAbilityMod('dexterity')
      if (equippedArmor.maxDexBonus !== undefined) {
        baseAC = equippedArmor.baseAC + Math.min(dexMod, equippedArmor.maxDexBonus)
      } else if (equippedArmor.armorType === 'heavy') {
        baseAC = equippedArmor.baseAC
      } else {
        baseAC = equippedArmor.baseAC + dexMod
      }
    }

    // Check equipped shield
    const equippedShield = character.equipment.find(
      (e) => isShield(e) && e.equipped
    )
    if (equippedShield && isShield(equippedShield)) {
      baseAC += equippedShield.acBonus
    }

    return baseAC
  }

  const getSkillMod = (skill: { name: string; ability: Ability; key: SkillKey }): number => {
    const abilityMod = getAbilityMod(skill.ability)
    const profLevel = character.skills[skill.key]
    const isProficient = profLevel === 'proficient' || profLevel === 'expertise'
    const isExpert = profLevel === 'expertise'

    if (isExpert) return abilityMod + profBonus * 2
    if (isProficient) return abilityMod + profBonus
    return abilityMod
  }

  const isSkillProficient = (skillKey: SkillKey): boolean => {
    const profLevel = character.skills[skillKey]
    return profLevel === 'proficient' || profLevel === 'expertise'
  }

  const tabs = [
    { id: 'main', label: 'Overview' },
    { id: 'spells', label: 'Spells' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'features', label: 'Features' },
  ] as const

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-dnd-gold mb-2">
            {character.name || 'Unnamed Character'}
          </h1>
          <p className="text-xl text-gray-400">
            Level {character.level} {character.race?.name || 'Unknown'}{' '}
            {character.class?.name || 'Unknown'}
            {character.subclass && ` (${character.subclass.name})`}
          </p>
          {character.background && (
            <p className="text-gray-500">{character.background.name} Background</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => levelUp()}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg
                     transition-colors"
          >
            Level Up
          </button>
          <button
            onClick={() => navigate('/create')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                     transition-colors"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-dnd-gold text-gray-900'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'main' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Ability Scores */}
          <div className="space-y-6">
            {/* Ability Scores */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Ability Scores</h3>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(ABILITY_NAMES) as Ability[]).map((ability) => (
                  <div
                    key={ability}
                    className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700"
                  >
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {ABILITY_NAMES[ability]}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {character.abilityScores[ability]}
                    </div>
                    <div className="text-lg text-dnd-gold font-medium">
                      {formatMod(getAbilityMod(ability))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saving Throws */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Saving Throws</h3>
              <div className="space-y-2">
                {(Object.keys(ABILITY_NAMES) as Ability[]).map((ability) => {
                  const isProficient = character.class?.savingThrows.includes(ability)
                  const mod = getAbilityMod(ability) + (isProficient ? profBonus : 0)
                  return (
                    <div
                      key={ability}
                      className="flex items-center justify-between py-1 px-2 rounded bg-gray-900/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isProficient ? 'bg-dnd-gold' : 'bg-gray-600'}`} />
                        <span className="text-gray-300 text-sm">{ABILITY_NAMES[ability]}</span>
                      </div>
                      <span className="text-white font-medium">{formatMod(mod)}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Proficiency Bonus */}
            <div className="card bg-gray-800 border-gray-700 p-4 text-center">
              <div className="text-xs text-gray-500 uppercase mb-1">Proficiency Bonus</div>
              <div className="text-3xl font-bold text-dnd-gold">+{profBonus}</div>
            </div>
          </div>

          {/* Middle Column - Combat Stats & Skills */}
          <div className="space-y-6">
            {/* Combat Stats */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Combat</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-xs text-gray-500 uppercase mb-1">AC</div>
                  <div className="text-2xl font-bold text-white">{calculateAC()}</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-red-900/50">
                  <div className="text-xs text-gray-500 uppercase mb-1">HP</div>
                  <div className="text-2xl font-bold text-red-400">
                    {character.hitPoints.current}/{character.hitPoints.maximum}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-xs text-gray-500 uppercase mb-1">Speed</div>
                  <div className="text-2xl font-bold text-white">
                    {character.race?.speed || 30} ft
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-xs text-gray-500 uppercase mb-1">Initiative</div>
                  <div className="text-xl font-bold text-white">
                    {formatMod(getAbilityMod('dexterity'))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-xs text-gray-500 uppercase mb-1">Hit Die</div>
                  <div className="text-xl font-bold text-white">
                    {character.level}{character.class?.hitDie || 'd8'}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Skills</h3>
              <div className="space-y-1 max-h-80 overflow-y-auto pr-2">
                {SKILLS.map((skill) => (
                  <div
                    key={skill.key}
                    className="flex items-center justify-between py-1 px-2 rounded bg-gray-900/50 hover:bg-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        isSkillProficient(skill.key) ? 'bg-dnd-gold' : 'bg-gray-600'
                      }`} />
                      <span className="text-gray-300 text-sm hover:text-dnd-gold">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-600">({ABILITY_NAMES[skill.ability]})</span>
                    </div>
                    <span className="text-white font-medium">{formatMod(getSkillMod(skill))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info & Dice */}
          <div className="space-y-6">
            {/* Character Info */}
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Character Info</h3>
              <div className="space-y-3 text-sm">
                {character.playerName && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Player</span>
                    <span className="text-gray-300">{character.playerName}</span>
                  </div>
                )}
                {character.age && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Age</span>
                    <span className="text-gray-300">{character.age}</span>
                  </div>
                )}
                {character.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Height</span>
                    <span className="text-gray-300">{character.height}</span>
                  </div>
                )}
                {character.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight</span>
                    <span className="text-gray-300">{character.weight}</span>
                  </div>
                )}
                {character.race?.vision && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vision</span>
                    <span className="text-gray-300">
                      {character.race.vision === 'superiorDarkvision'
                        ? `Superior Darkvision (${character.race.visionRange} ft)`
                        : character.race.vision === 'darkvision'
                        ? `Darkvision (${character.race.visionRange} ft)`
                        : 'Normal'}
                    </span>
                  </div>
                )}
                {character.race?.languages && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Languages</span>
                    <span className="text-gray-300">{character.race.languages.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dice Roller */}
            <DiceRoller />
          </div>
        </div>
      )}

      {activeTab === 'spells' && (
        <div className="space-y-6">
          {character.knownSpells.length === 0 ? (
            <div className="card bg-gray-800 border-gray-700 p-8 text-center">
              <p className="text-gray-400">No spells known.</p>
            </div>
          ) : (
            <>
              {/* Cantrips */}
              {character.knownSpells.filter((s) => s.level === 0).length > 0 && (
                <div className="card bg-gray-800 border-gray-700 p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Cantrips</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {character.knownSpells
                      .filter((s) => s.level === 0)
                      .map((spell) => (
                        <div key={spell.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500/50">
                          <div className="font-medium text-purple-400">{spell.name}</div>
                          <div className="text-xs text-gray-500">{spell.school} cantrip</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Leveled Spells */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
                const spellsAtLevel = character.knownSpells.filter((s) => s.level === level)
                if (spellsAtLevel.length === 0) return null
                return (
                  <div key={level} className="card bg-gray-800 border-gray-700 p-4">
                    <h3 className="text-lg font-bold text-white mb-4">Level {level} Spells</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {spellsAtLevel.map((spell) => (
                        <div key={spell.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500/50">
                          <div className="font-medium text-purple-400">{spell.name}</div>
                          <div className="text-xs text-gray-500">
                            {spell.school} | {spell.castingTime.amount} {spell.castingTime.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Currency */}
          <div className="card bg-gray-800 border-gray-700 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Currency</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'platinum', label: 'PP', color: 'text-gray-300' },
                { key: 'gold', label: 'GP', color: 'text-yellow-400' },
                { key: 'electrum', label: 'EP', color: 'text-blue-300' },
                { key: 'silver', label: 'SP', color: 'text-gray-400' },
                { key: 'copper', label: 'CP', color: 'text-orange-400' },
              ].map(({ key, label, color }) => (
                <div key={key} className="bg-gray-900 rounded-lg px-4 py-2 text-center">
                  <div className={`text-xl font-bold ${color}`}>
                    {character.currency[key as keyof typeof character.currency]}
                  </div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div className="card bg-gray-800 border-gray-700 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Equipment</h3>
            {character.equipment.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No equipment.</p>
            ) : (
              <div className="space-y-2">
                {character.equipment.map((item) => (
                  <EquipmentItem key={item.id} item={item} character={character} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="space-y-6">
          {/* Racial Traits */}
          {character.race?.traits && character.race.traits.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Racial Traits</h3>
              <div className="space-y-3">
                {character.race.traits.map((trait) => (
                  <div key={trait.id} className="p-3 bg-gray-900 rounded-lg">
                    <div className="font-medium text-dnd-gold">{trait.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{trait.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Class Features */}
          {character.class?.features && character.class.features.length > 0 && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Class Features</h3>
              <div className="space-y-3">
                {character.class.features
                  .filter((f) => f.level <= character.level)
                  .map((feature) => (
                    <div key={feature.id} className="p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-dnd-gold">{feature.name}</span>
                        <span className="text-xs text-gray-500">Level {feature.level}</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{feature.description}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Background Feature */}
          {character.background?.feature && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Background Feature</h3>
              <div className="p-3 bg-gray-900 rounded-lg">
                <div className="font-medium text-dnd-gold">{character.background.feature.name}</div>
                <div className="text-sm text-gray-400 mt-1">{character.background.feature.description}</div>
              </div>
            </div>
          )}

          {/* Backstory */}
          {character.backstory && (
            <div className="card bg-gray-800 border-gray-700 p-4">
              <h3 className="text-lg font-bold text-white mb-4">Backstory</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{character.backstory}</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Dice Button */}
      <DiceRollerButton onClick={() => setShowDiceRoller(true)} />
      <DiceRollerModal isOpen={showDiceRoller} onClose={() => setShowDiceRoller(false)} character={character} />
    </div>
  )
}

// Equipment item component
function EquipmentItem({ item, character }: { item: Equipment; character: Character }) {
  const getAbilityMod = (ability: Ability): number => {
    return calculateModifier(character.abilityScores[ability])
  }
  const profBonus = calculateProficiencyBonus(character.level)

  if (isWeapon(item)) {
    const weapon = item as Weapon
    const isFinesse = weapon.properties.includes('finesse')
    const attackMod = isFinesse
      ? Math.max(getAbilityMod('strength'), getAbilityMod('dexterity'))
      : weapon.weaponCategory === 'ranged'
      ? getAbilityMod('dexterity')
      : getAbilityMod('strength')
    const attackBonus = attackMod + profBonus

    return (
      <div className="p-3 bg-gray-900 rounded-lg flex items-center justify-between">
        <div>
          <span className="font-medium text-white hover:text-dnd-gold">
            {weapon.name}
          </span>
          {weapon.quantity > 1 && (
            <span className="text-gray-500 ml-1">x{weapon.quantity}</span>
          )}
          <div className="text-sm text-gray-400">
            {weapon.damage.dice} {weapon.damage.type}
          </div>
        </div>
        <div className="text-right">
          <div className="text-dnd-gold font-medium">
            +{attackBonus} to hit
          </div>
          <div className="text-xs text-gray-500">{weapon.weight} lb</div>
        </div>
      </div>
    )
  }

  if (isArmor(item)) {
    return (
      <div className="p-3 bg-gray-900 rounded-lg flex items-center justify-between">
        <div>
          <span className="font-medium text-white">{item.name}</span>
          <div className="text-sm text-gray-400">
            AC {item.baseAC} | {item.armorType}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">{item.weight} lb</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 bg-gray-900 rounded-lg flex items-center justify-between">
      <div>
        <span className="font-medium text-white">{item.name}</span>
        {item.quantity > 1 && (
          <span className="text-gray-500 ml-1">x{item.quantity}</span>
        )}
        <div className="text-sm text-gray-400">{item.description}</div>
      </div>
      <div className="text-xs text-gray-500">{item.weight} lb</div>
    </div>
  )
}
