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

    window.addEventListener('scroll', onScroll);
    return () => {
        window.removeEventListener('scroll', onScroll);
    };
}

export function splitContentsByLength(objects: TextNode[], maxLength: number = 1200): TextNode[][] {
    const result: TextNode[][] = [];
    let currentBatch: TextNode[] = [];
    let currentLength: number = 0;
  
    for (const obj of objects) {
      // 如果当前批次加上当前对象会超过最大长度，则保存当前批次并开始新的批次
      if (currentLength + obj.content.length > maxLength) {
        result.push(currentBatch);
        currentBatch = [];
        currentLength = 0;
      }
  
      // 将当前对象添加到当前批次
      currentBatch.push(obj);
      currentLength += obj.content.length;
    }
  
    // 不要忘记在结束时添加最后一个批次
    if (currentBatch.length > 0) {
      result.push(currentBatch);
    }
  
    return result;
  }
  