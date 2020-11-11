function swapStyle(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}

function letsGo() {
  let light = document.getElementById("stylesheet1");
  light.onclick = swapStyle("css/light-mode.css");
}

function letsGo2() {
  let dark = document.getElementById("stylesheet2");
  dark.onclick = swapStyle("css/dark-mode.css");
}
