import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Toolbar.css';

export interface ToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  actions?: ReactNode;
  tall?: boolean;
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { title, actions, tall, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('cr-toolbar', tall && 'cr-toolbar--tall', className)} {...rest}>
      {title != null && <h1 className="cr-toolbar__title">{title}</h1>}
      {children}
      {actions != null && <div className="cr-toolbar__actions">{actions}</div>}
    </div>
  );
});
