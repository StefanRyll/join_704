let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let done = [];


async function init() {
    await includeHTML();
    renderAddTask();
    createToDo();
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


function createToDo() {
  let renderActionBar = document.getElementById('renderActionBar');
  renderActionBar.innerHTML = '';
  renderActionBar.innerHTML += generateHTMLActionBar();
} 


function generateHTMLActionBar() {
  return /*html*/`
   <div class="task-todo">
      <div class="no-task">
        <p>No tasks To do</p>
      </div>
   </div>
   <div class="in-progress"></div>
   <div class="await-feedback"></div>
   <div class="task-done"></div>
    
  `
}