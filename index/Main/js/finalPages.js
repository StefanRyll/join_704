let active = true;


function setActiveStyles(id, backgroundColor, textColor) {
    if (active) {
        let element = document.getElementById(id);
        if (element) {
            element.style.backgroundColor = backgroundColor;
            element.style.color = textColor;
        }
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
        setActiveStyles('summeryActive', 'rgba(9, 25, 49, 1)');
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
        setActiveStyles(summeryActive, 'rgba(9, 25, 49, 1)');
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
        setActiveStyles(boardActive, 'rgba(9, 25, 49, 1)');
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
        setActiveStyles(contactsActive, 'rgba(9, 25, 49, 1)');
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


function privacyPage(activePage) {
    setState("Privacy Policy")
    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.privacyContent();
    setActiveStyles(activePage, 'rgb(42, 54, 71)', 'rgba(41, 171, 226, 1');
}


function legalPage(activePage) {
    setState("Legal")

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.legalNoticeContent();
    setActiveStyles(activePage, 'rgb(42, 54, 71)', 'rgba(41, 171, 226, 1');
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
    setActiveStyles(addTaskActive, 'rgba(9, 25, 49, 1)');
}