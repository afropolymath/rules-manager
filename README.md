# Rules Manager

This is a rules manager for Auth0 clients. Using this app, you're able to see rules that pertain to specific apps on your account.

## Configuration

Ensure to create a `.env` file. This is required for the server to run. See [.env.sample](.env.sample) for specifications. The fields required are:

```
AUTH0_TOKEN=

AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
AUTH0_CLIENT_ID=
```

The `AUTH0_TOKEN` is the API Explorer Token. You must ensure that this token has access to all the [Management v2 APIs](https://auth0.com/docs/api/management/v2). 

Also, make sure to set the expiry time for this token far enough or you could create a tool to write new keys to this file periodically.

Also, you will need to configure the frontend. Replace the necessary variables in [prod.env.js](config/prod.env.js).

```js
module.exports = {
  NODE_ENV: '"production"',
  AUTH0_CLIENT_ID: '"l5ClHK3PirB6J8C3NFbE54bWlIBZKnsA"',
  AUTH0_DOMAIN: '"chidieberennadi.auth0.com"',
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build and run on production server
npm run prod

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
