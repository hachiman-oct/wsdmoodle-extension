export function hideUnusedLink() {
    // /course/view.php の場合はナビゲーション全体を非表示
    if (location.pathname === "/course/view.php") {
        const navbar = document.querySelector("#page-navbar");
        if (navbar && navbar.parentElement) {
            navbar.parentElement.style.setProperty("display", "none", "important");
        }
        return;
    }

    const breadcrumbItems = document.querySelectorAll(".breadcrumb-item");
    breadcrumbItems.forEach(item => {
        const aTag = item.querySelector("a");
        if (aTag && aTag.href) {
            try {
                const url = new URL(aTag.href, location.origin);
                const urlParams = new URLSearchParams(url.search);
                const categoryId = urlParams.get('categoryid');
                if (categoryId !== null) {
                    item.style.display = "none";
                }
            } catch (e) {
                // URLが不正な場合は無視
            }
        }
    });
}