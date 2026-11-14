/**
 * Performs a guest login by creating a new Account object with default guest information,
 * setting it as the signed account in the Join object, navigating to the summary page,
 * and checking for a welcome response.
 * @function
 * @name guestLogin
 * @returns {void}
 */
async function guestLogin() {
  await firebaseSignInAnonymously(firebaseAuth);

  const guest = new Account("Guest", "email@join.de", "");
  Join.signedAccount = guest;
  saveSignedUser();
  summeryPage();
  checkWelcomeRespon();
}

/**
 * Authenticates a user with Firebase Authentication.
 * Saves the signed-in user and navigates to the summary page.
 * Displays an error if authentication fails.
 * @async
 * @returns {Promise<void>}
 */
async function logInUser() {
  const userEmail = getEmailInputValue();
  const userPassword = getPasswordInputValue();

  try {
    const userCredential = await window.firebaseSignInWithEmailAndPassword(
      window.firebaseAuth,
      userEmail,
      userPassword,
    );

    const firebaseUser = userCredential.user;

    Join.signedAccount = new Account(
      firebaseUser.displayName || firebaseUser.email,
      firebaseUser.email,
      "",
      "",
    );

    rememberUserIfRequested(userEmail);
    saveSignedUser();

    await summeryPage();
    checkWelcomeRespon();
  } catch (error) {
    console.error("Firebase login failed:", error);
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
  return document.getElementById("loginEmail").value.toLowerCase();
}
/**
 * Retrieves the value of an HTML input field with the ID 'loginPassword'.
 * This function is typically used to obtain the password input from a user.
 *
 * @returns {string} The value of the input field with the ID 'loginPassword'.
 */
function getPasswordInputValue() {
  return document.getElementById("loginPassword").value;
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
  } else {
    localStorage.removeItem("remember");
  }
}

/**
 * Highlights the email field when the address is already registered.
 */
function handleExistingEmail() {
  const frame = document.getElementById("emailCheckArea");
  const label = document.querySelector(".falseEmail");

  frame.classList.add("redFrame");
  label.classList.add("falseEmailRed");
}
/**
 * Handles the UI changes for a failed login attempt.
 * Adds specific CSS classes to elements to indicate an error in password input.
 * The 'loginPasswordFrame' gets a 'redFrame' class, and the 'falsePassword' label gets a 'falsePasswordRed' class.
 */
function handleFailedLogin() {
  const loginPasswordFrame = document.getElementById("loginPasswordFrame");
  const label = document.querySelector(".falsePassword");
  loginPasswordFrame.classList.add("redFrame");
  label.classList.add("falsePasswordRed");
}

/**
 * Highlights the privacy policy checkbox when consent is missing.
 */
function handleMissingPolicy() {
  const policy = document.getElementById("ppCheck");
  const label = document.querySelector(".falsePolicy");

  policy.classList.add("redPolicy");
  label.classList.add("falsePolicyRed");
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
  let welcomeOverlay = document.getElementById("welcomeOverlay");
  welcomeOverlay.classList.remove("d-none");
  setTimeout(() => {
    welcomeOverlay.classList.add("d-none");
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
  if (!isPrivacyPolicyAccepted()) {
    handleMissingPolicy();
    return;
  }
  if (!isPasswordValid()) {
    handleInvalidPassword();
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
  const email = document.getElementById("signUpInputEmail").value;
  const existingAccounts = Join.accounts.filter(
    (account) => account.email === email,
  );
  return existingAccounts.length !== 0;
}
/**
 * Handles UI updates for an invalid password scenario.
 * It applies visual feedback by adding CSS classes to indicate an error.
 * The 'passwordCheckArea' gets a 'redFrame' class, and the 'falsePassword' label gets a 'falsePasswordRed' class.
 */
function handleInvalidPassword() {
  const loginPasswordFrame = document.getElementById("passwordCheckArea");
  const label = document.querySelector(".falsePassword");
  loginPasswordFrame.classList.add("redFrame");
  label.classList.add("falsePasswordRed");
}

/**
 * Registers a new user with Firebase Authentication.
 * Creates a corresponding contact in Firestore.
 * Signs out the newly registered user and displays a success message.
 * @async
 * @returns {Promise<void>}
 */
async function registerNewAccount() {
  const name = document.getElementById("signUpInputName").value;
  const email = document.getElementById("signUpInputEmail").value;
  const password = document.getElementById("signUpInputPassword").value;

  try {
    const userCredential = await window.firebaseCreateUserWithEmailAndPassword(
      window.firebaseAuth,
      email,
      password,
    );

    await window.firebaseUpdateProfile(userCredential.user, {
      displayName: name,
    });

    await loadAccounts();
    const newContact = new Contact(name, email, "");

    Join.accounts.push(newContact);
    Join.accounts.sort((a, b) => a.name.localeCompare(b.name));

    await saveAccounts();
    await window.firebaseSignOut(window.firebaseAuth);

    policyCheck = false;
    successCreateAccount();

    setTimeout(() => {
      startPage2();
    }, 2200);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      handleExistingEmail();
      return;
    }
    console.error("Registration failed:", error);
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
  let pw1 = document.getElementById("signUpInputPassword").value;
  let pw2 = document.getElementById("signUpInputPasswordConfirm").value;
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
  let policy = policyCheck;
  return policy;
}
/**
 * Hides password status and displays password visibility icon on page load.
 * @function
 * @returns {void}
 */
function visibility() {
  document.getElementById("pass-status").classList.add("d-none");
  document.getElementById("pass-status-eye").classList.remove("d-none");
}

/**
 * Updates the password confirmation field's visibility icons.
 */
function visibilityConfirm() {
  document.getElementById("pass-status-confirm").classList.add("d-none");
  document.getElementById("pass-status-eye-confirm").classList.remove("d-none");
}
/**
 * Toggles the visibility of the password input.
 * @function
 * @returns {void}
 */
function viewPassword() {
  let passwordInput = document.getElementById("loginPassword");
  let passStatus = document.getElementById("pass-status-eye");

  if (passwordInput.type == "password") {
    passwordInput.type = "text";
    passStatus.src = "./IMG/visibility_on.png";
  } else {
    passwordInput.type = "password";
    passStatus.src = "./IMG/visibility_off.png";
  }
}

/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
 */
function viewPasswordSignUp() {
  let passwordInput = document.getElementById("signUpInputPassword");
  let passStatus = document.getElementById("pass-status-eye");
  if (passwordInput.type == "password") {
    passwordInput.type = "text";
    passStatus.src = "./IMG/visibility_on.png";
  } else {
    passwordInput.type = "password";
    passStatus.src = "./IMG/visibility_off.png";
  }
}
/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
 */
function viewPasswordSignUpConfirm() {
  let passwordInput = document.getElementById("signUpInputPasswordConfirm");
  let passStatus = document.getElementById("pass-status-eye-confirm");

  if (passwordInput.type == "password") {
    passwordInput.type = "text";
    passStatus.src = "./IMG/visibility_on.png";
  } else {
    passwordInput.type = "password";
    passStatus.src = "./IMG/visibility_off.png";
  }
}
