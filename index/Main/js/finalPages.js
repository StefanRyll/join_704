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
    try {
        loadAccounts()
        loadTasks()
    } catch (e) {
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


function summeryPage() {
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
        setActiveStyles('summeryActive', 'rgba(9, 25, 49, 1)');
        setActiveStyles('responActiveSummery', 'rgba(9, 25, 49, 1)');
    }
}


function boardPage() {
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
        setActiveStyles('boardActive', 'rgba(9, 25, 49, 1)');
        setActiveStyles('responActiveBoard', 'rgba(9, 25, 49, 1)');
        checkDragArea();
    }
}


function contactsPage() {
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
        setActiveStyles('contactsActive', 'rgba(9, 25, 49, 1)');
        setActiveStyles('responActiveContats', 'rgba(9, 25, 49, 1)');
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
    setActiveStyles('privacy', 'rgba(9, 25, 49, 1)', '#A8A8A81');
}


function legalPage() {
    setState("Legal")

    body.innerHTML = "";
    body.innerHTML = Join.pageLayoutMain();
    let content = document.getElementById('content');
    showSideAndHead();
    content.innerHTML = JoinAbout.legalNoticeContent();
    setActiveStyles('legal', 'rgba(9, 25, 49, 1)', '#A8A8A81');
}


function addTaskPage() {
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
    setActiveStyles('addTaskActive', 'rgba(9, 25, 49, 1)');
    setActiveStyles('responActiveAddTask', 'rgba(9, 25, 49, 1)');
    changeCSSProperty();
}


function changeCSSProperty() {
    // document.getElementById('hiddenSubtask').style.marginBottom = '80px';
    document.getElementById('containerShortName').style.position = 'absolute';
    document.getElementById('containerShortName').style.bottom = '200px';
    // document.getElementById('showSubtask').style.marginBottom = '80px';
    document.getElementById('styleAddTask').style.marginBottom = '180px';
    document.getElementById('addtaskButton').style.position = 'absolute';
    document.getElementById('addtaskButton').style.left = '935px';
    document.getElementById('addtaskButton').style.bottom = '35px';
}

