import { Timeline } from '../../../components/GamePlan/Timeline';
import { FiltersProvider } from '../../../context/FiltersContext';
import type { Game } from '../../../types/sheets';

export const GamePlan = ({ games }: { games: Game[] }) => {
  return (
    <FiltersProvider>
      <Timeline games={games} />
    </FiltersProvider>
  );
};
