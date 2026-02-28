/**
 * Crafting recipes for the Work tab (Version 0.4.0)
 *
 * Professions:
 *  - Blacksmithing (weapons, uses ores)
 *  - Tailoring    (armor pieces, uses cloth + hides)
 *  - Alchemy      (potions, uses herbs)
 *  - Enchanting   (scrolls, uses Magical Dust/Shards)
 *
 * Skill tiers:
 *  1-25   Common
 *  26-50  Uncommon
 *  51-75  Rare
 *  76-90  Epic
 *  91-100 Legendary
 */

export type CraftingTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export interface MaterialCost {
  /** Material id matching Material.id in loot tables */
  materialId: string
  /** Human-readable label shown in UI */
  label: string
  quantity: number
}

export interface CraftedItem {
  id: string
  name: string
  tier: CraftingTier
  /** Skill level required to unlock this item */
  minSkill: number
  /** Materials consumed on craft */
  materials: MaterialCost[]
  /** Weapon dice (e.g. "1d6+1") — weapons only */
  damage?: string
  /** Damage type — weapons only */
  damageType?: string
  /** Weight in lbs */
  weight: number
  /** Passive bonus description */
  bonus: string
  /** AC bonus granted — armor only */
  acBonus?: number
  /** HP bonus granted */
  hpBonus?: number
  /** Speed bonus granted */
  speedBonus?: number
  /** Market sell value */
  worth?: { gold: number; silver: number }
}

// ---------------------------------------------------------------------------
// BLACKSMITHING RECIPES (weapons, uses ores)
// ---------------------------------------------------------------------------

/** Material IDs accepted as "ore" for blacksmithing per tier */
export const BLACKSMITHING_ORE_BY_TIER: Record<CraftingTier, string[]> = {
  common:    ['iron-ore', 'copper-ore'],
  uncommon:  ['iron-ore-unc', 'copper-ore-unc'],
  rare:      ['silver-ore', 'gold-ore'],
  epic:      ['mithril-ore', 'adamantite-ore', 'mithril-ore-epic', 'adamantite-ore-epic'],
  legendary: ['obsidian-steel-ore'],
}

