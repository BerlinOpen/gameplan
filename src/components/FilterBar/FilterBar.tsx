import { glassy } from '../../utils/styling';
import { ActiveFilters } from './ActiveFilters';
import {
  DayFilter,
  DivisionFilter,
  FieldFilter,
  NameFilter,
  StatusFilter,
} from './DropdownFilter';
import { SearchInput } from './Search';

export const FilterBar = () => {
  return (
    <div className={`w-full rounded-lg transition px-4 ${glassy}`}>
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex items-center gap-3">
          <DivisionFilter />
          <FieldFilter />
          <NameFilter />
          <DayFilter />
          <StatusFilter />
        </div>

        <SearchInput />
      </div>

      <ActiveFilters />
    </div>
  );
};
