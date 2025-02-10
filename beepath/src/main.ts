import { createApp } from 'vue'
import App from './App.vue'

// router
import router from './router'

// vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import WebFont from 'webfontloader'
WebFont.load({
	google: {
		families: ['Material Icons', 'Roboto:100,300,400,500,700,900']
	}
})
const vuetify = createVuetify({
	components, directives, icons: {
		defaultSet: 'mdi', // Change to 'md' if using Material Icons
	},
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')

