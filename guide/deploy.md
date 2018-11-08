# Deployment

:::warning
Work in progress!
:::

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

Links to original files: TODO

## Heroku

TODO

## Now

TODO
