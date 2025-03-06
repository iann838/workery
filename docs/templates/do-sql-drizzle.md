
# do-sql-drizzle

Sample Workers application using **Durable Objects SQL API** database with **Workery** and **Drizzle ORM**. This template contains a `schema.ts` file where SQL table schemas are defined and an `index.ts` file defining CRUD route handlers interacting with the Durable Object interface implemented on `databases.ts`. The `schema.ts` file is also used for tracking and generating database migration files.

### Extra setup required

After creating an application with this template, manual extra setup is required:

- Generate the migration file with the definitions in `schema.ts`. The migrations does not need to be applied manually, they automatically attempts to apply on durable object instantiation (see `databases.ts`). 

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
```
```sh [yarn]
# Start dev server:
yarn dev

# Deploy application:
yarn deploy

# Detect and generate migrations
yarn migrations:generate
```
```sh [pnpm]
# Start dev server:
pnpm dev

# Deploy application:
pnpm deploy

# Detect and generate migrations
pnpm migrations:generate
```
:::

---

Remember that by default, access to the interactive docs is available at http://127.0.0.1:8787/docs
