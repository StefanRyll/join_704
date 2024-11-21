// Global state
let active = true;

/**
 * Sets styles for an element if the 'active' flag is true.
 * @param {string} id - The ID of the HTML element.
 * @param {string} backgroundColor - The background color to set.
 * @param {string} [textColor] - The text color to set (optional).
 */
function setActiveStyles(id, backgroundColor, textColor = null) {
  if (active) {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundColor = backgroundColor;
      if (textColor) {
        element.style.color = textColor;
      }
    }
  }
}

/**
 * Initializes the page, loads data, and redirects the user based on their state.
 */
async function startPage() {
  try {
    await loadAccounts();
    await loadTasks();
  } catch (error) {
    console.error("Error loading accounts or tasks:", error);
  }

  Join.signedAccount = loadSignedUser();
  const currentState = localStorage.getItem("state");
  setState("LogIn");
  redirectUser(currentState);

  try {
    retrieveStoredJSON();
  } catch (error) {
    console.warn("No stored data to retrieve:", error);
  }
}

/**
 * Redirects the user based on their login status and the saved state.
 * @param {string} currentState - The saved state.
 */
function redirectUser(currentState) {
  if (Join.signedAccount) {
    redirectSignedUser(currentState);
  } else {
    redirectUnsignedUser(currentState);
  }
}

/**
 * Handles redirection for unsigned users.
 * @param {string} currentState - The saved state.
 */
function redirectUnsignedUser(currentState) {
  if (currentState === "SignUp") {
    signUp();
  } else {
    startAnimation();
  }
}

/**
 * Handles redirection for signed users.
 * @param {string} currentState - The saved state.
 */
function redirectSignedUser(currentState) {
  const pageActions = {
    Summary: summeryPage,
    Board: boardPage,
    AddTask: addTaskPage,
    Contacts: contactsPage,
    "Privacy Policy": privacyPage,
    LegalNotice: legalPage,
    Help: helpPage,
  };
  const action = pageActions[currentState];
  if (action) action();
}

/**
 * Starts the login animation and renders login content.
 */
function startAnimation() {
  setState("LogIn");
  body.innerHTML =
    JoinLogin.startAnimationOverlay() +
    JoinLogin.startAnimation() +
    JoinLogin.logInContent();
}

/**
 * Retrieves and populates the login email field with stored JSON data.
 */
function retrieveStoredJSON() {
  const response = localStorage.getItem("remember");
  const loginEmail = document.getElementById("loginEmail");
  loginEmail.value = JSON.parse(response);
}

/**
 * Starts the initial login page.
 */
function startPage2() {
  try {
    loadAccounts();
  } catch (error) {
    console.error("Error loading accounts:", error);
  } finally {
    body.innerHTML = JoinLogin.logoLogin() + JoinLogin.logInContent();
  }
}

/**
 * Starts the sign-up process.
 */
function signUp() {
  setState("SignUp");
  policyCheck = false;
  body.innerHTML = JoinLogin.logoLogin() + JoinLogin.signUpWindow();
}

/**
 * Renders the summary page.
 */
function summeryPage() {
  try {
    loadTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
  } finally {
    loadComponentsSummary();
  }
}

/**
 * Loads and displays the components for the summary page.
 */
function loadComponentsSummary() {
  setState("Summary");
  cleanUpAll();
  body.innerHTML = JoinLogin.pageLayoutMain();
  document.getElementById("content").innerHTML = JoinSummary.summeryContent();
  showSideAndHead();
  setActiveStyles("summeryActive", "rgba(9, 25, 49, 1)");
  setActiveStyles("responActiveSummery", "rgba(9, 25, 49, 1)");
}

/**
 * Renders the board page.
 */
async function boardPage() {
  try {
    await loadTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
  } finally {
    loadComponentsBoard();
  }
}

/**
 * Loads and displays the components for the board page.
 */
function loadComponentsBoard() {
  setState("Board");
  cleanUpAll();
  body.innerHTML = Join.pageLayoutMain();
  document.getElementById("content").innerHTML = JoinBoard.boardContent();
  showSideAndHead();
  JoinBoard.renderTask();
  setActiveStyles("boardActive", "rgba(9, 25, 49, 1)");
  setActiveStyles("responActiveBoard", "rgba(9, 25, 49, 1)");
  checkDragArea();
}

/**
 * Renders the contacts page.
 */
function contactsPage() {
  try {
    loadAccounts();
  } catch (error) {
    console.error("Error loading accounts:", error);
  } finally {
    loadComponentsContacts();
  }
}

/**
 * Loads and displays the components for the contacts page.
 */
function loadComponentsContacts() {
  setState("Contacts");
  cleanUpAll();
  body.innerHTML = Join.pageLayoutMain();
  document.getElementById("content").innerHTML = JoinContacts.contactsContent();
  renderContacts();
  showSideAndHead();
  setActiveStyles("contactsActive", "rgba(9, 25, 49, 1)");
  setActiveStyles("responActiveContacts", "rgba(9, 25, 49, 1)");
}

/**
 * Renders the help page.
 */
function helpPage() {
  setState("Help");
  cleanUpAll();
  body.innerHTML = Join.pageLayoutMain();
  document.getElementById("content").innerHTML = JoinAbout.helpContent();
  showSideAndHead();
}

/**
 * Renders the privacy policy page.
 */
function privacyPage() {
  setState("Privacy Policy");
  body.innerHTML = Join.pageLayoutMain();
  document.getElementById("content").innerHTML = JoinAbout.privacyContent();
  showSideAndHead();
  setActiveStyles("privacy", "rgba(9, 25, 49, 1)", "#A8A8A8");
}

/**
 * Renders the legal notice page.
 */
function legalPage() {
  setState("LegalNotice");
  body.innerHTML = Join.pageLayoutMain();
  document.getElementById("content").innerHTML = JoinAbout.legalNoticeContent();
  showSideAndHead();
  setActiveStyles("legal", "rgba(9, 25, 49, 1)", "#A8A8A8");
}

/**
 * Renders the add task page.
 */
function addTaskPage() {
  setState("AddTask");
  cleanUpAll();
  body.innerHTML = Join.pageLayoutMain();
  document.getElementById("content").innerHTML =
    JoinBoard.generateHTMLaddTaskWindowForm(4);
  showSideAndHead();
  setActiveStyles("addTaskActive", "rgba(9, 25, 49, 1)");
  setActiveStyles("responActiveAddTask", "rgba(9, 25, 49, 1)");
}
