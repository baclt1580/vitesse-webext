
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

