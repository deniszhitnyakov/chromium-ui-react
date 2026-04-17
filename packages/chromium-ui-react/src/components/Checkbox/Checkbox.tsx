import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate, disabled, className, id, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn('cr-checkbox', disabled && 'cr-checkbox--disabled', className)}>
      <input
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as { current: HTMLInputElement | null }).current = node;
        }}
        id={id}
        type="checkbox"
        className="cr-checkbox__input"
        disabled={disabled}
        {...rest}
      />
      <span className="cr-checkbox__box" aria-hidden="true" />
      {label != null && <span className="cr-checkbox__label">{label}</span>}
    </label>
  );
});
