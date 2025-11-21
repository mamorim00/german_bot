import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../types/database';
import { gamifiedLessons } from '../data/gamifiedLessons';

type LessonPlan = Database['public']['Tables']['lesson_plans']['Row'];
type UserLessonProgress = Database['public']['Tables']['user_lesson_progress']['Row'];
type HomeworkAssignment = Database['public']['Tables']['homework_assignments']['Row'];
type UserHomeworkSubmission = Database['public']['Tables']['user_homework_submissions']['Row'];
type GrammarMastery = Database['public']['Tables']['grammar_mastery_tracking']['Row'];

interface LearningContextType {
  // User level and adaptive difficulty
  userLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  avgAccuracy: number
  vocabularySize: number;
  complexityPreference: 'simple' | 'moderate' | 'complex' | 'auto';

  // Lesson plans
  lessons: LessonPlan[];
  userLessonProgress: UserLessonProgress[];
  currentLesson: LessonPlan | null;

  // Homework
  homework: HomeworkAssignment[];
  homeworkSubmissions: UserHomeworkSubmission[];

  // Grammar tracking
  grammarMastery: GrammarMastery[];

  loading: boolean;

  // Methods
  startLesson: (lessonId: string) => Promise<void>;
  completeLesson: (lessonId: string, score: number) => Promise<void>;
  updateGrammarMastery: (topic: string, correct: boolean) => Promise<void>;
  submitHomework: (homeworkId: string, submissionData: any) => Promise<void>;
  setComplexityPreference: (preference: 'simple' | 'moderate' | 'complex' | 'auto') => Promise<void>;
  refreshLearningData: () => Promise<void>;
  getRecommendedLessons: () => LessonPlan[];
  getAdaptiveDifficultyPrompt: () => string;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [userLevel, setUserLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [vocabularySize, setVocabularySize] = useState(0);
  const [complexityPreference, setComplexityPref] = useState<'simple' | 'moderate' | 'complex' | 'auto'>('auto');
  const [lessons, setLessons] = useState<LessonPlan[]>([]);
  const [userLessonProgress, setUserLessonProgress] = useState<UserLessonProgress[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonPlan | null>(null);
  const [homework, setHomework] = useState<HomeworkAssignment[]>([]);
  const [homeworkSubmissions, setHomeworkSubmissions] = useState<UserHomeworkSubmission[]>([]);
  const [grammarMastery, setGrammarMastery] = useState<GrammarMastery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshLearningData();
    } else {
      // For non-authenticated users, still show local lessons
      const localLessons = gamifiedLessons.map((lesson) => ({
        ...lesson,
        id: `lesson-${lesson.level}-${lesson.lesson_number}`,
        created_at: new Date().toISOString(),
      })) as any[];
      setLessons(localLessons);

      // Reset other state
      setUserLevel('A1');
      setAvgAccuracy(0);
      setVocabularySize(0);
      setUserLessonProgress([]);
      setHomework([]);
      setHomeworkSubmissions([]);
      setGrammarMastery([]);
      setLoading(false); // Set loading to false after setting lessons
    }
  }, [isAuthenticated, user]);

  const refreshLearningData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user profile with learning data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('current_level, avg_accuracy, vocabulary_size, complexity_preference')
        .eq('id', user.id)
        .single();

      if (!userError && userData) {
        const userDataTyped = userData as any;
        setUserLevel(userDataTyped.current_level as any);
        setAvgAccuracy(userDataTyped.avg_accuracy || 0);
        setVocabularySize(userDataTyped.vocabulary_size || 0);
        setComplexityPref(userDataTyped.complexity_preference as any || 'auto');
      }

      // Fetch all lessons - use gamifiedLessons as primary source
      // This ensures lessons are always available even if database is empty
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lesson_plans')
        .select('*')
        .order('level', { ascending: true })
        .order('lesson_number', { ascending: true });

      // Use database lessons if available, otherwise use local gamifiedLessons
      if (!lessonsError && lessonsData && lessonsData.length > 0) {
        setLessons(lessonsData);
      } else {
        // Use local lessons data with proper IDs
        const localLessons = gamifiedLessons.map((lesson) => ({
          ...lesson,
          id: `lesson-${lesson.level}-${lesson.lesson_number}`,
          created_at: new Date().toISOString(),
        })) as any[];
        setLessons(localLessons);
      }

      // Fetch user lesson progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', user.id);

      if (!progressError) {
        setUserLessonProgress(progressData || []);
      }

      // Fetch homework assignments
      const { data: homeworkData, error: homeworkError } = await supabase
        .from('homework_assignments')
        .select('*');

      if (!homeworkError) {
        setHomework(homeworkData || []);
      }

      // Fetch user homework submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('user_homework_submissions')
        .select('*')
        .eq('user_id', user.id);

      if (!submissionsError) {
        setHomeworkSubmissions(submissionsData || []);
      }

      // Fetch grammar mastery
      const { data: grammarData, error: grammarError } = await supabase
        .from('grammar_mastery_tracking')
        .select('*')
        .eq('user_id', user.id);

      if (!grammarError) {
        setGrammarMastery(grammarData || []);
      }
    } catch (error) {
      console.error('Error loading learning data:', error);
      // Ensure lessons are available even if there's an error
      const localLessons = gamifiedLessons.map((lesson) => ({
        ...lesson,
        id: `lesson-${lesson.level}-${lesson.lesson_number}`,
        created_at: new Date().toISOString(),
      })) as any[];
      setLessons(localLessons);
    } finally {
      setLoading(false);
    }
  };

  const startLesson = async (lessonId: string) => {
    if (!user) return;

    try {
      // Check if progress exists
      const existing = userLessonProgress.find(p => p.lesson_id === lessonId);

      if (existing) {
        // Update existing
        const { error } = await (supabase
          .from('user_lesson_progress')
          .update as any)({
            status: 'in_progress',
            started_at: existing.started_at || new Date().toISOString(),
            last_accessed: new Date().toISOString(),
            attempts: existing.attempts + 1,
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('user_lesson_progress')
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            status: 'in_progress',
            started_at: new Date().toISOString(),
          } as any);

        if (error) throw error;
      }

      // Set current lesson
      const lesson = lessons.find(l => l.id === lessonId);
      setCurrentLesson(lesson || null);

      await refreshLearningData();
    } catch (error) {
      console.error('Error starting lesson:', error);
    }
  };

  const completeLesson = async (lessonId: string, score: number) => {
    if (!user) return;

    try {
      const progress = userLessonProgress.find(p => p.lesson_id === lessonId);
      if (!progress) return;

      const status = score >= 90 ? 'mastered' : score >= 70 ? 'completed' : 'in_progress';

      const { error } = await (supabase
        .from('user_lesson_progress')
        .update as any)({
          status,
          score,
          completed_at: status === 'completed' || status === 'mastered' ? new Date().toISOString() : null,
          last_accessed: new Date().toISOString(),
        })
        .eq('id', progress.id);

      if (error) throw error;

      await refreshLearningData();
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const updateGrammarMastery = async (topic: string, correct: boolean) => {
    if (!user) return;

    try {
      const existing = grammarMastery.find(g => g.grammar_topic === topic);

      if (existing) {
        const correctUses = existing.correct_uses + (correct ? 1 : 0);
        const incorrectUses = existing.incorrect_uses + (correct ? 0 : 1);
        const totalUses = correctUses + incorrectUses;
        const accuracy = (correctUses / totalUses) * 100;

        let masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered' = 'beginner';
        if (correctUses >= 20 && accuracy >= 90) masteryLevel = 'mastered';
        else if (correctUses >= 10 && accuracy >= 80) masteryLevel = 'advanced';
        else if (correctUses >= 5 && accuracy >= 70) masteryLevel = 'intermediate';

        const { error } = await (supabase
          .from('grammar_mastery_tracking')
          .update as any)({
            correct_uses: correctUses,
            incorrect_uses: incorrectUses,
            mastery_level: masteryLevel,
            last_practiced: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('grammar_mastery_tracking')
          .insert({
            user_id: user.id,
            grammar_topic: topic,
            correct_uses: correct ? 1 : 0,
            incorrect_uses: correct ? 0 : 1,
            mastery_level: 'beginner',
          } as any);

        if (error) throw error;
      }

      await refreshLearningData();
    } catch (error) {
      console.error('Error updating grammar mastery:', error);
    }
  };

  const submitHomework = async (homeworkId: string, submissionData: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_homework_submissions')
        .insert({
          user_id: user.id,
          homework_id: homeworkId,
          submission_data: submissionData,
          status: 'submitted',
        } as any);

      if (error) throw error;

      await refreshLearningData();
    } catch (error) {
      console.error('Error submitting homework:', error);
    }
  };

  const setComplexityPreference = async (preference: 'simple' | 'moderate' | 'complex' | 'auto') => {
    if (!user) return;

    try {
      const { error } = await (supabase
        .from('users')
        .update as any)({
          complexity_preference: preference,
        })
        .eq('id', user.id);

      if (error) throw error;

      setComplexityPref(preference);
    } catch (error) {
      console.error('Error setting complexity preference:', error);
    }
  };

  const getRecommendedLessons = (): LessonPlan[] => {
    // Filter lessons by user's level
    const levelLessons = lessons.filter(l => l.level === userLevel);

    // Filter out completed/mastered lessons
    const incompleteLessons = levelLessons.filter(lesson => {
      const progress = userLessonProgress.find(p => p.lesson_id === lesson.id);
      return !progress || (progress.status !== 'completed' && progress.status !== 'mastered');
    });

    // Sort by lesson number
    return incompleteLessons.sort((a, b) => a.lesson_number - b.lesson_number).slice(0, 5);
  };

  const getAdaptiveDifficultyPrompt = (): string => {
    const levelDescriptions = {
      A1: 'beginner level (A1) - use simple present tense, basic vocabulary, short sentences',
      A2: 'elementary level (A2) - use present and past tense, common vocabulary, simple compound sentences',
      B1: 'intermediate level (B1) - use various tenses, more complex vocabulary, compound and complex sentences',
      B2: 'upper-intermediate level (B2) - use advanced grammar structures, idiomatic expressions, sophisticated vocabulary',
      C1: 'advanced level (C1) - use nuanced expressions, complex grammatical structures, abstract concepts',
      C2: 'mastery level (C2) - use native-like proficiency with subtle nuances and sophisticated discourse',
    };

    const complexityMap = {
      simple: 'Keep responses simple and clear',
      moderate: 'Use moderate complexity with some challenging elements',
      complex: 'Use advanced and challenging language',
      auto: '', // Will be determined by level
    };

    let prompt = `The user is at ${levelDescriptions[userLevel]}. `;

    if (complexityPreference === 'auto') {
      // Adjust based on accuracy
      if (avgAccuracy >= 85) {
        prompt += 'The user is performing well, so gradually introduce more advanced concepts. ';
      } else if (avgAccuracy < 70) {
        prompt += 'The user is struggling, so keep things simple and provide more support. ';
      }
    } else {
      prompt += complexityMap[complexityPreference] + '. ';
    }

    // Add grammar focus
    const weakGrammar = grammarMastery
      .filter(g => g.mastery_level === 'beginner' && g.incorrect_uses > g.correct_uses)
      .map(g => g.grammar_topic);

    if (weakGrammar.length > 0) {
      prompt += `Focus on helping with these grammar topics: ${weakGrammar.join(', ')}. `;
    }

    return prompt;
  };

  const value = {
    userLevel,
    avgAccuracy,
    vocabularySize,
    complexityPreference,
    lessons,
    userLessonProgress,
    currentLesson,
    homework,
    homeworkSubmissions,
    grammarMastery,
    loading,
    startLesson,
    completeLesson,
    updateGrammarMastery,
    submitHomework,
    setComplexityPreference,
    refreshLearningData,
    getRecommendedLessons,
    getAdaptiveDifficultyPrompt,
  };

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
