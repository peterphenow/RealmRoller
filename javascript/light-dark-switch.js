function swapStyle(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}

$("#light").on("click", function(){
  swapStyle("css/light-mode.css");
});

$("#dark").on("click", function(){
  swapStyle("css/dark-mode.css");
})