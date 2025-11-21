export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          display_name: string | null
          current_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          total_xp: number
          streak_days: number
          last_active: string
          created_at: string
          grammar_mastery: Json
          vocabulary_size: number
          avg_accuracy: number
          complexity_preference: 'simple' | 'moderate' | 'complex' | 'auto'
        }
        Insert: {
          id: string
          display_name?: string | null
          current_level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          total_xp?: number
          streak_days?: number
          last_active?: string
          created_at?: string
          grammar_mastery?: Json
          vocabulary_size?: number
          avg_accuracy?: number
          complexity_preference?: 'simple' | 'moderate' | 'complex' | 'auto'
        }
        Update: {
          id?: string
          display_name?: string | null
          current_level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          total_xp?: number
          streak_days?: number
          last_active?: string
          created_at?: string
          grammar_mastery?: Json
          vocabulary_size?: number
          avg_accuracy?: number
          complexity_preference?: 'simple' | 'moderate' | 'complex' | 'auto'
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          theme_id: string
          conversations_count: number
          total_messages: number
          correct_messages: number
          total_time_seconds: number
          last_practiced: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme_id: string
          conversations_count?: number
          total_messages?: number
          correct_messages?: number
          total_time_seconds?: number
          last_practiced?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme_id?: string
          conversations_count?: number
          total_messages?: number
          correct_messages?: number
          total_time_seconds?: number
          last_practiced?: string
          created_at?: string
        }
      }
      conversation_history: {
        Row: {
          id: string
          user_id: string
          theme_id: string
          messages: Json
          corrections: Json
          duration_seconds: number
          accuracy_score: number
          xp_earned: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme_id: string
          messages?: Json
          corrections?: Json
          duration_seconds?: number
          accuracy_score?: number
          xp_earned?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme_id?: string
          messages?: Json
          corrections?: Json
          duration_seconds?: number
          accuracy_score?: number
          xp_earned?: number
          created_at?: string
        }
      }
      vocabulary_words: {
        Row: {
          id: string
          user_id: string
          german_word: string
          english_translation: string
          context_sentence: string | null
          theme_id: string | null
          difficulty_level: 'beginner' | 'intermediate' | 'advanced' | null
          times_reviewed: number
          times_correct: number
          next_review_date: string
          audio_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          german_word: string
          english_translation: string
          context_sentence?: string | null
          theme_id?: string | null
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | null
          times_reviewed?: number
          times_correct?: number
          next_review_date?: string
          audio_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          german_word?: string
          english_translation?: string
          context_sentence?: string | null
          theme_id?: string | null
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | null
          times_reviewed?: number
          times_correct?: number
          next_review_date?: string
          audio_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          achievement_data: Json
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          achievement_data?: Json
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          achievement_data?: Json
          earned_at?: string
        }
      }
      lesson_plans: {
        Row: {
          id: string
          level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          lesson_number: number
          title: string
          description: string
          theme_id: string
          objectives: Json
          grammar_topics: Json
          vocabulary_list: Json
          conversation_prompts: Json
          exercises: Json
          estimated_duration_minutes: number
          difficulty_score: number
          prerequisites: Json
          created_at: string
        }
        Insert: {
          id?: string
          level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          lesson_number: number
          title: string
          description: string
          theme_id: string
          objectives?: Json
          grammar_topics?: Json
          vocabulary_list?: Json
          conversation_prompts?: Json
          exercises?: Json
          estimated_duration_minutes?: number
          difficulty_score?: number
          prerequisites?: Json
          created_at?: string
        }
        Update: {
          id?: string
          level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          lesson_number?: number
          title?: string
          description?: string
          theme_id?: string
          objectives?: Json
          grammar_topics?: Json
          vocabulary_list?: Json
          conversation_prompts?: Json
          exercises?: Json
          estimated_duration_minutes?: number
          difficulty_score?: number
          prerequisites?: Json
          created_at?: string
        }
      }
      user_lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          status: 'not_started' | 'in_progress' | 'completed' | 'mastered'
          score: number
          completed_exercises: Json
          time_spent_seconds: number
          attempts: number
          started_at: string | null
          completed_at: string | null
          last_accessed: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          status?: 'not_started' | 'in_progress' | 'completed' | 'mastered'
          score?: number
          completed_exercises?: Json
          time_spent_seconds?: number
          attempts?: number
          started_at?: string | null
          completed_at?: string | null
          last_accessed?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          status?: 'not_started' | 'in_progress' | 'completed' | 'mastered'
          score?: number
          completed_exercises?: Json
          time_spent_seconds?: number
          attempts?: number
          started_at?: string | null
          completed_at?: string | null
          last_accessed?: string
        }
      }
      homework_assignments: {
        Row: {
          id: string
          lesson_id: string
          title: string
          description: string
          assignment_type: 'conversation' | 'vocabulary' | 'grammar' | 'writing' | 'listening'
          instructions: Json
          target_criteria: Json
          points: number
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          description: string
          assignment_type: 'conversation' | 'vocabulary' | 'grammar' | 'writing' | 'listening'
          instructions?: Json
          target_criteria?: Json
          points?: number
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          description?: string
          assignment_type?: 'conversation' | 'vocabulary' | 'grammar' | 'writing' | 'listening'
          instructions?: Json
          target_criteria?: Json
          points?: number
          created_at?: string
        }
      }
      user_homework_submissions: {
        Row: {
          id: string
          user_id: string
          homework_id: string
          submission_data: Json
          score: number | null
          feedback: Json
          status: 'submitted' | 'graded' | 'needs_revision'
          submitted_at: string
          graded_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          homework_id: string
          submission_data?: Json
          score?: number | null
          feedback?: Json
          status?: 'submitted' | 'graded' | 'needs_revision'
          submitted_at?: string
          graded_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          homework_id?: string
          submission_data?: Json
          score?: number | null
          feedback?: Json
          status?: 'submitted' | 'graded' | 'needs_revision'
          submitted_at?: string
          graded_at?: string | null
        }
      }
      grammar_mastery_tracking: {
        Row: {
          id: string
          user_id: string
          grammar_topic: string
          mastery_level: 'beginner' | 'intermediate' | 'advanced' | 'mastered'
          correct_uses: number
          incorrect_uses: number
          last_practiced: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          grammar_topic: string
          mastery_level?: 'beginner' | 'intermediate' | 'advanced' | 'mastered'
          correct_uses?: number
          incorrect_uses?: number
          last_practiced?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          grammar_topic?: string
          mastery_level?: 'beginner' | 'intermediate' | 'advanced' | 'mastered'
          correct_uses?: number
          incorrect_uses?: number
          last_practiced?: string
          created_at?: string
        }
      }
    }
  }
}
