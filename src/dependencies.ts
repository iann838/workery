import type { Apertum } from "./applications"
import type { DependencyHandler, RouteParameters } from "./types"

export class Dependency<R, Ps extends RouteParameters, G = {}> {
    of?: Apertum<G>
    name?: string
    parameters: Ps
    handle: DependencyHandler<R, Ps, G>

    constructor(init: {
        of?: Apertum<G>
        name?: string
        parameters: Ps
        handle: DependencyHandler<R, Ps, G>
    }) {
        this.of = init.of
        this.name = init.name
        this.parameters = init.parameters
        this.handle = init.handle
    }
}
