# Changelog

> All notable changes to this project are documented in this file. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [[v0.5.1]](https://github.com/torchbox/storybook-django/releases/tag/v0.5.1) (2022-04-06)

### Fixed

- Fix comment expansion being too greedy

## [[v0.5.0]](https://github.com/torchbox/storybook-django/releases/tag/v0.5.0) (2022-04-06)

### Fixed

- Change path imports for middleware and React code rather than using Node `exports` mapping.

### Added

- Add JSDoc-based TypeScript typing for the public API.
- Add a `data-testid="storybook-django"` attribute to facilitate automated testing.
- Add a `data-state="empty|loading|loaded"` attribute to run code once templates are loaded.
- Add a `data-template="path/to/template/component.html"` attribute to simplify troubleshooting.

## [[v0.4.1]](https://github.com/torchbox/storybook-django/releases/tag/v0.4.1) (2022-04-05)

### Fixed

- Use Node [exports](https://nodejs.org/api/packages.html#subpath-exports) to export correct paths in published package.

## [[v0.4.0]](https://github.com/torchbox/storybook-django/releases/tag/v0.4.0) (2022-04-05)

### Added

- Documentation for project basic setup and usage, and optional Webpack integrations.
- Documentation for advanced usage: TypeScript, Storyshots.
- Add new optional React API as `storybook-django/src/react` module.
- Document expected usage with Vue (WIP).
- Add experimental documentation generation capabilities.

### Fixed

- Fix API client forcing tags to explicit null

## [[v0.3.0]](https://github.com/torchbox/storybook-django/releases/tag/v0.3.0) (2022-02-16)

### Changed

- Move `http-proxy-middleware` to be a dependency of this package.
- Change public API to be completely framework-agnostic.

## [[v0.2.0]](https://github.com/torchbox/storybook-django/releases/tag/v0.2.0) (2020-03-12)

### Added

- Add basic error handling for TemplatePattern
- Support defining pattern library API path globally instead of per-component
- Add simpler stories definition API

### Changed

- Rewrite library code to be consumable without a React compilation step

## [[v0.1.0]](https://github.com/torchbox/storybook-django/releases/tag/v0.1.0) (2020-02-21)

First (barely) usable release!

---

Template from http://keepachangelog.com/

## [[vx.y.z]](https://github.com/torchbox/storybook-django/releases/tag/vx.y.z)

### Added

- Something was added to the API / a new feature was introduced.

### Changed

### Fixed

### Removed
