# typesense-js [![NPM version][npm-image]][npm-url] [![CircleCI](https://circleci.com/gh/typesense/typesense-js.svg?style=shield)](https://circleci.com/gh/typesense/typesense-js)

Javascript client library for accessing the [Typesense HTTP API](https://github.com/typesense/typesense). Follows the API spec [here](https://github.com/typesense/typesense-api-spec).

This library can be used both on the server-side and on the client-side. The library's [source](/src) is in ES6 and during build time, we transpile it to ES5 and generate two artifacts - [one](/lib) that can be used on the server-side and [another](/dist) that uses [Browserify](http://browserify.org/) and can be used on the client side.

## Installation

#### Install via npm

```sh
$ npm install --save typesense
```

#### Include the minified JS file for use in the browser directly

```html
<script src="dist/typesense.min.js"></script>
```

## Usage

Read the documentation here: [https://typesense.org/api/](https://typesense.org/api/)

Here are some examples that show you how the client works: [doc/examples](doc/examples)

Tests are also a good place to know how the library works internally: [test](test)

**Note: When using this library in a browser, please be sure to use an API Key that only allows search operations instead of the `master` API key.**

See [doc/examples/server/keys.js](doc/examples/server/keys.js) for an example on how to generate a search only API key.

## Compatibility

| Typesense Server | typesense-js |
|------------------|----------------|
| \>= v0.12.1 | \>= v0.5.0 |
| \>= v0.12.0 | \>= v0.4.7 |
| <= v0.11 | <= v0.3.0 |

## Development

After checking out the repo, run `npm install` to install dependencies. Then run `npm test` to run the linter and tests.

To release a new version, we use the [np](https://github.com/sindresorhus/np) package:

```shell
$ npm install --global np
$ np 

# Follow instructions that np shows you

```

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/typesense/typesense-js](https://github.com/typesense/typesense-js).

[npm-image]: https://badge.fury.io/js/typesense.svg
[npm-url]: https://npmjs.org/package/typesense
