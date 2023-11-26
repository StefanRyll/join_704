class Summary extends Page{
    summeryContent() {
        let daytime = Join.sayDaytime()
        let doneTasks = () =>{
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
                if (!taskElement.done) {
                    count++;
                }
            }
            return count;
        }
        let nextDeadline = () =>{
            let deadlines = Join.tasks.sort((taskA, taskB) => {
                return taskA.date - taskB.date;
            })
            return deadlines[0]
    
        }
        let urlPrio = () =>{
            let url;
            if (nextDeadline().prio === "Medium"){
                url = "./IMG/medium.png";
            }
            else if (nextDeadline().prio === "Low"){
                url = "./IMG/low.png";
            }
            else{
                url = "./IMG/urgent.png"
            }
            return url;
        }
        let nextDeadlineDate = nextDeadline().date; // Datum
        let nDDay = nextDeadlineDate.getDate()
        let nDMonth = nextDeadlineDate.getMonth() + 1
        let nDYear = nextDeadlineDate.getFullYear()
        let fullDate = () =>{
            let monat;
            if(nDMonth == 1){
                monat = "January";
            }
            else if(nDMonth == 2){
                monat = "February"
            }
            else if(nDMonth == 3){
                monat = "March"
            }
            else if(nDMonth == 4){
                monat = "April"
            }
            else if(nDMonth == 5){
                monat = "May"
            }
            else if(nDMonth == 6){
                monat = "June"
            }
            else if(nDMonth == 7){
                monat = "July"
            }
            else if(nDMonth == 8){
                monat = "August"
            }
            else if(nDMonth == 9){
                monat = "September"
            }
            else if(nDMonth == 10){
                monat = "October"
            }
            else if(nDMonth == 11){
                monat = "November"
            }
            else if(nDMonth == 12){
                monat = "December"
            }

            return `${monat} ${nDDay}, ${nDYear}`
        }
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
            <div class="summeryHeadline">
                <h1 class="">Join 704</h1>
                <img src="./IMG/Vector 3.png" alt="">
                <p>Key Metrics at a Glance</p>
            </div>
            <div class="contentArea">
                <div class="chipsArea">
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
                            <img class="chipIcon" src=${urlPrio()} alt="Nix">
                            <p>${nextDeadline().prio}</p>
                            <img src="./IMG/Vector 5.png" alt="">
                            <div class="chipData1x">
                                <h2>${fullDate()}</h2>
                                <p>Upcoming Deadline</p>
                            </div>
                        </div>
                        <!-- <div class="greetingArea"><h3>{daytime}</h3><h4>{this.signedAccount.name}</h4></div> -->
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