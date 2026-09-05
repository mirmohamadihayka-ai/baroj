import { Button } from "@/components/ui/button";

export interface PropertySearchEmptyStateProps {
  onAdjustFilters: () => void;
}

export function PropertySearchEmptyState({
  onAdjustFilters,
}: PropertySearchEmptyStateProps) {
  return (
    <div
      className="mt-6 rounded border border-border bg-muted px-4 py-6 text-center"
      role="status"
      aria-live="polite"
    >
      <h3 className="text-sm font-medium">No properties found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try adjusting your filters or searching with different criteria.
      </p>
      <div className="mt-4">
        <Button type="button" variant="secondary" onClick={onAdjustFilters}>
          Adjust filters
        </Button>
      </div>
    </div>
  );
}
