class Page {
    constructor() {
            this.accounts = [];
            this.signedAccount = null;
            this.tasks = [];
        }
        // Methoden
    sayDaytime() {
            let datum = new Date();
            let daytime = datum.getHours()
            if (datum <= 5 && datum >= 18) {
                return "Good&nbsp;Evening";
            } else if (datum <= 6 && datum <= 12) {
                return "Good&nbsp;Morning";
            } else {
                return "Good&nbsp;Afternoon";
            }
        }
        // Components
        /**
         *  Diese Methoder stellt das Log In Fenster da
         * @returns {string} -- 
         * */
    logInContent() {
        return /*html*/ `
            <header>
                <div class="frame-156">
                    <p>Not a Join user?</p>
                    <button onclick="signUp()">Sign up</button>
                </div>
            </header>
            <section>
                <div class="frame-153">
                    <div class="frame-159">
                        <h1>Log In</h1>
                        <img src="./IMG/vector-5.png">
                    </div>
                    <form class="login-container" onsubmit="logInUser()">
                        <div class="frame-14"><input type="email" class="frame-157" placeholder="Email" id="loginEmail">
                            <img class="input-icon" src="./IMG/mail.png"> 
                        </div>                       
                        <div class="frame-14" onclick="visibility()"><input type="password" class="frame-158" placeholder="Password" id="loginPassword">
                            <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                            <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                        </div>
                        <label class="remember-me">

                            <div id="checkbox" onclick="checkboxActivate()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <rect x="4" y="4.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="d-none" id="checkbox-active" onclick="checkboxDeactivate()">
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Group 19">
                                    <path id="Vector 9" d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                                    <path id="Vector 17" d="M5 9.96582L9 13.9658L17 2.46582" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                </svg>
                            </div>
                            Remember me
                        </label>
                        <div class="frame-176">
                            <div class="loginButtons">
                            <button class="login-btn" type="submit">Log&nbsp;In</button><button class="guest-login-style" onclick="guestLogin()">Guest&nbsp;Log&nbsp;In</button>
                            </div>
                        </div>
                    </form>
                </div>
                <footer>
                    <button onclick="privacyPage()" class="text-button">Privacy Policy</button>
                    <button onclick="legalPage()" class="text-button">Legal notice</button>
                </footer>
            </section>
        `
    }

