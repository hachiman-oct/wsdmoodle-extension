import { changeHeader } from "./features/changeHeader.js";
import { hideUnusedLink } from "./features/hideUnusedLink.js";
import { moodleDlBtn } from "./features/moodleDlBtn.js";
import { alertVideoStatus } from "./features/videoMonitor.js";
import { pageMap } from "./features/pageMap.js";
import { hideElements } from "./features/hideElements.js";

const defaultSettings = {
    changeHeader: true,
    hideUnusedLink: true,
    moodleDlBtn: true,
    alertVideoStatus: true,
    hideEmptyCourseIndex: true,
    hideEmptySections: true,
    autoClickLogin: true,
    setHomePage: true,
};

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
        const loginButton = document.querySelector(".login-identityprovider-btn").click();
        if (loginButton) {
            loginButton.click();
        }
    }
    if (settings.changeHeader) changeHeader(homePath);
    if (settings.hideUnusedLink) hideUnusedLink();
    if (settings.moodleDlBtn && pageMap.isCourse) moodleDlBtn();
    if (settings.alertVideoStatus && pageMap.isVideo) alertVideoStatus();
    if (settings.hideEmptySections && pageMap.isCourse) {
        hideElements(".sectionbody ul", ".course-section");
    }
    if (settings.hideEmptyCourseIndex && (pageMap.isCourse || pageMap.isModule)) {
        hideElements(".courseindex-item-content ul", ".courseindex-section");
    }
});