export const BLACKSMITHING_RECIPES: CraftedItem[] = [
  // ── Common (Tier 1) ───────────────────────────────────────────────────────
  {
    id: 'craft-mace-common', name: 'Mace', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 3 }],
    damage: '1d6', damageType: 'Bludgeoning', weight: 4, hpBonus: 1,
    bonus: '+1 Max HP', worth: { gold: 2, silver: 5 },
  },
  {
    id: 'craft-crossbow-common', name: 'Hand-Crossbow', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 2 }, { materialId: 'copper-ore', label: 'Copper Ore Nugget', quantity: 1 }],
    damage: '1d6', damageType: 'Piercing', weight: 3,
    bonus: '+1 Initiative', speedBonus: 0, worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-bow-common', name: 'Bow', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'copper-ore', label: 'Copper Ore Nugget', quantity: 2 }],
    damage: '1d8', damageType: 'Piercing', weight: 2,
    bonus: '+1 Speed', speedBonus: 1, worth: { gold: 2, silver: 5 },
  },
  {
    id: 'craft-dagger-common', name: 'Dagger', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 1 }],
    damage: '1d4', damageType: 'Piercing', weight: 1,
    bonus: 'Spell: Light (at will)', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-sword-common', name: 'Sword', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 3 }],
    damage: '1d8', damageType: 'Slashing', weight: 2,
    bonus: 'Lightweight', worth: { gold: 3, silver: 5 },
  },
  {
    id: 'craft-flail-common', name: 'Flail', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 3 }, { materialId: 'copper-ore', label: 'Copper Ore Nugget', quantity: 1 }],
    damage: '1d8', damageType: 'Bludgeoning', weight: 2, hpBonus: 1,
    bonus: '+1 Max HP', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-pike-common', name: 'Pike', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 4 }],
    damage: '1d10', damageType: 'Piercing', weight: 18,
    bonus: 'Reach property', worth: { gold: 4, silver: 0 },
  },
  {
    id: 'craft-staff-common', name: 'Staff', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 2 }],
    damage: '1d6', damageType: 'Bludgeoning', weight: 4,
    bonus: 'Spell: Mage Hand (1/day)', worth: { gold: 2, silver: 5 },
  },
  {
    id: 'craft-wand-common', name: 'Wand', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'copper-ore', label: 'Copper Ore Nugget', quantity: 1 }],
    damage: '1d4', damageType: 'Force', weight: 1,
    bonus: 'Spell: Prestidigitation (at will)', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-axe-common', name: 'Axe', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'iron-ore', label: 'Iron Ore Nugget', quantity: 3 }],
    damage: '1d8', damageType: 'Slashing', weight: 4, hpBonus: 1,
    bonus: '+1 Max HP', worth: { gold: 3, silver: 5 },
  },

  // ── Uncommon (Tier 2) ─────────────────────────────────────────────────────
  {
    id: 'craft-mace-uncommon', name: 'Reinforced Mace', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 4 }],
    damage: '1d6+1', damageType: 'Bludgeoning', weight: 5, hpBonus: 3,
    bonus: '+3 Max HP', worth: { gold: 4, silver: 0 },
  },
  {
    id: 'craft-crossbow-uncommon', name: "Scout's Hand-Crossbow", tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 3 }, { materialId: 'copper-ore-unc', label: 'Quality Copper Ore', quantity: 1 }],
    damage: '1d6+1', damageType: 'Piercing', weight: 3,
    bonus: '+3 Speed', speedBonus: 3, worth: { gold: 5, silver: 0 },
  },
  {
    id: 'craft-bow-uncommon', name: 'Long Bow', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'copper-ore-unc', label: 'Quality Copper Ore', quantity: 3 }],
    damage: '1d8+1', damageType: 'Piercing', weight: 2,
    bonus: "Spell: Hunter's Mark (1/day)", worth: { gold: 4, silver: 5 },
  },
  {
    id: 'craft-dagger-uncommon', name: 'Steel Dagger', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 2 }],
    damage: '1d4+1', damageType: 'Piercing', weight: 1,
    bonus: '+1 Stealth', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-sword-uncommon', name: "Soldier's Sword", tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 4 }],
    damage: '1d8+1', damageType: 'Slashing', weight: 3, hpBonus: 2,
    bonus: '+2 Max HP', worth: { gold: 5, silver: 5 },
  },
  {
    id: 'craft-flail-uncommon', name: 'Heavy Flail', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 5 }],
    damage: '1d10+1', damageType: 'Bludgeoning', weight: 10, hpBonus: 5,
    bonus: '+5 Max HP', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-pike-uncommon', name: 'Militia Pike', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 5 }],
    damage: '1d10+1', damageType: 'Piercing', weight: 15, acBonus: 1,
    bonus: '+1 AC', worth: { gold: 5, silver: 0 },
  },
  {
    id: 'craft-staff-uncommon', name: 'Hardwood Staff', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 2 }, { materialId: 'copper-ore-unc', label: 'Quality Copper Ore', quantity: 1 }],
    damage: '1d6+1', damageType: 'Bludgeoning', weight: 4,
    bonus: 'Spell: Goodberry (1/day)', worth: { gold: 3, silver: 5 },
  },
  {
    id: 'craft-wand-uncommon', name: 'Glass Wand', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'copper-ore-unc', label: 'Quality Copper Ore', quantity: 2 }],
    damage: '1d4+1', damageType: 'Force', weight: 1,
    bonus: 'Spell: Magic Missile (1/day)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-axe-uncommon', name: 'Battle Axe', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'iron-ore-unc', label: 'Quality Iron Ore', quantity: 4 }],
    damage: '1d8+1', damageType: 'Slashing', weight: 4, hpBonus: 2,
    bonus: '+2 Max HP', worth: { gold: 4, silver: 5 },
  },

  // ── Rare (Tier 3) ─────────────────────────────────────────────────────────
  {
    id: 'craft-mace-rare', name: 'Spiked Mace', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 3 }],
    damage: '1d6+2', damageType: 'Bludgeoning', weight: 6, hpBonus: 5,
    bonus: '+5 Max HP', worth: { gold: 10, silver: 0 },
  },
  {
    id: 'craft-crossbow-rare', name: 'Repeating Hand-Crossbow', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 2 }, { materialId: 'gold-ore', label: 'Gold Ore Nugget', quantity: 1 }],
    damage: '1d6+2', damageType: 'Piercing', weight: 4,
    bonus: 'Ignore Loading Property', worth: { gold: 12, silver: 0 },
  },
  {
    id: 'craft-bow-rare', name: 'Composite Bow', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'gold-ore', label: 'Gold Ore Nugget', quantity: 2 }],
    damage: '1d8+2', damageType: 'Piercing', weight: 3,
    bonus: '+5 Speed', speedBonus: 5, worth: { gold: 11, silver: 0 },
  },
  {
    id: 'craft-dagger-rare', name: "Assassin's Dagger", tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 2 }],
    damage: '1d4+2', damageType: 'Piercing', weight: 1,
    bonus: 'Spell: Invisibility (1/day)', worth: { gold: 8, silver: 5 },
  },
  {
    id: 'craft-sword-rare', name: "Knight's Sword", tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 3 }],
    damage: '1d8+2', damageType: 'Slashing', weight: 3, acBonus: 1,
    bonus: '+1 AC', worth: { gold: 13, silver: 0 },
  },
  {
    id: 'craft-flail-rare', name: 'Morningstar Flail', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 3 }, { materialId: 'gold-ore', label: 'Gold Ore Nugget', quantity: 1 }],
    damage: '1d8+2', damageType: 'Piercing', weight: 4, hpBonus: 5,
    bonus: '+5 Max HP', worth: { gold: 11, silver: 5 },
  },
  {
    id: 'craft-pike-rare', name: 'Phalanx Pike', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 4 }],
    damage: '1d10+2', damageType: 'Piercing', weight: 12, acBonus: 1,
    bonus: '+4 Speed, +1 AC', speedBonus: 4, worth: { gold: 9, silver: 0 },
  },
  {
    id: 'craft-staff-rare', name: 'Shamanic Staff', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'gold-ore', label: 'Gold Ore Nugget', quantity: 2 }],
    damage: '1d6+2', damageType: 'Bludgeoning', weight: 4,
    bonus: 'Spell: Healing Word (2/day)', worth: { gold: 10, silver: 5 },
  },
  {
    id: 'craft-wand-rare', name: 'Crystal Wand', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'gold-ore', label: 'Gold Ore Nugget', quantity: 2 }],
    damage: '1d4+2', damageType: 'Force', weight: 1,
    bonus: 'Spell: Misty Step (1/day)', worth: { gold: 9, silver: 5 },
  },
  {
    id: 'craft-axe-rare', name: 'Great Axe', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'silver-ore', label: 'Silver Ore Nugget', quantity: 4 }],
    damage: '1d12+2', damageType: 'Slashing', weight: 7, hpBonus: 5,
    bonus: '+5 Max HP', worth: { gold: 12, silver: 0 },
  },

  // ── Epic (Tier 4) ─────────────────────────────────────────────────────────
  {
    id: 'craft-mace-epic', name: 'War Mace', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore', label: 'Mithril Ore Nugget', quantity: 2 }],
    damage: '1d6+2', damageType: 'Bludgeoning', weight: 5,
    bonus: "Spell: Crusader's Mantle (1/day)", worth: { gold: 22, silver: 0 },
  },
  {
    id: 'craft-crossbow-epic', name: 'Sniper Hand-Crossbow', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore', label: 'Mithril Ore Nugget', quantity: 2 }, { materialId: 'adamantite-ore', label: 'Adamantite Ore Nugget', quantity: 1 }],
    damage: '1d6+2', damageType: 'Piercing', weight: 3,
    bonus: '+8 Speed', speedBonus: 8, worth: { gold: 25, silver: 0 },
  },
  {
    id: 'craft-bow-epic', name: 'Recurve Bow', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore', label: 'Mithril Ore Nugget', quantity: 2 }],
    damage: '1d10+2', damageType: 'Piercing', weight: 3, hpBonus: 8,
    bonus: '+8 Max HP', worth: { gold: 23, silver: 0 },
  },
  {
    id: 'craft-dagger-epic', name: 'Shadow Dagger', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'adamantite-ore', label: 'Adamantite Ore Nugget', quantity: 2 }],
    damage: '1d4+2', damageType: 'Piercing', weight: 1,
    bonus: '+7 Speed', speedBonus: 7, worth: { gold: 20, silver: 0 },
  },
  {
    id: 'craft-sword-epic', name: 'Bastard Sword', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore', label: 'Mithril Ore Nugget', quantity: 3 }],
    damage: '1d10+2', damageType: 'Slashing', weight: 5, hpBonus: 10,
    bonus: '+10 Max HP', worth: { gold: 28, silver: 0 },
  },
  {
    id: 'craft-flail-epic', name: 'Triple-Headed Flail', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'adamantite-ore', label: 'Adamantite Ore Nugget', quantity: 3 }],
    damage: '2d6+2', damageType: 'Bludgeoning', weight: 8, acBonus: 1,
    bonus: '+1 AC', worth: { gold: 26, silver: 0 },
  },
  {
    id: 'craft-pike-epic', name: "Guard's Pike", tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore', label: 'Mithril Ore Nugget', quantity: 3 }],
    damage: '1d10+2', damageType: 'Piercing', weight: 10,
    bonus: 'Spell: Compelled Duel (2/day)', worth: { gold: 24, silver: 0 },
  },
  {
    id: 'craft-staff-epic', name: 'Mage Staff', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore-epic', label: 'Pure Mithril Ore', quantity: 2 }],
    damage: '1d8+2', damageType: 'Bludgeoning', weight: 4,
    bonus: 'Spell: Fireball (1/day)', worth: { gold: 30, silver: 0 },
  },
  {
    id: 'craft-wand-epic', name: 'Enchanted Wand', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'mithril-ore-epic', label: 'Pure Mithril Ore', quantity: 2 }],
    damage: '1d6+2', damageType: 'Force', weight: 1,
    bonus: 'Spell: Counterspell (1/day)', worth: { gold: 32, silver: 0 },
  },
  {
    id: 'craft-sword-epic-great', name: 'Great Sword', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'adamantite-ore-epic', label: 'Pure Adamantite Ore', quantity: 3 }],
    damage: '2d6+2', damageType: 'Slashing', weight: 6, hpBonus: 10,
    bonus: '+10 Max HP', worth: { gold: 27, silver: 0 },
  },

  // ── Legendary (Tier 5) ────────────────────────────────────────────────────
  {
    id: 'craft-mace-legendary', name: 'Ancient Mace', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d8+3', damageType: 'Bludgeoning', weight: 5, hpBonus: 15,
    bonus: '+15 Max HP', worth: { gold: 40, silver: 0 },
  },
  {
    id: 'craft-crossbow-legendary', name: 'Ancient Hand-Crossbow', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d8+3', damageType: 'Piercing', weight: 3,
    bonus: '+10 Speed', speedBonus: 10, worth: { gold: 42, silver: 0 },
  },
  {
    id: 'craft-bow-legendary', name: 'Ancient Bow', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d10+3', damageType: 'Piercing', weight: 2, hpBonus: 15,
    bonus: '+15 Max HP', worth: { gold: 43, silver: 0 },
  },
  {
    id: 'craft-dagger-legendary', name: 'Ancient Dagger', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 1 }],
    damage: '1d6+3', damageType: 'Piercing', weight: 0.5, acBonus: 2,
    bonus: '+2 AC', worth: { gold: 40, silver: 0 },
  },
  {
    id: 'craft-sword-legendary', name: 'Ancient Sword', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d10+3', damageType: 'Slashing', weight: 3, hpBonus: 10,
    bonus: '+10 Max HP', worth: { gold: 44, silver: 0 },
  },
  {
    id: 'craft-flail-legendary', name: 'Ancient Flail', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d12+3', damageType: 'Bludgeoning', weight: 6, hpBonus: 20,
    bonus: '+20 Max HP', worth: { gold: 45, silver: 0 },
  },
  {
    id: 'craft-pike-legendary', name: 'Ancient Pike', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d12+3', damageType: 'Piercing', weight: 8,
    bonus: '+10 Speed', speedBonus: 10, worth: { gold: 43, silver: 0 },
  },
  {
    id: 'craft-staff-legendary', name: 'Ancient Staff', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d10+3', damageType: 'Bludgeoning', weight: 3, hpBonus: 10,
    bonus: '+10 Max HP', worth: { gold: 46, silver: 0 },
  },
  {
    id: 'craft-wand-legendary', name: 'Ancient Wand', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 1 }],
    damage: '1d8+3', damageType: 'Force', weight: 0.5, acBonus: 2,
    bonus: '+2 AC', worth: { gold: 48, silver: 0 },
  },
  {
    id: 'craft-axe-legendary', name: 'Ancient Axe', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'obsidian-steel-ore', label: 'Obsidian-Steel Ore Nugget', quantity: 2 }],
    damage: '1d12+3', damageType: 'Slashing', weight: 5, hpBonus: 20,
    bonus: '+20 Max HP', worth: { gold: 50, silver: 0 },
  },
]

