const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split(""); // durch das split wird das Alphabet in ein Array von Buchstaben aufgeteilt.

/**
 * Render contacts and organize them alphabetically with sections.
 */
async function renderContacts() {
    await loadAccounts()
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
    setTimeout(() => {
        openContactDetails();
    }, 200);
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
        closeBigOverlay()
        closeResOverlay()
    }, 100);
    setTimeout(() => {
        contactsPage();
    }, 225);
    
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
function editContact(i) {
    let contact = Join.accounts[i];
    contact.name = document.getElementById('editName').value;
    contact.email = document.getElementById('editMail').value;
    contact.tel = document.getElementById('editPhone').value;

    Join.accounts.sort((a, b) => a.name.localeCompare(b.name));
    closeOverlay();
    closeContactDetails();
    setTimeout(() => {
        editOverlay();
    }, 100);
    try { saveAccounts() } catch (e) { "Die Änderungen an join.accounts konnte nicht gespeichert werden: " + e } finally {
        renderContacts();
    }
}

/**
 * Function for a delete contact to the accounts[] array
 * @param {string} i variable for the data in the accounts[] array
 */
function deleteContact(i) {
    Join.accounts.splice(i, 1);
    closeOverlay();
    closeContactDetails();
    setTimeout(() => {
        deleteOverlay();
    }, 100);
    try { saveAccounts() } catch (e) { "Die Änderungen an join.accounts konnte nicht gespeichert werden: " + e } finally {
        renderContacts();
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
    // Entferne alle Zeichen, die keine Zahlen sind, aus dem Eingabewert.
    phoneInput.value = phoneInput.value.replace(/[^0-9+ ]/g, '');
}

function openContactMenu(event) {
    event.stopPropagation(); // Verhindert, dass das Klick-Ereignis bis zum Dokument weitergeleitet wird
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

