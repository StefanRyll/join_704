/**
 * Opens the add task dialog and renders the form with an optional parameter.
 * @param {number} x - Optional parameter for rendering purposes.
 */
function openAddTask(x = 0) {
    JoinBoard.renderAddTask(x)
}

function createTaskFromBoard(x = 0) {
    // const title = document.getElementById("boardTaskTitle").value;
    // const worker = readAssignedUsers()
    // const desc = document.getElementById('boardTaskDescription').value;
    // const date = document.getElementById('date').value;
    // const prio = prioTemp;
    // const category = document.getElementById('taskCategoryInput').value;
    // const subTask = subtaskTemp;
    // let newTask = new Task(title, worker, desc, date, prio, category, subTask);

    // createNewTask(newTask, x);
    // updateTaskWorkers(newTask);
    // Join.tasks.push(newTask)
    // clearInputs(title, desc, worker, date, category, subTask);
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
        const title = document.getElementById("boardTaskTitle").value;
        const worker = readAssignedUsers();
        const desc = document.getElementById('boardTaskDescription').value;
        const date = document.getElementById('date').value;
        const prio = prioTemp;
        const category = document.getElementById('taskCategoryInput').value;
        const subTask = subtaskTemp;
        let newTask = new Task(title, worker, desc, date, prio, category, subTask);

        createNewTask(newTask, x);
        updateTaskWorkers(newTask);
        Join.tasks.push(newTask)
        clearInputs(title, desc, worker, date, category, subTask);
        // checkError();
        try { saveTasks() } catch (e) {
            console.log("Fehler", e)
        } finally {
            clearInputs(title, desc, worker, date, category, subTask);
            closeAddTask()
            JoinBoard.renderTask()
                // alert("Neuer Task Erstellt")
        }
    }
}


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


function updateTaskWorkers(newTask) {
    for (let i = 0; i < newTask.worker.length; i++) {
        let taskWorker = newTask.worker[i];
        taskWorker.checked = false;
    }
}


function deleteTask(x) {
    Join.tasks.splice(x, 1)
    console.log("Task " + x + " wird gelöscht");
    saveTasks()
    boardPage()
}

function readAssignedUsers() {
    let workers = [];
    for (let i = 0; i < Join.accounts.length; i++) {
        const account = Join.accounts[i]
        if (account.checked) {
            workers.push(account);
        }
    }
    return workers;
}


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


function toggleContactsAssign() {
    renderTaskContacts()
    document.getElementById('selectContacts').classList.toggle('d-none');
    document.getElementById('closeContacts').classList.toggle('d-none');
}


function toggleCategory() {
    document.getElementById('showSelectCategory').classList.toggle('d-none');
    document.getElementById('hiddenSelectCategory').classList.toggle('d-none');

}


function btnTaskPrio(prioBtn) {
    isButtonUrgentWhite(prioBtn);
    isButtonMediumtWhite(prioBtn);
    isButtonLowWhite(prioBtn);
}


function isButtonUrgentWhite(prioBtn) {
    if (prioBtn == 'btnUrgentWhite') {
        hide('btnUrgentWhite');
        show('btnUrgentRed');
    } else {
        show('btnUrgentWhite');
        hide('btnUrgentRed');
    }
}


function isButtonMediumtWhite(prioBtn) {
    if (prioBtn == 'btnMediumWhite') {
        hide('btnMediumWhite');
        show('btnMediumYellow');
    } else {
        show('btnMediumWhite');
        hide('btnMediumYellow');
    }
}


function isButtonLowWhite(prioBtn) {
    if (prioBtn == 'btnLowWhite') {
        hide('btnLowWhite');
        show('btnLowGreen');
    } else {
        show('btnLowWhite');
        hide('btnLowGreen');
    }
}


function selectCategoryTechnical() {
    let technicalTask = document.getElementById('technicalTask').textContent;
    let changeInputField = document.getElementById('taskCategoryInput');
    document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    document.getElementById('showSelectCategory').classList.add('d-none');
    changeInputField.value = technicalTask;
}


function selectCategoryStory() {
    let userStory = document.getElementById('userStory').textContent;
    let changeInputField = document.getElementById('taskCategoryInput');
    document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    document.getElementById('showSelectCategory').classList.add('d-none');
    changeInputField.value = userStory;
}


function closeAddTask() {
    let slideAddTask = document.getElementById('slideAddTask');
    slideAddTask.classList.add('hide-big-task');

    setTimeout(() => {
        document.getElementById('addTask').classList.add("d-none");
    }, 200);
}


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


function openSubtask() {
    show('showSubtask');
    hide('hiddenSubtask');
}


function closeSubtask() {
    hide('showSubtask');
    show('hiddenSubtask');
}


function createSubtask() {
    let inputSubtask = document.getElementById('inputSubtask');
    let subtaskText = inputSubtask.value.trim();
    // Join.tasks.push(inputSubtask);
    if (subtaskText !== '') {
        let newSubtask = new Subtask(subtaskText)
        subtaskTemp.push(newSubtask);
        inputSubtask.value = '';
        renderSubtasks()
    }
}


