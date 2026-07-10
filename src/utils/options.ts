import type { ActiveFilter, Division, Option } from '../types/sheets';
import { menTeams, womenTeams } from './formatData';

const divisionOptions = [
  { value: 'low contact', label: 'Low contact' },
  { value: 'high contact', label: 'High contact' },
];

const fieldOptions = [
  { value: 'field1', label: 'Field 1' },
  { value: 'field2', label: 'Field 2' },
];

const nameOptions = (division?: Division) => {
  let names: string[] = [];

  if (division === 'low contact') names = [...names, ...womenTeams];
  if (division === 'high contact') names = [...names, ...menTeams];
  if (!division) names = [...womenTeams, ...menTeams];

  return names.map((team) => ({
    label: team,
    value: team,
  }));
};

const dayOptions = [
  { value: '2026-07-17', label: 'Friday' },
  { value: '2026-07-18', label: 'Saturday' },
  { value: '2026-07-19', label: 'Sunday' },
];

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'live', label: 'Live' },
  { value: 'ended', label: 'Ended' },
];

export type FilterOptions = Record<ActiveFilter['filter'], Option[]>;

export const filterOptions = {
  division: divisionOptions,
  name: nameOptions,
  field: fieldOptions,
  day: dayOptions,
  status: statusOptions,
};
