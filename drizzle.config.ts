import { defineConfig } from "drizzle-kit";
import type { MigrationConfig } from "drizzle-orm/migrator";
import { config } from "./src/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
  },
});
