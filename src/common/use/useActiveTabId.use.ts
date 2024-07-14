import { useWebExtensionStorage } from "~/composables/useWebExtensionStorage";
import { getActiveTab, getCurrentEnvironment } from "../utils/utils";

export function useActiveTabId() {
    let activeTabId = useWebExtensionStorage<string | null>("activeTabId", null);

    async function init() {
        let env = getCurrentEnvironment();
        if (env == "background") {
            let tab = await getActiveTab();
            if(tab.id){
                activeTabId.value=tab.id+"";
            }
            browser.tabs.onActivated.addListener(async e => {
                activeTabId.value=e.tabId+"";
            });
            browser.tabs.onUpdated.addListener((id, info, tab) => {
                if(tab.id){
                    activeTabId.value=tab.id+"";
                }
            })
        }
    }
    async function tabOK(){
        let resolve:any;
        let pro=new Promise(res=>resolve=res)
        let unwatch=watch(activeTabId,v=>{
            if(v){
                unwatch();
                resolve()
            }
           
        })
        return pro;
    }
    return {
        activeTabId,
        init,
        tabOK
    }

}
