const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split(""); // durch das split wird das Alphabet in ein Array von Buchstaben aufgeteilt.

/**
 * Renders contacts grouped alphabetically.
 * @param {number} [obt] - Index of the contact to display after rendering.
 */
async function renderContacts(obt) {
  try {
    await loadAccounts();
  } catch (error) {
    console.error("Error loading contacts:", error);
    return;
  }
  contactsList = "";
  let currentInitials = "";
  for (let i = 0; i < Join.accounts.length; i++) {
    const contact = Join.accounts[i];
    const userInitials = contact.shortname;
    if (userInitials[0] !== currentInitials) {
      if (alphabet.includes(userInitials[0])) {
        contactsList = handleAlphabetChange(contactsList, userInitials[0]);
        currentInitials = userInitials[0];
      }
    }
    contactsList += contact.generateHtmlContactList(i);
  }
  contactsList = closeAlphabetSection(contactsList);
  document.getElementById("contactsList").innerHTML = contactsList;
  if (obt || obt === 0) {
    showDetails(obt);
  }
}

/**
 * Handles the change in the alphabet section.
 * @param {string} contactsList - The current contacts list HTML.
 * @param {string} initial - The new alphabet section initial.
 * @returns {string} Updated contacts list HTML.
 */
function handleAlphabetChange(contactsList, initial) {
  if (contactsList !== "") {
    contactsList += "</div>";
  }
  contactsList += `<div class="alphabet-section" id="alphabet-${initial}">${initial}</div>`;
  contactsList += '<div class="contacts-container">';
  return contactsList;
}
/**
 * Closes the current alphabet section.
 * @param {string} contactsList - The current contacts list HTML.
 */
function closeAlphabetSection(contactsList) {
  if (contactsList !== "") {
    contactsList += "</div>";
  }
  return contactsList;
}

/**
 * Displays the details of a selected contact.
 * @param {number} i - Index of the selected contact.
 */
function showDetails(i) {
  neutralizeContactColor();
  highlightContactColor(i);

  setTimeout(() => {
    openContactDetails();
  }, 200);
  manipulateResponsive(i);
}

/**
 * Displays contact details based on the current screen width.
 * @param {number} i - Index of the selected contact.
 */
function manipulateResponsive(i) {
  const contact = Join.accounts[i];

  if (window.innerWidth >= 1188) {
    const detailsContent = contact.generateHtmlContactDetails(i);
    document.getElementById("detailsContainer").innerHTML = detailsContent;
  } else {
    setTimeout(() => {
      openResOverlay();
    }, 100);
    const detailsContent = contact.generateMobileContactDetails(i);
    document.getElementById("responOverlay").innerHTML = detailsContent;
  }
}

/**
 * Resets the background and text colors of all contact entries.
 */
function neutralizeContactColor() {
  for (let j = 0; j < Join.accounts.length; j++) {
    const contactField = document.getElementById(`contactField${j}`);
    const contactName = document.getElementById(`contactName${j}`);
    contactField.style.background = "white";
    contactName.style.color = "black";
  }
}

/**
 * Highlights the selected contact in the contact list.
 * @param {number} i - Index of the selected contact.
 */
function highlightContactColor(i) {
  const contactField = document.getElementById(`contactField${i}`);
  const contactName = document.getElementById(`contactName${i}`);
  contactField.style.background = "#2A3647";
  contactName.style.color = "white";
}

/**
 * Renders and opens the form for adding a new contact.
 */
function openAddContact() {
  const addContactForm = document.getElementById("overlay");
  addContactForm.innerHTML = "";
  setTimeout(() => {
    openBigOverlay();
  }, 100);
  addContactForm.innerHTML = JoinContacts.generateHtmlAddContact();
}

/**
 * Renders and opens the edit form for a selected contact.
 * @param {number} i - Index of the contact to edit.
 */
function openEditContact(i) {
  const contact = Join.accounts[i];
  setTimeout(() => {
    openBigOverlay();
  }, 100);
  let editContactsContent = contact.generateHtmlEditContact(i);
  document.getElementById("overlay").innerHTML = editContactsContent;
}

/**
 * Closes the desktop and responsive contact overlays after a short delay.
 */
function closeOverlay() {
  setTimeout(() => {
    closeBigOverlay();
    closeResOverlay();
  }, 100);
}

/**
 * Creates a new contact, saves it to Firestore,
 * and updates the contact list.
 * Reverts the local change if saving fails.
 */
