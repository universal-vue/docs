# Helpers

## Redirect

A simple function to redirect to a specific page that works on client and server side:

```js
export default {
  async asyncData({ redirect }) {
    redirect({ to: '' }, 302);
  },

  methods: {
    onClick() {
      this.$redirect({ to: '/some-path' });
    },
  },
};
```

:::tip

- The first argument can be a `location` like in [`router.go()` method](https://router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort)
- The second argument is the HTTP status code (301 by default)

:::

## Throw an error

:::warning
This needs `@uvue/core/plugins/errorHandler` installed on your peoject
:::

A simple function to throw an error

```js
export default {
  async asyncData({ error }) {
    error(new Error(`I'm a teapot`), 418);
  },

  methods: {
    triggerError() {
      this.$error(new Error(`I'm a teapot`), 418);
    },
  },
};
```

:::tip

- First argument is an object or a string
- Second argument is the HTTP status code (500 by default)

:::

## Vue Class components

TODO
