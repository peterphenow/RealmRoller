function renderNotesSection() {
  //set variable for where to append elements
  let textareaDiv = $("#textarea");
  //create label element and attr and text
  let labelEl = $("<label>");
  labelEl.attr("for", "notes");
  labelEl.text("Notes:");
  // //create save button element SHOULDN'T NEED SAVE BUTTON ANYMORE
  // let saveBtn = $("<button>");
  // saveBtn.attr("id", "save-button");
  // saveBtn.text("Save");
  //create textarea and all attr
  let textareaEl = $("<textarea>");
  textareaEl.attr("id", "notes");
  textareaEl.attr("name", "notes");
  textareaEl.attr("rows", "4");
  textareaEl.attr("cols", "30");
  textareaEl.attr("placeholder", "Put notes here!");

  //append elements to div
  textareaDiv.append(labelEl);
  textareaDiv.append(textareaEl);
  // textareaDiv.append(saveBtn);
}

//runs function to create notes field
renderNotesSection();

let notes = $("#notes");

//saves to local storage after each key press
notes.on("keyup", function () {
  let savedNotes = $("#notes").val();
  localStorage.setItem("notes", savedNotes);
});
