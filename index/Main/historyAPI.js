window.onpopstate = function(event) {
    if (event.state){
        if (event.state.page === 'summary') {
            summeryPage()
          // Hier kannst du den Code ausführen, um zum vorherigen Schritt zu wechseln
        } 
        else if (event.state.page === 'Board') {
            boardPage()
        }
        else if (event.state.page === 'help') {
            helpPage()
        }
        else if (event.state.page === 'privacy') {
            privacyPage()
        }
        else if (event.state.page === 'legal') {
            legalPage()
        }
        else if (event.state.page === 'login') {
            startPage2()
        }
        else if (event.state.page === 'signup') {
            signUp()
        }
        else if (event.state.page === 'addTask') {
            addTaskPage()
        }
        else if (event.state.page === 'Contacts') {
            addTaskPage()
        }

    }
};
function setState(x){
    const state = {page: `${x}`};
    const title = `${x}`;
    const url = `${x}.html`;
    history.pushState(state, title,url)
    
}