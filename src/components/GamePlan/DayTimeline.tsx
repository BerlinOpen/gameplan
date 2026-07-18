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
      <h2 className="tracking-wider sticky top-0 z-21 bg-og-yellow w-fit rounded-md">
        <strong className="uppercase">{date}</strong>
        {date === 'Sunday' &&
          ` (Please mind final game plan is decided after Saturday's last game)`}
      </h2>

      {Object.entries(grouped).map(([time, games]) => (
        <TimeGroup key={time} date={date} time={time} games={games ?? []} />
      ))}
    </div>
  );
};
