import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Header.css';

export interface HeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  actions?: ReactNode;
  tall?: boolean;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(function Header(
  { title, actions, tall, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('cr-header', tall && 'cr-header--tall', className)} {...rest}>
      {title != null && <h1 className="cr-header__title">{title}</h1>}
      {children}
      {actions != null && <div className="cr-header__actions">{actions}</div>}
    </div>
  );
});