// ---------------------------------------------------------------------------
// TAILORING RECIPES (armor pieces, uses cloth + hides)
// ---------------------------------------------------------------------------

/** Material IDs accepted per tier for tailoring */
export const TAILORING_MATERIALS_BY_TIER: Record<CraftingTier, string[]> = {
  common:    ['linen-cloth', 'wool-cloth', 'light-hide'],
  uncommon:  ['silk-cloth', 'cotton-cloth', 'thick-hide'],
  rare:      ['enchanted-cloth', 'scaled-hide'],
  epic:      ['shadowweave-cloth', 'wyvern-hide'],
  legendary: ['void-silk', 'dragonscale-leather'],
}

export const TAILORING_RECIPES: CraftedItem[] = [
  // ── Common (Tier 1) ───────────────────────────────────────────────────────
  {
    id: 'craft-helmet-common', name: 'Helmet', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'linen-cloth', label: 'Linen Cloth', quantity: 2 }],
    weight: 1, hpBonus: 1, bonus: '+1 Max HP', worth: { gold: 0, silver: 1 },
  },
  {
    id: 'craft-shoulder-common', name: 'Shoulder', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'linen-cloth', label: 'Linen Cloth', quantity: 2 }],
    weight: 1, hpBonus: 1, bonus: '+1 Max HP', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-gauntlet-common', name: 'Gauntlet', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'linen-cloth', label: 'Linen Cloth', quantity: 2 }],
    weight: 1, hpBonus: 1, bonus: '+1 Max HP', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pants-common', name: 'Pants', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'wool-cloth', label: 'Wool Cloth', quantity: 3 }],
    weight: 5, hpBonus: 2, bonus: '+2 Max HP', worth: { gold: 0, silver: 3 },
  },
  {
    id: 'craft-boots-common', name: 'Boots', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'light-hide', label: 'Light Animal Hide', quantity: 1 }],
    weight: 2, speedBonus: 2, bonus: '+2 Speed', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-tunic-common', name: 'Tunic', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'wool-cloth', label: 'Wool Cloth', quantity: 3 }],
    weight: 4, acBonus: 1, bonus: '+1 AC', worth: { gold: 0, silver: 3 },
  },
  // ── Uncommon (Tier 2) ─────────────────────────────────────────────────────
  {
    id: 'craft-helmet-uncommon', name: 'Padded Helmet', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'silk-cloth', label: 'Silk Cloth', quantity: 2 }],
    weight: 2, hpBonus: 2, bonus: '+2 Max HP', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-shoulder-uncommon', name: 'Leather Shoulder', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'thick-hide', label: 'Thick Leather Hide', quantity: 1 }, { materialId: 'silk-cloth', label: 'Silk Cloth', quantity: 1 }],
    weight: 2, acBonus: 1, bonus: '+1 AC', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-gauntlet-uncommon', name: 'Thick Gauntlet', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'cotton-cloth', label: 'Cotton Cloth', quantity: 2 }],
    weight: 2, hpBonus: 2, bonus: '+2 Max HP', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-pants-uncommon', name: 'Rugged Pants', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'thick-hide', label: 'Thick Leather Hide', quantity: 2 }],
    weight: 7, hpBonus: 3, bonus: '+3 Max HP', worth: { gold: 2, silver: 5 },
  },
  {
    id: 'craft-boots-uncommon', name: 'Sturdy Boots', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'thick-hide', label: 'Thick Leather Hide', quantity: 1 }],
    weight: 3, speedBonus: 4, bonus: '+4 Speed', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-tunic-uncommon', name: 'Quilted Tunic', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'cotton-cloth', label: 'Cotton Cloth', quantity: 4 }],
    weight: 5, acBonus: 1, hpBonus: 1, bonus: '+1 AC, +1 Max HP', worth: { gold: 2, silver: 0 },
  },
  // ── Rare (Tier 3) ─────────────────────────────────────────────────────────
  {
    id: 'craft-helmet-rare', name: 'Studded Helmet', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'enchanted-cloth', label: 'Enchanted Cloth', quantity: 2 }],
    weight: 3, acBonus: 1, hpBonus: 2, bonus: '+1 AC, +2 Max HP', worth: { gold: 7, silver: 0 },
  },
  {
    id: 'craft-shoulder-rare', name: 'Gilded Shoulder', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'scaled-hide', label: 'Scaled Beast Hide', quantity: 1 }, { materialId: 'enchanted-cloth', label: 'Enchanted Cloth', quantity: 1 }],
    weight: 3, hpBonus: 4, bonus: '+4 Max HP', worth: { gold: 8, silver: 0 },
  },
  {
    id: 'craft-gauntlet-rare', name: 'Plate Gauntlet', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'scaled-hide', label: 'Scaled Beast Hide', quantity: 1 }],
    weight: 5, acBonus: 1, bonus: '+1 AC', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-pants-rare', name: 'Silk Pants', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'enchanted-cloth', label: 'Enchanted Cloth', quantity: 3 }],
    weight: 2, speedBonus: 5, bonus: '+5 Speed', worth: { gold: 9, silver: 0 },
  },
  {
    id: 'craft-boots-rare', name: 'Traveling Boots', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'scaled-hide', label: 'Scaled Beast Hide', quantity: 1 }],
    weight: 4, speedBonus: 6, bonus: '+6 Speed', worth: { gold: 7, silver: 5 },
  },
  {
    id: 'craft-tunic-rare', name: 'Linen Tunic', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'enchanted-cloth', label: 'Enchanted Cloth', quantity: 4 }],
    weight: 6, acBonus: 1, hpBonus: 3, bonus: '+1 AC, +3 Max HP', worth: { gold: 8, silver: 5 },
  },
  // ── Epic (Tier 4) ─────────────────────────────────────────────────────────
  {
    id: 'craft-helmet-epic', name: 'Great Helmet', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'shadowweave-cloth', label: 'Shadowweave Cloth', quantity: 2 }],
    weight: 5, acBonus: 2, hpBonus: 5, bonus: '+2 AC, +5 Max HP', worth: { gold: 18, silver: 0 },
  },
  {
    id: 'craft-shoulder-epic', name: 'Ornate Shoulder', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'wyvern-hide', label: 'Wyvern Hide', quantity: 1 }, { materialId: 'shadowweave-cloth', label: 'Shadowweave Cloth', quantity: 1 }],
    weight: 4, acBonus: 1, hpBonus: 8, bonus: '+1 AC, +8 Max HP', worth: { gold: 17, silver: 0 },
  },
  {
    id: 'craft-gauntlet-epic', name: 'War Gauntlet', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'wyvern-hide', label: 'Wyvern Hide', quantity: 1 }],
    weight: 6, acBonus: 2, bonus: '+2 AC', worth: { gold: 16, silver: 0 },
  },
  {
    id: 'craft-pants-epic', name: 'Heavy Pants', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'wyvern-hide', label: 'Wyvern Hide', quantity: 2 }],
    weight: 12, acBonus: 1, hpBonus: 10, bonus: '+1 AC, +10 Max HP', worth: { gold: 20, silver: 0 },
  },
  {
    id: 'craft-boots-epic', name: 'Combat Boots', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'wyvern-hide', label: 'Wyvern Hide', quantity: 1 }],
    weight: 5, speedBonus: 8, bonus: '+8 Speed', worth: { gold: 15, silver: 0 },
  },
  {
    id: 'craft-tunic-epic', name: 'Padded Tunic', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'shadowweave-cloth', label: 'Shadowweave Cloth', quantity: 4 }],
    weight: 8, acBonus: 2, hpBonus: 5, bonus: '+2 AC, +5 Max HP', worth: { gold: 22, silver: 0 },
  },
  // ── Legendary (Tier 5) ────────────────────────────────────────────────────
  {
    id: 'craft-helmet-legendary', name: 'Eternal Helmet', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'void-silk', label: 'Void Silk', quantity: 1 }, { materialId: 'dragonscale-leather', label: 'Dragonscale Leather Hide', quantity: 1 }],
    weight: 6, acBonus: 3, hpBonus: 15, bonus: '+3 AC, +15 Max HP', worth: { gold: 35, silver: 0 },
  },
  {
    id: 'craft-shoulder-legendary', name: 'Eternal Shoulder', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'dragonscale-leather', label: 'Dragonscale Leather Hide', quantity: 1 }, { materialId: 'void-silk', label: 'Void Silk', quantity: 1 }],
    weight: 5, acBonus: 2, hpBonus: 15, bonus: '+2 AC, +15 Max HP', worth: { gold: 36, silver: 0 },
  },
  {
    id: 'craft-gauntlet-legendary', name: 'Eternal Gauntlet', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'dragonscale-leather', label: 'Dragonscale Leather Hide', quantity: 1 }],
    weight: 7, acBonus: 3, hpBonus: 10, bonus: '+3 AC, +10 Max HP', worth: { gold: 35, silver: 0 },
  },
  {
    id: 'craft-pants-legendary', name: 'Eternal Pants', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'dragonscale-leather', label: 'Dragonscale Leather Hide', quantity: 1 }, { materialId: 'void-silk', label: 'Void Silk', quantity: 1 }],
    weight: 15, acBonus: 2, hpBonus: 20, bonus: '+2 AC, +20 Max HP', worth: { gold: 38, silver: 0 },
  },
  {
    id: 'craft-boots-legendary', name: 'Eternal Boots', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'dragonscale-leather', label: 'Dragonscale Leather Hide', quantity: 1 }],
    weight: 6, speedBonus: 10, acBonus: 1, bonus: '+10 Speed, +1 AC', worth: { gold: 37, silver: 0 },
  },
  {
    id: 'craft-tunic-legendary', name: 'Eternal Tunic', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'void-silk', label: 'Void Silk', quantity: 1 }, { materialId: 'dragonscale-leather', label: 'Dragonscale Leather Hide', quantity: 1 }],
    weight: 10, acBonus: 3, hpBonus: 15, bonus: '+3 AC, +15 Max HP', worth: { gold: 39, silver: 0 },
  },
]