async function addContact() {
  try {
    await loadAccounts();
  } catch (error) {
    console.error(error);
    return;
  }
  const name = document.getElementById("name").value;
  const email = document.getElementById("mail").value;
  const phone = document.getElementById("phone").value;
  const newUser = new Contact(name, email, phone);
  Join.accounts.push(newUser);
  Join.accounts.sort((a, b) => a.name.localeCompare(b.name));

  try {
    await saveAccounts();
  } catch (e) {
    console.error("Error saving contacts:", e);
    const index = Join.accounts.indexOf(newUser);
    if (index !== -1) {
      Join.accounts.splice(index, 1);
    }
    return;
  }
  closeOverlay();
  setTimeout(() => {
    successOverlay();
  }, 100);
  await renderContacts();
}

/**
 * Updates an existing contact and saves the changes to Firestore.
 * Restores the original contact data if saving fails.
 * @param {number} i - Index of the contact to edit.
 */
async function editContact(i) {
  try {
    await loadAccounts();
  } catch (error) {
    console.error(error);
    return;
  }
  const originalContact = { ...Join.accounts[i] };
  const contact = Join.accounts[i];
  contact.name = document.getElementById("editName").value;
  contact.email = document.getElementById("editMail").value;
  contact.tel = document.getElementById("editPhone").value;

  Join.accounts.sort((a, b) => a.name.localeCompare(b.name));
  neutralizeContactColor();

  try {
    await saveAccounts();
  } catch (e) {
    console.error("Error editing contacts:", e);

    contact.name = originalContact.name;
    contact.email = originalContact.email;
    contact.tel = originalContact.tel;

    Join.accounts.sort((a, b) => a.name.localeCompare(b.name));
    return;
  }

  closeOverlay();

  setTimeout(() => {
    editOverlay();
  }, 100);
  const currentIndex = Join.accounts.indexOf(contact);
  await renderContacts(currentIndex);
}

/**
 * Deletes a contact and saves the changes to Firestore.
 * Restores the deleted contact if saving fails.
 * @param {number} i - Index of the contact to delete.
 */
async function deleteContact(i) {
  const deletedContact = Join.accounts[i];

  Join.accounts.splice(i, 1);

  try {
    await saveAccounts();
  } catch (error) {
    console.error("Error deleting contact:", error);

    Join.accounts.push(deletedContact);
    Join.accounts.sort((a, b) => a.name.localeCompare(b.name));

    return;
  }

  deleteOverlay();
  closeContactDetails();
  closeOverlay();
  contactsPage();
}

/**
 * Displays a success message after adding a contact
 * and automatically closes it after two seconds.
 */
function successOverlay() {
  const overlaySuccess = document.getElementById("overlaySuccess");
  overlaySuccess.innerHTML = JoinContacts.generateHtmlSuccessInfo();
  openSuccessOverlay();
  setTimeout(() => {
    closeSuccessOverlay();
  }, 2000);
}

/**
 * Displays a confirmation message after deleting a contact
 * and automatically closes it after two seconds.
 */
function deleteOverlay() {
  const overlayDelete = document.getElementById("overlaySuccess");
  overlayDelete.innerHTML = JoinContacts.generateHtmlDeleteInfo();
  openSuccessOverlay();
  setTimeout(() => {
    closeSuccessOverlay();
  }, 2000);
}

/**
 * Displays a confirmation message after editing a contact
 * and automatically closes it after two seconds.
 */
function editOverlay() {
  const overlayEdit = document.getElementById("overlaySuccess");
  overlayEdit.innerHTML = JoinContacts.generateHtmlEditInfo();
  openSuccessOverlay();
  setTimeout(() => {
    closeSuccessOverlay();
  }, 2000);
}

/**
 * Removes invalid characters from a phone number input.
 * Allows digits, plus signs, and spaces.
 * @param {HTMLInputElement} phoneInput - The phone input element.
 */
function validatePhoneNumber(phoneInput) {
  phoneInput.value = phoneInput.value.replace(/[^0-9+ ]/g, "");
}

/**
 * Opens the contact options menu after a short delay.
 * Prevents the click event from propagating to parent elements.
 * @param {Event} event - The click event.
 */
function openContactMenu(event) {
  event.stopPropagation();
  const optionsMenu = document.getElementById("optionsMenu");
  setTimeout(() => {
    optionsMenu.classList.add("show-options-menu");
  }, 100);
}

/**
 * Closes the contact options menu when clicking outside of it.
 * @param {Event} event - The click event.
 */
function closeContactMenu(event) {
  const optionsMenu = document.getElementById("optionsMenu");
  if (optionsMenu != undefined && !optionsMenu.contains(event.target)) {
    optionsMenu.classList.remove("show-options-menu");
  }
}
