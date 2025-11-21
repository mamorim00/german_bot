x# Supabase Setup Instructions

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Click "New project"
5. Fill in:
   - **Project name**: german-language-app (or your choice)
   - **Database password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing plan**: Free tier is fine to start

## Step 2: Get Your Credentials

1. Once the project is created, go to **Project Settings** (gear icon in sidebar)
2. Go to **API** section
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Add Credentials to Your App

1. Open `.env` file in your project root
2. Replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

## Step 4: Run Database Migration

1. In your Supabase project dashboard, go to **SQL Editor** (in sidebar)
2. Click "New query"
3. Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** to execute

This will create all the necessary tables, indexes, RLS policies, and triggers.

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see the following tables:
   - users
   - user_progress
   - conversation_history
   - vocabulary_words
   - user_achievements

## Step 6: Enable Email Authentication

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Make sure **Email** provider is enabled
3. (Optional) Configure email templates under **Authentication** > **Email Templates**

## Step 7: (Optional) Enable Social Login

If you want to add Google/GitHub login:

1. Go to **Authentication** > **Providers**
2. Enable the provider you want (e.g., Google, GitHub)
3. Follow the instructions to get Client ID and Secret from the provider
4. Add the credentials in Supabase

## Troubleshooting

**Issue**: Can't connect to Supabase
- Make sure your `.env` file has the correct URL and key
- Restart your dev server after updating `.env`

**Issue**: RLS policies blocking queries
- Check Supabase logs in **Database** > **Logs**
- Make sure user is authenticated before making queries

**Issue**: Migration fails
- Check for syntax errors in SQL
- Run each CREATE TABLE statement individually if needed
- Check Supabase logs for detailed error messages

## What This Schema Provides

✅ **User Management**: Automatic user profile creation on signup
✅ **Progress Tracking**: Store conversation stats per theme
✅ **Conversation History**: Save full conversation logs
✅ **Vocabulary Builder**: Track words with spaced repetition
✅ **Achievements**: Award badges and track milestones
✅ **Security**: Row-level security ensures users only see their own data
✅ **Performance**: Indexes for fast queries

## Next Steps

After setting up Supabase, restart your development server and the app should connect automatically!
