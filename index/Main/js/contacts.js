const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split(""); // durch das split wird das Alphabet in ein Array von Buchstaben aufgeteilt.
/**
 * Render contacts and organize them alphabetically with sections.
 */
async function renderContacts(obt) {
    await loadAccounts();
    let contactsList = document.getElementById("contactsList").innerHTML;
    contactsList = ""
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
    closeAlphabetSection(contactsList);
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
}
/**
 * This function renders the user's detailed data
 * 
 * @param {string} i - is required to access the individual users
 * @returns 
 */
function showDetails(i) {
    neutralizeContactColor();
    highlightContactColor(i);

    setTimeout(() => {
        openContactDetails();
    }, 200);
    manipulateResponsive(i);
}


function manipulateResponsive(i) {
    let contact = Join.accounts[i];

    if (window.innerWidth >= 1188) {
        let detailsContent = contact.generateHtmlContactDetails(i);
        document.getElementById("detailsContainer").innerHTML = detailsContent;
    } else {
        setTimeout(() => {
            openResOverlay()
        }, 100);
        let detailsContent = contact.generateMobileContactDetails(i);
        document.getElementById("responOverlay").innerHTML = detailsContent;
    }
}


function neutralizeContactColor() {
    for (let j = 0; j < Join.accounts.length; j++) {
        let contactField = document.getElementById(`contactField${j}`);
        let contactName = document.getElementById(`contactName${j}`);
        contactField.style.background = "white";
        contactName.style.color = "black";
    }
}


function highlightContactColor(i) {
    let contactField = document.getElementById(`contactField${i}`);
    let contactName = document.getElementById(`contactName${i}`);
    contactField.style.background = "#2A3647";
    contactName.style.color = "white";
}
/**
 * function for open and render the overlay to add new contact, edit Contact and delete Contact
 * 
 */
function openAddContact() {
    let addContactForm = document.getElementById('overlay');
    addContactForm.innerHTML = '';
    setTimeout(() => {
        openBigOverlay()
    }, 100);
    addContactForm.innerHTML = JoinContacts.generateHtmlAddContact();
}


function openEditContact(i) {
    let contact = Join.accounts[i];
    setTimeout(() => {
        openBigOverlay()
    }, 100);
    let editContactsContent = contact.generateHtmlEditContact(i);
    document.getElementById("overlay").innerHTML = editContactsContent;
}
/**
 *  function for close the overlays
 */
function closeOverlay() {
    setTimeout(() => {
        closeBigOverlay();
        closeResOverlay();
    }, 100);
}
/**
 * function for a new contact to the accounts[] array
 */
async function addContact() {
    try {
        await loadAccounts()
    } catch (error) {
        console.error(error);
    }
    let name = document.getElementById('name').value;
    let email = document.getElementById('mail').value;
    let phone = document.getElementById('phone').value;
    let newUser = new Contact(name, email, phone)
    Join.accounts.push(newUser);
    Join.accounts.sort((a, b) => a.name.localeCompare(b.name));
    closeOverlay();
    setTimeout(() => {
        successOverlay();
    }, 100);
    try { await saveAccounts() } catch (e) { "Die Änderungen an join.accounts konnte nicht gespeichert werden: " + e } finally {
        renderContacts();
    }
}

/**
 * Function for a edit contact to the accounts[] array
 * @param {string} i variable for the data in the accounts[] array
 */
async function editContact(i) {
    try {
        await loadAccounts()
    } catch (error) {
        console.error("Kann account nicht laden")
    }
    let contact = Join.accounts[i];
    contact.name = document.getElementById('editName').value;
    contact.email = document.getElementById('editMail').value;
    contact.tel = document.getElementById('editPhone').value;

    Join.accounts.sort((a, b) => a.name.localeCompare(b.name));
    neutralizeContactColor();
    closeOverlay();

    setTimeout(() => {
        editOverlay();
    }, 100);
    try { await saveAccounts() } catch (e) { "Die Änderungen an join.accounts konnte nicht gespeichert werden: " + e } finally {
        renderContacts(i);
        showDetails(i);
    }
}

/**
 * Function for a delete contact to the accounts[] array
 * @param {string} i variable for the data in the accounts[] array
 */
function deleteContact(i) {
    Join.accounts.splice(i, 1);
    deleteOverlay();
    closeContactDetails();
    closeOverlay();
    try { saveAccounts() } catch (e) { "Die Änderungen an join.accounts konnte nicht gespeichert werden: " + e } finally {
        contactsPage();
    }
}
/**
 *  function for render a little information overlay to addContact, editContact and deleteContact
 * 
 */
function successOverlay() {
    let overlaySuccess = document.getElementById('overlaySuccess');
    overlaySuccess.innerHTML = JoinContacts.generateHtmlSuccessInfo();
    openSuccessOverlay();
    setTimeout(() => {
        closeSuccessOverlay();
    }, 2000);
}


function deleteOverlay() {
    let overlayDelete = document.getElementById('overlaySuccess');
    overlayDelete.innerHTML = JoinContacts.generateHtmlDeleteInfo();
    openSuccessOverlay();
    setTimeout(() => {
        closeSuccessOverlay();
    }, 2000);
}


function editOverlay() {
    let overlayEdit = document.getElementById('overlaySuccess');
    overlayEdit.innerHTML = JoinContacts.generateHtmlEditInfo();
    openSuccessOverlay();
    setTimeout(() => {
        closeSuccessOverlay();
    }, 2000);
}
/**
 * Function for defining which characters are allowed in the input.
 * @param {string} phoneInput 
 */
function validatePhoneNumber(phoneInput) {
    phoneInput.value = phoneInput.value.replace(/[^0-9+ ]/g, '');
}


function openContactMenu(event) {
    event.stopPropagation();
    let optionsMenu = document.getElementById("optionsMenu");
    setTimeout(() => {
        optionsMenu.classList.add("show-options-menu");
    }, 100);
}


function closeContactMenu(event) {
    let optionsMenu = document.getElementById("optionsMenu");
    if (optionsMenu != undefined && !optionsMenu.contains(event.target)) {
        optionsMenu.classList.remove("show-options-menu");
    }
}