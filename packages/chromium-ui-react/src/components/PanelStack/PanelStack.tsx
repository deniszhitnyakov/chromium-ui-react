import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import './PanelStack.css';

export interface PanelStackContextValue {
  current: string;
  stack: string[];
  push: (id: string) => void;
  pop: () => void;
  reset: (id: string) => void;
}

export const PanelStackContext = createContext<PanelStackContextValue | null>(null);

export function usePanelStack(): PanelStackContextValue {
  const ctx = useContext(PanelStackContext);
  if (!ctx) throw new Error('usePanelStack must be used inside a <PanelStack>.');
  return ctx;
}

export interface PanelStackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Uncontrolled initial view id. */
  defaultView?: string;
  /** Controlled current view id. Stack is managed externally via onChange. */
  value?: string;
  /** Fires whenever the current view changes (push, pop, reset). */
  onChange?: (view: string) => void;
  /** Slide transition duration in ms. Defaults to 240. */
  transitionDuration?: number;
}

function findFirstPanelViewId(children: ReactNode): string | undefined {
  let firstId: string | undefined;
  Children.forEach(children, (child) => {
    if (firstId) return;
    if (isValidElement(child)) {
      const element = child as { type: unknown; props: { id?: string } };
      if (element.type === PanelView && element.props.id) {
        firstId = element.props.id;
      }
    }
  });
  return firstId;
}

export const PanelStack = forwardRef<HTMLDivElement, PanelStackProps>(function PanelStack(
  {
    defaultView,
    value,
    onChange,
    transitionDuration = 240,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [internalStack, setInternalStack] = useState<string[]>(() => {
    if (value != null) return [value];
    if (defaultView != null) return [defaultView];
    const first = findFirstPanelViewId(children);
    return first != null ? [first] : [];
  });

  const stack = value != null ? [value] : internalStack;
  const current = stack[stack.length - 1] ?? defaultView ?? '';

  const push = useCallback(
    (id: string) => {
      if (value == null) {
        setInternalStack((prev) => (prev[prev.length - 1] === id ? prev : [...prev, id]));
      }
      onChange?.(id);
    },
    [value, onChange],
  );

  const pop = useCallback(() => {
    if (value == null) {
      setInternalStack((prev) => {
        if (prev.length <= 1) return prev;
        const next = prev.slice(0, -1);
        onChange?.(next[next.length - 1]);
        return next;
      });
    }
  }, [value, onChange]);

  const reset = useCallback(
    (id: string) => {
      if (value == null) setInternalStack([id]);
      onChange?.(id);
    },
    [value, onChange],
  );

  const ctxValue = useMemo<PanelStackContextValue>(
    () => ({ current, stack, push, pop, reset }),
    [current, stack, push, pop, reset],
  );

  const mergedStyle: CSSProperties = {
    ...style,
    ['--cr-panel-transition-duration' as never]: `${transitionDuration}ms`,
  };

  return (
    <PanelStackContext.Provider value={ctxValue}>
      <div
        ref={ref}
        className={cn('cr-panel-stack', className)}
        style={mergedStyle}
        data-current-view={current}
        {...rest}
      >
        {children}
      </div>
    </PanelStackContext.Provider>
  );
});

export interface PanelViewProps extends HTMLAttributes<HTMLElement> {
  /** Identifier used by PanelStack to route navigation to this view. */
  id: string;
}

export const PanelView = forwardRef<HTMLElement, PanelViewProps>(function PanelView(
  { id, className, children, ...rest },
  ref,
) {
  const ctx = useContext(PanelStackContext);
  if (!ctx) {
    throw new Error('<PanelView> must be used inside a <PanelStack>.');
  }

  const idx = ctx.stack.indexOf(id);
  const currentIdx = ctx.stack.indexOf(ctx.current);
  let position: 'current' | 'left' | 'right';
  if (id === ctx.current) position = 'current';
  else if (idx > -1 && currentIdx > -1 && idx < currentIdx) position = 'left';
  else position = 'right';

  const isCurrent = position === 'current';

  return (
    <section
      ref={ref}
      id={id}
      data-panel-view={id}
      className={cn('cr-panel-view', `cr-panel-view--${position}`, className)}
      aria-hidden={!isCurrent}
      {...rest}
    >
      {children}
    </section>
  );
});
