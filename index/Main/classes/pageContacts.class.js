class Contacts extends Page {
    contactsContent() {
        return /*html*/ `
                <div class="respon-add-contact">
                    <button><img src="./IMG/person_add.png"></button>
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

}