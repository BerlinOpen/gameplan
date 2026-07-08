import React, { useEffect, useState } from 'react';
import logo from '../../assets/Logo.svg';
import { og_green, og_red, og_yellow } from '../../utils/colors';
import './ComingSoon.css';

interface CountdownTimerProps {
  targetDate: string; // Expected format: "YYYY-MM-DDTHH:mm:ss"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]); // Re-run if targetDate changes

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
      <TimeBlock value={format(timeLeft.days)} label="Days" />
      <TimeBlock value={format(timeLeft.hours)} label="Hours" />
      <TimeBlock value={format(timeLeft.minutes)} label="Minutes" />
      <TimeBlock value={format(timeLeft.seconds)} label="Seconds" />
    </div>
  );
};

const TimeBlock = ({ value, label }: { value: string; label: string; }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    padding: '15px 10px',
    borderRadius: '12px',
    textAlign: 'center',
    width: '80px',
    maxWidth: '12%',
    border: '1px solid #ddd'
  }}>
    <div style={{ fontSize: '2rem', fontWeight: 800, color: og_green }}>{value}</div>
    <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#555' }}>{label}</div>
  </div>
);

const ComingSoon: React.FC = () => {
  return (
    <div className="coming-soon" style={{ backgroundColor: og_yellow }}>

      {/* Logo */}
      <div className="logo-container">
        <img
          src={logo}
          alt="Berlin Open Logo"
        />
      </div>


      {/* Glass Panel */}
      <div className="glass-panel">
        <h2 style={{ color: og_red }}>
          GAME PLAN IS COMING SOON...
        </h2>

        <h3 style={{ color: og_red }}>
          Berlin Open in
        </h3>

        <CountdownTimer targetDate="2026-07-17T23:59:59" />
      </div>

    </div>
  );
};

export default ComingSoon;