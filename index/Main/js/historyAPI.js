/**
 * Handles the window popstate event to navigate between pages based on the state.
 * @param {object} event - The popstate event object.
 */

// window.onpopstate = function(event) {
//     if (event.state) {
//         const pageFunctions = {
//             'summary': summeryPage,
//             'Board': boardPage,
//             'help': helpPage,
//             'Privacy Policy': privacyPage,
//             'Legal': legalPage,
//             'login': startPage2,
//             'signup': signUp,
//             'addTask': addTaskPage,
//             'Contacts': addTaskPage
//         };

//         const selectedPageFunction = pageFunctions[event.state.page];

//         if (selectedPageFunction) {
//             selectedPageFunction();
//         }
//     }
// }
// window.onpopstate = function(event) {
//     if (event.state) {
//         if (event.state.page === 'summary') {
//             await summeryPage();
//         } else if (event.state.page === 'Board') {
//             await boardPage()
//         } else if (event.state.page === 'help') {
//             helpPage()
//         } else if (event.state.page === 'Privacy Policy') {
//             privacyPage()
//         } else if (event.state.page === 'Legal') {
//             legalPage()
//         } else if (event.state.page === 'login') {
//             startPage2()
//         } else if (event.state.page === 'signup') {
//             signUp()
//         } else if (event.state.page === 'addTask') {
//             addTaskPage()
//         } else if (event.state.page === 'Contacts') {
//             addTaskPage()
//         }
//     }
// }



function setState(x) {
    // let state = {page: `${x}`};
    let title = `${x}`;
    // let url = `${x.toLowerCase()}.html`;
    // history.pushState(state, title, url)
    document.title = "Join - " + capitalizeFirstLetter(title)
    return x;
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}