// Constants for storage configuration
const STORAGE_TOKEN = "SSLOEY6VSHKBCAMT1R3MQGZLOIZ7TTBF66BZZQUS";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
const ACCOUNTS_KEY = "joinAccounts";
const TASKS_KEY = "joinTask";

/**
 * Saves accounts to remote storage.
 * @async
 */
async function saveAccounts() {
  await setItem(ACCOUNTS_KEY, Join.accounts);
}

/**
 * Saves tasks to remote storage.
 * @async
 */
async function saveTasks() {
  try {
    await setItem(TASKS_KEY, Join.tasks);
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

/**
 * Loads accounts from remote storage and updates the application state.
 * @async
 */
async function loadAccounts() {
  const response = await getItem(ACCOUNTS_KEY);
  const parsedData = parseStorageValue(response, ACCOUNTS_KEY);
  const decodedAccounts = decodeAccounts(parsedData);
  Join.accounts = decodedAccounts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Loads tasks from remote storage and updates the application state.
 * @async
 */
async function loadTasks() {
  const response = await getItem(TASKS_KEY);
  const parsedData = parseStorageValue(response, TASKS_KEY);
  const decodedTasks = decodeTasks(parsedData);
  Join.tasks = decodedTasks;
}

/**
 * Stores an item in remote storage.
 * @param {string} key - Key under which the item is stored.
 * @param {any} value - Data to be stored.
 * @returns {Promise<Object>} - The server response.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };

  const response = await fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to save ${key}: ${response.status}`);
  }

  return response.json();
}

/**
 * Retrieves an item from remote storage.
 * @param {string} key - Key of the item to be retrieved.
 * @returns {Promise<Object>} - The retrieved item.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${key}: ${response.status}`);
  }

  return response.json();
}

/**
 * Parses and validates data returned from remote storage.
 * @param {Object} response - Response object from remote storage.
 * @param {string} key - Storage key used for error reporting.
 * @returns {Array|Object} Parsed storage data.
 * @throws {Error} If no storage value is found.
 */
function parseStorageValue(response, key) {
  if (!response?.data?.value) {
    throw new Error(`No storage value found for ${key}`);
  }

  return JSON.parse(response.data.value);
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
        new Date(date),
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

/**
 * Decodes accounts from JSON into Account or Contact objects.
 * @param {Array} jsonData - JSON array representing accounts.
 * @returns {Array<Account|Contact>} - Array of Account or Contact objects.
 */
function decodeAccounts(jsonData) {
  return jsonData.map(({ name, email, tel, password }) =>
    password
      ? new Account(name, email, tel, password)
      : new Contact(name, email, tel),
  );
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
