import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Badge.css';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'cr-badge',
        variant !== 'neutral' && `cr-badge--${variant}`,
        className,
      )}
      {...rest}
    />
  );
});
