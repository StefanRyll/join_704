const user = [{
        name: "Anton Mayer",
        email: "antom@gmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "Anja Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "Benedikt Ziegler",
        email: "benedikt@gmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "David Eisenberg",
        email: "davidberg@gmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "Eva Fischer",
        email: "eva@gmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "Emmanuel Mauer",
        email: "emmanuelma@gmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "Marcel Bauer",
        email: "bauer@gmail.com",
        phone: "+49 1111 111 11 1",
    },
    {
        name: "Tatiana Wolf",
        email: "wolf@gmail.com",
        phone: "+49 1111 111 11 1",
    },
];
// let user01 = new Account("Anton Mayer", "antom@gmail.com", null, "+49 1111 111 11 1")
// Join.accounts.push(user01);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // durch das split wird das Alphabet in ein Array von Buchstaben aufgeteilt.
const colors = [
    "#FF7A00",
    "#FF5EB3",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B",
];

async function initContacts() {
    await includeHTML();
    renderContacts();
}

/**
 * This function is for a container to start and close a slide from the right side 
 * 
 */
function openBigOverlay() {
    document.getElementById('overlay').classList.add('show-overlay');
}

function closeBigOverlay() {
    document.getElementById('overlay').classList.remove('show-overlay');
}

function openResOverlay() {
    document.getElementById('responOverlay').classList.add('show-respon-overlay');
}

function closeResOverlay() {
    document.getElementById('responOverlay').classList.remove('show-respon-overlay');
}

function openContactDetails() {
    document.getElementById('detailsContainer').classList.add('show-details');
}

function closeContactDetails() {
    document.getElementById('detailsContainer').classList.remove('show-details');
}

function openSuccessOverlay() {
    document.getElementById('overlaySuccess').classList.add('show-success-overlay');
}

function closeSuccessOverlay() {
    document.getElementById('overlaySuccess').classList.remove('show-success-overlay');
}

/**
 * This function generates the user array through a loop and renders it into html
 * contactsTemp.js = function generateHtmlContactList, line 1
 */

function renderContacts() {
    let contactsList = "";
    let currentInitials = "";

    user.sort((a, b) => a.name.localeCompare(b.name)); //user wird nach dem a und b prinzip sortiert. localeCompare ist eine Methode, die verwendet wird, um Zeichenfolgen miteinander zu vergleichen, um die richtige Reihenfolge für die Sortierung festzustellen.

    for (let i = 0; i < user.length; i++) {
        const contact = user[i];
        const name = contact.name;
        const mail = contact.email;
        const userInitials = getInitials(contact.name);
        contact.color = getColor(contact.name); // .color ist eine CSS eigenschaft die später die farben ausdem array colors verwertet.
        if (!contact.color) {
            // bedingung: hat der contact noch keine farbe (!).
            contact.color = colors[Math.floor(Math.random() * colors.length)]; //es wird eine zufällige farbe aus dem array colors ausgewählt.
        }

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
        const color = contact.color;
        contactsList += generateHtmlContactList(i, color, userInitials, name, mail);
    }
    if (contactsList !== "") {
        contactsList += "</div>";
    }
    document.getElementById("contactsList").innerHTML = contactsList;
}

/**
 * This function creates and sorts the user initials
 * 
 * @param {string} name - Is needed to recognize the initials from the user names. It is passed in renderContacts().
 * @returns 
 */
function getInitials(name) {
    let parts = name.split(" ");
    let initials = parts[0][0];
    if (parts.length > 1) {
        initials += parts[parts.length - 1][0];
    }
    return initials.toUpperCase();
}

/**
 * This function creates and random the bg-color of the initials container
 * 
 * @param {string} name - is needed to add up the first letters and assign them to the colors array.
 * @returns 
 */
function getColor(name) {
    let sum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0); //methode um die ersten Buchstaben in zahlen zu umwandeln.
    let colorIndex = sum % colors.length; // hier werden die zahlen zusammen addiert und der array colors zusammenberechnet
    return colors[colorIndex];
}

/**
 * This function renders the user's detailed data
 * contactsTemp.js = function generateHtmlContactDetails, line 15
 * @param {string} i - is required to access the individual users
 * @returns 
 */
