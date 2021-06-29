# [Storybook for Django](https://storybook-django.herokuapp.com/) [<img src="https://raw.githubusercontent.com/torchbox/storybook-django/main/.github/storybook-django-logo.svg?sanitize=true" alt="Demo site" width="90" height="90" align="right">](https://storybook-django.herokuapp.com/)

[![npm](https://img.shields.io/npm/v/storybook-django.svg)](https://www.npmjs.com/package/storybook-django) [![Build status](https://github.com/torchbox/storybook-django/workflows/CI/badge.svg)](https://github.com/torchbox/storybook-django/actions)

Storybook for Django is an experimental UI development environment for your Django UI components. Work on components in isolation from your site or app. Test them with mock data. Document as you go. Have a look at our [online demo](https://storybook-django.herokuapp.com/).

![Screenshot of the Storybook UI, with a Django UI component displaying](.github/storybook-django-screenshot.png)

## How it works

Server-side, this uses [Django pattern library](https://github.com/torchbox/django-pattern-library) to mock template context and template tags. Client-side, we use [Storybook’s React API](https://storybook.js.org/docs/guides/guide-react/) to create stories from our templates.

## Getting started

Does this sound useful? Great, let’s get you set up. First, start by setting up [django-pattern-library](https://github.com/torchbox/django-pattern-library). Then, from the root of your project,

```sh
npx -p @storybook/cli sb init
# Once the project is set up,
npm install --save-dev storybook-django
```

Then, copy the code from `demo/storybook` into your project.

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
