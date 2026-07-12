import { ImageContainer } from '../../../components/ImageContainer';
import type { LeaderboardT, PlacementData } from '../../../types/sheets';
import { glassy } from '../../../utils/styling';

export const LeaderBoard = ({ leaderboard }: { leaderboard: LeaderboardT }) => {
  const { lowPlacement, highPlacement } = leaderboard;

  return (
    <ImageContainer
      imageContainerClasses="h-[calc(100vh-56px)]"
      imageShadowClasses="
        flex
        flex-wrap
        justify-center
        gap-12
        w-full
        h-full
        overflow-y-auto
        px-4
        md:px-8
        py-8
      "
    >
      <Table placements={lowPlacement} title="placement low contact" />
      <Table placements={highPlacement} title="placement high contact" />
    </ImageContainer>
  );
};

const Table = ({
  placements,
  title,
}: {
  placements: PlacementData;
  title: string;
}) => {
  const colors: Record<number, string> = {
    0: 'bg-amber-400/40',
    1: 'bg-slate-400/40',
    2: 'bg-orange-700/40',
  };

  return (
    <div className="space-y-4 flex flex-col items-center">
      <h2 className={`uppercase tracking-wider ${glassy} rounded-md px-4 py-2`}>
        {title}
      </h2>

      <div className="flex flex-col w-full gap-2 items-center">
        {placements.map((team, index) => (
          <div
            key={team}
            className={`${glassy} flex w-full rounded-md overflow-hidden justify-center items-center`}
          >
            <span
              className={`px-4 h-full flex items-center mr-2 ${colors[index]}`}
            >
              {index + 1}.
            </span>
            <span className="flex-1 font-bold py-2">{team}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
