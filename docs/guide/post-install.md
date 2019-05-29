# Post installation notes


At installation, this plugin will try to fix your current project code to make it compatible
with Vue SSR. If you install others Vue CLI plugin after UVue, you have to run `ssr:fix` command.

But you need to keep in mind some various things to succeed in building SSR apps:

[[toc]]

## Avoid stateful singletons

Avoid to create singletons in the global scope, beacuse they will be shared accross all
HTTP requests and so accross all users that use your application.

You can read more [on the official documentation](https://ssr.vuejs.org/guide/structure.html#avoid-stateful-singletons)

### Vue plugins

Basically you'll see this plugin overwrite some of your code to avoid that for some Vue plugins.
For example, Vue Router: instead of defining a `new Router()` in , we need to create a function
that return the new Router instance:

```js
export default () => {
  return new Router(/* ... */);
};
```

Then we use this function inside the another function defined in your `main.js` file:

```js
import createRouter from './router';

export default () => {
  return new Vue({
    router: createRouter(),
  });
}
```

Because this function will be called on eash HTTP request, we are sure that with a fresh
router instance for each users.

:::tip  
Command `ssr:fix` try to fix common plugins, see [list of supported plugins]()
:::

### HTTP/AJAX client

Pay attention to others JS packages that works outside of Vue. In this example
we'll see an important feature: AJAX calls. Indeed, some apps will need to store 
an access token or JWT to fetch protected data.

Here is an example with `axios`:

```js
import axios from 'axios';

export const httpClient = axios.create({
  /* ... */
});

export async function login() {
  // POST request
  const { data } = await httpClient.post(/* ... */);

  // Gte token from response
  if (data.token) {
    // Store it on our httpClient
    httpClient.defaults.headers.common['Authorization'] = data.token;
  }
}

export function getProtectedData() {
  // GET request with defaults
  const { data } = await httpClient.get(/* ... */);
  
  // ...
}
```

This code will work but there is an important leak here: on server-side `httpClient`
will be created once and shared across all HTTP requests. So users will share their
tokens...

To avoid that you can create an [UVue plugin](/plugins/uvue.html#write-your-own-plugin)
and use its hooks to instanciante `httpClient`.

[Example here](https://github.com/universal-vue/examples/blob/master/src/plugins/httpClient.js)

## Router mode

Your router needs to be in `history` mode:

```js
export default () => {
  return new Router({
    mode: 'history',
    // ...
  });
};
```

## Vuex states

Like Vue plugins or JS packages, you need to be careful on how you create your
vanilla Vuex states, in this case, you need to use factory functions too:

```js
export default {
  state: () => ({
    // Your variables here
  }),
  // mutations, actions, getters...
}
```

:::tip  
Command `ssr:fix-vuex` try to fix them automatically
:::

## Write SSR compatible component

Consider reading [this excellent article](https://blog.lichter.io/posts/the-guide-to-write-universal-ssr-ready-vue-compon/) 
from [Alexander Lichter](https://thanks.lichter.io/)