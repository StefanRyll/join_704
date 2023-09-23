class Page {
    constructor() {
        this.accounts = [];
        this.signedAccount = null;
    }
    // Components
    signUpWindow() {
        return /*html*/`
            <div id="signUpWindow" class="signUpWindow">
                <h1>Sign up</h1>
                <form class="accountForm" onsubmit="createAccount1()" action="">
                    <div class="signUpInputArea"><input required type="text" id="signUpInputName" placeholder="Name" class="signUpInput"></div>
                    <div class="signUpInputArea"><input required type="email" id="signUpInputEmail" placeholder="Email" class="signUpInput"></div>
                    <div class="signUpInputArea"><input required type="password" id="signUpInputPassword" placeholder="Password" class="signUpInput"></div>
                    <div id="passwordCheckArea" class="signUpInputArea"><input required type="password" id="signUpInputPassword2" placeholder="Confirm Password" class="signUpInput"></div>
                    <label><input required type="checkbox" name="ppCheck" id="ppCheck">I accept the <a href="">Privacy policy</a></label>
                    <button type="submit">Sign Up</button>
                </form>
            </div>

        `
    }
    forceSignIn(x){
        this.signedAccount = x;
    }
}

class Account {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tel = null;
        this.tasks = [];
        this.contacts = [];

    }
    addTel(x) {
        this.tel = x;
    }
    addTask(x) {
        this.tasks.push(x);
    }
    addContact(x) {
        this.contacts.push(x);
    }
}

let Join = new Page()
const guest = new Account("Guest", "email@join.de", "");
Join.forceSignIn(guest)
console.log(Join.signedAccount.name);



function createAccount() {
    let pw = passwordCheck();
    let policy = ppCheck();
    if (pw === true && policy === true) {
        let name = document.getElementById('signUpInputName').value;
        let Email = document.getElementById('signUpInputEmail').value;
        let password = document.getElementById('signUpInputPassword').value;
        let account = new Account(name, Email, password);
        Join.accounts.push(account);
    }
    else if (pw != true) {
        alert('Passwort nicht valide')
    }
}

function passwordCheck() {
    let pw1 = document.getElementById('signUpInputPassword').value;
    let pw2 = document.getElementById('signUpInputPassword2').value;
    if (pw1.length >= 8){
        if (pw1 === pw2) {
            return true;
        } else {
            return false;
        }        
    }else{

        return false;
    }

}
function ppCheck() {
    let checkbox = document.getElementById('ppCheck');
    if (checkbox.checked) {
        return true;
    } else {
        return false;
    }
}
