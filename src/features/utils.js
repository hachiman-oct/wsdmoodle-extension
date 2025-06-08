const isWsdMoodle = window.location.hostname === "wsdmoodle.waseda.jp";

export const pageMap = {
    isHome: isWsdMoodle && window.location.pathname === "/",
    isDashboard: isWsdMoodle && window.location.pathname === "/my/",
    isMycourse: isWsdMoodle && window.location.pathname === "/my/courses.php",
    isLogin: isWsdMoodle && window.location.pathname === "/login/index.php",
    isCourse: isWsdMoodle && window.location.pathname === "/course/view.php",
    isModule: isWsdMoodle && window.location.pathname.startsWith("/mod/"),
};

/**
 * video要素の追加を監視し、コールバックで新規video要素を通知するユーティリティ
 * @param {(video: HTMLVideoElement) => void} callback
 */
export function watchVideoElements(callback) {
    // 既存のvideoにもコールバック
    document.querySelectorAll("video").forEach(callback);
    // 動的追加を監視
    const observer = new MutationObserver(() => {
        document.querySelectorAll("video").forEach(callback);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return observer;
}

/**
 * 動画の状態（再生・一時停止・終了）を監視し、コールバックで状態を通知する（コールバック配列方式）
 * @param {HTMLVideoElement} video
 * @param {(status: 'play' | 'pause' | 'end', video: HTMLVideoElement) => void} callback
 */
export function attachVideoStatusListeners(video, callback) {
    if (!video._videoStatusCallbacks) {
        video._videoStatusCallbacks = [];
        let ended = false;
        function handleEnded() {
            if (!ended) {
                ended = true;
                video._videoStatusCallbacks.forEach(cb => cb("end", video));
                cleanup();
            }
        }
        function handlePause() {
            if (!ended && video.currentTime < video.duration) {
                video._videoStatusCallbacks.forEach(cb => cb("pause", video));
            }
        }
        function handlePlay() {
            if (!ended) {
                video._videoStatusCallbacks.forEach(cb => cb("play", video));
            }
        }
        function cleanup() {
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("play", handlePlay);
            video._videoStatusCallbacks = null;
        }
        video.addEventListener("ended", handleEnded);
        video.addEventListener("pause", handlePause);
        video.addEventListener("play", handlePlay);
    }
    // 同じコールバックが複数回登録されないようにする
    if (!video._videoStatusCallbacks.includes(callback)) {
        video._videoStatusCallbacks.push(callback);
    }
}