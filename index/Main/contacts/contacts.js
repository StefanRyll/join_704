let user = [{
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
 * This function is for a container to start a slide from the right side 
 * 
 */
function slideStart() {
    let slideInElement = document.querySelector('.slide-in');
    slideInElement.classList.add('active');
}

function slideEnd() {
    let slideInElement = document.querySelector('.slide-out');
    slideInElement.classList.add('active');
}

/**
 * This function generates the user array through a loop and renders it into html
 * 
 */

function renderContacts() {
    let contactsList = "";
    let currentInitials = "";

    user.sort((a, b) => a.name.localeCompare(b.name)); //user wird nach dem a und b prinzip sortiert. localeCompare ist eine Methode, die verwendet wird, um Zeichenfolgen miteinander zu vergleichen, um die richtige Reihenfolge für die Sortierung festzustellen.

    for (let i = 0; i < user.length; i++) {
        const contact = user[i];
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

        contactsList += /*html*/ `
            <div class="contactfield-wrapper">
                <div class="contactfield" onclick="showDetails(${i})">
                    <div class="initials-logo" style="background-color: ${contact.color}">${userInitials}</div>
                    <div class="contact">
                        <span class="name">${contact.name}</span>
                        <span class="mail">${contact.email}</span>
                    </div>
                </div>
            </div>
        `;
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
    const parts = name.split(" ");
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
    const sum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0); //methode um die ersten Buchstaben in zahlen zu umwandeln.
    const colorIndex = sum % colors.length; // hier werden die zahlen zusammen addiert und der array colors zusammenberechnet
    return colors[colorIndex];
}

/**
 * This function renders the user's detailed data
 * 
 * @param {string} i - is required to access the individual users
 * @returns 
 */
function showDetails(i) {
    slideStart();
    const contact = user[i];
    const userInitials = getInitials(contact.name);
    const detailsContent = /* html */ `
    <div class="contactView">
        <div class="initials-logo logo-by-details" style="background-color: ${contact.color}; margin: 0 auto;">${userInitials}</div>
        <div class="name">
            <h2 class="name-headline">${contact.name}</h2>
            <a class="contactsIcons">
                <div onclick="openOverlay()" class="editIcon">
                    <img class="editSymbol" src="../IMG/edit.png"> <span>Edit</span>
                </div>
                <div onclick="openOverlay()" class="deleteIcon">
                    <img class="deleteSymbol" src="../IMG/delete.png"> <span>Delete</span>
                </div>
            </a>
        </div>
    </div>
    <div class="contactInformation">
        <h3 class="font-size-normal mg-none">Contact Information</h3>
        <h3 class="mail-headline">Email</h3><br>
        <p class="mail mg-none"><a href="mailTo:${contact.email}">${contact.email}</a></p>
        <h3>Phone</h3>
        <p><a class="phone-link" href="tel:${contact.phone}">${contact.phone}</a></p>
    </div>
`;
    document.getElementById("detailsContainer").innerHTML = detailsContent;

}

/**
 *  function for open and render the overlay to add new contact, edit Contact and delete Contact
 */
function openOverlay() {
    let addContactForm = document.getElementById('overlay');
    addContactForm.classList.remove('d-none');
    addContactForm.classList.remove('slide-out');
    addContactForm.innerHTML = '';
    addContactForm.innerHTML = generateHtmlAddContact();
    setTimeout(() => {
        slideStart();
    }, 100);
}

function generateHtmlAddContact() {
    return /*html*/ `
    <div class="overlay-container slide-in">
        ${generateLeftSide()}
        <div class ="overlay-mid-container-addContact">
            <div class="add-Contact-logo">
                <img src="../IMG/person-white.png">
            </div>
        </div>
        <div class="overlay-right-container-addContact">
            ${closeButton ()}
            <form class="addContact-form" action="">
                <div class="btn-underlay">
                    <input required type="text" class="frame-157" placeholder="Name" id="loginEmail">
                    <img class="input-icon" src="../IMG/person.png"> 
                </div>
                <div class="btn-underlay">
                    <input required type="email" class="frame-157" placeholder="Email" id="loginEmail">
                    <img class="input-icon" src="../IMG/mail.png"> 
                </div>
                <div class="btn-underlay">
                    <input required type="number" class="frame-157" placeholder="Phone" id="loginEmail">
                    <img class="input-icon" src="../IMG/call.png"> 
                </div>
                <div class="frame-176">
                    <div class="loginButtons">
                        <button class="btn-cancel btn-white" type="submit">Cancel <img src="../IMG/cancel.png"></button>
                        <button class="btn-create btn-dark-blue">Create&nbsp;contact <img class="check-img-contacts" src="../IMG/check-for-button.png"></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `
}

function generateHtmlEditContact() {
    return /*html*/ `
    <div class="overlay-container slide-in">
        ${generateLeftSide()}
        <div class ="">

        </div>
    </div>
 
    `
}

function generateHtmlDeleteContact() {
    return /*html*/ `
    <div class="overlay-container slide-in">
        ${generateLeftSide()}
        <div class ="">

        </div>
    </div>
 
    `
}

/**
 * templates for the overlay
 * @returns to the generate functions
 */
function generateLeftSide() {
    return /*html*/ `
        <div class="overlay-left-container">
            <img src="../IMG/LogoWhite.png" alt="join-logo">
            <h1 class="add-contact-headline">Add contact</h1>
            <span>Tasks are better with a team</span>
            <img src="../IMG/vector-5.png">
        </div>
    `
}

function closeButton() {
    return /*html*/ `
        <div class="style-closebutton">
            <svg onclick="closeOverlay()" class="close-button-add-task cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_87491_5574)">
                    <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                </g>
            </svg>
        </div>
    `
}

/**
 *  function for close the overlays
 */
function closeOverlay() {
    let addContactForm = document.getElementById('overlay');
    addContactForm.classList.add('slide-out')
    setTimeout(() => {
        slideEnd();
        addContactForm.classList.add('d-none')
    }, 300);
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