function showDetails(i) {
    setTimeout(() => {
        openContactDetails()
    }, 100);
    let contact = user[i];
    let color = contact.color;
    let userInitials = getInitials(contact.name);
    let name = contact.name;
    let mail = contact.email;
    let phone = contact.phone;

    if (window.innerWidth >= 1188) {
        let detailsContent = generateHtmlContactDetails(i, color, userInitials, name, mail, phone);
        document.getElementById("detailsContainer").innerHTML = detailsContent;
    } else {
        setTimeout(() => {
            openResOverlay()
        }, 100);
        let detailsContent = generateMobileContactDetails(i, color, userInitials, name, mail, phone);
        document.getElementById("responOverlay").innerHTML = detailsContent;
    }
}

/**
 * function for open and render the overlay to add new contact, edit Contact and delete Contact
 * contactsTemp.js = function generateHtmlAddContact, line 41
 * contactsTemp.js = function generateHtmlEditContact, line 77
 */
function openAddContact() {
    let addContactForm = document.getElementById('overlay');
    addContactForm.innerHTML = '';
    setTimeout(() => {
        openBigOverlay()
    }, 100);
    addContactForm.innerHTML = generateHtmlAddContact();
}

function openEditContact(i) {
    let contact = user[i];
    let color = contact.color;
    let userInitials = getInitials(contact.name);
    let name = contact.name;
    let mail = contact.email;
    let phone = contact.phone;
    setTimeout(() => {
        openBigOverlay()
    }, 100);
    let editContactsContent = generateHtmlEditContact(i, color, userInitials, name, mail, phone);
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
    initContacts();
}

/**
 * Function for a new contact to the user array
 */
function addContact() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('mail').value;
    let phone = document.getElementById('phone').value;
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let newUser = { // erstellung eines neuen objektes, zur erleichterung des pushes zum user-array
        name,
        email,
        phone,
        randomColor
    };
    user.push(newUser);
    user.sort((a, b) => a.name.localeCompare(b.name));
    closeOverlay();
    setTimeout(() => {
        successOverlay();
    }, 100);
    renderContacts();
}

/**
 * Function for a edit contact to the user array
 * @param {string} i variable for the data in the user array
 */
function editContact(i) {
    let contact = user[i];
    contact.name = document.getElementById('editName').value;
    contact.email = document.getElementById('editMail').value;
    contact.phone = document.getElementById('editPhone').value;

    user.sort((a, b) => a.name.localeCompare(b.name));
    closeOverlay();
    closeContactDetails();
    setTimeout(() => {
        editOverlay();
    }, 100);
    renderContacts();
}

/**
 * Function for a delete contact to the user array
 * @param {string} i variable for the data in the user array
 */
function deleteContact(i) {
    user.splice(i, 1);

    closeOverlay();
    closeContactDetails();
    setTimeout(() => {
        deleteOverlay();
    }, 100);
    renderContacts();
}

/**
 *  function for render a little information overlay to addContact, editContact and deleteContact
 * contactsTemp.js = generateHtml-functions, line 142.
 */
function successOverlay() {
    let overlaySuccess = document.getElementById('overlaySuccess');
    overlaySuccess.innerHTML = generateHtmlSuccessInfo();
    openSuccessOverlay();
    setTimeout(() => {
        closeSuccessOverlay();
    }, 2000);
}

function deleteOverlay() {
    let overlayDelete = document.getElementById('overlaySuccess');
    overlayDelete.innerHTML = generateHtmlDeleteInfo();
    openSuccessOverlay();
    setTimeout(() => {
        closeSuccessOverlay();
    }, 2000);
}

function editOverlay() {
    let overlayEdit = document.getElementById('overlaySuccess');
    overlayEdit.innerHTML = generateHtmlEditInfo();
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

function openContactMenu() {
    let optionsMenu = document.getElementById("optionsMenu");
    optionsMenu.classList.add("show-options-menu");
}

function closeContactMenu() {
    let optionsMenu = document.getElementById("optionsMenu");
    optionsMenu.classList.remove("show-options-menu");
}

/**
 *  this function is required to render the header and sidebar
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]"); //  Wir rufen unseren DIV im Index auf
    for (let i = 0; i < includeElements.length; i++) {
        // hier iterieren wir alles Obejekte in diesem DIV container sprich alles was in dem Fall im Header Bereich ist
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // hier liest er den Wert im Index.Html "includes/header.html" aus. Und wir deieser Varibale file zugeordnet
        let resp = await fetch(file); // hier laden wir die datei mit fetch
        if (resp.ok) {
            element.innerHTML = await resp.text(); // hier haben wir jetzt alles in der Variable contetn als Text gespeichert^
        } else {
            element.innerHTML = "Page not found";
        }
    }
}