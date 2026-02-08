## 🗄️ Supabase Schema / SQL

The following SQL was used to create the database schema and security policies for this project.
It includes table definitions and Row Level Security (RLS) configuration.

```sql
-- Enable required extension
create extension if not exists "uuid-ossp";

-- =====================
-- PROFILES TABLE
-- =====================
create table profiles (
  id uuid primary key,
  email text
);

-- =====================
-- RESOURCES TABLE
-- =====================
create table resources (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  answer text not null,
  key_points text[],
  ppt_url text,
  video_url text
);

-- =====================
-- QUERIES TABLE
-- =====================
create table queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  query text not null,
  created_at timestamp default now()
);

-- =====================
-- ENABLE ROW LEVEL SECURITY
-- =====================
alter table profiles enable row level security;
alter table resources enable row level security;
alter table queries enable row level security;

-- =====================
-- RLS POLICIES
-- =====================

-- profiles: users can read only their own profile
create policy "users can view own profile"
on profiles
for select
using (auth.uid() = id);

-- resources: authenticated users can read learning resources
create policy "authenticated can read resources"
on resources
for select
to authenticated
using (true);

-- queries: users can insert only their own queries
create policy "user can insert own query"
on queries
for insert
with check (auth.uid() = user_id);
```
