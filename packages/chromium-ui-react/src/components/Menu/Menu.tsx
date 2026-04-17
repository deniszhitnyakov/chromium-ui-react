import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Menu.css';

export const Menu = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Menu(
  { className, role = 'menu', ...rest },
  ref,
) {
  return <div ref={ref} role={role} className={cn('cr-menu', className)} {...rest} />;
});

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  end?: ReactNode;
  selected?: boolean;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { icon, end, selected, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      role="menuitem"
      type={type}
      className={cn('cr-menu-item', selected && 'cr-menu-item--selected', className)}
      {...rest}
    >
      {icon && <span className="cr-menu-item__icon" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {end && <span className="cr-menu-item__end">{end}</span>}
    </button>
  );
});

export const MenuDivider = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(
  function MenuDivider({ className, ...rest }, ref) {
    return <hr ref={ref} className={cn('cr-menu__divider', className)} role="separator" {...rest} />;
  },
);

export const MenuLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function MenuLabel({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('cr-menu__label', className)} {...rest} />;
  },
);
