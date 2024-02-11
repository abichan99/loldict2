export function insertHomepageLink() {
    const elem = document.getElementById("header-title");
    const homepageUrl = window.location.href.split("?")[0];
    elem?.setAttribute("href", homepageUrl);
}