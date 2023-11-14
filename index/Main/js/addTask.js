/**
 * @param {string}  slideAddTask animtaion,  slide show  addTask
 */
function openAddTask(x = 0) {
    JoinBoard.renderAddTask(x)
    let slideAddTask = document.getElementById('slideAddTask')
    slideAddTask.classList.add('show-bg-task');
}


function createTaskFromBoard(x = 0) {
    try { loadAccounts()}
    catch(e){
        console.log("Fehler", e)
    }
    finally{
        const title = document.getElementById("boardTaskTitle").value;
        const worker = readAssignedUsers()
        const desc = document.getElementById('boardTaskDescription').value;
        const date = document.getElementById('date').value;
        const prio = taskOutput;
        const category = document.getElementById('taskCategoryInput').value;
        const subTask = subtaskTemp;
        console.log("Subtask",subTask);
        let newTask = new Task(title, worker, desc, date, prio, category, subTask);
        if (x == "1") {
            newTask.progress = true;
        } else if (x == "2") {
            newTask.feedback = true;
        } else {
            newTask.todo = true;
        }
        console.log(newTask)

        for (let i = 0; i < newTask.worker.length; i++){
            let taskWorker = newTask.worker[i];
            taskWorker.checked = false;
        }
        Join.tasks.push(newTask)
        clearInputs(title, desc, worker, date, category, subTask);
    
        try { saveTasks()}
        catch(e){
            console.log("Fehler", e)
        }
        finally{
            closeAddTask()
            JoinBoard.renderTask()
        }
    }
}


function readAssignedUsers(){
    let workers = [];
    for(let i = 0; i < Join.accounts.length;i++){
        const account = Join.accounts[i]
        if (account.checked){
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
    for (let account in Join.accounts){
        account.checked = false;
    }
    subtaskTemp = [];
}


function toggleContactsAssign() {
    renderTaskContacts()
    document.getElementById('selectContacts').classList.toggle('d-none');
    document.getElementById('closeContacts').classList.toggle('d-none');
}
/**This Function close and open the Categories
 * @param {string}  showSelectCategory show and hidden div
 */
function toggleCategory() {
    document.getElementById('showSelectCategory').classList.toggle('d-none');
    document.getElementById('hiddenSelectCategory').classList.toggle('d-none');
}


function btnTaskPrio(prioBtn) {
    let urgent = document.getElementById('btnUrgentWhite');
    let medium = document.getElementById('btnMediumWhite');
    let low = document.getElementById('btnLowWhite');
    let urgentRed = document.getElementById('btnUrgentRed');
    let mediumYellow = document.getElementById('btnMediumYellow');
    let lowGreen = document.getElementById('btnLowGreen');

    if (prioBtn == 'btnUrgentWhite') {
        urgent.classList.add('d-none');
        urgentRed.classList.remove('d-none');
    } else {
        urgent.classList.remove('d-none');
        urgentRed.classList.add('d-none');
    }
    if (prioBtn == 'btnMediumWhite') {
        medium.classList.add('d-none');
        mediumYellow.classList.remove('d-none');
    } else {
        medium.classList.remove('d-none');
        mediumYellow.classList.add('d-none');
    }
    if (prioBtn == 'btnLowWhite') {
        low.classList.add('d-none');
        lowGreen.classList.remove('d-none');
    } else {
        low.classList.remove('d-none');
        lowGreen.classList.add('d-none');
    }
}
/**This is a select function for Input - > Value
 * @param {string} technicalTask  select the category Technical Task
 */
function selectCategoryTechnical() {
    let technicalTask = document.getElementById('technicalTask').textContent;
    let changeInputField = document.getElementById('taskCategoryInput');
    document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    document.getElementById('showSelectCategory').classList.add('d-none');
    changeInputField.value = technicalTask;
}
/**This is a select function for Input - > Value
 * @param {string} userStory  select the category User Story
 */
function selectCategoryStory() {
    let userStory = document.getElementById('userStory').textContent;
    let changeInputField = document.getElementById('taskCategoryInput');
    document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    document.getElementById('showSelectCategory').classList.add('d-none');
    changeInputField.value = userStory;
}
/** 
 * @param {string}  slideAddTask  addTask Button slide show 
 */
function closeAddTask() {
    let slideAddTask = document.getElementById('slideAddTask')
    slideAddTask.classList.remove('show-bg-task');
    document.getElementById('addTask').classList.add("d-none")
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
    document.getElementById('showSubtask').classList.remove('d-none');
    document.getElementById('hiddenSubtask').classList.add('d-none');
}


function closeSubtask() {
    document.getElementById('showSubtask').classList.add('d-none');
    document.getElementById('hiddenSubtask').classList.remove('d-none');
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
    for (let i = 0; i < Join.accounts.length; i++) {
        const account = Join.accounts[i];
        if (account.checked === true){
            taskContactList.innerHTML += account.tinyCardCheck(i);
            showAssignedCheckNone(i)
        }
        taskContactList.innerHTML += account.tinyCardCheck(i);
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


function renderContacts() {
    let contactsList = document.getElementById('contactsList')
    for (let i = 0; i < Join.accounts.length; i++) {
        const account = Join.accounts[i];
        contactsList.innerHTML += account.tinyCard(i)
    }
}


function showContact(x) {
    console.log(x);
}


function openTask(x){
    let task = Join.tasks[x];
    let addTask = document.getElementById("addTask");
    addTask.classList.remove("d-none")
    // console.log("Task: ", task);
    // console.log("Geöffnet: ", task.taskCardNormal(x))
    addTask.innerHTML = task.taskCardNormal(x);
}


function editTask(x){
    let task = Join.tasks[x];
    let taskCard = document.getElementById("taskCard");
    taskCard.innerHTML = task.taskCardEdit(x);
    // Eventlistener
    const urgent = document.getElementById('btnUrgentWhite');
    const medium = document.getElementById('btnMediumWhite');
    const low = document.getElementById('btnLowWhite');
    urgent.addEventListener('click', () => {
        taskOutput = "Urgent";
    })
    medium.addEventListener('click', () => {
        taskOutput = "Medium";
    })
    low.addEventListener('click', () => {
        taskOutput = "Low";
    })
}


function assignedCheck(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.remove('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.add('d-none');
    Join.accounts[x].checked = false;
}


function assignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
    Join.accounts[x].checked = true;
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
    removeName.remove();
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