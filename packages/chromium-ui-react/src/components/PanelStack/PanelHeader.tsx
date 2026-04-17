import { forwardRef, useContext, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';
import { PanelStackContext } from './PanelStack';
import './PanelHeader.css';

export interface PanelHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title rendered in the header. */
  title?: ReactNode;
  /** Show a back arrow. By default it calls `usePanelStack().pop()`. */
  back?: boolean;
  /** Override the default back behavior. */
  onBack?: () => void;
  /** Content rendered before the title (leading slot). Overrides the back button. */
  leading?: ReactNode;
  /** Content rendered after the title, aligned to the right. */
  actions?: ReactNode;
}

const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </svg>
);

export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(function PanelHeader(
  { title, back, onBack, leading, actions, className, children, ...rest },
  ref,
) {
  const ctx = useContext(PanelStackContext);

  const handleBack = () => {
    if (onBack) onBack();
    else if (ctx) ctx.pop();
  };

  return (
    <div ref={ref} className={cn('cr-panel-header', className)} {...rest}>
      {leading}
      {back && !leading && (
        <IconButton
          aria-label="Back"
          onClick={handleBack}
          icon={<BackIcon />}
          size="sm"
          className="cr-panel-header__back"
        />
      )}
      {title != null && <div className="cr-panel-header__title">{title}</div>}
      {children}
      {actions != null && <div className="cr-panel-header__actions">{actions}</div>}
    </div>
  );
});
