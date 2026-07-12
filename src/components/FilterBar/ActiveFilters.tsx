import { useFilters } from '../../context/FiltersContext';
import { filterOptions } from '../../utils/options';
import { Tag } from '../Tag';

export const ActiveFilters = () => {
  const {
    filters,
    setDivision,
    setField,
    toggleName,
    toggleDay,
    toggleStatus,
    division,
    clearFilters,
  } = useFilters();

  const filterHandler = {
    division: setDivision,
    field: setField,
    name: toggleName,
    day: toggleDay,
    status: toggleStatus,
  };

  const formattedFilters = filters
    .map(({ filter, value }) => {
      if (filter === 'search') return undefined;

      const options =
        filter === 'name'
          ? filterOptions[filter](division)
          : filterOptions[filter];

      const formattedValue = options.find((opt) => opt.value === value);

      if (!formattedValue) return undefined;

      return {
        filter: filter
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (char) => char.toUpperCase()),
        label: formattedValue.label,
        value: formattedValue.value,
        handler: filterHandler[filter],
      };
    })
    .filter(
      (
        item,
      ): item is {
        filter: string;
        value: string;
        label: string;
        handler: (option?: string) => void;
      } => item !== undefined,
    );

  if (formattedFilters.length === 0) return;

  return (
    <div className="flex gap-3 items-center py-2 flex-wrap">
      <p>Filters:</p>
      {formattedFilters.map(({ filter, label, value, handler }) => {
        const isSingle = filter === 'Division' || filter === 'Field';
        return (
          <Tag
            key={`active - ${value}`}
            onClose={() => handler(isSingle ? undefined : value)}
          >
            <div className="flex gap-1">
              <p className="text-light">{filter}:</p>
              <p>{label}</p>
            </div>
          </Tag>
        );
      })}

      <Tag onClose={clearFilters}>Clear all</Tag>
    </div>
  );
};