    /**
     * Die Methode stellt die Logo Animation am anfang dar
     * @returns {string}
     */
    startAnimation() {
        body.innerHTML = "";
        return /*html*/ `
            <div id="logoMain" class="logoAnimationImg"></div>

        `
    }
    logoLogin() {
        return /*html*/ `
            <div id="logoMain" class="logoAnimationImg2"></div>

        `
    }
    pageLayoutMain() {
        body.innerHTML = "";
        return /*html*/ `
            <div id="SideAndHead"></div>
            <div id="content"></div>

        `
    }
    loginLayout() {
        return /*html*/ `
            <div id="logoArea"></div>
            <div id="windowArea"></div>        
        `
    }
    SideAndHead() {
        return /*html*/ `
            <header class="header">
                <h2>Kanban Projekt Management Tool</h2>
                <div class="accountIssues">
                    <div id="hInfo" class="infoButton" onclick="helpPage()"></div>
                    <img src="./IMG/defaultUser.png" alt="" class="userImg">
                </div>
            </header>
            <div id="sidebar" class="sidebar">
                <div id="logo" onclick="summeryPage()" class="logo"></div>
                <nav>
                    <div class="navs bgDark" onclick="summeryPage()"><div class="summary"></div><h3>Summery</h3></div>
                    <div class="navs" onclick="boardPage()" ><div class="board"></div><h3>Board</h3></div>
                    <div class="navs" onclick="addTaskPage()"><div class="addTask"></div><h3>Add Task</h3></div>
                    <div class="navs" onclick="contactsPage()"><div class="contacts"></div><h3>Contacts</h3></div>
                </nav>
                <div>
                    <p onclick="privacyPage()">Privacy Policy</p>
                    <p onclick="legalPage()">Legal notice</p>
                </div>
            </div>

        `
    }
    signUpWindow() {
        return /*html*/ `
            <div id="signUpWindow" class="signUpWindow">
                <h1>Sign up</h1>
                <form class="accountForm" onsubmit="createAccount1()">
                    <div class="signUpInputArea"><input required type="text" id="signUpInputName" placeholder="Name" class="signUpInput"></div>
                    <div class="signUpInputArea"><input required type="email" id="signUpInputEmail" placeholder="Email" class="signUpInput"></div>
                    <div class="signUpInputArea"><input required type="password" id="signUpInputPassword" placeholder="Password" class="signUpInput"></div>
                    <div id="passwordCheckArea" class="signUpInputArea"><input required type="password" id="signUpInputPassword2" placeholder="Confirm Password" class="signUpInput"></div>
                    <label><input required type="checkbox" name="ppCheck" id="ppCheck">I accept the <a href="">Privacy policy</a></label>
                    <button type="submit">Sign Up</button>
                </form>
                <button class="backBtn" onclick="startPage2()"><</button>
            </div>

        `
    }
    forceSignIn(x) {
        this.signedAccount = x;
    }
    summeryContent() {
        let daytime = this.sayDaytime()
        let doneTasks = this.checkTasksDone()
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
                        <div class="chip2x">
                            <img class="chipIcon" src="./IMG/pen.png" alt="Nix">
                            <div class="chipData2x">
                                <h1>${this.tasks.length}</h1>
                                <p>to do</p>
                            </div>
                        </div>
                        <div class="chip2x">
                            <img src="./IMG/check.png" alt="Nix">
                            <div class="chipData2x">
                                <h1>${doneTasks}</h1>
                                <p>Done</p>
                            </div>

                        </div>
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip1x">
                            <img class="chipIcon" src="./IMG/urgent.png" alt="Nix">
                            <p>Urgent</p>
                            <img src="./IMG/Vector 5.png" alt="">
                            <div class="chipData1x">
                                <h2>October 16, 2022</h2>
                                <p>Upcoming Deadline</p>
                            </div>
                        </div>
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip3x">
                            <div class="chipData3x">
                                <h2>5</h2>
                                <p>Tasks in<br>Board</p>
                            </div>
                        </div>
                        <div class="chip3x">
                            <div class="chipData3x">
                                <h2>2</h2>
                                <p>Tasks in<br>Progress</p>
                            </div>
                        </div>
                        <div class="chip3x">
                            <div class="chipData3x">
                                <h2>2</h2>
                                <p>Awaiting<br>Feedback</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div> </div>
                    </div>
                    <div></div>
                </div>
                <div class="greetingArea"><h3>${daytime}</h3><h4>${this.signedAccount.name}</h4></div>
            </div>
        </div>

            `
    }
    checkTasksDone() {
        let count = 0
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.done == true) {
                count++
            }

        }
        return count;
    }
    boardContent() {
        return /*html*/ `
        <div class="frame-192">
            <h2>
                Board
            </h2>
            <div class="frame-123">
                <div class="input-search">
                    <input type="search" name="find task" id="" placeholder="Find Task">
                    <img class="separator-find-task" src="/assets/img/Vector 3.png" alt="separator searchfield">
                    <div class="search-icon">
                        <img src="/assets/img/search.png" alt="search Image">
                    </div>
                </div>
                <button onclick="openAddTask()" class="button-add-task">
                    <p>Add task</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <mask id="mask0_87727_3931" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                          <rect width="32" height="32" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_87727_3931)">
                          <path d="M14.666 17.3327H6.66602V14.666H14.666V6.66602H17.3327V14.666H25.3327V17.3327H17.3327V25.3327H14.666V17.3327Z" fill="white"/>
                        </g>
                      </svg>
                </button>
            </div>
        </div>
        
