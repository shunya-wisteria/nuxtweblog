import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

const envPath = process.env.NODE_ENV !== 'production' ? ".env.dev" : ".env.prod"
require('dotenv').config({ path: envPath })
const { API_KEY } = process.env;
const { CMS_PAGE_LIMIT } = process.env;
const { CMS_API_ENDPOINT } = process.env;
const { SITE_TITLE } = process.env;
const { META_DESCRIPTION } = process.env;
const { META_OG_URL } = process.env;
const { META_OG_IMG } = process.env;
const { META_TWITTER_ID } = process.env;
const { GAID } = process.env;
const { PHOTOLOG_URL } = process.env
const { HOST_NAME } = process.env

const GAcode = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GAID}');`

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + process.env.SITE_TITLE,
    title: process.env.SITE_TITLE,
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.META_DESCRIPTION },

      { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_TITLE },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.META_OG_URL },
      { hid: 'og:title', property: 'og:title', content: process.env.SITE_TITLE },
      { hid: 'og:description', property: 'og:description', content: process.env.META_DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: process.env.META_OG_IMG },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', property: 'twitter:site', content: process.env.META_TWITTER_ID }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', type: 'text/css', href:'https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css'},
      { rel: 'stylesheet', type: 'text/css', href:'https://fonts.googleapis.com/css?family=Open+Sans'},
      { rel: 'stylesheet', type: 'text/css', href:'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css'},
      { rel: 'stylesheet', type: 'text/css', href:'https://fonts.googleapis.com/css?family=Carme'},
      { rel: 'stylesheet', type: 'text/css', href:'https://fonts.googleapis.com/css?family=Didact+Gothic'},
      { rel: 'stylesheet', type: 'text/css', href:'https://use.fontawesome.com/releases/v5.6.3/css/all.css'},
    ],
    script:[
      { src: '//cdn.iframe.ly/embed.js', async: true},
      {
        hid: 'GAsrc',
        src: 'https://www.googletagmanager.com/gtag/js?id=' + GAID
      },
      {
        hid: 'GAcode',
        innerHTML: GAcode
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'GAsrc': ['innerHTML'],
      'GAcode': ['innerHTML']
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-scrollto'} 
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#737373',
          accent: colors.blueGrey.lighten1,
          secondary: colors.blueGrey.lighten4,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          tilebg: colors.grey.lighten4,
          drawer: '#f16272'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  sitemap: {
    hostname: process.env.HOST_NAME,
    path : "/sitemap.xml",
    exclude: [
      "/draft",
      "/contact/success"
    ],
    routes() {
      const posts = axios
        .get(process.env.CMS_API_ENDPOINT + "/api/v1/posts?limit=500", {
          headers: {"X-MICROCMS-API-KEY" : process.env.API_KEY}
        })
        .then(res => {
          return res.data.contents.map(posts => {
            return "/posts/" + posts.id;
          });
        });
      
      const categories = axios.get
      (
        process.env.CMS_API_ENDPOINT + "/api/v1/categories?limit=100",
        {
          headers: {"X-MICROCMS-API-KEY" : process.env.API_KEY}
        }
      )
      .then(res => 
        {
          return res.data.contents.map(categories => {return "/categories/" + categories.id;})
        }
      );

      const tags = axios.get
      (
        process.env.CMS_API_ENDPOINT + "/api/v1/tags?limit=100",
        {
          headers: {"X-MICROCMS-API-KEY" : process.env.API_KEY}
        }
      )
      .then(res => 
        {
          return res.data.contents.map(tags => {return "/tags/" + tags.id;})
        }
      );

      return Promise.all([posts,categories,tags]).then(values => {
        return values.join().split(",");
      })
    }
  },

  env: {
    API_KEY, CMS_PAGE_LIMIT, CMS_API_ENDPOINT, SITE_TITLE, META_DESCRIPTION, META_OG_URL, META_OG_IMG, META_TWITTER_ID, GAID, PHOTOLOG_URL, HOST_NAME
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    routes() {
      const posts = axios
        .get(process.env.CMS_API_ENDPOINT + "/api/v1/posts?limit=500", {
          headers: {"X-MICROCMS-API-KEY" : process.env.API_KEY}
        })
        .then(res => {
          return res.data.contents.map(posts => {
            return "/posts/" + posts.id;
          });
        });
      
      const categories = axios.get
      (
        process.env.CMS_API_ENDPOINT + "/api/v1/categories?limit=100",
        {
          headers: {"X-MICROCMS-API-KEY" : process.env.API_KEY}
        }
      )
      .then(res => 
        {
          return res.data.contents.map(categories => {return "/categories/" + categories.id;})
        }
      );

      const tags = axios.get
      (
        process.env.CMS_API_ENDPOINT + "/api/v1/tags?limit=100",
        {
          headers: {"X-MICROCMS-API-KEY" : process.env.API_KEY}
        }
      )
      .then(res => 
        {
          return res.data.contents.map(tags => {return "/tags/" + tags.id;})
        }
      );

      return Promise.all([posts,categories,tags]).then(values => {
        return values.join().split(",");
      });
    },
    fallback: true
  },
}
