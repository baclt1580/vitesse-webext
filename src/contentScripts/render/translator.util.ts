/**获取能看到的TextNode */
export function getVisibleTextNodes(root: Node = document.body): Text[] {
    const textNodes: Text[] = [];

    function isVisible(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
    }

    function traverse(node: Node): void {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.parentElement && isVisible(node.parentElement) && node.textContent && node.textContent.trim() !== '') {
                textNodes.push(node as Text);
            }
        } else {
            node.childNodes.forEach(childNode => traverse(childNode));
        }
    }

    traverse(root);
    return textNodes;
}
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

export function isWrapEl(el: HTMLElement) {
    let arr = ["block", "flex", "grid", "table", "list-item"];
    if (arr.includes(getComputedStyle(el).getPropertyValue("display"))) {
        return true;
    }
    if (el.parentElement) {
        let style = getComputedStyle(el.parentElement)
        if (style.getPropertyValue("display") == "grid") {
            return true;
        }
        if (style.getPropertyValue("display") == "flex") {
            return style.getPropertyValue("flex-direction").startsWith("column");
        }
    }
    return false;
}

type Section = {
    container: HTMLElement,
}
let sections: HTMLElement[] = []

export function fn() {
    //筛选出子节点有文本的换行元素
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, node => {
        let hasText = Array.from(node.childNodes).findIndex(item => item.nodeType == Node.TEXT_NODE)
        return hasText && isWrapEl(node as HTMLElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    })
    //以当前节点为块还是说再细分
    /**
     * 再细分条件:
     * 1.内部有块级元素且当前元素不为flex,块级前后要分开,块级内部递归处理
     * 2.有块级元素,且当前元素为flex,但块级元素左右边距过大,或者高度过高
     * 
     */
    while (treeWalker.nextNode()) {
        let el = treeWalker.currentNode as HTMLElement;
        if (el.dataset.isSection) continue;
        //简单判断,全部是文字的作为一个section
        if (!el.children.length) {
            if (el.dataset) {
                el.dataset.isSection = "1";
            }
            sections.push(el);
            continue;
        }
        /**
         * 核心处理
         * 碰到需要分开的
         */
        let lineHeight=parseInt(getComputedStyle(el).getPropertyValue("line-height"));
        function needDeal(el:HTMLElement){
            return isWrapEl(el)||el.offsetHeight>lineHeight*2
        }
        for(let currentEl of Array.from(el.children)){
            
        }
        let allInline = Array.from(el.children).every(el => {
            return getComputedStyle(el).getPropertyValue("display") == "inline"
        })
        if (allInline) {
            sections.push(el);
        }
    }

}
