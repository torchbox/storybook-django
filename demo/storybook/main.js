const path = require('path');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    '../**/*.stories.mdx',
    {
      directory: '../core/templates/patterns/components/streamfield',
      titlePrefix: 'Blocks',
      files: '**/*.stories.*',
    },
    '../**/*.stories.*',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  features: {
    storyStoreV7: false,
  },
  babel: async (options) => ({
    ...options,
    plugins: [],
    presets: [
      ['@babel/preset-typescript', { allowDeclareFields: true }],
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  }),
  docs: {
    autodocs: 'tag',
  },
  /**
   * @param {any} config
   */
  webpackFinal: (webpackConfig) => {
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

    webpackConfig.module.rules = webpackConfig.module.rules.concat(rules);

    webpackConfig.node = {
      __filename: true,
      __dirname: true,
    };

    return webpackConfig;
  },
};

module.exports = config;
