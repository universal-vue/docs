# UVue

Here is a quick presentation of core UVue plugins. They are described in
[usage](/guide/usage.html) section of this documentation.

## Core plugins

- [Async Data](/guide/usage.html#async-data): Useful to fetch some data from an API and inject it
  to a Vuex store or directly to current page component.
- [Vuex](/guide/usage.html#vuex): Same as asyncData but only for Vuex. This plugin will add a global
  action to act on each HTTP request.
- [Middlewares](/guide/usage.html#middlewares): To perform checks before a route is rendered.
- [Error handler](/guide/usage.html#error-handler): To catch errors from plugins and display an error
  page.

## Write your own plugin

An UVue plugin is just a plain JS object with methods defined. Each method is a hook
to do some actions during SSR processes.

```js
export default {
  // Befoe new Vue is called: good place to define some routes or vuex modules
  beforeCreate(context) {
    // Warning: context.app is not already defined here!
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
  async routeError(error, context) {
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

In each method you can use `this.$options` to get current plugin options defined in `uvue.config.js`

:::warning
Use `this` with precaution: data in it will ba shared across all
HTTP requests on server side.
:::
