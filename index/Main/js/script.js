// Login
function guestLogin() {
    Join.signedAccount = guest;
    summeryPage();
}
function logInUser() {
    const user = document.getElementById('loginEmail').value;
    const pw = document.getElementById('loginPassword').value;
    let remember = () => {
        if (Join.rememberMe){
            let userAsJson = JSON.stringify(user)
            localStorage.setItem("remember", userAsJson)
        }
    }
    for (let i = 0; i < Join.accounts.length; i++) {
        const userAccount = Join.accounts[i];
        if (userAccount.email === user) {
            if (userAccount.verified == true){
                if (pw === userAccount.password) {
                    Join.signedAccount = userAccount;
                    remember()
                    summeryPage()
                
                } else {
                    alert("Entweder Passwort oder Email stimmen nicht überein")
                }
            }
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
        passStatus.src = '../IMG/visibility_on.png'; // Ändern Sie den Pfad auf das Bild für "Sichtbarkeit aus"
    } else {
        passwordInput.type = 'password';
        passStatus.src = '../IMG/visibility_off.png'; // Ändern Sie den Pfad auf das Bild für "Sichtbarkeit an"
    }
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


function checkboxActivate() {
    document.getElementById('checkbox').classList.add('d-none');
    document.getElementById('checkbox-active').classList.remove('d-none');
    Join.rememberMe = true;
}


function checkboxDeactivate() {
    document.getElementById('checkbox-active').classList.add('d-none');
    document.getElementById('checkbox').classList.remove('d-none');
    Join.rememberMe = false;
}


function taskSaveChanges(x){
    let eTask = Join.tasks[x]
    let eTaskTitle = eTask.title;
    let eTaskWorker = ()=>{
        let checkedUsers = [];
        for (let i = 0; i < Join.accounts.length; i++) {
            const User = Join.accounts[i];
            if (User.checked){
                checkedUsers.push(User)
            }
        }
        return checkedUsers;
    };
    console.log(eTaskWorker);
    let eTaskDesc = eTask.desc;
    let eTaskDate = eTask.date;
    let eTaskPrio = eTask.prio;
    let eTaskCatergory = eTask.Category;
    let eTaskSubTask = eTask.subTask;
    let eTaskTodo = eTask.todo;  //Wird behalten
    let eTaskProgress = eTask.progress; //Wird behalten
    let eTaskFeedback = eTask.feedback; //Wird behalten
    let eTaskDone = eTask.done; //Wird behalten
    // Edited Task
    let titleInput = document.getElementById('taskCardETitle').value;
    let descInput = document.getElementById('taskCardEDesc').value;
    let dateInput = document.getElementById('taskCardEDate').value;
    let prioInput = prioTemp;
    let subtaskInput = document.getElementById('taskCardEDate').value;
    // // Merched Task
    // let title = (titleInput) ? titleInput : eTask.title;
    // let description = (descInput) ? descInput : eTaskDesc;
    // let date = (descInput) ? dateInput : eTaskDate;
    // let prio = (prioInput) ? prioInput : eTaskPrio;
    // Join.tasks[x] = new Task(title, eTaskWorker(), desc, date, prio, Category, subTasks, eTaskTodo, eTaskProgress, eTaskFeedback, eTaskDone)
    closeTaskCard()
}

function tempTheSubtasks(){
    
}



function closeTaskCard(){
    cleanUpAccountsCheck()
    boardPage()
}


function cleanUpAccountsCheck(){
    for (let i = 0; i < Join.accounts.length; i++) {
        const User = Join.accounts[i];
        User.checked = false;
    }
}


function toggleCheckboxCard(task, subtask) {
    let checkableSubtask = Join.tasks[task]['subTasks'][subtask];
    if (checkableSubtask.done){
        checkableSubtask.subTaskUndone();
    }else{
        checkableSubtask.subTaskDone();
    }
    document.getElementById(`cardCheckboxFalse${subtask}`).classList.toggle('d-none');
    document.getElementById(`cardCheckboxTrue${subtask}`).classList.toggle('d-none');
}


function openSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.add('d-none');
    document.getElementById('closeContactsFromCard').classList.remove('d-none');
}


function closeSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.remove('d-none');
    document.getElementById('closeContactsFromCard').classList.add('d-none');
}




