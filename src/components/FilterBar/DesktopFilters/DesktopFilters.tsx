import {
  DayFilter,
  DivisionFilter,
  FieldFilter,
  NameFilter,
  StatusFilter,
} from './DropdownFilter';

export const DesktopFilters = () => {
  return (
    <div className="flex items-center gap-4">
      <DivisionFilter />
      <FieldFilter />
      <NameFilter />
      <DayFilter />
      <StatusFilter />
    </div>
  );
};
