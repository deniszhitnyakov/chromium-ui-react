import { useEffect, useRef, type HTMLAttributes, type ReactNode, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import './Dialog.css';

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  actions?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export function Dialog({
  open,
  onClose,
  title,
  actions,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  children,
  ...rest
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className="cr-dialog-backdrop" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'cr-dialog-title' : undefined}
        tabIndex={-1}
        className={cn('cr-dialog', className)}
        {...rest}
      >
        {title != null && (
          <h2 id="cr-dialog-title" className="cr-dialog__title">
            {title}
          </h2>
        )}
        <div className="cr-dialog__body">{children}</div>
        {actions && <div className="cr-dialog__actions">{actions}</div>}
      </div>
    </div>,
    document.body,
  );
}
