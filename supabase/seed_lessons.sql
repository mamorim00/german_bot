-- Seed script to populate all gamified lessons
-- Run this in Supabase SQL Editor after running the migrations

-- ==================== A1 LEVEL LESSONS ====================

-- A1.1: First Words Quest
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'A1', 1, '👋 First Words Quest',
  'Your German adventure begins! Master basic greetings and unlock the Social Butterfly badge.',
  'social',
  '["✨ Say hello and goodbye like a native", "🎯 Introduce yourself with confidence", "💬 Ask \"What''s your name?\" three different ways", "🏆 Unlock: Conversation Starter badge"]',
  '["sein (to be)", "Personal pronouns", "W-questions"]',
  '[
    {"german": "Hallo", "english": "Hello", "type": "greeting", "xp": 5},
    {"german": "Guten Morgen", "english": "Good morning", "type": "greeting", "xp": 5},
    {"german": "Guten Tag", "english": "Good day", "type": "greeting", "xp": 5},
    {"german": "Guten Abend", "english": "Good evening", "type": "greeting", "xp": 5},
    {"german": "Tschüss", "english": "Bye", "type": "greeting", "xp": 5},
    {"german": "Auf Wiedersehen", "english": "Goodbye", "type": "greeting", "xp": 10},
    {"german": "Wie heißt du?", "english": "What''s your name? (informal)", "type": "question", "xp": 15},
    {"german": "Wie heißen Sie?", "english": "What''s your name? (formal)", "type": "question", "xp": 15},
    {"german": "Ich heiße...", "english": "My name is...", "type": "expression", "xp": 10},
    {"german": "Freut mich", "english": "Nice to meet you", "type": "expression", "xp": 15}
  ]',
  '["🎮 Greet a stranger at a party", "🎮 Introduce yourself to your new neighbor", "🎮 Say goodbye to a friend at the train station"]',
  '[
    {
      "type": "fill_in_blank",
      "question": "Complete: Guten _____, wie geht es Ihnen?",
      "answer": "Tag",
      "options": ["Tag", "Nacht", "Morgen", "Abend"],
      "xp": 10,
      "hint": "Used during the day!"
    },
    {
      "type": "multiple_choice",
      "question": "How do you say \"My name is Anna\" in German?",
      "answer": "Ich heiße Anna",
      "options": ["Ich bin Anna", "Ich heiße Anna", "Mein Name Anna", "Anna ich"],
      "xp": 15,
      "hint": "Use the verb \"heißen\""
    },
    {
      "type": "translation",
      "question": "🔥 Translate: \"Good evening, nice to meet you\"",
      "answer": "Guten Abend, freut mich",
      "xp": 25,
      "hint": "Think formal evening greeting"
    }
  ]',
  25, 1, '[]'
);

-- A1.2: Coffee Shop Champion
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'A1', 2, '☕ Coffee Shop Champion',
  'Order like a local! Master café vocabulary and earn the Barista''s Friend badge.',
  'coffee-shop',
  '["☕ Order coffee and pastries with confidence", "💰 Ask about prices like a pro", "🎭 Use polite requests (bitte, danke)", "🏆 Unlock: Barista''s Friend badge"]',
  '["möchten (would like)", "Accusative case", "Numbers 1-100"]',
  '[
    {"german": "der Kaffee", "english": "coffee", "type": "noun", "xp": 5},
    {"german": "der Cappuccino", "english": "cappuccino", "type": "noun", "xp": 5},
    {"german": "der Tee", "english": "tea", "type": "noun", "xp": 5},
    {"german": "die Milch", "english": "milk", "type": "noun", "xp": 5},
    {"german": "der Zucker", "english": "sugar", "type": "noun", "xp": 5},
    {"german": "das Brötchen", "english": "bread roll", "type": "noun", "xp": 10},
    {"german": "der Kuchen", "english": "cake", "type": "noun", "xp": 10},
    {"german": "das Croissant", "english": "croissant", "type": "noun", "xp": 10},
    {"german": "Ich möchte...", "english": "I would like...", "type": "expression", "xp": 15},
    {"german": "Was kostet...?", "english": "How much is...?", "type": "question", "xp": 15},
    {"german": "Die Rechnung, bitte", "english": "The bill, please", "type": "expression", "xp": 20}
  ]',
  '["🎮 Order breakfast at a Berlin café", "🎮 Ask for the WiFi password", "🎮 Complain politely that your coffee is cold"]',
  '[
    {
      "type": "ordering",
      "question": "💪 BOSS LEVEL: Order 1 cappuccino with extra milk and 2 croissants",
      "answer": "Ich möchte einen Cappuccino mit extra Milch und zwei Croissants, bitte",
      "xp": 30,
      "hint": "Remember: einen (masculine), extra Milch, zwei Croissants"
    },
    {
      "type": "fill_in_blank",
      "question": "Ich _____ bitte einen Kaffee.",
      "answer": "möchte",
      "options": ["möchte", "will", "bin", "habe"],
      "xp": 15
    }
  ]',
  35, 2, '[{"level": "A1", "lesson_number": 1}]'
);

