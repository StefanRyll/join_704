class Page {
    constructor() {
        this.accounts = [];
        this.signedAccount = null;
        this.tasks = [];
    }
    // Methoden
    sayDaytime() {
        let datum = new Date();
        let daytime = datum.getHours()
        if (daytime <= 23 && daytime >= 18) {
            return "Good&nbsp;Evening";
        } else if (daytime >= 6 && daytime <= 12) {
            return "Good&nbsp;Morning";
        } else if (daytime >= 0 && daytime <= 5) {
            return "Good&nbsp;Night"
        } else {
            return "Good&nbsp;Afternoon";
        }
    }
    logInContent() {
        return /*html*/ `
        `
    }
    startAnimation() {
        body.innerHTML = "";
        return /*html*/ `

        `
    }
    logoLogin() {
        return /*html*/ `

        `
    }
    pageLayoutMain() {
        body.innerHTML = "";
        return /*html*/ `
        `
    }
    loginLayout() {
        return /*html*/ `
        `
    }
    SideAndHead() {
        return /*html*/ `
        `
    }
    signUpWindow() {
        return /*html*/ `
        `
    }
    forceSignIn(x) {
        this.signedAccount = x;
    }
    summeryContent() {
        let daytime = this.sayDaytime()
        let doneTasks = this.checkTasksDone()
        return /*html*/ `
            `
    }
    checkTasksDone() {
        let count = 0
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.done == true) {
                count++
            }

        }
        return count;
    }
    boardContent() {
        return /*html*/ `
            `
    }
    renderTaskTodo(){
        let kambanTodo = document.getElementById('kambanTodo')
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            console.log(task);
            kambanTodo.innerHTML += task.tinyTaskCard()
            
        }
    }
    helpContent() {
        return /*html*/ `
        `
    }
    privacyContent() {
        return /*html*/ `
        `
    }
    legalNoticeContent() {
        return /*html*/ `
        `
    }
    renderAddTask() {
        let addTask = document.getElementById('addTask');
        addTask.innerHTML = '';
        addTask.innerHTML += this.generateHTMLaddTask();
    }
    generateHTMLaddTask() {
        return /*html*/`
          `
    }
    generateHTMLaddTaskWindow() {
        return /*html*/`
          `
    }
    generateHTMLLeftSide() {
        return /*html*/`
          `
    }
    generateHTMLTitle() {
        return /*html*/`
        `
    }
    generateHTMLDescription() {
        return /*html*/`
        `
    }
    generateHTMLAssignedTo() {
        return /*html*/`
        `
    }
    generateHTMLSelectContactsToogleFunction() {
        return /*html*/`
        `
    }
    generateHTMLCheckbox() {
        return /*html*/`
        `
    }
    generateHTMLAddToContactButton() {
        return /*html*/`
        `
    }
    generateHTMLSeperator() {
        return /*html*/`
        `
    }
    generateHTMLRightSide() {
        return /*html*/`
          `
    }
    generateHTMLDateForm() {
        return /*html*/`
      `
    }
    generateHTMLPrioCategory() {
        return /*html*/`
          `
    }
    generateHTMLUrgent() {
        return /*html*/`
  `
    }
    generateHTMLMedium() {
        return /*html*/`
        `
    }
    generateHTMLPrio() {
        return /*html*/`
`
}
    generateHTMLCategory() {
        return /*html*/`
        `
    }
    generateHTMLHiddenCategory() {
        return /*html*/`
        `
    }
    generateHTMLShowCategory() {
        return /*html*/`
        `
    }
    generateHTMLToggleCategory() {
        return /*html*/`
        `
    }
    generateHTMLSelectCategory() {
        return /*html*/`
        `
    }
    generateHTMLSubtask() {
        return /*html*/`
        `
    }
    
    generateHTMLAddSubtask() {
        return /*html*/`
        `
    }
    
    generateHTMLButtons() {
        return /*html*/`
        `
    }

    generateHTMLCloseButtonInSVG() {
        return /*html*/`
          `
    }
    closeAddTask() {
        slideAddTask = document.getElementById('slideAddTask').classList.remove('show-bg-task');
    }


}
class Account {
    constructor(name, email, password, tel) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tel = tel;
        this.contacts = [];
        this.shortname = this.name.charAt(0)

    }
    tinyCard() {
        return /*html*/ `
        <div class="tinyAccountCard">
            <div class="accountTag">${this.shortname}</div>
            <div>${this.name}</div>
        </div>
        `
    }
    tinyCardCheck(x) {
        return /*html*/ `
        <div class="tinyAccountCard">
            <div class="accountTag">${this.shortname}</div>
            <div>${this.name}</div>
            <input type="checkbox" name="" id="ac${x}">
        </div>
        `
    }
    accountTag() {
        return /*html*/ `
            <div class="accountTag">${this.shortname}</div>

        `
    }
    addTel(x) {
        this.tel = x;
    }
    addTask(x) {
        this.tasks.push(x);
    }
    addContact(x) {
        this.contacts.push(x);
    }
}
class Task {
    constructor(title, worker, desc, jahr, monat, tag, prio = "Wichtig", Categroy) {
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = new Date(jahr, monat - 1, tag);
        this.prio = prio;
        this.Categroy = Categroy;
        this.done = false;
        this.subTasks = [];
    }
    taskCardNormal() {
        let html = /*html*/ `
            </div>
            <h1>${this.title}</h1>
            <p>${this.desc}</p>
            <div class="taskCardAttribute">
                <p>Date Due: </p>
                <p>${this.date}</p>
            </div>
            <div class="taskCardAttribute">
                <p>Priority: </p>
                <p>${this.prio}</p>
            </div>
            <div class="taskCardAssignment">
                <p>Assigned to: </p>`

        for (let i = 0; i < this.worker.length; i++) {
            const worker = this.worker[i];
            html += worker.tinyCard()
        }
        html += /*html*/ `
        <div id="taskCardAssinedList"></div>
            </div >
            <div class="taskCardSubtasks">
                <p>Subtasks</p>
                <div id="subtasksList">
                    `
        for (let j = 0; j < this.subTasks.length; j++) {
            const subTask = this.subTasks[j];
            html += subTask;
        }
        html = /*html*/ `        
                </div>
            </div>
            <div class="taskCardFooter">
                <div class="deleteBtn"></div>
                <div class="editBtn"></div>
            </div>
        `
        return html;
    }
    taskCardEdit() {
        return /*html*/ `
            < div class="taskCardHeader" >
                <div></div>
                <div class="taskCardHeaderClose">X</div>
            </div >
            <form class="editTask" onsubmit="taskSaveChanges()">
                <label for="taskCardETitle">Titel:</label>
                <input type="text" id="taskCardETitle">
                    <label for="taskCardEDesc">Description:</label>
                    <textarea cols="30" rows="10" id="taskCardEDesc"></textarea>
                    <label for="taskCardEDate">Date Due:</label>
                    <input type="date" id="taskCardEDate">
                        <label for="">Assign to: </label>
                        <select name="" id="">
                            <div>
                                <div class="accountTag">AV</div>
                            </div>
                        </select>
                        <div>
                            <div class="accountTag">AV</div>
                        </div>
                        <div>
                            <button>Urgent</button>
                            <button>Medium</button>
                            <button>Low</button>
                        </div>
                        <label for="">Subtasks</label>
                        <input id="subtasks" type="text">
                            <button type="submit">Ok &checkmark;</button>
                        </form>


                        `
    }
    tinyTaskCard() {
        let html = /*html*/ `
            <div class="tinyTaskCard" draggable>
                <div>${this.Categroy}</div>
                <h1>${this.title}</h1>
                <p class="tinyTaskCardDescription">${this.desc.substring(0, 50)}</p>
                <div class="subtasks">
                    <div>Ladebalken</div>
                    <p>1/2 Subtasks</p>
                </div>
                <div>
                    <div>`
        for (let i = 0; i < this.worker.length; i++) {
            const worker = this.worker[i];
            html += worker.accountTag();

        }
        html += /*html*/ `
            </div>
                    <div>Prio Symbol</div>
                </div>
            </div>

        `
        return html;
    }
    editTask() {
        let taskCard = document.getElementById('taskCard')
        taskCard.innerHTML = this.taskCardEdit()
    }

}
class Subtask{
    constructor(name){
        this.name = name;
        this.done = false;
    }
    subTaskDone(){
        this.done = true;
    }
}