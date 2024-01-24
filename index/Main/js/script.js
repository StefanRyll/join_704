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
    saveSignedUser()
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
    const userEmail = getEmailInputValue();
    const userPassword = getPasswordInputValue();

    if (isValidAccount(userEmail, userPassword)) {
        processSuccessfulLogin(userEmail);
    } else {
        handleFailedLogin();
    }
}
/**
 * Retrieves the value of an HTML input field with the ID 'loginEmail', converts it to lowercase, and returns this value.
 * This function is typically used to normalize email input, making it case-insensitive.
 *
 * @returns {string} The lowercase value of the input field with the ID 'loginEmail'.
 */
function getEmailInputValue() {
    return document.getElementById('loginEmail').value.toLowerCase();
}
/**
 * Retrieves the value of an HTML input field with the ID 'loginPassword'.
 * This function is typically used to obtain the password input from a user.
 *
 * @returns {string} The value of the input field with the ID 'loginPassword'.
 */
function getPasswordInputValue() {
    return document.getElementById('loginPassword').value;
}
/**
 * Checks if the given email and password correspond to a valid account.
 * This function searches for an account in the 'Join.accounts' array that matches the provided email (case-insensitive comparison). 
 * If such an account is found, it checks if the provided password matches the account's password.
 *
 * @param {string} email - The email address to be checked. The comparison is case-insensitive.
 * @param {string} password - The password to be verified against the found account.
 * @returns {boolean} True if a matching account is found and the password is correct, otherwise false.
 */
function isValidAccount(email, password) {
    const account = Join.accounts.find(account => account.email.toLowerCase() === email);
    return account && password === account.password;
}
/**
 * Processes actions following a successful login.
 * This function finds and assigns the user's account details to 'Join.signedAccount'. It also performs additional steps 
 * such as remembering the user (if requested), saving the signed-in user's details, navigating to the summary page, 
 * and checking for a welcome response.
 *
 * @param {string} userEmail - The email address of the user who has successfully logged in.
 * The email is used to find the user's account in the 'Join.accounts' array.
 */
function processSuccessfulLogin(userEmail) {
    const account = Join.accounts.find(account => account.email.toLowerCase() === userEmail);
    Join.signedAccount = account;
    rememberUserIfRequested(userEmail);
    saveSignedUser();
    summeryPage();
    checkWelcomeRespon();
}
/**
 * Remembers the user's email in local storage if the 'remember me' option is enabled.
 * Stores the email as a JSON string under the key "remember".
 *
 * @param {string} userEmail - The email of the user to be remembered.
 */
function rememberUserIfRequested(userEmail) {
    if (Join.rememberMe) {
        const userJson = JSON.stringify(userEmail);
        localStorage.setItem("remember", userJson);
    }
}
/**
 * Handles the UI changes for a failed login attempt.
 * Adds specific CSS classes to elements to indicate an error in password input.
 * The 'loginPasswordFrame' gets a 'redFrame' class, and the 'falsePassword' label gets a 'falsePasswordRed' class.
 */
function handleFailedLogin() {
    const loginPasswordFrame = document.getElementById('loginPasswordFrame');
    const label = document.querySelector(".falsePassword");
    loginPasswordFrame.classList.add('redFrame');
    label.classList.add('falsePasswordRed');
}

// async function logInUser() {
//     const user = document.getElementById('loginEmail').value.toLowerCase();
//     const pw = document.getElementById('loginPassword').value;
//     let remember = () => {
//         if (Join.rememberMe) {
//             let userAsJson = JSON.stringify(user);
//             localStorage.setItem("remember", userAsJson);
//         }
//     }
//     let wentWrong = () => {
//         let loginPasswordFrame = document.getElementById('loginPasswordFrame')
//         let label = document.querySelector(".falsePassword")
//         loginPasswordFrame.classList.add('redFrame');
//         label.classList.add('falsePasswordRed')
//     }
//     let myAccount = Join.accounts.filter(userAccount => userAccount.email.toLowerCase() === user)
//     if (myAccount.length != 0) {
//         myAccount = myAccount[0]
//         if (pw === myAccount.password) {
//             Join.signedAccount = myAccount;
//             remember();
//             saveSignedUser()
//             summeryPage();
//             checkWelcomeRespon();

//         } else {
//             wentWrong();
//         }
//     } else {
//         wentWrong();
//     }
// }

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
    try {
        await loadAccounts();
    } catch (e) {
        console.error("Fehler beim Laden der Konten", e);
        return;
    }

    if (!isPasswordValid()) {
        handleInvalidPassword();
        console.log('Passwort nicht valide');
        return;
    }

    if (!isPrivacyPolicyAccepted()) {
        console.log('You must accept the Privacy Policy!');
        return;
    }

    if (isEmailExisting()) {
        console.log('Email already existing');
        return;
    }

    await registerNewAccount();
}
/**
 * Checks if the password is valid by calling the 'passwordCheck' function.
 * This function serves as a wrapper for 'passwordCheck'.
 *
 * @returns {boolean} The result from 'passwordCheck', indicating if the password is valid or not.
 */
