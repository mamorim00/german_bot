import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../types/database';

type VocabularyWord = Database['public']['Tables']['vocabulary_words']['Row'];

interface VocabularyContextType {
  words: VocabularyWord[];
  dueWords: VocabularyWord[];
  loading: boolean;
  addWord: (word: {
    germanWord: string;
    englishTranslation: string;
    contextSentence?: string;
    themeId?: string;
    difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  }) => Promise<void>;
  removeWord: (wordId: string) => Promise<void>;
  reviewWord: (wordId: string, correct: boolean) => Promise<void>;
  getDueWords: () => VocabularyWord[];
  refreshWords: () => Promise<void>;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

export function VocabularyProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(false);

  // Load words when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshWords();
    } else {
      setWords([]);
    }
  }, [isAuthenticated, user]);

  const refreshWords = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vocabulary_words')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWords(data || []);
    } catch (error) {
      console.error('Error loading vocabulary:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async (word: {
    germanWord: string;
    englishTranslation: string;
    contextSentence?: string;
    themeId?: string;
    difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  }) => {
    if (!user) return;

    try {
      // Check if word already exists
      const existing = words.find(
        w => w.german_word.toLowerCase() === word.germanWord.toLowerCase()
      );

      if (existing) {
        console.log('Word already exists in vocabulary');
        return;
      }

      const { error } = await supabase
        .from('vocabulary_words')
        .insert({
          user_id: user.id,
          german_word: word.germanWord,
          english_translation: word.englishTranslation,
          context_sentence: word.contextSentence || null,
          theme_id: word.themeId || null,
          difficulty_level: word.difficultyLevel || 'beginner',
          next_review_date: new Date().toISOString(),
        } as any);

      if (error) throw error;

      // Refresh words
      await refreshWords();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const removeWord = async (wordId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('vocabulary_words')
        .delete()
        .eq('id', wordId);

      if (error) throw error;

      // Update local state
      setWords(words.filter(w => w.id !== wordId));
    } catch (error) {
      console.error('Error removing word:', error);
    }
  };

  const reviewWord = async (wordId: string, correct: boolean) => {
    if (!user) return;

    try {
      const word = words.find(w => w.id === wordId);
      if (!word) return;

      // Calculate next review date using spaced repetition
      // Simplified SM-2 algorithm
      const now = new Date();
      let intervalDays = 1;

      if (correct) {
        // Increase interval based on times reviewed correctly
        const timesCorrect = word.times_correct + 1;
        if (timesCorrect === 1) intervalDays = 1;
        else if (timesCorrect === 2) intervalDays = 3;
        else if (timesCorrect === 3) intervalDays = 7;
        else if (timesCorrect === 4) intervalDays = 14;
        else intervalDays = 30;
      } else {
        // Reset to start if incorrect
        intervalDays = 1;
      }

      const nextReviewDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

      const { error } = await (supabase
        .from('vocabulary_words')
        .update as any)({
          times_reviewed: word.times_reviewed + 1,
          times_correct: correct ? word.times_correct + 1 : word.times_correct,
          next_review_date: nextReviewDate.toISOString(),
        })
        .eq('id', wordId);

      if (error) throw error;

      // Refresh words
      await refreshWords();
    } catch (error) {
      console.error('Error reviewing word:', error);
    }
  };

  const getDueWords = () => {
    const now = new Date();
    return words.filter(word => new Date(word.next_review_date) <= now);
  };

  const dueWords = getDueWords();

  const value = {
    words,
    dueWords,
    loading,
    addWord,
    removeWord,
    reviewWord,
    getDueWords,
    refreshWords,
  };

  return <VocabularyContext.Provider value={value}>{children}</VocabularyContext.Provider>;
}

export function useVocabulary() {
  const context = useContext(VocabularyContext);
  if (context === undefined) {
    throw new Error('useVocabulary must be used within a VocabularyProvider');
  }
  return context;
}
