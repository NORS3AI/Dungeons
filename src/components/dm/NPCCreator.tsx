import { useState } from 'react'
import { useCampaignStore, type NPC, type NPCAction } from '../../stores/campaignStore'

const NPC_TYPES = [
  'Humanoid', 'Beast', 'Undead', 'Fiend', 'Celestial', 'Dragon',
  'Elemental', 'Fey', 'Giant', 'Monstrosity', 'Ooze', 'Plant', 'Construct', 'Aberration'
]

const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil', 'Unaligned'
]

const CHALLENGE_RATINGS = [
  '0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
]

const DAMAGE_TYPES = [
  'Slashing', 'Piercing', 'Bludgeoning', 'Fire', 'Cold', 'Lightning',
  'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic', 'Force'
]

const CONDITIONS = [
  'Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled',
  'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone',
  'Restrained', 'Stunned', 'Unconscious'
]

const SENSES = ['Blindsight', 'Darkvision', 'Tremorsense', 'Truesight']

interface NPCCreatorProps {
  onSave?: () => void
  editingNPC?: NPC | null
}

export function NPCCreator({ onSave, editingNPC }: NPCCreatorProps) {
  const { createNPC, updateNPC } = useCampaignStore()

  const [name, setName] = useState(editingNPC?.name || '')
  const [type, setType] = useState(editingNPC?.type || 'Humanoid')
  const [race, setRace] = useState(editingNPC?.race || '')
  const [alignment, setAlignment] = useState(editingNPC?.alignment || 'True Neutral')
  const [cr, setCR] = useState(editingNPC?.challengeRating || '1')

  const [ac, setAC] = useState(editingNPC?.armorClass || 10)
  const [hpMax, setHpMax] = useState(editingNPC?.hitPoints.maximum || 10)
  const [hpFormula, setHpFormula] = useState(editingNPC?.hitPoints.formula || '')
  const [speed, setSpeed] = useState(editingNPC?.speed || { walk: 30 })

  const [abilities, setAbilities] = useState(editingNPC?.abilityScores || {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  })

  const [actions, setActions] = useState<NPCAction[]>(editingNPC?.actions || [])
  const [reactions, setReactions] = useState<NPCAction[]>(editingNPC?.reactions || [])
  const [legendaryActions, setLegendaryActions] = useState<NPCAction[]>(editingNPC?.legendaryActions || [])

  const [savingThrows, setSavingThrows] = useState<string[]>(editingNPC?.savingThrows || [])
  const [skills, setSkills] = useState<string[]>(editingNPC?.skills || [])
  const [damageResistances, setDamageResistances] = useState<string[]>(editingNPC?.damageResistances || [])
  const [damageImmunities, setDamageImmunities] = useState<string[]>(editingNPC?.damageImmunities || [])
  const [conditionImmunities, setConditionImmunities] = useState<string[]>(editingNPC?.conditionImmunities || [])
  const [senses, setSenses] = useState<string[]>(editingNPC?.senses || [])
  const [languages, setLanguages] = useState(editingNPC?.languages?.join(', ') || '')

  const [description, setDescription] = useState(editingNPC?.description || '')
  const [notes, setNotes] = useState(editingNPC?.notes || '')

  const [activeTab, setActiveTab] = useState<'basic' | 'combat' | 'abilities' | 'defenses' | 'notes'>('basic')

  const getMod = (score: number) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const handleSave = () => {
    if (!name.trim()) return

    const npcData = {
      name: name.trim(),
      type,
      race: race || undefined,
      alignment,
      challengeRating: cr,
      armorClass: ac,
      hitPoints: { current: hpMax, maximum: hpMax, formula: hpFormula || undefined },
      speed,
      abilityScores: abilities,
      actions,
      reactions: reactions.length > 0 ? reactions : undefined,
      legendaryActions: legendaryActions.length > 0 ? legendaryActions : undefined,
      savingThrows: savingThrows.length > 0 ? savingThrows : undefined,
      skills: skills.length > 0 ? skills : undefined,
      damageResistances: damageResistances.length > 0 ? damageResistances : undefined,
      damageImmunities: damageImmunities.length > 0 ? damageImmunities : undefined,
      conditionImmunities: conditionImmunities.length > 0 ? conditionImmunities : undefined,
      senses: senses.length > 0 ? senses : undefined,
      languages: languages.split(',').map((l) => l.trim()).filter(Boolean),
      description: description || undefined,
      notes: notes || undefined,
      isTemplate: false,
    }

    if (editingNPC) {
      updateNPC(editingNPC.id, npcData)
    } else {
      createNPC(npcData)
    }

    onSave?.()
  }

  const addAction = (type: 'action' | 'reaction' | 'legendary') => {
    const newAction: NPCAction = { name: '', description: '' }
    if (type === 'action') setActions([...actions, newAction])
    else if (type === 'reaction') setReactions([...reactions, newAction])
    else setLegendaryActions([...legendaryActions, newAction])
  }

  const updateAction = (
    type: 'action' | 'reaction' | 'legendary',
    index: number,
    field: keyof NPCAction,
    value: string | number
  ) => {
    const updateFn = (acts: NPCAction[]) =>
      acts.map((a, i) => (i === index ? { ...a, [field]: value } : a))

    if (type === 'action') setActions(updateFn(actions))
    else if (type === 'reaction') setReactions(updateFn(reactions))
    else setLegendaryActions(updateFn(legendaryActions))
  }

  const removeAction = (type: 'action' | 'reaction' | 'legendary', index: number) => {
    if (type === 'action') setActions(actions.filter((_, i) => i !== index))
    else if (type === 'reaction') setReactions(reactions.filter((_, i) => i !== index))
    else setLegendaryActions(legendaryActions.filter((_, i) => i !== index))
  }

  const toggleArrayItem = (
    array: string[],
    setArray: (arr: string[]) => void,
    item: string
  ) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item))
    } else {
      setArray([...array, item])
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-dnd-gold">
          {editingNPC ? 'Edit NPC' : 'Create NPC'}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {(['basic', 'combat', 'abilities', 'defenses', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gray-700 text-dnd-gold border-b-2 border-dnd-gold'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {/* Basic Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  placeholder="Goblin Boss"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                >
                  {NPC_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Race (optional)</label>
                <input
                  type="text"
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  placeholder="Goblin"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Alignment</label>
                <select
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                >
                  {ALIGNMENTS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Challenge Rating</label>
                <select
                  value={cr}
                  onChange={(e) => setCR(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                >
                  {CHALLENGE_RATINGS.map((rating) => (
                    <option key={rating} value={rating}>CR {rating}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Combat Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Armor Class</label>
                <input
                  type="number"
                  value={ac}
                  onChange={(e) => setAC(parseInt(e.target.value) || 10)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Hit Points</label>
                <input
                  type="number"
                  value={hpMax}
                  onChange={(e) => setHpMax(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">HP Formula</label>
                <input
                  type="text"
                  value={hpFormula}
                  onChange={(e) => setHpFormula(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                  placeholder="2d8+2"
                />
              </div>
            </div>

            {/* Speed */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Speed</label>
              <div className="grid grid-cols-5 gap-2">
                {(['walk', 'fly', 'swim', 'climb', 'burrow'] as const).map((speedType) => (
                  <div key={speedType}>
                    <label className="block text-xs text-gray-500 mb-1 capitalize">{speedType}</label>
                    <input
                      type="number"
                      value={speed[speedType] || ''}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        setSpeed({
                          ...speed,
                          [speedType]: val || undefined,
                        })
                      }}
                      className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm focus:border-dnd-gold focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Combat Tab */}
        {activeTab === 'combat' && (
          <div className="space-y-6">
            {/* Actions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Actions</h3>
                <button
                  onClick={() => addAction('action')}
                  className="px-3 py-1 bg-dnd-gold text-gray-900 text-sm rounded font-medium hover:bg-yellow-500"
                >
                  + Add Action
                </button>
              </div>
              {actions.map((action, index) => (
                <ActionEditor
                  key={index}
                  action={action}
                  onChange={(field, value) => updateAction('action', index, field, value)}
                  onRemove={() => removeAction('action', index)}
                />
              ))}
              {actions.length === 0 && (
                <p className="text-gray-500 text-sm">No actions defined.</p>
              )}
            </div>

            {/* Reactions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Reactions</h3>
                <button
                  onClick={() => addAction('reaction')}
                  className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600"
                >
                  + Add Reaction
                </button>
              </div>
              {reactions.map((action, index) => (
                <ActionEditor
                  key={index}
                  action={action}
                  onChange={(field, value) => updateAction('reaction', index, field, value)}
                  onRemove={() => removeAction('reaction', index)}
                />
              ))}
            </div>

            {/* Legendary Actions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Legendary Actions</h3>
                <button
                  onClick={() => addAction('legendary')}
                  className="px-3 py-1 bg-purple-700 text-white text-sm rounded hover:bg-purple-600"
                >
                  + Add Legendary
                </button>
              </div>
              {legendaryActions.map((action, index) => (
                <ActionEditor
                  key={index}
                  action={action}
                  onChange={(field, value) => updateAction('legendary', index, field, value)}
                  onRemove={() => removeAction('legendary', index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Abilities Tab */}
        {activeTab === 'abilities' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(abilities) as (keyof typeof abilities)[]).map((ability) => (
                <div key={ability} className="text-center">
                  <label className="block text-sm text-gray-400 mb-1 uppercase">{ability.slice(0, 3)}</label>
                  <input
                    type="number"
                    value={abilities[ability]}
                    onChange={(e) => setAbilities({ ...abilities, [ability]: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-center focus:border-dnd-gold focus:outline-none"
                  />
                  <div className="text-sm text-dnd-gold mt-1">{getMod(abilities[ability])}</div>
                </div>
              ))}
            </div>

            {/* Saving Throw Proficiencies */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Saving Throw Proficiencies</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(abilities) as (keyof typeof abilities)[]).map((ability) => (
                  <button
                    key={ability}
                    onClick={() => toggleArrayItem(savingThrows, setSavingThrows, ability)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      savingThrows.includes(ability)
                        ? 'bg-dnd-gold text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {ability.slice(0, 3).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Skill Proficiencies</label>
              <input
                type="text"
                value={skills.join(', ')}
                onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                placeholder="Perception +5, Stealth +6"
              />
            </div>

            {/* Senses */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Senses</label>
              <div className="flex flex-wrap gap-2">
                {SENSES.map((sense) => (
                  <button
                    key={sense}
                    onClick={() => toggleArrayItem(senses, setSenses, sense)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      senses.includes(sense)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {sense}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Languages</label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-dnd-gold focus:outline-none"
                placeholder="Common, Goblin"
              />
            </div>
          </div>
        )}

        {/* Defenses Tab */}
        {activeTab === 'defenses' && (
          <div className="space-y-4">
            {/* Damage Resistances */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Damage Resistances</label>
              <div className="flex flex-wrap gap-2">
                {DAMAGE_TYPES.map((dmgType) => (
                  <button
                    key={dmgType}
                    onClick={() => toggleArrayItem(damageResistances, setDamageResistances, dmgType)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      damageResistances.includes(dmgType)
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {dmgType}
                  </button>
                ))}
              </div>
            </div>

            {/* Damage Immunities */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Damage Immunities</label>
              <div className="flex flex-wrap gap-2">
                {DAMAGE_TYPES.map((dmgType) => (
                  <button
                    key={dmgType}
                    onClick={() => toggleArrayItem(damageImmunities, setDamageImmunities, dmgType)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      damageImmunities.includes(dmgType)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {dmgType}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Immunities */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Condition Immunities</label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleArrayItem(conditionImmunities, setConditionImmunities, condition)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      conditionImmunities.includes(condition)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white resize-none focus:border-dnd-gold focus:outline-none"
                placeholder="Physical description, personality, mannerisms..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">DM Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white resize-none focus:border-dnd-gold focus:outline-none"
                placeholder="Secrets, motivations, plot hooks..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="px-6 py-2 bg-dnd-gold hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingNPC ? 'Save Changes' : 'Create NPC'}
        </button>
      </div>
    </div>
  )
}

interface ActionEditorProps {
  action: NPCAction
  onChange: (field: keyof NPCAction, value: string | number) => void
  onRemove: () => void
}

function ActionEditor({ action, onChange, onRemove }: ActionEditorProps) {
  return (
    <div className="p-3 bg-gray-900 rounded-lg mb-2">
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={action.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Action Name"
            className="w-full px-3 py-1.5 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-dnd-gold focus:outline-none"
          />
          <textarea
            value={action.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Action description..."
            rows={2}
            className="w-full px-3 py-1.5 bg-gray-800 border border-gray-600 rounded text-white text-sm resize-none focus:border-dnd-gold focus:outline-none"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={action.attackBonus || ''}
              onChange={(e) => onChange('attackBonus', parseInt(e.target.value) || 0)}
              placeholder="Attack Bonus"
              className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-dnd-gold focus:outline-none"
            />
            <input
              type="text"
              value={action.damage || ''}
              onChange={(e) => onChange('damage', e.target.value)}
              placeholder="Damage (1d6+2)"
              className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-dnd-gold focus:outline-none"
            />
            <input
              type="text"
              value={action.damageType || ''}
              onChange={(e) => onChange('damageType', e.target.value)}
              placeholder="Damage Type"
              className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-dnd-gold focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
