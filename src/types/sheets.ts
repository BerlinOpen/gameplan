export type SheetTitle = { properties: { title: string } };

export type SheetRow = string[];

export type SheetObject= { name: string, rows: SheetRow[] };

export interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface CountdownTimerProps {
  targetDate: string;
}