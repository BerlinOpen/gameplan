import { GamePlan } from './screens/GamePlan/GamePlan';
import ComingSoon from './screens/ComingSoon/ComingSoon';
import { DateTime } from 'luxon';

export const App = () => {
  return (
    <div>
      {DateTime.now() < DateTime.fromISO('2026-07-16T23:59:59') && (
        <ComingSoon />
      )}
      <GamePlan />
    </div>
  );
};
