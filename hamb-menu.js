const btnToOpen = document.querySelector("#btn-open");
const btnToClose = document.querySelector("#btn-close");
const navMenu = document.querySelector(".nav-menu");

function openMenu() {
  navMenu.style.display = "block";
}

function closeMenu() {
  navMenu.style.display = "none";
}

btnToOpen.addEventListener("click", openMenu);
btnToClose.addEventListener("click", closeMenu);
