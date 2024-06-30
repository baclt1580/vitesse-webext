import { onMessage, sendMessage } from "webext-bridge/content-script";
import { TextNode } from "~/background/translator/Translate.abstract";
import { createElementFromHTML, generateWrappers } from "../render/wrapper.util";
import { Md5 } from "ts-md5";
import langs from 'langs-es';
import { translatorSettings, type TranslatorSetting } from "../conifg/translators.config";
import { onScrollDown, splitContentsByLength } from "../render/translator.util";
import { translate } from "../api/translate.api";

type showMode = 'replace' | 'bottom' | 'origin';
type rangeMode = "all" | "visible" | "manual";
type translateStatus = "translating" | "success" |'notNeed'| "error"
export type TranslateSetting = {
    /**翻译结果放到哪 */
    showMode: showMode,
    /**翻译哪些内容 */
    rangeMode: rangeMode,
    /**用什么翻译 */
    translator: TranslatorSetting,
    from?: Language,
    to?: Language
}

export type TranlateItem = {
    hash: string,
    wrapper: HTMLElement,
    translated: HTMLElement | null,
    showMode?: showMode,
    /**用什么翻译的 */
    translator: TranslatorSetting,
    /**状态,翻译中,成功,失败 */
    status: translateStatus
}

//设置
export const setting: Ref<TranslateSetting> = ref({
    showMode: "bottom",
    rangeMode: "visible",
    translator: translatorSettings[0],
    from: undefined,
    to: langs.where(1, "zh")
})

export const translateItems: Ref<TranlateItem[]> = ref([])

export const translatingItems = computed(() => {
    return translateItems.value.filter(item => item.status == "translating")
})

//正在翻译
let translating = ref(false);

export function init() {
    onScrollDown(() => {
        if (!translating.value || setting.value.rangeMode != "visible") return;

    })
}
export function tranlateVisible() {
    let wrappers = generateWrappers();
    let textNodes = wrappers.map(el => ({
        hash: Md5.hashStr(el.innerHTML),
        content: el.innerHTML
    }));
    let items: TranlateItem[] = wrappers.map(wrapper => {
        return {
            hash: Md5.hashStr(wrapper.innerHTML),
            showMode: setting.value.showMode,
            wrapper,
            translator: setting.value.translator,
            translated: null,
            status: "translating"
        }
    })
    let textNodeChunks = splitContentsByLength(textNodes);
    textNodeChunks.forEach(async textNodes => {
        let currentItems = textNodes.map(node => items.find(item => item.hash == node.hash)).filter(item => !!item) as TranlateItem[];
        translateItems.value.push(...currentItems)
        let textNodesRes = await translate({
            name: setting.value.translator.name,
            textNodes
        });
        textNodesRes.forEach(render);
    })
}

function render(textNode: TextNode) {
    let translatedText = textNode.content;
    let translateItem = translateItems.value.find(item => item.hash == textNode.hash);
    if (!translateItem) return;
    if(textNode.content==translateItem.wrapper.innerHTML){
        translateItem.status == "notNeed";
        return;
    }
    let translatedWrapper = document.createElement("div")
    translatedWrapper.style.position = "absolute";
    translatedWrapper.style.left = "0";
    translatedWrapper.innerHTML = translatedText;
    if (translateItem.showMode == "bottom") {
        let h=parseInt(getComputedStyle(translateItem.wrapper).getPropertyValue("height"));
        translatedWrapper.style.top = h+10+"px";
        translateItem.wrapper.style.marginBottom=h+20+"px";
    } else {
        translatedWrapper.style.top = "0";
    }
    if (translateItem.showMode == "origin") {
        translatedWrapper.style.zIndex = "-9999";
    } else {
        translatedWrapper.style.zIndex = "1";
    }
    translateItem.translated = translatedWrapper;
    translateItem.wrapper.appendChild(translatedWrapper);
    translateItem.status == "success";
}



