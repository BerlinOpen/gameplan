import { GamePlan } from './components/GamePlan';
import { useGoogleSheets } from '../../hooks/useGoogleSheets';
import { formatData } from '../../utils/formatData';
import { EmptyState } from '../Empty';
import { LoadingScreen } from '../Loading';
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { LeaderBoard } from './components/LeaderBoard';

type Header = { value: 'gamePlan' | 'results'; label: string };

const headers: Header[] = [
  { value: 'gamePlan', label: 'game plan' },
  { value: 'results', label: 'current placements' },
];

export const Main = () => {
  const { data, error, isLoading } = useGoogleSheets();
  const [tabType, setTabType] = useState<'gamePlan' | 'results'>('gamePlan');
  const processedData = data ? formatData(data) : null;

  const scrollToCurrentHour = () => {
    const now = DateTime.now();
    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const dayName = dayNames[now.weekday - 1];
    const hour = String(now.hour).padStart(2, '0');
    const el = document.getElementById(`${dayName}-${hour}:00`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    const now = DateTime.now();
    scrollToCurrentHour();

    const next = now
      .plus({ hours: 1 })
      .set({ minute: 1, second: 0, millisecond: 0 });
    const msUntilNext = next.diff(now).toMillis();

    const timeout = setTimeout(() => {
      window.location.reload();
    }, msUntilNext);

    const interval = setInterval(() => {
      window.location.reload();
    }, 3600000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isLoading || !processedData) return;
    scrollToCurrentHour();
  }, [isLoading, processedData]);

  if (isLoading) return <LoadingScreen />;

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
