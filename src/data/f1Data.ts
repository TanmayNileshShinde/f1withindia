import { F1Driver, F1Team, F1LapEvent, F1Race } from '../types/f1';

export const INITIAL_DRIVERS: F1Driver[] = [
  { pos: 1, number: 1, code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', points: 393, gap: 'LEADER', interval: '-', lastLap: '1:14.281', s1: '18.4', s2: '32.1', s3: '23.7', tyre: 'HARD', tyreAge: 18, pits: 1, speedTrap: 341.2, color: '#3671c6', country: 'NED' },
  { pos: 2, number: 4, code: 'NOR', name: 'Lando Norris', team: 'McLaren', points: 331, gap: '+1.428', interval: '+1.428', lastLap: '1:14.054', s1: '18.3', s2: '32.0', s3: '23.7', tyre: 'MEDIUM', tyreAge: 12, pits: 1, speedTrap: 339.8, color: '#ff8000', country: 'GBR' },
  { pos: 3, number: 16, code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', points: 307, gap: '+4.195', interval: '+2.767', lastLap: '1:14.412', s1: '18.5', s2: '32.2', s3: '23.7', tyre: 'HARD', tyreAge: 20, pits: 1, speedTrap: 340.5, color: '#e8002d', country: 'MON' },
  { pos: 4, number: 81, code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', points: 262, gap: '+7.810', interval: '+3.615', lastLap: '1:14.330', s1: '18.4', s2: '32.1', s3: '23.8', tyre: 'MEDIUM', tyreAge: 12, pits: 1, speedTrap: 338.9, color: '#ff8000', country: 'AUS' },
  { pos: 5, number: 55, code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', points: 244, gap: '+12.450', interval: '+4.640', lastLap: '1:14.602', s1: '18.6', s2: '32.3', s3: '23.7', tyre: 'HARD', tyreAge: 22, pits: 1, speedTrap: 339.1, color: '#e8002d', country: 'ESP' },
  { pos: 6, number: 63, code: 'RUS', name: 'George Russell', team: 'Mercedes-AMG', points: 192, gap: '+16.290', interval: '+3.840', lastLap: '1:14.890', s1: '18.6', s2: '32.4', s3: '23.8', tyre: 'HARD', tyreAge: 19, pits: 1, speedTrap: 337.4, color: '#27f4d2', country: 'GBR' },
  { pos: 7, number: 44, code: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes-AMG', points: 190, gap: '+18.105', interval: '+1.815', lastLap: '1:14.512', s1: '18.5', s2: '32.2', s3: '23.8', tyre: 'MEDIUM', tyreAge: 14, pits: 1, speedTrap: 338.2, color: '#27f4d2', country: 'GBR' },
  { pos: 8, number: 11, code: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing', points: 151, gap: '+24.620', interval: '+6.515', lastLap: '1:15.110', s1: '18.7', s2: '32.5', s3: '23.9', tyre: 'HARD', tyreAge: 21, pits: 1, speedTrap: 336.7, color: '#3671c6', country: 'MEX' },
  { pos: 9, number: 14, code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin', points: 62, gap: '+34.800', interval: '+10.180', lastLap: '1:15.420', s1: '18.8', s2: '32.6', s3: '24.0', tyre: 'HARD', tyreAge: 25, pits: 1, speedTrap: 335.8, color: '#229971', country: 'ESP' },
  { pos: 10, number: 10, code: 'GAS', name: 'Pierre Gasly', team: 'Alpine', points: 26, gap: '+42.110', interval: '+7.310', lastLap: '1:15.890', s1: '18.9', s2: '32.8', s3: '24.1', tyre: 'MEDIUM', tyreAge: 15, pits: 1, speedTrap: 334.2, color: '#ff87bc', country: 'FRA' },
];

export const F1_TEAMS: F1Team[] = [
  { pos: 1, name: 'McLaren Formula 1 Team', points: 593, color: '#ff8000', drivers: ['Lando Norris', 'Oscar Piastri'] },
  { pos: 2, name: 'Scuderia Ferrari HP', points: 551, color: '#e8002d', drivers: ['Charles Leclerc', 'Carlos Sainz'] },
  { pos: 3, name: 'Oracle Red Bull Racing', points: 544, color: '#3671c6', drivers: ['Max Verstappen', 'Sergio Perez'] },
  { pos: 4, name: 'Mercedes-AMG PETRONAS F1 Team', points: 382, color: '#27f4d2', drivers: ['George Russell', 'Lewis Hamilton'] },
  { pos: 5, name: 'Aston Martin Aramco F1 Team', points: 86, color: '#229971', drivers: ['Fernando Alonso', 'Lance Stroll'] },
  { pos: 6, name: 'BWT Alpine F1 Team', points: 49, color: '#ff87bc', drivers: ['Pierre Gasly', 'Esteban Ocon'] },
];

export const F1_LAP_EVENTS: F1LapEvent[] = [
  { id: 1, lap: 1, leader: 'VER', gapToSecond: '+0.812', eventTitle: 'Lights Out & Race Start', description: 'Verstappen defends into Sainte-Dévote. Norris holds P2 on soft tyres.', tyreCompound: 'SOFT', flag: 'GREEN' },
  { id: 2, lap: 12, leader: 'VER', gapToSecond: '+1.840', eventTitle: 'DRS Zone Activated', description: 'DRS enabled along the main straight. Leclerc begins closing in on Norris.', tyreCompound: 'SOFT', flag: 'GREEN' },
  { id: 3, lap: 18, leader: 'VER', gapToSecond: '+2.100', eventTitle: 'Red Bull Undercut Window', description: 'Pit wall radio: "Box this lap for Hard tyre compound". 2.3s pit stop.', tyreCompound: 'HARD', flag: 'GREEN' },
  { id: 4, lap: 28, leader: 'NOR', gapToSecond: '+3.450', eventTitle: 'Norris Assumes Lead', description: 'Norris leads race during pit stop cycles. Fastest Sector 2 clocked at 32.0s.', tyreCompound: 'MEDIUM', flag: 'GREEN' },
  { id: 5, lap: 34, leader: 'NOR', gapToSecond: '+0.410', eventTitle: 'Safety Car Deployed 🚨', description: 'Debris in Swimming Pool chicane after Turn 14 contact. Safety Car bunched the pack.', tyreCompound: 'HARD', flag: 'SAFETY_CAR' },
  { id: 6, lap: 42, leader: 'VER', gapToSecond: '+1.120', eventTitle: 'Safety Car In - Racing Resumes', description: 'Verstappen re-takes P1 on restart into Mirabeau Haute. Green flags waving.', tyreCompound: 'HARD', flag: 'GREEN' },
  { id: 7, lap: 58, leader: 'VER', gapToSecond: '+1.428', eventTitle: 'Chequered Flag / Race Finish 🏁', description: 'Verstappen takes victory by 1.4s over Norris and Leclerc. Full 25 points secured.', tyreCompound: 'HARD', flag: 'GREEN' },
];

export const F1_CALENDAR: F1Race[] = [
  { round: 1, country: 'Bahrain', gpName: 'Gulf Air Bahrain Grand Prix', circuit: 'Bahrain International Circuit', date: '29 FEB - 02 MAR', laps: 57, lengthKm: 5.412, status: 'COMPLETED', winner: 'Max Verstappen', turns: 15, drsZones: 3 },
  { round: 2, country: 'Saudi Arabia', gpName: 'STC Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', date: '07 - 09 MAR', laps: 50, lengthKm: 6.174, status: 'COMPLETED', winner: 'Max Verstappen', turns: 27, drsZones: 3 },
  { round: 3, country: 'Australia', gpName: 'Rolex Australian Grand Prix', circuit: 'Albert Park Circuit', date: '22 - 24 MAR', laps: 58, lengthKm: 5.278, status: 'COMPLETED', winner: 'Carlos Sainz', turns: 14, drsZones: 4 },
  { round: 4, country: 'Japan', gpName: 'MSC Cruises Japanese Grand Prix', circuit: 'Suzuka International Circuit', date: '05 - 07 APR', laps: 53, lengthKm: 5.807, status: 'COMPLETED', winner: 'Max Verstappen', turns: 18, drsZones: 2 },
  { round: 5, country: 'Monaco', gpName: 'Grand Prix de Monaco', circuit: 'Circuit de Monaco', date: '24 - 26 MAY', laps: 78, lengthKm: 3.337, status: 'LIVE', turns: 19, drsZones: 1 },
  { round: 6, country: 'Great Britain', gpName: 'Qatar Airways British Grand Prix', circuit: 'Silverstone Circuit', date: '05 - 07 JUL', laps: 52, lengthKm: 5.891, status: 'UPCOMING', turns: 18, drsZones: 2 },
  { round: 7, country: 'Belgium', gpName: 'Rolex Belgian Grand Prix', circuit: 'Circuit de Spa-Francorchamps', date: '26 - 28 JUL', laps: 44, lengthKm: 7.004, status: 'UPCOMING', turns: 19, drsZones: 2 },
  { round: 8, country: 'Italy', gpName: 'Pirelli Gran Premio d\'Italia', circuit: 'Autodromo Nazionale Monza', date: '30 AUG - 01 SEP', laps: 53, lengthKm: 5.793, status: 'UPCOMING', turns: 11, drsZones: 2 },
];
