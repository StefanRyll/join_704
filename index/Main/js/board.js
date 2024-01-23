let currentDraggedElement;
/**
 * Hides an HTML element by adding 'd-none' class.
 * @param {string} id - The ID of the element to hide.
 */
function hide(id) {
    let element = document.getElementById(id);
    if (element) {
        element.classList.add('d-none');
    }
}
/**
 * Shows a hidden HTML element by removing 'd-none' class.
 * @param {string} id - The ID of the element to show.
 */
function show(id) {
    let element = document.getElementById(id);
    if (element) {
        element.classList.remove('d-none');
    }
}
/**
 * Filters task names based on a search input and updates task containers.
 * @param {string} search - The search input value.
 */
function filterTaskNames() {
    let search = document.getElementById('searchTask').value.toLowerCase();
    let todoContainer = document.getElementById('kambanTodo');
    let progressContainer = document.getElementById('kambanInprogress');
    let feedbackContainer = document.getElementById('kambanFeedback');
    let doneContainer = document.getElementById('kambanDone');
    clearInnerHTML(todoContainer, progressContainer, feedbackContainer, doneContainer);
    filterArrayFromBoard(search, todoContainer, progressContainer, feedbackContainer, doneContainer);
}
/**
 * Clears the HTML content of specified task containers.
 * @param {HTMLElement} todoContainer - The container for 'todo' tasks.
 * @param {HTMLElement} progressContainer - The container for 'progress' tasks.
 * @param {HTMLElement} feedbackContainer - The container for 'feedback' tasks.
 * @param {HTMLElement} doneContainer - The container for 'done' tasks.
 */
function clearInnerHTML(todoContainer, progressContainer, feedbackContainer, doneContainer) {
    todoContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    doneContainer.innerHTML = '';
}
/**
 * Filters tasks based on search criteria and updates task containers.
 * @param {string} search - The search input value.
 * @param {HTMLElement} todoContainer - The container for 'todo' tasks.
 * @param {HTMLElement} progressContainer - The container for 'progress' tasks.
 * @param {HTMLElement} feedbackContainer - The container for 'feedback' tasks.
 * @param {HTMLElement} doneContainer - The container for 'done' tasks.
 */
function filterArrayFromBoard(search, todoContainer, progressContainer, feedbackContainer, doneContainer) {
    for (let r = 0; r < Join.tasks.length; r++) {
        let title = Join.tasks[r]['title'].toLowerCase();
        let desc = Join.tasks[r]['desc'].toLowerCase();
        searchTitleAndDescription(title, desc, search, todoContainer, progressContainer, feedbackContainer, doneContainer, r);
    }
}
/**
 * Searches task title and description, updates corresponding task container with matching tasks.
 * @param {string} title - The task title.
 * @param {string} desc - The task description.
 * @param {string} search - The search input value.
 * @param {HTMLElement} todoContainer - The container for 'todo' tasks.
 * @param {HTMLElement} progressContainer - The container for 'progress' tasks.
 * @param {HTMLElement} feedbackContainer - The container for 'feedback' tasks.
 * @param {HTMLElement} doneContainer - The container for 'done' tasks.
 * @param {number} r - The index of the task in the tasks array.
 */
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
    checkDragArea();
}
/**
 * Updates HTML content based on task categories and their status.
 */
function updateHTML() {
    let ondropTodo = document.getElementById('ondropTodo');
    let ondropProgress = document.getElementById('ondropProgress');
    let ondropFeedback = document.getElementById('ondropFeedback');
    let ondropDone = document.getElementById('ondropDone');
    filterTask();
    let none = Join.tasks.filter(s => s.todo === false && s.progress === false && s.feedback === false && s.done === false);
    checkBooleanNone(none);
    iterateAllTaskCard(ondropTodo, ondropProgress, ondropFeedback, ondropDone, todos, inProgress, awaitFeedback, done);
}
/**
 * Filters tasks based on their status and clears corresponding HTML elements.
 * @param {array} Join.tasks - The array of tasks.
 */
function filterTask() {
    let todos = Join.tasks.filter(s => s.todo === true);
    todos.innerHTML = '';
    let inProgress = Join.tasks.filter(s => s.progress === true);
    inProgress.innerHTML = '';
    let awaitFeedback = Join.tasks.filter(s => s.feedback === true);
    awaitFeedback.innerHTML = '';
    let done = Join.tasks.filter(s => s.done === true);
    done.innerHTML = '';
}
/**
 * Sets boolean properties of tasks in the 'none' category.
 * @param {Array} none - An array of tasks with no category.
 */
