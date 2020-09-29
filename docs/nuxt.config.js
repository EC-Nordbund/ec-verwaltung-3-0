import theme from '@nuxt/content-theme-docs'

export default theme({
  i18n: {
    locales: () => [ {
      code: 'de',
      iso: 'de-DE',
      file: 'de-DE.js',
      name: 'Deutsch'
    }],
    defaultLocale: 'de'
  },
})