-- A1.3: Shopping Spree
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'A1', 3, '🛒 Shopping Spree',
  'Navigate the supermarket like a German! Unlock the Smart Shopper badge.',
  'grocery-store',
  '["🛒 Find items in a German supermarket", "🔢 Count and calculate prices", "🎯 Ask \"Do you have...?\" in 5 situations", "🏆 Unlock: Smart Shopper badge"]',
  '["haben (to have)", "Plural forms", "Prepositions (in, auf)"]',
  '[
    {"german": "das Brot", "english": "bread", "type": "noun", "xp": 5},
    {"german": "die Milch", "english": "milk", "type": "noun", "xp": 5},
    {"german": "das Wasser", "english": "water", "type": "noun", "xp": 5},
    {"german": "der Apfel", "english": "apple", "type": "noun", "xp": 5},
    {"german": "die Banane", "english": "banana", "type": "noun", "xp": 5},
    {"german": "das Fleisch", "english": "meat", "type": "noun", "xp": 10},
    {"german": "der Käse", "english": "cheese", "type": "noun", "xp": 10},
    {"german": "Wo finde ich...?", "english": "Where can I find...?", "type": "question", "xp": 15},
    {"german": "Haben Sie...?", "english": "Do you have...?", "type": "question", "xp": 15},
    {"german": "Wie viel kostet das?", "english": "How much does this cost?", "type": "question", "xp": 20}
  ]',
  '["🎮 Find organic vegetables", "🎮 Ask for a shopping bag", "🎮 Return an expired item"]',
  '[
    {
      "type": "matching",
      "question": "Match the items with their location",
      "xp": 20
    }
  ]',
  40, 3, '[{"level": "A1", "lesson_number": 2}]'
);

-- ==================== A2 LEVEL LESSONS ====================

-- A2.1: Daily Routine Master
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'A2', 1, '⏰ Daily Routine Master',
  'Describe your day like a storyteller! Earn the Time Traveler badge.',
  'social',
  '["⏰ Talk about your daily schedule", "🔄 Use separable verbs confidently", "📅 Master time expressions", "🏆 Unlock: Time Traveler badge"]',
  '["Separable verbs", "Time expressions", "Present tense routines"]',
  '[
    {"german": "aufstehen", "english": "to get up", "type": "verb", "xp": 10},
    {"german": "aufwachen", "english": "to wake up", "type": "verb", "xp": 10},
    {"german": "duschen", "english": "to shower", "type": "verb", "xp": 5},
    {"german": "frühstücken", "english": "to have breakfast", "type": "verb", "xp": 10},
    {"german": "zur Arbeit gehen", "english": "to go to work", "type": "expression", "xp": 15},
    {"german": "Feierabend", "english": "end of work day", "type": "noun", "xp": 20},
    {"german": "ins Bett gehen", "english": "to go to bed", "type": "expression", "xp": 15},
    {"german": "zuerst", "english": "first", "type": "adverb", "xp": 10},
    {"german": "dann", "english": "then", "type": "adverb", "xp": 10}
  ]',
  '["🎮 Describe your perfect weekend morning", "🎮 Explain your work-from-home routine", "🎮 Compare weekday vs. weekend schedules"]',
  '[
    {
      "type": "sentence_building",
      "question": "⚡ SPEED ROUND: Build 3 sentences about your morning",
      "answer": "Ich stehe um 7 Uhr auf. Dann dusche ich. Danach frühstücke ich.",
      "xp": 40,
      "hint": "Use: aufstehen, duschen, frühstücken + time expressions"
    }
  ]',
  45, 4, '[]'
);

