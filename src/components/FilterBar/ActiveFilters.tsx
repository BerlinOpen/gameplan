import { useFilters } from '../../context/FiltersContext';
import { filterOptions } from '../../utils/options';
import { Tag } from './Tag';

export const ActiveFilters = () => {
  const {
    filters,
    setDivision,
    setField,
    setName,
    setDay,
    setStatus,
    division,
  } = useFilters();

  const filterHandler = {
    division: setDivision,
    field: setField,
    name: setName,
    day: setDay,
    status: setStatus,
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
        value: formattedValue.label,
        handler: () => filterHandler[filter](undefined),
      };
    })
    .filter(
      (
        item,
      ): item is {
        filter: string;
        value: string;
        handler: () => void;
      } => item !== undefined,
    );

  if (formattedFilters.length === 0) return;

  return (
    <div className="flex gap-3 items-center py-2">
      <p>Filters:</p>
      {formattedFilters.map(({ filter, value, handler }) => {
        return (
          <Tag onClose={handler}>
            <div className="flex gap-1">
              <p className="text-light">{filter}:</p>
              <p>{value}</p>
            </div>
          </Tag>
        );
      })}
    </div>
  );
};
