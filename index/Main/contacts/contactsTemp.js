function generateHtmlContactList(i, color, userInitials, name, mail) {
    return /*html*/ `
        <div class="contactfield-wrapper">
            <div class="contactfield" onclick="showDetails(${i})">
                <div class="initials-logo" style="background-color: ${color}">${userInitials}</div>
                <div class="contact">
                    <span class="name">${name}</span>
                    <span class="mail">${mail}</span>
                </div>
            </div>
        </div>
    `
}