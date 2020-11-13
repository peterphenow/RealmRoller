//"https://www.dnd5eapi.co/api/spells/" + spellName

let spellBtn = $("#spell-btn");
let spellName = $("#spell-input").val();
let spellContainer = $("#spell-container");

spellBtn.on("click", function (event) {
  event.preventDefault();
  getspell(spellName);
});

function getspell(spellName) {
  //sets the spell name to all lowercase and adds a dash for any space so the URL can successfully work
  spellName = $("#spell-input").val().replace(/\s+/g, "-").toLowerCase();
  //create the URL to use for the API call
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
      //make the spell container div visible
      $("#spell-container").removeAttr("hidden");

      //set variables to display
      let name = response.name;
      let time = response.casting_time;
      let range = response.range;
      let duration = response.duration;
      let description = response.desc;

      //set variables for element IDs
      let spellName = $("#spell-name");
      let spellTime = $("#spell-time");
      let spellRange = $("#spell-range");
      let spellDuration = $("#spell-duration");
      let spellDescription = $("#spell-desc");

      //place info from API to elements on HTML
      spellName.text(name);
      spellTime.text(time);
      spellRange.text(range);
      spellDuration.text(duration);
      spellDescription.text(description);
    });
}
