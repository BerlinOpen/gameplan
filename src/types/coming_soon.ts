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