import { useState } from 'react'
import { useCharacterStore } from '../stores/characterStore'
import type { Equipment, Weapon, Armor, WeaponProperty, DamageType } from '../types'
import { EMPTY_CURRENCY } from '../types'
import type { CraftingTier } from '../data/craftingData'
import {
  PREMADE_POTIONS, PREMADE_MATERIALS,
  CRAFTED_WEAPONS, CRAFTED_ARMOR, CRAFTED_POTIONS,
  ENCHANTING_SCROLLS, PREMADE_GEAR, SHOP_ITEMS,
} from '../data/premadeItems'
import type { ShopCategory } from '../data/premadeItems'

interface DMItemGranterProps {
  isOpen: boolean
  onClose: () => void
}

type TopMode = 'quick' | 'custom' | 'materials'
type QuickTab = 'weapons' | 'armor' | 'potions' | 'enchanting' | 'gear' | 'shop'
type MatCategory = 'ore' | 'cloth' | 'hide' | 'herb'
type ItemType = 'weapon' | 'armor' | 'potion' | 'gear' | 'custom'
type TierFilter = CraftingTier | 'all'

const TIER_ORDER: CraftingTier[] = ['common', 'uncommon', 'rare', 'epic', 'legendary']

const TIER_BORDER: Record<TierFilter, string> = {
  all:       'border-gray-500',
  common:    'border-gray-400',
  uncommon:  'border-green-500',
  rare:      'border-blue-500',
  epic:      'border-purple-500',
  legendary: 'border-orange-500',
}

const TIER_BG_ACTIVE: Record<TierFilter, string> = {
  all:       'bg-gray-600 text-white',
  common:    'bg-gray-500 text-white',
  uncommon:  'bg-green-700 text-white',
  rare:      'bg-blue-700 text-white',
  epic:      'bg-purple-700 text-white',
  legendary: 'bg-orange-700 text-white',
}

const RARITY_COLOR: Record<string, string> = {
  common:    'text-gray-300',
  uncommon:  'text-green-400',
  rare:      'text-blue-400',
  epic:      'text-purple-400',
  legendary: 'text-orange-400',
}

const SHOP_CATS: { id: ShopCategory | 'all'; label: string; emoji: string }[] = [
  { id: 'all',              label: 'All',            emoji: '🏪' },
  { id: 'simple-weapons',   label: 'Simple Weapons', emoji: '🗡️' },
  { id: 'martial-weapons',  label: 'Martial Weapons',emoji: '⚔️' },
  { id: 'armor',            label: 'Armor',          emoji: '🛡️' },
  { id: 'gear',             label: 'Gear',           emoji: '🎒' },
  { id: 'tools',            label: 'Tools',          emoji: '🔧' },
  { id: 'magic',            label: 'Magic',          emoji: '✨' },
]

