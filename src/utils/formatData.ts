import type {
  Game,
  LeaderboardT,
  PlacementData,
  SheetRow,
} from '../types/sheets';

type FormattedData = {
  games: Game[];
  leaderboard: LeaderboardT;
};

const dayMap = {
  FRIDAY: '2026-07-17',
  SATURDAY: '2026-07-18',
  SUNDAY: '2026-07-19',
};

export const womenTeams = new Set<string>([]);
export const menTeams = new Set<string>([]);

export const formatData = (rows?: SheetRow[]): FormattedData | undefined => {
  if (!rows) return;

  let games: Game[] = [];
  const lowPlacement: PlacementData = [];
  const highPlacement: PlacementData = [];

  let readNext = false;
  let currentDate = '';

  for (const row of rows) {
    if (row.length === 0) {
      readNext = false;
      currentDate = '';
      continue;
    }

    if (row.length >= 1 && row[0] in dayMap) {
      currentDate = dayMap[row[0] as keyof typeof dayMap];
      continue;
    }

    if (row.includes('PLACEMENT LOW CONTACT')) {
      readNext = true;
      continue;
    }

    if (!readNext && !currentDate) continue;

    if (row.length === 11) {
      games = [...games, ...formatGames(row, currentDate)];
    }

    if (row.length === 8) {
      const { lowTeam, highTeam } = formatResult(row);

      if (!!lowTeam) lowPlacement.push(lowTeam);
      if (!!highTeam) highPlacement.push(highTeam);
    }
  }

  return { games: games, leaderboard: { lowPlacement, highPlacement } };
};

const formatResult = (row: SheetRow) => {
  const [, , , , lowTeam, , , highTeam] = row;

  return { lowTeam, highTeam };
};

const formatGames = (row: SheetRow, currentDate: string): Game[] => {
  const games: Game[] = [];

  const [
    startTime,
    ,
    field1Team1,
    field1Score1,
    field1Score2,
    field1Team2,
    ,
    field2Team1,
    field2Score1,
    field2Score2,
    field2Team2,
  ] = row;

  const dateTime = `${currentDate}T${startTime}`;
  const isFinalLow = row.includes('Final Low Contact');
  const isFinalHigh = row.includes('Final High Contact');

  if ((field1Team1 && field1Team2) || isFinalLow) {
    const matchup = isFinalLow
      ? [field2Team1, field2Team2]
      : [field1Team1, field1Team2];

    matchup.forEach((team) => womenTeams.add(team));

    games.push({
      field: isFinalLow ? 'field2' : 'field1',
      dateTime,
      matchup: matchup,
      results: isFinalLow
        ? [Number(field2Score1), Number(field2Score2)]
        : [Number(field1Score1), Number(field1Score2)],
      division: 'low contact',
      finalLow: isFinalLow,
    });
  }

  if (field2Team1 && field2Team2 && !isFinalLow) {
    menTeams.add(field2Team1);
    menTeams.add(field2Team2);

    games.push({
      field: 'field2',
      dateTime,
      matchup: [field2Team1, field2Team2],
      results: [Number(field2Score1), Number(field2Score2)],
      division: 'high contact',
      finalHigh: isFinalHigh,
    });
  }

  return games;
};

// export const formatData = (rows?: SheetRow[]): Game[] | undefined => {
//   if (!rows) return;

//   console.log(rows);

//   const games: Game[] = [];

//   let currentDate = '';

//   for (const row of rows) {
//     if (row.length === 0) {
//       currentDate = '';
//       continue;
//     }

//     if (row.length >= 1 && row[0] in dayMap) {
//       currentDate = dayMap[row[0] as keyof typeof dayMap];
//       continue;
//     }

//     if (row.length !== 11 || !currentDate) continue;

//     const [
//       startTime,
//       ,
//       field1Team1,
//       field1Score1,
//       field1Score2,
//       field1Team2,
//       ,
//       field2Team1,
//       field2Score1,
//       field2Score2,
//       field2Team2,
//     ] = row;

//     const dateTime = `${currentDate}T${startTime}`;
//     const isFinalLow = row.includes('Final Low Contact');
//     const isFinalHigh = row.includes('Final High Contact');

//     if ((field1Team1 && field1Team2) || isFinalLow) {
//       const matchup = isFinalLow
//         ? [field2Team1, field2Team2]
//         : [field1Team1, field1Team2];

//       matchup.forEach((team) => womenTeams.add(team));

//       games.push({
//         field: isFinalLow ? 'field2' : 'field1',
//         dateTime,
//         matchup: matchup,
//         results: isFinalLow
//           ? [Number(field2Score1), Number(field2Score2)]
//           : [Number(field1Score1), Number(field1Score2)],
//         division: 'low contact',
//         finalLow: isFinalLow,
//       });
//     }

//     if (field2Team1 && field2Team2 && !isFinalLow) {
//       menTeams.add(field2Team1);
//       menTeams.add(field2Team2);

//       games.push({
//         field: 'field2',
//         dateTime,
//         matchup: [field2Team1, field2Team2],
//         results: [Number(field2Score1), Number(field2Score2)],
//         division: 'high contact',
//         finalHigh: isFinalHigh,
//       });
//     }
//   }

//   return games;
// };
