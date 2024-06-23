import { onMessage, sendMessage } from "webext-bridge/content-script";
import { Translator } from "./Translator.interface";
import { TextNode } from "~/background/translator/Translate.abstract";
import { v4 as uuidv4 } from 'uuid';
import { getVisibleTextNodes, onScrollDown } from "./translator.util";
/**
 * 直接替换
 */
export type ContentNode = {
    mark: string
    node: Text,
    //原文
    origin: string | null,
    //译文
    translated: string | null,
    rendered: boolean
}
export const contentNodes: Ref<ContentNode[]> = ref([]);
let cancelTranslate:(()=>void)|null=null;
export class ReplaceTranslator implements Translator {
    constructor() {
        onMessage("translate_result", e => {
            let data = e.data as { type: string, textNodes: TextNode[] };
            if (data.type != "replace") return;
            data.textNodes.forEach(textNode => {
                let contentNode = contentNodes.value.find(item => {
                    return item.mark == textNode.mark
                })
                if (!contentNode) {
                    console.warn("未找到匹配的node")
                    return;
                }
                contentNode.translated = textNode.content;
            })
            this.render()
        })
    }
    //翻译
    translate() {
        this.render();
        translateVisibleText();
        cancelTranslate=onScrollDown(translateVisibleText)
        function translateVisibleText() {
            let nodes = getVisibleTextNodes().filter(node=>contentNodes.value.findIndex(item=>item.node.isSameNode(node))<0);
            let textNodes: TextNode[] = nodes.map((node) => {
                let textNode = {
                    mark: uuidv4(),
                    content: node.nodeValue as string
                };
                contentNodes.value.push({
                    mark: textNode.mark,
                    node: node as Text,
                    origin: node.nodeValue,
                    translated: null,
                    rendered: false,
                })
                return textNode;
            });
            sendMessage("translate", { type: "replace", textNodes }, "background")
        }
    }

    revert() {
        if(cancelTranslate)cancelTranslate();
        contentNodes.value.forEach(item => {
            if (item.node.nodeValue != item.origin) {
                item.node.nodeValue = item.origin
            }
            item.rendered = false;
        })
    }
    //渲染翻译完的
    private render() {
        contentNodes.value.filter(item => item.translated != null).forEach(contentNode => {
            contentNode.rendered = true
            if (contentNode && contentNode.node.nodeValue != contentNode.translated) {
                contentNode.node.nodeValue = contentNode.translated;
            }
        })
    }
}