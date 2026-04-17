import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Toggle.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, disabled, className, ...rest },
  ref,
) {
  return (
    <label className={cn('cr-toggle', disabled && 'cr-toggle--disabled', className)}>
      <span className="cr-toggle__track">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="cr-toggle__input"
          disabled={disabled}
          {...rest}
        />
        <span className="cr-toggle__bar" aria-hidden="true" />
        <span className="cr-toggle__knob" aria-hidden="true" />
      </span>
      {label != null && <span className="cr-toggle__label">{label}</span>}
    </label>
  );
});
