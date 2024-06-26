/**获取能看到的TextNode */
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
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (
                    node.parentElement &&
                    isVisible(node.parentElement) &&
                    node.nodeValue?.trim() !== ""
                ) {
                    return NodeFilter.FILTER_ACCEPT;
                } else {
                    return NodeFilter.FILTER_REJECT;
                }
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

export function isConnectableNode(node: Text | HTMLElement) {
    if (node.nodeType != Node.TEXT_NODE && node.nodeType != Node.ELEMENT_NODE) return false;
    if (node.nodeType == Node.TEXT_NODE) return true;
    let el = node as HTMLElement;
    let computedStyle = getComputedStyle(el)
    let parentEl = el.parentElement;
    if (parentEl) {
        let parentComputedStyle = getComputedStyle(parentEl);
        let parentDisplay = parentComputedStyle.getPropertyValue('display');
        if (parentDisplay == "block" || parentDisplay == "flex") {
            //1inline
            if (computedStyle.getPropertyValue("display") == "inline") return true;
            //2.inline-block
            if (computedStyle.getPropertyValue("display") == "inline-block" || (parentDisplay == "flex" && computedStyle.getPropertyValue("display") == "block")) {
                let preEl = el.previousElementSibling as HTMLElement;
                let preComputedStyle = getComputedStyle(preEl);
                let diffHeight = parseInt(computedStyle.height) - parseInt(preComputedStyle.height)
                if (diffHeight < parseInt(preComputedStyle.height) && parseInt(computedStyle.getPropertyValue("margin-left")) < 15) return true;
            }
        }
    }
    return false;
}
