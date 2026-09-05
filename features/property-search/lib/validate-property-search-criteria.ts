import {
  hasActiveFilters,
  type PropertySearchCriteria,
  type PropertySearchFieldErrors,
} from "@/features/property-search/types";

export interface PropertySearchValidationResult {
  fieldErrors: PropertySearchFieldErrors;
  formError?: string;
}

function parsePrice(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

export function validatePropertySearchCriteria(
  criteria: PropertySearchCriteria,
): PropertySearchValidationResult {
  const fieldErrors: PropertySearchFieldErrors = {};
  const min = parsePrice(criteria.minPrice);
  const max = parsePrice(criteria.maxPrice);

  if (criteria.minPrice.trim() && min === null) {
    fieldErrors.minPrice = "Enter a valid minimum price.";
  }

  if (criteria.maxPrice.trim() && max === null) {
    fieldErrors.maxPrice = "Enter a valid maximum price.";
  }

  if (min !== null && max !== null && min > max) {
    fieldErrors.maxPrice =
      "Maximum price must be greater than or equal to minimum price.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  if (!hasActiveFilters(criteria)) {
    return {
      fieldErrors,
      formError: "Enter at least one search criterion to continue.",
    };
  }

  return { fieldErrors };
}

export function normalizePropertySearchCriteria(
  criteria: PropertySearchCriteria,
): PropertySearchCriteria {
  return {
    query: criteria.query.trim(),
    location: criteria.location.trim(),
    propertyType: criteria.propertyType.trim(),
    minPrice: criteria.minPrice.trim(),
    maxPrice: criteria.maxPrice.trim(),
  };
}
