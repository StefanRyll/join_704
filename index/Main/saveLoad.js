async function saveAccounts(){
  const accounts = Join.accounts;
  await fetch('saveAccounts.php', {
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

}
async function saveTasks(){
  const tasks = Join.tasks;
  await fetch('saveTaks.php', {
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
  Join.tasks = responseAsJson;
}
function saveAll(){
  saveAccounts();
  saveTasks();
  console.log("Data saved");
}
function loadAll(){
  Join.accounts = loadAccounts();
  Join.tasks = loadTasks();
  console.log("Data load");
}