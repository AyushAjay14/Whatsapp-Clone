module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // or "babel-jest" if you're using Babel
    "^.+\\.jsx?$": "babel-jest", // Add this for JavaScript
  },
  moduleFileExtensions: ["js", "ts", "svelte", "tsx"],
  transformIgnorePatterns: ["node_modules/(?!(svelte|@testing-library/svelte)/)"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
