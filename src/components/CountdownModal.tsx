import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { glassy } from '../utils/styling';
import logo from '../assets/Logo.svg';

export interface CountdownTimerProps {
  targetDate: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeBlockProps {
  value: string;
  label: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ value, label }) => (
  <div
    className={`
      w-18 sm:w-20
      rounded-2xl
      px-3 py-4
      text-center
      ${glassy}`}
  >
    <p className="font-['Chewy'] text-3xl font-extrabold text-og-green">
      {value}
    </p>

    <p className="font-['Chewy'] mt-1 text-xs uppercase tracking-widest text-light">
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

type CountdownModalProps = {
  open: boolean;
  onClose: () => void;
};

export const CountdownModal = ({ open, onClose }: CountdownModalProps) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="
          absolute inset-0
          bg-og-yellow/20
          backdrop-blur-sm
          transition-opacity
        "
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex h-full items-center justify-center p-4">
        <section
          className={`
            relative
            w-full
            max-w-md
            rounded-3xl
            p-8
            shadow-2xl
            flex
            flex-col
            items-center
            ${glassy}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-opposite/20 cursor-pointer"
            aria-label="Close"
          >
            <X size={20} className="text-og-red" />
          </button>

          <img
            src={logo}
            alt="Berlin Open Logo"
            className="h-100 w-full object-contain"
          />

          <p className="mt-4 font-['Chewy'] text-2xl font-semibold text-og-red">
            in
          </p>

          <CountdownTimer targetDate="2026-07-16T23:59:59" />
        </section>
      </div>
    </div>,
    document.body,
  );
};

export default CountdownModal;
