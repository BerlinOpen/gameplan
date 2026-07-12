export type SheetRow = string[];

export type Field = 'field1' | 'field2';
export type Division = 'low contact' | 'high contact';

export type Game = {
  field: Field;
  dateTime: string;
  matchup: string[];
  results: number[];
  division: Division;
  finalHigh?: boolean;
  finalLow?: boolean;
};

export type GamesByStatus = {
  upcoming: Game[];
  live: Game[];
  ended: Game[];
};

export type EventStatus = 'upcoming' | 'live' | 'ended';

export type ActiveFilter =
  | {
      filter: 'division';
      value: Division;
    }
  | {
      filter: 'field';
      value: Field;
    }
  | {
      filter: 'name';
      value: string;
    }
  | {
      filter: 'search';
      value: string;
    }
  | {
      filter: 'day';
      value: string;
    }
  | {
      filter: 'status';
      value: EventStatus;
    };

export type Option = {
  value: string;
  label: string;
};

export type PlacementData = string[];

export type LeaderboardT = {
  lowPlacement: PlacementData;
  highPlacement: PlacementData;
};
