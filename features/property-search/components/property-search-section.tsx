"use client";

import { FormEvent, useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PropertySearchActiveFilters } from "@/features/property-search/components/property-search-active-filters";
import { PropertySearchEmptyState } from "@/features/property-search/components/property-search-empty-state";
import { PropertySearchErrorState } from "@/features/property-search/components/property-search-error-state";
import { PropertySearchFeedback } from "@/features/property-search/components/property-search-feedback";
import { usePropertySearchForm } from "@/features/property-search/hooks/use-property-search-form";
import { normalizePropertySearchCriteria } from "@/features/property-search/lib/validate-property-search-criteria";
import {
  getActiveFilters,
  type PropertySearchCriteria,
  type PropertySearchOption,
  type PropertySearchStatus,
} from "@/features/property-search/types";

export interface PropertySearchSectionProps {
  status?: PropertySearchStatus;
  errorMessage?: string;
  successMessage?: string;
  disabled?: boolean;
  disabledReason?: string;
  defaultCriteria?: PropertySearchCriteria;
  locationOptions?: PropertySearchOption[];
  propertyTypeOptions?: PropertySearchOption[];
  onSearch?: (criteria: PropertySearchCriteria) => void;
  onRetry?: () => void;
  onAdjustFilters?: () => void;
  onClearFilters?: () => void;
}

export function PropertySearchSection({
  status = "idle",
  errorMessage = "Something went wrong while searching. Please try again.",
  successMessage,
  disabled = false,
  disabledReason,
  defaultCriteria,
  locationOptions = [],
  propertyTypeOptions = [],
  onSearch,
  onRetry,
  onAdjustFilters,
  onClearFilters,
}: PropertySearchSectionProps) {
  const formId = useId();
  const queryInputRef = useRef<HTMLInputElement>(null);
  const {
    criteria,
    fieldErrors,
    formError,
    setField,
    clearFilters,
    removeFilter,
    validate,
  } = usePropertySearchForm(defaultCriteria);

  const isLoading = status === "loading";
  const isFormDisabled = disabled || isLoading;
  const activeFilters = getActiveFilters(
    criteria,
    locationOptions,
    propertyTypeOptions,
  );
  const resolvedDisabledReason =
    disabled && disabledReason
      ? disabledReason
      : isLoading
        ? "Search is in progress. Fields are temporarily unavailable."
        : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isFormDisabled) {
      return;
    }

    if (!validate()) {
      return;
    }

    onSearch?.(normalizePropertySearchCriteria(criteria));
  }

  function handleClearFilters() {
    clearFilters();
    onClearFilters?.();
    queryInputRef.current?.focus();
  }

  function handleAdjustFilters() {
    onAdjustFilters?.();
    queryInputRef.current?.focus();
  }

  return (
    <section
      aria-labelledby={`${formId}-heading`}
      className="w-full rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-6"
    >
      <header className="mb-6 space-y-2">
        <h2 id={`${formId}-heading`} className="text-xl font-semibold">
          Property Search
        </h2>
        <p
          id={`${formId}-description`}
          className="text-sm text-muted-foreground"
        >
          Find properties by keyword, location, type, and price range.
        </p>
      </header>

      <form
        id={formId}
        onSubmit={handleSubmit}
        className="space-y-5"
        aria-busy={isLoading || undefined}
        aria-describedby={`${formId}-description`}
        noValidate
      >
        <Input
          ref={queryInputRef}
          id={`${formId}-query`}
          name="query"
          label="Search"
          placeholder="Keywords, address, or neighborhood"
          hint="Optional. Search by keyword, address, or neighborhood."
          autoComplete="off"
          value={criteria.query}
          disabled={isFormDisabled}
          onChange={(event) => setField("query", event.target.value)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            id={`${formId}-location`}
            name="location"
            label="Location"
            placeholder="Any location"
            hint={
              locationOptions.length === 0
                ? "Location options will appear when configured."
                : "Optional."
            }
            options={locationOptions}
            value={criteria.location}
            disabled={isFormDisabled}
            onChange={(event) => setField("location", event.target.value)}
          />

          <Select
            id={`${formId}-property-type`}
            name="propertyType"
            label="Property type"
            placeholder="Any type"
            hint={
              propertyTypeOptions.length === 0
                ? "Property types will appear when configured."
                : "Optional."
            }
            options={propertyTypeOptions}
            value={criteria.propertyType}
            disabled={isFormDisabled}
            onChange={(event) => setField("propertyType", event.target.value)}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">
            Price range
          </legend>
          <p id={`${formId}-price-hint`} className="text-sm text-muted-foreground">
            Optional. Enter whole numbers only.
          </p>
          <div
            className="grid gap-5 sm:grid-cols-2"
            aria-describedby={`${formId}-price-hint`}
          >
            <Input
              id={`${formId}-min-price`}
              name="minPrice"
              label="Minimum price"
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              placeholder="No minimum"
              value={criteria.minPrice}
              error={fieldErrors.minPrice}
              disabled={isFormDisabled}
              onChange={(event) => setField("minPrice", event.target.value)}
            />
            <Input
              id={`${formId}-max-price`}
              name="maxPrice"
              label="Maximum price"
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              placeholder="No maximum"
              value={criteria.maxPrice}
              error={fieldErrors.maxPrice}
              disabled={isFormDisabled}
              onChange={(event) => setField("maxPrice", event.target.value)}
            />
          </div>
        </fieldset>

        <PropertySearchActiveFilters
          filters={activeFilters}
          disabled={isFormDisabled}
          onRemoveFilter={removeFilter}
          onClearFilters={handleClearFilters}
        />

        {formError ? (
          <p
            id={`${formId}-form-error`}
            className="rounded border border-error/30 bg-error/5 px-3 py-2 text-sm text-error"
            role="alert"
          >
            {formError}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isFormDisabled}
            className="w-full sm:w-auto sm:min-w-40"
            aria-describedby={
              formError ? `${formId}-form-error` : `${formId}-description`
            }
          >
            {isLoading ? "Searching…" : "Search properties"}
          </Button>
          <PropertySearchFeedback
            status={status}
            successMessage={successMessage}
            disabledReason={resolvedDisabledReason}
          />
        </div>
      </form>

      {status === "error" ? (
        <PropertySearchErrorState message={errorMessage} onRetry={onRetry} />
      ) : null}

      {status === "empty" ? (
        <PropertySearchEmptyState onAdjustFilters={handleAdjustFilters} />
      ) : null}
    </section>
  );
}
