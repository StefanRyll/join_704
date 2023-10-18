let user = [{
        name: "Anton Mayer",
        email: "antom@gmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "Anja Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "Benedikt Ziegler",
        email: "benedikt@gmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "David Eisenberg",
        email: "davidberg@gmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "Eva Fischer",
        email: "eva@gmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "Emmanuel Mauer",
        email: "emmanuelma@gmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "Marcel Bauer",
        email: "bauer@gmail.com",
        phone: "+49 1111 111 11 1",
    }, {
        name: "Tatiana Wolf",
        email: "wolf@gmail.com",
        phone: "+49 1111 111 11 1",
    }, ]
    // let user01 = new Account("Anton Mayer", "antom@gmail.com", null, "+49 1111 111 11 1")
    // Join.accounts.push(user01);

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // durch das split wird das Alphabet in ein Array von Buchstaben aufgeteilt.
const colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];

async function initContacts() {
    await includeHTML();
    renderContacts();
}

function renderContacts() {
    let contactsList = '';
    let currentInitials = '';

    user.sort((a, b) => a.name.localeCompare(b.name)); //user wird nach dem a und b prinzip sortiert. localeCompare ist eine Methode, die verwendet wird, um Zeichenfolgen miteinander zu vergleichen, um die richtige Reihenfolge für die Sortierung festzustellen.

    for (let i = 0; i < user.length; i++) {
        const contact = user[i];
        const userInitials = getInitials(contact.name);
        contact.color = getColor(contact.name); // .color ist eine CSS eigenschaft die später die farben ausdem array colors verwertet.
        if (!contact.color) { // bedingung: hat der contact noch keine farbe (!).
            contact.color = colors[Math.floor(Math.random() * colors.length)]; //es wird eine zufällige farbe aus dem array colors ausgewählt.
        }
        if (userInitials[0] !== currentInitials) {
            if (alphabet.includes(userInitials[0])) { // hier wird überprüft ob der anfangsbuchstabe aus dem userinitials bereits da ist.
                if (contactsList !== '') {
                    contactsList += '</div>';
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

    if (contactsList !== '') {
        contactsList += '</div>';
    }

    document.getElementById('contactsList').innerHTML = contactsList;
}




function getInitials(name) {
    const parts = name.split(' ');
    let initials = parts[0][0];
    if (parts.length > 1) {
        initials += parts[parts.length - 1][0];
    }
    return initials.toUpperCase();
}

function getColor(name) {
    const sum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0); //methode um die ersten Buchstaben in zahlen zu umwandeln.
    const colorIndex = sum % colors.length; // hier werden die zahlen zusammen addiert und der array colors zusammenberechnet
    return colors[colorIndex];
}

function showDetails(i) {
    const contact = user[i];
    const userInitials = getInitials(contact.name);
    const detailsContent = /* html */ `
    <div class="contactView">
        <div class="detailsLogo" style="background-color: ${contact.color}; margin: 0 auto;">${userInitials}</div>
        <div class="name">
            <h3>${contact.name}</h3>
            <div class="contactsIcons">
                <div class="editIcon">
                    <img class="editSymbol" src="../IMG/edit.png"> <span>Edit</span>
                </div>
                <div class="deleteIcon">
                    <img src="../IMG/delete.png"> <span>Delete </span>
                </div>
        </div>
    </div>
    <div class="contactInformation">
        <h3>Contact Information</h3>
        <h3>Email</h3><br>
        <p class="email-blue">${contact.email}</p>
        <h3>Phone</h3>
        <p>Phone: ${contact.phone}</p>
    </div>
`;
    document.getElementById('detailsContainer').innerHTML = detailsContent;
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); //  Wir rufen unseren DIV im Index auf 
    for (let i = 0; i < includeElements.length; i++) { // hier iterieren wir alles Obejekte in diesem DIV container sprich alles was in dem Fall im Header Bereich ist 
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // hier liest er den Wert im Index.Html "includes/header.html" aus. Und wir deieser Varibale file zugeordnet 
        let resp = await fetch(file); // hier laden wir die datei mit fetch 
        if (resp.ok) {
            element.innerHTML = await resp.text(); // hier haben wir jetzt alles in der Variable contetn als Text gespeichert^
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}