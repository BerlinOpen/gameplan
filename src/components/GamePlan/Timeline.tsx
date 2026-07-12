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
    <div className="flex h-[calc(100vh-60px)] flex-col overflow-hidden">
      <header className="shrink-0 md:mx-8 mx-4 mb-4">
        <FilterBar />
      </header>

      <div className="flex-1 overflow-y-auto md:px-8 px-4">
        <div className="min-h-full flex flex-col">
          {filteredGames.length === 0 && <EmptyState />}

          {Object.entries(grouped).map(([day, games]) => (
            <DayTimeline key={day} date={day} games={games ?? []} />
          ))}
        </div>
      </div>
      {/* </ImageContainer> */}
    </div>
  );
};
