-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Create the twitter_users table
create table public.twitter_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  twitter_id text unique not null,
  screen_name text not null,
  name text,                                -- ✅ Twitter full name
  profile_image_url text,                   -- ✅ Twitter avatar
  oauth_token text not null,
  oauth_token_secret text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row-Level Security
alter table public.twitter_users enable row level security;

-- Allow all actions from trusted backend (you control it)
create policy "Allow backend access to twitter_users"
on public.twitter_users
for all
using (true)
with check (true);