        <!----------------------------- ACTION BAR - BOARD ----------------------------------->
        
        <div class="frame-136">
            <div onclick="openAddTask()" class="board-actionbar">
                <p>To do</p>
                <div class="border-plus">
                    <svg class="hover-svg" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path  d="M5.6665 1.5V9.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                        <path d="M9.6665 5.57544L1.6665 5.57544" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                </div>
            </div>
            <div onclick="openAddTask()" class="board-actionbar">
                <p>In progress</p>
                <div class="border-plus">
                    <svg class="hover-svg" xmlns="http://www.w3.org/2000/svg"  width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.6665 1.5V9.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                        <path d="M9.6665 5.57544L1.6665 5.57544" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                </div>
            </div>
            <div onclick="openAddTask()" class="board-actionbar">
                <p>Await feedback</p>
                <div class="border-plus">
                    <svg class="hover-svg" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.6665 1.5V9.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                        <path d="M9.6665 5.57544L1.6665 5.57544" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                </div>
            </div>
            <div class="board-actionbar">
                <p>Done</p>
            </div>
        </div>
        
        <!----------------------------- RENDER ACTION BAR - BOARD ----------------------------------->
        
        <div id="renderActionBar"></div>
        
        <!----------------------------- RENDER ADD TASK ----------------------------------->
        
