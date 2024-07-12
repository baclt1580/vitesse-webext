import { createApp } from 'vue'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'
import 'vfonts/FiraSans.css'
import { useActiveTab } from '~/common/use/useActiveTab.use';
(async ()=>{
    let {getActiveTabAsync}=useActiveTab();
    let activeTab=await getActiveTabAsync();
    
    let allow = computed(() => {
        return activeTab.value?.url?.startsWith('http') || activeTab.value?.url?.startsWith('https');
    })
    
})();
const app = createApp(App)
setupApp(app)
app.mount('#app')

