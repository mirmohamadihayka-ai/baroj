import { Button } from "@/components/ui/button";

export interface PropertySearchErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function PropertySearchErrorState({
  message,
  onRetry,
}: PropertySearchErrorStateProps) {
  return (
    <div
      className="mt-6 rounded border border-error/30 bg-error/5 px-4 py-4"
      role="alert"
      aria-live="assertive"
    >
      <h3 className="text-sm font-medium text-error">Search unavailable</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <div className="mt-3">
          <Button type="button" variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </div>
  );
}
