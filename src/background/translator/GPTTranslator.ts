import { sendOpenAiMessage, splitContentsByLength } from "../utils/openai.util";
import { AbstranctTranslator, TextNode } from "./Translate.abstract";


let prompt = `
    把数据的内容翻译成中文,有以下要求:
    .数据格式为string[],不用翻译的直接返回原文
    .翻译后的顺序为了保证可读性可以有变化,但数量要和传入的一致,所以翻译完要务必检查数量
    .为了语义化要考虑把某几个组合在一块翻译,由于组合在一块翻译导致的数量减少后面要补空字符串直到和组合前的数量一样,比如[A,B,C,D] A句和B句和C句组合在一块翻译要返回[ABC组合翻译,"","",,D]
    .数组的元素来自于同一个上下文,所以请根据上下文尽可能使翻译后的文本阅读性更高
    .无需翻译的文本直接返回原文
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
        originArrs.forEach(async (originArr,index) => {
            let res = await sendOpenAiMessage(JSON.stringify(originArr.map(item => item.content)), prompt)
            if (!res) {
                return cb(originArr)
            }
            try {
                let translated = JSON.parse(res) as string[];
                console.log("translated",translated,originArr)
                cb(translated.map((str, index2) => {
                    return {
                        mark: originArr[index2].mark,
                        content: str
                    }
                }))
            } catch (e) {
            
                console.log("出错了返回原数组",e)
                cb(originArr);
            }
        })
    }
}