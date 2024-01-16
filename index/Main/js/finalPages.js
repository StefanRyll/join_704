let active = true;
/**
 * Sets styles for an element if 'active' flag is true.
 * @param {string} id - The ID of the HTML element.
 * @param {string} backgroundColor - The background color to set.
 * @param {string} textColor - The text color to set.
 */
function setActiveStyles(id, backgroundColor, textColor) {
    if (active) {
        let element = document.getElementById(id);
        if (element) {
            element.style.backgroundColor = backgroundColor;
            element.style.color = textColor;
        }
    }
}
/**
 * Initiates the page by loading accounts and tasks, starting animation, and attempting to retrieve stored JSON data.
 */
function startPage() {
    try {
        loadAccounts()
        loadTasks()
        
    } catch (e) {
        console.log("Fehler", e)
    } finally {
            let responseLocal = localStorage.getItem('signedAccount');
            console.log(responseLocal);
            if (responseLocal){
                Join.signedAccount = responseLocal;
                let myState = localStorage.getItem('state')
                switch (myState) {
                    case 'Summery':
                        console.log("Summery");
                        loadComponentsSummery()
                        break;
                    case 'LogIn':
                        console.log("LogIn");
                        break;
                    case 'Board':
                        console.log("Board");
                        break;
                    case 'AddTask':
                        console.log("AddTask");
                        break;
                    case 'Contacts':
                        console.log("Contacts");
                        break;
                    case 'Privacy Policy':
                        console.log("Privacy Policy");
                        break;
                    case 'LegalNotice':
                        console.log("LegalNotice");
                        break;
                    case 'Help':
                        console.log("Help");
                        break;
            }
        }
        startAnimation();
        try {
            retrievesAStoredJSON();
        } catch (e) { "Nothing to remember :" + e }
    }
}
/**
 * Initiates the animation for starting the login process.
 * @param {string} setState - The state to set for the animation.
 * @param {HTMLElement} body - The HTML body element.
 */
function startAnimation() {
    setState("LogIn")
    body.innerHTML = JoinLogin.startAnimationOverlay();
    body.innerHTML = JoinLogin.startAnimation();
    body.innerHTML += JoinLogin.logInContent();
}
/**
 * Retrieves and populates the login email field with stored JSON data.
 * @param {string} response - The stored JSON data.
 * @param {HTMLElement} loginEmail - The HTML element for the login email field.
 */
function retrievesAStoredJSON() {
    let response = localStorage.getItem("remember");
    let loginEmail = document.getElementById('loginEmail')
    let responseParsed = JSON.parse(response);
    loginEmail.value = responseParsed;
}
/**
 * Initiates the second version of the page by loading accounts, displaying the logo, and rendering login content.
 */
function startPage2() {
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
        body.innerHTML = JoinLogin.logoLogin();
        body.innerHTML += JoinLogin.logInContent();
    }
}
/**
 * Initiates the sign-up process by setting the state, displaying the logo, and rendering the sign-up window.
 * @param {string} setState - The state to set for the sign-up process.
 * @param {HTMLElement} body - The HTML body element.
 */
function signUp() {
    setState("SignUp");
    body.innerHTML = JoinLogin.logoLogin();
    body.innerHTML = JoinLogin.signUpWindow();
}
/**
 * Initiates the summary page by loading tasks and components for the summary.
 */
function summeryPage() {
    try { loadTasks() } catch (e) {
        console.log("Fehler", e)
    } finally {
        loadComponentsSummery();
    }
}
/**
 * Loads components for the summary page, sets the state, cleans up, and renders the summary content.
 * @param {string} setState - The state to set for the summary page.
 * @param {function} cleanUpAll - Function to clean up the page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 * @param {function} setActiveStyles - Function to set active styles for specified elements.
 */
