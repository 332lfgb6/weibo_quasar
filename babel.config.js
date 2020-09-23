
module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    ['@nutui/babel-plugin-separate-import', {
      style: 'css'
    }]
  ]
}