function renderSubtasks() {
    let createNewSubtaskContainer = document.getElementById('createNewSubtask');
    createNewSubtaskContainer.innerHTML = '';

    for (let m = 0; m < subtaskTemp.length; m++) {
        let newSubtasks = subtaskTemp[m];
        createNewSubtaskContainer.innerHTML += JoinBoard.generateHTMLAddSubtask(newSubtasks.text, m);
    }
}


function changeSubtask(m) {
    let containerTodoSubtask = `containerTodoSubtask${m}`;
    let fixTodoSubtask = `fixTodoSubtask${m}`;
    document.getElementById(containerTodoSubtask).classList.add('d-none');
    document.getElementById(fixTodoSubtask).classList.remove('d-none');
}


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


function deleteSubtask(m) {
    subtaskTemp.splice(m, 1)
    renderSubtasks();
}


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


function renderContactsTasks() {
    let contactsList = document.getElementById('contactsList')
    for (let i = 0; i < Join.accounts.length; i++) {
        let account = Join.accounts[i];
        contactsList.innerHTML += account.tinyCard(i)
    }
}


function showContact(x) {
    console.log(x);
}


function openTask(x) {
    // setTimeout(() => {
    //     openPopUpTaskCard();
    // }, 100);
    let task = Join.tasks[x];
    let addTask = document.getElementById("addTask");
    addTask.classList.remove("d-none")
    addTask.innerHTML = task.taskCardNormal(x);
}


function editTask(x) { 
    let task = Join.tasks[x];
    let taskCard = document.getElementById("taskCard");
    taskCard.innerHTML = task.taskCardEdit(x);
    let AssignedUsers = task.worker;
    let JoinUsers = Join.accounts;
    changeCSSAttribute(); 
    for (let Worker of AssignedUsers) {
        let usersFound = JoinUsers.find((benutzer) => benutzer.email === Worker.email);
        if (usersFound) {
            usersFound.checked = true;
        }
    }

    let containerShortName = document.getElementById('containerShortName');
    containerShortName.innerHTML = '';
    for (let i = 0; i < task.worker.length; i++) {
        let assignedWorker = task.worker[i];
        containerShortName.innerHTML += assignedWorker.accountTag(i);
    }
    // Subtask
    for (let i = 0; i < task.subTasks.length; i++) {
        let oldSubtask = task.subTasks[i];
        subtaskTemp.push(oldSubtask);
    }
    renderSubtasks()
    prioTemp = task.prio;
    if (task.prio === "Urgent") {
        document.getElementById("btnUrgentWhite").click();
    } else if (task.prio === "Medium") {
        document.getElementById("btnMediumWhite").click();
    } else if (task.prio === "Low") {
        document.getElementById("btnLowWhite").click();
    }
    prioTemp = task.prio;

    // Eventlistener
    let urgent = document.getElementById('btnUrgentWhite');
    let medium = document.getElementById('btnMediumWhite');
    let low = document.getElementById('btnLowWhite');
    urgent.addEventListener('click', () => {
        prioTemp = "Urgent";
    })
    medium.addEventListener('click', () => {
        prioTemp = "Medium";
    })
    low.addEventListener('click', () => {
        prioTemp = "Low";
    })
}


function changeCSSAttribute () {
    document.getElementById('selectContacts').classList.add('w-29');
    document.getElementById('hiddenSubtask').classList.add('w-29');
    document.getElementById('prioCategoryContainer').classList.add('w-29');
    document.getElementById('showContactsContainer').classList.add('w-29');
    document.getElementById('assignedToContacts').classList.add('w-29');
    document.getElementById('styleAddTask').style.marginBottom = '0';
    document.getElementById('closeContacts').style.position = 'relative';
    document.getElementById('assignedToContacts').style.padding = '0';
    document.getElementById('assignedToBottom').classList.add('w-29');
}


function assignedCheck(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.remove('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.add('d-none');
    Join.accounts[x].checked = false;
    renderTaskContacts()
}


function assignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
    Join.accounts[x].checked = true;
    renderTaskContacts()

}


function showAssignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
}


function addNewContact() {
    document.getElementById('closeContacts').classList.add('d-none');
    document.getElementById('selectContacts').classList.remove('d-none');
}


function addShortNames(name, x) {
    renderShortNames(name, x);
}


function renderShortNames(name, x) {
    let container = document.getElementById('containerShortName');
    container.innerHTML += JoinBoard.generateHTMLRenderShortNames(name, x);
}


function removeShortNames(x) {
    let removeName = document.getElementById(`editShortNames${x}`);
    let removeShortNames = document.getElementById(`removeShortName${x}`);
    if (removeName) {
        removeName.remove();
    } else {
        removeShortNames.remove();
    }
}


function filterContactNames() {
    let search = document.getElementById('searchContacts').value;
    search = search.toLowerCase();

    let list = document.getElementById('taskContactList');
    list.innerHTML = '';

    for (let p = 0; p < Join.accounts.length; p++) {
        let name = Join.accounts[p]['name'];

        if (name.toLowerCase().includes(search)) {
            list.innerHTML += Join.accounts[p].tinyCardCheck(p);
        }
    }
}