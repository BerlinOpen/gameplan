import { DateTime } from 'luxon';
import type {
  ActiveFilter,
  Division,
  EventStatus,
  Field,
  Game,
} from '../types/sheets';

export const filterByDivision = (games: Game[], division: Division) =>
  games.filter((game) => game.division === division);
export const filterByField = (games: Game[], field: Field) =>
  games.filter((game) => game.field === field);
export const filterSearchByName = (games: Game[], name: string) =>
  games.filter(
    (game) => game.matchup[0].includes(name) || game.matchup[1].includes(name),
  );
export const filterByDay = (games: Game[], day: string) =>
  games.filter((game) => {
    const dayDate = DateTime.fromISO(day);
    const eventDate = DateTime.fromISO(game.dateTime);

    return eventDate.hasSame(dayDate, 'day');
  });

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

export const filterByStatus = (games: Game[], status: EventStatus) =>
  games.filter((game) => {
    const gameStatus = getEventStatus(game);

    return gameStatus === status;
  });

export const filterData = (data: Game[], filters: ActiveFilter[]) =>
  filters.reduce((games, activeFilter) => {
    switch (activeFilter.filter) {
      case 'division':
        return filterByDivision(games, activeFilter.value);

      case 'field':
        return filterByField(games, activeFilter.value);

      case 'name':
        return filterSearchByName(games, activeFilter.value);

      case 'day':
        return filterByDay(games, activeFilter.value);

      case 'status':
        return filterByStatus(games, activeFilter.value);

      case 'search':
        return filterSearchByName(games, activeFilter.value);
    }
  }, data);
