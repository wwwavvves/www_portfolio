let copySvg = document.getElementById("copy-btn");
copySvg.addEventListener("click", e => {
  document.getElementById("overlay").style.display = "block";
  navigator.clipboard.writeText("wwwavvves@gmail.com");
  copySvg.src = "../images/copied.svg";
  
  setTimeout(() => {
  document.getElementById("overlay").style.display = "none";
  copySvg.src = "../images/copy.svg";
  }, 800);
  
});