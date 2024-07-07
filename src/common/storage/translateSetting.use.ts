import langs from "langs-es";
import { useWebExtensionStorage } from "~/composables/useWebExtensionStorage";
import { getCurrentEnvironment } from "../utils/utils";

//翻译设置
export type showMode = 'replace' | 'bottom' | 'origin';
//翻译范围
type rangeMode = "all" | "visible" | "manual";
export type TranslateSetting = {
    /**翻译结果放到哪 */
    showMode: showMode,
    /**翻译哪些内容 */
    rangeRange: rangeMode,
    /**用什么翻译 */
    translator: string,
    //1版code
    from: string,
    //1版code
    to: string
}

export const translateSetting: Ref<TranslateSetting> = useWebExtensionStorage<TranslateSetting>("translateSetting", () => {
    let code:string=navigator.language.split('-')[0];
    return {
        showMode: "bottom",
        rangeRange: "visible",
        translator: "gpt",
        from: "auto",
        to: code
    }
});