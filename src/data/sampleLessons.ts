// Sample lesson plans for seeding the database
// Run this via API or Supabase dashboard to populate lesson_plans table

export const sampleLessons = [
  // A1 Lessons
  {
    level: 'A1',
    lesson_number: 1,
    title: 'Greetings and Introductions',
    description: 'Learn how to greet people and introduce yourself in German',
    theme_id: 'social',
    objectives: [
      'Say hello and goodbye',
      'Introduce yourself',
      'Ask someone their name',
      'Use basic courtesy phrases'
    ],
    grammar_topics: [
      'Present tense of sein (to be)',
      'Personal pronouns (ich, du, Sie)',
      'Question formation with "Wie?"'
    ],
    vocabulary_list: [
      { german: 'Hallo', english: 'Hello', type: 'greeting' },
      { german: 'Guten Tag', english: 'Good day', type: 'greeting' },
      { german: 'Tschüss', english: 'Bye', type: 'greeting' },
      { german: 'Wie heißt du?', english: 'What\'s your name?', type: 'question' },
      { german: 'Ich heiße...', english: 'My name is...', type: 'expression' },
      { german: 'Danke', english: 'Thank you', type: 'courtesy' },
      { german: 'Bitte', english: 'Please/You\'re welcome', type: 'courtesy' }
    ],
    conversation_prompts: [
      'Greet someone you meet for the first time',
      'Introduce yourself to a new classmate',
      'Say goodbye to a friend'
    ],
    exercises: [
      {
        type: 'fill_in_blank',
        question: '_____ heißt du?',
        answer: 'Wie',
        options: ['Wie', 'Was', 'Wo', 'Wer']
      },
      {
        type: 'translation',
        question: 'Translate: My name is Anna',
        answer: 'Ich heiße Anna'
      }
    ],
    estimated_duration_minutes: 30,
    difficulty_score: 1,
    prerequisites: []
  },
  {
    level: 'A1',
    lesson_number: 2,
    title: 'Ordering at a Café',
    description: 'Learn vocabulary and phrases for ordering food and drinks',
    theme_id: 'coffee-shop',
    objectives: [
      'Order coffee and pastries',
      'Ask for prices',
      'Use polite requests',
      'Count from 1-20'
    ],
    grammar_topics: [
      'Modal verb möchten (would like)',
      'Accusative case with einen/eine/ein',
      'Numbers 1-20'
    ],
    vocabulary_list: [
      { german: 'der Kaffee', english: 'coffee', type: 'noun' },
      { german: 'der Tee', english: 'tea', type: 'noun' },
      { german: 'das Brötchen', english: 'bread roll', type: 'noun' },
      { german: 'der Kuchen', english: 'cake', type: 'noun' },
      { german: 'Ich möchte...', english: 'I would like...', type: 'expression' },
      { german: 'Was kostet...?', english: 'How much is...?', type: 'question' }
    ],
    conversation_prompts: [
      'Order a coffee and a croissant',
      'Ask the price of a pastry',
      'Request the bill'
    ],
    exercises: [
      {
        type: 'ordering',
        question: 'Order: 1 coffee with milk, 2 bread rolls',
        answer: 'Ich möchte einen Kaffee mit Milch und zwei Brötchen, bitte.'
      }
    ],
    estimated_duration_minutes: 45,
    difficulty_score: 2,
    prerequisites: [{ level: 'A1', lesson_number: 1 }]
  },

  // A2 Lessons
  {
    level: 'A2',
    lesson_number: 1,
    title: 'Talking About Your Daily Routine',
    description: 'Describe your typical day using time expressions',
    theme_id: 'social',
    objectives: [
      'Talk about daily activities',
      'Use time expressions',
      'Conjugate regular verbs in present tense',
      'Use separable verbs'
    ],
    grammar_topics: [
      'Present tense regular verbs',
      'Separable verbs (aufstehen, anfangen)',
      'Time expressions (um 7 Uhr, am Morgen)',
      'Word order with time expressions'
    ],
    vocabulary_list: [
      { german: 'aufstehen', english: 'to get up', type: 'verb' },
      { german: 'frühstücken', english: 'to have breakfast', type: 'verb' },
      { german: 'arbeiten', english: 'to work', type: 'verb' },
      { german: 'der Morgen', english: 'morning', type: 'noun' },
      { german: 'der Abend', english: 'evening', type: 'noun' },
      { german: 'zuerst', english: 'first', type: 'adverb' },
      { german: 'dann', english: 'then', type: 'adverb' }
    ],
    conversation_prompts: [
      'Describe your morning routine',
      'Talk about what you do after work',
      'Ask someone about their typical day'
    ],
    exercises: [
      {
        type: 'sentence_building',
        question: 'Build a sentence: I get up at 7 o\'clock',
        answer: 'Ich stehe um 7 Uhr auf.'
      }
    ],
    estimated_duration_minutes: 50,
    difficulty_score: 4,
    prerequisites: []
  },

  // B1 Lessons
  {
    level: 'B1',
    lesson_number: 1,
    title: 'Expressing Opinions and Preferences',
    description: 'Learn to discuss topics and express your viewpoint',
    theme_id: 'social',
    objectives: [
      'Express opinions using various structures',
      'Agree and disagree politely',
      'Give reasons for preferences',
      'Use subjunctive II for polite requests'
    ],
    grammar_topics: [
      'Opinion phrases (Ich finde, dass...)',
      'Subjunctive II (würde, könnte, sollte)',
      'Comparative and superlative adjectives',
      'Subordinate clauses with "weil"'
    ],
    vocabulary_list: [
      { german: 'Meiner Meinung nach', english: 'In my opinion', type: 'expression' },
      { german: 'Ich bin der Ansicht, dass', english: 'I am of the opinion that', type: 'expression' },
      { german: 'Das stimmt', english: 'That\'s true', type: 'expression' },
      { german: 'Ich würde sagen', english: 'I would say', type: 'expression' }
    ],
    conversation_prompts: [
      'Discuss your favorite German city and why',
      'Give your opinion on learning languages',
      'Politely disagree with someone\'s viewpoint'
    ],
    exercises: [
      {
        type: 'discussion',
        question: 'Express your opinion about living in a big city vs. small town',
        answer: 'Sample: Meiner Meinung nach ist das Leben in einer Großstadt interessanter, weil es mehr Möglichkeiten gibt.'
      }
    ],
    estimated_duration_minutes: 60,
    difficulty_score: 6,
    prerequisites: []
  },

  // B2 Lesson
  {
    level: 'B2',
    lesson_number: 1,
    title: 'Professional Communication',
    description: 'Master formal business communication',
    theme_id: 'workplace',
    objectives: [
      'Write formal emails',
      'Conduct professional meetings',
      'Make presentations',
      'Use advanced business vocabulary'
    ],
    grammar_topics: [
      'Passive voice',
      'Nominalization',
      'Formal connectors (außerdem, folglich)',
      'Indirect speech'
    ],
    vocabulary_list: [
      { german: 'die Besprechung', english: 'meeting', type: 'noun' },
      { german: 'der Kollege', english: 'colleague', type: 'noun' },
      { german: 'vereinbaren', english: 'to arrange', type: 'verb' },
      { german: 'verhandeln', english: 'to negotiate', type: 'verb' }
    ],
    conversation_prompts: [
      'Schedule a meeting with a colleague',
      'Present a project update',
      'Write a formal email requesting information'
    ],
    exercises: [
      {
        type: 'email_writing',
        question: 'Write a formal email requesting a meeting',
        answer: 'Sehr geehrte Frau Schmidt, ich würde gerne einen Termin mit Ihnen vereinbaren...'
      }
    ],
    estimated_duration_minutes: 75,
    difficulty_score: 8,
    prerequisites: []
  }
];

