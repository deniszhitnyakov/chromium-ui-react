import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './ToggleRow.css';

export interface ToggleRowProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Top (main) label. */
  primary?: ReactNode;
  /** Secondary/helper line below the primary label. */
  secondary?: ReactNode;
  /** Leading slot (small icon or avatar). */
  icon?: ReactNode;
  /** Class name for the outer row label. The native input's className is forwarded too. */
  rowClassName?: string;
}

export const ToggleRow = forwardRef<HTMLInputElement, ToggleRowProps>(function ToggleRow(
  { primary, secondary, icon, rowClassName, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cn('cr-toggle-row', disabled && 'cr-toggle-row--disabled', rowClassName)}>
      {icon != null && <span className="cr-toggle-row__icon">{icon}</span>}
      <span className="cr-toggle-row__text">
        {primary != null && <span className="cr-toggle-row__primary">{primary}</span>}
        {secondary != null && <span className="cr-toggle-row__secondary">{secondary}</span>}
      </span>
      <span className="cr-toggle-row__toggle">
        <span className="cr-toggle-row__track">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            className={cn('cr-toggle-row__input', className)}
            disabled={disabled}
            {...rest}
          />
          <span className="cr-toggle-row__bar" aria-hidden="true" />
          <span className="cr-toggle-row__knob" aria-hidden="true" />
        </span>
      </span>
    </label>
  );
});