// ---------------------------------------------------------------------------
// ALCHEMY RECIPES (potions, uses herbs)
// ---------------------------------------------------------------------------

export const ALCHEMY_HERB_BY_TIER: Record<CraftingTier, string[]> = {
  common:    ['common-herb-lavender', 'common-herb-mint'],
  uncommon:  ['uncommon-herb-foxglove', 'uncommon-herb-wolfsbane'],
  rare:      ['rare-herb-mandrake', 'rare-herb-bloodthorn'],
  epic:      ['rare-herb-nightshade', 'rare-herb-phoenix'],
  legendary: ['legendary-herb-starbloom', 'legendary-herb-soulroot'],
}

export const ALCHEMY_RECIPES: CraftedItem[] = [
  // ── Common (Tier 1) ───────────────────────────────────────────────────────
  {
    id: 'craft-pot-minor-heal', name: 'Minor Healing Potion', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-lavender', label: 'Lavender', quantity: 3 }],
    weight: 0.5, bonus: 'Restores 1d4+1 HP on use', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pot-weak-ac', name: 'Potion of Minor Ward', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 3 }],
    weight: 0.5, bonus: '+1 AC for 1 minute', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pot-slow-init', name: 'Potion of Minor Reflexes', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-lavender', label: 'Lavender', quantity: 2 }, { materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 1 }],
    weight: 0.5, bonus: '+1 to next Initiative roll', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pot-blur-invis', name: 'Potion of Blur', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 4 }],
    weight: 0.5, bonus: 'Attackers have disadvantage against you for 1 round', worth: { gold: 0, silver: 3 },
  },
  {
    id: 'craft-pot-minor-speed', name: 'Potion of Minor Speed', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-lavender', label: 'Lavender', quantity: 2 }],
    weight: 0.5, bonus: '+5 ft movement speed for 10 minutes', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pot-minor-strength', name: 'Potion of Minor Strength', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 2 }],
    weight: 0.5, bonus: '+1 STR (max 20) for 1 hour', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pot-minor-endurance', name: 'Potion of Minor Endurance', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-lavender', label: 'Lavender', quantity: 3 }],
    weight: 0.5, bonus: '+3 temporary HP for 1 hour', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-pot-minor-precision', name: 'Potion of Minor Precision', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 2 }, { materialId: 'common-herb-lavender', label: 'Lavender', quantity: 1 }],
    weight: 0.5, bonus: '+1 to attack rolls for 1 hour', worth: { gold: 0, silver: 3 },
  },
  {
    id: 'craft-pot-minor-protection', name: 'Potion of Minor Protection', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 3 }],
    weight: 0.5, bonus: 'Resistance to one chosen damage type for 1 minute', worth: { gold: 0, silver: 4 },
  },
  {
    id: 'craft-pot-minor-regen', name: 'Potion of Minor Regeneration', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'common-herb-lavender', label: 'Lavender', quantity: 2 }, { materialId: 'common-herb-mint', label: 'Mint Leaves', quantity: 2 }],
    weight: 0.5, bonus: 'Regain 1 HP at start of each turn for 1 minute', worth: { gold: 0, silver: 5 },
  },

  // ── Uncommon (Tier 2) ─────────────────────────────────────────────────────
  {
    id: 'craft-pot-lesser-heal', name: 'Lesser Healing Potion', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-foxglove', label: 'Foxglove', quantity: 3 }],
    weight: 0.5, bonus: 'Restores 2d4+2 HP on use', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-pot-simple-ac', name: 'Potion of Lesser Ward', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 3 }],
    weight: 0.5, bonus: '+2 AC for 10 minutes', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-pot-swift-init', name: 'Potion of Swift Reflexes', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-foxglove', label: 'Foxglove', quantity: 2 }, { materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 1 }],
    weight: 0.5, bonus: '+2 Initiative, +5 ft Speed for 1 hour', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-pot-shimmer-invis', name: 'Shimmer Potion', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 4 }],
    weight: 0.5, bonus: 'Invisibility for 1 minute (breaks on attack or spell)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-pot-speed', name: 'Potion of Speed', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-foxglove', label: 'Foxglove', quantity: 2 }],
    weight: 0.5, bonus: '+10 ft movement speed for 1 hour', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-pot-strength', name: 'Potion of Strength', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 2 }],
    weight: 0.5, bonus: '+2 STR (max 20) for 1 hour', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-pot-endurance', name: 'Potion of Endurance', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-foxglove', label: 'Foxglove', quantity: 3 }],
    weight: 0.5, bonus: '+6 temporary HP for 1 hour', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-pot-precision', name: 'Potion of Precision', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 2 }, { materialId: 'uncommon-herb-foxglove', label: 'Foxglove', quantity: 1 }],
    weight: 0.5, bonus: '+2 to attack rolls for 1 hour', worth: { gold: 2, silver: 0 },
  },
  {
    id: 'craft-pot-protection', name: 'Potion of Protection', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 3 }],
    weight: 0.5, bonus: 'Resistance to two chosen damage types for 10 minutes', worth: { gold: 2, silver: 5 },
  },
  {
    id: 'craft-pot-regen', name: 'Potion of Regeneration', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'uncommon-herb-foxglove', label: 'Foxglove', quantity: 2 }, { materialId: 'uncommon-herb-wolfsbane', label: 'Wolfsbane', quantity: 2 }],
    weight: 0.5, bonus: 'Regain 2 HP at start of each turn for 1 minute', worth: { gold: 3, silver: 0 },
  },

  // ── Rare (Tier 3) ─────────────────────────────────────────────────────────
  {
    id: 'craft-pot-standard-heal', name: 'Standard Healing Potion', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-bloodthorn', label: 'Bloodthorn', quantity: 2 }],
    weight: 0.5, bonus: 'Restores 3d4+3 HP on use', worth: { gold: 5, silver: 5 },
  },
  {
    id: 'craft-pot-sturdy-ac', name: 'Potion of Greater Ward', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 2 }],
    weight: 0.5, bonus: '+3 AC for 1 hour', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-pot-quick-init', name: 'Potion of Greater Reflexes', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 1 }, { materialId: 'rare-herb-bloodthorn', label: 'Bloodthorn', quantity: 1 }],
    weight: 0.5, bonus: '+3 Initiative, Dash as bonus action once per combat', worth: { gold: 7, silver: 0 },
  },
  {
    id: 'craft-pot-fade-invis', name: 'Fade Potion', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 2 }],
    weight: 0.5, bonus: 'Invisibility for 10 minutes (breaks on attack or spell)', worth: { gold: 8, silver: 0 },
  },
  {
    id: 'craft-pot-swift-speed', name: 'Potion of Swift Speed', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-bloodthorn', label: 'Bloodthorn', quantity: 2 }],
    weight: 0.5, bonus: '+15 ft movement speed for 1 hour', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-pot-greater-strength', name: 'Potion of Greater Strength', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 2 }],
    weight: 0.5, bonus: '+3 STR (max 20) for 1 hour', worth: { gold: 6, silver: 5 },
  },
  {
    id: 'craft-pot-greater-endurance', name: 'Potion of Greater Endurance', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-bloodthorn', label: 'Bloodthorn', quantity: 2 }],
    weight: 0.5, bonus: '+10 temporary HP for 1 hour', worth: { gold: 5, silver: 5 },
  },
  {
    id: 'craft-pot-greater-precision', name: 'Potion of Greater Precision', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 1 }, { materialId: 'rare-herb-bloodthorn', label: 'Bloodthorn', quantity: 1 }],
    weight: 0.5, bonus: '+3 to attack rolls for 1 hour', worth: { gold: 7, silver: 5 },
  },
  {
    id: 'craft-pot-greater-protection', name: 'Potion of Greater Protection', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 3 }],
    weight: 0.5, bonus: 'Resistance to all physical damage for 10 minutes', worth: { gold: 8, silver: 0 },
  },
  {
    id: 'craft-pot-greater-regen', name: 'Potion of Greater Regeneration', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'rare-herb-bloodthorn', label: 'Bloodthorn', quantity: 2 }, { materialId: 'rare-herb-mandrake', label: 'Mandrake Root', quantity: 1 }],
    weight: 0.5, bonus: 'Regain 3 HP at start of each turn for 1 minute', worth: { gold: 8, silver: 0 },
  },

  // ── Epic (Tier 4) ─────────────────────────────────────────────────────────
  {
    id: 'craft-pot-greater-heal', name: 'Greater Healing Potion', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }],
    weight: 0.5, bonus: 'Restores 5d4+5 HP on use', worth: { gold: 13, silver: 0 },
  },
  {
    id: 'craft-pot-strong-ac', name: 'Potion of Superior Ward', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-nightshade', label: 'Arcane Nightshade', quantity: 1 }],
    weight: 0.5, bonus: '+4 AC for 1 hour', worth: { gold: 14, silver: 0 },
  },
  {
    id: 'craft-pot-fast-init', name: 'Potion of Superior Reflexes', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-nightshade', label: 'Arcane Nightshade', quantity: 1 }, { materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }],
    weight: 0.5, bonus: '+4 Initiative, cannot be Surprised', worth: { gold: 17, silver: 0 },
  },
  {
    id: 'craft-pot-vanish-invis', name: 'Vanish Potion', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }],
    weight: 0.5, bonus: 'Invisibility for 1 hour; persists through one attack or spell', worth: { gold: 15, silver: 0 },
  },
  {
    id: 'craft-pot-epic-speed', name: 'Potion of Superior Speed', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }],
    weight: 0.5, bonus: '+20 ft movement speed for 1 hour', worth: { gold: 13, silver: 5 },
  },
  {
    id: 'craft-pot-epic-strength', name: 'Potion of Superior Strength', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-nightshade', label: 'Arcane Nightshade', quantity: 1 }],
    weight: 0.5, bonus: '+4 STR (max 22) for 1 hour', worth: { gold: 14, silver: 5 },
  },
  {
    id: 'craft-pot-epic-endurance', name: 'Potion of Superior Endurance', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }],
    weight: 0.5, bonus: '+15 temporary HP for 1 hour', worth: { gold: 14, silver: 0 },
  },
  {
    id: 'craft-pot-epic-precision', name: 'Potion of Superior Precision', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-nightshade', label: 'Arcane Nightshade', quantity: 1 }, { materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }],
    weight: 0.5, bonus: '+4 to attack rolls for 1 hour', worth: { gold: 16, silver: 0 },
  },
  {
    id: 'craft-pot-epic-protection', name: 'Potion of Superior Protection', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-nightshade', label: 'Arcane Nightshade', quantity: 2 }],
    weight: 0.5, bonus: 'Resistance to all damage for 10 minutes', worth: { gold: 17, silver: 0 },
  },
  {
    id: 'craft-pot-epic-regen', name: 'Potion of Superior Regeneration', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'rare-herb-phoenix', label: 'Phoenix Feather Grass', quantity: 1 }, { materialId: 'rare-herb-nightshade', label: 'Arcane Nightshade', quantity: 1 }],
    weight: 0.5, bonus: 'Regain 5 HP at start of each turn for 1 minute', worth: { gold: 15, silver: 0 },
  },

  // ── Legendary (Tier 5) ────────────────────────────────────────────────────
  {
    id: 'craft-pot-supreme-heal', name: 'Supreme Healing Potion', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-soulroot', label: 'Soulroot', quantity: 1 }],
    weight: 0.5, bonus: 'Restores 6d4+10 HP on use', worth: { gold: 22, silver: 0 },
  },
  {
    id: 'craft-pot-ultimate-ac', name: 'Potion of Supreme Ward', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 1 }],
    weight: 0.5, bonus: '+5 AC for 1 hour', worth: { gold: 23, silver: 0 },
  },
  {
    id: 'craft-pot-instant-init', name: 'Potion of Supreme Reflexes', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 1 }, { materialId: 'legendary-herb-soulroot', label: 'Soulroot', quantity: 1 }],
    weight: 0.5, bonus: '+6 Initiative, extra Reaction in first round of combat', worth: { gold: 25, silver: 0 },
  },
  {
    id: 'craft-pot-true-invis', name: 'Potion of True Sight', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-soulroot', label: 'Soulroot', quantity: 1 }],
    weight: 0.5, bonus: 'Invisibility for 8 hours; breaks only on taking damage from AoE', worth: { gold: 24, silver: 0 },
  },
  {
    id: 'craft-pot-supreme-speed', name: 'Potion of Supreme Speed', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 1 }],
    weight: 0.5, bonus: '+30 ft movement speed and one extra bonus action per turn for 1 hour', worth: { gold: 24, silver: 0 },
  },
  {
    id: 'craft-pot-supreme-strength', name: 'Potion of Supreme Strength', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-soulroot', label: 'Soulroot', quantity: 1 }],
    weight: 0.5, bonus: '+6 STR (max 24) for 1 hour', worth: { gold: 23, silver: 0 },
  },
  {
    id: 'craft-pot-supreme-endurance', name: 'Potion of Supreme Endurance', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 1 }],
    weight: 0.5, bonus: '+20 temporary HP; regain 2 HP at start of each turn for 10 minutes', worth: { gold: 23, silver: 5 },
  },
  {
    id: 'craft-pot-supreme-precision', name: 'Potion of Supreme Precision', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-soulroot', label: 'Soulroot', quantity: 1 }, { materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 1 }],
    weight: 0.5, bonus: '+6 to attack rolls; critical hits on 19-20 for 1 hour', worth: { gold: 25, silver: 0 },
  },
  {
    id: 'craft-pot-supreme-protection', name: 'Potion of Supreme Protection', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 2 }],
    weight: 0.5, bonus: 'Immunity to one chosen damage type for 1 hour', worth: { gold: 25, silver: 0 },
  },
  {
    id: 'craft-pot-supreme-regen', name: 'Potion of Supreme Regeneration', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'legendary-herb-soulroot', label: 'Soulroot', quantity: 1 }, { materialId: 'legendary-herb-starbloom', label: 'Starbloom Petal', quantity: 1 }],
    weight: 0.5, bonus: 'Regain 10 HP at start of each turn for 1 minute', worth: { gold: 25, silver: 0 },
  },
]

