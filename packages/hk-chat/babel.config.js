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
        ]
    ],
    plugins: [
        'lodash',
        '@babel/plugin-proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        'react-hot-loader/babel',
        'babel-plugin-typescript-to-proptypes',
        ['module-resolver', {
            'extensions': ['.js', '.jsx', '.ts', '.tsx'],
            'alias': {
                'components': './src/components',
                'common': './src/common',
                'utils': './src/utils',
                'i18n': './src/i18n',
                'styles': './src/styles',
                'actions-types': './src/actions-types',
                'actions': './src/actions',
                'selectors': './src/selectors',
                'reducers': './src/reducers',
                'mocks': './src/mocks',
                'showroom': './src/core/showroom',
                'tests': './src/tests',
                'types': './src/types',
                'store': './src/store',
                'stores': './src/stores',
                'constants': './src/constants',
                'storybook': './src/storybook',
                'client': './src/client',
                'modules': './src/modules',
                'plugins': './src/plugins',
            },
        }],
        ['replace-import-extension', { 'extMapping': { '.jsx': '' }}]
    ],
    'ignore': [
        "**/__snapshots__", // ignore the whole __snapshots__ directory
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx'
    ]
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
