import { sql } from "@vercel/postgres";
import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);

export const UserTable = pgTable("tododrizzle", {
  id: integer("id").primaryKey(),
  text: varchar("text").notNull(),
  completed: boolean("completed").default(false),
});
