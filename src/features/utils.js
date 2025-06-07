const isWsdMoodle = window.location.hostname === "wsdmoodle.waseda.jp";

export const pageMap = {
    isHome: isWsdMoodle && window.location.pathname === "/",
    isDashboard: isWsdMoodle && window.location.pathname === "/my/",
    isMycourse: isWsdMoodle && window.location.pathname === "/my/courses.php",
    isLogin: isWsdMoodle && window.location.pathname === "/login/index.php",
    isCourse: isWsdMoodle && window.location.pathname === "/course/view.php",
    isModule: isWsdMoodle && window.location.pathname.startsWith("/mod/"),
};