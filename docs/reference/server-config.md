# Server configuration

Here is the full options of `server.config.js` file

```js
export default {
  /**
   * Indicate where bundle files are located
   */
  distPath: 'dist',

  /**
   * Directory for required SSR files
   */
  uvueDir: '.uvue',

  /**
   * Adapter to use for server (default: ConnectAdapter)
   */
  adapter: null,

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
  devServer: {
    middleware: {},
    hot: {},
  },

  /**
   * Vue SSR renderer otions
   */
  renderer: {
    cache: null,
    directives: [],
    shouldPrefetch() {},
    shouldPreload() {},
  },

  /**
   * Configuration for static generation
   */
  static: {
    paths: [],
    scanRouter: true,
    params: {},
  },

  /**
   * For dev only: watch for files changes and reboot server
   */
  watch: ['server.config.js'],
  watchIgnore: ['dist/**/*'],
};
```
