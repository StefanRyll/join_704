class Subtask {
    constructor(text, done = false) {
        this.text = text;
        this.done = done;
    }
    subTaskDone() {
        this.done = true;
    }
    subTaskUndone() {
        this.done = false;
    }
}