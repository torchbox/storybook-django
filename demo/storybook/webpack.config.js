const sass = require('sass');

module.exports = ({ config, mode }) => {
    const isProduction = mode === 'PRODUCTION';
    const sourceMap = !isProduction;

    config.devtool = sourceMap ? 'cheap-module-source-map' : 'none';

    const rules = [
        {
            test: /\.(scss|css)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: { sourceMap },
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap, implementation: sass },
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
};
