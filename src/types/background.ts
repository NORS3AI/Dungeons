/**
 * D&D 5e Background
 * Backgrounds represent a character's life before adventuring
 */

/**
 * Background feature - special ability granted by background
 */
export interface BackgroundFeature {
  id: string
  name: string
  description: string
}

/**
 * Suggested characteristic for roleplaying
 */
export interface SuggestedCharacteristic {
  roll: number // d8 or d6 roll
  text: string
}

/**
 * Background definition
 */
export interface Background {
  id: string
  name: string
  description: string

  // Proficiencies
  skillProficiencies: string[] // Two skills
  toolProficiencies?: string[] // Tools or gaming sets
  languages?: number // Number of languages to choose

  // Equipment
  startingEquipment: string[]
  startingGold: number // Alternative gold amount

  // Feature
  feature: BackgroundFeature

  // Suggested characteristics for roleplaying
  personalityTraits?: SuggestedCharacteristic[]
  ideals?: SuggestedCharacteristic[]
  bonds?: SuggestedCharacteristic[]
  flaws?: SuggestedCharacteristic[]
}

/**
 * Acolyte - Servant of a temple
 */
export const ACOLYTE: Background = {
  id: 'acolyte',
  name: 'Acolyte',
  description:
    'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world.',
  skillProficiencies: ['insight', 'religion'],
  languages: 2,
  startingEquipment: [
    'Holy symbol',
    'Prayer book or prayer wheel',
    '5 sticks of incense',
    'Vestments',
    'Common clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'shelter-of-the-faithful',
    name: 'Shelter of the Faithful',
    description:
      'As an acolyte, you command the respect of those who share your faith. You and your companions can expect free healing and care at temples, shrines, and other established presences of your faith. You can also call upon priests for assistance that won\'t risk their lives.',
  },
  personalityTraits: [
    { roll: 1, text: 'I idolize a particular hero of my faith, and constantly refer to their deeds and example.' },
    { roll: 2, text: 'I can find common ground between the fiercest enemies, empathizing with them.' },
    { roll: 3, text: 'I see omens in every event and action. The gods try to speak to us, we just need to listen.' },
    { roll: 4, text: 'Nothing can shake my optimistic attitude.' },
    { roll: 5, text: 'I quote sacred texts and proverbs in almost every situation.' },
    { roll: 6, text: 'I am tolerant of other faiths and respect the worship of other gods.' },
    { roll: 7, text: 'I\'ve enjoyed fine food, drink, and high society. Rough living grates on me.' },
    { roll: 8, text: 'I\'ve spent so long in the temple that I have little experience dealing with people.' },
  ],
  ideals: [
    { roll: 1, text: 'Tradition. The ancient traditions of worship must be preserved and upheld. (Lawful)' },
    { roll: 2, text: 'Charity. I always try to help those in need, no matter what the personal cost. (Good)' },
    { roll: 3, text: 'Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)' },
    { roll: 4, text: 'Power. I hope to one day rise to the top of my faith\'s hierarchy. (Lawful)' },
    { roll: 5, text: 'Faith. I trust that my deity will guide my actions. I have faith that if I work hard, good things will happen. (Lawful)' },
    { roll: 6, text: 'Aspiration. I seek to prove myself worthy of my god\'s favor by matching my actions against their teachings. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'I would die to recover an ancient relic of my faith that was lost long ago.' },
    { roll: 2, text: 'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.' },
    { roll: 3, text: 'I owe my life to the priest who took me in when my parents died.' },
    { roll: 4, text: 'Everything I do is for the common people.' },
    { roll: 5, text: 'I will do anything to protect the temple where I served.' },
    { roll: 6, text: 'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.' },
  ],
  flaws: [
    { roll: 1, text: 'I judge others harshly, and myself even more severely.' },
    { roll: 2, text: 'I put too much trust in those who wield power within my temple\'s hierarchy.' },
    { roll: 3, text: 'My piety sometimes leads me to blindly trust those that profess faith in my god.' },
    { roll: 4, text: 'I am inflexible in my thinking.' },
    { roll: 5, text: 'I am suspicious of strangers and expect the worst of them.' },
    { roll: 6, text: 'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.' },
  ],
}

/**
 * Criminal - Life of crime
 */
export const CRIMINAL: Background = {
  id: 'criminal',
  name: 'Criminal',
  description:
    'You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld.',
  skillProficiencies: ['deception', 'stealth'],
  toolProficiencies: ['thieves-tools', 'gaming-set'],
  startingEquipment: [
    'Crowbar',
    'Dark common clothes with hood',
  ],
  startingGold: 15,
  feature: {
    id: 'criminal-contact',
    name: 'Criminal Contact',
    description:
      'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances.',
  },
  personalityTraits: [
    { roll: 1, text: 'I always have a plan for what to do when things go wrong.' },
    { roll: 2, text: 'I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.' },
    { roll: 3, text: 'The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.' },
    { roll: 4, text: 'I would rather make a new friend than a new enemy.' },
    { roll: 5, text: 'I am incredibly slow to trust. Those who seem fairest often have the most to hide.' },
    { roll: 6, text: 'I don\'t pay attention to the risks in a situation. Never tell me the odds.' },
    { roll: 7, text: 'The best way to get me to do something is to tell me I can\'t do it.' },
    { roll: 8, text: 'I blow up at the slightest insult.' },
  ],
  ideals: [
    { roll: 1, text: 'Honor. I don\'t steal from others in the trade. (Lawful)' },
    { roll: 2, text: 'Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)' },
    { roll: 3, text: 'Charity. I steal from the wealthy so that I can help people in need. (Good)' },
    { roll: 4, text: 'Greed. I will do whatever it takes to become wealthy. (Evil)' },
    { roll: 5, text: 'People. I\'m loyal to my friends, not to any ideals. (Neutral)' },
    { roll: 6, text: 'Redemption. There\'s a spark of good in everyone. (Good)' },
  ],
  bonds: [
    { roll: 1, text: 'I\'m trying to pay off an old debt I owe to a generous benefactor.' },
    { roll: 2, text: 'My ill-gotten gains go to support my family.' },
    { roll: 3, text: 'Something important was taken from me, and I aim to steal it back.' },
    { roll: 4, text: 'I will become the greatest thief that ever lived.' },
    { roll: 5, text: 'I\'m guilty of a terrible crime. I hope I can redeem myself for it.' },
    { roll: 6, text: 'Someone I loved died because of a mistake I made. That will never happen again.' },
  ],
  flaws: [
    { roll: 1, text: 'When I see something valuable, I can\'t think about anything but how to steal it.' },
    { roll: 2, text: 'When faced with a choice between money and my friends, I usually choose the money.' },
    { roll: 3, text: 'If there\'s a plan, I\'ll forget it. If I don\'t forget it, I\'ll ignore it.' },
    { roll: 4, text: 'I have a "tell" that reveals when I\'m lying.' },
    { roll: 5, text: 'I turn tail and run when things look bad.' },
    { roll: 6, text: 'An innocent person is in prison for a crime that I committed. I\'m okay with that.' },
  ],
}

/**
 * Folk Hero - Champion of the common people
 */
export const FOLK_HERO: Background = {
  id: 'folk-hero',
  name: 'Folk Hero',
  description:
    'You come from a humble social rank, but you are destined for so much more. Already the people of your home village regard you as their champion.',
  skillProficiencies: ['animal-handling', 'survival'],
  toolProficiencies: ['artisans-tools', 'vehicles-land'],
  startingEquipment: [
    'Artisan\'s tools (one of your choice)',
    'Shovel',
    'Iron pot',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'rustic-hospitality',
    name: 'Rustic Hospitality',
    description:
      'Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them.',
  },
  personalityTraits: [
    { roll: 1, text: 'I judge people by their actions, not their words.' },
    { roll: 2, text: 'If someone is in trouble, I\'m always ready to lend help.' },
    { roll: 3, text: 'When I set my mind to something, I follow through no matter what gets in my way.' },
    { roll: 4, text: 'I have a strong sense of fair play and always try to find the most equitable solution to arguments.' },
    { roll: 5, text: 'I\'m confident in my own abilities and do what I can to instill confidence in others.' },
    { roll: 6, text: 'Thinking is for other people. I prefer action.' },
    { roll: 7, text: 'I misuse long words in an attempt to sound smarter.' },
    { roll: 8, text: 'I get bored easily. When am I going to get on with my destiny?' },
  ],
  ideals: [
    { roll: 1, text: 'Respect. People deserve to be treated with dignity and respect. (Good)' },
    { roll: 2, text: 'Fairness. No one should get preferential treatment before the law. (Lawful)' },
    { roll: 3, text: 'Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)' },
    { roll: 4, text: 'Might. If I become strong, I can take what I want. (Evil)' },
    { roll: 5, text: 'Sincerity. There\'s no good in pretending to be something I\'m not. (Neutral)' },
    { roll: 6, text: 'Destiny. Nothing can stop me from achieving my greater purpose. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'I have a family, but I have no idea where they are. I hope to see them again.' },
    { roll: 2, text: 'I worked the land, I love the land, and I will protect the land.' },
    { roll: 3, text: 'A proud noble once gave me a horrible beating, and I will take my revenge.' },
    { roll: 4, text: 'My tools are symbols of my past life, and I carry them so I\'ll never forget my roots.' },
    { roll: 5, text: 'I protect those who cannot protect themselves.' },
    { roll: 6, text: 'I wish my childhood sweetheart had come with me to pursue my destiny.' },
  ],
  flaws: [
    { roll: 1, text: 'The tyrant who rules my land will stop at nothing to see me killed.' },
    { roll: 2, text: 'I\'m convinced of the significance of my destiny, and blind to my shortcomings.' },
    { roll: 3, text: 'The people who knew me when I was young know my shameful secret.' },
    { roll: 4, text: 'I have a weakness for the vices of the city, especially hard drink.' },
    { roll: 5, text: 'Secretly, I believe that things would be better if I were a tyrant ruling the land.' },
    { roll: 6, text: 'I have trouble trusting in my allies.' },
  ],
}

/**
 * Noble - Aristocratic background
 */
export const NOBLE: Background = {
  id: 'noble',
  name: 'Noble',
  description:
    'You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.',
  skillProficiencies: ['history', 'persuasion'],
  toolProficiencies: ['gaming-set'],
  languages: 1,
  startingEquipment: [
    'Fine clothes',
    'Signet ring',
    'Scroll of pedigree',
  ],
  startingGold: 25,
  feature: {
    id: 'position-of-privilege',
    name: 'Position of Privilege',
    description:
      'Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. Common folk and merchants make every effort to accommodate you.',
  },
  personalityTraits: [
    { roll: 1, text: 'My eloquent flattery makes everyone I talk to feel like the most wonderful person in the world.' },
    { roll: 2, text: 'The common folk love me for my kindness and generosity.' },
    { roll: 3, text: 'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.' },
    { roll: 4, text: 'I take great pains to always look my best and follow the latest fashions.' },
    { roll: 5, text: 'I don\'t like to get my hands dirty, and I won\'t be caught dead in unsuitable accommodations.' },
    { roll: 6, text: 'Despite my noble birth, I do not place myself above other folk. We all have the same blood.' },
    { roll: 7, text: 'My favor, once lost, is lost forever.' },
    { roll: 8, text: 'If you do me an injury, I will crush you, ruin your name, and salt your fields.' },
  ],
  ideals: [
    { roll: 1, text: 'Respect. Respect is due to me because of my position, but all people deserve to be treated with dignity. (Good)' },
    { roll: 2, text: 'Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)' },
    { roll: 3, text: 'Independence. I must prove that I can handle myself without coddling from my family. (Chaotic)' },
    { roll: 4, text: 'Power. If I can attain more power, no one will tell me what to do. (Evil)' },
    { roll: 5, text: 'Family. Blood runs thicker than water. (Any)' },
    { roll: 6, text: 'Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)' },
  ],
  bonds: [
    { roll: 1, text: 'I will face any challenge to win the approval of my family.' },
    { roll: 2, text: 'My house\'s alliance with another noble family must be sustained at all costs.' },
    { roll: 3, text: 'Nothing is more important than the other members of my family.' },
    { roll: 4, text: 'I am in love with the heir of a family that my family despises.' },
    { roll: 5, text: 'My loyalty to my sovereign is unwavering.' },
    { roll: 6, text: 'The common folk must see me as a hero of the people.' },
  ],
  flaws: [
    { roll: 1, text: 'I secretly believe that everyone is beneath me.' },
    { roll: 2, text: 'I hide a truly scandalous secret that could ruin my family forever.' },
    { roll: 3, text: 'I too often hear veiled insults and threats in every word addressed to me.' },
    { roll: 4, text: 'I have an insatiable desire for carnal pleasures.' },
    { roll: 5, text: 'In fact, the world does revolve around me.' },
    { roll: 6, text: 'By my words and actions, I often bring shame to my family.' },
  ],
}

/**
 * Sage - Dedicated scholar
 */
export const SAGE: Background = {
  id: 'sage',
  name: 'Sage',
  description:
    'You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you.',
  skillProficiencies: ['arcana', 'history'],
  languages: 2,
  startingEquipment: [
    'Bottle of black ink',
    'Quill',
    'Small knife',
    'Letter from dead colleague with unanswered question',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'researcher',
    name: 'Researcher',
    description:
      'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this comes from a library, scriptorium, university, or a sage.',
  },
  personalityTraits: [
    { roll: 1, text: 'I use polysyllabic words that convey the impression of great erudition.' },
    { roll: 2, text: 'I\'ve read every book in the world\'s greatest libraries—or I like to boast that I have.' },
    { roll: 3, text: 'I\'m used to helping out those who aren\'t as smart as I am, and I patiently explain anything and everything to others.' },
    { roll: 4, text: 'There\'s nothing I like more than a good mystery.' },
    { roll: 5, text: 'I\'m willing to listen to every side of an argument before I make my own judgment.' },
    { roll: 6, text: 'I... speak... slowly... when talking... to idiots... which... almost... everyone... is.' },
    { roll: 7, text: 'I am horribly, horribly awkward in social situations.' },
    { roll: 8, text: 'I\'m convinced that people are always trying to steal my secrets.' },
  ],
  ideals: [
    { roll: 1, text: 'Knowledge. The path to power and self-improvement is through knowledge. (Neutral)' },
    { roll: 2, text: 'Beauty. What is beautiful points us beyond itself toward what is true. (Good)' },
    { roll: 3, text: 'Logic. Emotions must not cloud our logical thinking. (Lawful)' },
    { roll: 4, text: 'No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)' },
    { roll: 5, text: 'Power. Knowledge is the path to power and domination. (Evil)' },
    { roll: 6, text: 'Self-Improvement. The goal of a life of study is the betterment of oneself. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'It is my duty to protect my students.' },
    { roll: 2, text: 'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.' },
    { roll: 3, text: 'I work to preserve a library, university, scriptorium, or monastery.' },
    { roll: 4, text: 'My life\'s work is a series of tomes related to a specific field of lore.' },
    { roll: 5, text: 'I\'ve been searching my whole life for the answer to a certain question.' },
    { roll: 6, text: 'I sold my soul for knowledge. I hope to do great deeds and win it back.' },
  ],
  flaws: [
    { roll: 1, text: 'I am easily distracted by the promise of information.' },
    { roll: 2, text: 'Most people scream and run when they see a demon. I stop and take notes on its anatomy.' },
    { roll: 3, text: 'Unlocking an ancient mystery is worth the price of a civilization.' },
    { roll: 4, text: 'I overlook obvious solutions in favor of complicated ones.' },
    { roll: 5, text: 'I speak without really thinking through my words, invariably insulting others.' },
    { roll: 6, text: 'I can\'t keep a secret to save my life, or anyone else\'s.' },
  ],
}

/**
 * Soldier - Military veteran
 */
export const SOLDIER: Background = {
  id: 'soldier',
  name: 'Soldier',
  description:
    'War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, and learned basic survival techniques.',
  skillProficiencies: ['athletics', 'intimidation'],
  toolProficiencies: ['gaming-set', 'vehicles-land'],
  startingEquipment: [
    'Insignia of rank',
    'Trophy from fallen enemy',
    'Bone dice or deck of cards',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'military-rank',
    name: 'Military Rank',
    description:
      'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses.',
  },
  personalityTraits: [
    { roll: 1, text: 'I\'m always polite and respectful.' },
    { roll: 2, text: 'I\'m haunted by memories of war. I can\'t get the images of violence out of my mind.' },
    { roll: 3, text: 'I\'ve lost too many friends, and I\'m slow to make new ones.' },
    { roll: 4, text: 'I\'m full of inspiring and cautionary tales from my military experience.' },
    { roll: 5, text: 'I can stare down a hell hound without flinching.' },
    { roll: 6, text: 'I enjoy being strong and like breaking things.' },
    { roll: 7, text: 'I have a crude sense of humor.' },
    { roll: 8, text: 'I face problems head-on. A simple, direct solution is the best path to success.' },
  ],
  ideals: [
    { roll: 1, text: 'Greater Good. Our lot is to lay down our lives in defense of others. (Good)' },
    { roll: 2, text: 'Responsibility. I do what I must and obey just authority. (Lawful)' },
    { roll: 3, text: 'Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)' },
    { roll: 4, text: 'Might. In life as in war, the stronger force wins. (Evil)' },
    { roll: 5, text: 'Live and Let Live. Ideals aren\'t worth killing over or going to war for. (Neutral)' },
    { roll: 6, text: 'Nation. My city, nation, or people are all that matter. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'I would still lay down my life for the people I served with.' },
    { roll: 2, text: 'Someone saved my life on the battlefield. I will never leave a friend behind.' },
    { roll: 3, text: 'My honor is my life.' },
    { roll: 4, text: 'I\'ll never forget the crushing defeat my company suffered or the enemies who dealt it.' },
    { roll: 5, text: 'Those who fight beside me are those worth dying for.' },
    { roll: 6, text: 'I fight for those who cannot fight for themselves.' },
  ],
  flaws: [
    { roll: 1, text: 'The monstrous enemy we faced in battle still leaves me quivering with fear.' },
    { roll: 2, text: 'I have little respect for anyone who is not a proven warrior.' },
    { roll: 3, text: 'I made a terrible mistake in battle that cost many lives, and I would do anything to keep that secret.' },
    { roll: 4, text: 'My hatred of my enemies is blind and unreasoning.' },
    { roll: 5, text: 'I obey the law, even if the law causes misery.' },
    { roll: 6, text: 'I\'d rather eat my armor than admit when I\'m wrong.' },
  ],
}

/**
 * All available backgrounds
 */
export const AVAILABLE_BACKGROUNDS: Background[] = [
  ACOLYTE,
  CRIMINAL,
  FOLK_HERO,
  NOBLE,
  SAGE,
  SOLDIER,
]
