module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  printWidth: 80,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};
