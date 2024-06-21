import { sendOpenAiMessage } from "../utils/openai.util";
import { AbstranctTranslate, TextNode } from "./Translate.abstract";


let prompt = `
把数据的内容翻译成中文,有以下要求:
1.数据格式为{mark:string,content:string}[],mark不用翻译,直接返回原文,content翻译成中文
2.数组的元素来自于同一个上下文,所以请根据上下文尽可能使翻译后的文本阅读性更高
3.无需翻译的文本直接返回原文
`;


export class GPTTranslator extends AbstranctTranslate {
    async doTranslate(originArr: TextNode[]): Promise<TextNode[]> {
       let res=await sendOpenAiMessage(JSON.stringify(originArr),prompt)
    }
}