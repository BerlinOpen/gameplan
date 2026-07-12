import { Search, X } from 'lucide-react';
import { useFilters } from '../../context/FiltersContext';

export const SearchInput = () => {
  const { search, setSearch } = useFilters();

  const handleClear = () => {
    setSearch('');
  };

  return (
    <div className="relative md:w-64 w-full flex items-center">
      <Search size={16} className="absolute left-3 text-light" />

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search for a team..."
        className="
          h-7
          w-full
          rounded-full
          border
          border-light
          bg-transparent
          pl-10
          pr-10
          text-sm
          outline-none
          transition
          focus:border-og-green
          placeholder-light
          text-basic

          shadow-md
        "
      />

      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute
            right-3
            flex
            items-center
            justify-center
            rounded-full
            text-basic
            hover:text-og-green
            cursor-pointer
          "
          aria-label="Clear search"
        >
          <X size={16} className="text-light" />
        </button>
      )}
    </div>
  );
};
