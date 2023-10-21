/**
 * Contacts sind die Grundlage: 
 * Accounts sind eine Erweiterung "Vererbung" von Contacts, da diese ein Passwort haben sich anmelden können usw. 
 * allerding wäre alles rund, wenn jeder, der als Contakt hinzugefügt wird Eine Email erhält, "Mach dir doch einen Account".
 * Zt Usability, kann halt keiner hinterher sagen, er hat von dem Projekt "nix gewusst". 
 */
class Contact {
    constructor(name, email, tel) {
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.shortname = this.name.charAt(0)
    }
    tinyCard(x) {
        return /*html*/ `
        <div class="tinyAccountCard" onclick="showContact(${x})">
            <div class="accountTag">${this.shortname}</div>
            <div>
                <div class="contactName">${this.name}</div>
                <div class="contactEmail">${this.email}</div>
            </div>
        </div>
        `
    }
    nameTag(){
        return /*html*/`
            <div class="accountTag">${this.shortname}</div>

        `
    }
    tinyCardCheck(x) {
        return /*html*/ `
        ${this.generateHTMLCheckedNone(x)}
        ${this.generateHTMLChecked(x)}
        `
    }

    generateHTMLCheckedNone(x) {
        return /*html*/`
            <div id="tinyAccountCardCheckedNone${x}" class="checked-none">
                <div onclick="assignedCheckNone(${x})"  class="tinyAccountCard">
                    <div class="board-addtask-addcontact-contact">
                        <div id="shortname${x}" class="accountTag">${this.shortname}</div>
                        <div>${this.name}</div>
                    </div>
                    <!-- <input type="checkbox" name="" id="ac${x}"> -->
                    <div id="assignedContactCheckEmpty" class="board-addtask-addcontact-checkbox">
                        <img src="IMG/check_empty.svg" alt="">
                    </div>
                </div>
            </div>
        `
    }

    generateHTMLChecked(x) {
        return /*html*/`
            <div id="tinyAccountCardChecked${x}" class="checked d-none">
                <div onclick="assignedCheck(${x})"  class="tinyAccountCardChecked" id="ac${x}">
                    <div class="board-addtask-addcontact-contact">
                        <div class="accountTag">${this.shortname}</div>
                        <div>${this.name}</div>
                    </div>
                    <!-- <input type="checkbox" name="" id="ac${x}"> -->
                    <div id="assignedContactCheckIsCheck" class="board-addtask-addcontact-checkbox board-addtask-addcontact-checkbox-check">
                        <img src="IMG/check_check.svg" alt="">
                    </div>        
                </div>
            </div>
        `
    }

    accountTag() {
        return /*html*/ `
            <div class="accountTag">${this.shortname}</div>

        `
    }

}