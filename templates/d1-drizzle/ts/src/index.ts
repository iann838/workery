/**
 * Welcome to Cloudflare Workers! This is a worker using the Workery framework with D1 support using Drizzle ORM.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
*/
import { App, Dependency } from "workery"
import { Body, Depends, Path } from "workery/parameters"
import { JSONResponse } from "workery/responses"

import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import z from "zod"

import { items, zItem } from "./schema"

const app = new App<Env>({})

const useDb = new Dependency({
    of: app,
    parameters: {},
    handle: ({ env }) => drizzle(env.DB, { casing: "snake_case" })
})

app.get("/", {
    parameters: {},
    handle: () => {
        return { message: "Hello World" }
    },
})

app.post("/items", {
    statusCode: 201,
    parameters: {
        db: Depends(useDb),
        item: Body(zItem.omit({ id: true, updatedAt: true })),
    },
    handle: async ({ db, item }) => {
        const results = await db
            .insert(items)
            .values(item)
            .onConflictDoNothing()
            .returning()
        if (!results.length)
            return new JSONResponse({ detail: "Item data conflict" }, { status: 409 })
        return results[0]
    },
})

app.post("/items/{id}", {
    parameters: {
        db: Depends(useDb),
        id: Path(z.number()),
    },
    handle: async ({ db, id }) => {
        const results = await db
            .select()
            .from(items)
            .where(eq(items.id, id))
        if (!results.length)
            return new JSONResponse({ detail: "Item not found" }, { status: 404 })
        return results[0]
    },
})

app.patch("/items/{id}", {
    parameters: {
        db: Depends(useDb),
        id: Path(z.number()),
        itemPt: Body(zItem.omit({ id: true, updatedAt: true }).partial())
    },
    handle: async ({ db, id, itemPt }) => {
        const results = await db
            .update(items)
            .set(itemPt)
            .where(eq(items.id, id))
            .returning()
        if (!results.length)
            return new JSONResponse({ detail: "Item not found" }, { status: 404 })
        return results[0]
    },
})

export default app
