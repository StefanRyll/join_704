let currentDraggedElement; 
// Login
function guestLogin() {
    Join.signedAccount = guest;
    summeryPage();
}
function logInUser() {
    const user = document.getElementById('loginEmail').value;
    const pw = document.getElementById('loginPassword').value;
    for (let i = 0; i < Join.accounts.length; i++) {
        const userAccount = Join.accounts[i];
        if (user === userAccount.email) {
            if (pw === userAccount.password) {
                Join.signedAccount = userAccount;
                summeryPage()
            }
        } else {
            alert("Entweder Passwort oder Email stimmen nicht überein")
        }

    }
}

// Sign Up
async function createAccount() {
    try { loadAccounts()}
    catch(e){
        console.log("Fehler", e)
    }
    finally{
        let pw = passwordCheck();
        let policy = ppCheck();
        if (pw === true && policy === true) {
            let name = document.getElementById('signUpInputName').value;
            let Email = document.getElementById('signUpInputEmail').value;
            let password = document.getElementById('signUpInputPassword').value;
            let account = new Account(name, Email, password);
            Join.accounts.push(account);
            startPage2()
        } else if (pw != true) {
            alert('Passwort nicht valide')
        } else {
            alert('You musst accept the Privacy Policy!')
        }
    }
}
function passwordCheck() {
    let pw1 = document.getElementById('signUpInputPassword').value;
    let pw2 = document.getElementById('signUpInputPassword2').value;
    if (pw1.length >= 8) {
        if (pw1 === pw2) {
            return true;
        } else {
            return false;
        }
    } else {

        return false;
    }

}
function ppCheck() {
    let checkbox = document.getElementById('ppCheck');
    if (checkbox.checked) {
        return true;
    } else {
        return false;
    }
}

// Onload Funktion
function visibility() {
    document.getElementById('pass-status').classList.add('d-none');
    document.getElementById('pass-status-eye').classList.remove('d-none');
}

function viewPassword() {
    let passwordInput = document.getElementById('loginPassword');
    let passStatus = document.getElementById('pass-status-eye');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png'; // Ändern Sie den Pfad auf das Bild für "Sichtbarkeit aus"
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png'; // Ändern Sie den Pfad auf das Bild für "Sichtbarkeit an"
    }
}

function startPage() {
    try { loadAccounts()}
    catch(e){
        console.log("Fehler", e)
    }
    finally{
    const state = {page: 'login'};
    const title = 'Login';
    const url = 'login.html';
    history.pushState(state, title,url)

    body.innerHTML = JoinLogin.startAnimation();
    body.innerHTML += JoinLogin.logInContent();
    }
}

function startPage2() {
    try { loadAccounts()}
    catch(e){
        console.log("Fehler", e)
    }
    finally{
    body.innerHTML = JoinLogin.logoLogin();
    body.innerHTML += JoinLogin.logInContent();
}
}
function signUp() {
    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    const state = {page: 'signup'};
    const title = 'SignUp';
    const url = 'signUp.html';
    history.pushState(state, title,url)

    body.innerHTML = JoinLogin.logoLogin();
    body.innerHTML = JoinLogin.signUpWindow();
}

// Sidebar and Header
function showSideAndHead() {
    const SNH = document.getElementById('SideAndHead');
    SNH.innerHTML = Join.SideAndHead();
    let accountIssues = document.getElementById('accountIssues')
    let logoutWindow = document.getElementById('logoutWindow')
    accountIssues.addEventListener('click', () => {
        logoutWindow.classList.toggle('d-none');
    })

}

function logout() {
    Join.signedAccount = "";
    startPage()
}

// Board und Tasks
/**
 * @param {string}  slideAddTask animtaion, when you click on addTask Button slide show  
 */
