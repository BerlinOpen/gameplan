import type { Game } from '../../types/sheets';
import { Tag } from '../FilterBar/Tag';
import { filterOptions } from '../../utils/options';
import { getEventStatus } from '../../utils/filters';
import { glassy } from '../../utils/styling';

type Props = {
  game: Game;
};

export const GameCard = ({ game }: Props) => {
  const status = getEventStatus(game);

  const statusStyles = {
    upcoming: 'bg-white !border-white/60',
    live: '!bg-green-500/40 !border-green-500/60',
    ended: '!bg-gray-500/40 !border-gray-500/60',
  };

  const field = filterOptions.field.find(
    (opt) => opt.value === game.field,
  )?.label;

  const result =
    status === 'ended' ? `${game.results[0]} : ${game.results[1]}` : 'vs';

  return (
    <div
      className={`rounded-lg transition ${glassy} ${`${statusStyles[status]}`} flex flex-col gap-3 p-4`}
    >
      {/* Top row: field + arrow */}
      <div className="flex items-center gap-2">
        <Tag>
          <p>{field}</p>
        </Tag>
        <Tag>{game.division}</Tag>
      </div>

      {/* Matchup */}
      <div
        className="
              flex
              items-center
              justify-center
              gap-2
              text-center
              md:gap-3
            "
      >
        <span
          className="
                flex-1
                text-sm
                font-medium
                md:text-base
              "
        >
          {game.matchup[0]}
        </span>

        <span
          className="
            rounded-md
            bg-black/10
            px-2
            py-1
            text-sm
            font-bold
            whitespace-nowrap
            md:px-3
          "
        >
          {result}
        </span>

        <span
          className="
            flex-1
            text-sm
            font-medium
            md:text-base
          "
        >
          {game.matchup[1]}
        </span>
      </div>
    </div>
  );
};
