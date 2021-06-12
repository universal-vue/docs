# UVue

Here is a quick presentation of core UVue plugins. They are described in
[usage](/guide/usage.html) section of this documentation.

## Core plugins

### [Async Data](/guide/usage.html#async-data)

Useful to fetch some data from an API and inject it to a Vuex store or directly to current page component.

### [Vuex](/guide/usage.html#vuex)

Same as asyncData but only for Vuex. This plugin will add a global action to act on each HTTP request.

Possible options:

```js
export default {
  plugins: [
    [
      '@uvue/plugins/vuex',
      {
        // Enable or disable `fetch()` methods on page components
        fetch: false,

        // Enable or disable `onHttpRequest()` action on your main Vuex store
        onHttpRequest: true,
      },
    ],
  ],
};
```

### [Prefetch](/guide/usage.html#vue-serverprefetch-hook)

Fetch your data at component level (and not at route level). You can use `this` in this hook.

### [Middlewares](/guide/usage.html#middlewares)

To perform checks before a route is rendered.

Possible options:

```js
export default {
  plugins: [
    [
      '@uvue/plugins/middlewares',
      {
        // You can define global middlewares (for each routes) here
        middlewares: [],
      },
    ],
  ],
};
```

### [Error handler](/guide/usage.html#error-handler)

To catch errors from plugins and display an error
page.

## Write your own plugin

An UVue plugin is just a plain JS object with methods defined. Each method is a hook
to do some actions during SSR processes.

```js
export default {
  // When plugin is installed to the stack
  install(options) {
    // options will be data sent in uvue.config.js
    // ...
  },

  // Before new Vue is called: good place to define some routes or Vuex modules
  async beforeCreate(context, inject, vueOptions) {
    // Warning: context.app is not already defined here!
    //...
  },

  // After root component was created
  async created(context) {
    // context.app is now defined and equal to your root component (e.g. App.vue)
    //...
  },

  // App is now created, this hook is called before router is ready
  async beforeStart(context) {
    //...
  },

  // Before next page is created: good place to fetch some data
  async routeResolve(context) {
    //...
  },

  // When an error is thrown during a routeResolve() call
  async routeError(context, error) {
    //...
  },

  // When a error is thrown during plugins hooks
  catchError(context, error) {
    //...
  },

  // Before app is mounted (client-side) or ready to be sent to client (server-side)
  async beforeReady(context) {
    //...
  },

  // When everything is ready to go !
  ready(context) {
    //...
  },
};
```

Please take a look to [UVue core plugins](https://github.com/universal-vue/uvue/tree/master/packages/%40uvue/core/plugins) already done

:::warning 
Use `this` with precaution: data in it will ba shared across all
HTTP requests on server side.
:::
