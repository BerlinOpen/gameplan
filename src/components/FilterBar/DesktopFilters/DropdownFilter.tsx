import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useFilters } from '../../../context/FiltersContext';
import type {
  Division,
  EventStatus,
  Field,
  Option,
} from '../../../types/sheets';
import { filterOptions } from '../../../utils/options';
import { createPortal } from 'react-dom';

type DropdownFilterProps = {
  label: string;
  options: Option[];

  value?: string;
  setValue?: (newValue: string) => void;

  values?: string[];
  toggleValue?: (value: string) => void;
};

const DropdownFilter = ({
  label,
  options,
  value = '',
  setValue,
  values,
  toggleValue,
}: DropdownFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 180,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isMulti = values !== undefined;
  const hasSelection = isMulti ? values.length > 0 : Boolean(value);

  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      width: Math.max(rect.width, 180),
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScroll = () => {
      updatePosition();
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (newValue: string) => {
    if (isMulti) {
      toggleValue?.(newValue);
    } else {
      setValue?.(newValue);
      setIsOpen(false);
    }
  };

  const handleClear = (
    event: React.MouseEvent<HTMLButtonElement>,
    optionValue: string,
  ) => {
    event.stopPropagation();

    if (isMulti) {
      toggleValue?.(optionValue);
    } else {
      setValue?.('');
    }
  };

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <span
            className={`font-medium transition-colors ${hasSelection ? 'text-og-green' : 'text-basic'}`}
          >
            {label}
          </span>

          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              hasSelection ? 'text-og-green' : 'text-basic'
            } ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="
              z-[99999]
              max-h-64
              overflow-y-auto
              rounded-sm
              bg-white
              shadow-lg
              border
              border-transparent
            "
          >
            {options.map((option) => {
              const isSelected = isMulti
                ? values.includes(option.value)
                : option.value === value;

              return (
                <div
                  key={option.value}
                  className={`
                    flex
                    items-center
                    justify-between
                    px-4
                    py-2
                    hover:bg-hover
                    ${isSelected ? 'text-og-green' : ''}
                  `}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className="flex-1 text-left"
                  >
                    {option.label}
                  </button>

                  {isSelected && (
                    <button
                      type="button"
                      onClick={(e) => handleClear(e, option.value)}
                      className="ml-2 rounded p-0.5 text-light cursor-pointer"
                      aria-label="Clear selection"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
};

export default DropdownFilter;

export const DivisionFilter = () => {
  const { division, setDivision } = useFilters();

  return (
    <DropdownFilter
      label="Division"
      value={division}
      setValue={(newValue) => setDivision(newValue as Division)}
      options={filterOptions.division}
    />
  );
};

export const FieldFilter = () => {
  const { field, setField } = useFilters();

  return (
    <DropdownFilter
      label="Field"
      value={field}
      setValue={(newValue) => setField(newValue as Field)}
      options={filterOptions.field}
    />
  );
};

export const NameFilter = () => {
  const { names, division, toggleName } = useFilters();

  return (
    <DropdownFilter
      label="Name"
      values={names}
      toggleValue={toggleName}
      options={filterOptions.name(division)}
    />
  );
};

export const DayFilter = () => {
  const { days, toggleDay } = useFilters();

  return (
    <DropdownFilter
      label="Day"
      values={days}
      toggleValue={toggleDay}
      options={filterOptions.day}
    />
  );
};

export const StatusFilter = () => {
  const { statuses, toggleStatus } = useFilters();

  return (
    <DropdownFilter
      label="Status"
      values={statuses}
      toggleValue={(value) => toggleStatus(value as EventStatus)}
      options={filterOptions.status}
    />
  );
};
