# CSS management

By default UVue will inline all your styles in HTML output. This is great if you use `<style>` tags in your
SFC components becauce only components used in your current will be included in the final HTML. This mode will
offer you a basic, but powerful critical CSS system.

In `uvue.config.js`:

```js
export default {
  css: {
    normal: 'inline',
    vue: 'inline',
  },
};
```

You can see 2 options on this configuration:

- `normal`: Will process your styles included via an `import` code
- `vue`: Will process `<style>` tags in your SFC

You can switch theses values from `inline` to `extract`: on production build, styles from your app will
be extracted in a dedicated CSS file.

## Critical CSS

:::warning
Work in progress!
:::

TODO
