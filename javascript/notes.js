function renderNotesSection() {
  //set variable for where to append elements
  let textareaDiv = $("#textarea");
  //create textarea and all attr
  let textareaEl = $("<textarea>");
  textareaEl.attr("id", "notes");
  textareaEl.attr("name", "notes");
  textareaEl.attr("rows", "4");
  textareaEl.attr("cols", "40");
  textareaEl.attr("placeholder", "Put notes here!");

  //append elements to div
  textareaDiv.append(textareaEl);
}

//runs function to create notes field
renderNotesSection();

let notes = $("#notes");

//saves to local storage after each key press
notes.on("keyup", function () {
  let savedNotes = $("#notes").val();
  localStorage.setItem("notes", savedNotes);
});

//checks if any previously stored notes are in local storage
function getStoredNotes() {
  let storageNotes = localStorage.getItem("notes");
  notes = $("#notes");
  notes.val(storageNotes);
}

//run function to check if any previous user data is stored in local storage in order to populate times
getStoredNotes();
