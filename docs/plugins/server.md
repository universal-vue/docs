# Server

## Cookie

Useful if your app have or need an authentication system. It will simply parse cookies
from all HTTP requests and made them available in your application. Cookies are a good
system to share auth tokens between your server side and client side.

```js
export default {
  plugins: [
    [
      '@uvue/server/plugins/cookie',
      {
        secret: '',
        options: {},
      },
    ],
  ],
};
```

- **secret**: a string or array used for signing cookies. This is optional and if not
  specified, will not parse signed cookies. If a string is provided, this is used as the
  secret. If an array is provided, an attempt will be made to unsign the cookie with
  each secret in order.
- **options**: an object that is passed to cookie.parse as the second option.
  See [cookie](https://www.npmjs.com/package/cookie) for more information

More information here: [https://github.com/expressjs/cookie-parser](https://github.com/expressjs/cookie-parser)

## GZIP compression

Can apply a GZIP compression on your files. Useful with you want to save bandwith
in production mode.

```js
export default {
  plugins: [
    [
      '@uvue/server/plugins/gzip',
      {
        filter: null,
        level: -1,
        //...
      },
    ],
  ],
};
```

More informations here: [https://www.npmjs.com/package/compression](https://www.npmjs.com/package/compression)

## Serve static files

This plugin is required for your application to work properly: its purpose is to
serve static files (js, css, images...) bundled or not by Webpack.

```js
export default {
  plugins: [
    [
      '@uvue/server/plugins/static',
      {
        acceptRanges: null,
        index: false,
        //...
      },
    ],
  ],
};
```

More informations here: [https://www.npmjs.com/package/serve-static](https://www.npmjs.com/package/serve-static)

## Server error page

This plugin will display an error page in case of server error. In development mode, [Youch]() is used
to display error. In production mode a simple page is displayed and you can customize it: just indicate a 
path to a HTML file in the plugin configuration:

```js
export default {
  plugins: [
    [
      '@uvue/server/plugins/serverError',
      {
        path: path.join(__dirname, 'my-custom-error-page.html'), // This path need to be absolute
      },
    ],
  ],
};
```

## Modern mode

Simple plugin to handle modern and legacy bundles. You just have to install it and the plugin
do all the job !

```js
export default {
  plugins: ['@uvue/server/plugins/modernMode'],
};
```

## Write your own plugin

A plugin is just an object with defined methods to act on different hooks:

```js
export default {
  // Act on server bootstrap: good place to define some server middlewares
  install(app, options) {
    app.use('/path', myMiddleware(options));
  },

  // Do an action before page will be rendered by Vue SSR
  async beforeRender(context, app) {
    // ...
  },

  // Body is rendered, now building the entire HTML page
  async beforeBuild(response, context, app) {
    // ...
  },

  // HTML is ready to be sent to client
  async rendered(response, context, app) {
    // You can alter response content before sending it
  },

  // Act when something go wrong during SSR rendering
  async routeError(error, response, context, app) {
    // Good place to render an error page
  },

  // Page was sent to client
  afterResponse(context, app) {
    // Good place to log things
  },
};
```

Please take a look to [UVue server plugins](https://github.com/universal-vue/uvue/tree/master/packages/%40uvue/server/plugins) already done
