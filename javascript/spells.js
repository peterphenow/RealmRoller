//"https://www.dnd5eapi.co/api/spells/" + spellName

let spellBtn = $("#spell-btn"); //need to create a spell gen button with this ID
let spellName = $("#spell-input").val(); //need to create an input in html with this ID
let spellContainer = $("#spell-container");

spellBtn.on("click", function () {
  console.log("spell button clicked");
  getspell(spellName);
});

function getspell(spellName) {
  spellName = $("#spell-input").val(); //need to create an input in html with this ID
  let queryURL = "https://www.dnd5eapi.co/api/spells/" + spellName;
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .fail(function (response) {
      console.log(
        "API call to spell generator errored - error code " + response.responseJSON.error.code
      );
    })
    .done(function (response) {
      console.log(response);

      //set variables to display
      let name = "Name: " + response.name;
      let time = "Casting Time: " + response.casting_time;
      let range = "Range: " + response.range;
      let duration = "Duration: " + response.duration;
      let desc = "Description: " + response.desc;

      console.log(name, time, range, duration, desc);

      //create paragraph element to enter spell info to
      let infoDiv = $("<div>");
      let pName = $("<p>").text(name);
      let pTime = $("<p>").text(time);
      let pRange = $("<p>").text(range);
      let pDuration = $("<p>").text(duration);
      let pDesc = $("<p>").text(desc);

      //append all spell info
      infoDiv.append(pName);
      infoDiv.append(pTime);
      infoDiv.append(pRange);
      infoDiv.append(pDuration);
      infoDiv.append(pDesc);

      //clear and previous searches
      spellContainer.empty();

      //append info to spell container
      spellContainer.append(infoDiv);
    });
}
