import type { Of } from "./helpers"
import type { Router } from "./routing"
import type { DependencyHandler, RouteParameters } from "./types"

export class Dependency<R, Ps extends RouteParameters, E = unknown> {
    of?: Router<E> | Of<E>
    name?: string
    parameters: Ps
    handle: DependencyHandler<R, Ps, E>

    constructor(init: {
        of?: Router<E> | Of<E>
        name?: string
        parameters: Ps
        handle: DependencyHandler<R, Ps, E>
    }) {
        this.of = init.of
        this.name = init.name
        this.parameters = init.parameters
        this.handle = init.handle
    }
}