function openAddTask(x = 0) {
    JoinBoard.renderAddTask(x)
    slideAddTask = document.getElementById('slideAddTask').classList.add('show-bg-task');
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
        const subTask = subtasks;
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
// function readAssignment() {
    // let assignedUsers = [];
    // for (let i = 0; i < Join.accounts.length; i++) {
        // const account = document.getElementById(`ac${i}`)
        // if (account.checked) {
            // let user = Join.accounts[i];
            // assignedUsers.push(user)
        // }
// 
    // }
    // return assignedUsers;
// }
// function renderAssignedUsers() {
    // let assignedUsers = readAssignment();
    // const accountTags = document.getElementById('accountTags');
    // accountTags.innerHTML = "";
    // for (let i = 0; i < assignedUsers.length; i++) {
        // const user = assignedUsers[i];
        // accountTags.innerHTML += user.accountTags()
    // }
// }
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
    subtasks = [];
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
 * @param {string}  slideAddTask animtaion, when you click on addTask Button slide show 
 */
function closeAddTask() {
    slideAddTask = document.getElementById('slideAddTask').classList.remove('show-bg-task');
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

function checkboxActivate() {
    document.getElementById('checkbox').classList.add('d-none');
    document.getElementById('checkbox-active').classList.remove('d-none');
}

function checkboxDeactivate() {
    document.getElementById('checkbox-active').classList.add('d-none');
    document.getElementById('checkbox').classList.remove('d-none');
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
    if (subtaskText !== '') {
        subtasks.push(subtaskText);
        inputSubtask.value = '';
        renderSubtasks()
    }
}

function renderSubtasks() {
    let createNewSubtaskContainer = document.getElementById('createNewSubtask');
    createNewSubtaskContainer.innerHTML = '';

    for (let m = 0; m < subtasks.length; m++) {
        let newSubtasks = subtasks[m];
        createNewSubtaskContainer.innerHTML += JoinBoard.generateHTMLAddSubtask(newSubtasks, m);
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
        taskContactList.innerHTML += account.tinyCardCheck(i);
    }
}

function deleteSubtask(m) {
    subtasks.splice(m, 1)
    renderSubtasks();
}

function editSubtask(m) {
    let editableTask = document.getElementById(`todoSubtask${m}`)
    editableTask.setAttribute('contenteditable', true)
    editableTask.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            if (editableTask.value != "")
                subtasks[m] = editableTask.textContent;
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

}
function taskSaveChanges(x){
    let eTask = Join.tasks[x]
    let titleInput = document.getElementById('taskCardETitle').value;
    let descInput = document.getElementById('taskCardEDesc').value;
    let dateInput = document.getElementById('taskCardEDate').value;
    let assignInput = document.getElementById('taskCardEDate').value;
    let prioInput = document.getElementById('taskCardEDate').value;
    let subtaskInput = document.getElementById('taskCardEDate').value;
    let title = (titleInput) ? titleInput : eTask.title;
    let description = (descInput) ? descInput : eTask.desc;
    let date = (descInput) ? descInput : eTask.desc;
    let assignedContacts = ()=>{
        eAssignedContacts = []
    };
    let prio;
    let subtasks;
    console.log("Änderung", x);
}
function closeTaskCard(){
    boardPage()
}
// Final Pages
function summeryPage() {
    // try { loadTasks()}
    // catch(e){
    //     console.log("Fehler", e)
    // }
    // finally{
    const state = {page: 'summary'};
    const title = 'Summary';
    const url = 'summary.html';
    history.pushState(state, title,url)
    body.innerHTML = "";
    body.innerHTML = JoinLogin.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = JoinSummary.summeryContent();

    // }
}

function boardPage() {
    // try { loadTasks()}
    // catch(e){
    //     console.log("Fehler", e)
    // }
    // finally{
    const state = {page: 'Board'};
    const title = 'Board';
    const url = 'Board.html';
    history.pushState(state, title,url)

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = JoinBoard.boardContent();
    JoinBoard.renderTask()
    // updateHTML();
    // }
}

function contactsPage() {
    try { loadAccounts()}
    catch(e){
        console.log("Fehler", e)
    }
    finally{
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.contactsContent();
    renderContacts()
    }
}
function helpPage() {
    const state = {page: 'help'};
    const title = 'FAQ';
    const url = 'FAQ.html';
    history.pushState(state, title,url)

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = JoinAbout.helpContent();
}

function privacyPage() {
    const state = {page: 'privacy'};
    const title = 'Privacy Policy';
    const url = 'Privacy Policy.html';
    history.pushState(state, title,url)

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = JoinAbout.privacyContent();
}

function legalPage() {
    const state = {page: 'legal'};
    const title = 'Legal';
    const url = 'Legal.html';
    history.pushState(state, title,url)

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = JoinAbout.legalNoticeContent();
}

function addTaskPage() {
    // try { loadTasks()}
    // catch(e){
    //     console.log("Fehler", e)
    // }
    // finally{
    const state = {page: 'addTask'};
    const title = 'addTask';
    const url = 'addTask.html';
    history.pushState(state, title,url)


    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = JoinBoard.generateHTMLaddTaskWindow();
    // content.innerHTML = Join.generateHTMLaddTask();
    }
// }
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

function toggleCheckboxCard() {
    document.getElementById('cardCheckboxFalse').classList.toggle('d-none');
    document.getElementById('cardCheckboxTrue').classList.toggle('d-none');
}

function openSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.add('d-none');
    document.getElementById('closeContactsFromCard').classList.remove('d-none');
}

function closeSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.remove('d-none');
    document.getElementById('closeContactsFromCard').classList.add('d-none');
}
