import { container, injectable, singleton } from "tsyringe";
import { sendOpenAiMessage} from "../utils/openai.util";
import { AbstranctTranslator, TextNode } from "./Translate.abstract";


let prompt = `
   把文本数组翻译成中文,然后返回翻译后的数组
   不要说多余的话,不要多余的解释说明
   不用翻译的文本数组直接用原文
   返回的数组元素数量要和原来的一致
`;

@singleton()
export class GPTTranslator extends AbstranctTranslator {
    name = "gpt";
    async doTranslate(originArr: TextNode[]) {
        
        let res = await sendOpenAiMessage(JSON.stringify(originArr.map(item=>item.content)), prompt)
        if (!res) {
            return originArr;
        }
        try {
            let translated:string[] =JSON.parse(res);
            if(translated.length!=originArr.length){
                console.log("长度不一样",translated.length,originArr.length)
            }
            return translated.map((str, index) => {
                return {
                    hash: originArr[index].hash,
                    content: str
                }
            })
        } catch (e) {
            console.log("出错了返回原数组", e)
            originArr.forEach(item=>item.isError=true)
            return originArr;
        }
    }
}
