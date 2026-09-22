import { numeric, pgTable, text } from "drizzle-orm/pg-core";

export const propertySearchReadModel = pgTable("property_search_read_model", {
  id: text("id").notNull(),
  propertyType: text("property_type").notNull(),
  location: text("location").notNull(),
  price: numeric("price").notNull(),
  searchText: text("search_text").notNull(),
});

export type PropertySearchReadModelRow =
  typeof propertySearchReadModel.$inferSelect;
