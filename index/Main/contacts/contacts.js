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
    addContactForm.innerHTML = '';
    addContactForm.innerHTML = generateHtmlAddContact();
    setTimeout(() => {
        slideStart();
    }, 100);
}

function generateHtmlAddContact() {
    return /*html*/ `
    <div class="overlay-container slide-in">
        <div class="overlay-left-container">
            <img src="../IMG/LogoWhite.png" alt="join-logo">
            <h1 class="add-contact-headline">Add contact</h1>
            <span>Tasks are better with a team</span>
            <img src="../IMG/vector-5.png">
        </div>
        <div class ="overlay-mid-container-addContact">
            <div class="add-Contact-logo">
                <img src="../IMG/person-white.png">
            </div>
        </div>
        <div class="overlay-right-container-addContact">
            <div class="style-closebutton">
                
            </div>
        </div>
    </div>
 
    `
}

function generateHtmlEditContact() {
    return /*html*/ `
    <div class="overlay-container slide-in">
        <div class="overlay-left-container">
            <img src="../IMG/LogoWhite.png" alt="join-logo">
            <h1 class="add-contact-headline">Add contact</h1>
            <span>Tasks are better with a team</span>
            <img src="../IMG/vector-5.png">
        </div>
        <div class ="">

        </div>
    </div>
 
    `
}

function generateHtmlDeleteContact() {
    return /*html*/ `
    <div class="overlay-container slide-in">
        <div class="overlay-left-container">
            <img src="../IMG/LogoWhite.png" alt="join-logo">
            <h1 class="add-contact-headline">Add contact</h1>
            <span>Tasks are better with a team</span>
            <img src="../IMG/vector-5.png">
        </div>
        <div class ="">

        </div>
    </div>
 
    `
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