export function DMItemGranter({ isOpen, onClose }: DMItemGranterProps) {
  const characters         = useCharacterStore((s) => s.characters)
  const grantItemToCharacter     = useCharacterStore((s) => s.grantItemToCharacter)
  const grantItemToAllCharacters = useCharacterStore((s) => s.grantItemToAllCharacters)
  const grantMaterialToCharacter     = useCharacterStore((s) => s.grantMaterialToCharacter)
  const grantMaterialToAllCharacters = useCharacterStore((s) => s.grantMaterialToAllCharacters)

  const [topMode, setTopMode]   = useState<TopMode>('quick')
  const [quickTab, setQuickTab] = useState<QuickTab>('weapons')
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [shopCat, setShopCat]   = useState<ShopCategory | 'all'>('all')
  const [matCategory, setMatCategory] = useState<MatCategory>('ore')
  const [matQuantity, setMatQuantity] = useState(5)
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  // Custom mode
  const [itemType, setItemType]   = useState<ItemType>('gear')
  const [itemName, setItemName]   = useState('')
  const [itemDesc, setItemDesc]   = useState('')
  const [itemRarity, setItemRarity] = useState<Equipment['rarity']>('common')
  const [itemQty, setItemQty]     = useState(1)
  const [weaponDmg, setWeaponDmg] = useState('1d6')
  const [weaponDmgType, setWeaponDmgType] = useState<DamageType>('slashing')
  const [weaponProps] = useState<WeaponProperty[]>([])
  const [armorAC, setArmorAC]     = useState(11)
  const [armorType, setArmorType] = useState<'light'|'medium'|'heavy'>('light')
  const [successMsg, setSuccessMsg] = useState('')

  if (!isOpen) return null

  // ── helpers ───────────────────────────────────────────────────────────────
  const toast = (msg: string) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 2500)
  }

  const handleToggle = (id: string) =>
    setSelectedCharacters((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])

  const handleSelectAll = () =>
    setSelectedCharacters(selectedCharacters.length === characters.length ? [] : characters.map((c) => c.id))

  const grantToSelected = (item: Equipment) => {
    if (!selectedCharacters.length) { toast('⚠️ Select at least one character'); return }
    selectedCharacters.forEach((cid) => grantItemToCharacter(cid, { ...item, id: crypto.randomUUID() }))
    toast(`✅ Granted "${item.name}" to ${selectedCharacters.length} character(s)`)
  }

  const grantToAll = (item: Equipment) => {
    if (!characters.length) { toast('⚠️ No characters available'); return }
    characters.forEach((c) => grantItemToCharacter(c.id, { ...item, id: crypto.randomUUID() }))
    toast(`✅ Granted "${item.name}" to all ${characters.length} character(s)`)
  }

  // When quickTab changes, reset tier filter
  const switchTab = (tab: QuickTab) => { setQuickTab(tab); setTierFilter('all') }

  // ── item card ─────────────────────────────────────────────────────────────
  function ItemCard({ item, accent, subtitle }: { item: Equipment; accent: string; subtitle?: string; key?: string }) {
    const rColor = RARITY_COLOR[item.rarity ?? 'common'] ?? 'text-gray-300'
    return (
      <div className={`p-3 bg-gray-800 rounded-lg border border-gray-700 hover:${accent} transition-all`}>
        <div className="flex items-start justify-between mb-1 gap-2">
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-sm leading-tight truncate ${rColor}`}>{item.name}</h4>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => grantToSelected(item)}
              className={`px-2 py-0.5 text-xs rounded font-bold transition-colors ${accent.replace('border-', 'bg-').replace('500','700')} hover:opacity-80 text-white`}
              title="Grant to selected"
            >+1</button>
            <button
              onClick={() => grantToAll(item)}
              className="px-2 py-0.5 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-xs rounded font-bold transition-colors"
              title="Grant to all"
            >ALL</button>
          </div>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
      </div>
    )
  }

  // ── tier filter pill bar ──────────────────────────────────────────────────
  function TierFilterBar() {
    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {(['all', ...TIER_ORDER] as TierFilter[]).map((t) => (
          <button
            key={t}
            onClick={() => setTierFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all capitalize ${
              tierFilter === t
                ? TIER_BG_ACTIVE[t]
                : `bg-gray-800 text-gray-400 ${TIER_BORDER[t]} hover:opacity-80`
            }`}
          >
            {t === 'all' ? 'All Tiers' : t}
          </button>
        ))}
      </div>
    )
  }

  // ── custom item builder ───────────────────────────────────────────────────
  const buildItem = (): Equipment => {
    const base = { id: crypto.randomUUID(), name: itemName, description: itemDesc, rarity: itemRarity, quantity: itemQty, weight: 1, equipped: false, cost: { ...EMPTY_CURRENCY } }
    if (itemType === 'weapon') return { ...base, category: 'weapon', weaponType: 'simple', weaponCategory: 'melee', damage: { dice: weaponDmg, type: weaponDmgType }, properties: weaponProps } as Weapon
    if (itemType === 'armor')  return { ...base, category: 'armor',  armorType, baseAC: armorAC, stealthDisadvantage: false } as Armor
    return { ...base, category: itemType === 'potion' ? 'consumable' : 'adventuringGear' }
  }

  const handleGrantCustom = (toAll: boolean) => {
    if (!itemName.trim()) { toast('⚠️ Enter an item name'); return }
    if (!toAll && !selectedCharacters.length) { toast('⚠️ Select at least one character'); return }
    const item = buildItem()
    if (toAll) { grantItemToAllCharacters(item); toast(`✅ Granted "${itemName}" to all ${characters.length} character(s)`) }
    else { selectedCharacters.forEach((cid) => grantItemToCharacter(cid, { ...item, id: crypto.randomUUID() })); toast(`✅ Granted "${itemName}" to ${selectedCharacters.length} character(s)`) }
    setTimeout(() => { setItemName(''); setItemDesc(''); setItemQty(1) }, 2200)
  }

  // ── derived lists with tier filter applied ────────────────────────────────
  const filteredWeapons  = tierFilter === 'all' ? CRAFTED_WEAPONS  : CRAFTED_WEAPONS.filter((i) => i.tier === tierFilter)
  const filteredArmor    = tierFilter === 'all' ? CRAFTED_ARMOR    : CRAFTED_ARMOR.filter((i) => i.tier === tierFilter)
  const filteredPotions  = tierFilter === 'all' ? CRAFTED_POTIONS  : CRAFTED_POTIONS.filter((i) => i.tier === tierFilter)
  const filteredScrolls  = tierFilter === 'all' ? ENCHANTING_SCROLLS : ENCHANTING_SCROLLS.filter((i) => i.tier === tierFilter)
  const filteredShop     = shopCat === 'all' ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => i.shopCategory === shopCat)

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-dnd-gold rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-dnd-gold p-5 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-dnd-gold">🎁 DM Item Granter</h2>
            <p className="text-gray-400 text-sm mt-0.5">Grant items to characters in your campaign</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="p-5 space-y-5">

          {/* Toast */}
          {successMsg && (
            <div className={`border px-4 py-3 rounded-lg text-sm ${
              successMsg.startsWith('✅') ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-yellow-900/30 border-yellow-500 text-yellow-300'
            }`}>{successMsg}</div>
          )}

          {/* Top mode buttons */}
          <div className="flex gap-3 flex-wrap">
            {([
              { id: 'quick',     label: '⚡ Quick Add',      active: 'bg-dnd-gold text-gray-900' },
              { id: 'materials', label: '🧪 Grant Materials', active: 'bg-green-700 text-white' },
              { id: 'custom',    label: '🛠️ Custom Create',  active: 'bg-dnd-gold text-gray-900' },
            ] as const).map(({ id, label, active }) => (
              <button
                key={id}
                onClick={() => setTopMode(id)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  topMode === id ? active : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
                }`}
              >{label}</button>
            ))}
          </div>

          {/* ── QUICK ADD ──────────────────────────────────────────────────── */}
          {topMode === 'quick' && (
            <div className="space-y-4">

              {/* Category tabs */}
              <div className="flex flex-wrap gap-1 border-b border-gray-700 pb-2">
                {([
                  { id: 'weapons',    emoji: '⚔️',  label: 'Weapons'    },
                  { id: 'armor',      emoji: '🛡️',  label: 'Armor'      },
                  { id: 'potions',    emoji: '🧪',  label: 'Potions'    },
                  { id: 'enchanting', emoji: '✨',  label: 'Enchanting' },
                  { id: 'gear',       emoji: '🎒',  label: 'Gear'       },
                  { id: 'shop',       emoji: '🏪',  label: 'Shop'       },
                ] as const).map(({ id, emoji, label }) => (
                  <button
                    key={id}
                    onClick={() => switchTab(id)}
                    className={`px-3 py-1.5 rounded-t-lg text-sm font-medium transition-all ${
                      quickTab === id
                        ? 'bg-gray-800 text-dnd-gold border-t border-x border-gray-600'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >{emoji} {label}</button>
                ))}
              </div>

              {/* Tier filter (weapons / armor / potions / enchanting) */}
              {['weapons','armor','potions','enchanting'].includes(quickTab) && <TierFilterBar />}

              {/* Shop category filter */}
              {quickTab === 'shop' && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {SHOP_CATS.map(({ id, label, emoji }) => (
                    <button
                      key={id}
                      onClick={() => setShopCat(id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                        shopCat === id ? 'bg-dnd-gold text-gray-900 border-dnd-gold' : 'bg-gray-800 text-gray-400 border-gray-600 hover:border-gray-400'
                      }`}
                    >{emoji} {label}</button>
                  ))}
                </div>
              )}

              {/* Items grid */}
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1">

                {quickTab === 'weapons' && filteredWeapons.map((w) => {
                  const dmgLine = `${w.damage?.dice ?? ''} ${w.damage?.type ?? ''}`.trim()
                  return <ItemCard key={w.id} item={w as unknown as Equipment} accent="border-red-500" subtitle={`${dmgLine} • ${w.tier} tier`} />
                })}

                {quickTab === 'armor' && filteredArmor.map((a) => (
                  <ItemCard key={a.id} item={a as Equipment} accent="border-blue-500" subtitle={`${a.tier} tier`} />
                ))}

                {quickTab === 'potions' && (
                  <>
                    {tierFilter === 'all' && PREMADE_POTIONS.map((p) => (
                      <ItemCard key={p.id} item={p as Equipment} accent="border-purple-500" subtitle="classic" />
                    ))}
                    {filteredPotions.map((p) => (
                      <ItemCard key={p.id} item={p as Equipment} accent="border-purple-500" subtitle={`${p.tier} tier`} />
                    ))}
                  </>
                )}

                {quickTab === 'enchanting' && filteredScrolls.map((s) => (
                  <ItemCard key={s.id} item={s as Equipment} accent="border-yellow-500" subtitle={`${s.tier} scroll`} />
                ))}

                {quickTab === 'gear' && PREMADE_GEAR.map((g) => (
                  <ItemCard key={g.id} item={g as Equipment} accent="border-green-500" />
                ))}

                {quickTab === 'shop' && filteredShop.map((s) => {
                  const raw = s as unknown as Record<string, unknown>
                  const dmg = raw.damage as { dice?: string; type?: string } | undefined
                  const ac  = raw.baseAC as number | undefined
                  let sub = ''
                  if (dmg?.dice) sub = `${dmg.dice} ${dmg.type ?? ''} • ${raw.weaponType ?? ''}`.trim()
                  else if (ac) sub = `AC ${ac} • ${raw.armorType ?? ''}`.trim()
                  const goldCost = s.cost?.gold ? `${s.cost.gold}gp` : s.cost?.silver ? `${s.cost.silver}sp` : s.cost?.copper ? `${s.cost.copper}cp` : ''
                  return <ItemCard key={s.id} item={s as Equipment} accent="border-dnd-gold" subtitle={[sub, goldCost].filter(Boolean).join(' • ')} />
                })}
              </div>
            </div>
          )}

          {/* ── GRANT MATERIALS ────────────────────────────────────────────── */}
          {topMode === 'materials' && (
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-gray-700 pb-2 flex-wrap">
                {(['ore','cloth','hide','herb'] as MatCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMatCategory(cat)}
                    className={`px-4 py-2 rounded-t-lg font-medium capitalize transition-all ${
                      matCategory === cat ? 'bg-gray-800 text-green-400 border-t border-x border-gray-600' : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {cat === 'ore' && '⛏️'}{cat === 'cloth' && '🧵'}{cat === 'hide' && '🦎'}{cat === 'herb' && '🌿'} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-300 font-medium">Quantity:</label>
                <div className="flex gap-2">
                  {[1,3,5,10,20].map((q) => (
                    <button key={q} onClick={() => setMatQuantity(q)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        matQuantity === q ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500'
                      }`}>×{q}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1">
                {PREMADE_MATERIALS.filter((m) =>
                  matCategory === 'hide' ? (m.category === 'hide' || m.category === 'leather') : m.category === matCategory
                ).map((mat) => {
                  const tc = RARITY_COLOR[mat.rarity] ?? 'text-gray-300'
                  return (
                    <div key={mat.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all">
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm truncate ${tc}`}>{mat.name}</h4>
                          <p className="text-xs text-gray-500 capitalize">{mat.rarity}</p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => {
                              if (!selectedCharacters.length) { toast('⚠️ Select at least one character'); return }
                              selectedCharacters.forEach((cid) => grantMaterialToCharacter(cid, mat, matQuantity))
                              toast(`✅ Granted ${matQuantity}× ${mat.name} to ${selectedCharacters.length} character(s)`)
                            }}
                            className="px-2 py-0.5 bg-green-700 hover:bg-green-600 text-white text-xs rounded"
                          >+{matQuantity}</button>
                          <button
                            onClick={() => {
                              if (!characters.length) { toast('⚠️ No characters'); return }
                              grantMaterialToAllCharacters(mat, matQuantity)
                              toast(`✅ Granted ${matQuantity}× ${mat.name} to all ${characters.length} character(s)`)
                            }}
                            className="px-2 py-0.5 bg-dnd-gold hover:bg-yellow-500 text-gray-900 text-xs rounded font-bold"
                          >ALL</button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{mat.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── CUSTOM CREATE ──────────────────────────────────────────────── */}
          {topMode === 'custom' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Item Type</label>
                <div className="grid grid-cols-5 gap-2">
                  {(['gear','weapon','armor','potion','custom'] as ItemType[]).map((t) => (
                    <button key={t} onClick={() => setItemType(t)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        itemType === t ? 'bg-dnd-gold text-gray-900' : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Item Name <span className="text-red-400">*</span></label>
                  <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}
                    placeholder="Potion of Healing, Longsword…"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Rarity</label>
                  <select value={itemRarity} onChange={(e) => setItemRarity(e.target.value as Equipment['rarity'])}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold">
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic / Very Rare</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} rows={3}
                  placeholder="Effects, flavour text, notes…"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold resize-none" />
              </div>

              {itemType === 'weapon' && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Damage</label>
                    <input type="text" value={weaponDmg} onChange={(e) => setWeaponDmg(e.target.value)} placeholder="1d8, 2d6+2…"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Damage Type</label>
                    <select value={weaponDmgType} onChange={(e) => setWeaponDmgType(e.target.value as DamageType)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                    <input type="number" min="1" value={itemQty} onChange={(e) => setItemQty(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold" />
                  </div>
                </div>
              )}

              {itemType === 'armor' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Armor Type</label>
                    <select value={armorType} onChange={(e) => setArmorType(e.target.value as 'light'|'medium'|'heavy')}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold">
                      <option value="light">Light</option>
                      <option value="medium">Medium</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Armor Class</label>
                    <input type="number" min="10" max="20" value={armorAC} onChange={(e) => setArmorAC(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold" />
                  </div>
                </div>
              )}

              {itemType !== 'weapon' && itemType !== 'armor' && (
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                  <input type="number" min="1" value={itemQty} onChange={(e) => setItemQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dnd-gold" />
                </div>
              )}
            </div>
          )}

          {/* ── Character selector (shared) ────────────────────────────────── */}
          <div className="border-t border-gray-700 pt-5">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">
                Select Characters ({selectedCharacters.length} selected)
              </label>
              <button onClick={handleSelectAll} className="text-sm text-dnd-gold hover:text-yellow-500 transition-colors">
                {selectedCharacters.length === characters.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            {characters.length === 0 ? (
              <p className="text-gray-500 text-center py-8 italic">No characters. Create some first.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1">
                {characters.map((c) => (
                  <label key={c.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCharacters.includes(c.id) ? 'bg-dnd-gold/20 border-2 border-dnd-gold' : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input type="checkbox" checked={selectedCharacters.includes(c.id)} onChange={() => handleToggle(c.id)}
                      className="w-4 h-4 rounded border-gray-600 text-dnd-gold" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">{c.name}</div>
                      <div className="text-xs text-gray-400 truncate">{c.race?.name} {c.class?.name} · Lv {c.level}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Custom mode action buttons */}
          {topMode === 'custom' && (
            <div className="flex gap-3 pt-3 border-t border-gray-700">
              <button onClick={() => handleGrantCustom(false)}
                disabled={!selectedCharacters.length || !itemName.trim()}
                className={`flex-1 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  selectedCharacters.length && itemName.trim() ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}>
                Grant to Selected ({selectedCharacters.length})
              </button>
              <button onClick={() => handleGrantCustom(true)}
                disabled={!characters.length || !itemName.trim()}
                className={`flex-1 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  characters.length && itemName.trim() ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}>
                Grant to All ({characters.length})
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
