import { forwardRef, type InputHTMLAttributes } from "react";
import { Label } from "@/components/ui/label";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, hint, error, className = "", disabled, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const describedBy =
    [hintId, errorId].filter(Boolean).join(" ") || undefined;

  if (!inputId) {
    throw new Error("Input requires an id or name for accessibility.");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      {hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        className={`min-h-11 rounded border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${error ? "border-error" : ""} ${className}`}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
