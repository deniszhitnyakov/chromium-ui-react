import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './List.css';

export const List = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  function List({ className, ...rest }, ref) {
    return <ul ref={ref} className={cn('cr-list', className)} {...rest} />;
  },
);

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: ReactNode;
  avatar?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  end?: ReactNode;
  interactive?: boolean;
  selected?: boolean;
  dense?: boolean;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { icon, avatar, primary, secondary, end, interactive, selected, dense, className, children, ...rest },
  ref,
) {
  const hasStructured = icon != null || avatar != null || primary != null || secondary != null || end != null;
  return (
    <li
      ref={ref}
      className={cn(
        'cr-list-item',
        interactive && 'cr-list-item--interactive',
        selected && 'cr-list-item--selected',
        dense && 'cr-list-item--dense',
        className,
      )}
      {...rest}
    >
      {hasStructured ? (
        <>
          {icon && <span className="cr-list-item__icon">{icon}</span>}
          {avatar && <span className="cr-list-item__avatar">{avatar}</span>}
          <span className="cr-list-item__text">
            {primary != null && <div className="cr-list-item__primary">{primary}</div>}
            {secondary != null && <div className="cr-list-item__secondary">{secondary}</div>}
          </span>
          {end != null && <span className="cr-list-item__end">{end}</span>}
        </>
      ) : (
        children
      )}
    </li>
  );
});
