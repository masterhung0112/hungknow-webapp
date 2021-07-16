const config = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: 66,
                    firefox: 60,
                    edge: 42,
                    safari: 12,
                },
                modules: false,
                corejs: 3,
                debug: false,
                useBuiltIns: 'usage',
                shippedProposals: true,
            },
        ],
        [
            '@babel/preset-react',
            {
                useBuiltIns: true,
            },
        ],
        [
            '@babel/preset-typescript',
            {
                allExtensions: true,
                isTSX: true,
            },
        ],
    ],
    plugins: [
        'lodash',
        '@babel/plugin-proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        'react-hot-loader/babel',
        'babel-plugin-typescript-to-proptypes',
        ['module-resolver', {
            'root': './src'
        }]
    ],
};

// Jest needs module transformation
config.env = {
    test: {
        presets: config.presets,
        plugins: config.plugins,
    },
    production: {
        presets: config.presets,
        plugins: config.plugins.filter((plugin) => plugin !== 'babel-plugin-typescript-to-proptypes'),
    },
};
config.env.test.presets[0][1].modules = 'auto';

module.exports = config;