-- A2.2: Train Station Navigator
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'A2', 2, '🚂 Train Station Navigator',
  'Master German public transport! Unlock the Commuter Pro badge.',
  'train-station',
  '["🎫 Buy train tickets with ease", "🕐 Understand departure/arrival times", "🗺️ Navigate connections and platforms", "🏆 Unlock: Commuter Pro badge"]',
  '["Modal verbs (müssen, können)", "Time (12/24hr)", "Prepositions of place"]',
  '[
    {"german": "der Bahnhof", "english": "train station", "type": "noun", "xp": 5},
    {"german": "der Zug", "english": "train", "type": "noun", "xp": 5},
    {"german": "das Gleis", "english": "platform/track", "type": "noun", "xp": 10},
    {"german": "die Fahrkarte", "english": "ticket", "type": "noun", "xp": 10},
    {"german": "die Abfahrt", "english": "departure", "type": "noun", "xp": 15},
    {"german": "die Ankunft", "english": "arrival", "type": "noun", "xp": 15},
    {"german": "umsteigen", "english": "to change trains", "type": "verb", "xp": 20},
    {"german": "Verspätung haben", "english": "to be delayed", "type": "expression", "xp": 20},
    {"german": "Wann fährt der Zug ab?", "english": "When does the train depart?", "type": "question", "xp": 25}
  ]',
  '["🎮 Buy a ticket to Munich during rush hour", "🎮 Ask about delays and find alternative routes", "🎮 Help a tourist find the right platform"]',
  '[
    {
      "type": "time_challenge",
      "question": "⏱️ TIMED CHALLENGE: You have 5 minutes to catch your train. Buy a ticket and find Platform 7!",
      "xp": 50,
      "time_limit": 300
    }
  ]',
  50, 5, '[{"level": "A2", "lesson_number": 1}]'
);

-- A2.3: Hotel Check-in Hero
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'A2', 3, '🏨 Hotel Check-in Hero',
  'Handle hotel situations like a VIP! Earn the Hospitality Expert badge.',
  'hotel',
  '["🏨 Check in and out smoothly", "❓ Ask about amenities and services", "⚠️ Report problems politely", "🏆 Unlock: Hospitality Expert badge"]',
  '["Perfect tense", "Dative case", "Question words (wann, wo, wie)"]',
  '[
    {"german": "die Reservierung", "english": "reservation", "type": "noun", "xp": 10},
    {"german": "das Zimmer", "english": "room", "type": "noun", "xp": 5},
    {"german": "der Schlüssel", "english": "key", "type": "noun", "xp": 10},
    {"german": "das Frühstück", "english": "breakfast", "type": "noun", "xp": 10},
    {"german": "das WLAN", "english": "WiFi", "type": "noun", "xp": 10},
    {"german": "die Klimaanlage", "english": "air conditioning", "type": "noun", "xp": 15},
    {"german": "funktioniert nicht", "english": "doesn''t work", "type": "expression", "xp": 20},
    {"german": "Könnten Sie bitte...?", "english": "Could you please...?", "type": "expression", "xp": 25}
  ]',
  '["🎮 Check in at 2 AM after a delayed flight", "🎮 Request a room upgrade", "🎮 Report that your room hasn''t been cleaned"]',
  '[
    {
      "type": "role_play",
      "question": "🎭 ACT IT OUT: Your shower is cold, WiFi is down, and you need late checkout",
      "xp": 60,
      "scenario": "problem_solving"
    }
  ]',
  55, 5, '[{"level": "A2", "lesson_number": 2}]'
);

