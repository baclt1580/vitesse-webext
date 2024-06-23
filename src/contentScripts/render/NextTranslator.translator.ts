
import { Translator } from "./Translator.interface";
import { getVisibleTextNodes } from "./translator.util";

/**
 * 用来渲染到原文旁
 */

/**
 * 用来表示一段node
 */
export type ContentNode = {
    mark: string
    node: Text,
    //原文
    origin: string | null,
    //译文
    translated: string | null,
    rendered: boolean
}
export const contentNodes: Ref<ContentNode[]> = ref([]);

export class NextTranslator implements Translator {
    constructor(){
      
    }
    revert() {
        throw new Error("Method not implemented.");
    }
    translate() {
        function translateVisibleText() {
            let nodes = getVisibleTextNodes().filter(node=>contentNodes.value.findIndex(item=>item.node.isSameNode(node))<0);
            
          
        }
        
    }
    render(contentNodes: ContentNode[]): void {
        
    }
    
}