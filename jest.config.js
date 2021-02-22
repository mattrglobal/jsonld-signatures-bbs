const pack = require("./package");

module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  testPathIgnorePatterns: ["/node_modules/", "/output/"],
  testRegex: [".spec.ts$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coveragePathIgnorePatterns: ["<rootDir>/__tests__"],
  testEnvironment: "node",
  testTimeout: 15000,
  verbose: true,
  name: pack.name,
  displayName: pack.name
};
