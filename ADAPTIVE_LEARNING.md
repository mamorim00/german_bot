# Adaptive Learning & Lesson Plans System

This document describes the adaptive difficulty and structured curriculum features added to the German Learning AI application.

## 🎯 Features Overview

### 1. Adaptive Difficulty System
The AI automatically adjusts conversation complexity based on your:
- **Current CEFR Level** (A1-C2)
- **Average Accuracy** across conversations
- **Grammar Mastery** in specific topics
- **Vocabulary Size**
- **Personal Complexity Preference**

### 2. Structured Lesson Plans
Progressive curriculum with:
- **Level-based lessons** (A1 to C2)
- **Clear learning objectives**
- **Grammar topic focus**
- **Vocabulary lists**
- **Practice exercises**
- **Conversation prompts**
- **Homework assignments**

### 3. Progress Tracking
Comprehensive tracking of:
- Grammar mastery by topic
- Lesson completion and scores
- Automatic level progression
- Homework submissions

## 📊 Database Schema

### New Tables

#### `lesson_plans`
Stores structured curriculum lessons:
```sql
- id: UUID
- level: A1-C2
- lesson_number: INTEGER
- title, description: TEXT
- theme_id: TEXT (links to conversation themes)
- objectives: JSONB (learning goals)
- grammar_topics: JSONB
- vocabulary_list: JSONB
- conversation_prompts: JSONB
- exercises: JSONB
- estimated_duration_minutes: INTEGER
- difficulty_score: 1-10
- prerequisites: JSONB
```

#### `user_lesson_progress`
Tracks user progress through lessons:
```sql
- user_id, lesson_id: UUID
- status: not_started | in_progress | completed | mastered
- score: FLOAT (0-100)
- completed_exercises: JSONB
- time_spent_seconds: INTEGER
- attempts: INTEGER
- started_at, completed_at: TIMESTAMP
```

#### `homework_assignments`
Assignments linked to lessons:
```sql
- lesson_id: UUID
- title, description: TEXT
- assignment_type: conversation | vocabulary | grammar | writing | listening
- instructions: JSONB
- target_criteria: JSONB (grading criteria)
- points: INTEGER
```

#### `user_homework_submissions`
User homework completions:
```sql
- user_id, homework_id: UUID
- submission_data: JSONB
- score: FLOAT
- feedback: JSONB
- status: submitted | graded | needs_revision
- submitted_at, graded_at: TIMESTAMP
```

#### `grammar_mastery_tracking`
Tracks mastery of specific grammar topics:
```sql
- user_id: UUID
- grammar_topic: TEXT
- mastery_level: beginner | intermediate | advanced | mastered
- correct_uses, incorrect_uses: INTEGER
- last_practiced: TIMESTAMP
```

#### Updated `users` table
Added fields for adaptive learning:
```sql
- grammar_mastery: JSONB (overall grammar proficiency map)
- vocabulary_size: INTEGER (known words count)
- avg_accuracy: FLOAT (average across all conversations)
- complexity_preference: simple | moderate | complex | auto
```

## 🚀 How It Works

### Automatic Level Progression

The system automatically updates your CEFR level based on:
1. **Total XP earned**
2. **Average accuracy**

```
A1: < 500 XP
A2: 500-1500 XP
B1: 1500-3000 XP + 70% accuracy
B2: 3000-5000 XP + 75% accuracy
C1: 5000-8000 XP + 80% accuracy
C2: 8000+ XP + 85% accuracy
```

### Adaptive Conversation Difficulty

When you start a conversation, the AI receives a prompt including:
- Your current CEFR level
- Recent accuracy trends
- Weak grammar topics to focus on
- Complexity preference

Example adaptive prompt:
```
The user is at intermediate level (B1) - use various tenses,
more complex vocabulary, compound and complex sentences.
The user is performing well, so gradually introduce more
advanced concepts. Focus on helping with these grammar topics:
dative case, modal verbs.
```

### Lesson Recommendations

The system recommends lessons by:
1. Filtering by your current level
2. Excluding completed/mastered lessons
3. Checking prerequisites
4. Sorting by lesson number

### Grammar Mastery Tracking

When the AI detects grammar usage in conversations:
```typescript
// Automatically tracked
updateGrammarMastery('dative case', correct: true)
```

Mastery levels are calculated:
- **Beginner**: < 5 correct uses
- **Intermediate**: 5+ correct, 70%+ accuracy
- **Advanced**: 10+ correct, 80%+ accuracy
- **Mastered**: 20+ correct, 90%+ accuracy

