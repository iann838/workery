/**
 * This is your durable object definition file.
 * A default `ClientDatabase` durable object has been defined and set up for SQL API usage.
 */
import { DurableObject } from 'cloudflare:workers'
import { drizzle, DrizzleSqliteDODatabase } from 'drizzle-orm/durable-sqlite'
import { migrate } from 'drizzle-orm/durable-sqlite/migrator'

/**
 * Run `npm run migrations:generate` for migrations imports to work.
 * The constructor automatically applies migrations upon durable object creation.
 */
import migrations from '@migrations'
import { ItemType } from './zodtypes'
import { items } from './schema'
import { eq } from 'drizzle-orm'

export class ClientDatabase extends DurableObject {

	db: DrizzleSqliteDODatabase

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env)
		this.db = drizzle(ctx.storage, { logger: false, casing: "snake_case" })
		ctx.blockConcurrencyWhile(async () => await migrate(this.db, migrations))
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
