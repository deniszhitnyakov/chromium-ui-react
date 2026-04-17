import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Chip.css';

export type ChipVariant = 'default' | 'selected' | 'compact';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ChipVariant;
  selected?: boolean;
  startIcon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { variant = 'default', selected, startIcon, onRemove, children, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'cr-chip',
        (selected || variant === 'selected') && 'cr-chip--selected',
        variant === 'compact' && 'cr-chip--compact',
        className,
      )}
      aria-pressed={selected}
      {...rest}
    >
      {startIcon}
      {children}
      {onRemove && (
        <span
          className="cr-chip__remove"
          role="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(e as unknown as MouseEvent<HTMLButtonElement>);
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </button>
  );
});
