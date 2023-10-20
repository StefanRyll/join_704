class Subtask {
    constructor(name) {
        this.name = name;
        this.done = false;
    }
    subTaskDone() {
        this.done = true;
    }
}