/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    EXPOSED_API_HOST: 'mock_host',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./setup-jest.ts'],
};
