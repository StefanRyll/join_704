/**
 * Opens the add task dialog and renders the form with an optional parameter.
 * @param {number} x - Optional parameter for rendering purposes.
 */
function openAddTask(x = 0) {
    JoinBoard.renderAddTask(x);
}
/**
 * Creates a task based on a specified board.
 * 
 * @param {number} x - The board parameter (default value is 0).
 */
function createTaskFromBoard(x = 0) {
    try {
        loadAccounts();
        loadTasks();
    } catch (e) {
        console.log("Fehler", e)
    } finally {
        createTask(x);
    }
}
/**
 * Creates a task using provided parameters and updates the task with the given index.
 * 
 * @param {number} x - The index of the task to be updated.
 * @param {string} title - The title of the task.
 * @param {string[]} worker - An array of assigned users for the task.
 * @param {string} desc - The description of the task.
 * @param {string} date - The date associated with the task.
 * @param {string} prio - The priority of the task.
 * @param {string} category - The category of the task.
 * @param {boolean} subTask - A flag indicating if the task is a subtask.
 */
function createTask(x) {
    const title = document.getElementById("boardTaskTitle").value;
    const worker = readAssignedUsers();
    const desc = document.getElementById('boardTaskDescription').value;
    const date = document.getElementById('date').value;
    const prio = prioTemp;
    const category = document.getElementById('taskCategoryInput').value;
    const subTask = subtaskTemp;
    let newTask = new Task(title, worker, desc, date, prio, category, subTask);
    updateTask(newTask, x, title, worker, desc, date, prio, category, subTask);
    boardPage();
    
}


function createTaskPage() {
    const title = document.getElementById("boardTaskTitle").value;
    const worker = readAssignedUsers();
    const desc = document.getElementById('boardTaskDescription').value;
    const date = document.getElementById('date').value;
    const prio = prioTemp;
    const category = document.getElementById('taskCategoryInput').value;
    const subTask = subtaskTemp;
    let newTask = new Task(title, worker, desc, date, prio, category, subTask, true);
    Join.tasks.push(newTask);
    try {
        saveTasks();
        setTimeout(() => {
            boardPage();
        }, 500);
    } catch (error) {
        console.log("Task speichern nicht möglich : " + error);
    } finally {
        
        clearInputs(title, desc, worker, date, category, subTask);
        successOverlayTask();
    }
}
/**
 * Updates a task with new data, creates a new task, and performs additional operations.
 * 
 * @param {Task} newTask - The new task object to be updated.
 * @param {number} x - The index of the task to be updated.
 * @param {string} title - The title of the task.
 * @param {string[]} worker - An array of assigned users for the task.
 * @param {string} desc - The description of the task.
 * @param {string} date - The date associated with the task.
 * @param {string} prio - The priority of the task.
 * @param {string} category - The category of the task.
 * @param {boolean} subTask - A flag indicating if the task is a subtask.
 */
function updateTask(newTask, x, title, worker, desc, date, prio, category, subTask) {
    createNewTask(newTask, x);
    updateTaskWorkers(newTask);
    Join.tasks.push(newTask)
    try { saveTasks() } catch (e) {
        console.log("Fehler", e)
    } finally {
        clearInputs(title, desc, worker, date, category, subTask);
        closeAddTask()
        successOverlayTask()
        JoinBoard.renderTask()
        checkDragArea();
    }
}
/**
 * Displays a success overlay for tasks, showing information generated by JoinBoard.
 */
function successOverlayTask() {
    let overlaySuccess = document.getElementById('overlaySuccessTask');
    overlaySuccess.innerHTML = JoinBoard.generateHtmlSuccessInfoTask();
    openSuccessOverlayTask();
    setTimeout(() => {
        closeSuccessOverlayTask();
    }, 2000);
}
/**
 * Sets the task status based on the provided index.
 * 
 * @param {Task} newTask - The task object to be updated.
 * @param {string} x - The index to determine the task status ("1", "2", or other).
 */
function createNewTask(newTask, x) {
    if (x == "1") {
        newTask.todo = false;
        newTask.progress = true;
        newTask.feedback = false;
        newTask.done = false;

    } else if (x == "2") {
        newTask.todo = false;
        newTask.progress = false;
        newTask.feedback = true;
        newTask.done = false;
    } else {
        newTask.todo = true;
        newTask.progress = false;
        newTask.feedback = false;
        newTask.done = false;
    }
}
/**
 * Updates the checked status of task workers to false.
 * 
 * @param {Task} newTask - The task object containing worker information.
 */
function updateTaskWorkers(newTask) {
    for (let i = 0; i < newTask.worker.length; i++) {
        let taskWorker = newTask.worker[i];
        taskWorker.checked = true;
    }
}
/**
 * Deletes a task at the specified index, logs the deletion, saves tasks, and navigates to the board page.
 * 
 * @param {number} x - The index of the task to be deleted.
 */
