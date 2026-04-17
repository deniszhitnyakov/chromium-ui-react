import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Badge.css';

export type BadgeVariant = 'default' | 'error' | 'success' | 'neutral' | 'warning';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('cr-badge', variant !== 'default' && `cr-badge--${variant}`, className)}
      {...rest}
    />
  );
});
