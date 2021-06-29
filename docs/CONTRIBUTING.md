# Contribution Guidelines

Thank you for considering to help this project.

We welcome all support, whether on bug reports, feature requests, code, design, reviews, tests, documentation, and more.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Development

### Install

> Clone the project on your computer. You will also need [Node](https://nodejs.org) or [nvm](https://github.com/creationix/nvm).

```sh
nvm install
# Then, install all project dependencies.
npm install
```

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the server and the development tools.
npm run start
# Runs linting.
npm run lint
# Re-formats all of the files in the project (with Prettier).
npm run format
# View other available commands with:
npm run
```

### Code style

This project uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). All code should always be checked with those tools.

### Releases

- Make a new branch for the release of the new version.
- Update the [CHANGELOG](CHANGELOG.md).
- Update the version number in `package.json` and `package-lock.json`, following semver.
- Make a PR and squash merge it.
- Back on the main branch with the PR merged, follow the instructions below.

```sh
npm run build
# Use irish-pub to check the package content. Install w/ npm install -g first.
irish-pub
npm publish
```

- Finally, go to GitHub and create a release and a tag for the new version.
- Done!

> As a last step, you may want to go update a project using this library to check that all is well in a fully separate environment.
