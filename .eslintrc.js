module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "node"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    ignorePatterns: ["node_modules", "lib", "__tests__"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "node/no-extraneous-import": ["error", {
            "allowModules": ["jsonld"]
        }],
    },
};