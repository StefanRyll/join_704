class Task{
    constructor(creator, title,  desc, date = "No need", prio, Cathe ) {
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
    const prio = "Aber dalli!"; // Ersetzen wenn du weißt wie!
    let newTask = new Task(title, desc, date, prio );
    tasklist.push(newTask)
    console.log(tasklist);
}



function logEnding(x){
    console.log(x);
}