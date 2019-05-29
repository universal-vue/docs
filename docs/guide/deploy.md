# Deployment

## Docker

UVue can be installed with pre-made docker files to easly deploy your application.
If you choose Dockerfile only, you can build image with this command:

```bash
docker build -t <image-name> .
```

Then run a container:

```bash
docker run -p 8080:8080 <image-name>
```

If you choose the Docker compose file with Nginx, you will have the benefit of
using nginx to serve your static/bundled files:

```
docker-compose up -d
```

:::tip
In this case `@uvue/server/plugins/static` and `@uvue/server/plugins/gzip` can
be removed from your configuration
:::

Links to original files:

- [Dockerfile](https://github.com/universal-vue/uvue/blob/master/packages/%40uvue/vue-cli-plugin-ssr/generator/templates/docker/Dockerfile)
- [docker-compose.yml](https://github.com/universal-vue/uvue/blob/master/packages/%40uvue/vue-cli-plugin-ssr/generator/templates/docker-nginx/docker-compose.yml)

## Heroku

First you need to create a Heroku app and ask Heroku to keep dev dependencies after installation
of your project:

```bash
heroku create
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false
```

Then you need to indicate that your project need to do a webpack build before starting it,
in your `package.json`:

```json
{
  "scripts": {
    "heroku-postbuild": "vue-cli-service ssr:build"
  }
}
```

Last step of configuration, create a `Procfile` in the root folder of project, to indicate
wich command need to called to start server:

```
web: npm run ssr:start
```

Finally to start your Heroku dyno, just commit theses changes and push to `heroku master`:

```bash
git push heroku master
```

## Now v2

:::warning
Actually this method only works with **NPM** and not with **Yarn**. So, if you use **Yarn**,
you need to remove `yarn.lock` and do a **NPM** install to have a `package-lock.json` file.
:::

First you need to write some configuration files:

`now.js`: It's just a file that will be executed to start the SSR server on Now

```js
require('@uvue/server/start');
```

`.nowignore`: Just to not upload useless files to Now:

```
/node_modules
/tests
```

`now.json`: Contains Now configuration parameters:

```json
{
  "version": 2,
  "name": "project-name",
  "builds": [
    {
      "src": "now.js",
      "use": "@now/node-server",
      "config": {
        "bundle": false,
        "maxLambdaSize": "50mb"
      }
    }
  ],
  "routes": [
    {
      "src": "/.*",
      "dest": "now.js"
    }
  ]
}
```

Importants parts are:

- `builds`: Indicate which Now builder to use, here we use `@now/node-server` to create a
  HTTP bridge between lambad function and our SSR server. `"bundle": false` indicate the project will not
  be bundled with `ncc` compiler, cause it's not working with UVue at the moment.
- `routes`: Ask Now to redirects all incoming requests to our SSR server.

Finally we need to add a build script to our `package.json`:

```json
{
  "scripts": {
    "now-build": "vue-cli-service ssr:build && npm prune --production"
  }
}
```

:::tip
If you want a faster build you can move some dev dependencies (like Cypress) to peer dependencies.
:::

Then you can deploy to Now:

```bash
now
```

## Firebase

**Docs in progress**

See this sample repo: [https://github.com/universal-vue/faas-deploy](https://github.com/universal-vue/faas-deploy)

**Main steps:**

1. [Change the configuration of server bundle](https://github.com/universal-vue/faas-deploy/blob/master/server.config.js#L2-L7)
2. [Create UVue firebase function](https://github.com/universal-vue/faas-deploy/blob/master/functions/index.js)
   don't forget to install @uvue/server and esm in functions folder, look at `package.json` in this folder
3. [Change your firebase.json to call firebase function](https://github.com/universal-vue/faas-deploy/blob/master/firebase.json)
4. [Use this shell script to build & deploy](https://github.com/universal-vue/faas-deploy/blob/master/firebase.sh)
