import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn('cr-spinner', size !== 'md' && `cr-spinner--${size}`, className)}
      {...rest}
    />
  );
});

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, max = 100, indeterminate, className, ...rest },
  ref,
) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      className={cn('cr-progress', indeterminate && 'cr-progress--indeterminate', className)}
      {...rest}
    >
      <div className="cr-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  );
});
