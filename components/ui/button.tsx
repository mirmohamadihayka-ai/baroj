import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-disabled disabled:text-primary-foreground",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-muted disabled:bg-muted disabled:text-muted-foreground",
};

export function Button({
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? <span className="sr-only">Loading</span> : null}
      {children}
    </button>
  );
}
