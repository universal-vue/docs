# UVue

## Core plugins

TODO: Goto Usage section

## Write your own plugin

TODO

```js
export default {
  beforeCreate(context) {},

  async beforeStart(context) {},

  async routeResolve(context) {},

  async routeError(error, context) {},

  async beforeReady(context) {},

  ready(context) {},
};
```

In each method you can use `this.$options` to get current
plugin options defined in `uvue.config.js`

:::warning
Use `this` with precaution: data in it will ba shared across all
HTTP requests
:::
