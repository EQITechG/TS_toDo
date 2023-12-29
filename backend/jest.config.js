module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    testMatch: ['**/*.spec.(ts|js)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };
  