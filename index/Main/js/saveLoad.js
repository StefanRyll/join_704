// saveLoad.js

// Firestore configuration
const TASKS_COLLECTION = "tasks";
const TASKS_DOCUMENT = "allTasks";
const CONTACTS_COLLECTION = "contacts";
const CONTACTS_DOCUMENT = "allContacts";

function serializeContacts(contacts) {
  return contacts.map((contact) => ({
    name: contact.name,
    email: contact.email,
    tel: contact.tel,
  }));
}

function decodeContacts(contacts) {
  return contacts.map(
    (contact) => new Contact(contact.name, contact.email, contact.tel),
  );
}

async function initializeDummyContacts() {
  const response = await fetch("./data/dummyContacts.json");
  const dummyContacts = await response.json();

  Join.accounts = decodeContacts(dummyContacts);

  await saveAccounts();
}

/**
 * Saves contacts to Firestore.
 * @async
 */
async function saveAccounts() {
  try {
    const contactsDocument = window.firestoreDoc(
      window.db,
      CONTACTS_COLLECTION,
      CONTACTS_DOCUMENT,
    );

    await window.firestoreSetDoc(contactsDocument, {
      contacts: serializeContacts(Join.accounts),
      updatedAt: new Date().toISOString(),
    });

    console.log("Contacts saved to Firestore");
  } catch (error) {
    console.error("Error saving contacts:", error);
    throw error;
  }
}

/**
 * Loads contacts from Firestore and updates the application state.
 * @async
 */
async function loadAccounts() {
  try {
    const contactsDocument = window.firestoreDoc(
      window.db,
      CONTACTS_COLLECTION,
      CONTACTS_DOCUMENT,
    );

    const contactsSnapshot = await window.firestoreGetDoc(contactsDocument);

    if (!contactsSnapshot.exists()) {
      Join.accounts = [];
      console.log("No contacts found in Firestore");
      return;
    }

    const firestoreData = contactsSnapshot.data();

    Join.accounts = decodeContacts(firestoreData.contacts).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    console.log("Contacts loaded from Firestore:", Join.accounts);
  } catch (error) {
    console.error("Error loading contacts:", error);
    Join.accounts = [];
  }
}

/**
 * Saves tasks to Firestore.
 * @async
 */
async function saveTasks() {
  try {
    const taskDocument = window.firestoreDoc(
      window.db,
      TASKS_COLLECTION,
      TASKS_DOCUMENT,
    );

    await window.firestoreSetDoc(taskDocument, {
      tasks: serializeTasks(Join.tasks),
      updatedAt: new Date().toISOString(),
    });

    console.log("Tasks saved to Firestore");
  } catch (error) {
    console.error("Error saving tasks:", error);
    throw error;
  }
}

/**
 * Loads tasks from Firestore and updates the application state.
 * @async
 */
async function loadTasks() {
  try {
    const taskDocument = window.firestoreDoc(
      window.db,
      TASKS_COLLECTION,
      TASKS_DOCUMENT,
    );

    const taskSnapshot = await window.firestoreGetDoc(taskDocument);

    if (!taskSnapshot.exists()) {
      Join.tasks = [];
      console.log("No tasks found in Firestore");
      return;
    }

    const firestoreData = taskSnapshot.data();

    Join.tasks = decodeTasks(firestoreData.tasks);

    console.log("Tasks loaded from Firestore:", Join.tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    Join.tasks = [];
  }
}

function normalizeTaskDate(date) {
  if (date?.toDate) {
    return date.toDate();
  }

  return new Date(date);
}

/**
 * Decodes tasks from JSON into Task objects.
 * @param {Array} jsonData - JSON array representing tasks.
 * @returns {Array<Task>} - Array of Task objects.
 */
function decodeTasks(jsonData) {
  return jsonData.map(
    ({
      title,
      Category: category,
      date,
      desc,
      todo,
      done,
      feedback,
      prio,
      progress,
      subTasks,
      worker,
    }) => {
      const subTaskObjects = subTasks.map(
        (st) => new Subtask(st.text, st.done),
      );
      const workerObjects = worker.map(
        (w) => new Contact(w.name, w.email, w.tel),
      );
      return new Task(
        title,
        workerObjects,
        desc,
        normalizeTaskDate(date),
        prio,
        category,
        subTaskObjects,
        todo,
        progress,
        feedback,
        done,
      );
    },
  );
}

async function initializeDummyTasks() {
  const response = await fetch("./data/dummyTasks.json");
  const dummyTasks = await response.json();

  Join.tasks = decodeTasks(dummyTasks);

  await saveTasks();
}

function serializeTasks(tasks) {
  return tasks.map((task) => {
    return {
      title: task.title,
      Category: task.Category,
      date: task.date,
      desc: task.desc,
      todo: task.todo,
      done: task.done,
      feedback: task.feedback,
      prio: task.prio,
      progress: task.progress,
      subTasks: task.subTasks.map((st) => ({ text: st.text, done: st.done })),
      worker: task.worker.map((w) => ({
        name: w.name,
        email: w.email,
        tel: w.tel,
      })),
    };
  });
}

async function resetDemoData() {
  await initializeDummyContacts();
  await initializeDummyTasks();
  console.log("Demo data successfully reset");
}

/**
 * Saves the signed user's data to local storage.
 */
function saveSignedUser() {
  const payload = JSON.stringify(Join.signedAccount);
  localStorage.setItem("signedAccount", payload);
}

/**
 * Loads the signed user's data from local storage.
 * @returns {Account|null} - The signed user's account or null if not found.
 */
function loadSignedUser() {
  const storedUserJson = localStorage.getItem("signedAccount");

  if (!storedUserJson) return null;

  const storedUser = JSON.parse(storedUserJson);
  const account = Join.accounts.find((a) => a.name === storedUser.name);

  if (account) return account;

  return storedUser.name === "Guest"
    ? new Account("Guest", "email@join.de", "")
    : null;
}

/**
 * Deletes the signed user's data from local storage.
 */
function deleteSignedUser() {
  localStorage.removeItem("signedAccount");
}
