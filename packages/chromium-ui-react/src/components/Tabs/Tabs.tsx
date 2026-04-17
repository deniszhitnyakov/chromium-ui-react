import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import './Tabs.css';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ value, defaultValue, onValueChange, className, children, ...rest }: TabsProps) {
  const [internal, setInternal] = useState<string>(defaultValue ?? '');
  const baseId = useId();
  const resolvedValue = value ?? internal;
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value: resolvedValue, setValue, baseId }}>
      <div className={cn(className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export const TabList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function TabList({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} role="tablist" className={cn('cr-tabs', className)} {...rest}>
        {children}
      </div>
    );
  },
);

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, className, children, onClick, ...rest },
  ref,
) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab must be used inside Tabs');
  const isActive = ctx.value === value;
  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      id={`${ctx.baseId}-tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={cn('cr-tab', className)}
      onClick={(e) => {
        ctx.setValue(value);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, children, ...rest },
  ref,
) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabPanel must be used inside Tabs');
  const isActive = ctx.value === value;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      hidden={!isActive}
      className={cn('cr-tab-panel', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export function TabsSimple({
  tabs,
  value,
  defaultValue,
  onValueChange,
}: {
  tabs: { value: string; label: ReactNode; content: ReactNode; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const first = tabs[0]?.value ?? '';
  return (
    <Tabs value={value} defaultValue={defaultValue ?? first} onValueChange={onValueChange}>
      <TabList>
        {tabs.map((t) => (
          <Tab key={t.value} value={t.value} disabled={t.disabled}>
            {t.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((t) => (
        <TabPanel key={t.value} value={t.value}>
          {t.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}
