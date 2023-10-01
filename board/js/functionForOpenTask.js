let createTasks = [];


function createTaskFromBoard() {
    let taskTitle = document.getElementById('boardTaskTitle');
    let taskDescription = document.getElementById('boardTaskDescription');
    let taskContact = document.getElementById('boardTaskAddContact');
    let taskDate = document.getElementById('boardTaskAddDate');
    let taskUrgent = document.getElementById('boardTaskUrgent');
    let taskMedium = document.getElementById('boardTaskMedium');
    let taskLow = document.getElementById('boardTaskLow');
    let taskTechnical = document.getElementById('boardTaskTechnical');
    let taskStory = document.getElementById('boardTaskStory');
  
    let tasksFromBoard = { //JSON from Board ADD TASK
      "title": taskTitle.value,
      "description": taskDescription.value,
      "contact": taskContact.value,
      "date": taskDate.value,
      "prio Urgent": taskUrgent.value,
      "prio Medium": taskMedium.value,
      "prio Low": taskLow.value,
      "category Technical": taskTechnical.value,
      "category Story": taskStory.value,
    };
    
    createTasks.push(tasksFromBoard);
    console.log('show JSON', createTasks);
  // ICH MUSS NOCH DIE INPUTFELDER LEEREN 
  }