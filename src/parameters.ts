import { z } from "zod"
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"
import type { Dependency } from "./dependencies"
import type {
    BodyParameter,
    CookieParameter,
    DependsParameter,
    HeaderParameter,
    RouteParameterOptions,
    PathParameter,
    QueryParameter,
    ZodPrimitive,
    RouteParameters,
    ArgsOf,
    ParseArgsInfo,
    ParseArgsError,
    ZodBodyable,
    RouteParameter,
} from "./types"

if (z.string().openapi === undefined) {
    extendZodWithOpenApi(z)
}

export function JSONCoerce<Out = unknown>(value: string): Out | string
export function JSONCoerce<Out = unknown>(value: string[]): Out[] | string[]
export function JSONCoerce<Out = unknown>(
    value: string | string[]
): Out | Out[] | string | string[] {
    try {
        if (value instanceof Array) {
            return value.map((item: string) => JSON.parse(item))
        }
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}

export function isZodCoercible(schema: z.ZodType): boolean {
    return (
        schema instanceof z.ZodNumber ||
        schema instanceof z.ZodBoolean ||
        (schema instanceof z.ZodArray && schema._def.type instanceof z.ZodNumber) ||
        (schema instanceof z.ZodArray && schema._def.type instanceof z.ZodBoolean) ||
        (schema instanceof z.ZodOptional && schema._def.innerType instanceof z.ZodNumber) ||
        (schema instanceof z.ZodOptional && schema._def.innerType instanceof z.ZodBoolean)
    )
}

export function Path(): PathParameter<z.ZodString>
export function Path(
    schema: z.ZodString,
    options?: RouteParameterOptions
): PathParameter<z.ZodString>
export function Path(
    schema: z.ZodNumber,
    options?: RouteParameterOptions
): PathParameter<z.ZodNumber>
export function Path(
    schema: z.ZodBoolean,
    options?: RouteParameterOptions
): PathParameter<z.ZodBoolean>
export function Path(
    schema: z.ZodArray<z.ZodString>,
    options?: RouteParameterOptions
): PathParameter<z.ZodArray<z.ZodString>>
export function Path(
    schema: z.ZodArray<z.ZodNumber>,
    options?: RouteParameterOptions
): PathParameter<z.ZodArray<z.ZodNumber>>
export function Path(
    schema: z.ZodArray<z.ZodBoolean>,
    options?: RouteParameterOptions
): PathParameter<z.ZodArray<z.ZodBoolean>>
export function Path(
    schema: z.ZodOptional<z.ZodString>,
    options?: RouteParameterOptions
): PathParameter<z.ZodOptional<z.ZodString>>
export function Path(
    schema: z.ZodOptional<z.ZodNumber>,
    options?: RouteParameterOptions
): PathParameter<z.ZodOptional<z.ZodNumber>>
export function Path(
    schema: z.ZodOptional<z.ZodBoolean>,
    options?: RouteParameterOptions
): PathParameter<z.ZodOptional<z.ZodBoolean>>
export function Path(
    schema: z.ZodDefault<z.ZodString>,
    options?: RouteParameterOptions
): PathParameter<z.ZodDefault<z.ZodString>>
export function Path(
    schema: z.ZodDefault<z.ZodNumber>,
    options?: RouteParameterOptions
): PathParameter<z.ZodDefault<z.ZodNumber>>
export function Path(
    schema: z.ZodDefault<z.ZodBoolean>,
    options?: RouteParameterOptions
): PathParameter<z.ZodDefault<z.ZodBoolean>>
export function Path(
    schema: ZodPrimitive = z.string(),
    options?: RouteParameterOptions
): PathParameter<ZodPrimitive> {
    return {
        location: "path",
        schema: schema,
        isCoercible: isZodCoercible(schema),
        options: {
            includeInSchema: true,
            coerceFunction: JSONCoerce,
            ...options,
        },
    }
}

export function Query(): QueryParameter<z.ZodString>
export function Query(
    schema: z.ZodString,
    options?: RouteParameterOptions
): QueryParameter<z.ZodString>
export function Query(
    schema: z.ZodNumber,
    options?: RouteParameterOptions
): QueryParameter<z.ZodNumber>
export function Query(
    schema: z.ZodBoolean,
    options?: RouteParameterOptions
): QueryParameter<z.ZodBoolean>
export function Query(
    schema: z.ZodArray<z.ZodString>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodArray<z.ZodString>>
export function Query(
    schema: z.ZodArray<z.ZodNumber>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodArray<z.ZodNumber>>
export function Query(
    schema: z.ZodArray<z.ZodBoolean>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodArray<z.ZodBoolean>>
export function Query(
    schema: z.ZodOptional<z.ZodString>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodOptional<z.ZodString>>
export function Query(
    schema: z.ZodOptional<z.ZodNumber>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodOptional<z.ZodNumber>>
export function Query(
    schema: z.ZodOptional<z.ZodBoolean>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodOptional<z.ZodBoolean>>
export function Query(
    schema: z.ZodDefault<z.ZodString>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodDefault<z.ZodString>>
export function Query(
    schema: z.ZodDefault<z.ZodNumber>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodDefault<z.ZodNumber>>
export function Query(
    schema: z.ZodDefault<z.ZodBoolean>,
    options?: RouteParameterOptions
): QueryParameter<z.ZodDefault<z.ZodBoolean>>
export function Query(
    schema: ZodPrimitive = z.string(),
    options?: RouteParameterOptions
): QueryParameter<ZodPrimitive> {
    return {
        location: "query",
        schema: schema,
        isCoercible: isZodCoercible(schema),
        options: {
            includeInSchema: true,
            coerceFunction: JSONCoerce,
            ...options,
        },
    }
}

export function Header(): HeaderParameter<z.ZodString>
export function Header(
    schema: z.ZodString,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodString>
export function Header(
    schema: z.ZodNumber,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodNumber>
export function Header(
    schema: z.ZodBoolean,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodBoolean>
export function Header(
    schema: z.ZodArray<z.ZodString>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodArray<z.ZodString>>
export function Header(
    schema: z.ZodArray<z.ZodNumber>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodArray<z.ZodNumber>>
export function Header(
    schema: z.ZodArray<z.ZodBoolean>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodArray<z.ZodBoolean>>
export function Header(
    schema: z.ZodOptional<z.ZodString>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodOptional<z.ZodString>>
export function Header(
    schema: z.ZodOptional<z.ZodNumber>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodOptional<z.ZodNumber>>
export function Header(
    schema: z.ZodOptional<z.ZodBoolean>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodOptional<z.ZodBoolean>>
export function Header(
    schema: z.ZodDefault<z.ZodString>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodDefault<z.ZodString>>
export function Header(
    schema: z.ZodDefault<z.ZodNumber>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodDefault<z.ZodNumber>>
export function Header(
    schema: z.ZodDefault<z.ZodBoolean>,
    options?: RouteParameterOptions
): HeaderParameter<z.ZodDefault<z.ZodBoolean>>
export function Header(
    schema: ZodPrimitive = z.string(),
    options?: RouteParameterOptions
): HeaderParameter<ZodPrimitive> {
    return {
        location: "header",
        schema: schema,
        isCoercible: isZodCoercible(schema),
        options: {
            includeInSchema: true,
            coerceFunction: JSONCoerce,
            ...options,
        },
    }
}

export function Cookie(): CookieParameter<z.ZodString>
export function Cookie(
    schema: z.ZodString,
    options?: RouteParameterOptions
): CookieParameter<z.ZodString>
export function Cookie(
    schema: z.ZodNumber,
    options?: RouteParameterOptions
): CookieParameter<z.ZodNumber>
export function Cookie(
    schema: z.ZodBoolean,
    options?: RouteParameterOptions
): CookieParameter<z.ZodBoolean>
export function Cookie(
    schema: z.ZodArray<z.ZodString>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodArray<z.ZodString>>
export function Cookie(
    schema: z.ZodArray<z.ZodNumber>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodArray<z.ZodNumber>>
export function Cookie(
    schema: z.ZodArray<z.ZodBoolean>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodArray<z.ZodBoolean>>
export function Cookie(
    schema: z.ZodOptional<z.ZodString>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodOptional<z.ZodString>>
export function Cookie(
    schema: z.ZodOptional<z.ZodNumber>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodOptional<z.ZodNumber>>
export function Cookie(
    schema: z.ZodOptional<z.ZodBoolean>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodOptional<z.ZodBoolean>>
export function Cookie(
    schema: z.ZodDefault<z.ZodString>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodDefault<z.ZodString>>
export function Cookie(
    schema: z.ZodDefault<z.ZodNumber>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodDefault<z.ZodNumber>>
export function Cookie(
    schema: z.ZodDefault<z.ZodBoolean>,
    options?: RouteParameterOptions
): CookieParameter<z.ZodDefault<z.ZodBoolean>>
export function Cookie(
    schema: ZodPrimitive = z.string(),
    options?: RouteParameterOptions
): CookieParameter<ZodPrimitive> {
    return {
        location: "cookie",
        schema: schema,
        isCoercible: isZodCoercible(schema),
        options: {
            includeInSchema: true,
            coerceFunction: JSONCoerce,
            ...options,
        },
    }
}

export function Body(): BodyParameter<z.ZodString>
export function Body(
    schema: typeof String,
    options?: RouteParameterOptions
): BodyParameter<z.ZodString>
export function Body(
    schema: typeof Blob,
    options?: RouteParameterOptions
): BodyParameter<z.ZodType<Blob>>
export function Body(
    schema: typeof ReadableStream,
    options?: RouteParameterOptions
): BodyParameter<z.ZodType<ReadableStream>>
export function Body<S extends z.ZodType>(
    schema: S,
    options?: RouteParameterOptions
): BodyParameter<S>
export function Body(
    schema: ZodBodyable = String,
    options?: RouteParameterOptions
): BodyParameter<z.ZodType> {
    return {
        location: "body",
        schema: schema instanceof z.ZodType ? schema : z.any(),
        schemaOr: schema instanceof z.ZodType ? undefined : schema,
        isCoercible: false,
        options: {
            mediaType: "application/json",
            includeInSchema: true,
            ...options,
        },
    }
}

export function Depends<R>(
    dependency: Dependency<R, any, any>,
    options?: RouteParameterOptions
): DependsParameter<z.ZodType<R>> {
    return {
        location: "$depends",
        dependency: dependency,
        isCoercible: false,
        options: {
            includeInSchema: true,
            ...options,
        },
    }
}

export async function parseArgs<Ps extends RouteParameters<E>, E = undefined>(
    parameters: Ps,
    baseArgs: ArgsOf<{}, E>,
    rawParameters?: {
        params?: Record<string, string>
        queries?: Record<string, string[]>
        cookies?: Record<string, string>
    }
): Promise<ParseArgsInfo<Ps, E>> {
    const { req } = baseArgs
    const { params, queries, cookies } = rawParameters ?? {}

    let success = true
    const args: Record<string, any> = {}
    const errors: ParseArgsError[] = []

    for (const [name, _parameter] of Object.entries(parameters)) {
        let parseOut!: z.SafeParseSuccess<unknown> | z.SafeParseError<unknown>

        if (_parameter.location == "path") {
            const parameter = _parameter as PathParameter<ZodPrimitive>
            let input: string | undefined = (params ?? {})[parameter.options.altName ?? name]
            parseOut = parameter.schema.safeParse(
                input && parameter.isCoercible ? parameter.options.coerceFunction(input) : input
            )
        } else if (_parameter.location == "query") {
            const parameter = _parameter as QueryParameter<ZodPrimitive>
            let input: string[] | string = (queries ?? {})[parameter.options.altName ?? name] ?? []
            if (!(parameter.schema instanceof z.ZodArray)) input = input[0]
            parseOut = parameter.schema.safeParse(
                parameter.isCoercible ? parameter.options.coerceFunction(input as string[]) : input
            )
        } else if (_parameter.location == "header") {
            const parameter = _parameter as HeaderParameter<ZodPrimitive>
            let input =
                req.headers.get(parameter.options.altName ?? name.replace(/_/g, "-")) ?? undefined
            parseOut = parameter.schema.safeParse(
                input && parameter.isCoercible ? parameter.options.coerceFunction(input) : input
            )
        } else if (_parameter.location == "cookie") {
            const parameter = _parameter as CookieParameter<ZodPrimitive>
            let input = (cookies ?? {})[parameter.options.altName ?? name]
            parseOut = parameter.schema.safeParse(
                input && parameter.isCoercible ? parameter.options.coerceFunction(input) : input
            )
        } else if (_parameter.location == "body") {
            const parameter = _parameter as BodyParameter<ZodPrimitive>
            if (parameter.schemaOr) {
                let input: any
                if (parameter.schemaOr === String) input = await req.text()
                else if (parameter.schemaOr === Blob) input = await req.blob()
                else input = req.body // typeof ReadableStream
                parseOut = { success: true, data: input }
            } else {
                let input = await req.json()
                parseOut = parameter.schema.safeParse(input)
            }
        } else if (_parameter.location == "$depends") {
            const parameter = _parameter as DependsParameter<z.ZodType>
            const dependency = parameter.dependency
            const dependencyParseInfo = await parseArgs(
                dependency.parameters,
                baseArgs,
                rawParameters
            )

            success &&= dependencyParseInfo.success
            if (dependencyParseInfo.success)
                args[name] = await parameter.dependency.handler(dependencyParseInfo.args)
            else errors.push(...dependencyParseInfo.errors)
            continue
        }

        success &&= parseOut.success
        if (parseOut.success) args[name] = parseOut.data
        else {
            errors.push({
                location: _parameter.location,
                name: name,
                issues: parseOut.error.issues,
            })
        }
    }
    return { success, errors, args: args as ArgsOf<Ps, E> }
}
