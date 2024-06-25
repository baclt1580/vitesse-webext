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
//找出所有的块,但是没处理块中包块的情况
export function filterSection(el: HTMLElement) {
    let hasText = Array.from(el.childNodes).findIndex(item => item.nodeType == Node.TEXT_NODE)
    if (!hasText) return false;
    if (el.parentElement) {
        let style = getComputedStyle(el.parentElement)
        if (style.getPropertyValue("display") == "grid") {
            return true;
        }
        if (style.getPropertyValue("display") == "flex") {
            return style.getPropertyValue("flex-direction").startsWith("column");
        }
    }
    let arr = ["block", "flex", "grid", "table", "list-item"];
    if (arr.includes(getComputedStyle(el).getPropertyValue("display"))) {
        return true;
    }
    return false;
}
export function isConnectableNode(node: Text|HTMLElement) {
    if (node.nodeType != Node.TEXT_NODE && node.nodeType != Node.ELEMENT_NODE) return false;
    if (node.nodeType == Node.TEXT_NODE) return true;
    let el = node as HTMLElement;
    let computedStyle = getComputedStyle(el);
    let display = computedStyle.getPropertyValue("display");
    if (display == "grid" || display == "inline-grid" || display.startsWith("table")) {
        return false;
    }
    let position = getComputedStyle(el).getPropertyValue("position");
    if (position != "static" && position != "relative") return false;

    if (el.parentElement) {
        let parentDisplay = getComputedStyle(el.parentElement).getPropertyValue("display");
        let parentFlexDirection = getComputedStyle(el.parentElement).getPropertyValue("flex-direction");
        if (parentDisplay == "grid" || parentDisplay == "inline-grid" || parentDisplay.startsWith("table")
            || (parentDisplay == "flex" && parentFlexDirection.startsWith("column"))
        ) {
            return false;
        }
        if ((parentDisplay == "block" && display == "inline-block") || (parentDisplay == "flex" && parentFlexDirection == "row")) {
            let preEl = el.previousElementSibling as HTMLElement;
            let preComputedStyle = getComputedStyle(preEl);
            let diffHeight = parseInt(preComputedStyle.height) - parseInt(computedStyle.height)
            if (diffHeight > parseInt(preComputedStyle.height)) return false;
            if (parseInt(preComputedStyle.getPropertyValue("margin-left")) > 15) return false;
        }
        if(parentDisplay=="block"&&display=="block")return false;
    }
    return true;
}

export function isConnectableNode_ai(node: Node): boolean {
    // 检查节点类型是否为文本节点或元素节点
    if (node.nodeType !== Node.TEXT_NODE && node.nodeType !== Node.ELEMENT_NODE) return false;
    if (node.nodeType === Node.TEXT_NODE) return true;

    const el = node as HTMLElement;
    const computedStyle = getComputedStyle(el);

    // 检查 display 属性
    const display = computedStyle.display;
    if (display === "grid" || display === "inline-grid" || display.startsWith("table")) return false;

    // 检查 position 属性
    const position = computedStyle.position;
    if (position !== "static" && position !== "relative") return false;

    // 检查 float 属性
    const float = computedStyle.float;
    if (float !== "none") return false;

    // 检查 clear 属性
    const clear = computedStyle.clear;
    if (clear !== "none") return false;

    // 检查 white-space 属性
    const whiteSpace = computedStyle.whiteSpace;
    if (whiteSpace === "nowrap" || whiteSpace === "pre" || whiteSpace === "pre-wrap") return false;

    // 检查 visibility 和 display 属性
    const visibility = computedStyle.visibility;
    if (visibility === "hidden" || display === "none") return false;

    // 检查父元素的样式
    const parent = el.parentElement;
    if (parent) {
        const parentComputedStyle = getComputedStyle(parent);
        const parentDisplay = parentComputedStyle.display;
        const parentFlexDirection = parentComputedStyle.flexDirection;

        // 检查父元素的 display 和 flex-direction 属性
        if (parentDisplay === "grid" || parentDisplay === "inline-grid" || parentDisplay.startsWith("table") ||
            (parentDisplay === "flex" && parentFlexDirection.startsWith("column"))) {
            return false;
        }

        // 检查特定的父子 display 组合
        if ((parentDisplay === "block" && display === "inline-block") || 
            (parentDisplay === "flex" && parentFlexDirection === "row")) {
            const preEl = el.previousElementSibling as HTMLElement | null;
            if (preEl) {
                const preComputedStyle = getComputedStyle(preEl);
                
                // 检查高度差
                const elHeight = el.getBoundingClientRect().height;
                const preElHeight = preEl.getBoundingClientRect().height;
                if (Math.abs(elHeight - preElHeight) > preElHeight) return false;

                // 检查前一个元素的 margin-left
                if (parseInt(preComputedStyle.marginLeft) > 15) return false;
            }
        }

        // 检查父子都为 block 的情况
        if (parentDisplay === "block" && display === "block") return false;
    }

    return true;
}


type Section = {
    container: HTMLElement,
}
let sections: HTMLElement[] = []

export function fn() {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, node => {
        return filterSection(node as HTMLElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    })
    //细分块中快
    while (treeWalker.nextNode()) {
        let sectionEl = treeWalker.currentNode as HTMLElement;

    }

}
