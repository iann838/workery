export default {
    title: 'Workery',
    description: 'Modern web framework for Cloudflare Workers.',
    head: [['link', { rel: 'icon', href: '/icon.svg' }]],
    cleanUrls: true,
    themeConfig: {
        logo: "/icon.svg",
        siteTitle: "Workery",
        nav: [
            {
                text: "Guides",
                link: "/guides/first-steps.md",
                activeMatch: "/guides/*"
            },
            {
                text: "Templates",
                link: "/templates/index.md",
                activeMatch: "/templates/*"
            },
            {
                text: "Reference",
                link: "/reference/modules/",
                activeMatch: "/reference/*"
            },
            {
                text: "1.1.5 (latest)",
                items: [
                    { text: "Releases", link: "https://github.com/iann838/workery/releases" },
                    { text: "Migrations", link: "/migrations/1_0-1_1.md" }
                ]
            },
            {
                text: "Star ⭐",
                link: "https://github.com/iann838/workery",
                activeMatch: "."
            },
        ],
        search: {
            provider: 'local'
        },
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/iann838/workery"
            },
        ],
        sidebar: {
            "/guides/": {
                items: [
                    {
                        text: 'User Guides',
                        collapsed: false,
                        items: [
                            {
                                text: "First Steps",
                                link: '/guides/first-steps.md'
                            },
                            {
                                text: "Basic Parameters",
                                link: '/guides/basic-params.md'
                            },
                            {
                                text: "Request Body",
                                link: '/guides/request-body.md'
                            },
                            {
                                text: "Fetch Arguments",
                                link: '/guides/fetch-args.md'
                            },
                            {
                                text: "Middleware",
                                link: '/guides/middleware.md'
                            },
                            {
                                text: "Dependencies",
                                link: '/guides/dependencies.md'
                            },
                            {
                                text: "Responses",
                                link: '/guides/responses.md'
                            },
                            {
                                text: "Handling Errors",
                                link: '/guides/handling-errors.md'
                            },
                            {
                                text: "Bigger Applications",
                                link: '/guides/bigger-apps.md'
                            },
                            {
                                text: "App Router Options",
                                link: '/guides/app-router-options.md'
                            },
                            {
                                text: "CORS Support",
                                link: '/guides/cors.md'
                            },
                            {
                                text: "Compression",
                                link: '/guides/compression.md'
                            },
                            {
                                text: "Code Duplication",
                                link: '/guides/code-duplication.md'
                            },
                        ]
                    },
                ],
            },
            "/templates/": {
                items: [
                    {
                        text: "Templates",
                        collapsed: false,
                        items: [
                            { text: "hello-world", link: "/templates/hello-world.md" },
                            { text: "d1-drizzle", link: "/templates/d1-drizzle.md" },
                            { text: "do-sql-drizzle", link: "/templates/do-sql-drizzle.md" },
                        ]
                    }
                ]
            },
            "/reference/": {
                items: [
                    {
                        text: "Reference",
                        collapsed: false,
                        items: [
                            { text: "index", link: "/reference/modules/" },
                            { text: "applications", link: "/reference/modules/applications.md" },
                            { text: "dependencies", link: "/reference/modules/dependencies.md" },
                            { text: "helpers", link: "/reference/modules/helpers.md" },
                            { text: "middleware", link: "/reference/modules/middleware.md" },
                            { text: "parameters", link: "/reference/modules/parameters.md" },
                            { text: "renderers", link: "/reference/modules/renderers.md" },
                            { text: "responses", link: "/reference/modules/responses.md" },
                            { text: "routing", link: "/reference/modules/routing.md" },
                            { text: "types", link: "/reference/modules/types.md" },
                        ]
                    }
                ]
            },
            "/migrations/": {
                items: [
                    {
                        text: "Migrations",
                        items: [
                            { text: "1.0 -> 1.1", link: "/migrations/1_0-1_1.md" }
                        ]
                    }
                ]
            }
        }
    },
}