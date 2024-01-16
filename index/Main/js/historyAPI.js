/**
 * Handles the window popstate event to navigate between pages based on the state.
 * @param {object} event - The popstate event object.
 */
window.onpopstate = function(event) {
    if (event.state) {
        if (event.state.page === 'summary') {
            summeryPage();
        } else if (event.state.page === 'Board') {
            boardPage()
        } else if (event.state.page === 'help') {
            helpPage()
        } else if (event.state.page === 'Privacy Policy') {
            privacyPage()
        } else if (event.state.page === 'Legal') {
            legalPage()
        } else if (event.state.page === 'login') {
            startPage2()
        } else if (event.state.page === 'signup') {
            signUp()
        } else if (event.state.page === 'addTask') {
            addTaskPage()
        } else if (event.state.page === 'Contacts') {
            addTaskPage()
        }
    }
}

// Beispiel, wie setState aussehen könnte
function setState(newState) {
    console.log("Setze den Zustand auf:", newState);
    // Hier kannst du den Zustand ändern oder weitere Aktionen ausführen
}

function setState(x) {
    let state = { page: `${x}` };
    let title = `${x}`;
    let url = `${x.toLowerCase()}.html`;
    history.pushState(state, title, url)
    document.title = "Join - " + capitalizeFirstLetter(title)
    saveState()
    return x;
}
function saveState(){
    let actualState = history.state['page']
    localStorage.setItem('state', actualState)
}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}