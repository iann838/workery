import type { Apertum } from "./applications"

export function adaptCfWorkers<E, C>(app: Apertum<{ env: E; ctx: C }>) {
    return {
        fetch(req: Request, env: E, ctx: C): Promise<Response> {
            return app.handle({ req, env, ctx })
        },
    }
}
