import type { Game } from '../../types/sheets';
import { organizeGamesByStatus } from '../../utils/formatData';
import { LiveGameCard } from './CarouselItem';

type Props = {
  games: Game[];
};

export const LiveGamesCarousel = ({ games }: Props) => {
  const liveGames = organizeGamesByStatus(games).live;

  if (!liveGames || liveGames.length === 0) return;

  return (
    <section className="space-y-8">
      <h2 className="font-bold uppercase tracking-wider md:ml-8 md:mt-8 ml-4">
        Currently playing
      </h2>

      <div
        className="
    flex
    gap-4
    overflow-x-auto
    scrollbar-hide
    md:px-8
    px-4
    snap-x
    snap-mandatory
  "
      >
        {liveGames.map((game) => (
          <LiveGameCard
            key={`${game.field}-${game.dateTime}-${game.matchup.join('-')}`}
            game={game}
          />
        ))}
      </div>
    </section>
  );
};
