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
