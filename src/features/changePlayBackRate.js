import { watchVideoElements, attachVideoStatusListeners } from "./utils.js";

export function changePlayBackRate(page) {
    function runLearningx() {
        const btn = document.querySelector("#vc-pctrl-playback-rate-20");
        if (btn) btn.click();
    }
    function runMoodle() {
        const el = Array.from(document.querySelectorAll(".control-list-speed.miovip-btn"))
            .find(e => e.textContent && e.textContent.includes("2.0"));
        if (el) {
            const parent = el.closest(".control-menu");
            const control = parent && parent.querySelector(".control-current");
            // すでに2.0が選択されている場合は何もしない
            if (control && control.textContent && control.textContent.includes("2.0")) {
                return true;
            }
            if (control) {
                control.click();
            }
            const rect = el.getBoundingClientRect();
            el.dispatchEvent(new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            }));
            el.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            }));
            return true;
        }
        return false;
    }

    if (page === "learningx") {
        watchVideoElements(video => {
            attachVideoStatusListeners(video, status => {
                if (status === "play") runLearningx();
            });
        });
    } else {
        if (!runMoodle()) {
            const observer = new MutationObserver(() => {
                if (runMoodle()) observer.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
}