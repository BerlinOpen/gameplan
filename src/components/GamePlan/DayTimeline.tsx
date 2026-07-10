import type { Game } from '../../types/sheets';
import { TimeGroup } from './TimeGroup';
import { DateTime } from 'luxon';

type Props = {
  date: string;
  games: Game[];
};

export const DayTimeline = ({ date, games }: Props) => {
  const grouped = Object.groupBy(games, (game) =>
    DateTime.fromISO(game.dateTime).toFormat('HH:mm'),
  );

  return (
    <div>
      <h2 className="tracking-wider">
        <strong className="uppercase">{date}</strong>
        {date === 'Sunday' &&
          ` (Please mind final game plan is decided after Saturday's last game)`}
      </h2>

      {Object.entries(grouped).map(([time, games]) => (
        <TimeGroup key={time} time={time} games={games ?? []} />
      ))}
    </div>
  );
};