-- ==================== B1 LEVEL LESSONS ====================

-- B1.1: Opinion Master
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'B1', 1, '💭 Opinion Master',
  'Debate like a German! Unlock the Discussion Champion badge.',
  'social',
  '["💬 Express complex opinions confidently", "🤝 Agree and disagree politely", "📊 Give reasons with \"weil\" and \"denn\"", "🏆 Unlock: Discussion Champion badge"]',
  '["Subordinate clauses (weil, dass)", "Subjunctive II", "Comparative/Superlative"]',
  '[
    {"german": "Meiner Meinung nach", "english": "In my opinion", "type": "expression", "xp": 20},
    {"german": "Ich bin der Ansicht", "english": "I am of the view", "type": "expression", "xp": 25},
    {"german": "Das stimmt", "english": "That''s true", "type": "expression", "xp": 15},
    {"german": "Im Gegenteil", "english": "On the contrary", "type": "expression", "xp": 30},
    {"german": "Einerseits...andererseits", "english": "On one hand...on the other hand", "type": "expression", "xp": 40}
  ]',
  '["🎮 Debate: Living in a city vs. countryside", "🎮 Discuss climate change solutions", "🎮 Share your views on social media"]',
  '[
    {
      "type": "debate",
      "question": "🔥 DEBATE MODE: Convince someone that learning German is easier than learning English",
      "xp": 75,
      "requirement": "Use at least 3 opinion phrases and 2 subordinate clauses"
    }
  ]',
  60, 6, '[]'
);

-- B1.2: Doctor Visit Pro
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'B1', 2, '🏥 Doctor Visit Pro',
  'Handle medical situations confidently! Earn the Health Guardian badge.',
  'doctor',
  '["🩺 Describe symptoms precisely", "💊 Understand prescriptions and instructions", "📅 Make and change appointments", "🏆 Unlock: Health Guardian badge"]',
  '["Reflexive verbs", "Body parts", "Perfect tense with sein/haben"]',
  '[
    {"german": "Mir tut...weh", "english": "My...hurts", "type": "expression", "xp": 20},
    {"german": "die Erkältung", "english": "cold", "type": "noun", "xp": 15},
    {"german": "das Fieber", "english": "fever", "type": "noun", "xp": 15},
    {"german": "die Kopfschmerzen", "english": "headache", "type": "noun", "xp": 15},
    {"german": "das Rezept", "english": "prescription", "type": "noun", "xp": 20},
    {"german": "die Krankenkasse", "english": "health insurance", "type": "noun", "xp": 25}
  ]',
  '["🎮 Describe flu symptoms to a doctor", "🎮 Ask about side effects of medication", "🎮 Request a sick note for work"]',
  '[
    {
      "type": "emergency",
      "question": "🚨 EMERGENCY: You ate something bad. Explain your symptoms at the Notaufnahme!",
      "xp": 80,
      "pressure": "high"
    }
  ]',
  65, 7, '[{"level": "B1", "lesson_number": 1}]'
);

-- B1.3: Restaurant Connoisseur
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'B1', 3, '🍽️ Restaurant Connoisseur',
  'Dine like a local! Unlock the Foodie Expert badge.',
  'restaurant',
  '["👨‍🍳 Make reservations and special requests", "🍷 Order multi-course meals with wine pairings", "⭐ Give feedback and leave reviews", "🏆 Unlock: Foodie Expert badge"]',
  '["Conditional sentences", "Passive voice", "Adjective endings"]',
  '[
    {"german": "die Vorspeise", "english": "appetizer", "type": "noun", "xp": 15},
    {"german": "das Hauptgericht", "english": "main course", "type": "noun", "xp": 15},
    {"german": "die Nachspeise", "english": "dessert", "type": "noun", "xp": 15},
    {"german": "durchgebraten", "english": "well-done", "type": "adjective", "xp": 20},
    {"german": "die Empfehlung des Hauses", "english": "house recommendation", "type": "expression", "xp": 30}
  ]',
  '["🎮 Reserve a table for 6 with dietary restrictions", "🎮 Send back an incorrectly cooked steak", "🎮 Ask the chef for his secret recipe"]',
  '[
    {
      "type": "fine_dining",
      "question": "🍷 VIP CHALLENGE: Order a perfect 4-course dinner with wine pairings for a date",
      "xp": 100,
      "elegance_required": true
    }
  ]',
  70, 7, '[{"level": "B1", "lesson_number": 2}]'
);

