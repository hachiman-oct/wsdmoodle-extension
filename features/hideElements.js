export function hideElements(listSel, sectionSel) {
    function hideLists() {
        const lists = document.querySelectorAll(listSel);
        lists.forEach(list => {
            const listItems = list.querySelectorAll("li");
            if (listItems.length === 0) {
                const section = list.closest(sectionSel);
                if (section) section.style.display = "none";
            }
        });
    }

    // 初回実行
    hideLists();

    // DOMの変化を監視して再実行
    const observer = new MutationObserver(() => {
        hideLists();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}