class Page {
    constructor() {
        this.accounts = [guest];
        this.signedAccount = null;
    }
    // Components
    startAnimation(){
        body.innerHTML = "";
        return /*html*/`
            <div id="logoMain" class="logoAnimationImg"></div>

        `
    }
    pageLayoutMain(){
        body.innerHTML = "";
        return /*html*/`
            <div id="SideAndHead"></div>
            <div id="content"></div>

        `
    }
    SideAndHead(){
        return /*html*/`
            <header class="header">
                <h2>Kanban Projekt Management Tool</h2>
                <div class="accountIssues">
                    <div id="hInfo" class="infoButton"></div>
                    <img src="./IMG/defaultUser.png" alt="" class="userImg">
                </div>
            </header>
            <div id="sidebar" class="sidebar">
                <div id="logo" class="logo"></div>
                <nav>
                    <div class="navs bgDark"><div class="summary"></div><h3>Summery</h3></div>
                    <div class="navs"><div class="board"></div><h3>Board</h3></div>
                    <div class="navs"><div class="addTask"></div><h3>Add Task</h3></div>
                    <div class="navs"><div class="contacts"></div><h3>Contacts</h3></div>
                </nav>
                <div>
                    <p>Private Policy</p>
                    <p>Legal notice</p>
                </div>
            </div>

        `
    }
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
    helpContent(){
        return /*html*/`
            <h1>Help</h1>
                <p>Welcome to the help page for Join, 
                    your guide to using our kanban project 
                    management tool. Here, we'll provide 
                    an overview of what Join is, how it 
                    can benefit you, and how to use it.</p>
                <h2>What is Join?</h2>
                <p>Join is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie. <br><br>
                    Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). Join leverages the 
                    principles of kanban to help users manage their tasks and projects in an intuitive, visual interface. <br><br>
                    It is important to note that Join is designed as an educational exercise and is not intended for extensive business usage. 
                    While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, 
                    or other aspects of quality regarding Join.</p>
                <h2>How to use it</h2>
                <p>Here is a step-by-step guide on how to use Join:</p>
                <ol>
                    <li><h3>Exploring the Board</h3>
                        <p>When you log in to Join, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p></li>
                    <li><h3>Creating Contacts</h3>
                        <p>In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p></li>
                    <li><h3>Adding Cards</h3>
                        <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc..</p></li>
                    <li><h3>Moving Cards</h3>
                        <p>As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.</p></li>
                    <li><h3>Deleting Cards</h3>
                        <p>Deleting Cards
                            Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible.<br><br>

                            Remember that using Join effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.<br><br>

                            Have more questions about Join? Feel free to contact us at [Your Contact Email]. We're here to help you!
                            </p></li>
                </ol>
                <h2>Enjoy using Join!</h2>


        `
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
let body = document.getElementById('body')


// Login
function guestLogin(){
    Join.signedAccount = guest;
}
// Sign Up
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
// Onload Funktion
function startPage(){
    body.innerHTML = Join.startAnimation()
}
// Sidebar and Header
function showSideAndHead(){
    const SNH = document.getElementById('SideAndHead');
    SNH.innerHTML = Join.SideAndHead();
}
function helpTest(){
    body.innerHTML = "";
    body.innerHTML = pageLayoutMain()
    showSideAndHead()
}
helpTest()