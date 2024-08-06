const btnToOpen = document.querySelector("#btn-open");
const btnToClose = document.querySelector("#btn-close");
const navMenu = document.querySelector(".nav-menu");

function openMenu() {
  btnToOpen.setAttribute("aria-expanded", "true");
  navMenu.style.translate = 0;
}

function closeMenu() {
    btnToClose.setAttribute("aria-expanded", "false");
    navMenu.style.translate = "100vw 0";
}

btnToOpen.addEventListener("click", openMenu);
btnToClose.addEventListener("click", closeMenu);
