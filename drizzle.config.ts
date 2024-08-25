import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env" });

export default {
  schema: "./src/config/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
