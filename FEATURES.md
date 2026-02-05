# Dungeons - Features Guide

Complete reference for all classes, subclasses, and special features available in Dungeons.

---

## Classes Overview

### PHB Classes (12)

| Class | Hit Die | Primary | Spellcasting | Subclass Level |
|-------|---------|---------|--------------|----------------|
| Barbarian | d12 | STR | None | 3 |
| Bard | d8 | CHA | Full | 3 |
| Cleric | d8 | WIS | Full | 1 |
| Druid | d8 | WIS | Full | 2 |
| Fighter | d10 | STR/DEX | None | 3 |
| Monk | d8 | DEX/WIS | None | 3 |
| Paladin | d10 | STR/CHA | Half | 3 |
| Ranger | d10 | DEX/WIS | Half | 3 |
| Rogue | d8 | DEX | None | 3 |
| Sorcerer | d6 | CHA | Full | 1 |
| Warlock | d8 | CHA | Pact | 1 |
| Wizard | d6 | INT | Full | 2 |

### Custom Classes (4) - WoW/Diablo Inspired (Balanced)

| Class | Hit Die | Primary | Spellcasting | Subclass Level | Notes |
|-------|---------|---------|--------------|----------------|-------|
| Amazon | d10 | DEX/STR | Half | 3 | Balanced resource costs |
| Death Knight | d10 | STR/CON | Third | 3 | Runic Power system |
| Demon Hunter | d10 | DEX | Half | 3 | Balanced AoE/mobility |
| Necromancer | d6 | INT | Full | 2 | Essence system |

**All custom classes have been balanced for competitive play with PHB classes.**

---

## Custom Classes Detail

### Death Knight (World of Warcraft) - BALANCED

*A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.*

**Resource:** Runic Power (4 + level, regain half on short rest, all on long rest)

**Key Features:**
| Level | Feature |
|-------|---------|
| 1 | Runic Power pool, Rune Weapon (costs 2 RP, +1d4 necrotic) |
| 2 | Death Grip (costs 3 RP, pull 20ft, STR save) |
| 5 | Extra Attack |
| 7 | Lichborne (immune charm/fear, advantage vs disease/poison) |
| 14 | Army of the Dead (costs 5 RP, summon 4 ghouls) |

**Subclasses:**
- **Blood** - Vampiric tank with life drain (Blood Boil: 1d8 necrotic + temp HP, Vampiric Blood: temp HP + 10% healing)
- **Frost** - Cold damage with weapon mastery (Frost Strike: +1d8 cold, Breath of Sindragosa: 6d8 cold cone)
- **Unholy** - Disease and undead commander (Raise Dead: 1-2 ghouls, Festering Wound: 1d4 necrotic DoT)

---

### Necromancer (Diablo Series) - BALANCED

*A master of the dark arts who commands undead minions, manipulates bones and blood, and wields devastating curse magic.*

**Resource:** Essence (5 + level, regain half on short rest, all on long rest, +1 when minions deal damage/creatures die nearby)

**Key Features:**
| Level | Feature |
|-------|---------|
| 1 | Essence pool, Raise Skeleton (costs 3, max 1, increases to 2 at level 11) |
| 2 | Corpse Explosion (costs 2, 2d8 necrotic AoE, DEX save for half) |
| 3 | Bone Armor (costs 3, temp HP = level + INT) |
| 11 | Summon Golem (costs 5 + 1 charge/long rest, one golem at a time) |

**Subclasses:**
- **Path of Bone** - Offensive bone magic (Bone Spear: 2d10 piercing, Bone Spirit: 5d6 necrotic, Bone Storm: 3d6 slashing)
- **Path of Blood** - Life manipulation (Blood Surge: 2d6 necrotic + heal, Siphon Blood: 25% healing, Hemorrhage: 3d8 + 1d8/turn)
- **Path of the Summoner** - Enhanced minions (Skeleton Mastery: +1 limit & bonuses, Revive: 10-min undead, Death Lord: +2 AC/+10 HP/+1d6 damage)

---

### Demon Hunter (WoW + Diablo) - BALANCED

*A relentless slayer who has sacrificed part of their humanity to gain demonic powers, hunting fiends with supernatural abilities.*

**Key Features:**
| Level | Feature |
|-------|---------|
| 1 | Spectral Sight (see invisible 30ft, +30ft darkvision) |
| 3 | Fel Rush (20ft dash, 1d8 fire, DEX save, 2 charges/short rest) |
| 5 | Extra Attack |
| 6 | Blade Dance (5ft AoE, 2d6 slashing, DEX save, 2 charges/short rest) |
| 9 | Metamorphosis (+1 AC, 30ft fly, +1d6 fire, 1 charge/long rest) |

**Subclasses:**
- **Vengeance** - Tank (Demon Spikes: +1 AC + 1d4 retaliation, Infernal Strike: 20ft leap + 2d6 fire)
- **Havoc** - Melee DPS (Eye Beam: 40ft line 4d6 fire, Momentum: +1d6 after Fel Rush)
- **Shadow** - Ranged/stealth (Shadow Power: hide + 1d8 bonus, Multishot: 15ft cone 3d6, Rain of Vengeance: 20ft radius 6d6)

---

### Amazon (Diablo 2) - BALANCED

*A warrior from the Skovos Isles, master of javelin, bow, and spear combat enhanced by elemental and divine magic.*

