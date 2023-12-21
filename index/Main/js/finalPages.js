let active = true;


function activeBackgroundColor(id) {
    if (active) {
        document.getElementById(id).style.backgroundColor = 'rgba(9, 25, 49, 1)';
    }
}


function startPage() {
    //  if (Join.accounts ){

    //      saveTasks()
    //  }

    try { loadAccounts().then(loadTasks()) } catch (e) {
        console.log("Fehler", e)
    } finally {

        setState("login")

        body.innerHTML = JoinLogin.startAnimationOverlay();
        body.innerHTML = JoinLogin.startAnimation();
        body.innerHTML += JoinLogin.logInContent();

        try {
            let response = localStorage.getItem("remember");
            let loginEmail = document.getElementById('loginEmail')
            let responseParsed = JSON.parse(response);
            loginEmail.value = responseParsed;
           
        } catch (e) { "Nothing to remember :" + e }
        activeBackgroundColor('summeryActive');
    }
}

function startPage2() {
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
        body.innerHTML = JoinLogin.logoLogin();
        body.innerHTML += JoinLogin.logInContent();
    }
}

function signUp() {
    // body.innerHTML = Join.loginLayout()
    // let logoArea = document.getElementById('logoArea')
    // let windowArea = document.getElementById('windowArea')
    setState("signup");

    body.innerHTML = JoinLogin.logoLogin();
    body.innerHTML = JoinLogin.signUpWindow();
}

function summeryPage(summeryActive) {
    try { loadTasks() } catch (e) {
        console.log("Fehler", e)
    } finally {
        setState("summary");
        cleanUpAll()
        body.innerHTML = "";
        body.innerHTML = JoinLogin.pageLayoutMain();
        let content = document.getElementById('content');
        showSideAndHead();
        content.innerHTML = JoinSummary.summeryContent();
        activeBackgroundColor(summeryActive);
    }
}

function boardPage(boardActive) {
    try { loadTasks() } catch (e) {
        console.log("Fehler", e)
    } finally {
        setState("Board");
        cleanUpAll()
        body.innerHTML = "";
        body.innerHTML = Join.pageLayoutMain()
        let content = document.getElementById('content')
        content.innerHTML = JoinBoard.boardContent();
        showSideAndHead();
        JoinBoard.renderTask();
        updateHTML();
        activeBackgroundColor(boardActive);
    }
}

function contactsPage(contactsActive) {
    try { loadAccounts() } catch (e) {
        console.log("Fehler", e)
    } finally {
        setState("Contacts");
        cleanUpAll();
        body.innerHTML = "";
        body.innerHTML = Join.pageLayoutMain()
        let content = document.getElementById('content')
        showSideAndHead();
        content.innerHTML = JoinContacts.contactsContent();
        renderContacts();
        activeBackgroundColor(contactsActive);
    }
}

function helpPage() {
    setState("help");
    cleanUpAll();
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.helpContent();
}

function privacyPage() {
    setState("Privacy Policy")
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.privacyContent();
}

function legalPage() {
    setState("Legal")

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.legalNoticeContent();
}

function addTaskPage(addTaskActive) {
    // try { loadTasks()}
    // catch(e){
    //     console.log("Fehler", e)
    // }
    // finally{
    setState("addTask");

    cleanUpAll()
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain()
    let content = document.getElementById('content')
    content.innerHTML = JoinBoard.generateHTMLaddTaskWindow();
    showSideAndHead()
    // content.innerHTML = Join.generateHTMLaddTask();
    activeBackgroundColor(addTaskActive);
}