        <div id="addTask"></div>
        
        
            `
    }
    helpContent() {
        return /*html*/ `
            <h1>Help</h1>
                <p>Welcome to the help page for Join, 
                    your guide to using our kanban project 
                    management tool. Here, we'll provide 
                    an overview of what Join is, how it 
                    can benefit you, and how to use it.</p>
                <h2>What is Join?</h2>
                <p>Join is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie. <br><br>
                    Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). Join leverages the 
                    principles of kanban to help users manage their tasks and projects in an intuitive, visual interface. <br><br>
                    It is important to note that Join is designed as an educational exercise and is not intended for extensive business usage. 
                    While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, 
                    or other aspects of quality regarding Join.</p>
                <h2>How to use it</h2>
                <p>Here is a step-by-step guide on how to use Join:</p>
                <ol>
                    <li><h3>Exploring the Board</h3>
                        <p>When you log in to Join, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p></li>
                    <li><h3>Creating Contacts</h3>
                        <p>In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p></li>
                    <li><h3>Adding Cards</h3>
                        <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc..</p></li>
                    <li><h3>Moving Cards</h3>
                        <p>As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.</p></li>
                    <li><h3>Deleting Cards</h3>
                        <p>Deleting Cards
                            Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible.<br><br>

                            Remember that using Join effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.<br><br>

                            Have more questions about Join? Feel free to contact us at [Your Contact Email]. We're here to help you!
                            </p></li>
                </ol>

                <h2>Enjoy using Join!</h2>


        `
    }
    privacyContent() {
        return /*html*/ `
            <h1>Privacy Policy</h1>
            <h2>Subtitle</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Repellat iste facere vel harum, voluptas rerum consequatur 
                quas qui repudiandae amet nulla asperiores pariatur veniam 
                accusamus quis cumque sapiente fugiat voluptatibus.Lorem, 
                ipsum dolor sit amet consectetur adipisicing elit. 
                Assumenda expedita atque, debitis nobis unde distinctio enim 
                consequuntur, ducimus quibusdam a doloribus eaque maiores esse 
                eligendi, cupiditate nam reprehenderit asperiores sapiente.</p>
            <h2>Subtitle</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Repellat iste facere vel harum, voluptas rerum consequatur 
                quas qui repudiandae amet nulla asperiores pariatur veniam 
                accusamus quis cumque sapiente fugiat voluptatibus.Lorem, 
                ipsum dolor sit amet consectetur adipisicing elit. 
                Assumenda expedita atque, debitis nobis unde distinctio enim 
                consequuntur, ducimus quibusdam a doloribus eaque maiores esse 
                eligendi, cupiditate nam reprehenderit asperiores sapiente.</p>
        `
    }
    legalNoticeContent() {
        return /*html*/ `
            <h1>Legal Notice</h1>
            <h2>Imprint</h2>
            <ul>
                <li>Roman Schröder <br> Siebengebirgsweg 10 <br> 53424 Remagen</li><br>
                <li>Stefan Ryll <br> Mittelstraße 5 <br> 67547 Worms</li><br>
                <li>Dominik Hucka <br> Peteräcker 6 <br> 72581 Dettingen an der Ems</li><br>
            </ul>
            <h3>Exploring</h3>
            <p>Email: roman.schroeder@inclufilm.com</p>
            <h3>Acceptance of terms</h3>
            <p>By accessing and using Join (Product), you acknowledge and
                agree to the following terms and conditions, and any policies,
                guidelines, or amendments thereto that may be presented to you from
                time to time. We, the listed students, may update or change the terms
                and conditions from time to time without notice.</p>
            <h3>Scope and ownership of the product</h3>
            <p>Join has been developed as part of a student group project in a web development
                bootcamp at the Developer Akademie GmbH. It has an educational purpose and is
                not intended for extensive personal & business usage. As such, we cannot
                guarantee consistent availability, reliability, accuracy, or any other
                aspect of quality regarding this Product.</p>

            <p>The design of Join is owned by the Developer Akademie GmbH. Unauthorized use,
                reproduction, modification, distribution, or replication of the design is
                strictly prohibited.</p>

            <h3>Proprietary rights</h3>
            <p>Aside from the design owned by Developer Akademie GmbH, we, the listed students,
                retain all proprietary rights in Join, including any associated copyrighted
                material, trademarks, and other proprietary information.</p>

            <h3>Use of the product</h3>
            <p>Join is intended to be used for lawful purposes only, in accordance with all
                applicable laws and regulations. Any use of Join for illegal activities, or
                to harass, harm, threaten, or intimidate another person, is strictly prohibited.
                You are solely responsible for your interactions with other users of Join.</p>

            <h3>Disclaimer of warranties and limitation of liability</h3>
            <p>Join is provided "as is" without warranty of any kind, whether express or implied,
                including but not limited to the implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement. In no event will we, the listed
                students, or the Developer Akademie, be liable for any direct, indirect, incidental,
                special, consequential or exemplary damages, including but not limited to, damages
                for loss of profits, goodwill, use, data, or other intangible losses, even if we
                have been advised of the possibility of such damages, arising out of or in connection
                with the use or performance of Join.</p>

            <h3>Indemnity</h3>
            <p>You agree to indemnify, defend and hold harmless us, the listed students, the Developer
                Akademie, and our affiliates, partners, officers, directors, agents, and employees,
                from and against any claim, demand, loss, damage, cost, or liability (including reasonable
                legal fees) arising out of or relating to your use of Join and/or your breach of this Legal Notice. </p>
                
            <p>For any questions or notices, please contact us at [Contact Email].</p>
                
            <p>Date: July 26, 2023</p>
        `
    }
    addTaskContent() {
        let html = /*html*/ `
            <div id="createTaskWindow" class="createTaskWindow">
                <h1>Add Task</h1>
                <form class="taskWindowForm" onsubmit="createTask()">
                    <div class="taskWindowColumn"><!--Spalte 1-->
                        <div class="inputParameter">
                            <label for="addTaskTitle">Title</label>
                            <input  id="addTaskTitle" type="text" placeholder="Enter a title">                        
                        </div>
                        <div class="inputParameter">
                            <label for="addTaskDescription">Description</label>
                            <textarea name="addTaskDescription" id="addTaskDescription" cols="30" rows="10" placeholder="Enter a Description"></textarea>      
                        </div>
                        <div class="inputParameter">
                            <label for="assignTaskToContacts">Assigned to</label>
                            <select id="assignTaskToContacts">
                            </select>
                        </div>                        
                    </div>
                    <div class="taskWindowColumn"><!--Spalte 2-->
                        <div class="inputParameter">
                            <label for="addTaskDeadline">Due date</label>
                            <input  id="addTaskDeadline" type="date" placeholder="dd/mm/yyyy">                        
                        </div>
                        <div class="inputParameter">
                            <label>Prio</label>
                            <div class="taskPrios">
                                <div><input class="radioButton" type="radio" name="prio" id="prio01" checked>Urgent</div>
                                <div><input class="radioButton" type="radio" name="prio" id="prio02">Medium</div>
                                <div><input class="radioButton" type="radio" name="prio" id="prio03">Low</div>
                            </div>
                        </div>
                        <div class="inputParameter">
                            <label for="addTaskCategory">Assigned to</label>
                            <select id="addTaskCategory">
                                <option value="Technical Task">Technical Task</option> <!--Hier Task.catergory rein rendern-->
                                <option value="User Story">User Story</option>
                            </select>
                        </div>

                        <div id="addTaskControl">
                            <div onclick="logEnding('Leave add Task')">Clear x</div>
                            <button type="submit">Create Task v</button>
                        </div>                        
                    </div>
                </form>
            </div>

        `

    }

}
class Account {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tel = null;
        this.contacts = [];
        this.shortname = this.name.charAt(0)

    }
    tinyCard() {
        return /*html*/ `
        <div class="tinyAccountCard">
            <div class="accountTag">${this.shortname}</div>
            <div>${this.name}</div>
        </div>
        `
    }
    tinyCardCheck(x) {
        return /*html*/ `
        <div class="tinyAccountCard">
            <div class="accountTag">${this.shortname}</div>
            <div>${this.name}</div>
            <input type="checkbox" name="" id="ac${x}">
        </div>
        `
    }

    addTel(x) {
        this.tel = x;
    }
    addTask(x) {
        this.tasks.push(x);
    }
    addContact(x) {
        this.contacts.push(x);
    }
}
class Task {
    constructor(title, worker, desc, jahr, monat, tag, prio, Categroy) {
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = new Date(jahr, monat - 1, tag);
        this.prio = prio;
        this.Categroy = Categroy;
        this.done = false;
        this.subTasks = [];
    }
    taskCardNormal() {
        let html = /*html*/ `
            </div>
            <h1>${this.title}</h1>
            <p>${this.desc}</p>
            <div class="taskCardAttribute">
                <p>Date Due: </p>
                <p>${this.date}</p>
            </div>
            <div class="taskCardAttribute">
                <p>Priority: </p>
                <p>${this.prio}</p>
            </div>
            <div class="taskCardAssignment">
                <p>Assigned to: </p>`

        for (let i = 0; i < this.worker.length; i++) {
            const worker = this.worker[i];
            html += worker.tinyCard()
        }
        html += /*html*/ `
        <div id="taskCardAssinedList"></div>
            </div >
            <div class="taskCardSubtasks">
                <p>Subtasks</p>
                <div id="subtasksList">
                    `
        for (let j = 0; j < this.subTasks.length; j++) {
            const subTask = this.subTasks[j];
            html += subTask;
        }
        html = /*html*/ `        
                </div>
            </div>
            <div class="taskCardFooter">
                <div class="deleteBtn"></div>
                <div class="editBtn"></div>
            </div>
        `
        return html;
    }
    taskCardEdit() {
        return /*html*/ `
            < div class="taskCardHeader" >
                <div></div>
                <div class="taskCardHeaderClose">X</div>
            </div >
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
    editTask() {
        let taskCard = document.getElementById('taskCard')
        taskCard.innerHTML = this.taskCardEdit()
    }

}