function isPasswordValid() {
    return passwordCheck();
}
/**
 * Checks if the privacy policy has been accepted.
 * This function serves as a wrapper for 'ppCheck'.
 *
 * @returns {boolean} The result from 'ppCheck', indicating if the privacy policy is accepted or not.
 */
function isPrivacyPolicyAccepted() {
    return ppCheck();
}
/**
 * Checks if the provided email already exists in the 'Join.accounts' array.
 * Retrieves the email from the input element with ID 'signUpInputEmail' and searches for matching emails in the accounts.
 *
 * @returns {boolean} True if the email already exists in the accounts, false otherwise.
 */
function isEmailExisting() {
    const email = document.getElementById('signUpInputEmail').value;
    const existingAccounts = Join.accounts.filter(account => account.email === email);
    return existingAccounts.length !== 0;
}
/**
 * Handles UI updates for an invalid password scenario.
 * It applies visual feedback by adding CSS classes to indicate an error.
 * The 'passwordCheckArea' gets a 'redFrame' class, and the 'falsePassword' label gets a 'falsePasswordRed' class.
 */
function handleInvalidPassword() {
    const loginPasswordFrame = document.getElementById('passwordCheckArea');
    const label = document.querySelector(".falsePassword");
    loginPasswordFrame.classList.add('redFrame');
    label.classList.add('falsePasswordRed');
}
/**
 * Registers a new account asynchronously.
 * Retrieves user input for name, email, and password, creates a new account, and adds it to 'Join.accounts'.
 * Initiates a timeout before navigating to another page and then saves the accounts.
 * Finally, it calls 'successCreateAccount' to handle post-registration success actions.
 */
async function registerNewAccount() {
    const name = document.getElementById('signUpInputName').value;
    const email = document.getElementById('signUpInputEmail').value;
    const password = document.getElementById('signUpInputPassword').value;
    const account = new Account(name, email, "", password);
    Join.accounts.push(account);
    policyCheck = false;
    setTimeout(() => {
        startPage2();
    }, 2200);
    await saveAccounts();
    successCreateAccount();
}

// async function createAccount() {
//     let wentWrong = () => {
//         let loginPasswordFrame = document.getElementById('passwordCheckArea')
//         let label = document.querySelector(".falsePassword")
//         loginPasswordFrame.classList.add('redFrame');
//         label.classList.add('falsePasswordRed')
//     }

//     try { await loadAccounts() } catch (e) { console.error("Fehler", e) }

//     let pw = passwordCheck();
//     let policy = ppCheck();
//     let name = document.getElementById('signUpInputName').value;
//     let Email = document.getElementById('signUpInputEmail').value;
//     let emailCheck = () => {
//         let existingAccounts = Join.accounts.filter(account => account.email === Email)
//         let exist = (existingAccounts.length !== 0) ? true : false;
//         return exist;
//     }
//     let password = document.getElementById('signUpInputPassword').value;
//     console.log('pw is', pw, " and Policy is ", policy);
//     if (pw != true) {
//         wentWrong()
//         console.log('Passwort nicht valide')
//     } else if (policy != true) {
//         console.log('You must accept the Privacy Policy!')
//     } else if (emailCheck() === true) {
//         console.log('Email already existing')

