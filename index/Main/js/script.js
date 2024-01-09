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
        rememberMe(user);
        checkUserAccount(remember, pw);
    }
}
/**
 * Saves user information to localStorage if "rememberMe" flag is true.
 * @param {object} user - The user object to be remembered.
 */
function rememberMe(user) {
    if (Join.rememberMe) {
        let userAsJson = JSON.stringify(user);
        localStorage.setItem("remember", userAsJson);
    }
}
/**
 * Checks user account for login credentials and triggers login success or logs an error.
 * @param {boolean} remember - The remember flag.
 * @param {string} pw - The password input.
 */
function checkUserAccount(remember, pw) {
    for (let i = 0; i < Join.accounts.length; i++) {
        const userAccount = Join.accounts[i];
        if (isAcoountUser(userAccount)) {
            if (isPasswordUserPassword(pw, userAccount)) {
                loginSuccess(remember);
            } else {
                console.log("Entweder Passwort oder Email stimmen nicht überein")
            }
        }
    }
}
/**
 * Checks if the provided user account's email matches the user.
 * @param {object} userAccount - The user account object.
 * @param {string} user - The user email to compare.
 * @returns {boolean} - True if the email matches, false otherwise.
 */
function isAcoountUser(userAccount) {
    userAccount.email === user;
}
/**
 * Checks if the provided password matches the user account's password.
 * @param {string} pw - The password to compare.
 * @param {object} userAccount - The user account object.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
function isPasswordUserPassword(pw, userAccount) {
    pw === userAccount.password;
}
/**
 * Handles the successful login by updating the signed account, triggering the remember function,
 * navigating to the summary page, and checking the welcome response.
 * @param {function} remember - The function to handle remembering the user.
 */
function loginSuccess(remember) {
    Join.signedAccount = userAccount;
    remember();
    summeryPage();
    checkWelcomeRespon();
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
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
        let pw = passwordCheck();
        let policy = ppCheck();
        createNewAccount(pw, policy);
        try {
            saveAccounts()
        } catch (error) {
            console.log("Account kann nicht gespeichert werden: " + error)
        } finally {
            policyCheck = false;
        }
        return true;
    }
}
/**
 * Creates a new account using input values, then checks the password and policy before proceeding.
 * @param {string} pw - The password input.
 * @param {boolean} policy - The policy agreement flag.
 */
function createNewAccount(pw, policy) {
    let name = document.getElementById('signUpInputName').value;
    let Email = document.getElementById('signUpInputEmail').value;
    let password = document.getElementById('signUpInputPassword').value;
    let account = new Account(name, Email, password);
    isPasswordAndPolicyChecked(pw, policy, account);
}
/**
 * Checks if the password and policy are validated before adding the account to the accounts array.
 * @param {boolean} pw - The password validation flag.
 * @param {boolean} policy - The policy agreement flag.
 * @param {object} account - The account object to be added.
 */
function isPasswordAndPolicyChecked(pw, policy, account) {
    if (pw === true && policy === true) {
        Join.accounts.push(account);
        startPage2()
    } else if (pw != true) {
        console.log('Passwort nicht valide')
    } else {
        console.log('You musst accept the Privacy Policy!')
    }
}
/**
 * Performs password validation by checking length and equality of two password inputs.
 * @returns {boolean} - True if password is valid, false otherwise.
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
 * Checks if the privacy policy checkbox is checked.
 * @returns {boolean} - True if the checkbox is checked, false otherwise.
 */
function ppCheck() {
    // let checkbox = document.getElementById('ppCheck');
    if (policyCheck) {
        return true;
    } else {
        return false;

    }
}
/**
 * Hides the password status element and displays the eye icon.
 */
function visibility() {
    document.getElementById('pass-status').classList.add('d-none');
    document.getElementById('pass-status-eye').classList.remove('d-none');
}
/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
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
    console.log(passwordInput);
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
 * Opens the side and head menu, preventing event propagation and introducing a slight delay.
 * @param {object} event - The event object.
 */
function openSideAndHeadMenu(event) {
    event.stopPropagation();
    setTimeout(() => {
        openHeadMenu();
    }, 100);
}
/**
 * Closes the side and head menu if the click is outside the logout window.
 * @param {object} event - The event object.
 */
function closeSideAndHeadMenu(event) {
    let logoutWindow = document.getElementById("logoutWindow");
    if (logoutWindow != undefined && !logoutWindow.contains(event.target)) {
        closeHeadMenu(logoutWindow);
    }
}
/**
 * Handles mouse down event to close side and head menu and contact menu.
 * @param {object} e - The event object.
 */
window.onmousedown = function(e) {
        closeSideAndHeadMenu(e);
        closeContactMenu(e)
    }
    /**
     * Logs out the signed account and navigates to the start page.
     */
function logout() {
    Join.signedAccount = "";
    startPage()
}
/**
 * Activates the checkbox for remembering the user.
 */
function checkboxActivate() {
    Join.rememberMe = !Join.rememberMe;
}

/**
 * Activates the checkbox for checked the policy accepted.
 */
function policyCheckbox() {
    policyCheck = !policyCheck;
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
 * Closes the task card by hiding it with a sliding animation.
 * Cleans up account checks and navigates to the board page after a short delay.
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
 * Cleans up accounts check, subtask, and priority temporary variables.
 */
function cleanUpAll() {
    cleanUpAccountsCheck();
    subtaskTemp = [];
    prioTemp = "";
}
/**
 * Cleans up account checks by setting the 'checked' property to false for all accounts.
 */
function cleanUpAccountsCheck() {
    for (let i = 0; i < Join.accounts.length; i++) {
        const User = Join.accounts[i];
        User.checked = false;
    }
}
/**
 * Toggles the checkbox status for the specified subtask, updates the display, and saves tasks.
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
 * Opens the select contacts from card section by updating the element's display properties.
 */
function openSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.add('d-none');
    document.getElementById('closeContactsFromCard').classList.remove('d-none');
}
/**
 * Closes the select contacts from card section by updating the element's display properties.
 */
function closeSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.remove('d-none');
    document.getElementById('closeContactsFromCard').classList.add('d-none');
}