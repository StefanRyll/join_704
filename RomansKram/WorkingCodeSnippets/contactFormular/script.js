class Contact{
    constructor(name, email, phone){
        this.name = name;
        this.email = email;
        this.phone = phone;

    }
    asCard(){
        return /*html*/`
            <div>
                <img src="./IMG/UserIMG.png" alt="">
                <div>
                    <p>${this.name}</p>
                    <p>${this.email}</p>
                </div>
            </div>
        `
    }

}

let contactList = [];
let Jan = new Contact("Jan", "jan@da.com", "012335")

function createContact(){
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;
    let newContact = new Contact(name, email, phone)
    contactList.push(newContact);
    // console.log(newContact);
}
console.log(Jan.asCard());
function logEnding(x){
    console.log(x);
}