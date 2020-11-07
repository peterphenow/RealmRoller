

//on-click function to randomly generate a number 1-20

  
    $("#dice-button").on("click",function(){
      let diceInput = $("#diceInput");
      console.log(diceInput.val());
      
      if (diceInput.val() === "d4"){
        rollD4();
        $("#show-number").text(rollD4);
      }
      
      if (diceInput.val() === "d6"){
        rollD6();
        $("#show-number").text(rollD6);
      }

      if (diceInput.val() === "d8"){
        rollD8();
        $("#show-number").text(rollD8);
      }

      if (diceInput.val() === "d10"){
        rollD10();
        $("#show-number").text(rollD10);
      }

      if (diceInput.val() === "d12"){
        rollD12();
        $("#show-number").text(rollD12);
      }
      if (diceInput.val() === "d20"){
        rollD20();
        $("#show-number").text(rollD20);
      }
    });

    
  function rollD4()
      {
      let randomNum = Math.floor((Math.random() * 4) + 1);
        console.log(randomNum);
        return randomNum;
      };

  function rollD6()
        {
      let randomNum = Math.floor((Math.random() * 6) + 1);
        console.log(randomNum);
        return randomNum;
        };

    function rollD8(){
      let randomNum = Math.floor((Math.random() * 8) + 1);
        console.log(randomNum);
        return randomNum;
      };
    


    function rollD10(){
      let randomNum = Math.floor((Math.random() * 10) + 1);
      console.log(randomNum);
      return randomNum;
    };


    function rollD12(){
    let randomNum = Math.floor((Math.random() * 12) + 1);
      console.log(randomNum);
      return randomNum;
    };

    function rollD20(){
      let randomNum = Math.floor((Math.random() * 20) + 1);
        console.log(randomNum);
        return randomNum;
      };
















