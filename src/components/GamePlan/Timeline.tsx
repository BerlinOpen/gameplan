import { useFilters } from '../../context/FiltersContext';
import { EmptyState } from '../../screens/Empty';
import type { Game } from '../../types/sheets';
import { filterData } from '../../utils/filters';
import { FilterBar } from '../FilterBar/FilterBar';
import { DayTimeline } from './DayTimeline';
import { DateTime } from 'luxon';

type Props = {
  games: Game[];
};

export const Timeline = ({ games }: Props) => {
  const { filters } = useFilters();

  const filteredGames = filterData(games, filters);

  const grouped = Object.groupBy(filteredGames, (game) =>
    DateTime.fromISO(game.dateTime).toFormat('cccc'),
  );

  return (
    <div className="md:mx-8 mx-4 flex flex-col h-screen">
      <div className="space-y-8 py-4">
        <h2 className="font-bold uppercase tracking-wider">Game plans</h2>

        <FilterBar />
      </div>

      {filteredGames.length === 0 && <EmptyState />}

      {Object.entries(grouped).map(([day, games]) => (
        <DayTimeline key={day} date={day} games={games ?? []} />
      ))}
    </div>
  );
};
