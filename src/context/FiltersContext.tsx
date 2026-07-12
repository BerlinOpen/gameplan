import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  ActiveFilter,
  Division,
  EventStatus,
  Field,
} from '../types/sheets';

interface FiltersContextValue {
  division?: Division;
  setDivision: React.Dispatch<React.SetStateAction<Division | undefined>>;

  field?: Field;
  setField: React.Dispatch<React.SetStateAction<Field | undefined>>;

  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;

  names: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  toggleName: (name: string) => void;

  days: string[];
  setDays: React.Dispatch<React.SetStateAction<string[]>>;
  toggleDay: (name: string) => void;

  statuses: EventStatus[];
  setStatuses: React.Dispatch<React.SetStateAction<EventStatus[]>>;
  toggleStatus: (status: EventStatus) => void;

  filters: ActiveFilter[];
  clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextValue | undefined>(
  undefined,
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [division, setDivision] = useState<Division>();
  const [field, setField] = useState<Field>();
  const [search, setSearch] = useState<string>();

  const [names, setNames] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<EventStatus[]>([]);

  const filters = useMemo<ActiveFilter[]>(() => {
    const active: ActiveFilter[] = [];

    if (division) {
      active.push({
        filter: 'division',
        value: division,
      });
    }

    if (field) {
      active.push({
        filter: 'field',
        value: field,
      });
    }

    if (search) {
      active.push({
        filter: 'search',
        value: search,
      });
    }

    names.forEach((name) =>
      active.push({
        filter: 'name',
        value: name,
      }),
    );

    days.forEach((day) =>
      active.push({
        filter: 'day',
        value: day,
      }),
    );

    statuses.forEach((status) =>
      active.push({
        filter: 'status',
        value: status,
      }),
    );

    return active;
  }, [division, field, search, names, days, statuses]);

  const toggleName = (name: string) =>
    setNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  const toggleDay = (day: string) => {
    console.log(day);
    return setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const toggleStatus = (status: EventStatus) =>
    setStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );

  const clearFilters = () => {
    setDivision(undefined);
    setField(undefined);
    setNames([]);
    setDays([]);
    setStatuses([]);
  };

  return (
    <FiltersContext.Provider
      value={{
        division,
        setDivision,
        field,
        setField,
        search,
        setSearch,

        names,
        setNames,
        toggleName,

        days,
        setDays,
        toggleDay,

        statuses,
        setStatuses,
        toggleStatus,

        filters,
        clearFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  return context;
};
