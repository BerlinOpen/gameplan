import { GamePlan } from './components/GamePlan';
import { useGoogleSheets } from '../../hooks/useGoogleSheets';
import { formatData } from '../../utils/formatData';
import { EmptyState } from '../Empty';
import { LoadingScreen } from '../Loading';
import React, { useState } from 'react';
import { LeaderBoard } from './components/LeaderBoard';

type Header = { value: 'gamePlan' | 'results'; label: string };

const headers: Header[] = [
  { value: 'gamePlan', label: 'game plan' },
  { value: 'results', label: 'current placements' },
];

export const Main = () => {
  const { data, error, isLoading } = useGoogleSheets();
  const [tabType, setTabType] = useState<'gamePlan' | 'results'>('gamePlan');

  if (isLoading) return <LoadingScreen />;

  const processedData = formatData(data);

  if (!processedData || error)
    return (
      <div className="h-screen">
        <div className="flex">
          <EmptyState />
        </div>
      </div>
    );

  const { games, leaderboard } = processedData;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="py-4 md:mx-8 mx-4 sticky top-0">
        <h2 className="flex items-center gap-2 uppercase tracking-wider cursor-pointer">
          {headers.map((header, index) => (
            <React.Fragment key={header.value}>
              {index > 0 && <span>|</span>}

              {header.value === tabType ? (
                <strong onClick={() => setTabType(header.value)}>
                  {header.label}
                </strong>
              ) : (
                <span
                  className="text-sm"
                  onClick={() => setTabType(header.value)}
                >
                  {header.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </h2>
      </header>
      <main className="flex-1">
        {tabType === 'gamePlan' && <GamePlan games={games} />}
        {tabType === 'results' && <LeaderBoard leaderboard={leaderboard} />}
      </main>
    </div>
  );
};