//     } else if (pw === true && policy === true) {
//         let account = new Account(name, Email, "", password);
//         Join.accounts.push(account);
//         policyCheck = false;
//         setTimeout(() => {
//             startPage2();
//         }, 2200);
//         await saveAccounts();
//         successCreateAccount();
//     }
// }
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
    let logOutWindow = document.getElementById('logoutWindow');
    event.stopPropagation();
    setTimeout(() => {
        logOutWindow.classList.remove("d-none");
        setTimeout(() => {
            openHeadMenu(logOutWindow);
        }, 200);
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
 * Closes the selectContacts from add Task or taskcard, if the click event is outside the logout window.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function closeAssigned(event) {
    let closeContacts = document.getElementById('closeContacts');
    let selectContacts = document.getElementById('selectContacts');
    if (closeContacts != undefined && !closeContacts.contains(event.target)) {
        closeContacts.classList.add('d-none');
        selectContacts.classList.remove('d-none');
    }
}
/**
 * Closes the Select of Category from add Task or taskcard, if the click event is outside the logout window.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function closeCategory(event) {
    let showSelectCategory = document.getElementById('showSelectCategory');
    let hiddenSelectCategory = document.getElementById('hiddenSelectCategory');
    if (showSelectCategory != undefined && !showSelectCategory.contains(event.target)) {
        showSelectCategory.classList.add('d-none');
        hiddenSelectCategory.classList.remove('d-none');
    }
}
/**
 * Event handler for mouse down on the window, closing side and head menus.
 * @param {MouseEvent} e - The mouse down event.
 * @returns {void}
 */
window.onmousedown = function(e) {
        closeSideAndHeadMenu(e);
        closeContactMenu(e);
        closeAssigned(e);
        closeCategory(e);
    }
    /**
     * Logs out the current user by resetting the signed account and navigating to the start page.
     * @returns {void}
     */
function logout() {
    Join.signedAccount = "";
    deleteSignedUser()
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
 * Saves changes made to an existing task.
 * Updates the task at the given index in 'Join.tasks' with new values for title, users, description, date, priority, and subtasks.
 * It also retains certain properties of the existing task like category and status (todo, progress, feedback, done).
 * After updating, it saves the tasks, closes the task card, and performs cleanup operations.
 *
 * @param {number} taskIndex - Index of the task in the 'Join.tasks' array to be updated.
 */
function taskSaveChanges(taskIndex) {
    const existingTask = Join.tasks[taskIndex];

    const checkedUsers = getCheckedUsers();
    const editedTitle = document.getElementById('taskCardETitle').value;
    const editedDescription = document.getElementById('taskCardEDesc').value;
    const editedDate = getEditedDate(existingTask.date);
    const editedPriority = prioTemp;
    const taskCategory = existingTask.Category;

    Join.tasks[taskIndex] = new Task(
        editedTitle,
        checkedUsers,
        editedDescription,
        editedDate,
        editedPriority,
        taskCategory,
        subtaskTemp,
        existingTask.todo,
        existingTask.progress,
        existingTask.feedback,
        existingTask.done
    );

    saveTasks();
    closeTaskCard();
    cleanUpAll();
}
/**
 * Retrieves all users from 'Join.accounts' who have the 'checked' property set to true.
 * This function is typically used to get a list of users that have been selected in a UI context.
 *
 * @returns {Array} An array of user objects from 'Join.accounts' where the 'checked' property is true.
 */
function getCheckedUsers() {
    return Join.accounts.filter(user => user.checked);
}
/**
 * Gets the edited date from a date input field or uses a default date if the input field is empty.
 * Retrieves the value from an input element with ID 'taskCardEDate' and checks if it's not empty.
 * If it's empty, returns the provided default date.
 *
 * @param {string} defaultDate - The default date to return if no date is entered in the input field.
 * @returns {string} The edited date from the input field or the default date.
 */
function getEditedDate(defaultDate) {
    const dateInput = document.getElementById('taskCardEDate').value;
    return dateInput !== '' ? dateInput : defaultDate;
}

// function taskSaveChanges(x) {
//     let eTask = Join.tasks[x];
//     let eTaskWorker = () => {
//         let checkedUsers = [];
//         for (let i = 0; i < Join.accounts.length; i++) {
//             const User = Join.accounts[i];
//             if (User.checked) {
//                 checkedUsers.push(User)
//             }
//         }
//         return checkedUsers;
//     };

//     let eTaskTodo = eTask.todo; //Wird behalten
//     let eTaskProgress = eTask.progress; //Wird behalten
//     let eTaskFeedback = eTask.feedback; //Wird behalten
//     let eTaskDone = eTask.done; //Wird behalten
//     // Edited Task
//     let titleInput = document.getElementById('taskCardETitle').value;
//     let descInput = document.getElementById('taskCardEDesc').value;
//     let dateInput = () => {
//         let inputfeld = document.getElementById('taskCardEDate').value;
//         if (inputfeld !== '') {
//             return inputfeld;
//         } else {
//             return eTask.date;
//         }
//     }
//     let prioInput = prioTemp;
//     let Category = eTask.Category;
//     // // Merched Task
//     Join.tasks[x] = new Task(titleInput, eTaskWorker(), descInput, dateInput(), prioInput, Category, subtaskTemp, eTaskTodo, eTaskProgress, eTaskFeedback, eTaskDone)
//     saveTasks();
//     closeTaskCard();
//     cleanUpAll();
// }
/**
 * Closes the task card, hides the task card slide, and navigates back to the board page.
 */
function closeTaskCard() {
    let slideAddTask = document.getElementById('taskCard');
    slideAddTask.classList.add('hide-big-task');
    setTimeout(() => {
        document.getElementById('addTask').classList.add("d-none");
    }, 200);
    cleanUpAll()
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
        Join.accounts[i].checked = false;
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
/**
 * Navigates the browser back to the last visited page in the session history.
 * Uses the 'window.history.back()' method to achieve this.
 */
function backToPage() {
    window.history.back();
}

/**
 * Navigiert den Browser eine Seite zurück und gibt eine Nachricht in der Konsole aus.
 */
// function backToPage() {
//     window.history.back();
// }