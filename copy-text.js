function copyText() {
  let text = document.getElementById("email");
  let btn = document.getElementById("copy-btn");

  // Copy the text inside the text field
  navigator.clipboard.writeText("wwwavvves@gmail.com");

  // Change button text
  if (btn.innerText === "Copy") {
    btn.innerText = "Copied";
  } else {
    btn.innerText = "Copy";
    navigator.clipboard.writeText("");
  }
}
