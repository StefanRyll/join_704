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
                        <div class="frame-14"><input type="email" class="frame-157" placeholder="Email" id="loginEmail"></div>
                        <div class="frame-14"><input type="password" class="frame-158" placeholder="Password" id="loginPassword"></div>
                        <label class="remember-me" for=""><img src="./IMG/checkboxEmpty.png" onclick="checkbox()" id="checkbox" alt="">
                            Remember me
                        </label>
                        <div class="frame-176">
                            <div class="loginButtons">
                            <button class="login-btn" type="submit">Log&nbsp;In</button><button class="guest-login-style" onclick="guestLogin()">Guest&nbsp;Log&nbsp;In</button>
                            </div>
                        </div>
                    </form>
                </div>
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
                <li>Stefan, Dominik, Roman</li>
                <li>Roman Schröder <br> Siebengebirgsweg 10 <br> 53424 Remagen</li>
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
        return /*html*/ `
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
                                <option value="Stefan">Stefan</option> <!--Hier Accounts rein rendern-->
                                <option value="Dominik">Dominik</option>
                                <option value="Roman">Roman</option>
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
}