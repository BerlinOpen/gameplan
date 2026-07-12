import { ChevronDown, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type {
  Division,
  EventStatus,
  Field,
  Option,
} from '../../../types/sheets';
import { useFilters } from '../../../context/FiltersContext';
import { filterOptions } from '../../../utils/options';

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-light">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-semibold text-basic">{title}</span>

        <ChevronDown
          className={`h-5 w-5 text-basic transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

type AccordionOptionsProps = {
  options: Option[];

  // single select
  value?: string;
  setValue?: (newValue: string) => void;

  // multi select
  values?: string[];
  toggleValue?: (value: string) => void;
};

const AccordionOptions = ({
  options,
  value,
  setValue,
  values,
  toggleValue,
}: AccordionOptionsProps) => {
  const isMulti = values !== undefined;

  return (
    <>
      {options.map((option) => {
        const isSelected = isMulti
          ? values.includes(option.value)
          : option.value === value;

        const handleClick = () => {
          if (isMulti) {
            toggleValue?.(option.value);
          } else {
            setValue?.(option.value);
          }
        };

        const handleClear = () => {
          if (isMulti) {
            toggleValue?.(option.value);
          } else {
            setValue?.('');
          }
        };

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
              onClick={handleClick}
              className="flex-1 text-left"
            >
              {option.label}
            </button>

            {isSelected && (
              <button
                type="button"
                onClick={handleClear}
                className="ml-2 rounded p-0.5 text-light cursor-pointer"
                aria-label="Clear selection"
              >
                <X size={18} />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export const DivisionAccordion = () => {
  const { division, setDivision } = useFilters();

  return (
    <Accordion title="Division" defaultOpen={!!division}>
      <AccordionOptions
        options={filterOptions.division}
        value={division}
        setValue={(value) => setDivision(value as Division)}
      />
    </Accordion>
  );
};

export const FieldAccordion = () => {
  const { field, setField } = useFilters();

  return (
    <Accordion title="Field" defaultOpen={!!field}>
      <AccordionOptions
        options={filterOptions.field}
        value={field}
        setValue={(value) => setField(value as Field)}
      />
    </Accordion>
  );
};

export const NameAccordion = () => {
  const { names, division, toggleName } = useFilters();

  return (
    <Accordion title="Name" defaultOpen={names.length > 0}>
      <AccordionOptions
        options={filterOptions.name(division)}
        values={names}
        toggleValue={toggleName}
      />
    </Accordion>
  );
};

export const DayAccordion = () => {
  const { days, toggleDay } = useFilters();

  return (
    <Accordion title="Day" defaultOpen={days.length > 0}>
      <AccordionOptions
        options={filterOptions.day}
        values={days}
        toggleValue={toggleDay}
      />
    </Accordion>
  );
};

export const StatusAccordion = () => {
  const { statuses, toggleStatus } = useFilters();

  return (
    <Accordion title="Status" defaultOpen={statuses.length > 0}>
      <AccordionOptions
        options={filterOptions.status}
        values={statuses}
        toggleValue={(value) => toggleStatus(value as EventStatus)}
      />
    </Accordion>
  );
};
