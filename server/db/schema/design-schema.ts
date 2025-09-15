import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const design = pgTable("design", {
  id: text("id").primaryKey(), // Note: You'll need to generate IDs like CUIDs in your application code before insertion.
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  shirtColor: text("shirt_color").notNull(),
  accentColor1: text("accent_color1").notNull(),
  accentColor2: text("accent_color2").notNull(),
  logoUrl: text("logo_url"),
  logoPosition: text("logo_position"),
  textContent: text("text_content"),
  textContent2: text("text_content2"),
  textColor: text("text_color"),
  textStyle: text("text_style"),
  hasOutline: boolean("has_outline").default(false).notNull(),
  outlineColor: text("outline_color"),
  isPublic: boolean("is_public").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // For auto-update on change, you can use .$onUpdate(() => new Date()) or handle it in your application logic.
});