function checkBooleanNone(none) {
    for (let i = 0; i < none.length; i++) {
        let nothing = none[i];
        nothing.todo = true;
        nothing.progress = false;
        nothing.feedback = false;
        nothing.done = false;
    }
}
/**
 * Iterates through all task categories and updates corresponding HTML content.
 * @param {HTMLElement} dropT - The container for 'todo' tasks.
 * @param {HTMLElement} dropP - The container for 'progress' tasks.
 * @param {HTMLElement} dropF - The container for 'feedback' tasks.
 * @param {HTMLElement} dropD - The container for 'done' tasks.
 * @param {Array} todos - An array of 'todo' tasks.
 * @param {Array} inProgress - An array of 'progress' tasks.
 * @param {Array} awaitFeedback - An array of 'feedback' tasks.
 * @param {Array} done - An array of 'done' tasks.
 */
function iterateAllTaskCard(dropT, dropP, dropF, dropD, todos, inProgress, awaitFeedback, done) {
    todoTaskCard(dropT, todos);
    progressTaskCard(dropP, inProgress);
    feedbackTaskCard(dropF, awaitFeedback);
    doneTaskCard(dropD, done);
}
/**
 * Updates 'todo' task category HTML content.
 * @param {HTMLElement} dropT - The container for 'todo' tasks.
 * @param {Array} todos - An array of 'todo' tasks.
 */
function todoTaskCard(dropT, todos) {
    for (let q = 0; q < todos.length; q++) {
        let todo = todos[q];
        dropT.innerHTML.innerHTML += todo.tinyTaskCard(q);
    }
}
/**
 * Updates 'progress' task category HTML content.
 * @param {HTMLElement} dropP - The container for 'progress' tasks.
 * @param {Array} inProgress - An array of 'progress' tasks.
 */
function progressTaskCard(dropP, inProgress) {
    for (let q = 0; q < inProgress.length; q++) {
        let progress = inProgress[q];
        dropP.innerHTML += progress.tinyTaskCard(q);
    }
}
/**
 * Updates 'feedback' task category HTML content.
 * @param {HTMLElement} dropF - The container for 'feedback' tasks.
 * @param {Array} awaitFeedback - An array of 'feedback' tasks.
 */
function feedbackTaskCard(dropF, awaitFeedback) {
    for (let q = 0; q < awaitFeedback.length; q++) {
        let feedback = awaitFeedback[q];
        dropF.innerHTML += feedback.tinyTaskCard(q);
    }
}
/**
 * Updates 'done' task category HTML content.
 * @param {HTMLElement} dropD - The container for 'done' tasks.
 * @param {Array} done - An array of 'done' tasks.
 */
function doneTaskCard(dropD, done) {
    for (let q = 0; q < done.length; q++) {
        let elementDone = done[q];
        dropD.innerHTML += elementDone.tinyTaskCard(q);
    }
}
/**
 * Sets the currently dragged element ID.
 * @param {string} id - The ID of the dragged element.
 */
function startDragging(id) {
    currentDraggedElement = id;
}
/**
 * Prevents the default behavior of a drop event.
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * Moves the dragged task to the specified category.
 * @param {string} category - The target category ('Todo', 'Inprogress', 'Awaitfeedback', or 'Done').
 */
async function moveTo(category) {
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
        await saveTasks();
        JoinBoard.renderTask();
    }
}
/**
 * Moves the task to the 'Todo' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToTodo(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = true;
    Join.tasks[currentDraggedElement].progress = false;
    Join.tasks[currentDraggedElement].feedback = false;
    Join.tasks[currentDraggedElement].done = false;
}
/**
 * Moves the task to the 'Inprogress' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToProgress(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = false;
    Join.tasks[currentDraggedElement].progress = true;
    Join.tasks[currentDraggedElement].feedback = false;
    Join.tasks[currentDraggedElement].done = false;
}
/**
 * Moves the task to the 'Awaitfeedback' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToFeedback(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = false;
    Join.tasks[currentDraggedElement].progress = false;
    Join.tasks[currentDraggedElement].feedback = true;
    Join.tasks[currentDraggedElement].done = false;
}
/**
 * Moves the task to the 'Done' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToDone(currentDraggedElement) {
    Join.tasks[currentDraggedElement].todo = false;
    Join.tasks[currentDraggedElement].progress = false;
    Join.tasks[currentDraggedElement].feedback = false;
    Join.tasks[currentDraggedElement].done = true;
}
/**
 * Adds a highlight class to the specified element.
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}
/**
 * Removes the highlight class from the specified element.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}
/**
 * Checks and updates the visibility of task categories and their empty indicators.
 */
function checkDragArea() {
    let todoContainer = document.getElementById('kambanTodo');
    let progressContainer = document.getElementById('kambanInprogress');
    let feedbackContainer = document.getElementById('kambanFeedback');
    let doneContainer = document.getElementById('kambanDone');
    checkAreaTodo(todoContainer);
    checkAreaProgress(progressContainer);
    checkAreaFeedback(feedbackContainer);
    checkAreaDone(doneContainer);
}
/**
 * Checks and updates the visibility of 'todo' tasks and its empty indicator.
 */
