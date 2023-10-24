let currentDraggedElement; 
// Save and Load

// function // saveAll()() {
//     let joinAsJSON = JSON.stringify(Join);
//     localStorage.setItem("Join", joinAsJSON)
// }

// function // loadAll() {
//     let loadJoin = localStorage.getItem("Join");
//     let joinParsed = JSON.parse(loadJoin)
//     let Join = new Page()
//     Join.accounts = joinParsed.accounts;
//     Join.signedAccount = joinParsed.signedAccount;
//     Join.tasks = joinParsed.tasks;
// }

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
    saveTasks()
    // try { loadAccounts()}
    // catch(e){
    //     console.log("Fehler", e)
    // }
    // finally{
    body.innerHTML = Join.startAnimation();
    body.innerHTML += Join.logInContent();
    // }
}

function startPage2() {

    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    body.innerHTML = Join.logoLogin();
    body.innerHTML += Join.logInContent();
}

function signUp() {
    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    body.innerHTML = Join.logoLogin();
    body.innerHTML = Join.signUpWindow();
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
    Join.renderAddTask(x)
    slideAddTask = document.getElementById('slideAddTask').classList.add('show-bg-task');
}

function createTaskFromBoard(x = 0) {
    // try {loadTasks()}
    // catch(e){console.log("Fehler:", e)}
    const title = document.getElementById("boardTaskTitle").value;
    const assignedUsers = document.getElementById(`shortname${x}`).textContent;
    const desc = document.getElementById('boardTaskDescription').value;
    const date = document.getElementById('date').value;
    const prio = taskOutput;
    const category = document.getElementById('taskCategoryInput').value;
    const subTask = document.getElementById(`todoSubtask${x}`).textContent;
    let newTask = new Task(title, assignedUsers, desc, date, prio, category, subTask);
    if (x == "1") {
        newTask.progress = true;
    } else if (x == "2") {
        newTask.feedback = true;
    } else {
        newTask.todo = true;
    }
    Join.tasks.push(newTask)
    clearInputs(title, desc, assignedUsers, date, category, subTask);
    subtasks = []
    
    try { saveTasks()}
    catch(e){
        console.log("Fehler", e)
    }
    finally{
        closeAddTask()
    }

}
function readAssignment() {
    let assignedUsers = [];
    for (let i = 0; i < Join.accounts.length; i++) {
        const account = document.getElementById(`ac${i}`)
        if (account.checked) {
            let user = Join.accounts[i];
            assignedUsers.push(user)
        }

    }
    return assignedUsers;
}
function renderAssignedUsers() {
    let assignedUsers = readAssignment();
    const accountTags = document.getElementById('accountTags');
    accountTags.innerHTML = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        const user = assignedUsers[i];
        accountTags.innerHTML += user.accountTags()
    }
}
function clearInputs(title, description, contact, date, newCategory, subtask) {
    title.value = '';
    description.value = '';
    contact.value = '';
    date.value = '';
    newCategory.value = "Select task category";
    subtask.value = '';
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
        createNewSubtaskContainer.innerHTML += Join.generateHTMLAddSubtask(newSubtasks, m);
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
// Final Pages
function summeryPage() {
    loadTasks()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.summeryContent();
}

function boardPage() {
    loadTasks()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.boardContent();
    Join.renderTask();
}

function contactsPage() {
    // loadAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.contactsContent();
    renderContacts()
}

function helpPage() {
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.helpContent();
}

function privacyPage() {
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.privacyContent();
}

function legalPage() {
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.legalNoticeContent();
}

function addTaskPage() {
    // loadAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.generateHTMLaddTaskWindow();
    // content.innerHTML = Join.generateHTMLaddTask();
}

function assignedCheck(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.remove('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.add('d-none');

}

function assignedCheckNone(x) {
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
    container.innerHTML += Join.generateHTMLRenderShortNames(name, x);
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

function updateHTML() {
    let open = Join.subtasks.filter(s => s['status'] == 'open');
    
    document.getElementById('open').innerHTML = '';

    for (let q = 0; q < open.length; q++) {
        let element = open[q];
        document.getElementById('open').innerHTML += renderTask(element);
    }

    let close = Join.subtasks.filter(s => s['status'] == 'close');

    document.getElementById('close').innerHTML = '';

    for (let q = 0; q < close.length; q++) {
        let element = close[q];
        document.getElementById('close').innerHTML += renderTask(element);
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    Join.subtasks[currentDraggedElement]['status'] = category;
    updateHTML();
}



