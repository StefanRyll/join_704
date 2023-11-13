let currentDraggedElement; 


function filterTaskNames() {
    let search = document.getElementById('searchTask').value.toLowerCase();

    
    let todoContainer = document.getElementById('ondropTodo');
    let progressContainer = document.getElementById('ondropProgress');
    let feedbackContainer = document.getElementById('ondropFeedback');
    let doneContainer = document.getElementById('ondropDone');

    
    todoContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    for (let r = 0; r < Join.tasks.length; r++) {
        let title = Join.tasks[r]['title'].toLowerCase();
        let desc = Join.tasks[r]['desc'].toLowerCase();

        if (title.includes(search) || desc.includes(search)) {
            
            let taskCard = Join.tasks[r].tinyTaskCard(r);

            
            if (Join.tasks[r].todo) {
                todoContainer.innerHTML += taskCard;
            } else if (Join.tasks[r].progress) {
                progressContainer.innerHTML += taskCard;
            } else if (Join.tasks[r].feedback) {
                feedbackContainer.innerHTML += taskCard;
            } else if (Join.tasks[r].done) {
                doneContainer.innerHTML += taskCard;
            }
        }
    }
}


function updateHTML() {
    // DropZones
    let ondropTodo = document.getElementById('ondropTodo')
    let ondropProgress = document.getElementById('ondropProgress')
    let ondropFeedback= document.getElementById('ondropFeedback')
    let ondropDone= document.getElementById('ondropDone')
    
    // Filter Tasks
    console.log("updateHTML()");
    let todos = Join.tasks.filter(s => s.todo === true);
    let inProgress = Join.tasks.filter(s => s.progress === true);
    let awaitFeedback = Join.tasks.filter(s => s.feedback === true);
    let done = Join.tasks.filter(s => s.done = true);
    let nothing = Join.tasks.filter(s => s.todo === false && s.progress === false && s.feedback === false && s.done === false)
    
    console.log("Nothing: ",nothing.length);
    for (let i = 0; i < nothing.length; i++) {
        let garnix = nothing[i];
        garnix.todo = true;
        garnix.progress = false;
        garnix.feedback = false;
        garnix.done = false;
        console.log("Aktualisiert : ", garnix);
        
    }
    ondropTodo.innerHTML = '';
    ondropProgress.innerHTML = '';
    ondropFeedback.innerHTML = '';
    ondropDone.innerHTML = '';

    for (let q = 0; q < todos.length; q++) {
        let todo = todos[q];
        ondropTodo.innerHTML .innerHTML += todo.tinyTaskCard(q);
    }

    for (let q = 0; q < inProgress.length; q++) {
        let progress = inProgress[q];
        ondropProgress.innerHTML += progress.tinyTaskCard(q);
    }

    for (let q = 0; q < awaitFeedback.length; q++) {
        let feedback = awaitFeedback[q];
        ondropFeedback.innerHTML += feedback.tinyTaskCard(q);
    }

    for (let q = 0; q < done.length; q++) {
        let elementDone = done[q];
        ondropDone.innerHTML += elementDone.tinyTaskCard(q);
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    if (currentDraggedElement !== undefined ) {
        if (category === "Todo"){
            Join.tasks[currentDraggedElement].todo = true;
            Join.tasks[currentDraggedElement].progress = false;
            Join.tasks[currentDraggedElement].feedback = false;
            Join.tasks[currentDraggedElement].done = false;
        }
        else if (category === "Inprogress"){
            Join.tasks[currentDraggedElement].todo = false;
            Join.tasks[currentDraggedElement].progress = true;
            Join.tasks[currentDraggedElement].feedback = false;
            Join.tasks[currentDraggedElement].done = false;
        }
        else if (category === "Awaitfeedback"){
            Join.tasks[currentDraggedElement].todo = false;
            Join.tasks[currentDraggedElement].progress = false;
            Join.tasks[currentDraggedElement].feedback = true;
            Join.tasks[currentDraggedElement].done = false;
        }
        else if (category === "Done"){
            Join.tasks[currentDraggedElement].todo = false;
            Join.tasks[currentDraggedElement].progress = false;
            Join.tasks[currentDraggedElement].feedback = false;
            Join.tasks[currentDraggedElement].done = true;
        }
        JoinBoard.renderTask()
        // updateHTML();
    }
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function checkDragArea() {
    let todo = document.getElementById('emptyTaskTodo');
    let inprogress = document.getElementById('emptyTaskInprogress');
    let feedback = document.getElementById('emptyTaskFeedback');
    let done = document.getElementById('emptyTaskDone');

    
    if (Join.tasks.some(task => task.todo)) {
        todo.classList.add('d-none');
    } else {
        todo.classList.remove('d-none');
    }

   
    if (Join.tasks.some(task => task.progress)) {
        inprogress.classList.add('d-none');
    } else {
        inprogress.classList.remove('d-none');
    }

    
    if (Join.tasks.some(task => task.feedback)) {
        feedback.classList.add('d-none');
    } else {
        feedback.classList.remove('d-none');
    }

    
    if (Join.tasks.some(task => task.done)) {
        done.classList.add('d-none');
    } else {
        done.classList.remove('d-none');
    }
}
