
let elements = getVisibleElements();
let dealedEls: HTMLElement[] = [];

/**可见范围元素生成wrapper并返回 */
export function generateWrappers(generateWrapper?: () => HTMLElement) {
    let wrappers = elements.map(el => {
        if (dealedEls.includes(el)) return;
        let contactableWithText = Array.from(el.childNodes).find(node => {
            return node.nodeType == Node.TEXT_NODE || (node.nodeType == Node.ELEMENT_NODE && node.textContent && isNeedTranslatable(node.textContent))
        })
        if (!contactableWithText) return;
        //相邻可连接一直到不可连接
        let contactables: Node[] = [contactableWithText];
        let nextNode = contactableWithText.nextSibling;
        while (nextNode && isConnectableNode(nextNode)) {
            contactables.push(nextNode);
            nextNode = nextNode.nextSibling
        }
        //包裹
        let wrapper = generateWrapper?generateWrapper():document.createElement('div');
        wrapper.dataset.isWrapper = "isWrapper"
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        el.replaceChild(wrapper, contactableWithText);
        wrapper.style.marginBottom = getComputedStyle(wrapper).getPropertyValue("height");
        contactables.forEach(node => {
            wrapper.appendChild(node)
        })
        //标记
        let walker = document.createTreeWalker(wrapper, NodeFilter.SHOW_ELEMENT)
        while (walker.nextNode()) {
            dealedEls.push(walker.currentNode as HTMLElement);
        }
        return wrapper;
    }).filter(item => !!item) as HTMLElement[];
    return wrappers;
}

function isConnectableNode(node: Node) {
    if (node.nodeType != Node.TEXT_NODE && node.nodeType != Node.ELEMENT_NODE) return false;
    if (node.nodeType == Node.TEXT_NODE) return true;
    let el = node as HTMLElement;
    if (el.dataset.isWrapper == "isWrapper") return false;
    if (el.tagName.toLowerCase() === 'code') return false;
    let computedStyle = getComputedStyle(el);
    if (computedStyle.getPropertyValue("display") == "inline") return true;
    if (computedStyle.getPropertyValue("display") == "inline-block") return true;
    return false
}


// 获取所有可见元素的主函数
//有可翻译字
export function getVisibleElements(): HTMLElement[] {
    // 创建 TreeWalker 实例以遍历文档中的所有元素节点
    const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node: HTMLElement) => {
                if (node.tagName.toLowerCase() == "code") return NodeFilter.FILTER_REJECT;
                if (node.dataset.isWrapper == "isWrapper") return NodeFilter.FILTER_REJECT;
                let isVisible = isElementInViewport(node as HTMLElement);
                let index = Array.from(node.childNodes).findIndex(node => {
                    return node.nodeType == Node.TEXT_NODE && node.nodeValue && isNeedTranslatable(node.nodeValue)
                })
                return isVisible && index > -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
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
export function isNeedTranslatable(text: string) {
    // 定义正则表达式，匹配符号、空白符、数字和表情
    const pattern = /^[\s\d@/\.\*\+\-\?\ud83c \udf00-\udfff \ud83d \udc00-\ude4f \ude80-\udeff \u2600-\u2B55 \u2764\uFE0F]+$/
    // 使用正则表达式进行匹配
    return !pattern.test(text);
}
// 判断元素是否在可见区域内的辅助函数
function isElementInViewport(el: HTMLElement): boolean {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
    return top <= viewPortHeight + 100
}


export function createElementFromHTML(htmlString:string) {
    var template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    // 使用 .content.firstChild 获取生成的元素
    return template.content.firstChild
}

export function removeParent(parentElement: HTMLElement): void {
    const grandParentElement = parentElement.parentElement;

    if (grandParentElement) {
        // 将父元素的所有子元素插入到父元素的父元素中
        while (parentElement.firstChild) {
            grandParentElement.insertBefore(parentElement.firstChild, parentElement);
        }

        // 删除父元素
        grandParentElement.removeChild(parentElement);
    } else {
        console.error("The parent element does not have a grandparent element.");
    }
}