# Vue CLI plugins

UVue try to be compatible with most populars Vue CLI plugin. If you dont
find your favorite plugin, please feel free to contribute with a PR or ask
a feature request on github repository.

If you will install UVue after all these plugins, then you will have nothing
to do, all is handled automatically at installation.

On the other case, you can try `ssr:fix` command: it will try to fix your
code correctly.

And always shit happen: if you need to fix code manually, here is the required
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

TODO

## Apollo

TODO
