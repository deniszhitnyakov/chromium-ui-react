import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';
import './Table.css';

export type TableDensity = 'dense' | 'regular';

export interface TableProps extends Omit<TableHTMLAttributes<HTMLTableElement>, 'border'> {
  /** Row density. `'dense'` is the default — tight padding and 12px text for narrow surfaces. */
  density?: TableDensity;
  /** Pin `<thead>` to the top while the body scrolls. Requires the consumer to bound the height. */
  stickyHeader?: boolean;
  /** Class applied to the outer scroll wrapper. */
  wrapperClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { density = 'dense', stickyHeader, className, wrapperClassName, children, ...rest },
  ref,
) {
  return (
    <div className={cn('cr-table-scroll', wrapperClassName)}>
      <table
        ref={ref}
        className={cn(
          'cr-table',
          density === 'regular' && 'cr-table--regular',
          stickyHeader && 'cr-table--sticky',
          className,
        )}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
});

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHead({ className, ...rest }, ref) {
    return <thead ref={ref} className={cn('cr-table__head', className)} {...rest} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...rest }, ref) {
    return <tbody ref={ref} className={cn('cr-table__body', className)} {...rest} />;
  },
);

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Make the row clickable + focusable. Mirrors `ListItem interactive` / `PanelRow interactive`. */
  interactive?: boolean;
  /** Highlight the row as the current selection. */
  selected?: boolean;
  /** Disable the interactive row. */
  disabled?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { interactive, selected, disabled, className, onClick, onKeyDown, ...rest },
  ref,
) {
  const isInteractive = !disabled && (interactive ?? !!onClick);

  const handleClick = (event: MouseEvent<HTMLTableRowElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (disabled) return;
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      (event.currentTarget as HTMLElement).click();
    }
  };

  return (
    <tr
      ref={ref}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-selected={selected || undefined}
      className={cn(
        'cr-table__row',
        isInteractive && 'cr-table__row--interactive',
        selected && 'cr-table__row--selected',
        disabled && 'cr-table__row--disabled',
        className,
      )}
      onClick={isInteractive ? handleClick : onClick}
      onKeyDown={isInteractive ? handleKeyDown : onKeyDown}
      {...rest}
    />
  );
});

export type TableCellAlign = 'start' | 'center' | 'end';

export interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Horizontal text alignment inside the cell. Default `'start'`. */
  align?: TableCellAlign;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align, className, ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cn('cr-table__cell', align && align !== 'start' && `cr-table__cell--${align}`, className)}
      {...rest}
    />
  );
});

export interface TableHeaderCellProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Horizontal text alignment inside the header cell. Default `'start'`. */
  align?: TableCellAlign;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(function TableHeaderCell(
  { align, className, scope = 'col', ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      scope={scope}
      className={cn(
        'cr-table__header-cell',
        align && align !== 'start' && `cr-table__header-cell--${align}`,
        className,
      )}
      {...rest}
    />
  );
});
