import { defineConfig } from "drizzle-kit"

export default defineConfig({
    driver: 'durable-sqlite',
    dialect: "sqlite",
    schema: "./src/schema.ts",
    casing: "snake_case",
    out: "./migrations"
})
