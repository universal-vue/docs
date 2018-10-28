# Reference

## Context

TODO

| Variable name |        Type         | Description                                                                              |
| ------------- | :-----------------: | ---------------------------------------------------------------------------------------- |
| `app`         |    Vue instance     | The main component of the application                                                    |
| `router`      | Vue router instance | Router of the application. [Official docs](https://router.vuejs.org/api)                 |
| `store`       |    Vuex instance    | Vuex store if installed. [Official docs](https://vuex.vuejs.org/api)                     |
| `redirect`    |      Function       | Simple function to redirect to a specific page. [Docs](/reference/helpers.html#redirect) |
| `error`       |      Function       | Simple function to display an error page: [Docs](/reference/helpers.html#throw-an-error) |
| `url`         |       String        | URL of current page.                                                                     |
| `req`         |   IncomingMessage   | **SSR only**                                                                             |
| `res`         |   ServerResponse    | **SSR only**                                                                             |

## Route context

TODO

| Variable name |  Type  | Description                                                                                      |
| ------------- | :----: | ------------------------------------------------------------------------------------------------ |
| `route`       | Route  | The current route object. See: [Route Object](https://router.vuejs.org/en/api/route-object.html) |
| `params`      | Object | Alias of `route.params`                                                                          |
| `query`       | Object | Alias of `route.query`                                                                           |

## Process variables

TODO

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
To inject another environment variables see the official [Vue CLI documentation](https://cli.vuejs.org/guide/mode-and-env.html)
:::