function deleteTask(x) {
    Join.tasks.splice(x, 1)
    saveTasks();
    boardPage();
}
/**
 * Reads and returns an array of assigned users (workers) from Join.accounts.
 * 
 * @returns {Array} - An array of user accounts marked as checked.
 */
function readAssignedUsers() {
    let workers = [];
    for (let i = 0; i < Join.accounts.length; i++) {
        const account = Join.accounts[i];
        if (account.checked) {
            workers.push(account);
        }
    }
    return workers;
}
/**
 * Clears input values and resets checked status for accounts, as well as resetting subtaskTemp.
 * 
 * @param {HTMLElement} title - The input element for the task title.
 * @param {HTMLElement} description - The input element for the task description.
 * @param {HTMLElement} contact - The input element for the task contact.
 * @param {HTMLElement} date - The input element for the task date.
 * @param {HTMLElement} newCategory - The input element for selecting the task category.
 * @param {HTMLElement} subtask - The input element for the subtask.
 */
function clearInputs(title, description, contact, date, newCategory, subtask) {
    title.value = '';
    description.value = '';
    contact.value = '';
    date.value = '';
    newCategory.value = "Select task category";
    subtask.value = '';
    for (let account in Join.accounts) {
        account.checked = false;
    }
    subtaskTemp = [];
}
/**
 * Toggles the visibility of task contacts, rendering them and updating corresponding elements.
 */
function toggleContactsAssign() {
    renderTaskContacts()
    document.getElementById('selectContacts').classList.toggle('d-none');
    document.getElementById('closeContacts').classList.toggle('d-none');
}
/**
 * Toggles the visibility of task category, rendering them and updating corresponding elements.
 */
function toggleCategory() {
    document.getElementById('showSelectCategory').classList.toggle('d-none');
    document.getElementById('hiddenSelectCategory').classList.toggle('d-none');

}
/**
 * Handles the priority button click by updating the appearance of priority buttons.
 * 
 * @param {string} prioBtn - The ID of the clicked priority button.
 */
function btnTaskPrio(prioBtn) {
    isButtonUrgentWhite(prioBtn);
    isButtonMediumtWhite(prioBtn);
    isButtonLowWhite(prioBtn);
}
/**
 * Updates the appearance of the 'Urgent' priority button based on the clicked button.
 * 
 * @param {string} prioBtn - The ID of the clicked priority button.
 */
function isButtonUrgentWhite(prioBtn) {
    if (prioBtn === 'btnUrgentWhite') {
        hide('btnUrgentWhite');
        show('btnUrgentRed');
    } else {
        show('btnUrgentWhite');
        hide('btnUrgentRed');
    }
}
/**
 * Updates the appearance of the 'Medium' priority button based on the clicked button.
 * 
 * @param {string} prioBtn - The ID of the clicked priority button.
 */
function isButtonMediumtWhite(prioBtn) {
    if (prioBtn === 'btnMediumWhite') {
        hide('btnMediumWhite');
        show('btnMediumYellow');
    } else {
        show('btnMediumWhite');
        hide('btnMediumYellow');
    }
}
/**
 * Updates the appearance of the 'Low' priority button based on the clicked button.
 * 
 * @param {string} prioBtn - The ID of the clicked priority button.
 */
function isButtonLowWhite(prioBtn) {
    if (prioBtn === 'btnLowWhite') {
        hide('btnLowWhite');
        show('btnLowGreen');
    } else {
        show('btnLowWhite');
        hide('btnLowGreen');
    }
}
/**
 * Selects the 'Technical' category for a task, updating input fields and visibility of category elements.
 */
function selectCategoryTechnical() {
    let technicalTask = document.getElementById('technicalTask').textContent;
    let changeInputField = document.getElementById('taskCategoryInput');
    document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    document.getElementById('showSelectCategory').classList.add('d-none');
    changeInputField.value = technicalTask;
}
/**
 * Selects the 'User Story' category for a task, updating input fields and visibility of category elements.
 */
function selectCategoryStory() {
    let userStory = document.getElementById('userStory').textContent;
    let changeInputField = document.getElementById('taskCategoryInput');
    document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    document.getElementById('showSelectCategory').classList.add('d-none');
    changeInputField.value = userStory;
}
/**
 * Closes the 'Add Task' section by hiding the slide and adding a delay before setting it to 'display: none'.
 */
function closeAddTask() {
    let slideAddTask = document.getElementById('slideAddTask');
    slideAddTask.classList.add('hide-big-task');

    setTimeout(() => {
        document.getElementById('addTask').classList.add("d-none");
    }, 200);
}
/**
 * Retrieves the priority level based on the checked state of priority radio buttons.
 * 
 * @returns {string} - The priority level ("Urgent", "Medium", or "Low").
 */
