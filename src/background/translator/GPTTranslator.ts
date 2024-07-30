import { singleton } from "tsyringe";
import { sendOpenAiMessage } from "../utils/openai.util";
import { AbstranctTranslator, TextNode } from "./Translate.abstract";
import { getActiveTab } from "~/common/utils/utils";
import { translateSetting } from "~/common/storage/translateSetting.use";

@singleton()
export class GPTTranslator extends AbstranctTranslator {
    name = "gpt";
    async doTranslate(originArr: TextNode[]) {
        let res = await sendOpenAiMessage(JSON.stringify(originArr.map(item => item.content)), await getPrompt())
        if (!res) {
            return originArr;
        }
        try {
            let translated: string[] = JSON.parse(res);
            if (translated.length != originArr.length) {
                console.log("长度不一样", translated.length, originArr.length)
            }
            return translated.map((str, index) => {
                return {
                    hash: originArr[index].hash,
                    content: str
                }
            })
        } catch (e) {
            console.log("出错了返回原数组", e)
            originArr.forEach(item => item.isError = true)
            return originArr;
        }
    }
}

async function getPrompt() {
    let tab = await getActiveTab()
    let prompt = `
        把文本数组翻译成中文,然后返回翻译后的数组
        不要说多余的话,不要多余的解释说明
        不用翻译的文本数组直接用原文
        返回的数组元素数量要和原来的一致
        页面内容来源网址:${tab.url},翻译请尽量符合上下文
        下面的要求如果和上面冲突要用上面的,抛弃下面的:
        ${translateSetting.value.prompt}
    `;
    return prompt;
}