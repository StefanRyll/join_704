class Summary extends Page {
    summeryContent() {
        let daytime = Join.sayDaytime()
        let nextDeadlineDate, nDDay, nDMonth, nDYear, fullDate, urlPrio, taskPrio;
        let urgendTasks = ()=>{
            let theTasks = Join.tasks.filter(t => t.prio === "urgend")
            return theTasks.length;
        }
        let doneTasks = () => {
            let count = 0
            for (let i = 0; i < Join.tasks.length; i++) {
                const task = Join.tasks[i];
                if (task.done) {
                    count++
                }
            }
            return count;
        };
        let todoTasks = () => {
            let count = 0;
            for (let i = 0; i < Join.tasks.length; i++) {
                const taskElement = Join.tasks[i];
                if (taskElement.todo) {
                    count++;
                }
            }
            return count;
        }
        let nextDeadline = () => {
            let allMonths = ["","January","February","March","April","May","June","July","August","September","October","November", "December"];

                if (Join.tasks.length > 1) {
                    nextDeadlineDate = Join.tasks.sort((taskA, taskB) => {
                            return taskA.date - taskB.date;
                        }) // Datum
                    let latestDeadline = nextDeadlineDate[0]
                    nDDay = latestDeadline.date.getDate()
                    nDMonth = latestDeadline.date.getMonth() + 1
                    nDYear = latestDeadline.date.getFullYear()
                    fullDate = () => {

                        return `${allMonths[nDMonth]} ${nDDay}, ${nDYear}`
                    }

                    taskPrio = latestDeadline.prio

                    // return deadlines[0]
                } else if (Join.tasks.length == 1) {
                    let onlyTasks = Join.tasks[0]
                    nextDeadlineDate = onlyTasks.date; // Datum
                    nDDay = nextDeadlineDate.getDate()
                    nDMonth = nextDeadlineDate.getMonth()
                    nDYear = nextDeadlineDate.getFullYear()
                    fullDate = () => {

                        return `${allMonths[nDMonth]} ${nDDay}, ${nDYear}`
                    }

                    taskPrio = onlyTasks.prio;
                } else {
                    nDDay = "No"
                    nDMonth = "Tasks"
                    nDYear = "here"
                    taskPrio = "Wichtig"
                    fullDate = () => {
                        return "No Tasks Here"
                    }
                    urlPrio = () => {
                        return "./IMG/noPrio.png"
                    }
                    return "";
                }
            }

        nextDeadline()

        let progressCount = () => {
            let count = 0;
            for (let i = 0; i < Join.tasks.length; i++) {
                const taskElement = Join.tasks[i];
                if (taskElement.progress) {
                    count++;
                }
            }
            return count;
        }
        let feedbackCount = () => {
            let count = 0;
            for (let i = 0; i < Join.tasks.length; i++) {
                const taskElement = Join.tasks[i];
                if (taskElement.feedback) {
                    count++;
                }

            }
            return count;
        }
        let greetedUser = (Join.signedAccount.name === "Guest") ? "" : Join.signedAccount.name;
        return /*html*/ `
        <div id="summery" class="summery">
        <div id="welcomeOverlay" class="welcome-animation-overlay d-none">
            <h1 class="welcome-respon-headline">${daytime}</h1><h1 class="welcome-respon-headline" id="greetedUser">${greetedUser}</h1>
        </div>
            <div class="summeryHeadline">
                <h1 class="">Join 704</h1>
                <img src="./IMG/Vector 3.png" alt="">
                <p>Key Metrics at a Glance</p>
            </div>
            <div class="seperating-line-res">
                <img src="./IMG/vector-5.png" alt="">
            </div>
            <div class="contentArea">
                <div class="chipsArea">
                    <div class="greetingAreaRes"><h3>${daytime}</h3><h4 id="greetedUser">${greetedUser}</h4></div>
                    <div class="chipsAreaRow">
                        <div class="chip2x" onclick="boardPage()">
                            <div class="chipIcon" ></div>
                            <div class="chipData2x">
                                <h1>${todoTasks()}</h1>
                                <p>to do</p>
                            </div>
                        </div>
                        <div class="chip2x" onclick="boardPage()">
                            <div class="chipIcon2" ></div>
                            <div class="chipData2x">
                                <h1>${doneTasks()}</h1>
                                <p>Done</p>
                            </div>

                        </div>
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip1x" onclick="boardPage()">
                            <img class="chipIcon" src=${"./IMG/urgent.png"} alt="Nix">
                            <div>
                                <h1 class="urgentCount">${urgendTasks()}</h1>
                                <p>Urgent</p>
                            </div>
                            <img src="./IMG/Vector 5.png" alt="">
                            <div class="chipData1x">
                                <h2>${fullDate()}</h2>
                                <p>Upcoming Deadline</p>
                            </div>
                        </div>
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip3x" onclick="boardPage()">
                            <div class="chipData3x">
                                <h2>${Join.tasks.length}</h2>
                                <p>Tasks in<br>Board</p>
                            </div>
                        </div>
                        <div class="chip3x">
                            <div class="chipData3x" onclick="boardPage()">
                                <h2>${progressCount()}</h2>
                                <p>Tasks in<br>Progress</p>
                            </div>
                        </div>
                        <div class="chip3x">
                            <div class="chipData3x" onclick="boardPage()">
                                <h2>${feedbackCount()}</h2>
                                <p>Awaiting<br>Feedback</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div> </div>
                    </div>
                    <div></div>
                </div>
                <div class="greetingArea"><h3>${daytime}</h3><h4 id="greetedUser">${greetedUser}</h4></div>
            </div>
        </div>

            `
    }
    checkTasksDone() {
        let count = 0
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.done) {
                count++
            }

        }
        return count;
    }

}