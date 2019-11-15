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
  plugins: [],
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
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
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
		}
	},
	'/oauth': {
		target: process.env.APP_OAUTH_URL,
		pathRewrite: {
			'^/oauth' : '/'
		}
	},
  },

  // router: {
	// 	middleware: ['auth']
	// },

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
						url: '/oauth/token', 
						method: 'post', 
						propertyName: 'access_token' 
					},
					logout: { url: '/api/auth/logout', method: 'post' },
					user: { 
						url: '/api/auth/user',
					}
				},
			}
		}
	},

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
