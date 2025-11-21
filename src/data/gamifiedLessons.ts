// Comprehensive gamified lesson curriculum for all CEFR levels
// Each lesson designed to be engaging, achievement-driven, and fun!

export const gamifiedLessons = [
  // ==================== A1 LEVEL - BEGINNER ====================
  {
    level: 'A1',
    lesson_number: 1,
    title: '👋 First Words Quest',
    description: 'Your German adventure begins! Master basic greetings and unlock the Social Butterfly badge.',
    theme_id: 'social',
    scenario_context: "You've just arrived in Berlin and you're meeting your new roommate for the first time! You're standing outside your apartment building, and someone friendly approaches you with a smile. Time to make a great first impression with your German greetings!",
    key_phrases: [
      { german: 'Hallo', english: 'Hello', pronunciation: 'HAH-loh' },
      { german: 'Wie heißt du?', english: "What's your name? (informal)", pronunciation: 'vee HEIST doo' },
      { german: 'Ich heiße...', english: 'My name is...', pronunciation: 'ikh HY-suh' },
      { german: 'Freut mich', english: 'Nice to meet you', pronunciation: 'FROYT mikh' },
      { german: 'Tschüss', english: 'Bye', pronunciation: 'CHOOS' }
    ],
    example_dialogue: [
      { speaker: 'AI', german: 'Hallo! Wie heißt du?', english: 'Hello! What\'s your name?' },
      { speaker: 'You', german: 'Hallo! Ich heiße Anna.', english: 'Hello! My name is Anna.' },
      { speaker: 'AI', german: 'Freut mich, Anna! Ich heiße Max.', english: 'Nice to meet you, Anna! My name is Max.' },
      { speaker: 'You', german: 'Freut mich auch!', english: 'Nice to meet you too!' }
    ],
    conversation_scripts: [
      {
        id: 1,
        aiMessage: 'Hallo! Ich bin dein Sprachpartner. Wie heißt du?',
        prompt: 'Greet me and tell me your name',
        hints: ['Use "Hallo" to greet', 'Use "Ich heiße..." to say your name'],
        expectedPhrases: ['hallo', 'ich heiße']
      },
      {
        id: 2,
        aiMessage: 'Sehr gut! Und woher kommst du?',
        prompt: 'Tell me where you\'re from (use: Ich komme aus...)',
        hints: ['Say your country in German', 'Use "Ich komme aus..."'],
        expectedPhrases: ['ich komme', 'aus']
      },
      {
        id: 3,
        aiMessage: 'Wunderbar! Jetzt sag auf Wiedersehen.',
        prompt: 'Say goodbye in a friendly way',
        hints: ['You can use "Tschüss" or "Auf Wiedersehen"'],
        expectedPhrases: ['tschüss', 'auf wiedersehen', 'bye']
      }
    ],
    challenge_scenario: 'Überraschung! Your new friend just said "Bis bald!" instead of goodbye. How do you respond naturally? (Hint: "Bis bald" means "See you soon!")',
    objectives: [
      '✨ Say hello and goodbye like a native',
      '🎯 Introduce yourself with confidence',
      '💬 Ask "What\'s your name?" three different ways',
      '🏆 Unlock: Conversation Starter badge'
    ],
    grammar_topics: ['sein (to be)', 'Personal pronouns', 'W-questions'],
    vocabulary_list: [
      { german: 'Hallo', english: 'Hello', type: 'greeting', xp: 5 },
      { german: 'Guten Morgen', english: 'Good morning', type: 'greeting', xp: 5 },
      { german: 'Guten Tag', english: 'Good day', type: 'greeting', xp: 5 },
      { german: 'Guten Abend', english: 'Good evening', type: 'greeting', xp: 5 },
      { german: 'Tschüss', english: 'Bye', type: 'greeting', xp: 5 },
      { german: 'Auf Wiedersehen', english: 'Goodbye', type: 'greeting', xp: 10 },
      { german: 'Wie heißt du?', english: 'What\'s your name? (informal)', type: 'question', xp: 15 },
      { german: 'Wie heißen Sie?', english: 'What\'s your name? (formal)', type: 'question', xp: 15 },
      { german: 'Ich heiße...', english: 'My name is...', type: 'expression', xp: 10 },
      { german: 'Freut mich', english: 'Nice to meet you', type: 'expression', xp: 15 }
    ],
    conversation_prompts: [
      '🎮 Greet a stranger at a party',
      '🎮 Introduce yourself to your new neighbor',
      '🎮 Say goodbye to a friend at the train station'
    ],
    exercises: [
      {
        type: 'fill_in_blank',
        question: 'Complete: Guten _____, wie geht es Ihnen?',
        answer: 'Tag',
        options: ['Tag', 'Nacht', 'Morgen', 'Abend'],
        xp: 10,
        hint: 'Used during the day!'
      },
      {
        type: 'multiple_choice',
        question: 'How do you say "My name is Anna" in German?',
        answer: 'Ich heiße Anna',
        options: ['Ich bin Anna', 'Ich heiße Anna', 'Mein Name Anna', 'Anna ich'],
        xp: 15,
        hint: 'Use the verb "heißen"'
      },
      {
        type: 'translation',
        question: '🔥 Translate: "Good evening, nice to meet you"',
        answer: 'Guten Abend, freut mich',
        xp: 25,
        hint: 'Think formal evening greeting'
      }
    ],
    estimated_duration_minutes: 25,
    difficulty_score: 1,
    xp_reward: 100,
    badge: 'conversation_starter',
    prerequisites: []
  },

  {
    level: 'A1',
    lesson_number: 2,
    title: '☕ Coffee Shop Champion',
    description: 'Order like a local! Master café vocabulary and earn the Barista\'s Friend badge.',
    theme_id: 'coffee-shop',
    scenario_context: "It's a beautiful morning in Berlin and you're at a cozy café near Alexanderplatz. The smell of fresh coffee and pastries fills the air. You're hungry, you need caffeine, and it's time to order your first German breakfast!",
    key_phrases: [
      { german: 'Ich möchte...', english: 'I would like...', pronunciation: 'ikh MERK-tuh' },
      { german: 'einen Kaffee', english: 'a coffee', pronunciation: 'I-nen KAH-fay' },
      { german: 'Wie viel kostet das?', english: 'How much does that cost?', pronunciation: 'vee feel KOS-tet dahs' },
      { german: 'Mit Milch, bitte', english: 'With milk, please', pronunciation: 'mit milkh, BIT-tuh' },
      { german: 'Die Rechnung, bitte', english: 'The bill, please', pronunciation: 'dee REKH-noong BIT-tuh' }
    ],
    example_dialogue: [
      { speaker: 'Barista', german: 'Guten Morgen! Was möchten Sie?', english: 'Good morning! What would you like?' },
      { speaker: 'You', german: 'Ich möchte einen Cappuccino, bitte.', english: 'I would like a cappuccino, please.' },
      { speaker: 'Barista', german: 'Mit Milch oder ohne Milch?', english: 'With milk or without milk?' },
      { speaker: 'You', german: 'Mit Milch, bitte. Und ein Croissant.', english: 'With milk, please. And a croissant.' },
      { speaker: 'Barista', german: 'Sehr gern! Das macht 5 Euro 50.', english: 'With pleasure! That\'s 5 euros 50.' }
    ],
    conversation_scripts: [
      {
        id: 1,
        aiMessage: 'Guten Morgen! Willkommen im Café. Was möchten Sie heute?',
        prompt: 'Order a coffee or tea (use: Ich möchte...)',
        hints: ['Use "Ich möchte einen Kaffee" or "Ich möchte einen Tee"', 'Don\'t forget "bitte"!'],
        expectedPhrases: ['ich möchte', 'kaffee', 'tee']
      },
      {
        id: 2,
        aiMessage: 'Sehr gut! Möchten Sie auch etwas zu essen?',
        prompt: 'Order a pastry (Croissant, Brötchen, or Kuchen)',
        hints: ['Try "Und ein Croissant, bitte"', 'Use "und" to add to your order'],
        expectedPhrases: ['croissant', 'brötchen', 'kuchen']
      },
      {
        id: 3,
        aiMessage: 'Perfekt! Möchten Sie Ihren Kaffee mit Milch und Zucker?',
        prompt: 'Say how you want your coffee (mit Milch, ohne Zucker, etc.)',
        hints: ['mit = with, ohne = without', '"Ja, bitte" or "Nein, danke" also work!'],
        expectedPhrases: ['mit', 'ohne', 'ja', 'nein']
      }
    ],
    challenge_scenario: 'Plot twist! The barista just asked "Zum Mitnehmen oder hier trinken?" (To go or drink here?). How do you respond? Try saying "Hier trinken" (drink here) or "Zum Mitnehmen" (to go)!',
    objectives: [
      '☕ Order coffee and pastries with confidence',
      '💰 Ask about prices like a pro',
      '🎭 Use polite requests (bitte, danke)',
      '🏆 Unlock: Barista\'s Friend badge'
    ],
    grammar_topics: ['möchten (would like)', 'Accusative case', 'Numbers 1-100'],
    vocabulary_list: [
      { german: 'der Kaffee', english: 'coffee', type: 'noun', xp: 5 },
      { german: 'der Cappuccino', english: 'cappuccino', type: 'noun', xp: 5 },
      { german: 'der Espresso', english: 'espresso', type: 'noun', xp: 5 },
      { german: 'der Tee', english: 'tea', type: 'noun', xp: 5 },
      { german: 'die Milch', english: 'milk', type: 'noun', xp: 5 },
      { german: 'der Zucker', english: 'sugar', type: 'noun', xp: 5 },
      { german: 'das Brötchen', english: 'bread roll', type: 'noun', xp: 10 },
      { german: 'der Kuchen', english: 'cake', type: 'noun', xp: 10 },
      { german: 'das Croissant', english: 'croissant', type: 'noun', xp: 10 },
      { german: 'Ich möchte...', english: 'I would like...', type: 'expression', xp: 15 },
      { german: 'Was kostet...?', english: 'How much is...?', type: 'question', xp: 15 },
      { german: 'Die Rechnung, bitte', english: 'The bill, please', type: 'expression', xp: 20 }
    ],
    conversation_prompts: [
      '🎮 Order breakfast at a Berlin café',
      '🎮 Ask for the WiFi password',
      '🎮 Complain politely that your coffee is cold'
    ],
    exercises: [
      {
        type: 'ordering',
        question: '💪 BOSS LEVEL: Order 1 cappuccino with extra milk and 2 croissants',
        answer: 'Ich möchte einen Cappuccino mit extra Milch und zwei Croissants, bitte',
        xp: 30,
        hint: 'Remember: einen (masculine), extra Milch, zwei Croissants'
      },
      {
        type: 'fill_in_blank',
        question: 'Ich _____ bitte einen Kaffee.',
        answer: 'möchte',
        options: ['möchte', 'will', 'bin', 'habe'],
        xp: 15
      }
    ],
    estimated_duration_minutes: 35,
    difficulty_score: 2,
    xp_reward: 150,
    badge: 'barista_friend',
    prerequisites: [{ level: 'A1', lesson_number: 1 }]
  },

  {
    level: 'A1',
    lesson_number: 3,
    title: '🛒 Shopping Spree',
    description: 'Navigate the supermarket like a German! Unlock the Smart Shopper badge.',
    theme_id: 'grocery-store',
    objectives: [
      '🛒 Find items in a German supermarket',
      '🔢 Count and calculate prices',
      '🎯 Ask "Do you have...?" in 5 situations',
      '🏆 Unlock: Smart Shopper badge'
    ],
    grammar_topics: ['haben (to have)', 'Plural forms', 'Prepositions (in, auf)'],
    vocabulary_list: [
      { german: 'das Brot', english: 'bread', type: 'noun', xp: 5 },
      { german: 'die Milch', english: 'milk', type: 'noun', xp: 5 },
      { german: 'das Wasser', english: 'water', type: 'noun', xp: 5 },
      { german: 'der Apfel', english: 'apple', type: 'noun', xp: 5 },
      { german: 'die Banane', english: 'banana', type: 'noun', xp: 5 },
      { german: 'das Fleisch', english: 'meat', type: 'noun', xp: 10 },
      { german: 'der Käse', english: 'cheese', type: 'noun', xp: 10 },
      { german: 'Wo finde ich...?', english: 'Where can I find...?', type: 'question', xp: 15 },
      { german: 'Haben Sie...?', english: 'Do you have...?', type: 'question', xp: 15 },
      { german: 'Wie viel kostet das?', english: 'How much does this cost?', type: 'question', xp: 20 }
    ],
    conversation_prompts: [
      '🎮 Find organic vegetables',
      '🎮 Ask for a shopping bag',
      '🎮 Return an expired item'
    ],
    exercises: [
      {
        type: 'matching',
        question: 'Match the items with their location',
        pairs: [
          { german: 'Brot', location: 'Bäckerei-Abteilung' },
          { german: 'Äpfel', location: 'Obst und Gemüse' },
          { german: 'Milch', location: 'Kühlregal' }
        ],
        xp: 20
      }
    ],
    estimated_duration_minutes: 40,
    difficulty_score: 3,
    xp_reward: 200,
    badge: 'smart_shopper',
    prerequisites: [{ level: 'A1', lesson_number: 2 }]
  },

  // ==================== A2 LEVEL - ELEMENTARY ====================
  {
    level: 'A2',
    lesson_number: 1,
    title: '⏰ Daily Routine Master',
    description: 'Describe your day like a storyteller! Earn the Time Traveler badge.',
    theme_id: 'social',
    objectives: [
      '⏰ Talk about your daily schedule',
      '🔄 Use separable verbs confidently',
      '📅 Master time expressions',
      '🏆 Unlock: Time Traveler badge'
    ],
    grammar_topics: ['Separable verbs', 'Time expressions', 'Present tense routines'],
    vocabulary_list: [
      { german: 'aufstehen', english: 'to get up', type: 'verb', xp: 10 },
      { german: 'aufwachen', english: 'to wake up', type: 'verb', xp: 10 },
      { german: 'duschen', english: 'to shower', type: 'verb', xp: 5 },
      { german: 'frühstücken', english: 'to have breakfast', type: 'verb', xp: 10 },
      { german: 'zur Arbeit gehen', english: 'to go to work', type: 'expression', xp: 15 },
      { german: 'Mittagessen', english: 'lunch', type: 'noun', xp: 10 },
      { german: 'Feierabend', english: 'end of work day', type: 'noun', xp: 20 },
      { german: 'fernsehen', english: 'to watch TV', type: 'verb', xp: 10 },
      { german: 'ins Bett gehen', english: 'to go to bed', type: 'expression', xp: 15 },
      { german: 'zuerst', english: 'first', type: 'adverb', xp: 10 },
      { german: 'dann', english: 'then', type: 'adverb', xp: 10 },
      { german: 'danach', english: 'after that', type: 'adverb', xp: 10 }
    ],
    conversation_prompts: [
      '🎮 Describe your perfect weekend morning',
      '🎮 Explain your work-from-home routine',
      '🎮 Compare weekday vs. weekend schedules'
    ],
    exercises: [
      {
        type: 'sentence_building',
        question: '⚡ SPEED ROUND: Build 3 sentences about your morning',
        answer: 'Ich stehe um 7 Uhr auf. Dann dusche ich. Danach frühstücke ich.',
        xp: 40,
        hint: 'Use: aufstehen, duschen, frühstücken + time expressions'
      }
    ],
    estimated_duration_minutes: 45,
    difficulty_score: 4,
    xp_reward: 250,
    badge: 'time_traveler',
    prerequisites: []
  },

  {
    level: 'A2',
    lesson_number: 2,
    title: '🚂 Train Station Navigator',
    description: 'Master German public transport! Unlock the Commuter Pro badge.',
    theme_id: 'train-station',
    objectives: [
      '🎫 Buy train tickets with ease',
      '🕐 Understand departure/arrival times',
      '🗺️ Navigate connections and platforms',
      '🏆 Unlock: Commuter Pro badge'
    ],
    grammar_topics: ['Modal verbs (müssen, können)', 'Time (12/24hr)', 'Prepositions of place'],
    vocabulary_list: [
      { german: 'der Bahnhof', english: 'train station', type: 'noun', xp: 5 },
      { german: 'der Zug', english: 'train', type: 'noun', xp: 5 },
      { german: 'das Gleis', english: 'platform/track', type: 'noun', xp: 10 },
      { german: 'die Fahrkarte', english: 'ticket', type: 'noun', xp: 10 },
      { german: 'die Abfahrt', english: 'departure', type: 'noun', xp: 15 },
      { german: 'die Ankunft', english: 'arrival', type: 'noun', xp: 15 },
      { german: 'umsteigen', english: 'to change trains', type: 'verb', xp: 20 },
      { german: 'Verspätung haben', english: 'to be delayed', type: 'expression', xp: 20 },
      { german: 'Wann fährt der Zug ab?', english: 'When does the train depart?', type: 'question', xp: 25 }
    ],
    conversation_prompts: [
      '🎮 Buy a ticket to Munich during rush hour',
      '🎮 Ask about delays and find alternative routes',
      '🎮 Help a tourist find the right platform'
    ],
    exercises: [
      {
        type: 'time_challenge',
        question: '⏱️ TIMED CHALLENGE: You have 5 minutes to catch your train. Buy a ticket and find Platform 7!',
        xp: 50,
        time_limit: 300
      }
    ],
    estimated_duration_minutes: 50,
    difficulty_score: 5,
    xp_reward: 300,
    badge: 'commuter_pro',
    prerequisites: [{ level: 'A2', lesson_number: 1 }]
  },

  {
    level: 'A2',
    lesson_number: 3,
    title: '🏨 Hotel Check-in Hero',
    description: 'Handle hotel situations like a VIP! Earn the Hospitality Expert badge.',
    theme_id: 'hotel',
    objectives: [
      '🏨 Check in and out smoothly',
      '❓ Ask about amenities and services',
      '⚠️ Report problems politely',
      '🏆 Unlock: Hospitality Expert badge'
    ],
    grammar_topics: ['Perfect tense', 'Dative case', 'Question words (wann, wo, wie)'],
    vocabulary_list: [
      { german: 'die Reservierung', english: 'reservation', type: 'noun', xp: 10 },
      { german: 'das Zimmer', english: 'room', type: 'noun', xp: 5 },
      { german: 'der Schlüssel', english: 'key', type: 'noun', xp: 10 },
      { german: 'das Frühstück', english: 'breakfast', type: 'noun', xp: 10 },
      { german: 'das WLAN', english: 'WiFi', type: 'noun', xp: 10 },
      { german: 'die Klimaanlage', english: 'air conditioning', type: 'noun', xp: 15 },
      { german: 'funktioniert nicht', english: 'doesn\'t work', type: 'expression', xp: 20 },
      { german: 'Könnten Sie bitte...?', english: 'Could you please...?', type: 'expression', xp: 25 }
    ],
    conversation_prompts: [
      '🎮 Check in at 2 AM after a delayed flight',
      '🎮 Request a room upgrade',
      '🎮 Report that your room hasn\'t been cleaned'
    ],
    exercises: [
      {
        type: 'role_play',
        question: '🎭 ACT IT OUT: Your shower is cold, WiFi is down, and you need late checkout',
        xp: 60,
        scenario: 'problem_solving'
      }
    ],
    estimated_duration_minutes: 55,
    difficulty_score: 5,
    xp_reward: 350,
    badge: 'hospitality_expert',
    prerequisites: [{ level: 'A2', lesson_number: 2 }]
  },

  // ==================== B1 LEVEL - INTERMEDIATE ====================
  {
    level: 'B1',
    lesson_number: 1,
    title: '💭 Opinion Master',
    description: 'Debate like a German! Unlock the Discussion Champion badge.',
    theme_id: 'social',
    objectives: [
      '💬 Express complex opinions confidently',
      '🤝 Agree and disagree politely',
      '📊 Give reasons with "weil" and "denn"',
      '🏆 Unlock: Discussion Champion badge'
    ],
    grammar_topics: ['Subordinate clauses (weil, dass)', 'Subjunctive II', 'Comparative/Superlative'],
    vocabulary_list: [
      { german: 'Meiner Meinung nach', english: 'In my opinion', type: 'expression', xp: 20 },
      { german: 'Ich bin der Ansicht', english: 'I am of the view', type: 'expression', xp: 25 },
      { german: 'Das stimmt', english: 'That\'s true', type: 'expression', xp: 15 },
      { german: 'Im Gegenteil', english: 'On the contrary', type: 'expression', xp: 30 },
      { german: 'Einerseits...andererseits', english: 'On one hand...on the other hand', type: 'expression', xp: 40 }
    ],
    conversation_prompts: [
      '🎮 Debate: Living in a city vs. countryside',
      '🎮 Discuss climate change solutions',
      '🎮 Share your views on social media'
    ],
    exercises: [
      {
        type: 'debate',
        question: '🔥 DEBATE MODE: Convince someone that learning German is easier than learning English',
        xp: 75,
        requirement: 'Use at least 3 opinion phrases and 2 subordinate clauses'
      }
    ],
    estimated_duration_minutes: 60,
    difficulty_score: 6,
    xp_reward: 400,
    badge: 'discussion_champion',
    prerequisites: []
  },

  {
    level: 'B1',
    lesson_number: 2,
    title: '🏥 Doctor Visit Pro',
    description: 'Handle medical situations confidently! Earn the Health Guardian badge.',
    theme_id: 'doctor',
    objectives: [
      '🩺 Describe symptoms precisely',
      '💊 Understand prescriptions and instructions',
      '📅 Make and change appointments',
      '🏆 Unlock: Health Guardian badge'
    ],
    grammar_topics: ['Reflexive verbs', 'Body parts', 'Perfect tense with sein/haben'],
    vocabulary_list: [
      { german: 'Mir tut...weh', english: 'My...hurts', type: 'expression', xp: 20 },
      { german: 'die Erkältung', english: 'cold', type: 'noun', xp: 15 },
      { german: 'das Fieber', english: 'fever', type: 'noun', xp: 15 },
      { german: 'die Kopfschmerzen', english: 'headache', type: 'noun', xp: 15 },
      { german: 'das Rezept', english: 'prescription', type: 'noun', xp: 20 },
      { german: 'die Krankenkasse', english: 'health insurance', type: 'noun', xp: 25 }
    ],
    conversation_prompts: [
      '🎮 Describe flu symptoms to a doctor',
      '🎮 Ask about side effects of medication',
      '🎮 Request a sick note for work'
    ],
    exercises: [
      {
        type: 'emergency',
        question: '🚨 EMERGENCY: You ate something bad. Explain your symptoms at the Notaufnahme!',
        xp: 80,
        pressure: 'high'
      }
    ],
    estimated_duration_minutes: 65,
    difficulty_score: 7,
    xp_reward: 450,
    badge: 'health_guardian',
    prerequisites: [{ level: 'B1', lesson_number: 1 }]
  },

  {
    level: 'B1',
    lesson_number: 3,
    title: '🍽️ Restaurant Connoisseur',
    description: 'Dine like a local! Unlock the Foodie Expert badge.',
    theme_id: 'restaurant',
    objectives: [
      '👨‍🍳 Make reservations and special requests',
      '🍷 Order multi-course meals with wine pairings',
      '⭐ Give feedback and leave reviews',
      '🏆 Unlock: Foodie Expert badge'
    ],
    grammar_topics: ['Conditional sentences', 'Passive voice', 'Adjective endings'],
    vocabulary_list: [
      { german: 'die Vorspeise', english: 'appetizer', type: 'noun', xp: 15 },
      { german: 'das Hauptgericht', english: 'main course', type: 'noun', xp: 15 },
      { german: 'die Nachspeise', english: 'dessert', type: 'noun', xp: 15 },
      { german: 'durchgebraten', english: 'well-done', type: 'adjective', xp: 20 },
      { german: 'die Empfehlung des Hauses', english: 'house recommendation', type: 'expression', xp: 30 }
    ],
    conversation_prompts: [
      '🎮 Reserve a table for 6 with dietary restrictions',
      '🎮 Send back an incorrectly cooked steak',
      '🎮 Ask the chef for his secret recipe'
    ],
    exercises: [
      {
        type: 'fine_dining',
        question: '🍷 VIP CHALLENGE: Order a perfect 4-course dinner with wine pairings for a date',
        xp: 100,
        elegance_required: true
      }
    ],
    estimated_duration_minutes: 70,
    difficulty_score: 7,
    xp_reward: 500,
    badge: 'foodie_expert',
    prerequisites: [{ level: 'B1', lesson_number: 2 }]
  },

  // ==================== B2 LEVEL - UPPER INTERMEDIATE ====================
  {
    level: 'B2',
    lesson_number: 1,
    title: '💼 Business Titan',
    description: 'Conquer the corporate world! Earn the Executive badge.',
    theme_id: 'workplace',
    objectives: [
      '📧 Write professional emails and reports',
      '🤝 Lead meetings and presentations',
      '📊 Negotiate contracts and deals',
      '🏆 Unlock: Executive badge'
    ],
    grammar_topics: ['Nominalization', 'Advanced conjunctions', 'Formal passive constructions'],
    vocabulary_list: [
      { german: 'die Besprechung', english: 'meeting', type: 'noun', xp: 15 },
      { german: 'vereinbaren', english: 'to arrange', type: 'verb', xp: 20 },
      { german: 'verhandeln', english: 'to negotiate', type: 'verb', xp: 25 },
      { german: 'die Frist', english: 'deadline', type: 'noun', xp: 20 },
      { german: 'durchführen', english: 'to carry out', type: 'verb', xp: 25 },
      { german: 'in Bezug auf', english: 'with regard to', type: 'expression', xp: 30 }
    ],
    conversation_prompts: [
      '🎮 Present Q3 results to the board',
      '🎮 Negotiate a salary increase',
      '🎮 Write a formal complaint about a supplier'
    ],
    exercises: [
      {
        type: 'business_sim',
        question: '💰 MERGER ALERT: Convince investors to approve a €50M acquisition',
        xp: 150,
        stakes: 'very_high'
      }
    ],
    estimated_duration_minutes: 80,
    difficulty_score: 8,
    xp_reward: 600,
    badge: 'executive',
    prerequisites: []
  },

  {
    level: 'B2',
    lesson_number: 2,
    title: '📰 News Reporter',
    description: 'Report current events fluently! Unlock the Journalist badge.',
    theme_id: 'social',
    objectives: [
      '📱 Discuss news and current affairs',
      '🔍 Analyze complex topics',
      '🗣️ Give presentations on serious issues',
      '🏆 Unlock: Journalist badge'
    ],
    grammar_topics: ['Indirect speech', 'Extended modifiers', 'Participle constructions'],
    vocabulary_list: [
      { german: 'die Schlagzeile', english: 'headline', type: 'noun', xp: 20 },
      { german: 'berichten', english: 'to report', type: 'verb', xp: 25 },
      { german: 'die Entwicklung', english: 'development', type: 'noun', xp: 25 },
      { german: 'laut Experten', english: 'according to experts', type: 'expression', xp: 30 },
      { german: 'die Auswirkung', english: 'impact', type: 'noun', xp: 30 }
    ],
    conversation_prompts: [
      '🎮 Report on a breaking news story',
      '🎮 Interview a politician',
      '🎮 Moderate a debate on AI ethics'
    ],
    exercises: [
      {
        type: 'live_broadcast',
        question: '📺 LIVE ON AIR: Report a major event with 2 minutes notice!',
        xp: 175,
        pressure: 'extreme'
      }
    ],
    estimated_duration_minutes: 85,
    difficulty_score: 9,
    xp_reward: 700,
    badge: 'journalist',
    prerequisites: [{ level: 'B2', lesson_number: 1 }]
  },

  // ==================== C1 LEVEL - ADVANCED ====================
  {
    level: 'C1',
    lesson_number: 1,
    title: '🎭 Cultural Diplomat',
    description: 'Navigate cultural nuances expertly! Earn the Ambassador badge.',
    theme_id: 'social',
    objectives: [
      '🌍 Discuss abstract cultural concepts',
      '🎨 Analyze literature and philosophy',
      '🤝 Handle intercultural misunderstandings',
      '🏆 Unlock: Ambassador badge'
    ],
    grammar_topics: ['Complex sentence structures', 'Stylistic devices', 'Register variation'],
    vocabulary_list: [
      { german: 'die Mentalität', english: 'mentality', type: 'noun', xp: 30 },
      { german: 'die Weltanschauung', english: 'worldview', type: 'noun', xp: 40 },
      { german: 'tiefgründig', english: 'profound', type: 'adjective', xp: 35 },
      { german: 'vielschichtig', english: 'multifaceted', type: 'adjective', xp: 40 }
    ],
    conversation_prompts: [
      '🎮 Explain German "Gemütlichkeit" to an American',
      '🎮 Discuss Kafka\'s influence on modern literature',
      '🎮 Mediate a cross-cultural business conflict'
    ],
    exercises: [
      {
        type: 'philosophical',
        question: '🧠 DEEP DIVE: Explain the concept of "Schadenfreude" and its cultural significance',
        xp: 200,
        depth: 'profound'
      }
    ],
    estimated_duration_minutes: 90,
    difficulty_score: 10,
    xp_reward: 800,
    badge: 'ambassador',
    prerequisites: []
  },

  {
    level: 'C1',
    lesson_number: 2,
    title: '⚖️ Legal Eagle',
    description: 'Master formal and legal German! Unlock the Advocate badge.',
    theme_id: 'workplace',
    objectives: [
      '📜 Understand legal documents',
      '⚖️ Argue cases logically',
      '🔍 Navigate bureaucracy',
      '🏆 Unlock: Advocate badge'
    ],
    grammar_topics: ['Archaic constructions', 'Legal terminology', 'Formal written German'],
    vocabulary_list: [
      { german: 'der Rechtsanwalt', english: 'lawyer', type: 'noun', xp: 25 },
      { german: 'die Verordnung', english: 'regulation', type: 'noun', xp: 35 },
      { german: 'gemäß', english: 'according to', type: 'preposition', xp: 40 },
      { german: 'in Anbetracht', english: 'in consideration of', type: 'expression', xp: 45 }
    ],
    conversation_prompts: [
      '🎮 Draft a rental contract',
      '🎮 Argue a civil case',
      '🎮 Explain German inheritance law'
    ],
    exercises: [
      {
        type: 'legal_case',
        question: '⚖️ COURTROOM: Defend your client against contract breach allegations',
        xp: 250,
        formality: 'maximum'
      }
    ],
    estimated_duration_minutes: 95,
    difficulty_score: 10,
    xp_reward: 900,
    badge: 'advocate',
    prerequisites: [{ level: 'C1', lesson_number: 1 }]
  },

  // ==================== C2 LEVEL - MASTERY ====================
  {
    level: 'C2',
    lesson_number: 1,
    title: '🏆 Polyglot Master',
    description: 'Achieve native-level mastery! Earn the Legendary badge.',
    theme_id: 'social',
    objectives: [
      '🎯 Use idioms and regional dialects',
      '📝 Write academic papers',
      '🎤 Deliver TED-style talks',
      '👑 Unlock: LEGENDARY STATUS'
    ],
    grammar_topics: ['All structures fluently', 'Nuanced register', 'Native-level subtlety'],
    vocabulary_list: [
      { german: 'die Lebensweisheit', english: 'life wisdom', type: 'noun', xp: 50 },
      { german: 'verschachtelt', english: 'nested/complex', type: 'adjective', xp: 50 },
      { german: 'gewissermaßen', english: 'to a certain extent', type: 'adverb', xp: 60 }
    ],
    conversation_prompts: [
      '🎮 FINAL BOSS: Improvise a university lecture on quantum physics',
      '🎮 Write a satirical essay à la Heinrich Böll',
      '🎮 Debate philosophy with a native professor'
    ],
    exercises: [
      {
        type: 'masterpiece',
        question: '👑 ULTIMATE CHALLENGE: Create a 10-minute presentation on "Die deutsche Seele" that would impress Goethe himself',
        xp: 500,
        legendary: true
      }
    ],
    estimated_duration_minutes: 120,
    difficulty_score: 10,
    xp_reward: 1000,
    badge: 'legendary_polyglot',
    prerequisites: []
  }
];

