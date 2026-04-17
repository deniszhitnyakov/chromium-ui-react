import { forwardRef, type InputHTMLAttributes, type ReactNode, createContext, useContext, useId, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Radio.css';

interface RadioGroupContextValue {
  name: string;
  value?: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

export function RadioGroup({
  name,
  value,
  onChange,
  orientation = 'vertical',
  disabled,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const autoName = useId();
  return (
    <RadioGroupContext.Provider value={{ name: name ?? autoName, value, onChange, disabled }}>
      <div
        role="radiogroup"
        className={cn('cr-radio-group', orientation === 'horizontal' && 'cr-radio-group--horizontal', className)}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  value: string | number;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, value, name, checked, disabled, onChange, className, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const resolvedName = name ?? group?.name;
  const resolvedChecked = group ? group.value === value : checked;
  const resolvedDisabled = disabled ?? group?.disabled;

  return (
    <label className={cn('cr-radio', resolvedDisabled && 'cr-radio--disabled', className)}>
      <input
        ref={ref}
        type="radio"
        className="cr-radio__input"
        name={resolvedName}
        value={value}
        checked={resolvedChecked}
        disabled={resolvedDisabled}
        onChange={(e) => {
          group?.onChange?.(e.currentTarget.value);
          onChange?.(e);
        }}
        {...rest}
      />
      <span className="cr-radio__dot" aria-hidden="true" />
      {label != null && <span className="cr-radio__label">{label}</span>}
    </label>
  );
});
