import { TextNode } from "~/background/translator/Translate.abstract";
import { generateWrappers } from "../render/wrapper.util";
import { Md5 } from "ts-md5";
import { splitContentsByLength } from "../render/translator.util";
import { translate } from "../api/translate.api";
import { showMode, translateSetting } from "~/common/storage/translateSetting.use";


type translateStatus = "translating" | "success" | "error"
export type TranlateItem = {
    //原文hash
    hash: string,
    wrapper: HTMLElement,
    translated: HTMLElement | null,
    showMode?: showMode,
    translator: string,
    //无需翻译
    notNeed:boolean,
    status: translateStatus,
    //是否只显示原文
    onlyOrigin:boolean
}

//所有翻译节点,节点信息包括当前文本块的一些信息,原文,译文,显示位置,hash等
const translateItems: Ref<TranlateItem[]> = ref([])


//生成翻译节点->翻译->调用render渲染
function tranlateVisible() {
    let wrappers = generateWrappers();
    let textNodes = wrappers.map(el => ({
        hash: Md5.hashStr(el.innerHTML),
        content: el.innerHTML
    }));
    let items: TranlateItem[] = wrappers.map(wrapper => {
        return {
            hash: Md5.hashStr(wrapper.innerHTML),
            showMode: translateSetting.value.showMode,
            wrapper,
            translator: translateSetting.value.translator,
            translated: null,
            status: "translating",
            notNeed:false,
            onlyOrigin:false
        }
    })
    let textNodeChunks = splitContentsByLength(textNodes);
    textNodeChunks.forEach(async textNodes => {
        let currentItems = textNodes.map(node => items.find(item => item.hash == node.hash)).filter(item => !!item) as TranlateItem[];
        translateItems.value.push(...currentItems)
        let textNodesRes = await translate({
            name: translateSetting.value.translator,
            textNodes
        });
        textNodesRes.forEach(render);
    })
}

function render(textNode: TextNode) {
    let translatedText = textNode.content;
    let translateItem = translateItems.value.find(item => item.hash == textNode.hash);
    if (!translateItem) return;
    //翻译和原文一样则标为无需翻译
    if (textNode.content == translateItem.wrapper.innerHTML) {
        translateItem.notNeed == true;
        return;
    }
    let translatedWrapper = document.createElement("div")
    translatedWrapper.style.position = "absolute";
    translatedWrapper.style.left = "0";
    translatedWrapper.innerHTML = translatedText;
    if (translateItem.showMode == "bottom") {
        let h = parseInt(getComputedStyle(translateItem.wrapper).getPropertyValue("height"));
        translatedWrapper.style.top = h + 10 + "px";
        translateItem.wrapper.style.marginBottom = h + 20 + "px";
    } else {
        translatedWrapper.style.top = "0";
    }
    translatedWrapper.style.zIndex = "1";
    translateItem.translated = translatedWrapper;
    translateItem.wrapper.appendChild(translatedWrapper);
    translateItem.status == "success";
}

export function useTranslate() {
    return {
        tranlateVisible
    }
}


