# Vue CLI plugins

UVue try to be compatible with most populars Vue CLI plugin. If you don't
find your favorite plugin, please feel free to contribute with a PR or ask
a feature request on github repository.

If you will install UVue after all these plugins, then you will have nothing
to do, all is handled automatically at installation.

On the other case, you can try `ssr:fix` command: it will try to fix your
code correctly.

And because shit always happen: if you need to fix code manually, here are the required
steps to have a working code:

## PWA

In `src/registerServiceWorker.js`, add a check to main condition with
`process.client`:

```js
if (process.env.NODE_ENV === 'production' && process.client) {
  // ...
}
```

## TypeScript

TODO

## i18n

Like router and vuex plugins, this plugin need to export a factory function.

In `src/i18n.js`:

```js
import VueI18n from 'vue-i18n';

export default () => {
  return new VueI18n({
    //...
  });
};
```

Then you need to call this function in your main factory app function:

In `src/main.js`

```js
//...
import createI18n from './i18n';

export default () => {
  const i18n = createI18n();

  return new Vue({
    //...
    i18n,
    //...
  });
};
```

## Apollo

You need to inform Vue Apollo plugin that your application can perform SSR:

In `src/vue-apollo.js`:

```js
//...
const defaultOptions = {
  //...
  ssr: !!process.server,
  //...
};
//...
```

Then you need to create a UVue plugins to handler SSR data from apollo:

In `src/plugins/apollo.js`:

```js
import 'isomorphic-fetch';
import Vue from 'vue';
import ApolloSSR from 'vue-apollo/ssr';
import App from '../App.vue';

if (process.server) {
  Vue.use(ApolloSSR);
}

export default {
  async routeResolve({ app, ssr, route, store, error, routeComponents }) {
    if (process.server) {
      try {
        await ApolloSSR.prefetchAll(app.$apolloProvider, [App, ...routeComponents], {
          route,
          store,
        });
        ssr.bodyAdd = `<script>window.__APOLLO_STATE__=${JSON.stringify(
          ApolloSSR.getStates(app.$apolloProvider),
        )}</script>`;
      } catch (err) {
        error(err);
      }
    }
  },
};
```

As you can see, Vue Apollo use `fetch()` to do ajax calls, this will not be available with NodeJS (server-side).
So you have to install a polyfill called `isomorphic-fetch`:

```bash
npm install -S isomorphic-fetch
```

Finally, setup this plugin to UVue:

In `uvue.config.js`:

```js
export default {
  plugins: ['@/plugins/apollo'],
};
```
