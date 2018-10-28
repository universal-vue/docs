# Plugins

UVue is composed of multiple plugins to help you start with Vue SSR.

## UVue

To install a plugin, write in your `uvue.config.js`:

```js
export default {
  plugins: [
    '@uvue/core/plugins/asyncData',
    [
      '@uvue/core/plugins/vuex',
      // Send options to plugin
      {
        fetch: true,
        onHttpRequest: true,
      },
    ],
  ],
};
```

**asyncData**: Inject data from server side to page components
`@uvue/core/plugins/asyncData`

**vuex**: Method and action to populate a Vuex store
`@uvue/core/plugins/vuex`

**middlewares**: Run functions on each pages
`@uvue/core/plugins/middlewares`

**errorHandler**: Catch errors
`@uvue/core/plugins/errorHandler`

## Server

To use a server plugin, write in your `server.config.js`:

```js
export default {
  plugins: [
    '@uvue/server/plugins/static',
    [
      '@uvue/server/plugins/cookie',
      // Send options to plugin
      {
        secret: 'secret value for cookies',
      },
    ],
  ],
};
```

**static**: Middleware to serve bundled files
`@uvue/server/plugins/static`

**gzip**: Middleware to compress assets
`@uvue/server/plugins/gzip`

**cookie**: Middleware to parse HTTP cookies
`@uvue/server/plugins/cookie`

**modernBuild**: Transform final HTML output to use modern builds
`@uvue/server/plugins/modernBuild`
