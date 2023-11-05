module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["*.js"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    // forループの中でのみ++表現使える
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    // 下に定義した関数上で呼び出してもok(可読性のため)
    "@typescript-eslint/no-use-before-define": ["error", {
      functions: false,
      classes: true,
      variables: true,
      allowNamedExports: false,
    }],
    // パラメーター名とargの変数名被ってもok
    "@typescript-eslint/no-shadow": "off",
    // _始まりの変数名のみunusedな変数の変数名として例外的に許可
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    // any型を許可
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    // addeventlistenerのhandlerなどで無名関数を使うので許可
    "func-names": ["error", "never"],
    "max-len": ["error", { code: 1000 }],
  },
};
