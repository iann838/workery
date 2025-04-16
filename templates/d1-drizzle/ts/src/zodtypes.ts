/**
 * Create zod schemas from schema tables.
 * Zod schemas can be used for data validation in routes and OAS documentations.
 * Optionally refine the output zod object with more specications or new data fields.
*/
import { createSelectSchema } from "drizzle-zod"
import z from "zod"

import { items } from "./schema"

export const Item = createSelectSchema(items, {
    name: (schema) => schema.name.min(1),
})
export const ItemInsert = Item.omit({ id: true, updatedAt: true })

export type ItemType = z.infer<typeof Item>
export type ItemInsertType = z.infer<typeof ItemInsert>
