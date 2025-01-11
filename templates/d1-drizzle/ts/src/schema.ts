/**
 * This is your drizzle schema declaration file, used for generating migrations files and table referencing.
 *
 * - Run `npm run migrations:generate` to detect changes in your schema and generate the required migration files.
 * - Run `npm run migrations:apply` to apply migrations on the local development D1 database
 * - Run `npm run migrations:apply --remote` to apply migrations on the remote deployed D1 database
 *
 * Learn more at https://developers.cloudflare.com/workers/
*/

import { sqliteTable as table } from "drizzle-orm/sqlite-core"
import { createSelectSchema } from "drizzle-zod"
import * as t from "drizzle-orm/sqlite-core"

/**
 * Declares an sqlite table named `items`.
 * This table is later used for data storage and access.
 * Note: by default all columns declared with drizzle-orm are nullable.
*/
export const items = table(
    "items",
    {
        id: t.integer().primaryKey({ autoIncrement: true }),
        name: t.text().unique().notNull(),
        description: t.text().notNull(),
        count: t.integer().notNull().default(0),
        updatedAt: t.integer().notNull().$onUpdate(Date.now),
    },
)

/**
 * Create a zod schema from the items table.
 * This zod schema can be used for data validation in routes and OAS documentations.
 * You can optionally refine the output zod object with more specications or new data fields.
 * - In this case, the field `name` must have a minimum length of 1.
*/
export const zItem = createSelectSchema(items, {
    name: (schema) => schema.name.min(1),
})
