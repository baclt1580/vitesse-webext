import { sendOpenAiMessage, splitContentsByLength } from "../utils/openai.util";
import { AbstranctTranslator, TextNode } from "./Translate.abstract";


let prompt = `
    把数据的内容翻译成中文,有以下要求:
    1.数据格式为string[],不用翻译的直接返回原文,顺序和原文一致
    2.数组的元素来自于同一个上下文,所以请根据上下文尽可能使翻译后的文本阅读性更高
    3.无需翻译的文本直接返回原文
`;

type gptResult={
    //原文index,组合在一块翻译的会有多个
    origin:string[]
    //翻译结果
    content:string
}

export class GPTTranslator extends AbstranctTranslator {
     doTranslate(originArr: TextNode[], cb: (res: TextNode[]) => void):void {
        //每600个一组
        let originArrs = splitContentsByLength(originArr);
        originArrs.forEach(async (originArr) => {
            let res = await sendOpenAiMessage(JSON.stringify(originArr.map(item => item.content)), prompt)
            if (!res) {
                return cb(originArr)
            }
            try {
                let translated = JSON.parse(res) as string[];
                cb(translated.map((str, index) => {
                    return {
                        mark: originArr[index].mark,
                        content: str
                    }
                }))
            } catch (e) {
                cb(originArr);
            }
        })
    }
}