function editTask(x) {
    let task = Join.tasks[x];
    let taskCard = document.getElementById("taskCard");
    taskCard.innerHTML = task.taskCardEdit(x);
    let AssignedUsers = task.worker;
    let JoinUsers = Join.accounts;
    changeCSSAttribute();
    for (let Worker of AssignedUsers) {
        let usersFound = JoinUsers.find((benutzer) => benutzer.email === Worker.email);
        if (usersFound) {
            usersFound.checked = true;
        }
    }

    let containerShortName = document.getElementById('containerShortName');
    containerShortName.innerHTML = '';
    for (let i = 0; i < task.worker.length; i++) {
        let assignedWorker = task.worker[i];
        containerShortName.innerHTML += assignedWorker.accountTag(i);
    }
    // Subtask
    for (let i = 0; i < task.subTasks.length; i++) {
        let oldSubtask = task.subTasks[i];
        subtaskTemp.push(oldSubtask);
    }
    renderSubtasks()
    prioTemp = task.prio;
    if (task.prio === "Urgent") {
        document.getElementById("btnUrgentWhite").click();
    } else if (task.prio === "Low") {
        document.getElementById("btnLowWhite").click();
    } else if (task.prio === "Medium") {
        document.getElementById("btnMediumWhite").click();
    }
    prioTemp = task.prio;

    // Eventlistener
    let urgent = document.getElementById('btnUrgentWhite');
    let medium = document.getElementById('btnMediumWhite');
    let low = document.getElementById('btnLowWhite');
    urgent.addEventListener('click', () => {
        prioTemp = "Urgent";
    })
    low.addEventListener('click', () => {
        prioTemp = "Low";
    })
    medium.addEventListener('click', () => {
        prioTemp = "Medium";
    })
}


function changeCSSAttribute() {
    let createTask = document.getElementById('createNewSubtask');
    document.getElementById('selectContacts').classList.add('w-29');
    document.getElementById('hiddenSubtask').classList.add('w-29');
    document.getElementById('prioCategoryContainer').classList.add('w-29');
    document.getElementById('showContactsContainer').classList.add('w-29');
    document.getElementById('showSubtask').classList.add('w-29');
    document.getElementById('assignedToContacts').classList.add('w-29');
    document.getElementById('styleAddTask').style.marginBottom = '0';
    document.getElementById('closeContacts').style.position = 'relative';
    document.getElementById('assignedToContacts').style.padding = '0';
    document.getElementById('assignedToBottom').classList.add('w-29');
    createTask.style.position = 'relative';
    createTask.style.width = '94%';
    let createNewSubtask = document.querySelector('.create-subtask ul');
    if (createNewSubtask) {
        createNewSubtask.style.width = '100%';
    }

    let mq = window.matchMedia("(max-width: 520px)");
    if (mq.matches) {
        createNewSubtask.style.width = '100%';
        createTask.style.width = '100%';
    }
}


function assignedCheck(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.remove('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.add('d-none');
    Join.accounts[x].checked = false;
    renderTaskContacts()
}


function assignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
    Join.accounts[x].checked = true;
    renderTaskContacts()

}


function showAssignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
}


function addNewContact() {
    document.getElementById('closeContacts').classList.add('d-none');
    document.getElementById('selectContacts').classList.remove('d-none');
}


function addShortNames(name, x) {
    renderShortNames(name, x);
}


function renderShortNames(name, x) {
    let container = document.getElementById('containerShortName');
    container.innerHTML += JoinBoard.generateHTMLRenderShortNames(name, x);
}


function removeShortNames(x) {
    let removeName = document.getElementById(`editShortNames${x}`);
    let removeShortNames = document.getElementById(`removeShortName${x}`);
    if (removeName) {
        removeName.remove();
    } else {
        removeShortNames.remove();
    }
}


function filterContactNames() {
    let search = document.getElementById('searchContacts').value;
    search = search.toLowerCase();

    let list = document.getElementById('taskContactList');
    list.innerHTML = '';

    for (let p = 0; p < Join.accounts.length; p++) {
        let name = Join.accounts[p]['name'];

        if (name.toLowerCase().includes(search)) {
            list.innerHTML += Join.accounts[p].tinyCardCheck(p);
        }
    }
}