"use client";

import { useCallback, useState } from "react";
import { PropertySearchSection } from "@/features/property-search/components/property-search-section";
import type {
  PropertySearchCriteria,
  PropertySearchStatus,
} from "@/features/property-search/types";

export function PropertySearchSectionContainer() {
  const [status, setStatus] = useState<PropertySearchStatus>("idle");

  const handleSearch = useCallback((_criteria: PropertySearchCriteria) => {
    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
    }, 600);
  }, []);

  const handleRetry = useCallback(() => {
    setStatus("idle");
  }, []);

  return (
    <PropertySearchSection
      status={status}
      onSearch={handleSearch}
      onRetry={handleRetry}
    />
  );
}
