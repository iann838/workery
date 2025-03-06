/**
 * This is your dependencies file
 * Create dependencies that your application requires
 * Example of dependencies: Authentication, resource preparation, etc.
 */
import { Dependency, Of } from "workery"
import { DefaultDatabase } from "./databases"

/**
 * Prepare a drizzle instance of the D1 Database
*/
export const useDb = new Dependency({
    of: new Of<Env>,
    parameters: {},
    handle: ({ env }) => new DefaultDatabase(env.DB)
})
