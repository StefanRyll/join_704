let currentDraggedElement;


function filterTaskNames() {
    let search = document.getElementById('searchTask').value.toLowerCase();
    let todoContainer = document.getElementById('ondropTodo');
    let progressContainer = document.getElementById('ondropProgress');
    let feedbackContainer = document.getElementById('ondropFeedback');
    let doneContainer = document.getElementById('ondropDone');
    clearInnerHTML(todoContainer, progressContainer, feedbackContainer, doneContainer);
    filterArrayFromBoard(search, todoContainer, progressContainer, feedbackContainer, doneContainer);
}


function clearInnerHTML(todoContainer, progressContainer, feedbackContainer, doneContainer) {
    todoContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    doneContainer.innerHTML = '';
}


function filterArrayFromBoard(search, todoContainer, progressContainer, feedbackContainer, doneContainer) {
    for (let r = 0; r < Join.tasks.length; r++) {
        let title = Join.tasks[r]['title'].toLowerCase();
        let desc = Join.tasks[r]['desc'].toLowerCase();
        searchTitleAndDescription(title, desc, search, todoContainer, progressContainer, feedbackContainer, doneContainer, r);
    }
}


function searchTitleAndDescription(title, desc, search, todoContainer, progressContainer, feedbackContainer, doneContainer, r) {
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


function updateHTML() {
    let ondropTodo = document.getElementById('ondropTodo')
    let ondropProgress = document.getElementById('ondropProgress')
    let ondropFeedback = document.getElementById('ondropFeedback')
    let ondropDone = document.getElementById('ondropDone')

    let todos = Join.tasks.filter(s => s.todo === true);
    let inProgress = Join.tasks.filter(s => s.progress === true);
    let awaitFeedback = Join.tasks.filter(s => s.feedback === true);
    let done = Join.tasks.filter(s => s.done = true);
    let none = Join.tasks.filter(s => s.todo === false && s.progress === false && s.feedback === false && s.done === false);
    clearDropeZoneInnerHTML(ondropTodo, ondropProgress, ondropFeedback, ondropDone);
    checkBooleanNone(none);
    iterateAllTaskCard(ondropTodo, ondropProgress, ondropFeedback, ondropDone, todos, inProgress, awaitFeedback, done);
}


// function clearDropeZoneInnerHTML(todo, progress, feedback, done) {
//     todo.innerHTML = '';
//     progress.innerHTML = '';
//     feedback.innerHTML = '';
//     done.innerHTML = '';
// }


function checkBooleanNone(none) {
    for (let i = 0; i < none.length; i++) {
        let nothing = none[i];
        nothing.todo = true;
        nothing.progress = false;
        nothing.feedback = false;
        nothing.done = false;
    }
}


function iterateAllTaskCard(dropT, dropP, dropF, dropD, todos, inProgress, awaitFeedback, done) {
    todoTaskCard(dropT, todos);
    progressTaskCard(dropP, inProgress);
    feedbackTaskCard(dropF, awaitFeedback);
    doneTaskCard(dropD, done);
}


function todoTaskCard(dropT, todos) {
    for (let q = 0; q < todos.length; q++) {
        let todo = todos[q];
        dropT.innerHTML.innerHTML += todo.tinyTaskCard(q);
    }
}


function progressTaskCard(dropP, inProgress) {
    for (let q = 0; q < inProgress.length; q++) {
        let progress = inProgress[q];
        dropP.innerHTML += progress.tinyTaskCard(q);
    }
}


function feedbackTaskCard(dropF, awaitFeedback) {
    for (let q = 0; q < awaitFeedback.length; q++) {
        let feedback = awaitFeedback[q];
        dropF.innerHTML += feedback.tinyTaskCard(q);
    }
}


function doneTaskCard(dropD, done) {
    for (let q = 0; q < done.length; q++) {
        let elementDone = done[q];
        dropD.innerHTML += elementDone.tinyTaskCard(q);
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {

    if (currentDraggedElement !== undefined) {
        if (category === "Todo") {
            moveToTodo(currentDraggedElement);
        }
        else if (category === "Inprogress") {
            moveToProgress(currentDraggedElement);
        }
        else if (category === "Awaitfeedback") {
            moveToFeedback(currentDraggedElement);
        }
        else if (category === "Done") {
            moveToDone(currentDraggedElement);
        }
        saveTasks()
        JoinBoard.renderTask();
    }
}


function moveToTodo(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = true;
    Join.tasks[currentDraggedElement].progress = false;
    Join.tasks[currentDraggedElement].feedback = false;
    Join.tasks[currentDraggedElement].done = false;
}


function moveToProgress(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = false;
    Join.tasks[currentDraggedElement].progress = true;
    Join.tasks[currentDraggedElement].feedback = false;
    Join.tasks[currentDraggedElement].done = false;
}


function moveToFeedback(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = false;
    Join.tasks[currentDraggedElement].progress = false;
    Join.tasks[currentDraggedElement].feedback = true;
    Join.tasks[currentDraggedElement].done = false;
}


function moveToDone(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = false;
    Join.tasks[currentDraggedElement].progress = false;
    Join.tasks[currentDraggedElement].feedback = false;
    Join.tasks[currentDraggedElement].done = true;
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function checkDragArea() {
    let todoArea = document.getElementById('emptyTaskTodo');
    let inprogress = document.getElementById('emptyTaskInprogress');
    let feedbackArea = document.getElementById('emptyTaskFeedback');
    let done = document.getElementById('emptyTaskDone');
    checkSomeAreaBoard(todoArea, inprogress, feedbackArea, done);
}


function checkSomeAreaBoard(todoArea, inprogress, feedbackArea, done) {
    checkAreaTodo(todoArea);
    checkAreaProgress(inprogress);
    checkAreaFeedback(feedbackArea);
    checkAreaDone(done);    
}


function checkAreaTodo(todoArea) {
    if (Join.tasks.some(task => task.todo)) {
        todoArea.classList.add('d-none');
    } else {
        todoArea.classList.remove('d-none');
    }
}


function checkAreaProgress(inprogress) {
    if (Join.tasks.some(task => task.progress)) {
        inprogress.classList.add('d-none');
    } else {
        inprogress.classList.remove('d-none');
    }
}


function checkAreaFeedback(feedbackArea) {
    if (Join.tasks.some(task => task.feedback)) {
        feedbackArea.classList.add('d-none');
    } else {
        feedbackArea.classList.remove('d-none');
    }
}


function checkAreaDone(done) {
    if (Join.tasks.some(task => task.done)) {
        done.classList.add('d-none');
    } else {
        done.classList.remove('d-none');
    }
}

