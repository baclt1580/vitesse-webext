export type TextNode = {
    mark: string,
    content: string
}
//翻译上下文
export type TranslateContext={
    url:string

}


export abstract class AbstranctTranslate {
    async translate(originArr: TextNode[],context:TranslateContext): Promise<TextNode[]> {
        return this.doTranslate(originArr)
    }
    abstract doTranslate(originArr: TextNode[]): Promise<TextNode[]>;
}