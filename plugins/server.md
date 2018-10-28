# Server

## Write your own plugin

TODO

## API

```js
export default {
  install(server) {},

  async beforeStart(server) {},

  async beforeRender(context, server) {},

  async beforeBuild(response, context, server) {},

  async rendered(response, context, server) {},

  async routeError(error, response, context, server) {},

  afterResponse(context, server) {},
};
```
