# [Storybook for Django](https://storybook-django.herokuapp.com/) [<img src="https://raw.githubusercontent.com/torchbox/storybook-django/main/.github/storybook-django-logo.svg?sanitize=true" alt="Demo site" width="90" height="90" align="right">](https://storybook-django.herokuapp.com/)

[![npm](https://img.shields.io/npm/v/storybook-django.svg)](https://www.npmjs.com/package/storybook-django) [![Build status](https://github.com/torchbox/storybook-django/workflows/CI/badge.svg)](https://github.com/torchbox/storybook-django/actions)

Storybook for Django is an experimental UI development environment for Django components. It allows you to implement, document, and test UI components in isolation from your Django views. Have a look at our [online demo](https://storybook-django.herokuapp.com/).

![Screenshot of the Storybook UI, with a Django UI component displaying](.github/storybook-django-screenshot.png)

## How it works

Server-side, this uses [django-pattern-library](https://github.com/torchbox/django-pattern-library) to mock template context and template tags. Client-side, we use [Storybook](https://storybook.js.org/) to create stories from our templates.

## Getting started

Let’s get you set up. There are two requirements:

1. First, start by setting up [django-pattern-library](https://github.com/torchbox/django-pattern-library), v0.7.0 and up. Have a look at our [demo settings.py](https://github.com/torchbox/storybook-django/blob/main/demo/settings.py) as an example.
2. Then, set up [Storybook](https://storybook.js.org/). We expect storybook-django to work with any framework supported by Storybook, and provide built-in support for React and Vue.

Next, install our package:

```sh
npm install --save-dev storybook-django
```

### Middleware

Add a `middleware.js` inside your Storybook configuration folder (`.storybook` by default):

```js
const { createDjangoAPIMiddleware } = require('storybook-django/middleware');

module.exports = createDjangoAPIMiddleware({
  // Point this at your Django runserver instance, with the correct port number.
  origin: 'http://localhost:8001',
  apiPath: ['/pattern-library/'],
});
```

This will forward pattern library API requests to Django. You may optionally add more API path patterns to `apiPath` to make other requests to your Django backend.

### Optional Webpack configuration

This is optional but highly recommended. To leverage Storybook’s live-reloading and documentation capabilities, we need to configure it to load our templates. Edit your Storybook `main.js` file to customise the `webpackFinal` option:

```js
module.exports = {
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.concat([
      {
        test: /\.html$/,
        // Webpack 5:
        type: 'asset/source',
        // Webpack 4 (make sure to also install the raw-loader package):
        // use: 'raw-loader',
      },
    ]);

    return config;
  }
```

### React usage

TODO

### Vue usage

TODO

### Usage with other frameworks

TODO

## Where this is heading

See [torchbox/django-pattern-library#103 – Storybook prototype of the pattern library](https://github.com/torchbox/django-pattern-library/issues/103) for more context on this project, and to keep up with changes to it in relation with django-pattern-library.

## Demo site

The demo site showcases:

- storybook-django, [storybook-django.herokuapp.com](https://storybook-django.herokuapp.com/).
- The equivalent django-pattern-library, [storybook-django.herokuapp.com/pattern-library/](https://storybook-django.herokuapp.com/pattern-library/).
- Storybook v6 with the docs, controls, a11y, backgrounds, viewport addons.
- A migration setup dynamically generating Storybook stories from Django pattern library YAML files.
- Examples of using JS in stories, or displaying Markdown alongside the components in docs mode.
- Stories for React components alongside the Django ones.

## Contributing

See anything you like in here? Anything missing? We welcome all support, whether on bug reports, feature requests, code, design, reviews, tests, documentation, and more. Please have a look at our [contribution guidelines](CONTRIBUTING.md).

If you just want to set up the project on your own computer, the contribution guidelines also contain all of the setup commands.

## Credits

View the full list of [contributors](https://github.com/torchbox/storybook-django/graphs/contributors). [MIT](LICENSE) licensed.
