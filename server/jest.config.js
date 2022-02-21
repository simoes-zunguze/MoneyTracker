/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: 3,
  modulePathIgnorePatterns: ["build"],
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  testSequencer: "./_tests_/testSequencer.js"
};
