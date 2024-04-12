# Routing

Module: `apertum/routing`

This page is for reference purpose only, users are expected to use this module directly.

Apertum uses a tree-based route matching approach. This module has 3 main classes: `Route`, `Router`, and `RouteNode`.

## Router

Each application has an internal `Router`, everytime the application adds a route, it is built and creates an instance of `Route` pushed to the router.

Each router has an internal matcher composed of a tree-like hierarchy of `RouteNode`s.

## RouteNode

Route nodes may have `{}` as identifier, these are "path params" nodes and will match any text.

Each route node has an HTTP method record, if route is found but method does not match, it returns a value that the application will interpret and respond with `405 Method Not Allowed`.
