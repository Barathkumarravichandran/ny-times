module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub',
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
  };
  