import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { INITIAL_CLUBS, INITIAL_PLAYERS } from '../src/data/footballDatabase.js'; // Note: importing the default arrays to seed with

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace with your actual CSV path
const CSV_FILE_PATH = path.resolve(__dirname, '../players.csv');
const OUTPUT_JSON_PATH = path.resolve(__dirname, '../public/data/fallback-db.json');

async function generateFallbackDatabase() {
  console.log('⚽ Generating highly compressed fallback database for Football11...');
  
  // Start with our default curated dataset
  const clubs = [...INITIAL_CLUBS];
  const players = [...INITIAL_PLAYERS];
  
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.log(`⚠️  CSV file not found at ${CSV_FILE_PATH}`);
    console.log('Writing default fallback DB instead...');
    writeJson(clubs, players);
    return;
  }

  // NOTE: You will need to map the specific columns of your Kaggle CSV to the Player/Club interfaces here.
  // This is a stub showing how to process the stream.
  
  console.log(`Reading CSV from ${CSV_FILE_PATH}...`);
  
  let count = 0;
  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (_row) => {
      // Example row mapping logic for Kaggle EA Sports FC 24 dataset:
      // const player = {
      //   id: `ext_${row.player_id}`,
      //   name: row.short_name,
      //   fullName: row.long_name,
      //   nationality: row.nationality_name,
      //   position: row.player_positions.split(',')[0],
      //   age: parseInt(row.age, 10),
      //   imageUrl: row.player_face_url,
      //   clubs: [{ clubId: `club_${row.club_team_id}`, clubName: row.club_name, startYear: parseInt(row.club_joined?.substring(0, 4)) }]
      // }
      // players.push(player);
      // add club to clubs if not exists...
      
      count++;
      if (count % 10000 === 0) {
        console.log(`Processed ${count} rows...`);
      }
    })
    .on('end', () => {
      console.log(`✅ CSV processing complete. Total extra players: ${count}`);
      writeJson(clubs, players);
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
    });
}

function writeJson(clubs: any[], players: any[]) {
  const outputDir = path.dirname(OUTPUT_JSON_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const payload = {
    clubs,
    players
  };

  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(payload)); // no pretty-printing to save space
  console.log(`✅ Wrote fallback database to ${OUTPUT_JSON_PATH}`);
  const stats = fs.statSync(OUTPUT_JSON_PATH);
  console.log(`📦 File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
}

generateFallbackDatabase().catch(console.error);
