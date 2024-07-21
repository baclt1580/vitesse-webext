import { debounce } from "lodash-es";
import { TextNode } from "~/background/translator/Translate.abstract";

//页面向下滚动时执行
export function onScrollDown(callback: () => void): () => void {
    let lastScrollTop = 0;
    
    function onScroll(): void {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            callback();
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }
    let onScrollDebounce=debounce(onScroll,300)
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
  