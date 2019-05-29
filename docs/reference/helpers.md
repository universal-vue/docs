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

- The first argument can be a `location` like in [`router.push()` or `router.replace()` methods](https://router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort)
- The second argument is the HTTP status code (301 by default)

:::

## Throw an error

:::warning 
This needs `@uvue/core/plugins/errorHandler` plugin installed on your project
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

## Vue Class Components

To use Vue Class components in your application you need to include `@uvue/core/vueclass`
in your `src/main.ts` file:

```ts
import '@uvue/core/vueclass';
```

With that, Vue router and UVue plugins hooks will be correctly registered:

```ts
import Component from 'vue-class-component';

@Component
export default class PageComponent extends Vue {
  middlewares = [
    // ...
  ];

  async asyncData() {
    // ...
  }

  async fetch() {
    // ...
  }
}
```

This file will import some important types definition too.

### Vue meta

If you use `vue-meta` package you can register its hook too:

```ts
import Vue from 'vue';
import VueMeta from 'vue-meta';
import Component from 'vue-class-component';

Vue.use(VueMeta, {
  keyName: 'head',
});

Component.registerHooks(['head']);
```

And then use it in your page components:

```ts
import Component from 'vue-class-component';

@Component
export default class PageComponent extends Vue {
  head() {
    return {
      title: 'Hello world!',
    };
  }
}
```

You will have to setup types definitions too, in `src/vue-shims.d.ts`:

```ts
import { MetaInfo } from 'vue-meta';

/**
 * Vue meta
 */
declare module 'vue/types/vue' {
  interface Vue {
    metaInfo?: MetaInfo | (() => MetaInfo);
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    metaInfo?: MetaInfo | (() => MetaInfo);
  }
}
```
