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
import { App } from "workery"
import { Body, Depends, Path, Query } from "workery/parameters"
import { JSONResponse } from "workery/responses"

import z from "zod"

import { useDb } from "./dependencies"
import { Item } from "./zodtypes"

const app = new App<Env>({})

app.get("/", {
    parameters: {},
    handle: () => {
        return { message: "Hello World" }
    },
})

app.get("/items", {
    parameters: {
        db: Depends(useDb),
        offset: Query(z.number().default(0)),
        limit: Query(z.number().default(20)),
    },
    handle: async ({ db, offset, limit }) => {
        return await db.readItems(offset, limit)
    },
})

app.post("/items", {
    parameters: {
        db: Depends(useDb),
        item: Body(Item.omit({ id: true, updatedAt: true })),
    },
    handle: async ({ db, item }) => {
        const result = await db.createItem(item)
        if (!result)
            return new JSONResponse({ detail: "Item data conflict" }, { status: 409 })
        return result
    },
})

app.patch("/items/{id}", {
    parameters: {
        db: Depends(useDb),
        id: Path(z.number()),
        itemPt: Body(Item.omit({ id: true, updatedAt: true }).partial())
    },
    handle: async ({ db, id, itemPt }) => {
        const result = await db.updateItem(id, itemPt)
        if (!result)
            return new JSONResponse({ detail: "Item not found" }, { status: 404 })
        return result
    },
})

export default app
