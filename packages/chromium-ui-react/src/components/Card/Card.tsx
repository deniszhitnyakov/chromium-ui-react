import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Card.css';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'flat';

export type CardElevation = 1 | 2;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Shadow weight when `variant='elevated'`. Default `2` (Chromium-faithful settings card). Use `1` on narrow surfaces (side panels) where elevation-2 reads too heavy. Ignored for non-elevated variants. */
  elevation?: CardElevation;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', elevation = 2, interactive, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'cr-card',
        variant !== 'elevated' && `cr-card--${variant}`,
        variant === 'elevated' && elevation !== 2 && `cr-card--elevation-${elevation}`,
        interactive && 'cr-card--interactive',
        className,
      )}
      {...rest}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('cr-card__header', className)} {...rest} />;
  },
);

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('cr-card__body', className)} {...rest} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('cr-card__footer', className)} {...rest} />;
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...rest }, ref) {
    return <h3 ref={ref} className={cn('cr-card__title', className)} {...rest} />;
  },
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return <p ref={ref} className={cn('cr-card__description', className)} {...rest} />;
  },
);
