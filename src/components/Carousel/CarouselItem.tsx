import type { Game } from '../../types/sheets';
import { DateTime } from 'luxon';
import { filterOptions } from '../../utils/options';
import { Tag } from '../FilterBar/Tag';
import { glassy } from '../../utils/styling';

type Props = {
  game: Game;
};

export const LiveGameCard = ({ game }: Props) => {
  const field = filterOptions.field.find(
    (option) => option.value === game.field,
  )?.label;

  const startedAt = DateTime.fromISO(game.dateTime).toFormat('HH:mm');

  return (
    <div
      className={`group
        min-w-[260px]
        rounded-lg
        transition
        p-4
        ${glassy}`}
    >
      {/* LIVE */}
      <div className="mb-3">
        <span
          className="
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-green-500/20
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            text-green-600
          "
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Currently playing
        </span>
      </div>

      {/* Teams */}
      <div className="space-y-1 text-center">
        <p className="font-semibold">{game.matchup[0]}</p>

        <p className="text-sm text-gray-500">vs</p>

        <p className="font-semibold">{game.matchup[1]}</p>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 flex flex-col justify-center items-center">
        <div className="flex gap-2">
          <span>Started at:</span>

          <span className="font-medium text-gray-900">{startedAt}</span>
        </div>
        <div>
          <Tag>{field}</Tag>
        </div>
      </div>
    </div>
  );
};
