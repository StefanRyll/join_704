/**
 * Constant for the storage token.
 * @constant {string}
 */
const STORAGE_TOKEN = "SSLOEY6VSHKBCAMT1R3MQGZLOIZ7TTBF66BZZQUS";

/**
 * Constant for the storage URL.
 * @constant {string}
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Constant for the backend URL to save accounts.
 * @constant {string}
 */
const MY_BACKEND_ACC = 'http://roman-schroeder.developerakademie.net/Join/php/saveAccounts.php';

/**
 * Constant for the backend URL to save tasks.
 * @constant {string}
 */
const MY_BACKEND_TAS = 'http://roman-schroeder.developerakademie.net/Join/php/saveTasks.php';

/**
 * Key for storing accounts in local storage.
 * @constant {string}
 */
const accountsKey = 'joinAccounts';

/**
 * Key for storing tasks in local storage.
 * @constant {string}
 */
const tasksKey = 'joinTask';
/**
 * Asynchronously saves accounts data to local storage.
 * @async
 * @function
 */
async function saveAccounts() {
    const accounts = Join.accounts;
    await setItem(accountsKey, accounts);
    // Commentare bleiben für den Fall dass php Verwendet
    // await fetch(MY_BACKEND_ACC, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(accounts)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data); // Optional: Verarbeite die Antwort vom Server
    //   })
    //   .catch(error => {
    //     console.error('Fehler beim Senden der Daten:', error);
    //   });
}
/**
 * Asynchronously saves tasks to local storage.
 * @async
 * @function
 */
async function saveTasks() {
    const tasks = Join.tasks;
    try {
        await setItem(tasksKey, tasks)
    } catch (e) {
        console.error(e);
    }
    //  await fetch(MY_BACKEND_TAS, {
    // method: 'POST',
    // headers: {
    // 'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(tasks)
    //  })
    // .then(response => response.json())
    // .then(data => {
    // console.log(data); // Optional: Verarbeite die Antwort vom Server
    // })
    // .catch(error => {
    // console.error('Fehler beim Senden der Daten:', error);
    // });
    return null
}
/**
 * Asynchronously loads accounts from local storage.
 * @async
 * @function
 */
async function loadAccounts() {
    let responseAsJson = await getItem(accountsKey)
    let parsedResponse = await JSON.parse(responseAsJson['data']['value'])
    let loadedAccounts = decodeAccounts(parsedResponse)
    Join.accounts = loadedAccounts.sort((a, b) => a.name.localeCompare(b.name));
}
/**
 * Asynchronously loads tasks from local storage.
 * @async
 * @function
 * @returns {null}
 */
async function loadTasks() {
    // let response = await fetch('./saves/Tasks.json')
    let responseAsJson = await getItem(tasksKey)
    let parsedResponse = await JSON.parse(responseAsJson['data']['value'])
    let loadedTasks = decodeTasks(parsedResponse)
    Join.tasks = loadedTasks;
    return null
}
/**
 * Asynchronously sets an item in remote storage.
 * @async
 * @function
 * @param {string} key - The key for the item.
 * @param {any} value - The value to be stored.
 * @returns {Promise} - A Promise that resolves to the result of the storage operation.
 */
