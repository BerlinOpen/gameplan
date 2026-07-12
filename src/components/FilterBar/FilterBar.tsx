import { glassy } from '../../utils/styling';
import { ActiveFilters } from './ActiveFilters';
import { DesktopFilters } from './DesktopFilters/DesktopFilters';
import { MobileFilterButton } from './MobileFilters/MobileFilters';
import { SearchInput } from './Search';

export const FilterBar = () => {
  return (
    <div className={`w-full rounded-lg px-4 ${glassy}`}>
      <div className="hidden md:flex items-center justify-between w-full py-2">
        <DesktopFilters />
        <SearchInput />
      </div>

      <div className="flex md:hidden flex justify-between py-4 gap-4">
        <SearchInput />
        <MobileFilterButton />
      </div>

      <ActiveFilters />
    </div>
  );
};
