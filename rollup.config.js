import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default {
    input: [
        'src/index.ts',
        'src/applications.ts',
        'src/dependencies.ts',
        'src/helpers.ts',
        'src/middleware.ts',
        'src/parameters.ts',
        'src/renderers.ts',
        'src/responses.ts',
        'src/routing.ts',
    ],
    output: [
        {
            format: 'cjs',
            preserveModules: true,
            dir: 'dist',
            entryFileNames: '[name].cjs',
        },
        {
            format: 'es',
            preserveModules: true,
            dir: 'dist',
            entryFileNames: '[name].js',
        },
    ],
    plugins: [
        typescript({
            sourceMap: false,
            filterRoot: 'src',
            outDir: 'dist',
            exclude: ["**/*.test.ts"]
        }),
        terser(),
    ],
    external: ['cookie', 'zod', '@asteasolutions/zod-to-openapi'],
}
