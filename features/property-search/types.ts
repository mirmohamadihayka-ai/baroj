export type PropertySearchStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "empty";

export interface PropertySearchOption {
  value: string;
  label: string;
}

export interface PropertySearchCriteria {
  query: string;
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
}

export interface PropertySearchFieldErrors {
  minPrice?: string;
  maxPrice?: string;
}

export type RemovableFilterKey =
  | "query"
  | "location"
  | "propertyType"
  | "priceRange";

export interface ActiveFilter {
  key: RemovableFilterKey;
  label: string;
}

export const EMPTY_PROPERTY_SEARCH_CRITERIA: PropertySearchCriteria = {
  query: "",
  location: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
};

export function hasActiveFilters(criteria: PropertySearchCriteria): boolean {
  return (
    criteria.query.trim().length > 0 ||
    criteria.location.trim().length > 0 ||
    criteria.propertyType.trim().length > 0 ||
    criteria.minPrice.trim().length > 0 ||
    criteria.maxPrice.trim().length > 0
  );
}

export function getActiveFilters(
  criteria: PropertySearchCriteria,
  locationOptions: PropertySearchOption[],
  propertyTypeOptions: PropertySearchOption[],
): ActiveFilter[] {
  const filters: ActiveFilter[] = [];

  if (criteria.query.trim()) {
    filters.push({
      key: "query",
      label: `Search: ${criteria.query.trim()}`,
    });
  }

  if (criteria.location) {
    const label =
      locationOptions.find((option) => option.value === criteria.location)
        ?.label ?? criteria.location;
    filters.push({ key: "location", label: `Location: ${label}` });
  }

  if (criteria.propertyType) {
    const label =
      propertyTypeOptions.find((option) => option.value === criteria.propertyType)
        ?.label ?? criteria.propertyType;
    filters.push({ key: "propertyType", label: `Type: ${label}` });
  }

  if (criteria.minPrice || criteria.maxPrice) {
    const min = criteria.minPrice || "Any";
    const max = criteria.maxPrice || "Any";
    filters.push({ key: "priceRange", label: `Price: ${min} – ${max}` });
  }

  return filters;
}