function loadComponentsSummery() {
    setState("Summary");
    cleanUpAll()
    body.innerHTML = "";
    body.innerHTML = JoinLogin.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinSummary.summeryContent();
    setActiveStyles('summeryActive', 'rgba(9, 25, 49, 1)');
    setActiveStyles('responActiveSummery', 'rgba(9, 25, 49, 1)');
}
/**
 * Initiates the board page by loading tasks and components for the board.
 */
function boardPage() {
    try { loadTasks() } catch (e) {
        console.log("Fehler", e)
    } finally {
        loadComponentsBoard();
    }
}
/**
 * Loads components for the board page, sets the state, cleans up, and renders the board content.
 * @param {string} setState - The state to set for the board page.
 * @param {function} cleanUpAll - Function to clean up the page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 * @param {function} setActiveStyles - Function to set active styles for specified elements.
 * @param {function} checkDragArea - Function to check the drag area.
 */
function loadComponentsBoard() {
    setState("Board");
    cleanUpAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    content.innerHTML = JoinBoard.boardContent();
    showSideAndHead();
    JoinBoard.renderTask();
    setActiveStyles('boardActive', 'rgba(9, 25, 49, 1)');
    setActiveStyles('responActiveBoard', 'rgba(9, 25, 49, 1)');
    checkDragArea();
}
/**
 * Initiates the contacts page by loading accounts and components for contacts.
 */
function contactsPage() {
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
        loadComponentsContacts();
    }
}
/**
 * Loads components for the contacts page, sets the state, cleans up, and renders the contacts content.
 * @param {string} setState - The state to set for the contacts page.
 * @param {function} cleanUpAll - Function to clean up the page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 * @param {function} setActiveStyles - Function to set active styles for specified elements.
 * @param {function} renderContacts - Function to render the contacts.
 */
function loadComponentsContacts() {
    setState("Contacts");
    cleanUpAll();
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    showSideAndHead();
    content.innerHTML = JoinContacts.contactsContent();
    renderContacts();
    setActiveStyles('contactsActive', 'rgba(9, 25, 49, 1)');
    setActiveStyles('responActiveContats', 'rgba(9, 25, 49, 1)');
}
/**
 * Initiates the help page by setting the state, cleaning up, and rendering the help content.
 * @param {string} setState - The state to set for the help page.
 * @param {function} cleanUpAll - Function to clean up the page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 */
function helpPage() {
    setState("Help");
    cleanUpAll();
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.helpContent();
}
/**
 * Initiates the privacy policy page by setting the state, rendering the privacy content, and setting active styles.
 * @param {string} setState - The state to set for the privacy policy page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 * @param {function} setActiveStyles - Function to set active styles for specified elements.
 */
function privacyPage() {
    setState("Privacy Policy")
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.privacyContent();
    setActiveStyles('privacy', 'rgba(9, 25, 49, 1)', '#A8A8A81');
}
/**
 * Initiates the legal notice page by setting the state, rendering the legal notice content, and setting active styles.
 * @param {string} setState - The state to set for the legal notice page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 * @param {function} setActiveStyles - Function to set active styles for specified elements.
 */
function legalPage() {
    setState("LegalNotice")
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.legalNoticeContent();
    setActiveStyles('legal', 'rgba(9, 25, 49, 1)', '#A8A8A81');
}
/**
 * Initiates the add task page by setting the state, cleaning up, and rendering the add task window.
 * @param {string} setState - The state to set for the add task page.
 * @param {function} cleanUpAll - Function to clean up the page.
 * @param {HTMLElement} body - The HTML body element.
 * @param {function} showSideAndHead - Function to display side and head components.
 * @param {function} setActiveStyles - Function to set active styles for specified elements.
 * @param {function} changeCSSProperty - Function to change CSS properties.
 */
function addTaskPage() {
    setState("AddTask");
    cleanUpAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    content.innerHTML = JoinBoard.generateHTMLaddTaskWindowForm(4);
    showSideAndHead()
    setActiveStyles('addTaskActive', 'rgba(9, 25, 49, 1)');
    setActiveStyles('responActiveAddTask', 'rgba(9, 25, 49, 1)');
}