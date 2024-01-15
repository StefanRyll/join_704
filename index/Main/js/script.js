/**
 * Performs a guest login by creating a new Account object with default guest information,
 * setting it as the signed account in the Join object, navigating to the summary page,
 * and checking for a welcome response.
 * @function
 * @name guestLogin
 * @returns {void}
 */
function guestLogin() {
    const guest = new Account("Guest", "email@join.de", "");
    Join.signedAccount = guest;
    summeryPage();
    checkWelcomeRespon();
}
/**
 * Logs in a user by comparing the entered login credentials with existing user accounts.
 * Sets the signed account in the Join object, saves login information if the "Remember Me" option is enabled,
 * navigates to the summary page, checks for a welcome response, and displays the welcome overlay if applicable.
 * @async
 * @function
 * @name logInUser
 * @returns {Promise<void>}
 */
async function logInUser() {
    const user = document.getElementById('loginEmail').value;
    const pw = document.getElementById('loginPassword').value;
    let remember = () => {
        if (Join.rememberMe) {
            let userAsJson = JSON.stringify(user);
            localStorage.setItem("remember", userAsJson);
        }
    }
    let wentWrong = () => {
        let loginPasswordFrame = document.getElementById('loginPasswordFrame')
        let label = document.querySelector(".falsePassword")
        loginPasswordFrame.classList.add('redFrame');
        label.classList.add('falsePasswordRed')
    }
    let myAccount = Join.accounts.filter(userAccount => userAccount.email === user)
    if (myAccount.length != 0) {
        myAccount = myAccount[0]
        if (pw === myAccount.password) {
            Join.signedAccount = myAccount;
            remember();
            summeryPage();
            checkWelcomeRespon();

        } else {
            wentWrong();
        }
    } else {
        wentWrong();
    }
}

/**
 * Checks the window width and shows the welcome overlay if the width is less than 767 pixels.
 * @function
 * @name checkWelcomeResponse
 * @returns {void}
 */
function checkWelcomeRespon() {
    if (window.innerWidth < 767) {
        showWelcomeOverlay();
    }
}

/**
 * Displays the welcome overlay and hides it after a delay of 1000 milliseconds (1 second).
 * @function
 * @name showWelcomeOverlay
 * @returns {void}
 */
function showWelcomeOverlay() {
    let welcomeOverlay = document.getElementById('welcomeOverlay');
    welcomeOverlay.classList.remove('d-none');
    setTimeout(() => {
        welcomeOverlay.classList.add('d-none');
    }, 1000);
}

/**
 * Asynchronously creates a new user account by loading existing accounts, performing password and privacy policy checks,
 * and adding the new account to the Join object's list of accounts.
 * Navigates to the next page on successful account creation.
 * @async
 * @function
 * @name createAccount
 * @returns {Promise<void>}
 */
async function createAccount() {
    let wentWrong = () => {
        let loginPasswordFrame = document.getElementById('passwordCheckArea')
        let label = document.querySelector(".falsePassword")
        loginPasswordFrame.classList.add('redFrame');
        label.classList.add('falsePasswordRed')
    }

    try { loadAccounts() } catch (e) { console.log("Fehler", e) }

    let pw = passwordCheck();
    let policy = ppCheck();
    let name = document.getElementById('signUpInputName').value;
    let Email = document.getElementById('signUpInputEmail').value;
    let emailCheck = () => {
        let existingAccounts = Join.accounts.filter(account => account.email === Email)
        let exist = (existingAccounts.length !== 0) ? true : false;
        return exist;
    }
    let password = document.getElementById('signUpInputPassword').value;
    console.log('pw is', pw, " and Policy is ", policy);
    if (pw != true) {
        wentWrong()
        console.log('Passwort nicht valide')
    } else if (policy != true) {
        console.log('You must accept the Privacy Policy!')
    } else if (emailCheck() === true) {
        console.log('Email already existing')

    } else if (pw === true && policy === true) {
        let account = new Account(name, Email, "", password);
        Join.accounts.push(account);
        policyCheck = false;
        setTimeout(() => {
            startPage2();
        }, 2200);
        saveAccounts();
        successCreateAccount();
    }
}
/**
 *  function for render a little information overlay to createAccount
 * 
 */
