const path = require('path');

module.exports = {
    stories: ['../**/Welcome.stories.mdx', '../**/*.stories.*'],
    addons: [
        '@storybook/addon-essentials',
        // '@storybook/addon-viewport',
        // '@storybook/addon-docs',
        // '@storybook/addon-controls',
        // '@storybook/addon-backgrounds',
        // '@storybook/addon-a11y',
    ],
    webpackFinal: async (config, { configType }) => {
        const isProduction = configType === 'PRODUCTION';

        config.devtool = isProduction ? 'none' : 'cheap-module-source-map';

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
                test: /\.html$/,
                use: 'raw-loader',
            },
            {
                test: /\.ya?ml$/,
                use: 'js-yaml-loader',
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
