import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useFilters } from '../../context/FiltersContext';
import type { Division, EventStatus, Field, Option } from '../../types/sheets';
import { filterOptions } from '../../utils/options';
import { createPortal } from 'react-dom';

type DropdownFilterProps = {
  label: string;
  options: Option[];
  value?: string;
  setValue: (newValue: string) => void;
};

const DropdownFilter = ({
  label,
  options,
  value = '',
  setValue,
}: DropdownFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 180,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const hasSelection = Boolean(value);

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
    setValue(newValue);
    setIsOpen(false);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setValue('');
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
            className={`font-medium transition-colors ${
              hasSelection ? 'text-og-green' : 'text-basic'
            }`}
          >
            {label}
          </span>

          <ChevronDown
            size={16}
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
              const isSelected = option.value === value;

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
                      onClick={handleClear}
                      className="ml-2 rounded p-0.5 text-light"
                      aria-label="Clear selection"
                    >
                      <X size={14} />
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
  const { name, division, setName } = useFilters();

  return (
    <DropdownFilter
      label="Name"
      value={name}
      setValue={(newValue) => setName(newValue)}
      options={filterOptions.name(division)}
    />
  );
};

export const DayFilter = () => {
  const { day, setDay } = useFilters();

  return (
    <DropdownFilter
      label="Day"
      value={day}
      setValue={(newValue) => setDay(newValue)}
      options={filterOptions.day}
    />
  );
};

export const StatusFilter = () => {
  const { status, setStatus } = useFilters();

  return (
    <DropdownFilter
      label="Status"
      value={status}
      setValue={(newValue) => setStatus(newValue as EventStatus)}
      options={filterOptions.status}
    />
  );
};
