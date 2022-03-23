const path = require('path');

module.exports = {
  stories: [
    '../**/*.stories.mdx',
    {
      directory: '../core/templates/patterns/components/streamfield',
      titlePrefix: 'Blocks',
      files: '**/*.stories.*',
    },
    '../**/*.stories.*',
  ],
  addons: [
    // '@storybook/addon-essentials',
    // '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    // '@storybook/addon-backgrounds',
    // '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    const rules = [
      {
        test: /\.(css|scss)$/,
        sideEffects: true,
        include: path.resolve(__dirname, '../'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(md|html|yml|yaml)$/,
        type: 'asset/source',
      },
    ];

    config.module.rules = config.module.rules.concat(rules);

    config.node = {
      __filename: true,
      __dirname: true,
    };

    return config;
  },
};
