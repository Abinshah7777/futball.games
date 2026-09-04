import type { Player, Club, GridCategory, ConnectionPuzzle } from '../types';
import { getClubLogoUrl, getNationalityFlagUrl } from '../utils/mediaUtils';

export const INITIAL_CLUBS: Club[] = [
  { id: 'c1', name: 'Paris Saint-Germain', country: 'France', league: 'Ligue 1', logoUrl: getClubLogoUrl('Paris Saint-Germain'), aliases: ['PSG', 'Paris SG', 'Paris Saint Germain'] },
  { id: 'c2', name: 'Arsenal', country: 'England', league: 'Premier League', logoUrl: getClubLogoUrl('Arsenal'), aliases: ['Arsenal FC', 'The Gunners'] },
  { id: 'c3', name: 'Barcelona', country: 'Spain', league: 'La Liga', logoUrl: getClubLogoUrl('Barcelona'), aliases: ['FC Barcelona', 'Barca'] },
  { id: 'c4', name: 'Real Madrid', country: 'Spain', league: 'La Liga', logoUrl: getClubLogoUrl('Real Madrid'), aliases: ['Real Madrid CF', 'Real', 'Los Blancos'] },
  { id: 'c5', name: 'Chelsea', country: 'England', league: 'Premier League', logoUrl: getClubLogoUrl('Chelsea'), aliases: ['Chelsea FC', 'The Blues'] },
  { id: 'c6', name: 'Juventus', country: 'Italy', league: 'Serie A', logoUrl: getClubLogoUrl('Juventus'), aliases: ['Juventus FC', 'Juve', 'The Old Lady'] },
  { id: 'c7', name: 'Manchester City', country: 'England', league: 'Premier League', logoUrl: getClubLogoUrl('Manchester City'), aliases: ['Man City', 'MCFC', 'City'] },
  { id: 'c8', name: 'Manchester United', country: 'England', league: 'Premier League', logoUrl: getClubLogoUrl('Manchester United'), aliases: ['Man Utd', 'MUFC', 'United'] },
  { id: 'c9', name: 'AC Milan', country: 'Italy', league: 'Serie A', logoUrl: getClubLogoUrl('AC Milan'), aliases: ['Milan', 'Rossoneri'] },
  { id: 'c10', name: 'Borussia Dortmund', country: 'Germany', league: 'Bundesliga', logoUrl: getClubLogoUrl('Borussia Dortmund'), aliases: ['BVB', 'Dortmund'] },
  { id: 'c11', name: 'Bayern Munich', country: 'Germany', league: 'Bundesliga', logoUrl: getClubLogoUrl('Bayern Munich'), aliases: ['FC Bayern', 'Bayern', 'Munich'] },
  { id: 'c12', name: 'Inter Milan', country: 'Italy', league: 'Serie A', logoUrl: getClubLogoUrl('Inter Milan'), aliases: ['Inter', 'Internazionale', 'Nerazzurri'] },
  { id: 'c13', name: 'Liverpool', country: 'England', league: 'Premier League', logoUrl: getClubLogoUrl('Liverpool'), aliases: ['Liverpool FC', 'Reds'] },
  { id: 'c14', name: 'Tottenham Hotspur', country: 'England', league: 'Premier League', logoUrl: getClubLogoUrl('Tottenham Hotspur'), aliases: ['Spurs', 'Tottenham'] },
  { id: 'c15', name: 'Atlético Madrid', country: 'Spain', league: 'La Liga', logoUrl: getClubLogoUrl('Atlético Madrid'), aliases: ['Atletico', 'Atleti', 'Atletico Madrid'] },
  { id: 'c16', name: 'AS Roma', country: 'Italy', league: 'Serie A', logoUrl: getClubLogoUrl('AS Roma'), aliases: ['Roma', 'Giallorossi'] },
  { id: 'c17', name: 'Monaco', country: 'France', league: 'Ligue 1', logoUrl: getClubLogoUrl('Monaco'), aliases: ['AS Monaco'] },
  { id: 'c18', name: 'Napoli', country: 'Italy', league: 'Serie A', logoUrl: getClubLogoUrl('Napoli'), aliases: ['SSC Napoli'] },
  { id: 'c19', name: 'Inter Miami', country: 'USA', league: 'MLS', logoUrl: getClubLogoUrl('Inter Miami'), aliases: ['Inter Miami CF'] },
  { id: 'c20', name: 'Al Nassr', country: 'Saudi Arabia', league: 'Saudi Pro League', logoUrl: getClubLogoUrl('Al Nassr'), aliases: ['Al-Nassr'] },
  { id: 'c21', name: 'Marseille', country: 'France', league: 'Ligue 1', logoUrl: getClubLogoUrl('Marseille'), aliases: ['Olympique de Marseille', 'OM'] },
  { id: 'c22', name: 'Sevilla', country: 'Spain', league: 'La Liga', logoUrl: getClubLogoUrl('Sevilla'), aliases: ['Sevilla FC'] },
  { id: 'c23', name: 'Lyon', country: 'France', league: 'Ligue 1', logoUrl: getClubLogoUrl('Lyon'), aliases: ['Olympique Lyonnais', 'OL'] },
  { id: 'c24', name: 'Bayer Leverkusen', country: 'Germany', league: 'Bundesliga', logoUrl: getClubLogoUrl('Bayer Leverkusen'), aliases: ['Leverkusen', 'Werkself'] },
  { id: 'c25', name: 'Ajax', country: 'Netherlands', league: 'Eredivisie', logoUrl: getClubLogoUrl('Ajax'), aliases: ['AFC Ajax'] },
];

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Lionel Messi',
    fullName: 'Lionel Andrés Messi',
    nationality: 'Argentina',
    position: 'Forward',
    age: 37,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2004, endYear: 2021 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2021, endYear: 2023 },
      { clubId: 'c19', clubName: 'Inter Miami', startYear: 2023, endYear: 2026 },
    ]
  },
  {
    id: 'p2',
    name: 'Cristiano Ronaldo',
    fullName: 'Cristiano Ronaldo dos Santos Aveiro',
    nationality: 'Portugal',
    position: 'Forward',
    age: 39,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2003, endYear: 2009 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2009, endYear: 2018 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2018, endYear: 2021 },
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2021, endYear: 2022 },
      { clubId: 'c20', clubName: 'Al Nassr', startYear: 2023, endYear: 2026 },
    ]
  },
  {
    id: 'p3',
    name: 'Kylian Mbappé',
    fullName: 'Kylian Mbappé Lottin',
    nationality: 'France',
    position: 'Forward',
    age: 25,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c17', clubName: 'Monaco', startYear: 2015, endYear: 2017 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2017, endYear: 2024 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2024, endYear: 2026 },
    ]
  },
  {
    id: 'p4',
    name: 'Nicolas Anelka',
    fullName: 'Nicolas Sébastien Anelka',
    nationality: 'France',
    position: 'Forward',
    age: 45,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 1996, endYear: 1997 },
      { clubId: 'c2', clubName: 'Arsenal', startYear: 1997, endYear: 1999 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 1999, endYear: 2000 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2000, endYear: 2002 },
      { clubId: 'c13', clubName: 'Liverpool', startYear: 2001, endYear: 2002 },
      { clubId: 'c7', clubName: 'Manchester City', startYear: 2002, endYear: 2005 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2008, endYear: 2012 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2013, endYear: 2013 },
    ]
  },
  {
    id: 'p5',
    name: 'Angel Di Maria',
    fullName: 'Ángel Fabián Di María',
    nationality: 'Argentina',
    position: 'Midfielder',
    age: 36,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2010, endYear: 2014 },
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2014, endYear: 2015 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2015, endYear: 2022 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2022, endYear: 2023 },
    ]
  },
  {
    id: 'p6',
    name: 'Alexis Sánchez',
    fullName: 'Alexis Alejandro Sánchez Sánchez',
    nationality: 'Chile',
    position: 'Forward',
    age: 35,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2011, endYear: 2014 },
      { clubId: 'c2', clubName: 'Arsenal', startYear: 2014, endYear: 2018 },
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2018, endYear: 2019 },
      { clubId: 'c12', clubName: 'Inter Milan', startYear: 2019, endYear: 2022 },
      { clubId: 'c21', clubName: 'Marseille', startYear: 2022, endYear: 2023 },
    ]
  },
  {
    id: 'p7',
    name: 'Zlatan Ibrahimović',
    fullName: 'Zlatan Ibrahimović',
    nationality: 'Sweden',
    position: 'Forward',
    age: 42,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c25', clubName: 'Ajax', startYear: 2001, endYear: 2004 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2004, endYear: 2006 },
      { clubId: 'c12', clubName: 'Inter Milan', startYear: 2006, endYear: 2009 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2009, endYear: 2010 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2010, endYear: 2012 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2012, endYear: 2016 },
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2016, endYear: 2018 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2020, endYear: 2023 },
    ]
  },
  {
    id: 'p8',
    name: 'Thierry Henry',
    fullName: 'Thierry Daniel Henry',
    nationality: 'France',
    position: 'Forward',
    age: 47,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c17', clubName: 'Monaco', startYear: 1994, endYear: 1999 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 1999, endYear: 1999 },
      { clubId: 'c2', clubName: 'Arsenal', startYear: 1999, endYear: 2007 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2007, endYear: 2010 },
      { clubId: 'c2', clubName: 'Arsenal', startYear: 2012, endYear: 2012 },
    ]
  },
  {
    id: 'p9',
    name: 'Cesc Fàbregas',
    fullName: 'Francesc Fàbregas Soler',
    nationality: 'Spain',
    position: 'Midfielder',
    age: 37,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c2', clubName: 'Arsenal', startYear: 2003, endYear: 2011 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2011, endYear: 2014 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2014, endYear: 2019 },
      { clubId: 'c17', clubName: 'Monaco', startYear: 2019, endYear: 2022 },
    ]
  },
  {
    id: 'p10',
    name: 'Ronaldinho',
    fullName: 'Ronaldo de Assis Moreira',
    nationality: 'Brazil',
    position: 'Forward',
    age: 44,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2001, endYear: 2003 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2003, endYear: 2008 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2008, endYear: 2011 },
    ]
  },
  {
    id: 'p11',
    name: 'David Luiz',
    fullName: 'David Luiz Moreira Marinho',
    nationality: 'Brazil',
    position: 'Defender',
    age: 37,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2011, endYear: 2014 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2014, endYear: 2016 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2016, endYear: 2019 },
      { clubId: 'c2', clubName: 'Arsenal', startYear: 2019, endYear: 2021 },
    ]
  },
  {
    id: 'p12',
    name: 'Gonzalo Higuaín',
    fullName: 'Gonzalo Gerardo Higuaín',
    nationality: 'Argentina',
    position: 'Forward',
    age: 36,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2007, endYear: 2013 },
      { clubId: 'c18', clubName: 'Napoli', startYear: 2013, endYear: 2016 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2016, endYear: 2020 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2018, endYear: 2019 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2019, endYear: 2019 },
      { clubId: 'c19', clubName: 'Inter Miami', startYear: 2020, endYear: 2022 },
    ]
  },
  {
    id: 'p13',
    name: 'Alvaro Morata',
    fullName: 'Álvaro Borja Morata Martín',
    nationality: 'Spain',
    position: 'Forward',
    age: 31,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2010, endYear: 2014 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2014, endYear: 2016 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2016, endYear: 2017 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2017, endYear: 2019 },
      { clubId: 'c15', clubName: 'Atlético Madrid', startYear: 2019, endYear: 2024 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2024, endYear: 2026 },
    ]
  },
  {
    id: 'p14',
    name: 'Thiago Silva',
    fullName: 'Thiago Emiliano da Silva',
    nationality: 'Brazil',
    position: 'Defender',
    age: 39,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2009, endYear: 2012 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2012, endYear: 2020 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2020, endYear: 2024 },
    ]
  },
  {
    id: 'p15',
    name: 'Pierre-Emerick Aubameyang',
    fullName: 'Pierre-Emerick Emiliano François Aubameyang',
    nationality: 'Gabon',
    position: 'Forward',
    age: 35,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2008, endYear: 2011 },
      { clubId: 'c10', clubName: 'Borussia Dortmund', startYear: 2013, endYear: 2018 },
      { clubId: 'c2', clubName: 'Arsenal', startYear: 2018, endYear: 2022 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2022, endYear: 2022 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2022, endYear: 2023 },
      { clubId: 'c21', clubName: 'Marseille', startYear: 2023, endYear: 2024 },
    ]
  },
  {
    id: 'p16',
    name: 'Christian Pulisic',
    fullName: 'Christian Mate Pulisic',
    nationality: 'USA',
    position: 'Forward',
    age: 25,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c10', clubName: 'Borussia Dortmund', startYear: 2016, endYear: 2019 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2019, endYear: 2023 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2023, endYear: 2026 },
    ]
  },
  {
    id: 'p17',
    name: 'Erling Haaland',
    fullName: 'Erling Braut Haaland',
    nationality: 'Norway',
    position: 'Forward',
    age: 24,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c10', clubName: 'Borussia Dortmund', startYear: 2020, endYear: 2022 },
      { clubId: 'c7', clubName: 'Manchester City', startYear: 2022, endYear: 2026 },
    ]
  },
  {
    id: 'p18',
    name: 'Kevin De Bruyne',
    fullName: 'Kevin De Bruyne',
    nationality: 'Belgium',
    position: 'Midfielder',
    age: 33,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2012, endYear: 2014 },
      { clubId: 'c7', clubName: 'Manchester City', startYear: 2015, endYear: 2026 },
    ]
  },
  {
    id: 'p19',
    name: 'Mohamed Salah',
    fullName: 'Mohamed Salah Hamed Mahrous Ghaly',
    nationality: 'Egypt',
    position: 'Forward',
    age: 32,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2014, endYear: 2016 },
      { clubId: 'c16', clubName: 'AS Roma', startYear: 2015, endYear: 2017 },
      { clubId: 'c13', clubName: 'Liverpool', startYear: 2017, endYear: 2026 },
    ]
  },
  {
    id: 'p20',
    name: 'Robert Lewandowski',
    fullName: 'Robert Lewandowski',
    nationality: 'Poland',
    position: 'Forward',
    age: 36,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c10', clubName: 'Borussia Dortmund', startYear: 2010, endYear: 2014 },
      { clubId: 'c11', clubName: 'Bayern Munich', startYear: 2014, endYear: 2022 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2022, endYear: 2026 },
    ]
  },
  {
    id: 'p21',
    name: 'Luka Modrić',
    fullName: 'Luka Modrić',
    nationality: 'Croatia',
    position: 'Midfielder',
    age: 38,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c14', clubName: 'Tottenham Hotspur', startYear: 2008, endYear: 2012 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2012, endYear: 2026 },
    ]
  },
  {
    id: 'p22',
    name: 'Gareth Bale',
    fullName: 'Gareth Frank Bale',
    nationality: 'Wales',
    position: 'Forward',
    age: 35,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c14', clubName: 'Tottenham Hotspur', startYear: 2007, endYear: 2013 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2013, endYear: 2022 },
      { clubId: 'c14', clubName: 'Tottenham Hotspur', startYear: 2020, endYear: 2021 },
    ]
  },
  {
    id: 'p23',
    name: 'Harry Kane',
    fullName: 'Harry Edward Kane',
    nationality: 'England',
    position: 'Forward',
    age: 31,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c14', clubName: 'Tottenham Hotspur', startYear: 2009, endYear: 2023 },
      { clubId: 'c11', clubName: 'Bayern Munich', startYear: 2023, endYear: 2026 },
    ]
  },
  {
    id: 'p24',
    name: 'Jude Bellingham',
    fullName: 'Jude Victor William Bellingham',
    nationality: 'England',
    position: 'Midfielder',
    age: 21,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c10', clubName: 'Borussia Dortmund', startYear: 2020, endYear: 2023 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2023, endYear: 2026 },
    ]
  },
  {
    id: 'p25',
    name: 'Joao Cancelo',
    fullName: 'João Pedro Cavaco Cancelo',
    nationality: 'Portugal',
    position: 'Defender',
    age: 30,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c22', clubName: 'Sevilla', startYear: 2014, endYear: 2018 },
      { clubId: 'c12', clubName: 'Inter Milan', startYear: 2017, endYear: 2018 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2018, endYear: 2019 },
      { clubId: 'c7', clubName: 'Manchester City', startYear: 2019, endYear: 2023 },
      { clubId: 'c11', clubName: 'Bayern Munich', startYear: 2023, endYear: 2023 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2023, endYear: 2024 },
    ]
  },
  {
    id: 'p26',
    name: 'Ronaldo Nazário',
    fullName: 'Ronaldo Luís Nazário de Lima',
    nationality: 'Brazil',
    position: 'Forward',
    age: 47,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c25', clubName: 'Ajax', startYear: 1994, endYear: 1996 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 1996, endYear: 1997 },
      { clubId: 'c12', clubName: 'Inter Milan', startYear: 1997, endYear: 2002 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2002, endYear: 2007 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2007, endYear: 2008 },
    ]
  },
  {
    id: 'p27',
    name: 'Achraf Hakimi',
    fullName: 'Achraf Hakimi Mouh',
    nationality: 'Morocco',
    position: 'Defender',
    age: 25,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2016, endYear: 2018 },
      { clubId: 'c10', clubName: 'Borussia Dortmund', startYear: 2018, endYear: 2020 },
      { clubId: 'c12', clubName: 'Inter Milan', startYear: 2020, endYear: 2021 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2021, endYear: 2026 },
    ]
  },
  {
    id: 'p28',
    name: 'Paul Pogba',
    fullName: 'Paul Labile Pogba',
    nationality: 'France',
    position: 'Midfielder',
    age: 31,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2011, endYear: 2012 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2012, endYear: 2016 },
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2016, endYear: 2022 },
      { clubId: 'c6', clubName: 'Juventus', startYear: 2022, endYear: 2024 },
    ]
  },
  {
    id: 'p29',
    name: 'Antoine Griezmann',
    fullName: 'Antoine Griezmann',
    nationality: 'France',
    position: 'Forward',
    age: 33,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c15', clubName: 'Atlético Madrid', startYear: 2014, endYear: 2019 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2019, endYear: 2021 },
      { clubId: 'c15', clubName: 'Atlético Madrid', startYear: 2021, endYear: 2026 },
    ]
  },
  {
    id: 'p30',
    name: 'Keylor Navas',
    fullName: 'Keilor Antonio Navas Gamboa',
    nationality: 'Costa Rica',
    position: 'Goalkeeper',
    age: 37,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2014, endYear: 2019 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2019, endYear: 2024 },
    ]
  },
  {
    id: 'p31',
    name: 'Zinedine Zidane',
    fullName: 'Zinedine Yazid Zidane',
    nationality: 'France',
    position: 'Midfielder',
    age: 51,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c6', clubName: 'Juventus', startYear: 1996, endYear: 2001 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2001, endYear: 2006 }
    ]
  },
  {
    id: 'p32',
    name: 'Wayne Rooney',
    fullName: 'Wayne Mark Rooney',
    nationality: 'England',
    position: 'Forward',
    age: 38,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'new1', clubName: 'Everton', startYear: 2002, endYear: 2004 },
      { clubId: 'c8', clubName: 'Manchester United', startYear: 2004, endYear: 2017 },
      { clubId: 'new1', clubName: 'Everton', startYear: 2017, endYear: 2018 }
    ]
  },
  {
    id: 'p33',
    name: 'Didier Drogba',
    fullName: 'Didier Yves Drogba Tébily',
    nationality: 'Ivory Coast',
    position: 'Forward',
    age: 46,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c21', clubName: 'Marseille', startYear: 2003, endYear: 2004 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2004, endYear: 2012 },
      { clubId: 'new2', clubName: 'Galatasaray', startYear: 2013, endYear: 2014 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2014, endYear: 2015 }
    ]
  },
  {
    id: 'p34',
    name: 'Kaká',
    fullName: 'Ricardo Izecson dos Santos Leite',
    nationality: 'Brazil',
    position: 'Midfielder',
    age: 42,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2003, endYear: 2009 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2009, endYear: 2013 },
      { clubId: 'c9', clubName: 'AC Milan', startYear: 2013, endYear: 2014 }
    ]
  },
  {
    id: 'p35',
    name: 'Frank Lampard',
    fullName: 'Frank James Lampard',
    nationality: 'England',
    position: 'Midfielder',
    age: 45,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'new3', clubName: 'West Ham United', startYear: 1995, endYear: 2001 },
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2001, endYear: 2014 },
      { clubId: 'c7', clubName: 'Manchester City', startYear: 2014, endYear: 2015 }
    ]
  },
  {
    id: 'p36',
    name: 'Steven Gerrard',
    fullName: 'Steven George Gerrard',
    nationality: 'England',
    position: 'Midfielder',
    age: 43,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c13', clubName: 'Liverpool', startYear: 1998, endYear: 2015 }
    ]
  },
  {
    id: 'p37',
    name: 'Iker Casillas',
    fullName: 'Iker Casillas Fernández',
    nationality: 'Spain',
    position: 'Goalkeeper',
    age: 42,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 1999, endYear: 2015 },
      { clubId: 'new4', clubName: 'FC Porto', startYear: 2015, endYear: 2020 }
    ]
  },
  {
    id: 'p38',
    name: 'Sergio Ramos',
    fullName: 'Sergio Ramos García',
    nationality: 'Spain',
    position: 'Defender',
    age: 38,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c22', clubName: 'Sevilla', startYear: 2004, endYear: 2005 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2005, endYear: 2021 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2021, endYear: 2023 },
      { clubId: 'c22', clubName: 'Sevilla', startYear: 2023, endYear: 2024 }
    ]
  },
  {
    id: 'p39',
    name: 'Sergio Agüero',
    fullName: 'Sergio Leonel Agüero del Castillo',
    nationality: 'Argentina',
    position: 'Forward',
    age: 35,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c15', clubName: 'Atlético Madrid', startYear: 2006, endYear: 2011 },
      { clubId: 'c7', clubName: 'Manchester City', startYear: 2011, endYear: 2021 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2021, endYear: 2021 }
    ]
  },
  {
    id: 'p40',
    name: 'Eden Hazard',
    fullName: 'Eden Michael Hazard',
    nationality: 'Belgium',
    position: 'Midfielder',
    age: 33,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c5', clubName: 'Chelsea', startYear: 2012, endYear: 2019 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2019, endYear: 2023 }
    ]
  },
  {
    id: 'p41',
    name: 'Luis Suárez',
    fullName: 'Luis Alberto Suárez Díaz',
    nationality: 'Uruguay',
    position: 'Forward',
    age: 37,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c25', clubName: 'Ajax', startYear: 2007, endYear: 2011 },
      { clubId: 'c13', clubName: 'Liverpool', startYear: 2011, endYear: 2014 },
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2014, endYear: 2020 },
      { clubId: 'c15', clubName: 'Atlético Madrid', startYear: 2020, endYear: 2022 },
      { clubId: 'c19', clubName: 'Inter Miami', startYear: 2024, endYear: 2026 }
    ]
  },
  {
    id: 'p42',
    name: 'Neymar',
    fullName: 'Neymar da Silva Santos Júnior',
    nationality: 'Brazil',
    position: 'Forward',
    age: 32,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c3', clubName: 'Barcelona', startYear: 2013, endYear: 2017 },
      { clubId: 'c1', clubName: 'Paris Saint-Germain', startYear: 2017, endYear: 2023 }
    ]
  },
  {
    id: 'p43',
    name: 'Karim Benzema',
    fullName: 'Karim Mostafa Benzema',
    nationality: 'France',
    position: 'Forward',
    age: 36,
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c23', clubName: 'Lyon', startYear: 2004, endYear: 2009 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2009, endYear: 2023 }
    ]
  },
  {
    id: 'p44',
    name: 'Toni Kroos',
    fullName: 'Toni Kroos',
    nationality: 'Germany',
    position: 'Midfielder',
    age: 34,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c11', clubName: 'Bayern Munich', startYear: 2007, endYear: 2014 },
      { clubId: 'c24', clubName: 'Bayer Leverkusen', startYear: 2009, endYear: 2010 },
      { clubId: 'c4', clubName: 'Real Madrid', startYear: 2014, endYear: 2024 }
    ]
  },
  {
    id: 'p45',
    name: 'Manuel Neuer',
    fullName: 'Manuel Peter Neuer',
    nationality: 'Germany',
    position: 'Goalkeeper',
    age: 38,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    clubs: [
      { clubId: 'c11', clubName: 'Bayern Munich', startYear: 2011, endYear: 2026 }
    ]
  }
];

