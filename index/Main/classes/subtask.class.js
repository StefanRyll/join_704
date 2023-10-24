class Subtask {
    constructor(name, done = false) {
        this.name = name;
        this.done = done;
    }
    subTaskDone() {
        this.done = true;
    }
}