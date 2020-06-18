# Storybook for Django

[![npm](https://img.shields.io/npm/v/storybook-django.svg)](https://www.npmjs.com/package/storybook-django) [![Build Status](https://travis-ci.com/torchbox/storybook-django.svg?branch=master)](https://travis-ci.com/torchbox/storybook-django)

Storybook for Django is a UI development environment for your Django UI components. With it, you can visualize different states of your UI components and develop them interactively. Have a look at our [online demo](https://storybook-django.herokuapp.com/).

Storybook runs outside of your app. So you can develop UI components in isolation without worrying about app specific dependencies and requirements.

## Getting Started

```sh
cd my-django-project
npx -p @storybook/cli sb init
# Once the project is set up,
npm install --save-dev storybook-django
```
