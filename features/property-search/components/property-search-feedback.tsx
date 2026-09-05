import type { PropertySearchStatus } from "@/features/property-search/types";

export interface PropertySearchFeedbackProps {
  status: PropertySearchStatus;
  loadingMessage?: string;
  successMessage?: string;
  disabledReason?: string;
}

export function PropertySearchFeedback({
  status,
  loadingMessage = "Searching for properties…",
  successMessage = "Search updated. Results will appear when connected.",
  disabledReason,
}: PropertySearchFeedbackProps) {
  if (status === "loading") {
    return (
      <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
        {loadingMessage}
      </p>
    );
  }

  if (status === "success") {
    return (
      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {successMessage}
      </p>
    );
  }

  if (disabledReason) {
    return (
      <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
        {disabledReason}
      </p>
    );
  }

  return null;
}
