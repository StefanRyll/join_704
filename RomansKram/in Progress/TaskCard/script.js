
function taskCardNormal(){
    return /*html*/`
        </div>
        <h1>Kochwelt Page & Recipe Recommender</h1>
        <p>'Decription'Build start page with recipe recommendation.</p>
        <div class="taskCardAttribute">
            <p>Date Due: </p>
            <p>10/05/2023</p>
        </div>
        <div class="taskCardAttribute">
            <p>Priority: </p>
            <p>Medium</p>
        </div>
        <div class="taskCardAssignment">
            <p>Assigned to: </p>
            <div id="taskCardAssinedList"></div>
        </div>
        <div class="taskCardSubtasks">
            <p>Subtasks</p>
            <div id="subtasksList"></div>
        </div>
        <div class="taskCardFooter">
            <div class="deleteBtn"></div>
            <div class="editBtn"></div>
        </div>
    `
}
function taskCardEdit(){
    return /*html*/`
        <div class="taskCardHeader">
            <div></div>
            <div class="taskCardHeaderClose">X</div>
        </div>
        <form class="editTask" onsubmit="taskSaveChanges()">
            <label for="taskCardETitle">Titel:</label>
            <input type="text" id="taskCardETitle">
            <label for="taskCardEDesc">Description:</label>
            <textarea cols="30" rows="10" id="taskCardEDesc"></textarea>
            <label for="taskCardEDate">Date Due:</label>
            <input type="date" id="taskCardEDate">
            <label for="">Assign to: </label>
            <select name="" id="">
                <div>
                    <div class="accountTag">AV</div>
                </div>
            </select>
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
            <button type="submit">Ok &checkmark;</button>
        </form>   


    `
}
function editTask(){

}

const taskCard = document.getElementById('taskCard')
taskCard.innerHTML = taskCardEdit()