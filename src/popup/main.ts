import { createApp } from 'vue'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'
import { onMessage } from 'webext-bridge/popup'
onMessage("test",e=>{
    console.log("popup收到信息了",e)
})
const app = createApp(App)
setupApp(app)
app.mount('#app')
