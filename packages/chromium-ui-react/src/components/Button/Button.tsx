import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Button.css';

export type ButtonVariant = 'outlined' | 'action' | 'tonal' | 'destructive' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'outlined', size = 'md', fullWidth, startIcon, endIcon, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'cr-button',
        variant !== 'outlined' && `cr-button--${variant}`,
        size !== 'md' && `cr-button--${size}`,
        fullWidth && 'cr-button--full',
        className,
      )}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
});
