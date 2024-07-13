import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebaseConfig'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthStore } from '@/stores/useAuthStore'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

const authStore = useAuthStore()

authStore.initAuth().then(() => {
  app.mount('#app')
})
