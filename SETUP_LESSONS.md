# 🚀 Quick Setup Guide - Publish Lessons

Follow these steps to publish all 14 gamified lessons to your database.

## Step 1: Run Database Migrations

First, ensure both migrations are applied:

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click on your project: **ukahyjiyxsflleovzweq**
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**

### Migration 1: Base Schema
Copy and paste the contents of:
```
supabase/migrations/20250101000000_initial_schema.sql
```

Click **Run** ✅

### Migration 2: Adaptive Learning
Copy and paste the contents of:
```
supabase/migrations/20250102000000_adaptive_learning.sql
```

Click **Run** ✅

## Step 2: Seed the Lessons

1. Still in **SQL Editor**, click **New Query**
2. Copy and paste the ENTIRE contents of:
```
supabase/seed_lessons.sql
```

3. Click **Run** ✅

You should see output like:
```
level | lesson_number | title
------|---------------|------------------
A1    | 1             | 👋 First Words Quest
A1    | 2             | ☕ Coffee Shop Champion
A1    | 3             | 🛒 Shopping Spree
...
(14 rows)
```

## Step 3: Verify in App

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Log in to your app**

3. **Click the "Lessons" tab** 🎓

4. You should now see:
   - ✅ Recommended lessons for your level
   - ✅ All 14 lessons organized by level (A1-C2)
   - ✅ Colorful cards with XP rewards
   - ✅ Locked lessons for advanced levels

## Step 4: Test a Lesson

1. Click on **"👋 First Words Quest"** (A1.1)

2. You'll see:
   - Learning objectives
   - Vocabulary list (10 words)
   - Grammar topics
   - Practice exercises
   - Conversation prompts

3. Complete some exercises and click **Submit Answers**

4. Watch the **gamified completion modal**:
   - 🎉 Confetti animation
   - Score reveal
   - XP earned
   - Badge unlock (if achieved)

5. Click **Achievements** tab to see your new badge! 🏆

## Troubleshooting

### Issue: "No lessons available yet"

**Solution 1:** Check if lessons were inserted
```sql
SELECT COUNT(*) FROM public.lesson_plans;
```
Should return: `14`

**Solution 2:** Check RLS policies
```sql
SELECT * FROM public.lesson_plans LIMIT 1;
```
If this returns nothing, the RLS policy might be blocking. Run:
```sql
-- Ensure anyone can view lessons
DROP POLICY IF EXISTS "Anyone can view lesson plans" ON public.lesson_plans;

CREATE POLICY "Anyone can view lesson plans"
  ON public.lesson_plans FOR SELECT
  USING (true);
```

### Issue: Lessons show but can't start them

**Solution:** Check user_lesson_progress policies
```sql
-- Ensure users can create progress
CREATE POLICY "Users can insert own lesson progress"
  ON public.user_lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own lesson progress"
  ON public.user_lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON public.user_lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

### Issue: User level not showing correctly

**Solution:** Ensure user has the new fields
```sql
-- Update your user record
UPDATE public.users
SET
  avg_accuracy = 0,
  vocabulary_size = 0,
  grammar_mastery = '{}'::jsonb,
  complexity_preference = 'auto'
WHERE id = auth.uid();
```

## What You Get

After setup, you'll have:

### ✅ 14 Complete Lessons
- **A1**: 3 beginner lessons (greetings, café, shopping)
- **A2**: 3 elementary lessons (routines, travel, hotels)
- **B1**: 3 intermediate lessons (opinions, health, dining)
- **B2**: 2 upper-intermediate lessons (business, news)
- **C1**: 2 advanced lessons (culture, legal)
- **C2**: 1 mastery lesson (native-level)

### ✅ 14 Achievement Badges
- Each lesson completion earns a unique badge
- Badge collection visible in Achievements page
- XP bonuses from 50-1000 XP per badge

### ✅ 100+ Vocabulary Words
- Organized by lesson and difficulty
- XP values for each word (5-60 XP)
- Type categorization (noun, verb, expression, etc.)

### ✅ 50+ Interactive Exercises
- Multiple choice
- Fill in the blank
- Translation challenges
- Boss battles
- Time challenges
- Role-plays

### ✅ Gamification Features
- XP system with visual rewards
- Daily streak tracking
- Level progression (A1→C2)
- Animated completion modals
- Confetti and celebrations
- Progress tracking

## Quick Test Commands

```sql
-- Check all lessons are there
SELECT level, COUNT(*) as lesson_count
FROM public.lesson_plans
GROUP BY level
ORDER BY level;

-- Expected result:
-- A1: 3
-- A2: 3
-- B1: 3
-- B2: 2
-- C1: 2
-- C2: 1

-- View your progress
SELECT
  lp.title,
  ulp.status,
  ulp.score
FROM public.user_lesson_progress ulp
JOIN public.lesson_plans lp ON lp.id = ulp.lesson_id
WHERE ulp.user_id = auth.uid();

-- Check your badges (after completing lessons)
SELECT achievement_type, earned_at
FROM public.user_achievements
WHERE user_id = auth.uid();
```

## Next Steps

1. **Complete Your First Lesson** 🎓
   - Start with "First Words Quest"
   - Aim for 90%+ to MASTER it
   - Earn your first badge!

2. **Build a Streak** 🔥
   - Practice daily
   - Unlock Fire Week badge at 7 days
   - Earn bonus XP

3. **Explore All Features** ✨
   - Check Vocabulary page
   - Review Progress stats
   - View Achievements collection

4. **Share Your Progress** 🌟
   - Show off your badges
   - Track your XP growth
   - Climb the levels!

---

## Support

If lessons still don't show after following these steps:

1. Check browser console for errors (F12 → Console)
2. Verify Supabase connection in Network tab
3. Ensure you're logged in with a valid account
4. Try logging out and back in

## Database Backup

Before running migrations, you can backup your data:

1. Go to Supabase Dashboard
2. **Database** → **Backups**
3. Click **Create Backup**

This way you can restore if anything goes wrong!

---

**Ready?** Head to Supabase SQL Editor and paste that seed_lessons.sql file! 🚀

Your gamified German learning adventure awaits! 🇩🇪✨