// Achievement badges with gamified rewards
export const achievementBadges = {
  conversation_starter: {
    name: 'Conversation Starter',
    icon: '👋',
    description: 'Completed your first German greetings',
    xp_bonus: 50,
    unlocks: 'Social scenarios'
  },
  barista_friend: {
    name: 'Barista\'s Friend',
    icon: '☕',
    description: 'Mastered café conversations',
    xp_bonus: 75,
    unlocks: 'Coffee shop power-ups'
  },
  smart_shopper: {
    name: 'Smart Shopper',
    icon: '🛒',
    description: 'Navigate German supermarkets like a pro',
    xp_bonus: 100,
    unlocks: 'Shopping scenarios'
  },
  time_traveler: {
    name: 'Time Traveler',
    icon: '⏰',
    description: 'Master of daily routines',
    xp_bonus: 125,
    unlocks: 'Time-based challenges'
  },
  commuter_pro: {
    name: 'Commuter Pro',
    icon: '🚂',
    description: 'German public transport expert',
    xp_bonus: 150,
    unlocks: 'Travel scenarios'
  },
  hospitality_expert: {
    name: 'Hospitality Expert',
    icon: '🏨',
    description: 'Hotel situations handled with ease',
    xp_bonus: 175,
    unlocks: 'VIP hotel experiences'
  },
  discussion_champion: {
    name: 'Discussion Champion',
    icon: '💭',
    description: 'Express complex opinions confidently',
    xp_bonus: 200,
    unlocks: 'Debate mode'
  },
  health_guardian: {
    name: 'Health Guardian',
    icon: '🏥',
    description: 'Medical situations under control',
    xp_bonus: 225,
    unlocks: 'Healthcare scenarios'
  },
  foodie_expert: {
    name: 'Foodie Expert',
    icon: '🍽️',
    description: 'Restaurant connoisseur',
    xp_bonus: 250,
    unlocks: 'Fine dining mode'
  },
  executive: {
    name: 'Executive',
    icon: '💼',
    description: 'Business German mastered',
    xp_bonus: 300,
    unlocks: 'Corporate scenarios'
  },
  journalist: {
    name: 'Journalist',
    icon: '📰',
    description: 'Report news like a native',
    xp_bonus: 350,
    unlocks: 'News commentary mode'
  },
  ambassador: {
    name: 'Ambassador',
    icon: '🌍',
    description: 'Cultural diplomat extraordinaire',
    xp_bonus: 400,
    unlocks: 'Cultural deep-dives'
  },
  advocate: {
    name: 'Advocate',
    icon: '⚖️',
    description: 'Legal German expert',
    xp_bonus: 450,
    unlocks: 'Legal scenarios'
  },
  legendary_polyglot: {
    name: 'Legendary Polyglot',
    icon: '👑',
    description: 'You\'ve achieved German mastery!',
    xp_bonus: 1000,
    unlocks: 'ALL FEATURES + Bragging rights'
  }
};
