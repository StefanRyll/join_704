async function init() {
    await includeHTML();
    renderAddTask();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); //  Wir rufen unseren DIV im Index auf 
    for (let i = 0; i < includeElements.length; i++) { // hier iterieren wir alles Obejekte in diesem DIV container sprich alles was in dem Fall im Header Bereich ist 
      const element = includeElements[i];  
      file = element.getAttribute("w3-include-html");// hier liest er den Wert im Index.Html "includes/header.html" aus. Und wir deieser Varibale file zugeordnet 
      let resp = await fetch(file); // hier laden wir die datei mit fetch 
      if(resp.ok) {
        element.innerHTML = await resp.text(); // hier haben wir jetzt alles in der Variable contetn als Text gespeichert^
      } else {
          element.innerHTML = 'Page not found';
      }
    }
}

function renderAddTask() {
  let addTask = document.getElementById('addTask');
  addTask.innerHTML = '';
  addTask.innerHTML += generateHTMLaddTask();
}

function generateHTMLaddTask() {
  return /*html*/`
  <div class="bg-task">
    <div class="add-task">
      <h3>Add Task</h3>
      <div class="">
        <div>
          <div class="input-title">
            <p>Title</p>
            <input placeholder="Enter a title" type="text" id="" name="" required>
          </div>
          <div class="input-description">
            <textarea name="" id="" cols="30" rows="10">Enter a Description</textarea>
          </div>
          <div class="assigned-contact">
            <p>Assigned to</p>
            
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  </div>
  `
}