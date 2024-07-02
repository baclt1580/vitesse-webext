import { Tabs } from "webextension-polyfill";
import { getActiveTab } from "../utils/utils";
let activeTab:Ref<Tabs.Tab|null>=ref(null)
export function useActiveTab(){
    onBeforeMount(async ()=>{
        let tabs = await browser.tabs.query({ active: true, currentWindow: true })
        activeTab.value= tabs[0];
    })
    return activeTab;
}