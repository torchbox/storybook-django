module.exports = {
  // See https://github.com/torchbox/eslint-config-torchbox for rules.
  extends: 'torchbox/typescript',
  rules: {
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.stories.*', 'storybook'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
