// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  $schema: 'http://json.schemastore.org/prettierrc',
  bracketSpacing: true,
  printWidth: 500,
  proseWrap: 'always',
  semi: false,
  singleQuote: true,
  tabWidth: 4,
  trailingComma: 'es5',
  useTabs: true
}

export default config
