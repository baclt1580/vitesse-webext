import { container, injectable, singleton } from "tsyringe";
import { sendOpenAiMessage} from "../utils/openai.util";
import { AbstranctTranslator, TextNode } from "./Translate.abstract";


let prompt = `
    把数据的内容翻译成中文,有以下要求:
    1.文本由@#分开,翻译后也一样用@#分开,不用翻译的直接返回原文,数量不要多或者少
    2.直接返回答案，不要多余解释。
`;

@singleton()
export class GPTTranslator extends AbstranctTranslator {
    name = "gpt";
    async doTranslate(originArr: TextNode[]) {
        
        let res = await sendOpenAiMessage(originArr.map(item=>item.content).join("@#"), prompt)
        if (!res) {
            return originArr;
        }
        try {
            let translated =res.split("@#");
            return translated.map((str, index) => {
                return {
                    hash: originArr[index].hash,
                    content: str
                }
            })
        } catch (e) {
            console.log("出错了返回原数组", e)
            return originArr
        }
    }
}