-- ==================== B2 LEVEL LESSONS ====================

-- B2.1: Business Titan
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'B2', 1, '💼 Business Titan',
  'Conquer the corporate world! Earn the Executive badge.',
  'workplace',
  '["📧 Write professional emails and reports", "🤝 Lead meetings and presentations", "📊 Negotiate contracts and deals", "🏆 Unlock: Executive badge"]',
  '["Nominalization", "Advanced conjunctions", "Formal passive constructions"]',
  '[
    {"german": "die Besprechung", "english": "meeting", "type": "noun", "xp": 15},
    {"german": "vereinbaren", "english": "to arrange", "type": "verb", "xp": 20},
    {"german": "verhandeln", "english": "to negotiate", "type": "verb", "xp": 25},
    {"german": "die Frist", "english": "deadline", "type": "noun", "xp": 20},
    {"german": "durchführen", "english": "to carry out", "type": "verb", "xp": 25},
    {"german": "in Bezug auf", "english": "with regard to", "type": "expression", "xp": 30}
  ]',
  '["🎮 Present Q3 results to the board", "🎮 Negotiate a salary increase", "🎮 Write a formal complaint about a supplier"]',
  '[
    {
      "type": "business_sim",
      "question": "💰 MERGER ALERT: Convince investors to approve a €50M acquisition",
      "xp": 150,
      "stakes": "very_high"
    }
  ]',
  80, 8, '[]'
);

-- B2.2: News Reporter
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'B2', 2, '📰 News Reporter',
  'Report current events fluently! Unlock the Journalist badge.',
  'social',
  '["📱 Discuss news and current affairs", "🔍 Analyze complex topics", "🗣️ Give presentations on serious issues", "🏆 Unlock: Journalist badge"]',
  '["Indirect speech", "Extended modifiers", "Participle constructions"]',
  '[
    {"german": "die Schlagzeile", "english": "headline", "type": "noun", "xp": 20},
    {"german": "berichten", "english": "to report", "type": "verb", "xp": 25},
    {"german": "die Entwicklung", "english": "development", "type": "noun", "xp": 25},
    {"german": "laut Experten", "english": "according to experts", "type": "expression", "xp": 30},
    {"german": "die Auswirkung", "english": "impact", "type": "noun", "xp": 30}
  ]',
  '["🎮 Report on a breaking news story", "🎮 Interview a politician", "🎮 Moderate a debate on AI ethics"]',
  '[
    {
      "type": "live_broadcast",
      "question": "📺 LIVE ON AIR: Report a major event with 2 minutes notice!",
      "xp": 175,
      "pressure": "extreme"
    }
  ]',
  85, 9, '[{"level": "B2", "lesson_number": 1}]'
);

-- ==================== C1 LEVEL LESSONS ====================

