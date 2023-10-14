let subtasks = []; //@Roman kannst gerne ändern! Muss ich nicht ;D
// const fs = require('fs');
let Join = new Page()
// Accounts
const guest = new Account("Guest", "email@join.de", "");
const user1 = new Account("Roman Schröder", "roman.schroeder@inclufilm.com", "Gregor2023")
const user2 = new Account("Florian", "florian.rehm@developerakademie.com", "Password123")
const user3 = new Account("Stefan", "florian.rehm@developerakademie.com", "Password123")
const user4 = new Account("Dominik", "florian.rehm@developerakademie.com", "Password123")
Join.accounts.push(guest);
Join.accounts.push(user1);
Join.accounts.push(user2);
Join.accounts.push(user3);
Join.accounts.push(user4);

// Tasks
let task01 = new Task("Einkaufen gehen", Join.accounts[3], "Jemand muss zu Aldi fahren und Chips, Getränke und ggf noch ein paar Häppchen einkaufen", 2023, 9, 30, "Medium", "User Story")
let task02 = new Task("Abwaschen goes Big", Join.accounts[4], "Jemand muss dafür sorgen, dass das Geschirr und besteck sauber ist", 2023, 9, 30, "Medium", "User Story")
let task03 = new Task("Aufbau", Join.accounts[1], "Jemand muss alle Party Möbel aufstellen", 2023, 9, 29, "Medium", "User Story")
let task04 = new Task("Meeting für Join", Join.accounts[1], "Wir besprechen wie wir das KambanBoard bauen", 2023, 10, 10, "Medium", "User Story")
task01.done = true;
Join.tasks.push(task01);
Join.tasks.push(task02);
Join.tasks.push(task03);
Join.tasks.push(task04);
let body = document.getElementById('body')

// Save and Load

function saveAll(){
    let joinAsJSON = JSON.stringify(Join);
    localStorage.setItem("Join", joinAsJSON)
}
function loadAll(){
    let loadJoin = localStorage.getItem("Join");
    let joinParsed = JSON.parse(loadJoin)
    let Join = new Page()
    Join.accounts = joinParsed.accounts;
    Join.signedAccount = joinParsed.signedAccount;
    Join.tasks = joinParsed.tasks;
}


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
function createAccount() {
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
    // loadAll()
    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    body.innerHTML = Join.startAnimation();
    body.innerHTML += Join.logInContent();
    // console.log(windowArea);
}

function startPage2() {
    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    body.innerHTML = Join.logoLogin();
    body.innerHTML += Join.logInContent();
    // console.log(windowArea);
}

function signUp() {
    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    body.innerHTML = Join.logoLogin();
    body.innerHTML = Join.signUpWindow();
    // console.log(windowArea);
}
// Sidebar and Header
function showSideAndHead() {
    const SNH = document.getElementById('SideAndHead');
    SNH.innerHTML = Join.SideAndHead();
}

// Board und Tasks
/**
 * @param {string}  slideAddTask animtaion, when you click on addTask Button slide show  
 */
function openAddTask() {
    console.log("openAddTask");
    Join.renderAddTask()
    slideAddTask = document.getElementById('slideAddTask').classList.add('show-bg-task');
}
function createTaskFromBoard() {
    const title = document.getElementById("boardTaskTitle").value;
    const contact = document.getElementById('boardTaskAddContact').value;
    const desc = document.getElementById("boardTaskDescription").value;
    const date = document.getElementById("datum").value;
    console.log("Date", date);
    const prio = "Wichtig"//getPrio();
    const medium = document.getElementById('btnMediumYellow').value;
    const category = document.getElementById('taskCategoryInput').value;
    let newTask = new Task(title, contact, desc, date, prio, category, medium, subtasks);
    Join.tasks.push(newTask)
    clearInputs(title, desc, contact, date, category, medium);
    subtasks = []
    console.log(subtasks.length);
    closeAddTask()
    // saveAll()
}
function clearInputs(title, description, contact, date, newCategory, medium) {
    title.value = '';
    description.value = '';
    contact.value = '';
    date.value = '';
    medium.value = '';
    newCategory.value = "Select task category";
}
function toggleContactsAssign() {
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
    console.log("Hallo");
    let inputSubtask = document.getElementById('inputSubtask');
    let subtaskText = inputSubtask.value.trim();
    console.log("createSubtask()", subtaskText);
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
function deleteSubtask(m){
    console.log("Hallo");
    subtasks.splice(m, 1)
    renderSubtasks();
}
function editSubtask(m){
    let editableTask = document.getElementById(`todoSubtask${m}`)
    console.log("Wird editiert");
    editableTask.setAttribute('contenteditable', true)
    editableTask.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13){
            if (editableTask.value != "")
            console.log(editableTask.textContent);
            subtasks[m] = editableTask.textContent;
            editableTask.setAttribute('contenteditable', false)
            renderSubtasks()
        }
    })
}
// Final Pages
function summeryPage() {
    // loadAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.summeryContent();
}
function boardPage() {
    // loadAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.boardContent();
    Join.renderTaskTodo();
}
function contactsPage() {
    // loadAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = "Join.contactsContent()";
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