## 🎓 Using the Lessons System

### For Students

1. **View Recommended Lessons**
   - Navigate to the "Lessons" tab
   - See personalized recommendations at the top

2. **Start a Lesson**
   - Click on any unlocked lesson
   - Review objectives and vocabulary
   - Complete practice exercises
   - Earn a score (0-100%)

3. **Track Progress**
   - Lessons show as: Not Started, In Progress, Completed, or Mastered
   - Mastered = 90%+ score
   - Completed = 70-89% score

4. **Complete Homework**
   - Each lesson may have homework assignments
   - Submit via conversation practice
   - Get automated or manual grading

### For Administrators

To add new lessons, insert into `lesson_plans` table:

```typescript
{
  level: 'B1',
  lesson_number: 5,
  title: 'Past Tense Mastery',
  description: 'Learn to use Perfekt and Präteritum correctly',
  theme_id: 'social',
  objectives: [
    'Conjugate regular and irregular verbs in past tense',
    'Choose between Perfekt and Präteritum',
    'Use temporal expressions'
  ],
  grammar_topics: ['Perfekt', 'Präteritum', 'irregular verbs'],
  vocabulary_list: [
    { german: 'gestern', english: 'yesterday', type: 'adverb' },
    // ... more words
  ],
  exercises: [
    {
      type: 'fill_in_blank',
      question: 'Ich ____ gestern ins Kino gegangen.',
      answer: 'bin',
      options: ['bin', 'habe', 'war', 'hatte']
    }
  ],
  estimated_duration_minutes: 45,
  difficulty_score: 6,
  prerequisites: [{ level: 'B1', lesson_number: 4 }]
}
```

## 📚 Sample Lessons Included

The `src/data/sampleLessons.ts` file includes starter lessons:

- **A1.1**: Greetings and Introductions
- **A1.2**: Ordering at a Café
- **A2.1**: Talking About Daily Routine
- **B1.1**: Expressing Opinions and Preferences
- **B2.1**: Professional Communication

## 🔧 Integration with Conversations

To integrate adaptive difficulty with your AI conversations:

```typescript
import { useLearning } from './contexts/LearningContext';

function ConversationComponent() {
  const { getAdaptiveDifficultyPrompt } = useLearning();

  const startConversation = async () => {
    const adaptivePrompt = getAdaptiveDifficultyPrompt();

    // Send to your AI API
    const response = await fetch('/api/conversation', {
      method: 'POST',
      body: JSON.stringify({
        message: userMessage,
        systemPrompt: theme.prompt + ' ' + adaptivePrompt,
        // ...
      })
    });
  };
}
```

## 🎯 Next Steps

To fully implement adaptive conversations:

1. **Run Database Migrations**
   ```bash
   # In Supabase SQL Editor
   # Run: supabase/migrations/20250102000000_adaptive_learning.sql
   ```

2. **Seed Sample Lessons**
   - Use the data in `src/data/sampleLessons.ts`
   - Insert via Supabase dashboard or API

3. **Update Conversation API**
   - Modify `/api/conversation` to receive adaptive difficulty prompt
   - Include it in the AI system message

4. **Test the Flow**
   - Complete conversations to earn XP
   - Watch your level automatically progress
   - Complete lessons to unlock new content

## 📈 Benefits

### For Learners
- **Personalized difficulty** - never too easy or too hard
- **Clear learning path** - structured curriculum
- **Visible progress** - track grammar mastery and level
- **Efficient learning** - focus on weak areas

### For the Application
- **Higher engagement** - appropriate difficulty keeps users motivated
- **Better outcomes** - structured lessons ensure comprehensive learning
- **Data-driven** - track which topics need more content
- **Scalable** - easy to add new lessons at any level

## 🔐 Security & Privacy

All learning data is protected with Row Level Security (RLS):
- Users can only view/edit their own progress
- Lesson content is public (read-only)
- Homework submissions are private
- Grammar tracking is per-user

## 🐛 Troubleshooting

**Issue**: Lessons not showing
**Solution**: Run the adaptive_learning migration and seed sample lessons

**Issue**: Level not updating
**Solution**: Ensure `avg_accuracy` is being updated when conversations complete

**Issue**: Grammar mastery not tracking
**Solution**: Integrate `updateGrammarMastery()` calls in conversation feedback

## 📝 License

Part of the German Learning AI application.
