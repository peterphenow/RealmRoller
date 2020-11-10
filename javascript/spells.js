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

      $("#spell-container").removeAttr("hidden");

      //set variables to display
      let name = response.name;
      let time = response.casting_time;
      let range = response.range;
      let duration = response.duration;
      let description = response.desc;

      let spellName = $("#spell-name");
      let spellTime = $("#spell-time");
      let spellRange = $("#spell-range");
      let spellDuration = $("#spell-duration");
      let spellDescription = $("#spell-desc");

      spellName.text(name);
      spellTime.text(time);
      spellRange.text(range);
      spellDuration.text(duration);
      spellDescription.text(description);
    });
}
