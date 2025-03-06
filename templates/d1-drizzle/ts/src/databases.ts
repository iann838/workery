import { drizzle, DrizzleD1Database } from "drizzle-orm/d1"
import { items } from "./schema"
import { ItemType } from "./zodtypes"
import { eq } from "drizzle-orm"

export class DefaultDatabase {

    db: DrizzleD1Database

    constructor(db: D1Database) {
        this.db = drizzle(db, { casing: "snake_case" })
    }

    async readItems(offset: number, limit: number) {
        return await this.db
            .select()
            .from(items)
            .limit(limit)
            .offset(offset)
    }

    async createItem(item: Omit<ItemType, "id" | "updatedAt">) {
        try {
            const results = await this.db
                .insert(items)
                .values(item)
                .returning()
            return results[0]
        } catch (e: unknown) {
            return undefined
        }
    }

    async updateItem(id: number, itemPt: Partial<Omit<ItemType, "id" | "updatedAt">>) {
        const results = await this.db
            .update(items)
            .set(itemPt)
            .where(eq(items.id, id))
            .returning()
        return results[0]
    }

}
