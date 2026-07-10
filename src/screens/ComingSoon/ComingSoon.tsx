import React, { useEffect, useState } from 'react';
import logo from '../../assets/Logo.svg';
import type {
  CountdownTimerProps,
  TimeBlockProps,
  TimeLeft,
} from '../../types/coming_soon';
import { glassy } from '../../utils/styling';

const TimeBlock: React.FC<TimeBlockProps> = ({ value, label }) => (
  <div
    className="
      w-18 sm:w-20
      rounded-2xl
      border border-white/30
      bg-white/20
      backdrop-blur-xl
      shadow-lg
      px-3 py-4
      text-center
    "
  >
    <p className="font-['Chewy'] text-3xl font-extrabold text-og-green">
      {value}
    </p>

    <p className="font-['Chewy'] mt-1 text-xs uppercase tracking-widest text-gray-600">
      {label}
    </p>
  </div>
);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const format = (value: number) => value.toString().padStart(2, '0');

  const blocks = [
    {
      label: 'Days',
      value: format(timeLeft.days),
    },
    {
      label: 'Hours',
      value: format(timeLeft.hours),
    },
    {
      label: 'Minutes',
      value: format(timeLeft.minutes),
    },
    {
      label: 'Seconds',
      value: format(timeLeft.seconds),
    },
  ];

  return (
    <div className="mt-8 flex justify-center gap-3 sm:gap-5">
      {blocks.map((block) => (
        <TimeBlock key={block.label} label={block.label} value={block.value} />
      ))}
    </div>
  );
};

const ComingSoon: React.FC = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-og-yellow">
      {/* Background Logo */}
      <div className="absolute top-8 left-1/2 w-4/5 max-w-2xl -translate-x-1/2 md:top-auto md:w-auto">
        <img
          src={logo}
          alt="Berlin Open Logo"
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Glass Panel */}
      <section
        className={`relative
          z-10
          mt-auto
          w-full
          rounded-t-[3rem]
          p-8
          text-center
          md:mt-0
          md:max-w-md
          md:rounded-3xl ${glassy} !shadow-2xl`}
      >
        <h1 className="font-['Chewy'] text-4xl text-og-red">GAME PLAN ⬇️</h1>

        <p className="font-['Chewy'] mt-4 text-2xl font-semibold text-og-red">
          Berlin Open in
        </p>

        <CountdownTimer targetDate="2026-07-17T23:59:59" />
      </section>
    </main>
  );
};

export default ComingSoon;
