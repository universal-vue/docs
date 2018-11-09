# Plugins

UVue is composed of multiple plugins to help you start with Vue SSR.

## UVue

To use an UVue plugin, write in your `uvue.config.js`:

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
