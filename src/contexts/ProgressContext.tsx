import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../types/database';

type UserProgress = Database['public']['Tables']['user_progress']['Row'];
type ConversationHistory = Database['public']['Tables']['conversation_history']['Row'];

interface ProgressContextType {
  userProgress: UserProgress[];
  conversationHistory: ConversationHistory[];
  loading: boolean;
  saveConversation: (data: {
    themeId: string;
    messages: any[];
    corrections: any[];
    durationSeconds: number;
    accuracyScore: number;
    xpEarned: number;
  }) => Promise<void>;
  updateThemeProgress: (themeId: string, stats: {
    messagesCount: number;
    correctCount: number;
    timeSeconds: number;
  }) => Promise<void>;
  getTotalXP: () => number;
  getThemeStats: (themeId: string) => UserProgress | undefined;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory[]>([]);
  const [loading, setLoading] = useState(false);

  // Load progress when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshProgress();
    } else {
      setUserProgress([]);
      setConversationHistory([]);
    }
  }, [isAuthenticated, user]);

  const refreshProgress = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;
      setUserProgress(progressData || []);

      // Fetch conversation history (last 20)
      const { data: historyData, error: historyError } = await supabase
        .from('conversation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (historyError) throw historyError;
      setConversationHistory(historyData || []);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConversation = async (data: {
    themeId: string;
    messages: any[];
    corrections: any[];
    durationSeconds: number;
    accuracyScore: number;
    xpEarned: number;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('conversation_history')
        .insert({
          user_id: user.id,
          theme_id: data.themeId,
          messages: data.messages as any,
          corrections: data.corrections as any,
          duration_seconds: data.durationSeconds,
          accuracy_score: data.accuracyScore,
          xp_earned: data.xpEarned,
        } as any);

      if (error) throw error;

      // Update user's total XP
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('total_xp')
        .eq('id', user.id)
        .single();

      if (!userError && userData) {
        await (supabase
          .from('users')
          .update as any)({
            total_xp: (userData as any).total_xp + data.xpEarned,
            last_active: new Date().toISOString(),
          })
          .eq('id', user.id);
      }

      // Refresh to get updated data
      await refreshProgress();
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const updateThemeProgress = async (
    themeId: string,
    stats: {
      messagesCount: number;
      correctCount: number;
      timeSeconds: number;
    }
  ) => {
    if (!user) return;

    try {
      // Check if progress entry exists
      const existing = userProgress.find(p => p.theme_id === themeId);

      if (existing) {
        // Update existing
        const { error } = await (supabase
          .from('user_progress')
          .update as any)({
            conversations_count: existing.conversations_count + 1,
            total_messages: existing.total_messages + stats.messagesCount,
            correct_messages: existing.correct_messages + stats.correctCount,
            total_time_seconds: existing.total_time_seconds + stats.timeSeconds,
            last_practiced: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            theme_id: themeId,
            conversations_count: 1,
            total_messages: stats.messagesCount,
            correct_messages: stats.correctCount,
            total_time_seconds: stats.timeSeconds,
          } as any);

        if (error) throw error;
      }

      // Refresh progress
      await refreshProgress();
    } catch (error) {
      console.error('Error updating theme progress:', error);
    }
  };

  const getTotalXP = () => {
    return conversationHistory.reduce((total, conv) => total + conv.xp_earned, 0);
  };

  const getThemeStats = (themeId: string) => {
    return userProgress.find(p => p.theme_id === themeId);
  };

  const value = {
    userProgress,
    conversationHistory,
    loading,
    saveConversation,
    updateThemeProgress,
    getTotalXP,
    getThemeStats,
    refreshProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
