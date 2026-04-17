import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Select.css';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, className, id, children, ...rest },
  ref,
) {
  const autoId = useId();
  const resolvedId = id ?? autoId;
  const content = options
    ? options.map((o) => (
        <option key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </option>
      ))
    : children;

  const selectEl = (
    <select ref={ref} id={resolvedId} className="cr-select" {...rest}>
      {content}
    </select>
  );

  if (!label) return <div className={cn('cr-select-wrap', className)}>{selectEl}</div>;

  return (
    <div className={cn('cr-select-wrap', className)}>
      <label htmlFor={resolvedId} className="cr-select-wrap__label">
        {label}
      </label>
      {selectEl}
    </div>
  );
});
