# Helpers

Module: `apertum/helpers`

List of helper functions.

## jsonCoerce(value)

Attempts to JSON parse the value and returns it, otherwise return the value itself. Used for automatic coercion internally by non-body parameters.

## isJsonCoercible(schema)

Checks if the schema is qualified for automatic coercion. Used for automatic coercion internally by non-body parameters.

## createResolveLater()

Returns a pair of `[resolve, later]`.

- `later` adds a then promise to the resolving promise.
- `resolve` will mark the promise as resolved and executes all the then-ed promises.

Used internally to support dependency after-request hooks.

## baseExceptionHandler(_, e)

Base exception handler for apertum applications. Logs the error with `console.error` and returns an HTTP 500 Internal Server Error `Response`.
