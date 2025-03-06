
# d1-drizzle

Sample Workers application using **SQL D1 database** with **Workery** and **Drizzle ORM**. This template contains a `schema.ts` file where SQL table schemas are defined and an `index.ts` file defining CRUD route handlers interacting with the D1 interface implemented on `databases.ts`. The `schema.ts` file is also used for tracking and generating database migration files.

### Extra setup required

After creating an application with this template, manual extra setup is required:

- Create a D1 database via Wrangler: `npx wrangler d1 create <DB_NAME>`

- Update the D1 database ID in `wrangler.toml` (under `[[d1_databases]]`).

- (Optional) Generate the migration file with the definitions in `schema.ts` and apply them using the commands below. 

---

*Available script commands:*

::: code-group
```sh [npm]
# Start dev server:
npm run dev

# Deploy application:
npm run deploy

# Detect and generate migrations
npm run migrations:generate

# Apply migrations to local database
npm run migrations:apply

# Apply migrations to deployed database
npm run migrations:apply --remote
```
```sh [yarn]
# Start dev server:
yarn dev

# Deploy application:
yarn deploy

# Detect and generate migrations
yarn migrations:generate

# Apply migrations to local database
yarn migrations:apply

# Apply migrations to deployed database
yarn migrations:apply --remote
```
```sh [pnpm]
# Start dev server:
pnpm dev

# Deploy application:
pnpm deploy

# Detect and generate migrations
pnpm migrations:generate

# Apply migrations to local database
pnpm migrations:apply

# Apply migrations to deployed database
pnpm migrations:apply --remote
```
:::

---

Remember that by default, access to the interactive docs is available at http://127.0.0.1:8787/docs
