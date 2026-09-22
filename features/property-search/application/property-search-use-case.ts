import type { PropertySearchCriteria } from "@/features/property-search/types";
import type {
  PropertySearchRepository,
  PropertySearchRepositoryFailure,
  PropertySearchRepositoryResult,
  PropertySearchItem,
} from "@/features/property-search/application/property-search-repository";
import { normalizePropertySearchCriteria } from "@/features/property-search/lib/validate-property-search-criteria";

export type PropertySearchApplicationError =
  | { code: "invalid_criteria"; message: string }
  | { code: "dependency_unavailable"; message: string }
  | { code: "unexpected"; message: string };

export type PropertySearchApplicationResult =
  | { status: "success"; items: PropertySearchItem[] }
  | { status: "empty"; items: [] }
  | { status: "failure"; items: []; error: PropertySearchApplicationError };

export interface PropertySearchUseCase {
  execute(
    criteria: PropertySearchCriteria,
  ): Promise<PropertySearchApplicationResult>;
}

function mapRepositoryFailure(
  failure: PropertySearchRepositoryFailure,
): PropertySearchApplicationError {
  if (failure.code === "dependency_unavailable") {
    return {
      code: "dependency_unavailable",
      message: "Property search is temporarily unavailable.",
    };
  }

  return {
    code: "unexpected",
    message: "Property search could not be completed.",
  };
}

function isRepositoryResult(
  value: PropertySearchRepositoryResult,
): value is PropertySearchRepositoryResult {
  return (
    value.status === "success" &&
    Array.isArray(value.items)
  ) || value.status === "failure";
}

export function createPropertySearchUseCase(
  repository: PropertySearchRepository,
): PropertySearchUseCase {
  return {
    async execute(criteria) {
      const normalized = normalizePropertySearchCriteria(criteria);

      if (
        !normalized.query &&
        !normalized.location &&
        !normalized.propertyType &&
        !normalized.minPrice &&
        !normalized.maxPrice
      ) {
        return {
          status: "failure",
          items: [],
          error: {
            code: "invalid_criteria",
            message: "Enter at least one search criterion to continue.",
          },
        };
      }

      let result: PropertySearchRepositoryResult;

      try {
        result = await repository.search({ ...normalized });
      } catch {
        return {
          status: "failure",
          items: [],
          error: {
            code: "unexpected",
            message: "Property search could not be completed.",
          },
        };
      }

      if (!isRepositoryResult(result)) {
        return {
          status: "failure",
          items: [],
          error: {
            code: "unexpected",
            message: "Property search could not be completed.",
          },
        };
      }

      if (result.status === "failure") {
        return {
          status: "failure",
          items: [],
          error: mapRepositoryFailure(result.failure),
        };
      }

      if (result.items.length === 0) {
        return { status: "empty", items: [] };
      }

      return {
        status: "success",
        items: result.items,
      };
    },
  };
}