async function setItem(key, value) {
  const payload = {key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}
/**
 * Asynchronously retrieves an item from remote storage.
 * @async
 * @function
 * @param {string} key - The key of the item to be retrieved.
 * @returns {Promise} - A Promise that resolves to the retrieved item.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json());
}
/**
 * Decodes a JSON representation of tasks and creates an array of Task objects.
 * @function
 * @param {Object} responseAsJson - JSON representation of tasks.
 * @returns {Array} - An array of Task objects.
 */

/**
 * Decodes a JSON representation of accounts and creates an array of Account or Contact objects.
 * @function
 * @param {Object} responseAsJson - JSON representation of accounts.
 * @returns {Array} - An array of Account or Contact objects.
 */
function decodeTasks(responseAsJson) {
    return responseAsJson.map(taskData => {
        let {
            title,
            Category: category,
            date,
            desc,
            todo,
            done,
            feedback,
            prio,
            progress,
            subTasks: rawSubTasks,
            worker: rawWorkers
        } = taskData;
        const subTasks = rawSubTasks.map(subtask => new Subtask(subtask.text, subtask.done));
        const workers = rawWorkers.map(worker => new Contact(worker.name, worker.email, worker.tel));
        return new Task(title, workers, desc, new Date(date), prio, category, subTasks, todo, progress, feedback, done);
    });
}
/**
 * Processes a list of account data in JSON format and creates a list of account or contact objects.
 * 
 * @param {Array} responseAsJson - A list of account data in JSON format. Each element in this list
 *                                 is an object with properties name, email, tel, and an optional password.
 *
 * @returns {Array} A list of account or contact objects. For each element in the input list:
 *                   - If a password is present, an Account object is created.
 *                   - If no password is present, a Contact object is created.
 */
function decodeAccounts(responseAsJson) {
    return responseAsJson.map(accountData => {
        const { name, email, tel, password } = accountData;

        if (password) {
            return new Account(name, email, tel, password);
        } else {
            return new Contact(name, email, tel);
        }
    });
}
/**
 * Saves a signed user's data to the local storage.
 * 
 * @param {object} Join.signedAccount - The signed user's account data to be saved.
 */
function saveSignedUser(){
    let payloadSignedUser = JSON.stringify(Join.signedAccount);
    localStorage.setItem("signedAccount", payloadSignedUser);
}
/**
 * Loads the signed user's data from local storage and returns the corresponding account object.
 * 
 * @returns {object|null} The signed user's account object, or null if no signed user data is found.
 */
function loadSignedUser() {
    let SignedUserAsJSON = JSON.parse(localStorage.getItem("signedAccount"))
    if (SignedUserAsJSON !== null){
        let name = SignedUserAsJSON['name'];
        let account = Join.accounts.filter(a => a.name === name);
        if (account.length === 0 && name === 'Guest'){
            account = new Account("Guest", "email@join.de", "");

        }else if (account.length > 0){
            account = account[0]
        }else {
            account = null;
        }
        return account    
    }
    return null;
}
/**
 * Deletes the signed user's data from local storage.
 */
function deleteSignedUser(){
    localStorage.removeItem('signedAccount');
}



// function decodeTasks(responseAsJson) {
//     let decTasks = [];
//     for (let i = 0; i < responseAsJson.length; i++) {
//         const taskData = responseAsJson[i];
//         let title = taskData['title'];
//         let category = taskData['Category'];
//         let date = new Date(taskData['date']);
//         let desc = taskData['desc'];
//         let todo = taskData['todo'];
//         let done = taskData['done'];
//         let feedback = taskData['feedback'];
//         let prio = taskData['prio'];
//         let progress = taskData['progress'];
//         let subTasks = () => {
//             let subTask = [];
//             for (let i = 0; i < taskData['subTasks'].length; i++) {
//                 const subtaskDecodet = taskData['subTasks'][i];
//                 let name = subtaskDecodet['text'];
//                 let done = subtaskDecodet['done'];
//                 let newSubtask = new Subtask(name, done);
//                 subTask.push(newSubtask);
//             }
//             return subTask;
//         }
//         let worker = () => {
//             let workers = []
//             for (let y = 0; y < taskData['worker'].length; y++) {
//                 const workerContact = taskData['worker'][y];
//                 let name = workerContact['name'];
//                 let email = workerContact['email'];
//                 let tel = workerContact['tel'];
//                 let newContact = new Contact(name, email, tel)
//                 workers.push(newContact)
//             }
//             return workers;
//         };
//         let newTask = new Task(title, worker(), desc, date, prio, category, subTasks(), todo, progress, feedback, done)
//         decTasks.push(newTask)
//     }
//     return decTasks;
// }

// function decodeAccounts(responseAsJson) {
//     let decAccounts = []
//     for (let i = 0; i < responseAsJson.length; i++) {
//         const accountData = responseAsJson[i];
//         if (accountData['password']) {
//             const name = accountData['name']
//             const email = accountData['email']
//             const tel = accountData['tel']
//             const password = accountData['password']
//             const newAccount = new Account(name, email, tel, password)
//             decAccounts.push(newAccount)
//         } else {
//             let name = accountData['name']
//             let email = accountData['email']
//             let tel = accountData['tel']
//             let newContact = new Contact(name, email, tel)
//             decAccounts.push(newContact)
//         }
//     }
//     return decAccounts
// }