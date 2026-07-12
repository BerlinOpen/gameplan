import { DateTime } from 'luxon';
import { Main } from './screens/Main/Main';
import { useState } from 'react';
import CountdownModal from './components/CountdownModal';

export const App = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div>
      <Main />
      {DateTime.now() < DateTime.fromISO('2026-07-16T23:59:59') && (
        <CountdownModal open={open} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};
