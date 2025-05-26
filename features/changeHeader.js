export function changeHeader(homePath) {
    const moodleLogo = chrome.runtime.getURL("sources/header.svg");
    const primaryNavigation = document.querySelector(".primary-navigation");
    const brandLogo = document.querySelector(".navbar-brand");
    const brandLogoImg = brandLogo?.querySelector("img");
    [primaryNavigation, brandLogoImg].forEach(el => {
        if (el) el.style.display = "none";
    });

    const logoLink = document.createElement("a");
    logoLink.href = homePath;

    const logoSvg = document.createElement("img");
    logoSvg.src = moodleLogo;
    logoSvg.id = "moodle-logo";

    document.querySelector(".container-fluid")?.insertBefore(logoLink, primaryNavigation);
    logoLink.appendChild(logoSvg);

    const logoEl = document.querySelector("#moodle-logo");
    if (logoEl) {
        logoEl.removeAttribute("width");
        logoEl.removeAttribute("height");
        logoEl.style.width = "200px";
        logoEl.style.height = "40px";
    }
}