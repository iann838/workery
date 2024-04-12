# Adapters

Module: `apertum/adapters`

Apertum requires adapters to run on different runtimes. The Cloudflare Workers adapter comes built-in, new adapters are expected to be added in the future, PRs are always welcomed. 

## Write your own adapter

Apertum applications has a `handle` method, this is the request handler for the app, the signature looks as follow:

```ts
async handle(baseArgs: ArgsOf<{}, G>) => Promise<Response>
```

The `baseArgs` param takes the form of `{ req: Request } & G`, the generic `G` being customizable by the user (e.g. Cloudflare workers `env` and `ctx` params). An adapter **must** process the runtime input and provide at least the `req` arg for the handler. The `req` param is of type `Request` of the global NodeJS Web API.

For example an AWS Lambda adapter will roughly look like:

```ts
type AwsLambdaEvent = ...
type AwsLambdaContext = ...

export function adaptAwsLambda(app: Apertum<{
    evt: AwsLambdaEvent;
    ctx: AwsLambdaContext
}>) {
    return {
        async handler (evt: AwsLambdaEvent, ctx: AwsLambdaContext) {
            const req = convertRequest(evt)
            const res = app.handle({ req, evt, ctx })
            return convertResponse(res)
        },
    }
}
```
```ts
export default adaptAwsLambda(app)
```
