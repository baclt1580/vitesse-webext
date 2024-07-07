import { createApp } from 'vue'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'
import 'vfonts/FiraSans.css'
const app = createApp(App)
setupApp(app)
app.mount('#app')
browser.storage.local.get().then(console.log)