export const INITIAL_GRID_CATEGORIES: GridCategory[] = [
  { id: 'cat-psg', name: 'PSG', type: 'CLUB', value: 'Paris Saint-Germain', logoUrl: getClubLogoUrl('Paris Saint-Germain') },
  { id: 'cat-arsenal', name: 'Arsenal', type: 'CLUB', value: 'Arsenal', logoUrl: getClubLogoUrl('Arsenal') },
  { id: 'cat-barcelona', name: 'Barcelona', type: 'CLUB', value: 'Barcelona', logoUrl: getClubLogoUrl('Barcelona') },
  { id: 'cat-realmadrid', name: 'Real Madrid', type: 'CLUB', value: 'Real Madrid', logoUrl: getClubLogoUrl('Real Madrid') },
  { id: 'cat-chelsea', name: 'Chelsea', type: 'CLUB', value: 'Chelsea', logoUrl: getClubLogoUrl('Chelsea') },
  { id: 'cat-juventus', name: 'Juventus', type: 'CLUB', value: 'Juventus', logoUrl: getClubLogoUrl('Juventus') },
  { id: 'cat-mancity', name: 'Man City', type: 'CLUB', value: 'Manchester City', logoUrl: getClubLogoUrl('Manchester City') },
  { id: 'cat-manutd', name: 'Man Utd', type: 'CLUB', value: 'Manchester United', logoUrl: getClubLogoUrl('Manchester United') },
  { id: 'cat-acmilan', name: 'AC Milan', type: 'CLUB', value: 'AC Milan', logoUrl: getClubLogoUrl('AC Milan') },
  { id: 'cat-dortmund', name: 'Dortmund', type: 'CLUB', value: 'Borussia Dortmund', logoUrl: getClubLogoUrl('Borussia Dortmund') },
  { id: 'cat-argentina', name: 'Argentina', type: 'NATIONALITY', value: 'Argentina', flag: '🇦🇷', flagUrl: getNationalityFlagUrl('Argentina') },
  { id: 'cat-brazil', name: 'Brazil', type: 'NATIONALITY', value: 'Brazil', flag: '🇧🇷', flagUrl: getNationalityFlagUrl('Brazil') },
  { id: 'cat-france', name: 'France', type: 'NATIONALITY', value: 'France', flag: '🇫🇷', flagUrl: getNationalityFlagUrl('France') },
  { id: 'cat-england', name: 'England', type: 'NATIONALITY', value: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', flagUrl: getNationalityFlagUrl('England') },
  { id: 'cat-spain', name: 'Spain', type: 'NATIONALITY', value: 'Spain', flag: '🇪🇸', flagUrl: getNationalityFlagUrl('Spain') },
  { id: 'cat-premierleague', name: 'Premier League', type: 'LEAGUE', value: 'Premier League', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg' },
  { id: 'cat-laliga', name: 'La Liga', type: 'LEAGUE', value: 'La Liga', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_EA_Sports_2023.svg' },
  { id: 'cat-seriea', name: 'Serie A', type: 'LEAGUE', value: 'Serie A', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2019.svg' },
];

export const INITIAL_CONNECTION_PUZZLES: ConnectionPuzzle[] = [
  {
    id: 'conn-1',
    title: 'Arsenal & PSG Connection',
    entity1: { id: 'c2', name: 'Arsenal', type: 'CLUB', value: 'Arsenal', logoUrl: getClubLogoUrl('Arsenal') },
    entity2: { id: 'c1', name: 'PSG', type: 'CLUB', value: 'Paris Saint-Germain', logoUrl: getClubLogoUrl('Paris Saint-Germain') },
    difficulty: 'Easy'
  },
  {
    id: 'conn-2',
    title: 'Chelsea & Juventus Connection',
    entity1: { id: 'c5', name: 'Chelsea', type: 'CLUB', value: 'Chelsea', logoUrl: getClubLogoUrl('Chelsea') },
    entity2: { id: 'c6', name: 'Juventus', type: 'CLUB', value: 'Juventus', logoUrl: getClubLogoUrl('Juventus') },
    difficulty: 'Medium'
  },
  {
    id: 'conn-3',
    title: 'AC Milan & Borussia Dortmund',
    entity1: { id: 'c9', name: 'AC Milan', type: 'CLUB', value: 'AC Milan', logoUrl: getClubLogoUrl('AC Milan') },
    entity2: { id: 'c10', name: 'Borussia Dortmund', type: 'CLUB', value: 'Borussia Dortmund', logoUrl: getClubLogoUrl('Borussia Dortmund') },
    difficulty: 'Hard'
  },
  {
    id: 'conn-4',
    title: 'Argentina & Barcelona Connection',
    entity1: { id: 'nat-arg', name: 'Argentina', type: 'NATIONALITY', value: 'Argentina', flag: '🇦🇷', flagUrl: getNationalityFlagUrl('Argentina') },
    entity2: { id: 'c3', name: 'Barcelona', type: 'CLUB', value: 'Barcelona', logoUrl: getClubLogoUrl('Barcelona') },
    difficulty: 'Easy'
  },
  {
    id: 'conn-5',
    title: 'Brazil & Premier League',
    entity1: { id: 'nat-br', name: 'Brazil', type: 'NATIONALITY', value: 'Brazil', flag: '🇧🇷', flagUrl: getNationalityFlagUrl('Brazil') },
    entity2: { id: 'leg-pl', name: 'Premier League', type: 'LEAGUE', value: 'Premier League', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg' },
    difficulty: 'Easy'
  }
];

export let isDatabaseLoaded = false;
export let isDatabaseLoading = false;

export async function loadExtendedDatabase() {
  if (isDatabaseLoaded || isDatabaseLoading) return;
  isDatabaseLoading = true;
  
  try {
    const response = await fetch('/data/fallback-db.json');
    if (!response.ok) {
      console.info('No extended fallback database found. Using default dataset.');
      isDatabaseLoaded = true;
      isDatabaseLoading = false;
      return;
    }
    
    const data = (await response.json()) as { players?: any[], clubs?: any[] };
    if (data && Array.isArray(data.players) && Array.isArray(data.clubs)) {
      // Replace the contents of the arrays safely
      INITIAL_CLUBS.length = 0;
      INITIAL_CLUBS.push(...data.clubs);
      
      INITIAL_PLAYERS.length = 0;
      INITIAL_PLAYERS.push(...data.players);
      
      console.log(`Loaded extended database with ${INITIAL_PLAYERS.length} players and ${INITIAL_CLUBS.length} clubs.`);
    }
  } catch (err) {
    console.error('Failed to load extended database:', err);
  } finally {
    isDatabaseLoaded = true;
    isDatabaseLoading = false;
  }
}

