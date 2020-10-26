export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  telemetry: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Ant Design Nuxt Pro',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#29d' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['ant-design-vue/dist/antd.css', '~/assets/global.less'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/antd-ui', '@/plugins/axios', '@/plugins/auth'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  /*
   ** Axios proxy
   */
  proxy: {
    '/api/': {
      target: process.env.ADMIN_API_URL,
      pathRewrite: { '^/api': '/admin/api' },
    },
  },

  router: {
    base: '/admin',
    parseQuery(query) {
      return require('qs').parse(query)
    },
    stringifyQuery(query) {
      return require('qs').stringify(query, {
        arrayFormat: 'brackets',
        encode: false,
        addQueryPrefix: true,
        skipNulls: true,
      })
    },
    extendRoutes(routes) {
      routes.push({ path: '/auth/login', alias: '/login' })
      routes.push({ path: '/auth/logout', alias: '/logout' })
      routes.push({ path: '/dashboard', redirect: '/dashboard/workplace' })
      routes.push({ path: '/', redirect: '/dashboard/workplace' })
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
}
