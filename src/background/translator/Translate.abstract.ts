import { chunk } from "lodash-es"

export type TextNode = {
    hash: string,
    content: string
}
//翻译上下文
export type TranslateContext={
    url:string

}

export interface Translator{
    name:string
    translate(originArr: TextNode[]):Promise<TextNode[]>
}

export abstract class AbstranctTranslator implements Translator {
    abstract name:string
    async translate(originArr: TextNode[]) {
         return this.doTranslate(originArr)
    }
    abstract doTranslate(originArr: TextNode[]):Promise<TextNode[]>;
}