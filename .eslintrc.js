module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: "babel-eslint",
  rules: {
    strict: 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  plugins: ["react-hooks"],
}
