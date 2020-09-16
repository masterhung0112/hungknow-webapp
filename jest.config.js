module.exports = async () => {
    return {
      globals: {
        'ts-jest': {
          tsConfig: 'tsconfig.json',
          diagnostics: true,
        },
        NODE_ENV: 'test',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      verbose: true,
      rootDir: '.',
      preset: 'ts-jest',
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
      },
    }
  }
  