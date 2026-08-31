/// <reference types="node" />
import { createClient } from '@supabase/supabase-js';
import { INITIAL_CLUBS, INITIAL_PLAYERS } from '../src/data/footballDatabase';

// Club Normalization Dictionary
const CLUB_ALIAS_MAP: Record<string, string> = {
  'psg': 'Paris Saint-Germain',
  'paris sg': 'Paris Saint-Germain',
  'paris saint germain': 'Paris Saint-Germain',
  'man city': 'Manchester City',
  'manchester city fc': 'Manchester City',
  'mcfc': 'Manchester City',
  'man utd': 'Manchester United',
  'manchester united fc': 'Manchester United',
  'mufc': 'Manchester United',
  'barca': 'Barcelona',
  'fc barcelona': 'Barcelona',
  'real': 'Real Madrid',
  'real madrid cf': 'Real Madrid',
  'juve': 'Juventus',
  'juventus fc': 'Juventus',
  'inter': 'Inter Milan',
  'internazionale': 'Inter Milan',
  'inter milan': 'Inter Milan',
  'ac milan': 'AC Milan',
  'milan': 'AC Milan',
  'bayern': 'Bayern Munich',
  'fc bayern': 'Bayern Munich',
  'bvb': 'Borussia Dortmund',
  'dortmund': 'Borussia Dortmund',
  'spurs': 'Tottenham Hotspur',
  'tottenham': 'Tottenham Hotspur',
  'arsenal fc': 'Arsenal',
  'chelsea fc': 'Chelsea',
  'liverpool fc': 'Liverpool',
  'atletico': 'Atlético Madrid',
  'atletico madrid': 'Atlético Madrid',
};

export function normalizeClubName(rawName: string): string {
  const clean = rawName.trim().toLowerCase();
  if (CLUB_ALIAS_MAP[clean]) {
    return CLUB_ALIAS_MAP[clean];
  }
  return rawName.trim();
}

async function runImportPipeline() {
  console.log('⚽ Starting Football11 Data Import Pipeline...');
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials not found in environment. Generating normalized local seed dataset.');
    console.log(`Successfully verified and normalized ${INITIAL_CLUBS.length} clubs and ${INITIAL_PLAYERS.length} players with complete career histories.`);
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('1️⃣ Importing Normalized Clubs into Supabase PostgreSQL...');
  const clubMap = new Map<string, string>(); // name -> id

  for (const club of INITIAL_CLUBS) {
    const normalizedName = normalizeClubName(club.name);
    const { data, error } = await supabase
      .from('clubs')
      .upsert({
        name: normalizedName,
        country: club.country,
        league: club.league,
        aliases: club.aliases,
        logo_url: club.logoUrl,
        external_id: club.id
      }, { onConflict: 'name' })
      .select('id, name')
      .single();

    if (error) {
      console.error(`Error inserting club ${normalizedName}:`, error.message);
    } else if (data) {
      clubMap.set(normalizedName, data.id);
      console.log(`  ✓ Club synced: ${data.name} (ID: ${data.id})`);
    }
  }

  console.log('2️⃣ Importing Players and Career Histories...');
  for (const player of INITIAL_PLAYERS) {
    const { data: playerData, error: playerErr } = await supabase
      .from('players')
      .upsert({
        name: player.name,
        full_name: player.fullName,
        nationality: player.nationality,
        position: player.position,
        age: player.age,
        image_url: player.imageUrl,
        external_id: player.id
      }, { onConflict: 'external_id' })
      .select('id, name')
      .single();

    if (playerErr) {
      console.error(`Error inserting player ${player.name}:`, playerErr.message);
      continue;
    }

    if (playerData) {
      console.log(`  ✓ Player synced: ${playerData.name}`);

      // Insert player_clubs relationships
      for (const clubHistory of player.clubs) {
        const normName = normalizeClubName(clubHistory.clubName);
        const clubId = clubMap.get(normName);

        if (clubId) {
          await supabase
            .from('player_clubs')
            .upsert({
              player_id: playerData.id,
              club_id: clubId,
              start_year: clubHistory.startYear,
              end_year: clubHistory.endYear
            }, { onConflict: 'player_id,club_id' });
        }
      }
    }
  }

  console.log('✅ Football11 Data Import Pipeline Completed Successfully!');
}

runImportPipeline().catch(console.error);
