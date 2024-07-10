import { useWebExtensionStoragePage } from "~/composables/usePageWebExtensionStorage";

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
let defaultSetting = (): TranslateSetting => {
    return {
        showMode: "bottom",
        rangeRange: "visible",
        translator: "gpt",
        from: "auto",
        to: navigator.language.split('-')[0]
    }
};
export const translateSetting=useWebExtensionStoragePage<TranslateSetting>("translateSetting",defaultSetting);

