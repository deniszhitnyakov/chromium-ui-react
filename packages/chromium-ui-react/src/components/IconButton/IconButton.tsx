import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './IconButton.css';

export type IconButtonVariant = 'standard' | 'filled';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  'aria-label': string;
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'standard', size = 'md', icon, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'cr-icon-button',
        variant === 'filled' && 'cr-icon-button--filled',
        size !== 'md' && `cr-icon-button--${size}`,
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
});
