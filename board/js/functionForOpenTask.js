let createTasks = [];


function createTaskFromBoard() {
    let title = document.getElementById('boardTaskTitle');
    let description = document.getElementById('boardTaskDescription');
    let contact = document.getElementById('boardTaskAddContact');
    let date = document.getElementById('boardTaskAddDate');
    let newCategory = document.getElementById('taskCategoryInput');
    
    createJsonForAddTask(title, description, contact, date, newCategory);
    console.log('show JSON', createTasks); 
    clearInputs(title, description, contact, date, newCategory);
}


function createJsonForAddTask(title, description, contact, date, newCategory) { 
  let tasksFromBoard = { //JSON from Board ADD TASK
    "title": title.value,
    "description":description.value,
    "contact": contact.value,
    "date": date.value,
    "new category": newCategory.value,
  };
  createTasks.push(tasksFromBoard);
}


function clearInputs(title, description, contact, date, newCategory) {
  title.value = '';
  description.value = ''; 
  contact.value = '';
  date.value = '';
  newCategory.value = "Select task category";
}
/**
 * @param {function} btnToggleRed change the prio buttons from standard white to red
 */
function btnToggleRed() {
  document.getElementById('btnUrgentWhite').classList.toggle('d-none');
  document.getElementById('btnUrgentRed').classList.toggle('d-none');
}
/**
 * @param {function} btnToggleRed change the prio buttons from standard white to yellow
 */
function btnToggleYellow() {
  document.getElementById('btnMediumWhite').classList.toggle('d-none');
  document.getElementById('btnMediumYellow').classList.toggle('d-none');
}
/**
 * @param {function} btnToggleRed change the prio buttons from standard white to green
 */
function btnToggleGreen() {
  document.getElementById('btnLowWhite').classList.toggle('d-none');
  document.getElementById('btnLowGreen').classList.toggle('d-none');
}


// function disabledPrioButtons() {
//   let redButton = document.getElementById('btnUrgentRed');
//   let yellowButton = document.getElementById('btnMediumYellow');
//   let greenButton = document.getElementById('btnLowGreen');
//   if (redButton) {
//     yellowButton.
//   } else {
    
//   }
// }

// function disabledPrioButtons() {
//   let diabledOtherButton = document.querySelectorAll('.d-none');
//   if
// }