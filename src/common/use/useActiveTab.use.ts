import { Tabs } from "webextension-polyfill";
import { ShallowRef } from "vue";
/**
 * 仅限conten-script和popup使用
 */
let activeTab: ShallowRef<Tabs.Tab | null> = ref(null);
let _pro:any;
export function useActiveTab() {
    init()
    function init() {
        if(_pro) return _pro;
        let pro=(async () => {
            let tabs = await browser.tabs.query({ active: true, currentWindow: true })
            activeTab.value = tabs[0];
            browser.tabs.onActivated.addListener(async e => {
                let tab = await browser.tabs.get(e.tabId)
                activeTab.value = tab;
            });
            browser.tabs.onUpdated.addListener((id, info, tab) => {
                activeTab.value = tab;
            })
        })();
        _pro=pro;
        return pro;
    }
    return {
        async getActiveTabAsync() {
            await init();
            return activeTab
        },
        activeTab
    }
}