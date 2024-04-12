export default {
    title: 'Apertum',
    description: 'OpenAPI based, fast to code, fully typed.',
    themeConfig: {
        logo: "https://www.openapis.org/wp-content/uploads/sites/3/2016/11/favicon.png",
        siteTitle: "Apertum",
        nav: [
            {
                text: "Guides",
                link: "/guides/quickstart.md"
            },
            {
                text: "Reference",
                link: "/reference/README.md"
            },
            {
                text: "Star me!",
                link: "https://github.com/iann838/apertum",
                activeMatch: ".",
            },
        ],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/iann838/apertum"
            },
        ],
        sidebar: {
            "/guides/": {
                items: [
                    {
                        text: 'Introduction',
                        collapsed: false,
                        items: [
                            {
                                text: "Get Started",
                                link: '/guides/quickstart.md'
                            },
                        ]
                    },
                    {
                        text: 'Usage',
                        collapsed: false,
                        items: [
                            {
                                text: "Applications",
                                link: "/guides/applications.md",
                            },
                            {
                                text: "Parameters",
                                link: "/guides/parameters.md",
                            },
                            {
                                text: "Dependencies",
                                link: "/guides/dependencies.md",
                            },
                            {
                                text: "Middleware",
                                link: "/guides/middleware.md",
                            },
                            {
                                text: "Responses",
                                link: "/guides/responses.md",
                            },
                            {
                                text: "Adapters",
                                link: "/guides/adapters.md",
                            },
                        ]
                    },
                    {
                        text: 'Others',
                        collapsed: false,
                        items: [
                            {
                                text: "Helpers",
                                link: '/guides/helpers.md'
                            },
                            {
                                text: "Renderers",
                                link: '/guides/renderers.md'
                            },
                            {
                                text: "Routing",
                                link: '/guides/routing.md'
                            },
                        ]
                    },
                ],
            },
            "/reference/": {
                items: [
                    { text: "index", link: "/reference/modules/" },
                    { text: "adapters", link: "/reference/modules/adapters.md" },
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
        }
    },
}