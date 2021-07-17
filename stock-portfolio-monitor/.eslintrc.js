module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks'
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  "rules": {
    "max-len": ["warn", { "code": 120 }],
    "arrow-parens": ["error", "as-needed", { "requireForBlockBody": false }],
    "operator-linebreak": ["warn", "after", { "overrides": { ":": "ignore" } }],
    "no-trailing-spaces": "warn",
    "react/jsx-closing-bracket-location": ["warn", "after-props"],
    "react/jsx-wrap-multilines": ["warn", {
      "declaration": "ignore",
      "assignment": "ignore",
      "return": "parens-new-line",
      "arrow": "ignore",
      "condition": "ignore",
      "logical": "ignore",
      "prop": "ignore"
    }],
    "react/jsx-one-expression-per-line": ["warn", { "allow": "single-child" }],
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": false
    }],
    "padded-blocks": ["warn", {
      "blocks": "never",
      "classes": "always",
      "switches": "never"
    }],
    "generator-star-spacing": ["error", { "before": true, "after": false }],
    "react/jsx-tag-spacing": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-cycle": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "linebreak-style": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "object-curly-newline": "off",
    "@typescript-eslint/comma-dangle": "off",
    "implicit-arrow-linebreak": "off",
    "default-case": "off",
    "function-paren-newline": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/indent": "off",
    "no-return-assign": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-max-props-per-line": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/jsx-curly-newline": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "no-mixed-operators": "off",
    "no-undef-init": "off"
  }
};
