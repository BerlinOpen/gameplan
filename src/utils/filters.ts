import { DateTime } from 'luxon';
import type {
  ActiveFilter,
  Division,
  EventStatus,
  Field,
  Game,
} from '../types/sheets';

export const filterByDivision = (games: Game[], divisions: Division[]) =>
  games.filter((game) => divisions.includes(game.division));

export const filterByField = (games: Game[], fields: Field[]) =>
  games.filter((game) => fields.includes(game.field));

export const filterSearchByName = (games: Game[], names: string[]) =>
  games.filter((game) =>
    names.some((name) =>
      game.matchup.some((team) =>
        team.toLowerCase().includes(name.toLowerCase()),
      ),
    ),
  );

export const filterByDay = (games: Game[], days: string[]) =>
  games.filter((game) =>
    days.some((day) => {
      const dayDate = DateTime.fromISO(day);
      const eventDate = DateTime.fromISO(game.dateTime);

      return eventDate.hasSame(dayDate, 'day');
    }),
  );

export const getEventStatus = (game: Game): EventStatus => {
  const now = DateTime.now();

  const start = DateTime.fromISO(game.dateTime, {
    zone: 'Europe/Berlin',
  });

  const end = start.plus({ hours: 1 });

  if (now < start) {
    return 'upcoming';
  }

  if (now >= start && now <= end) {
    return 'live';
  }

  return 'ended';
};

export const filterByStatus = (games: Game[], statuses: EventStatus[]) =>
  games.filter((game) => statuses.includes(getEventStatus(game)));

export const filterData = (data: Game[], filters: ActiveFilter[]) => {
  const divisions = filters
    .filter((filter) => filter.filter === 'division')
    .map((filter) => filter.value as Division);

  const fields = filters
    .filter((filter) => filter.filter === 'field')
    .map((filter) => filter.value as Field);

  const names = filters
    .filter((filter) => filter.filter === 'name')
    .map((filter) => filter.value as string);

  const days = filters
    .filter((filter) => filter.filter === 'day')
    .map((filter) => filter.value as string);

  const statuses = filters
    .filter((filter) => filter.filter === 'status')
    .map((filter) => filter.value as EventStatus);

  const searches = filters
    .filter((filter) => filter.filter === 'search')
    .map((filter) => filter.value as string);

  let games = data;

  if (divisions.length) {
    games = filterByDivision(games, divisions);
  }

  if (fields.length) {
    games = filterByField(games, fields);
  }

  if (names.length) {
    games = filterSearchByName(games, names);
  }

  if (days.length) {
    games = filterByDay(games, days);
  }

  if (statuses.length) {
    games = filterByStatus(games, statuses);
  }

  if (searches.length) {
    games = filterSearchByName(games, searches);
  }

  return games;
};
