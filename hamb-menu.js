const btnToOpen = document.querySelector("#btn-open");
const btnToClose = document.querySelector("#btn-close");
const navMenu = document.querySelector(".nav-menu");

function openMenu() {
  navMenu.style.translate = 0;
}

function closeMenu() {
  navMenu.style.translate = "100vw 0";
}

btnToOpen.addEventListener("click", openMenu);
btnToClose.addEventListener("click", closeMenu);
