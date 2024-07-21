import { TextNode } from "~/background/translator/Translate.abstract";
import { generateVisibleWrappers, generateAllWrappers } from "../render/wrapper.util";
import { Md5 } from "ts-md5";
import { onScrollDown, splitContentsByLength } from "../render/translator.util";
import { showMode, translateSetting } from "~/common/storage/translateSetting.use";
import { translateStatus } from "~/common/storage/translateStatus.use";
import { sendMessage } from "webext-bridge/content-script";


type translateStatus = "translating" | "success" | "error"
export type TranlateItem = {
    //原文hash
    hash: string,
    wrapper: HTMLElement,
    originText: string,
    translated: HTMLElement | null,
    showMode?: showMode,
    translator: string,
    //无需翻译
    notNeed: boolean,
    status: translateStatus,
    //是否只显示原文
    onlyOrigin: boolean,
}

//所有翻译节点,节点信息包括当前文本块的一些信息,原文,译文,显示位置,hash等
const translateItems: Ref<TranlateItem[]> = ref([])


//生成翻译节点->翻译->调用render渲染
let unListen: any;
function translateVisible() {
    console.log("翻译visible")
    let isBottom = translateSetting.value.showMode == "bottom";
    let wrappers = generateVisibleWrappers(isBottom);
    tranlsateByWrapper(wrappers)
    translateStatus.value = "translating";
    unListen = onScrollDown(() => {
        console.log("滑动")
        let wrappers = generateVisibleWrappers(isBottom);
        tranlsateByWrapper(wrappers)
    })

}
function stopTranslate() {
    if (unListen) {
        unListen();
        unListen = null;
        translateStatus.value = "free";
    }

}

//翻译全部
async function translateAll() {
    console.log("翻译all")
    let wrappers = generateAllWrappers()
    translateStatus.value = "translating";
    await tranlsateByWrapper(wrappers)
    translateStatus.value = "free";
}

function tranlsateByWrapper(wrappers: HTMLElement[]) {
    let textNodes = wrappers.map(el => {
        return {
            hash: Md5.hashStr(el.innerHTML),
            content: el.innerHTML
        }
    });

    let items: TranlateItem[] = wrappers.map(wrapper => {
        return {
            hash: Md5.hashStr(wrapper.innerHTML),
            showMode: translateSetting.value.showMode,
            wrapper,
            translator: translateSetting.value.translator,
            translated: null,
            status: "translating",
            notNeed: false,
            onlyOrigin: false,
            originText: wrapper.innerHTML
        }
    })
    let textNodeChunks = splitContentsByLength(textNodes, 2000);
    let pros = textNodeChunks.map(async textNodes => {
        let currentItems = textNodes.map(node => items.find(item => item.hash == node.hash)).filter(item => !!item) as TranlateItem[];
        translateItems.value.push(...currentItems)
        let textNodesRes = await sendMessage("translate", {
            name: translateSetting.value.translator,
            textNodes
        }, "background")
        textNodesRes.forEach(render);
    })
    wrappers.forEach(wrapper => {
        let h = parseInt(getComputedStyle(wrapper).getPropertyValue("height"));
        wrapper.style.marginBottom = h + 20 + 'px';
        let translatedWrapper = document.createElement("div")
        translatedWrapper.style.position = "absolute";
        translatedWrapper.style.left = "0";
        translatedWrapper.style.top = h + 10 + "px";
        translatedWrapper.style.zIndex = "1";
        translatedWrapper.className = "translatedWrapper7506";
        wrapper.appendChild(translatedWrapper);
        (wrapper as any).translateWrapper = translatedWrapper;
    });
    wrappers.forEach(item => {
        let loadingEl = document.createElement("img");
        loadingEl.src = "https://openai-75050.gzc.vod.tencent-cloud.com/openaiassets_3eea5c1772f23b31c940fab4044e07ab_2579861721488788664.svg";
        (loadingEl as any).style = "width:24px";
        (item as any).translateWrapper.appendChild(loadingEl)
        setTimeout(() => {
            loadingEl.parentElement?.removeChild(loadingEl)
        },30000)
    })
    return Promise.all(pros)
}
function render(textNode: TextNode) {
    let translatedText = textNode.content;
    let translateItem = translateItems.value.find(item => item.hash == textNode.hash);
    if (!translateItem) {
        console.log("未找到translateItem")
        return;
    }
    let translatedWrapper: HTMLElement | null = translateItem.wrapper.querySelector(".translatedWrapper7506");
    if (!translatedWrapper) {
        console.log("未找到translatedWrapper")

    }
    if (textNode.isError) {
        translateItem.status = "error";
        if (translateItem.showMode == "bottom" && translatedWrapper) {
            translatedWrapper.innerHTML = "翻译失败"
        }
    }
    //翻译和原文一样则标为无需翻译
    if (textNode.content == translateItem.originText && translatedWrapper) {
        translateItem.notNeed == true;
        translateItem.wrapper.style.marginBottom = "0px";
        translatedWrapper.parentElement?.removeChild(translatedWrapper)
        return;
    }


    if (translateItem.showMode == "bottom" && translatedWrapper) {
        translatedWrapper.innerHTML = translatedText;
        translatedWrapper.setAttribute("translated", "translated")
    } else {

    }

    translateItem.translated = translatedWrapper;
    translateItem.status == "success";
}

export function useTranslate() {
    return {
        translateVisible,
        translateAll,
        stopTranslate
    }
}


