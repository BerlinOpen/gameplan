import type { Game } from '../../types/sheets';
import { GameCard } from './GameCard';

type Props = {
  time: string;
  games: Game[];
};

export const TimeGroup = ({ time, games }: Props) => {
  return (
    <div>
      {/* Time */}
      <h2 className="tracking-wider">
        <strong className="uppercase">{time}</strong>
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
