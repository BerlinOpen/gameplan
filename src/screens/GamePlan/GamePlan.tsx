import { LiveGamesCarousel } from '../../components/Carousel/Carousel';
import { Timeline } from '../../components/GamePlan/Timeline';
import { FiltersProvider } from '../../context/FiltersContext';
import { useGoogleSheets } from '../../hooks/useGoogleSheets';
import { formatData } from '../../utils/formatData';
import { EmptyState } from '../Empty';
import { LoadingScreen } from '../Loading';

export const GamePlan = () => {
  const { data, error, isLoading } = useGoogleSheets();

  if (isLoading) return <LoadingScreen />;

  const games = formatData(data);

  if (!games || games.length === 0 || error)
    return (
      <div className="h-screen flex">
        <EmptyState />
      </div>
    );

  return (
    <FiltersProvider>
      {/* <LiveGamesCarousel games={games} /> */}
      <Timeline games={games} />
    </FiltersProvider>
  );
};
