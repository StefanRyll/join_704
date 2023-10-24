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
async function loadAccounts(){
  let response = await fetch('./saves/Accounts.json')
  let responseAsJson = await response.json();
  Join.accounts = responseAsJson;
  console.log("Daten geladen");
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
async function loadTasks(){
  let response = await fetch('./saves/Tasks.json')
  let responseAsJson = await response.json();
  let loadedTasks = decodeTasks(responseAsJson)

  Join.tasks = loadedTasks;
  console.log("Daten geladen");

}
function saveAll(){
  saveAccounts();
  saveTasks();
  console.log("Data saved");
}
function loadAll(){
  loadAccounts();
  loadTasks();
  console.log("Data load");
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
    let subTasks = taskData['subTasks'];
    let todo = taskData['todo'];
    let worker = taskData['Categroy'];
    let newTask = new Task()

  }
  return decTasks;
}