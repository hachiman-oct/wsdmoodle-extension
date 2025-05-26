export const pageMap = {
    isHome: window.location.pathname === "/",
    isDashboard: window.location.pathname === "/my/",
    isMycourse: window.location.pathname === "/my/courses.php",
    isLogin: window.location.pathname === "/login/index.php",
    isVideo: window.location.pathname === "/mod/millvi/view.php",
    isCourse: window.location.pathname === "/course/view.php",
    isModule: window.location.pathname.startsWith("/mod/"),
};