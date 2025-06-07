export function monitorVideo() {
    function alertStatus(status) {
        if (status === "end") {
            alert("The video has ended.");
        } else if (status === "pause") {
            alert("The video has been paused.");
        }
    }

    function attachListeners(video) {
        if (video._monitoring) return;
        video._monitoring = true;
        let ended = false;
        function handleEnded() {
            if (!ended) {
                ended = true;
                alertStatus("end");
                cleanup();
            }
        }
        function handlePause() {
            if (!ended && video.currentTime < video.duration) {
                alertStatus("pause");
            }
        }
        function cleanup() {
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("pause", handlePause);
            video._monitoring = false;
        }
        video.addEventListener("ended", handleEnded);
        video.addEventListener("pause", handlePause);
    }

    // 既存のvideoにもリスナーを付与
    document.querySelectorAll("video").forEach(attachListeners);

    // 動的追加を監視
    const observer = new MutationObserver(() => {
        document.querySelectorAll("video").forEach(attachListeners);
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

