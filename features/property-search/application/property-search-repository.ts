import type { PropertySearchCriteria } from "@/features/property-search/types";

export interface PropertySearchItem {
  id: string;
  propertyType: string;
  location: string;
  price: number;
}

export type PropertySearchRepositoryFailure =
  | { code: "dependency_unavailable"; cause?: unknown }
  | { code: "unexpected"; cause?: unknown };

export type PropertySearchRepositoryResult =
  | { status: "success"; items: PropertySearchItem[] }
  | { status: "failure"; failure: PropertySearchRepositoryFailure };

export interface PropertySearchRepository {
  search(
    criteria: PropertySearchCriteria,
  ): Promise<PropertySearchRepositoryResult>;
}
