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
      <div id="slideAddTask" class="bg-task">
        <div class="add-task">
         ${generateHTMLLeftSide()}
          <div class="seporator-add-task"></div>
          ${generateHTMLRightSide()}
          </div>
        </div>
      </div>
  `
}


function generateHTMLLeftSide() {
  return /*html*/`
      <div class="left-side">
        <h3>Add Task</h3>
        <div class="input-title">
            <label for="pflichtfeld">Title<sup>*</sup></label>
            <input type="text" id="" name="" required  placeholder="Enter a title">
        </div>
        <div class="input-description">
            <p>Description</p>
            <textarea name="" id="" cols="30" rows="10" placeholder="Enter a Description"></textarea>
        </div>
        <div class="assigned-contact">
            <p>Assigned to</p>
            <input type="text" name="" id="" placeholder="Select contacts to assign">
        </div>
      </div>
  `
}


function generateHTMLRightSide() {
  return /*html*/`
    <div class="right-side">
        <div>
          <svg onclick="closeAddTask()" class="close-button-add-task cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_87491_5574)">
          <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
          </g>
          </svg>
        </div>
    </div>
  `
}

function openAddTask() {
  slideAddTask = document.getElementById('slideAddTask').classList.add('show-bg-task');
}

function closeAddTask() {
  slideAddTask = document.getElementById('slideAddTask').classList.remove('show-bg-task');
}