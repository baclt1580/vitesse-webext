import { createApp } from 'vue'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'
import 'vfonts/FiraSans.css'
import { useActiveTabId } from '~/common/use/useActiveTabId.use'
import { currentLang } from './state/currentLang.state'
let { tabOK } = useActiveTabId();
tabOK().then(() => {
    const app = createApp(App)
    setupApp(app)
    app.mount('#app')
    console.log(currentLang)
})


