/**
 * Skill reference data
 * All D&D 5e skills with descriptions and examples
 */
import type { SkillRef } from './types'

export const SKILLS: Record<string, SkillRef> = {
  'acrobatics': {
    id: 'acrobatics',
    name: 'Acrobatics',
    ability: 'dexterity',
    description: 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you\'re trying to run across ice, balance on a tightrope, or stay upright on a rocking ship\'s deck.',
    examples: ['Balance on a tightrope', 'Stay upright on a rocking surface', 'Perform acrobatic stunts'],
  },
  'animal-handling': {
    id: 'animal-handling',
    name: 'Animal Handling',
    ability: 'wisdom',
    description: 'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal\'s intentions, you might need to make a Wisdom (Animal Handling) check.',
    examples: ['Calm a spooked horse', 'Intuit an animal\'s intentions', 'Control your mount in battle'],
  },
  'arcana': {
    id: 'arcana',
    name: 'Arcana',
    ability: 'intelligence',
    description: 'Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.',
    examples: ['Identify a spell being cast', 'Recall magical lore', 'Recognize magical symbols'],
  },
  'athletics': {
    id: 'athletics',
    name: 'Athletics',
    ability: 'strength',
    description: 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming.',
    examples: ['Climb a cliff', 'Jump an unusual distance', 'Swim in rough water', 'Grapple a creature'],
  },
  'deception': {
    id: 'deception',
    name: 'Deception',
    ability: 'charisma',
    description: 'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions.',
    examples: ['Mislead someone', 'Fast-talk a guard', 'Disguise your intentions', 'Maintain a false identity'],
  },
  'history': {
    id: 'history',
    name: 'History',
    ability: 'intelligence',
    description: 'Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.',
    examples: ['Recall historical events', 'Identify ancient artifacts', 'Know about noble lineages'],
  },
  'insight': {
    id: 'insight',
    name: 'Insight',
    ability: 'wisdom',
    description: 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone\'s next move.',
    examples: ['Detect a lie', 'Predict behavior', 'Read body language'],
  },
  'intimidation': {
    id: 'intimidation',
    name: 'Intimidation',
    ability: 'charisma',
    description: 'When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make a Charisma (Intimidation) check.',
    examples: ['Threaten someone', 'Pry information through threats', 'Scare off enemies'],
  },
  'investigation': {
    id: 'investigation',
    name: 'Investigation',
    ability: 'intelligence',
    description: 'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check.',
    examples: ['Search for clues', 'Deduce hidden information', 'Find hidden doors'],
  },
  'medicine': {
    id: 'medicine',
    name: 'Medicine',
    ability: 'wisdom',
    description: 'A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.',
    examples: ['Stabilize a dying creature', 'Diagnose an illness', 'Treat a wound'],
  },
  'nature': {
    id: 'nature',
    name: 'Nature',
    ability: 'intelligence',
    description: 'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.',
    examples: ['Identify plants', 'Recall animal behavior', 'Predict weather'],
  },
  'perception': {
    id: 'perception',
    name: 'Perception',
    ability: 'wisdom',
    description: 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings.',
    examples: ['Spot hidden creatures', 'Hear approaching enemies', 'Notice subtle details'],
  },
  'performance': {
    id: 'performance',
    name: 'Performance',
    ability: 'charisma',
    description: 'Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.',
    examples: ['Play an instrument', 'Dance', 'Act in a play', 'Tell a compelling story'],
  },
  'persuasion': {
    id: 'persuasion',
    name: 'Persuasion',
    ability: 'charisma',
    description: 'When you attempt to influence someone through good nature, tact, or social graces, you make a Charisma (Persuasion) check.',
    examples: ['Negotiate a deal', 'Convince someone', 'Make a good impression'],
  },
  'religion': {
    id: 'religion',
    name: 'Religion',
    ability: 'intelligence',
    description: 'Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and practices of secret cults.',
    examples: ['Identify religious symbols', 'Recall deity lore', 'Recognize cult practices'],
  },
  'sleight-of-hand': {
    id: 'sleight-of-hand',
    name: 'Sleight of Hand',
    ability: 'dexterity',
    description: 'Whenever you attempt an act of legerdemain or manual trickery, you make a Dexterity (Sleight of Hand) check.',
    examples: ['Pick a pocket', 'Conceal an object', 'Plant something on someone'],
  },
  'stealth': {
    id: 'stealth',
    name: 'Stealth',
    ability: 'dexterity',
    description: 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, or slip away without being noticed.',
    examples: ['Hide from enemies', 'Move silently', 'Tail someone'],
  },
  'survival': {
    id: 'survival',
    name: 'Survival',
    ability: 'wisdom',
    description: 'The DM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through terrain, or predict the weather.',
    examples: ['Track creatures', 'Hunt game', 'Navigate wilderness', 'Identify natural hazards'],
  },
}

