-- Supabase PostgreSQL Schema for Football11 Trivia Platform

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CLUBS TABLE
CREATE TABLE IF NOT EXISTS public.clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL,
    league VARCHAR(100) NOT NULL,
    logo_url TEXT,
    aliases TEXT[] DEFAULT '{}',
    external_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PLAYERS TABLE
CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    nationality VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    age INT,
    image_url TEXT,
    external_id VARCHAR(100) UNIQUE,
    search_vector TSVECTOR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PLAYER_CLUBS TABLE (Career History)
CREATE TABLE IF NOT EXISTS public.player_clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
    start_year INT,
    end_year INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(player_id, club_id)
);

-- 4. PROFILES TABLE (User profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    avatar_url TEXT,
    games_played INT DEFAULT 0,
    games_won INT DEFAULT 0,
    total_score INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    highest_streak INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. DAILY CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS public.daily_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_date DATE NOT NULL UNIQUE,
    grid_config JSONB NOT NULL,
    connection_config JSONB NOT NULL,
    word_game_player_id UUID REFERENCES public.players(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. LEADERBOARD ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.leaderboard_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    game_type VARCHAR(50) NOT NULL, -- 'grid', 'connection', 'word', 'daily'
    score INT NOT NULL DEFAULT 0,
    streak INT DEFAULT 0,
    is_win BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXES FOR FAST QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_players_nationality ON public.players(nationality);
CREATE INDEX IF NOT EXISTS idx_players_position ON public.players(position);
CREATE INDEX IF NOT EXISTS idx_clubs_league ON public.clubs(league);
CREATE INDEX IF NOT EXISTS idx_clubs_country ON public.clubs(country);
CREATE INDEX IF NOT EXISTS idx_player_clubs_player ON public.player_clubs(player_id);
CREATE INDEX IF NOT EXISTS idx_player_clubs_club ON public.player_clubs(club_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_game_type ON public.leaderboard_entries(game_type, score DESC);

-- HELPER QUERY: Find Players by Dual Clubs (e.g., Arsenal + PSG)
-- SELECT p.* FROM players p
-- JOIN player_clubs pc1 ON p.id = pc1.player_id
-- JOIN player_clubs pc2 ON p.id = pc2.player_id
-- JOIN clubs c1 ON pc1.club_id = c1.id
-- JOIN clubs c2 ON pc2.club_id = c2.id
-- WHERE (c1.name ILIKE '%PSG%' OR 'PSG' = ANY(c1.aliases))
--   AND (c2.name ILIKE '%Arsenal%' OR 'Arsenal' = ANY(c2.aliases));

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Allow public read clubs" ON public.clubs FOR SELECT USING (true);
CREATE POLICY "Allow public read player_clubs" ON public.player_clubs FOR SELECT USING (true);
CREATE POLICY "Allow public read daily_challenges" ON public.daily_challenges FOR SELECT USING (true);
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read leaderboards" ON public.leaderboard_entries FOR SELECT USING (true);

-- Authenticated User Writes
CREATE POLICY "Allow authenticated insert leaderboard" ON public.leaderboard_entries 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow user update own profile" ON public.profiles 
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow user insert own profile" ON public.profiles 
    FOR INSERT WITH CHECK (auth.uid() = id);
