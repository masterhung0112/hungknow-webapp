module.exports = async () => {
    //'set-tz/utc'
    return {
        setupFiles: ['jest-canvas-mock'],
        setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
        clearMocks: true,
        verbose: false,
        rootDir: '.',
        snapshotSerializers: ['enzyme-to-json/serializer'],
        testPathIgnorePatterns: ['/node_modules/'],
        moduleNameMapper: {
            '^.+\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        'identity-obj-proxy',
            '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
            '^.*i18n.*\\.(json)$': '<rootDir>/src/tests/i18n_mock.json',
            '^bundle-loader\\?lazy\\!(.*)$': '$1',
            '^store$': '<rootDir>/src/store',
            '^store/(.*)$': '<rootDir>/src/store/$1',
            '^stores/(.*)$': '<rootDir>/src/stores/$1',
            '^utils$': '<rootDir>/src/utils',
            '^utils/(.*)$': '<rootDir>/src/utils/$1',
            '^tests$': '<rootDir>/src/test',
            '^tests/(.*)$': '<rootDir>/src/tests/$1',
            '^actions$': '<rootDir>/src/actions',
            '^actions/(.*)$': '<rootDir>/src/actions/$1',
            '^reducers$': '<rootDir>/src/reducers',
            '^reducers/(.*)$': '<rootDir>/src/reducers/$1',
            '^selectors$': '<rootDir>/src/selectors',
            '^selectors/(.*)$': '<rootDir>/src/selectors/$1',
            '^components$': '<rootDir>/src/components',
            '^components/(.*)$': '<rootDir>/src/components/$1',
            '^common$': '<rootDir>/src/common',
            '^common/(.*)$': '<rootDir>/src/common/$1',
            '^images$': '<rootDir>/src/images',
            '^images/(.*)$': '<rootDir>/src/images/$1',
            '^core$': '<rootDir>/src/core',
            '^core/(.*)$': '<rootDir>/src/core/$1',
            '^types/(.*)$': '<rootDir>/src/types/$1',
            '^constants/(.*)$': '<rootDir>/src/constants/$1',
            '^modules/(.*)$': '<rootDir>/src/modules/$1',
            '^i18n/(.*)$': '<rootDir>/src/i18n/$1',
            '^client/(.*)$': '<rootDir>/src/client/$1',
            '^plugins$': '<rootDir>/src/plugins',
            '^plugins/(.*)$': '<rootDir>/src/plugins/$1',
            '^dispatcher/(.*)$': '<rootDir>/src/dispatcher/$1',
            '^bundle-loader\\?lazy\\!(.*)$': '$1',
            '^hkclient-redux/test/(.*)$': '<rootDir>/../hkclient-redux/test/$1',
            '^hkclient-redux/(.*)$': '<rootDir>/../hkclient-redux/dist/$1',
        },
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    };
};
