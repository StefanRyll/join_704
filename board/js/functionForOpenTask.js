let createTasks = [];


function createTaskFromBoard() {
    let title = document.getElementById('boardTaskTitle');
    let description = document.getElementById('boardTaskDescription');
    let contact = document.getElementById('boardTaskAddContact');
    let date = document.getElementById('boardTaskAddDate');
    let newCategory = document.getElementById('taskCategoryInput');
    
  
    let tasksFromBoard = { //JSON from Board ADD TASK
      "title": title.value,
      "description":description.value,
      "contact": contact.value,
      "date": date.value,
      "new category": newCategory.value,
    };
    createTasks.push(tasksFromBoard);
    console.log('show JSON', createTasks); 
    clearInputs(title, description, contact, date, newCategory);
}


function clearInputs(title, description, contact, date, newCategory) {
  title.value = '';
  description.value = ''; 
  contact.value = '';
  date.value = '';
  newCategory.value = "Select task category";
}