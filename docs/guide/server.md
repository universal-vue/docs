# Server

You can configure server behaviors with a simple file `server.config.js` located in the root
folder of your application.

## Plugins

Like UVue plugins, you can install or write your own plugins for server side.
These plugins can add middlewares to HTTP server, log things during each HTTP requests, or rewrite
HTML output sended to clients.

See more informations: [Server plugins](/plugins/server.html)

## HTTPS

In `server.config.js`:

```js
export default {
  https: {
    key: '',
    cert: '',
  },
};
```

## Vue renderer / directives

For Vue directives you have to rewrite them make them compatible with SSR. You can define
these rewrites in server config file:

```js
export default {
  renderer: {
    directives: {
      // Place your directives here
    },
  },
};
```

You can also customize cache used by renderer (default to `lru-cache`) or change
`preload` and `prefetch behaviors`:

```js
export default {
  renderer: {
    cache: null,
    shouldPrefetch: null,
    shouldPreload: null,
  },
};
```

More informations:

- [Custom directives with SSR](https://ssr.vuejs.org/guide/universal.html#access-to-platform-specific-apis)
- [API Directives](https://ssr.vuejs.org/api/#directives)
- [Cache](https://ssr.vuejs.org/guide/caching.html)
- [shouldPreload / shouldPrefetch](https://ssr.vuejs.org/api/#shouldpreload)

## Dev server

In development mode, you can customize HMR behaviors too:

```js
export default {
  devServer: {
    middleware: {
      // ...
    },
    hot: {
      // ...
    },
  },
};
```

:::tip
You can watch for files changes and reload automatically your server if changes occurs.

In `server.config.js`:

```js
export default {
  watch: ['src/server/**/*.js'],
};
```

You can also type `rs` in your terminal to reload the server.
:::

See more informations:

- [Dev middleware options](https://github.com/webpack/webpack-dev-middleware#options)
- [Hot middleware options](https://github.com/webpack-contrib/webpack-hot-middleware#documentation)