function checkAreaTodo(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskTodo');
    } else {
        show('emptyTaskTodo'); 
    }
}
/**
 * Checks and updates the visibility of 'progress' tasks and its empty indicator.
 */
function checkAreaProgress(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskInprogress');
    } else {
        show('emptyTaskInprogress');
    }
}
/**
 * Checks and updates the visibility of 'feedback' tasks and its empty indicator.
 */
function checkAreaFeedback(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskFeedback');
    } else {
        show('emptyTaskFeedback');
    }
}
/**
 * Checks and updates the visibility of 'done' tasks and its empty indicator.
 */
function checkAreaDone(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskDone');
    } else {
        show('emptyTaskDone');
    }
}
/**
 * Initiates a touch interaction for a draggable element.
 * @param {string} category - The category of the element being touched.
 * @param {number|string} id - The unique identifier of the element.
 * @param {Event} event - The event object associated with the touch action.
 */
function startTouching(category, id, event) {
    event.preventDefault(); 
    currentDraggedElement = id; 
    let element = document.getElementById(`tinyTaskCard${id}`);

    if (element) {
        copyElement(element, category, id, event);
    }
}
/**
 * Creates a "ghost" copy of the given element for drag-and-drop purposes.
 * @param {HTMLElement} element - The DOM element to be cloned.
 * @param {string} category - The category of the element being cloned.
 * @param {number|string} id - The unique identifier of the element.
 * @param {TouchEvent} event - The touch event initiating the drag.
 */
function copyElement(element, category, id, event) {
    let ghostElement = element.cloneNode(true);
    ghostElement.id = 'ghostElement';
    ghostElement.style.position = 'absolute';
    ghostElement.style.opacity = '0.5';
    document.body.appendChild(ghostElement);
    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;
    let rect = element.getBoundingClientRect();
    offsetX = touchX - rect.left;
    offsetY = touchY - rect.top;
    moveGhostElement(touchX, touchY); 
}
/**
 * Moves the 'ghost' element to a new position based on the provided coordinates.
 * @param {number} x - The X-coordinate (horizontal position) to move the element to.
 * @param {number} y - The Y-coordinate (vertical position) to move the element to.
 */
function moveGhostElement(x, y) {
    let ghostElement = document.getElementById('ghostElement');
    if (ghostElement) {
        ghostElement.style.left = (x - offsetX) + 'px';
        ghostElement.style.top = (y - offsetY) + 'px';
    }
}
/**
 * Handles the movement of an element during a touch event.
 * @param {TouchEvent} event - The touch event containing the new touch coordinates.
 */
function moveTouching(event) {
    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;
    moveGhostElement(touchX, touchY);
}
/**
 * Concludes the touch interaction by determining the drop zone and moving the element.
 * @param {TouchEvent} touchEvent - The touch event signaling the end of a touch interaction.
 */
function endTouching(touchEvent) {
    let dropZone = determineDropZone(touchEvent); 
    moveTo(dropZone); 
    let ghostElement = document.getElementById('ghostElement');

    if (ghostElement) {
        document.body.removeChild(ghostElement);
    }
}
/**
 * Determines the appropriate drop zone based on the touch event's coordinates.
 * @param {TouchEvent} touchEvent - The touch event with the coordinates to be evaluated.
 * @returns {string|null} The name of the drop zone if found, otherwise null.
 */
function determineDropZone(touchEvent) {
    let touchX = touchEvent.changedTouches[0].clientX;
    let touchY = touchEvent.changedTouches[0].clientY;
    if (isInsideDropZone(touchX, touchY, 'ondropTodo')) return 'Todo';
    if (isInsideDropZone(touchX, touchY, 'ondropProgress')) return 'Inprogress';
    if (isInsideDropZone(touchX, touchY, 'ondropFeedback')) return 'Awaitfeedback';
    if (isInsideDropZone(touchX, touchY, 'ondropDone')) return 'Done';
    return null;
}
/**
 * Checks if the given coordinates (x, y) are inside the specified drop zone.
 * @param {number} x - The X-coordinate to check.
 * @param {number} y - The Y-coordinate to check.
 * @param {string} dropZoneId - The ID of the drop zone to check against.
 * @returns {boolean} True if the coordinates are inside the drop zone, false otherwise.
 */
function isInsideDropZone(x, y, dropZoneId) {
    let zone = document.getElementById(dropZoneId);
    let rect = zone.getBoundingClientRect();
    return (
        x >= rect.left && x <= rect.right &&
        y >= rect.top && y <= rect.bottom
    );
}


