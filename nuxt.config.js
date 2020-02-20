require('dotenv').config()

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/quill-editor.js", ssr: false },
    { src: "~/plugins/image-upload.js", ssr: false },
    { src: "~/plugins/DateRangePicker.js", ssr: false },
    { src: "~/plugins/vuetify-snackbar"},
    { src: "~/plugins/laravel-permission"},
    { src: "~/plugins/vee-validate" },
    { src: "~/plugins/notification.js", ssr: false},
    { src: "~/plugins/vue-fullcalendar.js", ssr: false},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    "@nuxtjs/dotenv",
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
	  proxy: true
  },

  proxy: {
	'/api/': {
		target: process.env.APP_API_URL,
		pathRewrite: {
			'^/api/' : '/'
		},
	},
	'/oauth': {
		target: process.env.APP_OAUTH_URL,
		pathRewrite: {
			'^/oauth' : '/'
		}
	},
  },

  router: {
		middleware: ['auth']
	},

	auth: {
		redirect: {
			login: '/auth/login',
			logout: '/auth/login',
			home: '/',
			// callback: '/login'
		},
		vuex: {
			namespace: 'auth', // Vuex store namespace for keeping state.
		},
		strategies: {
      password_grant: {
          _scheme: "local",
          endpoints: {
            login: {
              url: "oauth/token",
              method: "post",
              propertyName: "access_token"
            },
            logout: false,
            user: {
              url: "/api/auth/me"
            }
          }
        },
		}
	},

  /*
   ** Build configuration
   */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ["vee-validate/dist/rules"],
    extend (config, ctx) {
    },
  },

}

