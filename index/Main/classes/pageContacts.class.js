class Contacts extends Page {
    contactsContent() {
        return /*html*/ `
            <div class="respon-add-contact" onclick="openAddContact()">
                <button class="respon-button"><img src="./IMG/person_add.png"></button>
            </div>
            <div>
                <div onclick="closeContactMenu()" class="respon-overlay" id="responOverlay"></div>
            </div>
            <div>
                <div class="overlay-style" id="overlay"></div>
            </div>
            <div class="contacts-content">
                <div class="contacts-list-section">
                    <div class="add-new-button" id="addNewButton">
                        <button onclick="openAddContact()" class="button-add-task button-width contacts-button-respon"><p>Add new contact</p><img src="./IMG/person_add.png"></button>
                    </div>
                    <nav class="contacts-list" id="contactsList"></nav>
                </div>
                <div class="contacts-view">
                    <div class="contacts-headline">
                        <h1 class="contacts-h1">Contacts</h1>
                        <img class="vector-blue" src="./IMG/Vector-5blue (1).png">
                        <p class="subtitle-contacts">Better with a team</p>
                    </div>
                    <div class="contact-container" id="detailsContainer"></div>
                </div>
            </div>


            <div>
                <div class="overlay-success" id="overlaySuccess"></div>
            </div>
        `
    }
    generateHtmlAddContact() {
        return /*html*/ `
        <div class="overlay-container">
            ${generateLeftSide()}
            <div class ="overlay-mid-container">
                <div class="add-Contact-logo">
                    <img src="./IMG/person-white.png">
                </div>
            </div>
            <div class="overlay-right-container-addContact">
                <div class="close-button">${closeButton()}</div>
                <form class="addContact-form" action="#" onsubmit="addContact()">
                    <div class="btn-underlay">
                        <input id="name" required type="text" class="frame-157" placeholder="Name">
                        <img class="input-icon" src="./IMG/person.png"> 
                    </div>
                    <div class="btn-underlay">
                        <input id="mail" required type="email" class="frame-157" placeholder="Email">
                        <img class="input-icon" src="./IMG/mail.png"> 
                    </div>
                    <div class="btn-underlay">
                        <input id="phone" required type="number" class="frame-157" placeholder="Phone">
                        <img class="input-icon" src="./IMG/call.png"> 
                    </div>
                    <div class="frame-176">
                        <div class="loginButtons">
                            <button class="btn-cancel btn-white" type="reset" onclick="closeOverlay()">Cancel <img src="./IMG/cancel.png"></button>
                            <button class="btn-create btn-dark-blue" type="submit">Create&nbsp;contact <img class="check-img-contacts" src="./IMG/check-for-button.png"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `
    }

}