function successCreateAccount() {
    openSuccessCreateAccountOverlay();
    setTimeout(() => {
        closeSuccessCreateAccountOverlay();
    }, 2000);
}
/**
 * Validates password input during sign-up.
 * @function
 * @returns {boolean} - Returns true if passwords are valid, otherwise false.
 */
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
/**
 * Checks if privacy policy checkbox is checked.
 * @function
 * @returns {boolean} - Returns the value of the global policyCheck variable.
 */
function ppCheck() {
    // let checkbox = document.getElementById('ppCheck');
    let policy = policyCheck;
    return policy
}
/**
 * Hides password status and displays password visibility icon on page load.
 * @function
 * @returns {void}
 */
function visibility() {
    document.getElementById('pass-status').classList.add('d-none');
    document.getElementById('pass-status-eye').classList.remove('d-none');
}
/**
 * Toggles the visibility of the password input.
 * @function
 * @returns {void}
 */
function viewPassword() {
    let passwordInput = document.getElementById('loginPassword');
    let passStatus = document.getElementById('pass-status-eye');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png'; 
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png';
    }
}
/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
 */
function viewPasswordSignUp1() {
    let passwordInput = document.getElementById('signUpInputPassword');
    let passStatus = document.getElementById('pass-status-eye');
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png';
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png';
    }
}
/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
 */
function viewPasswordSignUp2() {
    let passwordInput = document.getElementById('signUpInputPassword2');
    let passStatus = document.getElementById('pass-status-eye');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png';
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png';
    }
}
/**
 * Displays the side and head components by updating the inner HTML of the 'SideAndHead' element.
 */
function showSideAndHead() {
    const SNH = document.getElementById('SideAndHead');
    SNH.innerHTML = Join.SideAndHead();
}
/**
 * Opens the side and head menu after a delay.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function openSideAndHeadMenu(event) {
    event.stopPropagation();
    setTimeout(() => {
        openHeadMenu();
    }, 100);
}
/**
 * Closes the side and head menu if the click event is outside the logout window.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function closeSideAndHeadMenu(event) {
    let logoutWindow = document.getElementById("logoutWindow");
    if (logoutWindow != undefined && !logoutWindow.contains(event.target)) {
        closeHeadMenu(logoutWindow);
    }
}
/**
 * Event handler for mouse down on the window, closing side and head menus.
 * @param {MouseEvent} e - The mouse down event.
 * @returns {void}
 */
window.onmousedown = function(e) {
    closeSideAndHeadMenu(e);
    closeContactMenu(e)
}
/**
 * Logs out the current user by resetting the signed account and navigating to the start page.
 * @returns {void}
 */
function logout() {
    Join.signedAccount = "";
    startPage()
}
/**
 * Toggles the "Remember Me" checkbox status.
 * @returns {void}
 */
function checkboxActivate() {
    Join.rememberMe = !Join.rememberMe;
}
/**
 * Toggles the "Remember Me" checkbox status.
 */
function policyCheckbox() {
    policyCheck = !policyCheck;
}
/**
 * Deactivates the checkbox for remembering the user.
 */
function checkboxDeactivate() {
    Join.rememberMe = false;
}
/**
 * Saves changes to the specified task and updates the task array.
 * @param {number} x - The index of the task to be edited.
 */
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
/**
 * Closes the task card, hides the task card slide, and navigates back to the board page.
 */
function closeTaskCard() {
    let slideAddTask = document.getElementById('taskCard');
    slideAddTask.classList.add('hide-big-task');
    setTimeout(() => {
        document.getElementById('addTask').classList.add("d-none");
    }, 200);
    cleanUpAccountsCheck();
    setTimeout(() => {
        boardPage();
    }, 200);
}
/**
 * Cleans up temporary data and resets variables related to accounts and tasks.
 */
function cleanUpAll() {
    cleanUpAccountsCheck();
    subtaskTemp = [];
    prioTemp = "";
}
/**
 * Resets the 'checked' property for all accounts in the Join application.
 */
function cleanUpAccountsCheck() {
    for (let i = 0; i < Join.accounts.length; i++) {
        const User = Join.accounts[i];
        User.checked = false;
    }
}
/**
 * Toggles the completion status of a subtask associated with a task in the Join application.
 * @param {number} task - The index of the task.
 * @param {number} subtask - The index of the subtask.
 */
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
/**
 * Displays the contact selection interface in the Join application.
 */
function openSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.add('d-none');
    document.getElementById('closeContactsFromCard').classList.remove('d-none');
}
/**
 * Closes the contact selection interface in the Join application.
 */
function closeSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.remove('d-none');
    document.getElementById('closeContactsFromCard').classList.add('d-none');
}




