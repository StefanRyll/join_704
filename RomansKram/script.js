class Task{
    constructor(creator, title,  desc, date = "No need", prio, Categroy ) {
        this.creator =creator;
        this.title = title;
        this.worker = [];
        this.desc = desc;
        this.date = date;
        this.prio = prio;
        this.Categroy = Categroy;
        this.subTasks = [];
    }
}
let tasklist = [];
function createTask(){
    const title = document.getElementById("addTaskTitle").value;
    const desc = document.getElementById("addTaskDescription").value;
    const date = document.getElementById("addTaskDescription").value;
    const prio = getPrio();
    const category = document.getElementById('addTaskCategory').value;
    let newTask = new Task(title, desc, date, prio, category);
    tasklist.push(newTask)
    console.log("Prio = " + prio);
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