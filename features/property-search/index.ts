export { PropertySearchSection } from "@/features/property-search/components/property-search-section";
export type { PropertySearchSectionProps } from "@/features/property-search/components/property-search-section";
export { usePropertySearchForm } from "@/features/property-search/hooks/use-property-search-form";
export {
  normalizePropertySearchCriteria,
  validatePropertySearchCriteria,
} from "@/features/property-search/lib/validate-property-search-criteria";
export {
  EMPTY_PROPERTY_SEARCH_CRITERIA,
  getActiveFilters,
  hasActiveFilters,
} from "@/features/property-search/types";
export type {
  ActiveFilter,
  PropertySearchCriteria,
  PropertySearchFieldErrors,
  PropertySearchOption,
  PropertySearchStatus,
  RemovableFilterKey,
} from "@/features/property-search/types";

export { createPropertySearchUseCase } from "@/features/property-search/application/property-search-use-case";
export type {
  PropertySearchApplicationError,
  PropertySearchApplicationResult,
  PropertySearchUseCase,
} from "@/features/property-search/application/property-search-use-case";
export type {
  PropertySearchItem,
  PropertySearchRepository,
  PropertySearchRepositoryFailure,
  PropertySearchRepositoryResult,
} from "@/features/property-search/application/property-search-repository";
