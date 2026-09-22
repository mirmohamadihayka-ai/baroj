import { and, eq, gte, lte } from "drizzle-orm";

import type {
  PropertySearchItem,
  PropertySearchRepository,
  PropertySearchRepositoryResult,
} from "@/features/property-search/application/property-search-repository";
import type { PropertySearchCriteria } from "@/features/property-search/types";
import { getDatabase } from "@/infrastructure/database/client";
import {
  propertySearchReadModel,
} from "@/infrastructure/database/schema/property-search-read-model";

function mapRowToPropertySearchItem(
  row: typeof propertySearchReadModel.$inferSelect,
): PropertySearchItem {
  const price = Number(row.price);

  if (!Number.isFinite(price)) {
    throw new Error("Invalid persisted property price.");
  }

  return {
    id: row.id,
    propertyType: row.propertyType,
    location: row.location,
    price,
  };
}

function buildFilters(criteria: PropertySearchCriteria) {
  const filters = [];

  if (criteria.propertyType) {
    filters.push(eq(propertySearchReadModel.propertyType, criteria.propertyType));
  }

  if (criteria.location) {
    filters.push(eq(propertySearchReadModel.location, criteria.location));
  }

  if (criteria.minPrice !== undefined) {
    filters.push(gte(propertySearchReadModel.price, String(criteria.minPrice)));
  }

  if (criteria.maxPrice !== undefined) {
    filters.push(lte(propertySearchReadModel.price, String(criteria.maxPrice)));
  }

  return filters;
}

export function createPostgresPropertySearchRepository(): PropertySearchRepository {
  return {
    async search(criteria): Promise<PropertySearchRepositoryResult> {
      try {
        // Free-text semantics remain intentionally unapproved by MAI-34.
        // Never silently ignore a non-empty query.
        if (criteria.query) {
          return {
            status: "failure",
            failure: {
              code: "unexpected",
              cause: new Error(
                "Free-text property search semantics are not approved yet.",
              ),
            },
          };
        }

        const filters = buildFilters(criteria);

        const rows = await getDatabase()
          .select()
          .from(propertySearchReadModel)
          .where(filters.length > 0 ? and(...filters) : undefined);

        return {
          status: "success",
          items: rows.map(mapRowToPropertySearchItem),
        };
      } catch (cause) {
        return {
          status: "failure",
          failure: {
            code: "dependency_unavailable",
            cause,
          },
        };
      }
    },
  };
}
