import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Badge.css';

export type BadgeVariant = 'default' | 'error' | 'success' | 'neutral' | 'warning';
export type BadgeAppearance = 'solid' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', appearance = 'solid', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'cr-badge',
        variant !== 'default' && `cr-badge--${variant}`,
        appearance !== 'solid' && `cr-badge--${appearance}`,
        className,
      )}
      {...rest}
    />
  );
});
