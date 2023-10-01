let createTasks = [];


function createTaskFromBoard() {
    let taskTitle = document.getElementById('boardTaskTitle');
    let taskDescription = document.getElementById('boardTaskDescription');
    let taskContact = document.getElementById('boardTaskAddContact');
    let taskDate = document.getElementById('boardTaskAddDate');
    let taskUrgent = document.getElementById('boardTaskUrgent');
    let taskMedium = document.getElementById('boardTaskMedium');
    let taskLow = document.getElementById('boardTaskLow');
    let newCategory = document.getElementById('categoryInput');
    
  
    let tasksFromBoard = { //JSON from Board ADD TASK
      "title": taskTitle.value,
      "description": taskDescription.value,
      "contact": taskContact.value,
      "date": taskDate.value,
      "prio urgent": taskUrgent.value,
      "prio medium": taskMedium.textContent,
      "prio low": taskLow.textContent,
      "new category": newCategory,
    };
    
    createTasks.push(tasksFromBoard);
    console.log('show JSON', createTasks);
  // ICH MUSS NOCH DIE INPUTFELDER LEEREN 
  }