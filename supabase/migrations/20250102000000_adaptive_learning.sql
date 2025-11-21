-- Add adaptive learning fields to users table
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS grammar_mastery JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS vocabulary_size INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avg_accuracy FLOAT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS complexity_preference TEXT DEFAULT 'auto' CHECK (complexity_preference IN ('simple', 'moderate', 'complex', 'auto'));

-- Create lesson_plans table
CREATE TABLE public.lesson_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  theme_id TEXT NOT NULL,
  objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  grammar_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  vocabulary_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  conversation_prompts JSONB NOT NULL DEFAULT '[]'::jsonb,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  estimated_duration_minutes INTEGER DEFAULT 30,
  difficulty_score INTEGER DEFAULT 1 CHECK (difficulty_score BETWEEN 1 AND 10),
  prerequisites JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(level, lesson_number)
);

-- Create user_lesson_progress table
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lesson_plans(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'mastered')),
  score FLOAT DEFAULT 0,
  completed_exercises JSONB DEFAULT '[]'::jsonb,
  time_spent_seconds INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create homework_assignments table
CREATE TABLE public.homework_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lesson_plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  assignment_type TEXT NOT NULL CHECK (assignment_type IN ('conversation', 'vocabulary', 'grammar', 'writing', 'listening')),
  instructions JSONB NOT NULL DEFAULT '{}'::jsonb,
  target_criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  points INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_homework_submissions table
CREATE TABLE public.user_homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  homework_id UUID NOT NULL REFERENCES public.homework_assignments(id) ON DELETE CASCADE,
  submission_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  score FLOAT,
  feedback JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'needs_revision')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  graded_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, homework_id)
);

-- Create grammar_mastery_tracking table
CREATE TABLE public.grammar_mastery_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  grammar_topic TEXT NOT NULL,
  mastery_level TEXT DEFAULT 'beginner' CHECK (mastery_level IN ('beginner', 'intermediate', 'advanced', 'mastered')),
  correct_uses INTEGER DEFAULT 0,
  incorrect_uses INTEGER DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, grammar_topic)
);

-- Create indexes for better performance
CREATE INDEX idx_lesson_plans_level ON public.lesson_plans(level);
CREATE INDEX idx_lesson_plans_theme ON public.lesson_plans(theme_id);
CREATE INDEX idx_user_lesson_progress_user_id ON public.user_lesson_progress(user_id);
CREATE INDEX idx_user_lesson_progress_status ON public.user_lesson_progress(status);
CREATE INDEX idx_homework_assignments_lesson ON public.homework_assignments(lesson_id);
CREATE INDEX idx_user_homework_submissions_user ON public.user_homework_submissions(user_id);
CREATE INDEX idx_user_homework_submissions_status ON public.user_homework_submissions(status);
CREATE INDEX idx_grammar_mastery_user ON public.grammar_mastery_tracking(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_mastery_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Lesson plans are public (everyone can view)
CREATE POLICY "Anyone can view lesson plans"
  ON public.lesson_plans FOR SELECT
  USING (true);

-- User lesson progress policies
CREATE POLICY "Users can view own lesson progress"
  ON public.user_lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress"
  ON public.user_lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON public.user_lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Homework assignments are public (everyone can view)
CREATE POLICY "Anyone can view homework assignments"
  ON public.homework_assignments FOR SELECT
  USING (true);

-- User homework submissions policies
CREATE POLICY "Users can view own homework submissions"
  ON public.user_homework_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own homework submissions"
  ON public.user_homework_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own homework submissions"
  ON public.user_homework_submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Grammar mastery tracking policies
CREATE POLICY "Users can view own grammar mastery"
  ON public.grammar_mastery_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grammar mastery"
  ON public.grammar_mastery_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grammar mastery"
  ON public.grammar_mastery_tracking FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to calculate user level based on XP and performance
CREATE OR REPLACE FUNCTION public.calculate_user_level(user_xp INTEGER, avg_acc FLOAT)
RETURNS TEXT AS $$
BEGIN
  IF user_xp < 500 THEN
    RETURN 'A1';
  ELSIF user_xp < 1500 THEN
    RETURN 'A2';
  ELSIF user_xp < 3000 AND avg_acc >= 70 THEN
    RETURN 'B1';
  ELSIF user_xp < 5000 AND avg_acc >= 75 THEN
    RETURN 'B2';
  ELSIF user_xp < 8000 AND avg_acc >= 80 THEN
    RETURN 'C1';
  ELSIF user_xp >= 8000 AND avg_acc >= 85 THEN
    RETURN 'C2';
  ELSE
    RETURN 'B1';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update user level automatically
CREATE OR REPLACE FUNCTION public.update_user_level()
RETURNS TRIGGER AS $$
DECLARE
  new_level TEXT;
BEGIN
  new_level := public.calculate_user_level(NEW.total_xp, NEW.avg_accuracy);

  IF new_level != NEW.current_level THEN
    NEW.current_level := new_level;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update user level
CREATE TRIGGER auto_update_user_level
  BEFORE UPDATE OF total_xp, avg_accuracy ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_level();
