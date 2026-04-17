import {
  forwardRef,
  useContext,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { PanelStackContext } from './PanelStack';
import './PanelRow.css';

export interface PanelRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Top (main) label. */
  primary?: ReactNode;
  /** Secondary/helper line below the primary label. */
  secondary?: ReactNode;
  /** Leading slot (small icon or avatar). */
  icon?: ReactNode;
  /** Trailing slot (Badge, Toggle, Chevron, etc). */
  end?: ReactNode;
  /** If set, clicking the row calls `usePanelStack().push(navigateTo)`. */
  navigateTo?: string;
  /** Force row to be interactive (clickable, focusable) even without `navigateTo`/`onClick`. */
  interactive?: boolean;
  /** Force the trailing chevron. Defaults to true when `navigateTo` is set. */
  chevron?: boolean;
  /** Disable the interactive row. */
  disabled?: boolean;
}

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
  </svg>
);

export const PanelRow = forwardRef<HTMLDivElement, PanelRowProps>(function PanelRow(
  {
    primary,
    secondary,
    icon,
    end,
    navigateTo,
    interactive,
    chevron,
    disabled,
    className,
    children,
    onClick,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const ctx = useContext(PanelStackContext);
  const isInteractive = !disabled && (interactive ?? !!(navigateTo || onClick));
  const showChevron = chevron ?? !!navigateTo;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(event);
    if (!event.defaultPrevented && navigateTo && ctx) ctx.push(navigateTo);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (navigateTo && ctx) ctx.push(navigateTo);
      else (event.currentTarget as HTMLElement).click();
    }
  };

  return (
    <div
      ref={ref}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        'cr-panel-row',
        isInteractive && 'cr-panel-row--interactive',
        disabled && 'cr-panel-row--disabled',
        className,
      )}
      onClick={isInteractive ? handleClick : onClick}
      onKeyDown={isInteractive ? handleKeyDown : onKeyDown}
      {...rest}
    >
      {icon != null && <span className="cr-panel-row__icon">{icon}</span>}
      <span className="cr-panel-row__text">
        {primary != null && <div className="cr-panel-row__primary">{primary}</div>}
        {secondary != null && <div className="cr-panel-row__secondary">{secondary}</div>}
      </span>
      {(end != null || showChevron) && (
        <span className="cr-panel-row__end">
          {end}
          {showChevron && end == null && <ChevronIcon />}
        </span>
      )}
      {children}
    </div>
  );
});
