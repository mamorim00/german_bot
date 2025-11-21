# 🚀 PUBLISH LESSONS NOW - 2 MINUTE SETUP

## Quick Steps to See Your Lessons

### 1️⃣ Open Supabase (30 seconds)
Go to: https://supabase.com/dashboard/project/ukahyjiyxsflleovzweq/sql/new

### 2️⃣ Run the Seed Script (1 minute)

Copy the **ENTIRE** contents of `supabase/seed_lessons.sql` and paste into the SQL Editor, then click **RUN**.

### 3️⃣ Refresh Your App (30 seconds)

```bash
# If dev server is running, just refresh browser
# If not, start it:
npm run dev
```

Go to: http://localhost:5173 → Login → Click **Lessons** tab

### ✅ You Should See:

```
🎓 Lesson Plans

Recommended for You:
┌─────────────────────────────────┐
│ 👋 First Words Quest            │
│ A1 - Lesson 1 | 25min           │
│ Master basic greetings...        │
└─────────────────────────────────┘

All Lessons:

A1 Level:
┌──────┬──────┬──────┐
│  👋  │  ☕  │  🛒  │
└──────┴──────┴──────┘

A2 Level:
┌──────┬──────┬──────┐
│  ⏰  │  🚂  │  🏨  │
└──────┴──────┴──────┘

...and more!
```

## That's It! 🎉

You now have:
- ✅ 14 complete lessons
- ✅ 14 achievement badges
- ✅ 100+ vocabulary words
- ✅ 50+ exercises
- ✅ Full gamification

## Test It:

1. Click **"👋 First Words Quest"**
2. Complete a few exercises
3. See the confetti animation! 🎉
4. Check **Achievements** tab for your badge! 🏆

---

## Troubleshooting

### Still don't see lessons?

Run this quick fix in Supabase SQL Editor:

```sql
-- Make sure lessons are publicly readable
DROP POLICY IF EXISTS "Anyone can view lesson plans" ON public.lesson_plans;

CREATE POLICY "Anyone can view lesson plans"
  ON public.lesson_plans FOR SELECT
  USING (true);

-- Check if lessons exist
SELECT COUNT(*) FROM public.lesson_plans;
-- Should show: 14
```

### Still having issues?

Check the full guide: `SETUP_LESSONS.md`

---

**Go publish those lessons!** 🚀🇩🇪
