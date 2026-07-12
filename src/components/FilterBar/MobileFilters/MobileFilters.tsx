import { X, FunnelPlus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import {
  DayAccordion,
  DivisionAccordion,
  FieldAccordion,
  NameAccordion,
  StatusAccordion,
} from './Accordion';

import { glassy } from '../../../utils/styling';

type FilterSheetProps = {
  open: boolean;
  onClose: () => void;
};

const accordionItems = [
  DivisionAccordion,
  FieldAccordion,
  NameAccordion,
  DayAccordion,
  StatusAccordion,
];

export const FilterSheet = ({ open, onClose }: FilterSheetProps) => {
  if (!open) return null;

  return createPortal(
    <div
      className={`
        fixed
        inset-0
        z-50
        flex
        flex-col
        ${glassy}
        !bg-white/10
      `}
    >
      <header
        className="
          flex
          h-16
          shrink-0
          items-center
          justify-between
          border-b
          border-light
          px-5
        "
      >
        <h2 className="text-xl font-semibold">Filters</h2>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 transition cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      <main
        className="
          flex-1
          overflow-y-auto
          px-5
          pb-24
        "
      >
        {accordionItems.map((Accordion) => (
          <Accordion key={Accordion.name} />
        ))}
      </main>

      <button
        type="button"
        onClick={onClose}
        className={`
          fixed
          bottom-5
          right-5
          rounded-full
          p-4
          font-medium
          text-white
          !bg-og-red/60
          ${glassy}
        `}
      >
        <ChevronRight />
      </button>
    </div>,
    document.body,
  );
};

export const MobileFilterButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          w-fit
          items-center
          rounded-md
          border-og-red
          bg-og-red
          p-2
          text-white
          shadow-2xl
        "
      >
        <FunnelPlus size={12} />
      </button>

      <FilterSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};
