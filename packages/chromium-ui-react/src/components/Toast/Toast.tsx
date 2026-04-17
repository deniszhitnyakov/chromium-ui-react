import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  action?: ReactNode;
  onActionClick?: () => void;
  actionLabel?: string;
  onClose?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = 'default', action, onActionClick, actionLabel, onClose, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cn('cr-toast', variant !== 'default' && `cr-toast--${variant}`, className)}
      {...rest}
    >
      <span>{children}</span>
      {action ? (
        action
      ) : actionLabel ? (
        <button type="button" className="cr-toast__action" onClick={onActionClick}>
          {actionLabel}
        </button>
      ) : null}
      {onClose && (
        <button type="button" className="cr-toast__close" aria-label="Close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
});
