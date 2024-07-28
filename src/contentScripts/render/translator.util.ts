import { debounce } from "lodash-es";
import { TextNode } from "~/background/translator/Translate.abstract";

//页面向下滚动时执行
export function onScroll(callback: () => void): () => void {
    let onScrollDebounce=debounce(callback,300)
    window.addEventListener('scroll', onScrollDebounce);
    return () => {
        window.removeEventListener('scroll', onScrollDebounce);
    };
}

export function splitContentsByLength(textNodes: TextNode[], maxLength: number = 4000): TextNode[][] {
    let res:TextNode[][]=[];
    let temp:TextNode[]=[];
    let tempLength=0;
    textNodes.forEach(textNode=>{
      if(tempLength+textNode.content.length>maxLength){
        temp.push(textNode);
        res.push(temp);
        temp=[];
        tempLength=0;
      }else{
        temp.push(textNode);
        tempLength+=textNode.content.length
      }
    })
    res.push(temp);
    return res;
}
  