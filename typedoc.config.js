/** @type {import('typedoc').TypeDocOptions} */
export default {
    entryPoints: [
        'src/index.ts',
        'src/applications.ts',
        'src/dependencies.ts',
        'src/helpers.ts',
        'src/middleware.ts',
        'src/parameters.ts',
        'src/renderers.ts',
        'src/responses.ts',
        'src/routing.ts',
        'src/types.ts',
    ],
    out: "docs/reference",
    name: "Workery",
    plugin: ["typedoc-plugin-markdown"],
    githubPages: false,
    readme: "none",
    entryFileName: "index",
    excludePrivate: true,
    sort: "source-order"
}