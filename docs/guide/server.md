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

## HTTP/2

You can enable HTTP/2 server with a simple comfiguration:

In `server.config.js`:

```js
export default {
  http2: true,
};
```

::: warning
You need an [HTTPS](#https) configuration to make this work!
:::

## Vue renderer / directives

For Vue directives you have to rewrite them make them compatible with SSR. You can define
these rewrites in server config file.

In `server.config.js`:

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
  watch: ['server.config.js', 'src/server/**/*.js'],
  watchIgnore: ['node_modules'],
};
```

You can also type `rs` in your terminal to reload the server.
:::

See more informations:

- [Dev middleware options](https://github.com/webpack/webpack-dev-middleware#options)
- [Hot middleware options](https://github.com/webpack-contrib/webpack-hot-middleware#documentation)

## Adapters

By default UVue use a [connect](https://github.com/senchalabs/connect#readme) instance to process
HTTP requests and send responses to clients, but you can change this very easly.

### Use Express

First install dependency:

```bash
npm install express
```

Then setup your server configuration to use `ExpressAdapter`, in `server.config.js`:

```js
import { ExpressAdapter } from '@uvue/server';

export default {
  adapter: ExpressAdapter,
};
```

### Use Fastify

First install dependency:

```bash
npm install fastify
```

Then setup your server configuration to use `FastifyAdapter`, in `server.config.js`:

```js
import { FastifyAdapter } from '@uvue/server';

export default {
  adapter: FastifyAdapter,
};
```

:::tip 
`request` and `reply` objects from Fastify framework will be injected to the [`context`](/reference/#context) object.
:::

:::tip 
Current [live demo](http://uvue.yabab.net/) use fastify, you can check source code here:
[universal-vue/examples](https://github.com/universal-vue/examples)
:::

### Use Koa

First install dependencies:

```bash
npm install koa koa-mount koa-static koa-compress
npm install -D koa-webpack # For ssr:serve command
```

Then setup your server configuration to use `KoaAdapter`, in `server.config.js`:

```js
import { KoaAdapter } from '@uvue/server';

export default {
  adapter: KoaAdapter,
};
```

:::tip 
`ctx` object from Koa framework will be injected to the [`context`](/reference/#context) object
:::
