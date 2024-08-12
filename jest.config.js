module.exports = {
  roots: ['<rootDir>/__tests__'],
  preset: 'react-native',
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
};
