class Task{
    constructor(creator, title, worker, desc, date = "No need", prio, Category ) {
        this.creator = creator;
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = date;
        this.prio = prio;
        this.Category = Category;
        this.subTasks = [];
    }
}
let tasklist = [];
function createTask(){
    const creator = "Ich";
    const title = document.getElementById("addTaskTitle").value;
    const worker = document.getElementById('assignTaskToContacts').value;
    const desc = document.getElementById("addTaskDescription").value;
    const date = document.getElementById("addTaskDescription").value;
    const prio = getPrio();
    const category = document.getElementById('addTaskCategory').value;
    let newTask = new Task(creator, title, worker, desc, date, prio, category);
    tasklist.push(newTask)
    console.log(newTask);
}

function getPrio(){
    let prio = document.getElementsByName('prio');
    for (let i = 0; i < prio.length; i++) {
        if (prio[i].checked){
            return prio[i].value;
        }
    }
}

function logEnding(x){
    console.log(x);
}