function getPrio() {
    let prio01 = document.getElementById('prio01')
    let prio02 = document.getElementById('prio02')
    if (prio01.checked) {
        return "Urgent";
    } else if (prio02.checked) {
        return "Medium";
    } else {
        return "Low";
    }
}
/**
 * Opens the subtask section by showing the 'showSubtask' element and hiding 'hiddenSubtask'.
 */
function openSubtask() {
    show('showSubtask');
    hide('hiddenSubtask');
}
/**
 * Closes the subtask section by hiding the 'showSubtask' element and showing 'hiddenSubtask'.
 */
function closeSubtask() {
    hide('showSubtask');
    show('hiddenSubtask');
}
/**
 * Creates a new subtask by extracting text from the input field, adding it to subtaskTemp, and rendering subtasks.
 */
function createSubtask() {
    let inputSubtask = document.getElementById('inputSubtask');
    let subtaskText = inputSubtask.value.trim();
    if (subtaskText !== '') {
        let newSubtask = new Subtask(subtaskText)
        subtaskTemp.push(newSubtask);
        inputSubtask.value = '';
        renderSubtasks()
    }
}
/**
 * Renders subtasks by updating the HTML content of the 'createNewSubtask' container based on subtaskTemp.
 */
function renderSubtasks() {
    let createNewSubtaskContainer = document.getElementById('createNewSubtask');
    createNewSubtaskContainer.innerHTML = '';

    for (let m = 0; m < subtaskTemp.length; m++) {
        let newSubtasks = subtaskTemp[m];
        createNewSubtaskContainer.innerHTML += JoinBoard.generateHTMLAddSubtask(newSubtasks.text, m);
    }
}
/**
 * Changes the display of a subtask by hiding the container and showing the fixed version.
 * 
 * @param {number} m - The index of the subtask to be changed.
 */
function changeSubtask(m) {
    let containerTodoSubtask = `containerTodoSubtask${m}`;
    let fixTodoSubtask = `fixTodoSubtask${m}`;
    document.getElementById(containerTodoSubtask).classList.add('d-none');
    document.getElementById(fixTodoSubtask).classList.remove('d-none');
}
/**
 * Changes the display of a subtask by hiding the container and showing the fixed version.
 * 
 * @param {number} m - The index of the subtask to be changed.
 */
function fixSubtasks(m) {
    let containerTodoSubtask = `containerTodoSubtask${m}`;
    let fixTodoSubtask = `fixTodoSubtask${m}`;
    document.getElementById(containerTodoSubtask).classList.remove('d-none');
    document.getElementById(fixTodoSubtask).classList.add('d-none');

    let editFixSubtask = document.getElementById('editFixSubtask');
    let todoSubtask = document.getElementById(`todoSubtask${m}`);
    todoSubtask.textContent = editFixSubtask.value;
    editFixSubtask.innerHTML = '';
}
/**
 * Renders task contacts by updating the HTML content of the 'taskContactList' based on Join.accounts.
 */
function renderTaskContacts() {
    let taskContactList = document.getElementById('taskContactList');
    taskContactList.innerHTML = "";
    for (let i = 0; i < Join.accounts.length; i++) {
        let account = Join.accounts[i];
        if (account.checked === true) {
            taskContactList.innerHTML += account.tinyCardCheck(i);
            showAssignedCheckNone(i)
        } else {
            taskContactList.innerHTML += account.tinyCardCheck(i);
        }
    }
}
/**
 * Deletes a subtask at the specified index from subtaskTemp and renders the updated subtasks.
 * 
 * @param {number} m - The index of the subtask to be deleted.
 */
function deleteSubtask(m) {
    subtaskTemp.splice(m, 1)
    renderSubtasks();
}
/**
 * Enables editing for a subtask with the specified index and updates subtaskTemp on Enter key press.
 * 
 * @param {number} m - The index of the subtask to be edited.
 */
function editSubtask(m) {
    let editableTask = document.getElementById(`todoSubtask${m}`)
    editableTask.setAttribute('contenteditable', true)
    editableTask.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            if (editableTask.value != "")
                subtaskTemp[m] = editableTask.textContent;
            editableTask.setAttribute('contenteditable', false)
            renderSubtasks()
        }
    })
}
/**
 * Renders contacts for tasks by updating the HTML content of 'contactsList' based on Join.accounts.
 */
function renderContactsTasks() {
    let contactsList = document.getElementById('contactsList')
    for (let i = 0; i < Join.accounts.length; i++) {
        let account = Join.accounts[i];
        contactsList.innerHTML += account.tinyCard(i)
    }
}
/**
 * Opens a task by updating the content and visibility of the 'addTask' element with the task card for the specified index.
 * 
 * @param {number} x - The index of the task to be opened.
 */
function openTask(x) {
    let task = Join.tasks[x];
    let addTask = document.getElementById("addTask");
    addTask.classList.remove("d-none")
    addTask.innerHTML = task.taskCardNormal(x);
}


