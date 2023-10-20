class Task {
    constructor(title, worker, desc, date, prio = "Wichtig", Categroy, subTasks) {
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = new Date(date);
        this.prio = prio;
        this.Categroy = Categroy;
        this.todo = false;
        this.progress = false;
        this.feedback = false;
        this.done = false;
        this.subTasks = subTasks;
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
    switchStatus(x = 0) {
        if (x == "1") {
            this.todo = false;
            this.progress = true;
            this.feedback = false;
            this.done = false;
        } else if (x == "2") {
            this.todo = false;
            this.progress = false;
            this.feedback = true;
            this.done = false;
        } else if (x == "3") {
            this.todo = false;
            this.progress = false;
            this.feedback = false;
            this.done = true;
        } else {
            this.todo = true;
            this.progress = false;
            this.feedback = false;
            this.done = false;
        }

    }

}
