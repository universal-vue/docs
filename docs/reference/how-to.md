# How to

:::warning 
Work in progress!
:::

:::tip 
You can take a look at the [UVue demo](http://uvue.yabab.net), all source code are published
in [universal-vue/examples](https://github.com/universal-vue/examples) repository!
:::

## Display an error page with error handler

- [Create an error page](https://github.com/universal-vue/examples/blob/master/src/components/ErrorPage.vue)
- [Display it if an error is caught](https://github.com/universal-vue/examples/blob/master/src/App.vue#L4-L5)

## Customize server error page

- [Create an error page](https://github.com/universal-vue/examples/blob/master/src/server/error.html)
- [Create a server plugin to display it](https://github.com/universal-vue/examples/blob/master/src/server/errorPlugin.js)
- [Install it](https://github.com/universal-vue/examples/blob/master/server.config.js#L18)

## Add a navigation loader

- [UVue plugin](https://github.com/universal-vue/examples/blob/master/src/plugins/navLoader.js)

## Add a SPA loader

- [Create a loader with HTML and CSS](https://github.com/universal-vue/examples/blob/master/src/spa-loading.html)
- [Install it on main template](https://github.com/universal-vue/examples/blob/master/src/index.html#L9-L12)
- [Create a UVue plugin to remove it when app is ready](https://github.com/universal-vue/examples/blob/master/src/plugins/spaLoader.js)

## Run animations when route change

**With CSS**

- [Vue Router official documentation](https://router.vuejs.org/guide/advanced/transitions.html)

**With JS**

- [Create some animations](https://github.com/universal-vue/examples/blob/master/src/effects.js#L1-L63)
- [Install them on your pages](https://github.com/universal-vue/examples/blob/master/src/views/AsyncData.vue#L12-L15)

## Use with a protected API (auth)

- [Sample API](https://github.com/universal-vue/examples/blob/master/src/server/api.js)
- [HTTP client with Axios for your Vue app](https://github.com/universal-vue/examples/blob/master/src/plugins/httpClient.js)
- [Login form](https://github.com/universal-vue/examples/blob/master/src/views/Profile.vue)
- [Get private data](https://github.com/universal-vue/examples/blob/master/src/views/Private.vue)
- [Load user to Vuex if already logged](https://github.com/universal-vue/examples/blob/master/uvue.config.js#L4-L23)
- [Check user is logged to access to private page](https://github.com/universal-vue/examples/blob/master/src/router.js#L42-L54)

## Have same router as Nuxt

You can try the [Auto routing](https://github.com/ktsn/vue-cli-plugin-auto-routing) Vue CLI plugin to have the same behavior.

## Use with Vuetify A La Carte

You will need to declare the needed transpile dependency:

In `vue.config.js`

```js
module.exports = {
  transpileDependencies: [/^vuetify/],
};
```
