// Flag CDN and Team Logo utility mappings for Football11

const NATION_FLAG_MAP: Record<string, string> = {
  'Argentina': 'https://flagcdn.com/w160/ar.png',
  'Brazil': 'https://flagcdn.com/w160/br.png',
  'France': 'https://flagcdn.com/w160/fr.png',
  'England': 'https://flagcdn.com/w160/gb-eng.png',
  'Spain': 'https://flagcdn.com/w160/es.png',
  'Germany': 'https://flagcdn.com/w160/de.png',
  'Italy': 'https://flagcdn.com/w160/it.png',
  'Portugal': 'https://flagcdn.com/w160/pt.png',
  'Netherlands': 'https://flagcdn.com/w160/nl.png',
  'Croatia': 'https://flagcdn.com/w160/hr.png',
  'Belgium': 'https://flagcdn.com/w160/be.png',
  'Norway': 'https://flagcdn.com/w160/no.png',
  'Poland': 'https://flagcdn.com/w160/pl.png',
  'Sweden': 'https://flagcdn.com/w160/se.png',
  'Uruguay': 'https://flagcdn.com/w160/uy.png',
  'Chile': 'https://flagcdn.com/w160/cl.png',
  'Colombia': 'https://flagcdn.com/w160/co.png',
  'Morocco': 'https://flagcdn.com/w160/ma.png',
  'Egypt': 'https://flagcdn.com/w160/eg.png',
  'Gabon': 'https://flagcdn.com/w160/ga.png',
  'Costa Rica': 'https://flagcdn.com/w160/cr.png',
  'USA': 'https://flagcdn.com/w160/us.png',
  'Wales': 'https://flagcdn.com/w160/gb-wls.png',
};

const CLUB_LOGO_MAP: Record<string, string> = {
  'Paris Saint-Germain': 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
  'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  'Juventus': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg',
  'Manchester City': 'https://upload.wikimedia.org/wikipedia/en/eb/eb/Manchester_City_FC_badge.svg',
  'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'AC Milan': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
  'Borussia Dortmund': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
  'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
  'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
  'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  'Tottenham Hotspur': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'Atlético Madrid': 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
  'AS Roma': 'https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg',
  'Monaco': 'https://upload.wikimedia.org/wikipedia/en/b/ba/AS_Monaco_FC.svg',
  'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/2/28/SSC_Napoli_2024.svg',
  'Inter Miami': 'https://upload.wikimedia.org/wikipedia/en/5/5c/Inter_Miami_CF_logo.svg',
  'Al Nassr': 'https://upload.wikimedia.org/wikipedia/en/c/c5/Al_Nassr_FC_logo.svg',
  'Marseille': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg',
  'Sevilla': 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg',
  'Lyon': 'https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg',
  'Bayer Leverkusen': 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
  'Ajax': 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg',
};

export function getNationalityFlagUrl(nationality: string): string {
  if (NATION_FLAG_MAP[nationality]) {
    return NATION_FLAG_MAP[nationality];
  }
  return `https://flagcdn.com/w160/${nationality.slice(0, 2).toLowerCase()}.png`;
}

export function getClubLogoUrl(clubName: string): string {
  if (CLUB_LOGO_MAP[clubName]) {
    return CLUB_LOGO_MAP[clubName];
  }
  return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80';
}

export function getPlayerImageUrl(player: { name: string; imageUrl?: string }): string {
  if (player.imageUrl && player.imageUrl.trim() !== '') {
    return player.imageUrl;
  }
  const encodedName = encodeURIComponent(player.name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=1e293b&color=00FF87&size=150&font-size=0.33`;
}
