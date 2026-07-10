import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { glassy } from '../../utils/styling';

type TagProps = {
  children: ReactNode;
  onClose?: () => void;
};

export const Tag = ({ children, onClose }: TagProps) => {
  return (
    <span
      className={`inline-flex
        items-center
        gap-1.5
        rounded-full
        py-0.5
        px-2
        text-sm
        font-medium
        text-basic ${glassy}`}
    >
      {children}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="
            flex
            items-center
            justify-center
            rounded-full
            opacity-60
            transition-opacity
            hover:opacity-100
          "
          aria-label="Remove tag"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};
