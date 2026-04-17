import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode;
  placement?: TooltipPlacement;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, placement = 'top', className, children, ...rest },
  ref,
) {
  const tooltipId = useId();
  return (
    <span
      ref={ref}
      className={cn('cr-tooltip', placement !== 'top' && `cr-tooltip--${placement}`, className)}
      {...rest}
    >
      <span aria-describedby={tooltipId}>{children}</span>
      <span role="tooltip" id={tooltipId} className="cr-tooltip__content">
        {content}
      </span>
    </span>
  );
});
