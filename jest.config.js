module.exports = async () => {
    return {
      setupFilesAfterEnv: ['<rootDir>/tests/testEnvSetup.js'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      verbose: true,
      rootDir: '.',
      snapshotSerializers: [
        'enzyme-to-json/serializer'
      ],
      testPathIgnorePatterns: [
        '/node_modules/'
      ],
      moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        '^.*i18n.*\\.(json)$': '<rootDir>/tests/i18n_mock.json',
        '^bundle-loader\\?lazy\\!(.*)$': '$1'
      },
      moduleNameMapper: {
        '^store/(.*)$': '<rootDir>/store/$1',
        '^utils$': '<rootDir>/utils',
        '^utils/(.*)$': '<rootDir>/utils/$1',
        '^test/(.*)$': '<rootDir>/test/$1',
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
      },
    }
  }
  