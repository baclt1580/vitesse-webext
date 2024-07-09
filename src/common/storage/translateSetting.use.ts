import langs from "langs-es";
import { useWebExtensionStorage } from "~/composables/useWebExtensionStorage";
import { getCurrentEnvironment } from "../utils/utils";
import { useActiveTab } from "../use/useActiveTab.use";
import { clone } from "lodash-es";

//翻译设置
export type showMode = 'replace' | 'bottom';
//翻译范围
type rangeMode = "all" | "visible" | "manual";
export type TranslateSetting = {
    /**翻译结果放到哪 */
    showMode: showMode,
    /**翻译范围 */
    rangeRange: rangeMode,
    /**用什么翻译 */
    translator: string,
    //1版code
    from: string,
    //1版code
    to: string
}
let activeTab = useActiveTab()
export const translateSettingMap = useWebExtensionStorage<Map<string, TranslateSetting>>("translateSetting", () => {
    return new Map();
}, { session: true });
let defaultSetting = (): TranslateSetting => {
    return {
        showMode: "bottom",
        rangeRange: "visible",
        translator: "gpt",
        from: "auto",
        to: navigator.language.split('-')[0]
    }
};
export const translateSetting = computed<TranslateSetting>(() => {
    if (!activeTab.value?.id) return defaultSetting();
    if (!translateSettingMap.value.has(activeTab.value?.id + "")) {
        let setting=defaultSetting();
        translateSettingMap.value.set(activeTab.value?.id + "",setting)
        return setting
    }
    return translateSettingMap.value.get(activeTab.value?.id + "") as TranslateSetting;
})
