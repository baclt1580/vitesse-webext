
let dealedEls: HTMLElement[] = [];

/**可见范围元素生成wrapper并返回 */
export function generateVisibleWrappers(isBottom: boolean = false) {
    let elements = getElements(true);
    return generateWrappersByElements(elements, isBottom)
}
export function generateAllWrappers() {
    let elements = getElements(false);
    return generateWrappersByElements(elements)
}
function generateWrappersByElements(elements: HTMLElement[], isBottom: boolean = false) {
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
        let wrapper = document.createElement('div');
        wrapper.dataset.isWrapper = "isWrapper"
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        el.replaceChild(wrapper, contactableWithText);
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

//是否为可连接node
function isConnectableNode(node: Node) {
    if (node.nodeType != Node.TEXT_NODE && node.nodeType != Node.ELEMENT_NODE) return false;
    if (node.nodeType == Node.TEXT_NODE) return true;
    let el = node as HTMLElement;
    let computedStyle = getComputedStyle(el);
    if (el.dataset.isWrapper == "isWrapper") return false;
    if (computedStyle.getPropertyValue("display") == "inline") return true;
    if (computedStyle.getPropertyValue("display") == "inline-block") return true;
    return false
}


// 获取所有可见元素的主函数
//有可翻译字
export function getElements(validatevisible: boolean): HTMLElement[] {
    // 创建 TreeWalker 实例以遍历文档中的所有元素节点
    const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node: HTMLElement) => {
                if (node.tagName.toLowerCase().includes("code")) return NodeFilter.FILTER_REJECT;
                if (node.tagName.toLowerCase().includes("script")) return NodeFilter.FILTER_REJECT;
                if (node.tagName.toLowerCase().includes("style")) return NodeFilter.FILTER_REJECT;
                if (node.tagName.toLowerCase().includes("link")) return NodeFilter.FILTER_REJECT;
                if (node.classList.contains("notranslate")) return NodeFilter.FILTER_REJECT;
                if (node.dataset.isWrapper == "isWrapper") return NodeFilter.FILTER_REJECT;
                let isVisible = true;
                if (validatevisible) {
                    isVisible = isElementInViewport(node as HTMLElement);
                }
                let index = Array.from(node.childNodes).findIndex(node => {
                    return isConnectableNode(node) && node.textContent && isNeedTranslatable(node.textContent)
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
    let bool1 = !pattern.test(text);
    return bool1;

}
// 判断元素是否在可见区域内的辅助函数
function isElementInViewport(el: HTMLElement): boolean {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;

    let bool1= top <= viewPortHeight + 100
    if(!bool1)return false;
    let computedStyle=getComputedStyle(el);

    let bool2=computedStyle.display!="none";
    if(!bool2)return false;

    let bool3=computedStyle.visibility!="hidden";
    if(!bool3)return false;
    return true;
}


export function createElementFromHTML(htmlString: string) {
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