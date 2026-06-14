import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-card dark:border-gray-700 dark:bg-gray-900/80 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