-- C1.1: Cultural Diplomat
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'C1', 1, '🎭 Cultural Diplomat',
  'Navigate cultural nuances expertly! Earn the Ambassador badge.',
  'social',
  '["🌍 Discuss abstract cultural concepts", "🎨 Analyze literature and philosophy", "🤝 Handle intercultural misunderstandings", "🏆 Unlock: Ambassador badge"]',
  '["Complex sentence structures", "Stylistic devices", "Register variation"]',
  '[
    {"german": "die Mentalität", "english": "mentality", "type": "noun", "xp": 30},
    {"german": "die Weltanschauung", "english": "worldview", "type": "noun", "xp": 40},
    {"german": "tiefgründig", "english": "profound", "type": "adjective", "xp": 35},
    {"german": "vielschichtig", "english": "multifaceted", "type": "adjective", "xp": 40}
  ]',
  '["🎮 Explain German \"Gemütlichkeit\" to an American", "🎮 Discuss Kafka''s influence on modern literature", "🎮 Mediate a cross-cultural business conflict"]',
  '[
    {
      "type": "philosophical",
      "question": "🧠 DEEP DIVE: Explain the concept of \"Schadenfreude\" and its cultural significance",
      "xp": 200,
      "depth": "profound"
    }
  ]',
  90, 10, '[]'
);

-- C1.2: Legal Eagle
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'C1', 2, '⚖️ Legal Eagle',
  'Master formal and legal German! Unlock the Advocate badge.',
  'workplace',
  '["📜 Understand legal documents", "⚖️ Argue cases logically", "🔍 Navigate bureaucracy", "🏆 Unlock: Advocate badge"]',
  '["Archaic constructions", "Legal terminology", "Formal written German"]',
  '[
    {"german": "der Rechtsanwalt", "english": "lawyer", "type": "noun", "xp": 25},
    {"german": "die Verordnung", "english": "regulation", "type": "noun", "xp": 35},
    {"german": "gemäß", "english": "according to", "type": "preposition", "xp": 40},
    {"german": "in Anbetracht", "english": "in consideration of", "type": "expression", "xp": 45}
  ]',
  '["🎮 Draft a rental contract", "🎮 Argue a civil case", "🎮 Explain German inheritance law"]',
  '[
    {
      "type": "legal_case",
      "question": "⚖️ COURTROOM: Defend your client against contract breach allegations",
      "xp": 250,
      "formality": "maximum"
    }
  ]',
  95, 10, '[{"level": "C1", "lesson_number": 1}]'
);

-- ==================== C2 LEVEL LESSONS ====================

-- C2.1: Polyglot Master
INSERT INTO public.lesson_plans (
  level, lesson_number, title, description, theme_id,
  objectives, grammar_topics, vocabulary_list, conversation_prompts, exercises,
  estimated_duration_minutes, difficulty_score, prerequisites
) VALUES (
  'C2', 1, '👑 Polyglot Master',
  'Achieve native-level mastery! Earn the Legendary badge.',
  'social',
  '["🎯 Use idioms and regional dialects", "📝 Write academic papers", "🎤 Deliver TED-style talks", "👑 Unlock: LEGENDARY STATUS"]',
  '["All structures fluently", "Nuanced register", "Native-level subtlety"]',
  '[
    {"german": "die Lebensweisheit", "english": "life wisdom", "type": "noun", "xp": 50},
    {"german": "verschachtelt", "english": "nested/complex", "type": "adjective", "xp": 50},
    {"german": "gewissermaßen", "english": "to a certain extent", "type": "adverb", "xp": 60}
  ]',
  '["🎮 FINAL BOSS: Improvise a university lecture on quantum physics", "🎮 Write a satirical essay à la Heinrich Böll", "🎮 Debate philosophy with a native professor"]',
  '[
    {
      "type": "masterpiece",
      "question": "👑 ULTIMATE CHALLENGE: Create a 10-minute presentation on \"Die deutsche Seele\" that would impress Goethe himself",
      "xp": 500,
      "legendary": true
    }
  ]',
  120, 10, '[]'
);

-- Verify the lessons were inserted
SELECT
  level,
  lesson_number,
  title,
  estimated_duration_minutes,
  difficulty_score
FROM public.lesson_plans
ORDER BY
  CASE level
    WHEN 'A1' THEN 1
    WHEN 'A2' THEN 2
    WHEN 'B1' THEN 3
    WHEN 'B2' THEN 4
    WHEN 'C1' THEN 5
    WHEN 'C2' THEN 6
  END,
  lesson_number;
