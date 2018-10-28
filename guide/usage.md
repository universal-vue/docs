# Usage

UVue offers some basic tools to build a SSR application more easly
Most of available API in UVue is exposed with plugins. Bellow sections will
indicate path to these plugins.

You can use them when they are installed in `uvue.config.js` located in the root
folder of your application:

```js
export default {
  plugins: [
    // Install asyncData plugin
    '@uvue/core/plugins/asyncData',

    // Install Vuex plugin
    [
      '@uvue/core/plugins/vuex',
      {
        // Some options...
      },
    ],
  ],
};
```

:::tip
Order of plugins matters
:::

## Vuex

> `@uvue/core/plugins/vuex`

This plugin will offer you the possibility to inject data from server-side
to your Vuex store.

**`fetch()` method**

In a page component (e.g. `src/views/Home.vue`) :

```js
export default {
  async fetch({ store }) {
    const data = await api.get('some-data');

    // Populate your vuex store
    store.commit('SET_DATA', data);
  },
};
```

:::warning
This method is only called on your pages components (defined in your router)
:::

**`onHttpRequest()` store action**

In your `src/store.js` store file you add an action called `onHttpRequest`
This action will be called before your application is ready. The second argument is a
[`context` variable](/reference/). The purpose of this action is to fill your Vuex store
on each HTTP requests and will not be not called on future client navigations.

In SPA mode too this action is called before application is ready.

In your Vuex store (e.g. `src/store.js`):

```js
export default () => {
  return new Vuex.Store({
    actions: {
      async onHttpRequest({ commit }) {
        const data = await api('/some-data');
        commit('SET_DATA', data);
      },
    },
  });
};
```

:::warning
This method is only called on a real HTTP request to show current page. Future navigation
(from client side) will not trigger this action.
:::

:::danger
For your Vuex modules, don't forget to init state with a function:

```js
export default {
  namespaced: true,
  state: () => ({
    // Some data...
  }),
};
```

:::

## Async data

> `@uvue/core/plugins/asyncData`

You can setup an `asyncData()` method on your pages components. This method will be
called before the page is created. You can the same as `fetch()` method, plus inject
some data directly to your pages copmponents.

This method receive a [context](/reference/) as first argument and you can populate your vuex store and your component data.

Example:

```js
export default {
  async asyncData({ store }) {
    const data = await api.get('some-data');

    // Of course you can populate your Vuex store
    store.commit('SET_DATA', data.vuex);

    // And send data to current component
    return {
      foo: data.foo,
    };
  },
};
```

:::warning
You cannot use `this` in this method, because the component is not created yet. This method is only
called on your pages components (defined in your router)
:::

## Middlewares

> `@uvue/core/plugins/middlewares`

You can apply global or per-route middlewares. The main purpose of this plugin is to quickly setup
functions to run before all others plugins (e.g. check authorizations on your routes):

In `src/some/middleware.js`

```js
export default async ({ store, redirect }) => {
  // Use is not logged
  if (!store.getters.user) {
    // Here we use error handler system
    error('Forbidden', 403);
  }
};
```

In `src/views/ProtectedPage.vue`

```js
import checkUser from '@/some/middleware';

export default {
  middlewares: [checkUser],

  async asyncData() {
    // ... fetch data from protected API route
  },
};
```

You can also apply global middlewares called on each routes:

In `uvue.config.js`

```js
export default {
  plugins: [
    [
      '@uvue/core/plugins/middlewares',
      {
        middlewares: [globalMiddleware],
      },
    ],
  ],
};
```

:::tip
It's a good practice to install this plugin in first position
:::

## Metas

[Vue meta](https://github.com/declandewet/vue-meta) plugin is automatically managed by UVue in SSR.
Things to do to use this plugin is to install it:

```bash
npm install vue-meta
```

Then you need to setup it in your application:

```js
import VueMeta from 'vue-meta';

Vue.use(VueMeta, {
  // some options
});
```

To use it, you can define global metas (applied to all routes) in your `src/App.vue` file:

```js
export default {
  metaInfo: {
    title: 'App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      // Use vmid here for pages that needs to override this value
      { vmid: 'description', name: 'description', content: 'My awesome application' },
    ],
  },
};
```

And finally you can override these settings on each page component:

```js
export default {
  metaInfo: {
    title: 'About !',
    meta: [{ vmid: 'description', name: 'description', content: 'About my application' }],
  },
};
```

[Official docs](https://github.com/declandewet/vue-meta)

## Error handler

> `@uvue/core/plugins/errorHandler`

TODO

## SPA paths

In some cases you don't need or want SSR for some pages of your application (e.g. administration dashboard, logged pages...)

It's possible to disable it with a simple configuration, in `server.config.js`:

```js
export default {
  spaPaths: ['/admin', '/admin/**/*'],
};
```

As you can see glob patterns are supported.

## Generate static website

You can generate a static website with a simple command:

```bash
npm run ssr:static
```

Default configuration will parse your application routes and generate a HTML file for each.

You can configure pre-rendering behavior in `server.config.js`:

```js
export default {
  // Default values
  static: {
    paths: [],
    scanRouter: true,
    params: {},
  },
};
```

**Options**

- `paths`: Useful if `scanRouter` is disabled or a route is not rendered. Fill this
  variable with an array of route paths
- `scanRouter`: Automatic fetch routes paths from you application router (`src/router.js`)
- `params`: Define possibles values for your dynamic routes.
  Example:
  ```js
  {
    path: '/:lang/about',
    component: AboutPage,
  }
  ```
  In your config:
  ```js
  {
    params: {
      lang: [null, 'en', 'fr'],
    },
  }
  ```
  Will generate these pages :
  ```
  /about
  /en/about
  /fr/about
  ```

## Use SSR non-compatible libraries

You will regulary see some libraries are not SSR compatible. In this case your server
side will throw an error of type `window is unedefined`.

To avoid these issues you will have some options:

**A JS library require window on import**

Use `process.client` variable only require lib on client side:

```js
if (process.client) {
  require('some/lib/that/require/window');
}
```

Or you can try to load your library in `beforeMount()` or `mounted()` in your components
with a dynamic import:

```js
export default {
  beforeMound() {
    import('some/lib/that/require/window').then(module => {
      // ...
    });
  },
};
```

Finally, you can use `imports` config in `uvue.config.js` to only import a script
on client side:

```js
export default {
  imports: [
    // Import your lib automatically
    ['some/lib/that/require/window', { ssr: false }],
  ],
};
```

**A Vue component is not SSR compatible**

Use vue-no-ssr package to not render a component on server side:

```html
<template>
  <div>
    <no-ssr>
      <NotCompatibleWithSSR/>
    </no-ssr>
  </div>
</template>
```

Some good articles on it:

- https://ssr.vuejs.org/guide/universal.html
- https://blog.lichter.io/posts/the-guide-to-write-universal-ssr-ready-vue-compon

## Modern build

TODO
