/**获取能看到的Element */
export function getVisibleTextNodes(): Text[] {
    const textNodes: Text[] = [];

    function isVisible(element: Element): boolean {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth &&
            getComputedStyle(element).visibility !== 'hidden' &&
            getComputedStyle(element).display !== 'none'
        );
    }

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ALL,
        {
            acceptNode(node) {
                return isConnectableNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            },
        }
    );

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
    }

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

export function isConnectableNode(node: Node) {
    if (node.nodeType != Node.TEXT_NODE && node.nodeType != Node.ELEMENT_NODE) return false;
    if (node.nodeType == Node.TEXT_NODE) return true;
    let el = node as HTMLElement;
    if (el.dataset.isWrapper == "isWrapper") return false;
    if (el.tagName.toLowerCase() === 'code') return false;

    let computedStyle = getComputedStyle(el)
    let parentEl = el.parentElement;
    if (parentEl) {
        let parentComputedStyle = getComputedStyle(parentEl);
        let parentDisplay = parentComputedStyle.getPropertyValue('display');
        if (parentDisplay == "block" || parentDisplay == "flex" || parentDisplay == "list-item") {
            //1inline
            if (computedStyle.getPropertyValue("display") == "inline") return true;
            //2.inline-block
            if (computedStyle.getPropertyValue("display") == "inline-block" || (parentDisplay == "flex" && computedStyle.getPropertyValue("display") == "block")) {
                let preEl = el.previousElementSibling as HTMLElement || el.nextElementSibling as HTMLElement;;
                if (preEl) {
                    let preComputedStyle = getComputedStyle(preEl);
                    let diffHeight = parseInt(computedStyle.height) - parseInt(preComputedStyle.height)
                    if (diffHeight < parseInt(preComputedStyle.height) && parseInt(computedStyle.getPropertyValue("margin-left")) < 10 && parseInt(computedStyle.getPropertyValue("margin-right")) < 10 && parseInt(computedStyle.getPropertyValue("padding-left")) < 10 && parseInt(computedStyle.getPropertyValue("padding-right")) < 10) return true;
                } else {

                    return true;
                }

            }
        }
    }
    return false;
}

// 判断元素是否在可见区域内的辅助函数
function isElementInViewport(el: HTMLElement): boolean {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
    return top  <= viewPortHeight + 100
}

// 获取所有可见元素的主函数,其中还过滤了不用翻译的
export function getVisibleElements(): HTMLElement[] {
    // 创建 TreeWalker 实例以遍历文档中的所有元素节点
    const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node) => {
                let isVisible = isElementInViewport(node as HTMLElement);
               
                return isVisible && node.textContent?.trim().length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        }
    );

    // 存储所有可见元素的数组
    const visibleElements: HTMLElement[] = [];

    // 遍历所有元素节点
    while (treeWalker.nextNode()) {
        const currentNode = treeWalker.currentNode;
        visibleElements.push(currentNode as HTMLElement)
    }

    // 返回所有可见元素的数组
    return visibleElements;
}
function isNotTranslatable(text: string) {
    // 定义正则表达式，匹配符号、空白符、数字和表情
    const pattern = /^[\s\d\p{P}\p{S}\u{1F600}-\u{1F64F}]+$/u;

    // 使用正则表达式进行匹配
    return pattern.test(text);
}