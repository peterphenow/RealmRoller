

//on-click function to randomly generate a number 1-20
$(document).ready(function() {

   
    $("#d20-button").on("click",function(){

      let randomNum = Math.floor((Math.random() * 20) + 1);
        console.log(randomNum);

    $("#show-number").text(randomNum);
    });
  });