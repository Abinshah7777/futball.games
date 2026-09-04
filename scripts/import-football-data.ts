/// <reference types="node" />
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { INITIAL_CLUBS, INITIAL_PLAYERS } from '../src/data/footballDatabase.js';
import { normalizeClubName } from '../src/utils/clubUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_FILE_PATH = path.resolve(__dirname, '../players.csv');

async function runImportPipeline() {
  console.log('⚽ Starting Football11 Data Import Pipeline...');
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials not found in environment.');
    console.log('Please configure Supabase or use `tsx scripts/generate-fallback.ts` to generate the local JSON.');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('1️⃣ Importing Default Curated Dataset into Supabase...');
  const clubMap = new Map<string, string>(); // name -> id
  
  // First, upload the base clubs
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
    }
  }

  // Next, upload base players
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

    if (playerData && !playerErr) {
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
  
  console.log('✅ Base dataset uploaded.');

  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.log(`⚠️ CSV file not found at ${CSV_FILE_PATH}. Skipping extended CSV import.`);
    return;
  }

  console.log('2️⃣ Processing Extended CSV Dataset...');
  
  // Create a queue for batching Supabase upserts
  const playerBatch: any[] = [];
  const BATCH_SIZE = 500;
  
  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', async (_row) => {
      // NOTE: Adjust row mapping to fit your CSV structure.
      // This is a stub structure mapping.
      // playerBatch.push({
      //   name: row.short_name,
      //   full_name: row.long_name,
      //   nationality: row.nationality_name,
      //   position: row.player_positions.split(',')[0],
      //   age: parseInt(row.age, 10),
      //   image_url: row.player_face_url,
      //   external_id: `ext_${row.player_id}`
      // });
      
      if (playerBatch.length >= BATCH_SIZE) {
        // Pause stream, upload batch, resume stream
        // In a real implementation you would manage async backpressure here.
      }
    })
    .on('end', () => {
      console.log('✅ CSV Import Pipeline Completed successfully.');
    });
}

runImportPipeline().catch(console.error);
