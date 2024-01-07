class Page {
    rememberMe = false;
    signedAccount = null;
    constructor() {
            this.accounts = [];
            this.tasks = [];
        }
        // Methoden
    sayDaytime() {
            let datum = new Date();
            let daytime = datum.getHours()
            if (daytime <= 23 && daytime >= 18) {
                return "Good&nbsp;Evening";
            } else if (daytime >= 6 && daytime <= 12) {
                return "Good&nbsp;Morning";
            } else if (daytime >= 0 && daytime <= 5) {
                return "Good&nbsp;Night"
            } else {
                return "Good&nbsp;Afternoon";
            }
        }
        // Components
    pageLayoutMain() {
        body.innerHTML = "";
        return /*html*/ `
            <div id="SideAndHead"></div>
            <div id="content" class="content"></div>
        `
    }
    SideAndHead() {
        let nav = () => {
            if (Join.signedAccount) {
                return /*html*/ `
                    <div id="summeryActive" class="navs bgDark " onclick="summeryPage()"><div class="summary"></div><h3>Summery</h3></div>
                    <div id="addTaskActive" class="navs" onclick="addTaskPage()"><div class="addTask"></div><h3>Add Task</h3></div>
                    <div id="boardActive" class="navs" onclick="boardPage()"><div class="board"></div><h3>Board</h3></div>
                    <div id="contactsActive" class="navs" onclick="contactsPage()"><div class="contacts"></div><h3>Contacts</h3></div>
                `
            } else {
                return "";
            }
        }
        let accountArea = () => {
            if (Join.signedAccount) {
                return /*html*/ `
                    <div id="hInfo" class="infoButton" onclick="helpPage()"></div>
                    <div onclick="openSideAndHeadMenu(event)" class="userImg">${Join.signedAccount.shortname}</div>
                `
            } else {
                return "";
            }
        }

        return /*html*/ `
            <div id="sidebar" class="sidebar">
                <div id="logo" onclick="summeryPage()" class="logo"></div>
                <nav>
                    ${nav()}
                </nav>
                <div class="container-privacy-legal">
                    <div id="privacy" class="style-privacy">
                        <p id="privacyPage" class="legal-policy" onclick="privacyPage('privacyPage')">Privacy Policy</p>
                    </div>
                    <div id="legal" class="style-legal">
                        <p id="legalPage" class="legal-policy" onclick="legalPage('legalPage')">Legal notice</p>
                    </div>
                </div>
            </div>
            <header class="header">
                <h2>Kanban Projekt Management Tool</h2>
                <div id="accountIssues" class="accountIssues">
                    ${accountArea()}
                </div>
            </header>

            <header class="respon-header">
                <img class="respon-logo" src="./IMG/Capa 1.png" alt="Joinlogo">
                <div id="accountIssuesRespon" class="accountIssues">
                    ${accountArea()}
                </div>
            </header>
            <footer class="respon-footer">
                <div id="responActiveSummery" class="respon-footer-buttons" onclick="summeryPage()">
                    <img src="./IMG/Summary.png">
                    <p class="mg-none">Summery</p>
                </div>
                <div id="responActiveBoard" class="respon-footer-buttons" onclick="boardPage()">
                    <img src="./IMG/Board.png">
                    <p class="mg-none">Board</p>
                </div>
                <div id="responActiveAddTask" class="respon-footer-buttons" onclick="addTaskPage()">
                    <img src="./IMG/addTask.png">
                    <p class="mg-none">Add Task</p>
                </div>
                <div id="responActiveContats" class="respon-footer-buttons" onclick="contactsPage()">
                    <img src="./IMG/Contacts.png">
                    <p class="mg-none">Contacts</p>
                </div>
            </footer>
            ${this.logoutWindow()}
        `
    }
    logoutWindow() {
        return /*html*/ `
            <div id="logoutWindow" class="popupAccount">
                <div class="popupAccountBtn" onclick="legalPage()"><p>Legal Notice</p></div>
                <div class="popupAccountBtn" onclick="privacyPage()"><p>Privacy Policy</p></div>
                <div class="popupAccountBtn" onclick="logout()"><p>Log out</p></div>
            </div>

        `
    }
}