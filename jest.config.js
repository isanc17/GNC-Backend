module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    // Mapear los mocks si los necesitas globalmente
    '^@/db/database$': '<rootDir>/tests/mocks/database.ts',
  },
};
