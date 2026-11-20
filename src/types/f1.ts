export type F1NavPage = 'latest' | 'video' | 'schedule' | 'results' | 'standings' | 'drivers' | 'teams' | 'timing';
export type F1Page = 'home' | 'timing' | 'laps' | 'standings' | 'schedule' | 'pitwall';

export interface F1Driver {
  pos: number;
  number: number;
  code: string;
  name: string;
  team: string;
  points: number;
  gap: string;
  interval: string;
  lastLap: string;
  s1: string;
  s2: string;
  s3: string;
  tyre: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTER';
  tyreAge: number;
  pits: number;
  speedTrap: number;
  color: string;
  country: string;
}

export interface F1Team {
  pos: number;
  name: string;
  points: number;
  color: string;
  drivers: string[];
}

export interface F1LapEvent {
  id: number;
  lap: number;
  leader: string;
  gapToSecond: string;
  eventTitle: string;
  description: string;
  tyreCompound: 'SOFT' | 'MEDIUM' | 'HARD';
  flag: 'GREEN' | 'YELLOW' | 'SAFETY_CAR' | 'RED';
}

export interface F1Race {
  round: number;
  country: string;
  gpName: string;
  circuit: string;
  date: string;
  laps: number;
  lengthKm: number;
  status: 'COMPLETED' | 'LIVE' | 'UPCOMING';
  winner?: string;
  turns: number;
  drsZones: number;
}

export interface F1DriverCard {
  id: string;
  number: number;
  code: string;
  firstName: string;
  lastName: string;
  team: string;
  teamColor: string;
  points: number;
  podiums: number;
  country: string;
  countryFlag: string;
  portraitUrl: string;
  helmetUrl?: string;
}

export interface F1TeamCard {
  id: string;
  name: string;
  fullName: string;
  pos: number;
  points: number;
  baseColor: string;
  chassis: string;
  powerUnit: string;
  teamPrincipal: string;
  drivers: string[];
}

export interface F1NewsItem {
  id: string;
  title: string;
  category: 'NEWS' | 'UNLOCKED' | 'FEATURE' | 'ANALYSIS' | 'REPORT' | 'TECH TALK';
  imageUrl: string;
  timeAgo: string;
  author?: string;
  summary?: string;
  tagColor?: string;
}

export interface F1VideoItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
}

export interface F1RaceCalendarItem {
  round: number;
  country: string;
  flag: string;
  gpName: string;
  circuit: string;
  dates: string;
  status: 'COMPLETED' | 'UPCOMING' | 'LIVE';
  winner?: string;
}
