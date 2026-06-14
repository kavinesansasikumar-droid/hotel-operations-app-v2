import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-sidebar-accent text-white hover:opacity-95 px-4 py-2 rounded-lg font-semibold text-sm transition-opacity",
  ghost:
    "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition-colors",
  icon: "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children?: ReactNode;
}) {
  return (
    <button type="button" className={`${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
