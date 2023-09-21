class Task{
    constructor(creator = 'MrKnister', title, date =, desc, prio) {
        this.creator = creator;
        this.title = title;
        this.worker = [];
        this.date = date;
        this.desc = desc;
        this.prio = prio;
        this.Categroy = Categroy;
        this.subTasks = [];
    }
}

function logEnding(x){
    console.log(x);
}