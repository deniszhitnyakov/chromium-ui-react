import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Divider.css';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  subtle?: boolean;
  inset?: boolean;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = 'horizontal', subtle, inset, className, ...rest },
  ref,
) {
  return (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'cr-divider',
        orientation === 'vertical' && 'cr-divider--vertical',
        subtle && 'cr-divider--subtle',
        inset && 'cr-divider--inset',
        className,
      )}
      {...rest}
    />
  );
});
