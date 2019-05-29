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

For most part you don't have to do anything. If you want to use
[Vue Class Components](https://github.com/vuejs/vue-class-component) you have
to include `@uvue/core/vueclass` in your `src/main.ts`. This file will register UVue plugins hooks and
will import automatically definitions to use UVue correctly.

[See here for more informations](/reference/helpers.html#vue-class-components)

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

Then you need to define UVue Apollo plugin:

```bash
npm install -S isomorphic-fetch
```

Finally, setup this plugin to UVue:

In `uvue.config.js`:

```js
export default {
  plugins: ['@uvue/core/plugins/apollo'],
};
```
