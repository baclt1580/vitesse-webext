import { chunk } from "lodash-es"

export type TextNode = {
    mark: string,
    content: string
}
//翻译上下文
export type TranslateContext={
    url:string

}

export interface Translator{
    translate(originArr: TextNode[],cb:(res:TextNode[])=>void,context:TranslateContext):void
}

export abstract class AbstranctTranslator implements Translator {
    async translate(originArr: TextNode[],cb:(res:TextNode[])=>void,context:TranslateContext) {
         this.doTranslate(originArr,cb)
    }
    abstract doTranslate(originArr: TextNode[],cb:(res:TextNode[])=>void):void;
}