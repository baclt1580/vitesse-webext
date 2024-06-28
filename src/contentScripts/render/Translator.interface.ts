export interface Translator{
    /**开始翻译 */
    translate(mode:1|2|3):any
    /**1只显示原文,2只显示译文,3全部显示 */
    toggleMode(mode:1|2|3):void
}