import { Tabs } from "webextension-polyfill";
import { getActiveTab, getCurrentEnvironment } from "../utils/utils";
/**
 * 仅限conten-script和popup使用
 */
let activeTab:Ref<Tabs.Tab|null>=ref(null)
export function useActiveTab(){
    
    onBeforeMount(async ()=>{
        let tabs = await browser.tabs.query({ active: true, currentWindow: true })
        activeTab.value= tabs[0];
    })
    return activeTab;
}