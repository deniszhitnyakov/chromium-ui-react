import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './EmptyState.css';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, action, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('cr-empty-state', className)} {...rest}>
      {icon && <div className="cr-empty-state__icon">{icon}</div>}
      {title != null && <h3 className="cr-empty-state__title">{title}</h3>}
      {description != null && <p className="cr-empty-state__description">{description}</p>}
      {children}
      {action && <div className="cr-empty-state__action">{action}</div>}
    </div>
  );
});
