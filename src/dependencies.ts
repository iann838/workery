import type { Apertum } from "./applications"
import type { RouteHandler, RouteParameters } from "./types"

export class Dependency<R, Ps extends RouteParameters<E>, E = undefined> {
    envOf?: Apertum<E>
    name?: string
    parameters: Ps
    handler: RouteHandler<R, Ps, E>

    constructor(init: {
        envOf?: Apertum<E>
        name?: string
        parameters: Ps
        handler: RouteHandler<R, Ps, E>
    }) {
        this.envOf = init.envOf
        this.name = init.name
        this.parameters = init.parameters
        this.handler = init.handler
    }
}
