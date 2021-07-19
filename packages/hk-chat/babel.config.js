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
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                'actions-types': './src/actions-types',
                actions: './src/actions',
                client: './src/client',
                common: './src/common',
                components: './src/components',
                constants: './src/constants',
                dispatcher: './src/dispatcher',
                i18n: './src/i18n',
                modules: './src/modules',
                plugins: './src/plugins',
                selectors: './src/selectors',
                store: './src/store',
                stores: './src/stores',
                reducers: './src/reducers',
                mocks: './src/mocks',
                showroom: './src/core/showroom',
                styles: './src/styles',
                tests: './src/tests',
                types: './src/types',
                storybook: './src/storybook',
                utils: './src/utils',

                // Asset-related Paths
                images: './images',
                sounds: './sounds',
                fonts: './fonts',

                // 'react-dom': '@hot-loader/react-dom',
            },
        }],
        ['edit-import-extension', {extMapping: {'.jsx': '', '.ts': '', '.tsx': ''}}],
    ],
    ignore: [
        '**/__snapshots__', // ignore the whole __snapshots__ directory
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
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
