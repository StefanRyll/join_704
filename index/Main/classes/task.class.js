class Task {
    constructor(title, worker, desc, date, prio = "Wichtig", 
    Categroy, subTasks, todo = true, progress = false, feedback = false, done = false) {
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = new Date(date);
        this.prio = prio;
        this.Categroy = Categroy;
        this.subTasks = subTasks;
        this.todo = todo;
        this.progress = progress;
        this.feedback = feedback;
        this.done = done;
    }

    taskCardNormal(x) {
        let formatedDate = ()=>{
            // console.log("Date : ", date);
            let date = this.date;
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
            const year = date.getFullYear();
            let formatedDate = `${day}/${month}/${year}`;
            return formatedDate;
        };
        let formatedPrio = () =>{
            let iconSrc;
            if (this.prio === "Urgent"){
                iconSrc = "./IMG/prioUrgent.png"
            }else if(this.prio === "Medium"){
                iconSrc = "./IMG/prioMedium.png"
            }else{
                iconSrc = "./IMG/prioLow.png"
            }
            return iconSrc;
        }
        console.log(formatedPrio());
        let html = /*html*/ `
            
            <div id="taskCard" class="taskCard">
                <div class="taskCardHeader">
                    <div class="category-color">${this.Categroy}</div>
                    <div onclick="closeTaskCard()">
                    <svg class="close-button-card cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87491_5574)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
                </div>
                
                <h1>${this.title}</h1>
                <p>${this.desc}</p>

                <div class="taskCardAttribute">
                    <p>Date Due: </p>
                    <p>${formatedDate()}</p>
                </div>

                <div class="taskCardAttribute">
                    <p>Priority: </p>
                    <img src="${formatedPrio()}">
                </div>

                <div class="taskCardAssignment">
                    <p>Assigned to: </p>
                    <div id="taskCardAssinedList">`

                        for (let i = 0; i < this.worker.length; i++) {
                            const worker = this.worker[i];
                            html += worker.tinyCard()
                        }
        
        html += /*html*/ `
                    </div>
                </div >

                <div class="taskCardSubtasks">
                    <p>Subtasks</p>
                    <div class="subtask-list">
                        <div onclick="toggleCheckboxCard()" id="cardCheckboxFalse" class="checkBox"> <img src="./IMG/check_empty.svg" alt=""> </div>
                        <div onclick="toggleCheckboxCard()" id="cardCheckboxTrue" class="checkBox d-none"> <img src="./IMG/checkbox_check.svg" alt=""> </div>
                        <div id="subtasksList">
                    </div>
                        `
                    for (let j = 0; j < this.subTasks.length; j++) {
                        const subTask = this.subTasks[j];
                        html += subTask;
                    }
        html += /*html*/ `        
                    </div>
                </div>

                <div class="taskCardFooter">
                    <div class="deleteBtn"></div>
                    <div class="editBtn" onclick="editTask(${x})"></div>
                </div>
            </div>
        `
        return html;
    }
    taskCardEdit(x) {
        return /*html*/ `
            <div class="taskCardHeader" >
                <div></div>
                <div onclick="closeTaskCard()">
                    <svg class="close-button-card cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87491_5574)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
            </div>
            <form class="editTask" onsubmit="taskSaveChanges(${x})">
                <div class="style-task">
                <label for="taskCardETitle">Titel:</label>
                <input type="text" id="taskCardETitle">
                    <label for="taskCardEDesc">Description:</label>
                    <textarea cols="30" rows="10" id="taskCardEDesc"></textarea>
                    <label for="taskCardEDate">Date Due:</label>
                    <input type="date" id="taskCardEDate">
                        <label for="">Assign to: </label>
                        <div id="showContactsFromCard">
                        <div class="assignContactsCard">
                            <input onclick="openSelectContactsFromCard()" type="button" value="Select contacts to assign">
                            <img onclick="openSelectContactsFromCard()" src="./IMG/drop_down.svg" alt="">
                        </div>
                       </div>
                       <div id="closeContactsFromCard"  class="d-none">
                        <div class="assignContactsCard">
                            <input onclick="closeSelectContactsFromCard()" type="search">
                            <img onclick="closeSelectContactsFromCard()" src="./IMG/arrow_drop_up.svg" alt="">
                        </div>
                       </div>
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
                        </div>
                            <button type="submit">Ok &checkmark;</button>
                        </form>


                        `
    }
    tinyTaskCard(x = 0) {
        let html = /*html*/ `
            <div onclick="openTask(${x})" class="tinyTaskCard" draggable="true"  ondragstart="startDragging(${x})">
                <div class="tiny-task-category">${this.Categroy}</div>
                <div class="tiny-title">
                    <h1>${this.title}</h1>
                    <span class="tinyTaskCardDescription">${this.desc.substring(0, 50)}</span>
                </div>
                <div class="subtasks">
                    <div class="tiny-task-label">
                        <img id="progressBar" src="./IMG/Progress_bar.svg" alt="">
                        <p id="openTasksFromTiny">${this.subTasks.length}</p>
                    </div>
                </div>
                <div>
            <div>`
        for (let i = 0; i < this.worker.length; i++) {
            const worker = this.worker[i];
            html += worker.accountTag();

        }
        html += /*html*/ `
            </div>
                    <div>${this.prio}</div> 
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
    static fromJSON(data) {
        const {
          title,
          worker,
          desc,
          date,
          prio,
          Categroy,
          todo,
          progress,
          feedback,
          done,
          subTasks
        } = data;
    
        return new Task(
          title,
          worker,
          desc,
          date,
          prio,
          Categroy,
          subTasks
        );
    }
}
    
