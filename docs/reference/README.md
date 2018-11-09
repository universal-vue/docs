# Reference

## Context

This context object will be passed to all your UVue plugins hooks. So, this object will
be avalaible in your `asyncData()` method, `fetch()` method, `onHttpRequest()` action
and in your defined middlewares.

| Variable name |        Type         | Description                                                                                                  |
| ------------- | :-----------------: | ------------------------------------------------------------------------------------------------------------ |
| `app`         |    Vue instance     | The main component of the application (only after `beforeCreate()` hook)                                     |
| `router`      | Vue router instance | Router of the application. [Docs](https://router.vuejs.org/api)                                              |
| `store`       |    Vuex instance    | Vuex store if installed. [Docs](https://vuex.vuejs.org/api)                                                  |
| `redirect`    |      Function       | Simple function to redirect to a specific page. [Docs](/reference/helpers.html#redirect)                     |
| `error`       |      Function       | Simple function to display an error page: [Docs](/reference/helpers.html#throw-an-error)                     |
| `url`         |       String        | URL of current page.                                                                                         |
| `req`         |   IncomingMessage   | **SSR only** [Docs](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_incomingmessage) |
| `res`         |   ServerResponse    | **SSR only** [Docs](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_serverresponse)  |

## Route special variables

Below variables will be available in a route context (like `asyncData()`, `fetch()` method, `onHttpRequest()` action
and in your defined middlewares). If you write your own UVue plugin, these will be avalaible in your `routeResolve()` and
`routeError()` hooks.

| Variable name |  Type  | Description                                                                                      |
| ------------- | :----: | ------------------------------------------------------------------------------------------------ |
| `route`       | Route  | The current route object. See: [Route Object](https://router.vuejs.org/en/api/route-object.html) |
| `params`      | Object | Alias of `route.params`                                                                          |
| `query`       | Object | Alias of `route.query`                                                                           |

## Process variables

Below variables will be replaced during Webpack bundling with defined values and depends on the build context.

| Variable name    | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `process.dev`    | Return `true` in development mode, `false` otherwise                                        |
| `process.test`   | Is `true` if in test environment                                                            |
| `process.prod`   | Return `true` in production mode, `false` otherwise                                         |
| `process.spa`    | Return `true` in SPA mode, `false` in SSR mode                                              |
| `process.ssr`    | Return `true` in SSR mode, `false` in SPA mode                                              |
| `process.client` | In SSR mode only: return `true` if in client rendering, `false` if in server side rendering |
| `process.server` | In SSR mode only: return `true` if in server side rendering, `false` otherwise              |

:::tip
To inject environment variables see the official [Vue CLI documentation](https://cli.vuejs.org/guide/mode-and-env.html)
:::

## Server context

This context is passed to some [server plugins hooks](/plugins/server.html)

| Variable name     |      Type       | Description                                                                                                  |
| ----------------- | :-------------: | ------------------------------------------------------------------------------------------------------------ |
| `url`             |     String      | URL of current page.                                                                                         |
| `req`             | IncomingMessage | **SSR only** [Docs](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_incomingmessage) |
| `res`             | ServerResponse  | **SSR only** [Docs](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_serverresponse)  |
| `redirected`      |     Boolean     | Indicate if current request is redirected                                                                    |
| `statusCode`      |     Number      | HTTP status code to send to client from your Vue application                                                 |
| `bodyAdd`         |     String      | String to add before `</body>`                                                                               |
| `headAdd`         |     String      | String to add before `</head>`                                                                               |
| `data.state`      |     String      | Data from server side for Vuex store                                                                         |
| `data.components` |     String      | Data from server side for page components                                                                    |

## Server response

This object is passed to some [server plugins hooks](/plugins/server.html)

| Variable name |  Type  | Description                        |
| ------------- | :----: | ---------------------------------- |
| `body`        | String | HTML to send to client             |
| `status`      | Number | HTTP status code to send to client |