// Sample homework assignments
export const sampleHomework = [
  {
    lesson_id: 'will_be_set_after_lesson_creation',
    lesson_number: 1,
    level: 'A1',
    title: 'Introduction Practice',
    description: 'Practice introducing yourself in various situations',
    assignment_type: 'conversation',
    instructions: {
      task: 'Record yourself introducing yourself in German',
      requirements: [
        'State your name',
        'Say where you\'re from',
        'Mention one hobby or interest',
        'Use at least 5 different words from the lesson'
      ],
      time_limit: '1-2 minutes'
    },
    target_criteria: {
      min_length_seconds: 60,
      required_phrases: ['Ich heiße', 'Ich komme aus', 'Ich'],
      grammar_focus: ['present tense', 'personal pronouns']
    },
    points: 20
  },
  {
    lesson_id: 'will_be_set_after_lesson_creation',
    lesson_number: 2,
    level: 'A1',
    title: 'Café Order Role-play',
    description: 'Practice ordering at a café',
    assignment_type: 'conversation',
    instructions: {
      task: 'Have a conversation ordering food and drinks at a café',
      requirements: [
        'Order at least two items',
        'Ask for the price',
        'Use polite forms',
        'Request the bill'
      ],
      time_limit: '2-3 minutes'
    },
    target_criteria: {
      min_length_seconds: 120,
      required_phrases: ['Ich möchte', 'Was kostet', 'Die Rechnung, bitte'],
      grammar_focus: ['accusative case', 'möchten']
    },
    points: 25
  }
];
