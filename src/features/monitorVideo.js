import { watchVideoElements, attachVideoStatusListeners } from "./utils.js";

export function monitorVideo() {
    function alertStatus(status) {
        if (status === "end") {
            alert("The video has ended.");
        } else if (status === "pause") {
            alert("The video has been paused.");
        } else if (status === "play") {
            // console.log("The video is now playing.");
        }
    }
    watchVideoElements(video => attachVideoStatusListeners(video, alertStatus));
}