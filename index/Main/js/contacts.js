const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // durch das split wird das Alphabet in ein Array von Buchstaben aufgeteilt.
/**
 * This function generates the user array through a loop and renders it into html
 * 
 */
function renderContacts() {
    let contactsList = "";
    let currentInitials = "";

    for (let i = 0; i < Join.accounts.length; i++) {
        const contact = Join.accounts[i];
        const userInitials = contact.shortname;

        if (userInitials[0] !== currentInitials) {
            if (alphabet.includes(userInitials[0])) {
                // hier wird überprüft ob der anfangsbuchstabe aus dem userinitials bereits da ist.
                if (contactsList !== "") {
                    contactsList += "</div>";
                }
                contactsList += `<div class="alphabet-section" id="alphabet-${userInitials[0]}">${userInitials[0]}</div>`;
                currentInitials = userInitials[0];
                contactsList += '<div class="contacts-container">';
            }
        }
        contactsList += contact.generateHtmlContactList(i);
    }
    if (contactsList !== "") {
        contactsList += "</div>";
    }
    document.getElementById("contactsList").innerHTML = contactsList;
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
    document.getElementById('overlay');
    document.getElementById('responOverlay');
    setTimeout(() => {
        closeBigOverlay()
        closeResOverlay()
    }, 100);
    contactsPage();
}

/**
 * function for a new contact to the accounts[] array
 */
function addContact() {
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
    try { saveAccounts() } catch (e) { "Die Änderungen an join.accounts konnte nicht gespeichert werden: " + e } finally {
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