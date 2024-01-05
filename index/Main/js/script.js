// Login

function guestLogin() {
    const guest = new Account("Guest", "email@join.de", "");
    Join.signedAccount = guest;
    summeryPage();
}

async function logInUser() {
    const user = document.getElementById('loginEmail').value;
    const pw = document.getElementById('loginPassword').value;
    let remember = () => {
        if (Join.rememberMe) {
            let userAsJson = JSON.stringify(user);
            localStorage.setItem("remember", userAsJson);
        }
    }
    for (let i = 0; i < Join.accounts.length; i++) {
        const userAccount = Join.accounts[i];
        if (userAccount.email === user) {
            if (pw === userAccount.password) {
                Join.signedAccount = userAccount;
                remember()
                summeryPage()

            } else {
                console.log("Entweder Passwort oder Email stimmen nicht überein")
            }
        }
    }
}

// Sign Up
async function createAccount() {
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
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
            console.log('Passwort nicht valide')
        } else {
            console.log('You musst accept the Privacy Policy!')
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


// Sidebar and Header
function showSideAndHead() {
    const SNH = document.getElementById('SideAndHead');
    SNH.innerHTML = Join.SideAndHead();
}

function openSideAndHeadMenu(event) {
    event.stopPropagation();
    let logoutWindow = document.getElementById("logoutWindow");
    setTimeout(() => {
        logoutWindow.classList.add("show-popupAccount");
    }, 100);
}

function closeSideAndHeadMenu() {
    let logoutWindow = document.getElementById("logoutWindow");

    document.addEventListener("click", function(event) {
        if (event.target !== logoutWindow) {

            setTimeout(() => {
                logoutWindow.classList.remove("show-popupAccount");
            }, 100);

        }
    });
}


function logout() {
    Join.signedAccount = "";
    startPage()
}


function checkboxActivate() {
    Join.rememberMe = true;
}


function checkboxDeactivate() {
    Join.rememberMe = false;
}


function taskSaveChanges(x) {
    let eTask = Join.tasks[x]
    let eTaskWorker = () => {
        let checkedUsers = [];
        for (let i = 0; i < Join.accounts.length; i++) {
            const User = Join.accounts[i];
            if (User.checked) {
                checkedUsers.push(User)
            }
        }
        return checkedUsers;
    };

    let eTaskTodo = eTask.todo; //Wird behalten
    let eTaskProgress = eTask.progress; //Wird behalten
    let eTaskFeedback = eTask.feedback; //Wird behalten
    let eTaskDone = eTask.done; //Wird behalten
    // Edited Task
    let titleInput = document.getElementById('taskCardETitle').value;
    let descInput = document.getElementById('taskCardEDesc').value;
    let dateInput = document.getElementById('taskCardEDate').value;
    let prioInput = prioTemp;
    let subtaskInput = subtaskTemp;
    let Category = eTask.Category;
    // // Merched Task

    Join.tasks[x] = new Task(titleInput, eTaskWorker(), descInput, dateInput, prioInput, Category, subtaskInput, eTaskTodo, eTaskProgress, eTaskFeedback, eTaskDone)

    saveTasks();
    closeTaskCard();
    cleanUpAll();

}

function tempTheSubtasks() {

}



function closeTaskCard() {
    cleanUpAccountsCheck();
    boardPage();
}

function cleanUpAll() {
    cleanUpAccountsCheck();
    subtaskTemp = [];
    prioTemp = "";
}

function cleanUpAccountsCheck() {
    for (let i = 0; i < Join.accounts.length; i++) {
        const User = Join.accounts[i];
        User.checked = false;
    }
}


function toggleCheckboxCard(task, subtask) {
    let checkableSubtask = Join.tasks[task]['subTasks'][subtask];
    if (checkableSubtask.done) {
        checkableSubtask.subTaskUndone();
    } else {
        checkableSubtask.subTaskDone();
    }
    document.getElementById(`cardCheckboxFalse${subtask}`).classList.toggle('d-none');
    document.getElementById(`cardCheckboxTrue${subtask}`).classList.toggle('d-none');
    saveTasks()
}


function openSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.add('d-none');
    document.getElementById('closeContactsFromCard').classList.remove('d-none');
}


function closeSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.remove('d-none');
    document.getElementById('closeContactsFromCard').classList.add('d-none');
}