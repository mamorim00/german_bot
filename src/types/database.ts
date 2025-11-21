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
        }
        Insert: {
          id: string
          display_name?: string | null
          current_level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          total_xp?: number
          streak_days?: number
          last_active?: string
          created_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          current_level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          total_xp?: number
          streak_days?: number
          last_active?: string
          created_at?: string
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
    }
  }
}
