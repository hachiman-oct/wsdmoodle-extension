import { defaultSettings } from "./settings.js";
import { changeHeader } from "./features/changeHeader.js";
import { hideUnusedLink } from "./features/hideUnusedLink.js";
import { moodleDlBtn } from "./features/moodleDlBtn.js";
import { monitorVideo } from "./features/monitorVideo.js";
import { hideElements } from "./features/hideElements.js";
import { pageMap } from "./features/utils.js";

chrome.storage.local.get(defaultSettings, (settings) => {
    let homePath = "/";

    if (settings.setHomePage) {
        homePath = "/my/courses.php";

        const isHomePage = window.location.pathname === "/";
        if (isHomePage) {
            window.location.pathname = homePath;
        }
    }
    if (settings.autoClickLogin && pageMap.isLogin) {
        const loginButton = document.querySelector(".login-identityprovider-btn");
        if (loginButton) {
            loginButton.click();
        }
    }
    if (settings.changeHeader) changeHeader(homePath);
    if (settings.hideUnusedLink) hideUnusedLink();
    if (settings.moodleDlBtn && pageMap.isCourse) moodleDlBtn(3000);
    if (settings.alertVideoStatus) monitorVideo();
    if (settings.hideEmptySections && pageMap.isCourse) {
        hideElements('[data-for="section"][role="region"]', '[data-for="cmitem"]');
    }
    if (settings.hideEmptyCourseIndex && (pageMap.isCourse || pageMap.isModule)) {
        hideElements('[data-for="section"][role="treeitem"]', '[data-for="cm"]');
    }
});