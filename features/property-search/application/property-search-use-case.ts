import type { PropertySearchCriteria } from "@/features/property-search/types";
import {
  normalizePropertySearchCriteria,
  validatePropertySearchCriteria,
} from "@/features/property-search/lib/validate-property-search-criteria";
import type {
  PropertySearchRepository,
  PropertySearchRepositoryFailure,
  PropertySearchRepositoryResult,
  PropertySearchItem,
} from "@/features/property-search/application/property-search-repository";

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

function invalidCriteriaResult(
  message: string,
): PropertySearchApplicationResult {
  return {
    status: "failure",
    items: [],
    error: {
      code: "invalid_criteria",
      message,
    },
  };
}

function unexpectedFailureResult(): PropertySearchApplicationResult {
  return {
    status: "failure",
    items: [],
    error: {
      code: "unexpected",
      message: "Property search could not be completed.",
    },
  };
}

function mapRepositoryResult(
  result: PropertySearchRepositoryResult,
): PropertySearchApplicationResult {
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
}

export function createPropertySearchUseCase(
  repository: PropertySearchRepository,
): PropertySearchUseCase {
  return {
    async execute(criteria) {
      const validation = validatePropertySearchCriteria(criteria);

      if (Object.keys(validation.fieldErrors).length > 0) {
        return invalidCriteriaResult(
          "Enter valid search criteria before continuing.",
        );
      }

      if (validation.formError) {
        return invalidCriteriaResult(validation.formError);
      }

      const normalized = normalizePropertySearchCriteria(criteria);

      try {
        const result = await repository.search({ ...normalized });
        return mapRepositoryResult(result);
      } catch {
        return unexpectedFailureResult();
      }
    },
  };
}
