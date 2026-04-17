import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Link.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  subtle?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { subtle, className, ...rest },
  ref,
) {
  return <a ref={ref} className={cn('cr-link', subtle && 'cr-link--subtle', className)} {...rest} />;
});
