import type { Game } from '../../types/sheets';
import { GameCard } from './GameCard';

type Props = {
  time: string;
  games: Game[];
};

export const TimeGroup = ({ time, games }: Props) => {
  const isFinalHigh = games.some((game) => !!game.finalHigh);
  const isFinalLow = games.some((game) => !!game.finalLow);

  return (
    <div>
      {/* Time */}
      <h2 className="tracking-wider sticky top-12 md:top-6 z-20 bg-og-yellow w-fit rounded-md">
        <strong className="uppercase">{time}</strong>
        {isFinalHigh && ' (Final high contact)'}
        {isFinalLow && ' (Final low contact)'}
      </h2>

      {/* Games */}
      <div className="space-y-2 border-l border-light md:p-6 p-4 md:m-3.5 m-2.5 !pr-0 !mr-0">
        {games.map((game) => (
          <GameCard
            key={`${game.field}-${game.dateTime}-${game.matchup.join('-')}`}
            game={game}
          />
        ))}
      </div>
    </div>
  );
};
