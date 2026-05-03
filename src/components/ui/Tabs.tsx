import { ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
}

interface TabsListProps {
  children: ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  active?: boolean;
}

export function Tabs({ children }: TabsProps) {
  return <div>{children}</div>;
}

export function TabsList({ children }: TabsListProps) {
  return <div className="flex gap-2 mb-4">{children}</div>;
}

export function TabsTrigger({ children, onClick }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-100 transition-colors"
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, active }: TabsContentProps) {
  if (!active) return null;
  return <div>{children}</div>;
}