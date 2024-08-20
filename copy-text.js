let copySvg = document.getElementById("copy-btn");
copySvg.addEventListener("click", e => {
  navigator.clipboard.writeText("wwwavvves@gmail.com");
  copySvg.src = "./images/copied.svg";
  setTimeout(() => {
    copySvg.src = "./images/copy.svg";
  }, 3000);
});