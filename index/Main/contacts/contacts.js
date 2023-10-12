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

function initContacts() {
    renderContacts();
}

function renderContacts() {
    let contactsList = '';
    let currentInitials = '';

    for (let i = 0; i < user.length; i++) {
        const contact = user[i];
        const userInitials = getInitials(contact.name);
        contact.color = getColor(contact.name);
        if (!contact.color) {
            contact.color = colors[Math.floor(Math.random() * colors.length)];
        }
        if (userInitials !== currentInitials) {
            contactsList += `<div class="alphabet-section" id="alphabet-${userInitials}">${userInitials}</div>`;
            currentInitials = userInitials;
        }

        contactsList += /*html*/ `
            <div class="contactfield-wrapper">
                <div class="contactfield">
                    <div class="initials-logo" style="background-color: ${contact.color}">${userInitials}</div>
                        <div class="contact">
                            <span class="name"><p><b>${contact.name}</b></p></span>
                            <span class="mail"><p><b>${contact.email}</b></p></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
    const sum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = sum % colors.length;
    return colors[colorIndex];
}