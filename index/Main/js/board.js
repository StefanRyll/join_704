let currentDraggedElement;
let isMoving = false;
let lastTouchStartTime = 0;
/**
 * Hides an HTML element by adding 'd-none' class.
 * @param {string} id - The ID of the element to hide.
 */
function hide(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.add("d-none");
  }
}
/**
 * Shows a hidden HTML element by removing 'd-none' class.
 * @param {string} id - The ID of the element to show.
 */
function show(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.remove("d-none");
  }
}
/**
 * Filters task names based on a search input and updates task containers.
 */
function filterTaskNames() {
  const search = document.getElementById("searchTask").value.toLowerCase();
  const todoContainer = document.getElementById("kambanTodo");
  const progressContainer = document.getElementById("kambanInprogress");
  const feedbackContainer = document.getElementById("kambanFeedback");
  const doneContainer = document.getElementById("kambanDone");
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
  todoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  feedbackContainer.innerHTML = "";
  doneContainer.innerHTML = "";
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
    const title = Join.tasks[r]["title"].toLowerCase();
    const desc = Join.tasks[r]["desc"].toLowerCase();
    searchTitleAndDescription(
      title,
      desc,
      search,
      todoContainer,
      progressContainer,
      feedbackContainer,
      doneContainer,
      r,
    );
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
function searchTitleAndDescription(
  title,
  desc,
  search,
  todoContainer,
  progressContainer,
  feedbackContainer,
  doneContainer,
  r,
) {
  if (title.includes(search) || desc.includes(search)) {
    const taskCard = Join.tasks[r].tinyTaskCard(r);
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
    } else if (category === "Inprogress") {
      moveToProgress(currentDraggedElement);
    } else if (category === "Awaitfeedback") {
      moveToFeedback(currentDraggedElement);
    } else if (category === "Done") {
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
  document.getElementById(id).classList.add("drag-area-highlight");
}
/**
 * Removes the highlight class from the specified element.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}
/**
 * Checks and updates the visibility of task categories and their empty indicators.
 */
function checkDragArea() {
  const todoContainer = document.getElementById("kambanTodo");
  const progressContainer = document.getElementById("kambanInprogress");
  const feedbackContainer = document.getElementById("kambanFeedback");
  const doneContainer = document.getElementById("kambanDone");
  checkAreaTodo(todoContainer);
  checkAreaProgress(progressContainer);
  checkAreaFeedback(feedbackContainer);
  checkAreaDone(doneContainer);
}
/**
 * Checks and updates the visibility of 'todo' tasks and its empty indicator.
 */
function checkAreaTodo(container) {
  if (container.innerHTML !== "") {
    hide("emptyTaskTodo");
  } else {
    show("emptyTaskTodo");
  }
}
/**
 * Checks and updates the visibility of 'progress' tasks and its empty indicator.
 */
function checkAreaProgress(container) {
  if (container.innerHTML !== "") {
    hide("emptyTaskInprogress");
  } else {
    show("emptyTaskInprogress");
  }
}
/**
 * Checks and updates the visibility of 'feedback' tasks and its empty indicator.
 */
function checkAreaFeedback(container) {
  if (container.innerHTML !== "") {
    hide("emptyTaskFeedback");
  } else {
    show("emptyTaskFeedback");
  }
}
/**
 * Checks and updates the visibility of 'done' tasks and its empty indicator.
 */
function checkAreaDone(container) {
  if (container.innerHTML !== "") {
    hide("emptyTaskDone");
  } else {
    show("emptyTaskDone");
  }
}
