/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testTimeout: 30000,
  // tests/live/* hits real provider APIs and needs credentials — run it
  // explicitly via `npm run test:live`, never as part of default `npm test`/CI.
  testPathIgnorePatterns: ['/node_modules/', '/tests/live/'],
};
