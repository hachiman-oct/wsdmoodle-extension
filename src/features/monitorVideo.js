import { watchVideoElements, attachVideoStatusListeners } from "./utils.js";

let alreadyWarned = false;

export function monitorVideo() {
    function alertStatus(status) {
        if (status === "end") {
            alert("The video has ended.");
        }
    }
    watchVideoElements(video => {
        attachVideoStatusListeners(video, alertStatus);

        let lastTime = video.currentTime;
        let stuckSince = null;
        const stuckThreshold = 3000; // ms
        const intervalTime = 500; // ms

        setInterval(() => {
            if (video.paused || video.ended) return;

            if (video.currentTime !== lastTime) {
                lastTime = video.currentTime;
                stuckSince = null;
                alreadyWarned = false;
            } else {
                if (!stuckSince) {
                    stuckSince = Date.now();
                } else if (Date.now() - stuckSince > stuckThreshold && !alreadyWarned) {
                    alert(`The video may be stuck or buffering (no progress for ${stuckThreshold / 1000} seconds).`);
                    alreadyWarned = true;
                }
            }
        }, intervalTime);
    });
}