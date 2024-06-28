import { onMessage, sendMessage } from "webext-bridge/content-script";
import { Translator } from "./Translator.interface";
import { TextNode } from "~/background/translator/Translate.abstract";
import { onScrollDown } from "./translator.util";
import { createElementFromHTML, generateWrappers } from "./wrapper.util";
import { Md5 } from "ts-md5";
import langs from 'langs-es';

type showMode = 'replace' | 'bottom' | 'origin';
type rangeMode = "all" | "visible" | "manual";
export class NormalTranslator {
    translateItems: TranlateItem[] = [];
    cancelTranslate: (() => void) | null = null;
    //默认显示模式
    defaultShowMode: showMode = 'bottom';
    //范围模式
    rangeMode: rangeMode = 'visible';

    init() {
        onMessage("translate_result", e => {
            let data = e.data as { type: string, textNodes: TextNode[] };
            if (data.type != "replace") return;
            data.textNodes.forEach(textNode => {
                let translateItem = this.translateItems.find(item => {
                    return item.hash == textNode.mark
                })
                if (!translateItem) {
                    console.warn("未找到匹配的node")
                    return;
                }
                translateItem.translated = createElementFromHTML(textNode.content) as HTMLElement;
            })
            this.renderTranslated()
        })
    }

    toggleMode(mode: 1 | 2 | 3): void {
        throw new Error("Method not implemented.");
    }
    translateVisible() {
        let wrappers = generateWrappers();
        let items: TranlateItem[] = wrappers.map(wrapper => {
            return {
                hash: Md5.hashStr(wrapper.outerHTML),
                origin: wrapper,
                translated: null,
                rendered: false
            }
        })

        this.translateItems.push(...items);
        let textNodes = items.map(item => ({
            mark: item.hash,
            content: item.origin.outerHTML
        }));
        sendMessage("translate", { type: "replace", textNodes }, "background");
    }
    //渲染翻译完的
    private renderTranslated() {
        this.translateItems.filter(item => item.translated != null).forEach(contentNode => {
            contentNode.rendered = true
            if (contentNode && contentNode.node.nodeValue != contentNode.translated) {
                contentNode.node.nodeValue = contentNode.translated;
            }
        })
    }
}

export type TranslatorSetting = {
    defaultShowMode: showMode,
    rangeMode: rangeMode,
    from?: Language,
    to?: Language
}
type TranlateItem = {
    hash: string
    origin: HTMLElement,
    translated: HTMLElement | null,
    showMode?: showMode,
    rendered: boolean
}

//设置
export const settings: Ref<TranslatorSetting> = ref({
    defaultShowMode: "bottom",
    rangeMode: "visible",
    from: undefined,
    to: langs.where(1, "zh")
})


const translateItems: Ref<TranlateItem[]> = ref([])

const unTranslated = computed(() => {
    return translateItems.value.filter(item => !item.translated)
})
const unRendered = computed(() => {
    return translateItems.value.filter(item => item.translated && !item.rendered)
})

//正在翻译
let translating = ref(false);

export function init() {
    onMessage("translate_result", e => {
        if (!translating.value) return;
        let data = e.data as { type: string, textNodes: TextNode[] };
        if (data.type != "replace") return;
        data.textNodes.forEach(textNode => {
            let translateItem = translateItems.value.find(item => {
                return item.hash == textNode.mark
            })
            if (!translateItem) {
                console.warn("未找到匹配的node")
                return;
            }
            translateItem.translated = createElementFromHTML(textNode.content) as HTMLElement;
        })
    })
    watch(unRendered, v => {
        v.forEach(item => {
            item.origin
        })
    })

    function render(item: TranlateItem) {
        let showMode=item.showMode||settings.value.defaultShowMode;
        if(showMode=="origin"){
            
        }
        unRendered.value
    }
}
export function toggle() {

}



