# Server configuration

Here is the full options of `server.config.js` file

```js
export default {
  /**
   * Define server plugins
   */
  plugins: [
    // Use a plugin without options
    'some/plugin',

    // With some options
    ['some/plugin', { ...options }],
  ],

  /**
   * Define SPA paths
   */
  spaPaths: [
    // glob patterns are supported
    '/some/path/**',
  ],

  /**
   * HTTPS options
   */
  https: {
    key: '',
    cert: '',
  },

  /**
   * Dev server options
   */
  devServer: {},

  /**
   * Vue SSR renderer otions
   */
  renderer: {
    cache: null,
    directives: [],
    shoudPrefect() {},
    shoudPreload() {},
  },
};
```
