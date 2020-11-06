

$(document).ready(function() {

    // CREATE THE MISSING CODE HERE. Your code should add content to the random-number div.
    // ...
    $("#d20-button").on("click",function(){

      let randomNum = Math.floor((Math.random() * 20) + 1);
        console.log(randomNum);

    $("#show-number").text(randomNum);
      



    });


    // ...

  });
