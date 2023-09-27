/**
 * Lege neue Seite an
 * @param {Page}
 */
let Join = new Page()
// Accounts
const guest = new Account("Guest", "email@join.de", "");
const user1 = new Account("Roman Schröder", "roman.schroeder@inclufilm.com", "Gregor2023")
const user2 = new Account("Florian", "florian.rehm@developerakademie.com", "Password123")
Join.accounts.push(user1);
Join.accounts.push(user2);

// Tasks
let task01 = new Task("Einkaufen gehen", "Stefan", "Jemand muss zu Aldi fahren und Chips, Getränke und ggf noch ein paar Häppchen einkaufen", 2023, 9, 30, "Medium", "User Story")
let task02 = new Task("Abwaschen goes Big", "Dominik", "Jemand muss dafür sorgen, dass das Geschirr und besteck sauber ist", 2023, 9, 30, "Medium", "User Story")
let task03 = new Task("Aufbau", "Roman", "Jemand muss alle Party Möbel aufstellen", 2023, 9, 29, "Medium", "User Story")
Join.tasks.push(task01);
Join.tasks.push(task02);
Join.tasks.push(task03);

let body = document.getElementById('body')

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

function startPage() {
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
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.addTaskContent();
}

function createTask() {
    const title = document.getElementById("addTaskTitle").value;
    const worker = document.getElementById('assignTaskToContacts').value;
    const desc = document.getElementById("addTaskDescription").value;
    const date = document.getElementById("addTaskDescription").value;
    const prio = getPrio();
    const category = document.getElementById('addTaskCategory').value;
    let newTask = new Task(title, worker, desc, date, prio, category);
    Join.tasks.push(newTask)
    console.log(Join.tasks);
}
function getPrio(){
    let prio01 = document.getElementById('prio01')
    let prio02 = document.getElementById('prio02')
    if (prio01.checked){
        return "Urgent";
    }else if(prio02.checked){
        return "Medium";
    }else{
        return "Low";
    }
}
function summeryPage() {
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = Join.summeryContent();
}

function boardPage() {
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = "Join.boardContent()";
}

function contactsPage() {
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead()
    content.innerHTML = "Join.contactsContent()";
}

function checkbox() {
    document.getElementById('checkbox').src = './IMG/checkboxFilled.png';
    // document.getElementById('checkbox').src = './IMG/checkboxEmpty.png';
}

// function checkboxRemove() {
//     document.getElementById('checkbox-on').classList.add('d-none');
//     document.getElementById('checkbox-none').classList.remove('d-none');
// }
startPage()