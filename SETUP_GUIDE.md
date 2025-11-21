# Setup Guide - Authentication System

## Step 1: Run Database Migration

**IMPORTANT:** You must run the database migration in Supabase before the app will work.

1. Open your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (`german-language-app`)
3. Click on **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy the entire contents of `supabase/migrations/20250101000000_initial_schema.sql`
6. Paste into the SQL editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

You should see a success message. The migration creates:
- ✅ 5 tables (users, user_progress, conversation_history, vocabulary_words, user_achievements)
- ✅ Row-level security policies
- ✅ Indexes for performance
- ✅ Triggers for auto-creating user profiles

## Step 2: Verify Tables Were Created

1. Go to **Table Editor** in the Supabase sidebar
2. You should see these tables:
   - `users`
   - `user_progress`
   - `conversation_history`
   - `vocabulary_words`
   - `user_achievements`

If you see all 5 tables, you're good to go!

## Step 3: Test the Application

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser

3. You should see a **"Sign In"** button in the top right

4. Click it and test:
   - **Sign Up**: Create a new account
   - **Sign In**: Log in with your credentials
   - **Sign Out**: Use the profile dropdown

## What's Been Implemented

✅ **Authentication System**
- User signup with email/password
- User login
- Session management
- User profile dropdown
- Sign out functionality

✅ **Database Setup**
- Complete schema for all features
- Row-level security (users can only access their own data)
- Automatic user profile creation on signup

## Next Steps (Not Yet Implemented)

The following features are designed but not yet coded:
- 📊 Progress tracking (save conversation stats)
- 📚 Vocabulary builder with flashcards
- 🏆 Achievements system
- 📈 Dashboard with statistics

These can be implemented in a follow-up session!

## Troubleshooting

**Issue: "Missing Supabase environment variables"**
- Make sure your `.env` file has the correct values
- Restart your dev server after changing `.env`

**Issue: Can't sign up/login**
- Check the browser console for errors
- Make sure you ran the database migration
- Verify your Supabase credentials in `.env`

**Issue: "RLS policy violation"**
- This means the database migration didn't run properly
- Re-run the migration SQL in Supabase SQL Editor

**Issue: User profile not created**
- Check if the trigger was created properly
- You can manually check in Supabase: Table Editor > users

## Testing Checklist

- [ ] Database migration ran successfully
- [ ] Can see all 5 tables in Supabase
- [ ] App loads without errors
- [ ] Can click "Sign In" button
- [ ] Can create a new account
- [ ] Can sign in with credentials
- [ ] Can see user profile dropdown when logged in
- [ ] Can sign out

Once all checkboxes are complete, your authentication system is working!
