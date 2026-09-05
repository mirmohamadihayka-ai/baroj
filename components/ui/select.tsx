import type { SelectHTMLAttributes } from "react";
import { Label } from "@/components/ui/label";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
}

export function Select({
  id,
  label,
  options,
  placeholder = "Select an option",
  hint,
  error,
  className = "",
  disabled,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  const hintId = hint && selectId ? `${selectId}-hint` : undefined;
  const errorId = error && selectId ? `${selectId}-error` : undefined;
  const describedBy =
    [hintId, errorId].filter(Boolean).join(" ") || undefined;

  if (!selectId) {
    throw new Error("Select requires an id or name for accessibility.");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={selectId}>{label}</Label>
      {hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <select
        id={selectId}
        className={`min-h-11 rounded border border-border bg-surface px-3 py-2 text-sm text-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${error ? "border-error" : ""} ${className}`}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
