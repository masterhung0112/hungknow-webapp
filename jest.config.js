module.exports = async () => {
  return {
    setupFilesAfterEnv: ['<rootDir>/testlib/setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    verbose: true,
    rootDir: './src',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        'identity-obj-proxy',
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
      '^.*i18n.*\\.(json)$': '<rootDir>/testlib/i18n_mock.json',
      '^bundle-loader\\?lazy\\!(.*)$': '$1',
      '^store$': '<rootDir>/store',
      '^store/(.*)$': '<rootDir>/store/$1',
      '^stores/(.*)$': '<rootDir>/stores/$1',
      '^utils$': '<rootDir>/utils',
      '^utils/(.*)$': '<rootDir>/utils/$1',
      '^testlib$': '<rootDir>/test',
      '^testlib/(.*)$': '<rootDir>/testlib/$1',
      '^actions$': '<rootDir>/actions',
      '^actions/(.*)$': '<rootDir>/actions/$1',
      '^reducers$': '<rootDir>/reducers',
      '^reducers/(.*)$': '<rootDir>/reducers/$1',
      '^selectors$': '<rootDir>/selectors',
      '^selectors/(.*)$': '<rootDir>/selectors/$1',
      '^components$': '<rootDir>/components',
      '^components/(.*)$': '<rootDir>/components/$1',
      '^common$': '<rootDir>/common',
      '^common/(.*)$': '<rootDir>/common/$1',
      '^images$': '<rootDir>/images',
      '^images/(.*)$': '<rootDir>/images/$1',
      '^core$': '<rootDir>/core',
      '^core/(.*)$': '<rootDir>/core/$1',
      '^types/(.*)$': '<rootDir>/types/$1',
      '^constants/(.*)$': '<rootDir>/constants/$1',
      '^modules/(.*)$': '<rootDir>/modules/$1',
      '^i18n/(.*)$': '<rootDir>/i18n/$1',
      '^client/(.*)$': '<rootDir>/client/$1',
      '^plugins$': '<rootDir>/plugins',
      '^plugins/(.*)$': '<rootDir>/plugins/$1',
      '^dispatcher/(.*)$': '<rootDir>/dispatcher/$1',
    },
  }
}
