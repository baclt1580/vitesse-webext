import { onMessage } from "webext-bridge/background";
import { container } from "tsyringe";
import { AbstranctTranslator, Translator } from "../translator/Translate.abstract";
export type translatePayload = {
    name: string,
    textNodes: { hash: string, content: string }[],
    config?: any
}


export function translateController() {
    let translators = container.resolveAll<Translator>("translator");
    onMessage("translate", async (e) => {
        if (!e.data.textNodes.length) {
            console.warn("翻译:收到的数据有问题");
            return e.data.textNodes;
        }
        let translator = translators.find(item => item.name == e.data.name);
        if (translator) {
            let textNodes = await translator.translate(e.data.textNodes);
            return textNodes;
        }
        else {
            console.warn("未找到指定的translator");
            return e.data.textNodes;
        }
    })

}

