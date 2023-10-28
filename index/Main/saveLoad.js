const STORAGE_TOKEN = "SSLOEY6VSHKBCAMT1R3MQGZLOIZ7TTBF66BZZQUS";
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const MY_BACKEND_ACC = 'http://roman-schroeder.developerakademie.net/Join/saveAccounts.php'
const MY_BACKEND_TAS = 'http://roman-schroeder.developerakademie.net/Join/saveTasks.php'

async function saveAccounts(){
  const accounts = Join.accounts;
  await fetch(MY_BACKEND_ACC, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accounts)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Optional: Verarbeite die Antwort vom Server
    })
    .catch(error => {
      console.error('Fehler beim Senden der Daten:', error);
    });

}
async function saveTasks(){
  const tasks = Join.tasks;
  await fetch(MY_BACKEND_TAS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tasks)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Optional: Verarbeite die Antwort vom Server
    })
    .catch(error => {
      console.error('Fehler beim Senden der Daten:', error);
    });

}
async function loadAccounts(){
  let response = await fetch('./saves/Accounts.json')
  let responseAsJson = await response.json();
  let loadedAccounts = decodeAccounts(responseAsJson)
  Join.accounts = loadedAccounts;
  console.log("Accounts geladen");
}
async function loadTasks(){
  let response = await fetch('./saves/Tasks.json')
  let responseAsJson = await response.json();
  console.log("Load Tasks : ", responseAsJson);
  let loadedTasks = decodeTasks(responseAsJson)
  Join.tasks = loadedTasks;
  console.log("Tasks geladen");

}

// Junus Variante
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
  .then(res => res.json());
}
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json());
}
// Decodieren

function decodeTasks(responseAsJson){
  let decTasks = [];
  for (let i = 0; i < responseAsJson.length; i++) {
    const taskData = responseAsJson[i];
    let title = taskData['title'];
    let category = taskData['Categroy'];
    let date = new Date(taskData['Categroy']);
    let desc = taskData['desc'];
    let done = taskData['done'];
    let feedback = taskData['feedback'];
    let prio = taskData['prio'];
    let progress = taskData['progress'];
    let subTasks = ()=>{
      let subTask = [];
      for (let i = 0; i < taskData['subTasks'].length; i++) {
        const subtaskDecodet = taskData['subTasks'][i];
        let name = subtaskDecodet['name'];
        let done = subtaskDecodet['done'];
        let newSubtask = new Subtask(name, done);
        subTask.push(newSubtask);
      }
      return subTask;
    }

    let todo = taskData['todo'];
    let worker = ()=>{
      let workers = []
      for (let y = 0; y < taskData['worker'].length; y++) {
        const workerContact = taskData['worker'][y];
        let name = workerContact['name']
        let email = workerContact['email']
        let tel = workerContact['tel']
        let newContact = new Contact(name, email, tel)
        workers.push(newContact)
      }
      return workers;
    };
    let newTask = new Task(title, worker, desc, date, prio, category, subTasks, todo, progress,feedback,done)
    decTasks.push(newTask)
  }
  return decTasks;
}
function decodeAccounts(responseAsJson){
  let decAccounts = []
  for (let i = 0; i < responseAsJson.length; i++) {
    const accountData = responseAsJson[i];
    if (accountData['password']){
      let name = accountData['name']
      let email = accountData['email']
      let tel = accountData['tel']
      let password = accountData['password']
      let newAccount = new Account(name, email,tel,password)
      decAccounts.push(newAccount)
    }else{
      let name = accountData['name']
      let email = accountData['email']
      let tel = accountData['tel']
      let newContact = new Contact(name, email,tel)
      decAccounts.push(newContact)
    }

  }
  return decAccounts
}