**Key Features:**
| Level | Feature |
|-------|---------|
| 1 | Inner Sight (1 charge/short rest, negate invisibility/hiding), Critical Strike (1 charge/short rest, advantage) |
| 2 | Dodge (reaction, disadvantage, 2 charges/short rest) |
| 5 | Extra Attack |
| 7 | Avoid (advantage on DEX saves) |
| 11 | Summon Valkyrie (AC 16, HP = 2x level + 10, 1 charge/long rest) |

**Fighting Styles:**
- Archery (+2 ranged attack)
- Thrown Weapon Fighting (+2 damage, quick draw)
- Spear Fighting (+1 attack/damage with shield)

**Subclasses:**
- **Javelin and Spear** - Lightning-infused (Power Strike: +1d6 lightning, Charged Strike: +1 target 2d6, Lightning Fury: 15ft radius 6d6)
- **Bow and Crossbow** - Elemental arrows (Magic Arrow: +1d4 force, Immolation Arrow: 3d6 fire AoE, Strafe: 4 targets)
- **Passive and Magic** - Defense/summons (Decoy: illusion, Improved Dodge: 3 charges, Blade Guardian: +1 AC + 1d8 retaliation)

---

## Fighter Enhancement: Dual Two-Handed

The Fighter class now has a fully detailed **Dual Two-Handed** fighting style for players who want to wield two greatswords (or similar) simultaneously.

### Mechanics
- **AC Penalty:** -4 to Armor Class while using this style
- **Damage:** Roll damage for both weapons on each attack action
- **Compatible Weapons:**
  - Greatsword: 2d6 + 2d6 slashing (4d6 total)
  - Greataxe: 1d12 + 1d12 slashing (2d12 total)
  - Maul: 2d6 + 2d6 bludgeoning (4d6 total)
  - Halberd: 1d10 + 1d10 slashing (2d10 total, reach)
  - Glaive: 1d10 + 1d10 slashing (2d10 total, reach)
  - Pike: 1d10 + 1d10 piercing (2d10 total, reach)

### Example Damage Output (Level 5 Fighter, 18 STR)
- Standard Greatsword: 2d6 + 4 = avg 11 damage per attack, 22 per round
- Dual Greatswords: 4d6 + 8 = avg 22 damage per attack, 44 per round
- Trade-off: 4 AC lower (e.g., AC 18 becomes AC 14)

---

## WoW/Diablo Spell List

### Death Knight Spells
- Death Coil, Howling Blast, Chains of Ice, Bone Shield
- Death Strike, Pillar of Frost, Army of the Dead
- Death and Decay, Drain Life

### Necromancer Spells
- Teeth (cantrip), Bone Spear, Corpse Explosion, Bone Spirit
- Blood Nova, Bone Prison, Bone Wall, Iron Maiden
- Decrepify, Land of the Dead, Poison Nova, Revive

### Demon Hunter Spells
- Fel Rush, Eye Beam, Immolation Aura, Metamorphosis
- Multishot, Rain of Vengeance, Vault

### Amazon Spells
- Magic Arrow (cantrip), Power Strike, Charged Strike
- Lightning Fury, Immolation Arrow, Freezing Arrow
- Guided Arrow, Inner Sight, Slow Missiles
- Decoy, Summon Valkyrie

---

## Subclass Reference

### PHB Subclasses (28)

| Class | Subclasses |
|-------|------------|
| Barbarian | Path of the Berserker, Path of the Totem Warrior |
| Bard | College of Lore, College of Valor |
| Cleric | Life Domain, Light Domain |
| Druid | Circle of the Land, Circle of the Moon |
| Fighter | Champion, Battle Master, Eldritch Knight |
| Monk | Way of the Open Hand, Way of Shadow |
| Paladin | Oath of Devotion, Oath of Vengeance |
| Ranger | Hunter, Beast Master |
| Rogue | Thief, Assassin |
| Sorcerer | Draconic Bloodline, Wild Magic |
| Warlock | Great Old One, Fiend, Archfey, Hexblade, Celestial |
| Wizard | School of Evocation, School of Abjuration |

### Custom Subclasses (12)

| Class | Subclasses |
|-------|------------|
| Amazon | Javelin and Spear, Bow and Crossbow, Passive and Magic |
| Death Knight | Blood, Frost, Unholy |
| Demon Hunter | Vengeance, Havoc, Shadow |
| Necromancer | Path of Bone, Path of Blood, Path of the Summoner |

---

## Spell Data Organization

Spells are now organized by class in separate files for better maintainability:
- **Common Spells**: Shared spells like Detect Magic, Mage Hand, Minor Illusion
- **Warlock Spells**: Pact Magic spells + Great Old One expanded spells
- **Wizard Spells**: Full arcane spell list (cantrips through level 9)
- **Cleric Spells**: Divine spells with domain options
- **Necromancer Spells**: Death magic and summoning spells

All spell data includes proper TypeScript typing for:
- Damage dice, spell schools, components
- Casting time, range (with shape/size for AoE)
- Duration, concentration, ritual status
- Saving throws, attack rolls

## Total Content

- **16 Classes** (12 PHB + 4 Custom, all balanced)
- **40 Subclasses** (28 PHB + 12 Custom)
- **440+ Spells** (PHB core + Warlock + Wizard + Cleric + Necromancer)
- **6 Fighting Styles** for Fighter
- **Resource Systems** for custom classes (Runic Power, Essence)
- **Comprehensive balancing** for all custom content

---

*Last Updated: February 2026*
