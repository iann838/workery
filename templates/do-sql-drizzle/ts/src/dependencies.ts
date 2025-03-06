/**
 * This is your dependencies file
 * Create dependencies that your application requires
 * Example of dependencies: Authentication, resource preparation, etc.
 */
import { Dependency, Of } from "workery"
import { Header } from "workery/parameters"
import z from "zod"

/**
 * Get the Durable Object based Database associated with the requesting client
*/
export const useClientDb = new Dependency({
    of: new Of<Env>,
    parameters: {
        Client_Id: Header(z.string()),
    },
    handle: ({ env, Client_Id }) => {
        const id = env.DO.idFromName(Client_Id)
        return env.DO.get(id)
    }
})
