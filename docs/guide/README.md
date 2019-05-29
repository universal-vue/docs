# Universal Vue

> Build universal Vue applications with ease

- [Github repository](https://github.com/universal-vue/uvue)
- [Live demo](http://uvue.yabab.net)
- [Live demo source code](https://github.com/universal-vue/examples)
- [CodeSandbox template](https://codesandbox.io/s/github/universal-vue/uvue-codesandbox)
- [Discord chat](https://discord.gg/3ZZBmFs)

## Getting started

**Install**

Before install, make sure your project use `vue-router`
in [`history` mode](https://router.vuejs.org/guide/essentials/history-mode.html).

This is needed to make SSR work correctly.

```bash
vue add @uvue/ssr
```

This plugins add commands to run or build your application in SSR mode:

**Start a development server with HMR**

```bash
npm run ssr:serve
```

**Build for production**

```bash
npm run ssr:build
```

**Start in production mode** (need a `npm run ssr:build` before)

```bash
npm run ssr:start
```

**Generate a static website**

```bash
npm run ssr:static
```

**Try to fix code to be SSR compatible**

```bash
npm run ssr:fix
```

:::tip
The `serve` and `build` commands are still available to run your application in SPA mode
:::

## Alternatives

### Live SSR

- [Nuxt](https://nuxtjs.org/)
- [Ream](https://ream.js.org/)
- [Akryum Vue CLI plugin](https://github.com/Akryum/vue-cli-plugin-ssr)

### Static websites

- [VuePress](https://vuepress.vuejs.org/)
- [Gridsome](https://gridsome.org/)
- [Saber](https://saber.land/)

### Starter

- [devCrossNet/vue-starter](https://github.com/devCrossNet/vue-starter)

## MIT License

```
Copyright 2018-Present Simon Babay <simon@babay.fr>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
