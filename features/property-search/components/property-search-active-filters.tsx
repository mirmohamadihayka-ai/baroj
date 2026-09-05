import { Button } from "@/components/ui/button";
import type { ActiveFilter } from "@/features/property-search/types";

export interface PropertySearchActiveFiltersProps {
  filters: ActiveFilter[];
  disabled?: boolean;
  onRemoveFilter: (key: ActiveFilter["key"]) => void;
  onClearFilters: () => void;
}

export function PropertySearchActiveFilters({
  filters,
  disabled = false,
  onRemoveFilter,
  onClearFilters,
}: PropertySearchActiveFiltersProps) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded border border-border bg-muted px-4 py-3"
      aria-live="polite"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">Active filters</p>
        <Button
          type="button"
          variant="secondary"
          disabled={disabled}
          className="min-h-9 px-3 py-1 text-xs"
          onClick={onClearFilters}
        >
          Clear all
        </Button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <li key={filter.key}>
            <button
              type="button"
              disabled={disabled}
              className="inline-flex min-h-9 items-center gap-2 rounded bg-surface px-2 py-1 text-xs text-muted-foreground ring-1 ring-border transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => onRemoveFilter(filter.key)}
              aria-label={`Remove ${filter.label}`}
            >
              <span>{filter.label}</span>
              <span aria-hidden="true" className="text-foreground">
                ×
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
