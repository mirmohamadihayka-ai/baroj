"use client";

import { useCallback, useState } from "react";
import { validatePropertySearchCriteria } from "@/features/property-search/lib/validate-property-search-criteria";
import {
  EMPTY_PROPERTY_SEARCH_CRITERIA,
  type PropertySearchCriteria,
  type PropertySearchFieldErrors,
  type RemovableFilterKey,
} from "@/features/property-search/types";

export function usePropertySearchForm(
  initialCriteria: PropertySearchCriteria = EMPTY_PROPERTY_SEARCH_CRITERIA,
) {
  const [criteria, setCriteria] =
    useState<PropertySearchCriteria>(initialCriteria);
  const [fieldErrors, setFieldErrors] = useState<PropertySearchFieldErrors>({});
  const [formError, setFormError] = useState<string | undefined>();

  const setField = useCallback(
    (field: keyof PropertySearchCriteria, value: string) => {
      setCriteria((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field as keyof PropertySearchFieldErrors]) {
          return current;
        }

        const next = { ...current };
        delete next[field as keyof PropertySearchFieldErrors];
        return next;
      });
      setFormError(undefined);
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setCriteria(EMPTY_PROPERTY_SEARCH_CRITERIA);
    setFieldErrors({});
    setFormError(undefined);
  }, []);

  const removeFilter = useCallback((key: RemovableFilterKey) => {
    setCriteria((current) => {
      if (key === "priceRange") {
        return { ...current, minPrice: "", maxPrice: "" };
      }

      return { ...current, [key]: "" };
    });
    setFieldErrors({});
    setFormError(undefined);
  }, []);

  const validate = useCallback((): boolean => {
    const result = validatePropertySearchCriteria(criteria);
    setFieldErrors(result.fieldErrors);
    setFormError(result.formError);
    return !result.formError && Object.keys(result.fieldErrors).length === 0;
  }, [criteria]);

  return {
    criteria,
    fieldErrors,
    formError,
    setField,
    clearFilters,
    removeFilter,
    validate,
  };
}
