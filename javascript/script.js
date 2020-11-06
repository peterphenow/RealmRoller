console.log("hello");

function renderNotesSection() {
  //set variable for where to append elements
  let textareaDiv = $("#textarea");
  //create label element and attr and text
  let labelEl = $("<label>");
  labelEl.attr("for", "notes");
  labelEl.text("Notes:");
  //create textarea and all attr
  let textareaEl = $("<textarea>");
  textareaEl.attr("name", "notes");
  textareaEl.attr("rows", "4");
  textareaEl.attr("cols", "30");
  textareaEl.attr("placeholder", "Put notes here!");

  //append elements to div
  textareaDiv.append(labelEl);
  textareaDiv.append(textareaEl);
}

renderNotesSection();
