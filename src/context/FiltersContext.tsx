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

  name?: string;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;

  day?: string;
  setDay: React.Dispatch<React.SetStateAction<string | undefined>>;

  status?: EventStatus;
  setStatus: React.Dispatch<React.SetStateAction<EventStatus | undefined>>;

  filters: ActiveFilter[];
}

const FiltersContext = createContext<FiltersContextValue | undefined>(
  undefined,
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [division, setDivision] = useState<Division>();
  const [field, setField] = useState<Field>();
  const [name, setName] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [day, setDay] = useState<string>();
  const [status, setStatus] = useState<EventStatus>();

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

    if (name) {
      active.push({
        filter: 'name',
        value: name,
      });
    }

    if (search) {
      active.push({
        filter: 'search',
        value: search,
      });
    }

    if (day) {
      active.push({
        filter: 'day',
        value: day,
      });
    }

    if (status) {
      active.push({
        filter: 'status',
        value: status,
      });
    }

    return active;
  }, [division, field, name, day, status, search]);

  return (
    <FiltersContext.Provider
      value={{
        division,
        setDivision,
        field,
        setField,
        name,
        setName,
        day,
        setDay,
        status,
        setStatus,
        search,
        setSearch,
        filters,
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