// ---------------------------------------------------------------------------
// ENCHANTING RECIPES (scrolls, uses Magical Dust/Shards)
// ---------------------------------------------------------------------------

export const ENCHANTING_MATERIALS_BY_TIER: Record<CraftingTier, string[]> = {
  common:    ['magical-dust'],
  uncommon:  ['magical-dust'],
  rare:      ['magical-dust'],
  epic:      ['magical-shard'],
  legendary: ['magical-shard'],
}

export const ENCHANTING_RECIPES: CraftedItem[] = [
  // ── Common (Tier 1) ───────────────────────────────────────────────────────
  {
    id: 'craft-scroll-minor-dex', name: 'Scroll of Minor Dexterity', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 DEX (max 20)', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-cha', name: 'Scroll of Minor Charisma', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 CHA (max 20)', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-str', name: 'Scroll of Minor Strength', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 STR (max 20)', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-con', name: 'Scroll of Minor Constitution', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 CON (max 20)', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-wis', name: 'Scroll of Minor Wisdom', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 WIS (max 20)', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-int', name: 'Scroll of Minor Intellect', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 INT (max 20)', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-ac', name: 'Scroll of Minor AC', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 3 }],
    weight: 0.1, bonus: '+1 AC applied to armor', worth: { gold: 0, silver: 3 },
  },
  {
    id: 'craft-scroll-minor-haste', name: 'Scroll of Minor Haste', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 3 }],
    weight: 0.1, bonus: '+5 ft base walking speed', worth: { gold: 0, silver: 3 },
  },
  {
    id: 'craft-scroll-minor-perception', name: 'Scroll of Minor Perception', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 Perception checks', worth: { gold: 0, silver: 2 },
  },
  {
    id: 'craft-scroll-minor-stealth', name: 'Scroll of Minor Stealth', tier: 'common', minSkill: 1,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 2 }],
    weight: 0.1, bonus: '+1 Stealth checks', worth: { gold: 0, silver: 2 },
  },

  // ── Uncommon (Tier 2) ─────────────────────────────────────────────────────
  {
    id: 'craft-scroll-lesser-dex', name: 'Scroll of Lesser Dexterity', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 DEX (max 20)', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-cha', name: 'Scroll of Lesser Charisma', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 CHA (max 20)', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-str', name: 'Scroll of Lesser Strength', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 STR (max 20)', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-con', name: 'Scroll of Lesser Constitution', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 CON (max 20)', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-wis', name: 'Scroll of Lesser Wisdom', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 WIS (max 20)', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-int', name: 'Scroll of Lesser Intellect', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 INT (max 20)', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-ac', name: 'Scroll of Lesser AC', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 5 }],
    weight: 0.1, bonus: '+2 AC applied to armor', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-scroll-lesser-haste', name: 'Scroll of Lesser Haste', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 5 }],
    weight: 0.1, bonus: '+10 ft base walking speed', worth: { gold: 1, silver: 5 },
  },
  {
    id: 'craft-scroll-lesser-perception', name: 'Scroll of Lesser Perception', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 Perception checks', worth: { gold: 1, silver: 0 },
  },
  {
    id: 'craft-scroll-lesser-stealth', name: 'Scroll of Lesser Stealth', tier: 'uncommon', minSkill: 26,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 4 }],
    weight: 0.1, bonus: '+2 Stealth checks', worth: { gold: 1, silver: 0 },
  },

  // ── Rare (Tier 3) ─────────────────────────────────────────────────────────
  {
    id: 'craft-scroll-greater-dex', name: 'Scroll of Greater Dexterity', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 DEX (can exceed 20, max 22)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-cha', name: 'Scroll of Greater Charisma', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 CHA (can exceed 20, max 22)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-str', name: 'Scroll of Greater Strength', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 STR (can exceed 20, max 22)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-con', name: 'Scroll of Greater Constitution', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 CON (can exceed 20, max 22)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-wis', name: 'Scroll of Greater Wisdom', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 WIS (can exceed 20, max 22)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-int', name: 'Scroll of Greater Intellect', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 INT (can exceed 20, max 22)', worth: { gold: 3, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-ac', name: 'Scroll of Greater AC', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 8 }],
    weight: 0.1, bonus: '+3 AC applied to armor', worth: { gold: 4, silver: 0 },
  },
  {
    id: 'craft-scroll-greater-haste', name: 'Scroll of Greater Haste', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 8 }],
    weight: 0.1, bonus: '+15 ft base walking speed', worth: { gold: 4, silver: 5 },
  },
  {
    id: 'craft-scroll-greater-perception', name: 'Scroll of Greater Perception', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 Perception checks', worth: { gold: 3, silver: 5 },
  },
  {
    id: 'craft-scroll-greater-stealth', name: 'Scroll of Greater Stealth', tier: 'rare', minSkill: 51,
    materials: [{ materialId: 'magical-dust', label: 'Magical Dust', quantity: 6 }],
    weight: 0.1, bonus: '+3 Stealth checks', worth: { gold: 3, silver: 5 },
  },

  // ── Epic (Tier 4) ─────────────────────────────────────────────────────────
  {
    id: 'craft-scroll-superior-dex', name: 'Scroll of Superior Dexterity', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+4 DEX (max 24)', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-cha', name: 'Scroll of Superior Charisma', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+4 CHA (max 24)', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-str', name: 'Scroll of Superior Strength', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+4 STR (max 24)', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-con', name: 'Scroll of Superior Constitution', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+4 CON (max 24)', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-wis', name: 'Scroll of Superior Wisdom', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+4 WIS (max 24)', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-int', name: 'Scroll of Superior Intellect', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+4 INT (max 24)', worth: { gold: 6, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-ac', name: 'Scroll of Superior AC', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 3 }],
    weight: 0.1, bonus: '+4 AC applied to armor', worth: { gold: 7, silver: 0 },
  },
  {
    id: 'craft-scroll-superior-haste', name: 'Scroll of Superior Haste', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 3 }],
    weight: 0.1, bonus: '+20 ft base walking speed', worth: { gold: 7, silver: 5 },
  },
  {
    id: 'craft-scroll-superior-perception', name: 'Scroll of Superior Perception', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+5 Perception (Expertise)', worth: { gold: 6, silver: 5 },
  },
  {
    id: 'craft-scroll-superior-stealth', name: 'Scroll of Superior Stealth', tier: 'epic', minSkill: 76,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 2 }],
    weight: 0.1, bonus: '+5 Stealth (Expertise)', worth: { gold: 6, silver: 5 },
  },

  // ── Legendary (Tier 5) ────────────────────────────────────────────────────
  {
    id: 'craft-scroll-mongoose', name: 'Scroll of Mongoose', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 4 }],
    weight: 0.1,
    bonus: 'Weapon: +2 Attack; 10% chance per hit to gain +2 AC and extra Bonus Action next turn',
    worth: { gold: 9, silver: 0 },
  },
  {
    id: 'craft-scroll-berserking', name: 'Scroll of Berserking', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 4 }],
    weight: 0.1,
    bonus: 'Weapon: −5 Attack for +10 Damage; crits grant 20 Temp HP',
    worth: { gold: 9, silver: 5 },
  },
  {
    id: 'craft-scroll-executioner', name: 'Scroll of Executioner', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 4 }],
    weight: 0.1,
    bonus: 'Weapon: Ignore resistances; target below 50 HP makes DC 17 CON save or drops to 0',
    worth: { gold: 10, silver: 0 },
  },
  {
    id: 'craft-scroll-power-torrent', name: 'Scroll of Power Torrent', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 4 }],
    weight: 0.1,
    bonus: 'Staff/Wand: Spell Save DC +2; roll d6 on cast, on 6 spell slot not consumed',
    worth: { gold: 9, silver: 0 },
  },
  {
    id: 'craft-scroll-landslide', name: 'Scroll of Landslide', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 4 }],
    weight: 0.1,
    bonus: 'Heavy weapon: +2d10 Force damage; DC 18 STR save or target knocked prone and pushed 10 ft',
    worth: { gold: 10, silver: 0 },
  },
  {
    id: 'craft-scroll-windfury', name: 'Scroll of Windfury', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 4 }],
    weight: 0.1,
    bonus: 'Melee weapon: When you Attack, make one additional weapon attack (once per turn)',
    worth: { gold: 9, silver: 5 },
  },
  {
    id: 'craft-scroll-eternal-stats', name: 'Scroll of Eternal Stats', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 5 }],
    weight: 0.1,
    bonus: 'Armor/Cloak: STR, DEX, CON permanently +2 (max 22)',
    worth: { gold: 10, silver: 0 },
  },
  {
    id: 'craft-scroll-primal-haste', name: 'Scroll of Primal Haste', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 5 }],
    weight: 0.1,
    bonus: 'Armor: Permanent Haste (no lethargy), speed doubled, +2 AC',
    worth: { gold: 9, silver: 5 },
  },
  {
    id: 'craft-scroll-infinite-ac', name: 'Scroll of Infinite AC', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 5 }],
    weight: 0.1,
    bonus: 'Armor: AC becomes 22 if lower; immunity to crits (crits become normal hits)',
    worth: { gold: 10, silver: 0 },
  },
  {
    id: 'craft-scroll-colossus', name: 'Scroll of Colossus', tier: 'legendary', minSkill: 91,
    materials: [{ materialId: 'magical-shard', label: 'Magical Shards', quantity: 5 }],
    weight: 0.1,
    bonus: 'Chest/Shield: Grow one size; Resistance to B/P/S damage; melee attacks deal extra 1d12',
    worth: { gold: 10, silver: 0 },
  },
]

// ---------------------------------------------------------------------------
// Tier color helpers
// ---------------------------------------------------------------------------

export const TIER_COLORS: Record<CraftingTier, { text: string; bg: string; border: string }> = {
  common:    { text: 'text-white',    bg: 'bg-gray-800',       border: 'border-gray-600' },
  uncommon:  { text: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-600' },
  rare:      { text: 'text-blue-400', bg: 'bg-blue-900/20',   border: 'border-blue-600' },
  epic:      { text: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-600' },
  legendary: { text: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-600' },
}

export const TIER_SKILL_RANGES: Record<CraftingTier, [number, number]> = {
  common:    [1, 25],
  uncommon:  [26, 50],
  rare:      [51, 75],
  epic:      [76, 90],
  legendary: [91, 100],
}

export function getTierForSkill(skill: number): CraftingTier {
  const ordered: CraftingTier[] = ['legendary', 'epic', 'rare', 'uncommon', 'common']
  for (const tier of ordered) {
    if (skill >= TIER_SKILL_RANGES[tier][0]) return tier
  }
  return 'common'
}
