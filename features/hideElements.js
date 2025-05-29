export function hideElements(sectionSel, itemSel) {
    function hide() {
        const sections = document.querySelectorAll(sectionSel);
        sections.forEach(sec => {
            const items = sec.querySelectorAll(itemSel);
            if (items.length !== 0) return;
            
            sec.style.display = "none";
        });
    }

    // 初回実行
    hide();

    // DOMの変化を一度だけ監視して再実行
    const observer = new MutationObserver(() => {
        hide();
    });
    observer.observe(document.querySelector("#courseindex"), { childList: true, subtree: true });
}