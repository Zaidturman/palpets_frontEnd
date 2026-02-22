import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'

import './assets/styles/main.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.use(VueSweetalert2)

app.mount('#app')