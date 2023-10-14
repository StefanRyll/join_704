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
        if (daytime <= 23 && daytime >= 18) {
            return "Good&nbsp;Evening";
        } else if (daytime >= 6 && daytime <= 12) {
            return "Good&nbsp;Morning";
        } else if (daytime >= 0 && daytime <= 5) {
            return "Good&nbsp;Night"
        } else {
            return "Good&nbsp;Afternoon";
        }
    }
    // Components
    /**
     *  Diese Methode stellt das Log In Fenster da
     * @returns {string} -- 
     * */
    logInContent() {
        return /*html*/ `
            <header class="login-header">
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
                        <div class="frame-14"><input required type="email" class="frame-157" placeholder="Email" id="loginEmail">
                            <img class="input-icon" src="./IMG/mail.png"> 
                        </div>                       
                        <div class="frame-14" onclick="visibility()"><input required type="password" class="frame-158" placeholder="Password" id="loginPassword">
                            <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                            <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                        </div>
                        <label class="remember-me">
                        <div class="check-box" id="checkbox" onclick="checkboxActivate()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <rect x="4" y="4.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                            </svg>
                        </div>
                        <div class="check-box d-none" id="checkbox-active" onclick="checkboxDeactivate()">
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
            <header class="header">
                <h2>Kanban Projekt Management Tool</h2>
                <div class="accountIssues">
                    <div id="hInfo" class="infoButton" onclick="helpPage()"></div>
                    <img src="./IMG/defaultUser.png" alt="" class="userImg">
                </div>
            </header>

        `
    }
    signUpWindow() {
        return /*html*/ `
            <div id="signUpWindow" class="signUpWindow">
  
                    <a class="backBtn" onclick="startPage2()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M10.4373 14.6667H25.3333C26.0696 14.6667 26.6666 15.2637 26.6666 16.0001C26.6666 16.7364 26.0696 17.3334 25.3333 17.3334H10.4373L16.6466 23.5427C17.1672 24.0634 17.1672 24.9074 16.6466 25.4281C16.126 25.9487 15.2819 25.9487 14.7613 25.4281L6.74746 17.4143C5.96642 16.6332 5.96642 15.3669 6.74747 14.5858L14.7613 6.57206C15.2819 6.05144 16.126 6.05144 16.6466 6.57206C17.1672 7.09268 17.1672 7.93677 16.6466 8.45739L10.4373 14.6667Z" fill="#29ABE2"/>
                        </svg>
                    </a>
                    <div class="frame-159 mb-72">
                        <h1>Sign Up</h1>
                        <img src="./IMG/vector-5.png">
                    </div>
                <form class="login-container" onsubmit="createAccount1()">
                        <div class="frame-14"><input required type="text" class="frame-157" placeholder="Name" id="signUpInputName">
                            <img class="input-icon" src="./IMG/person.png"> 
                        </div>
                        <div class="frame-14"><input required type="email" class="frame-157" placeholder="Email" id="signUpInputEmail">
                            <img class="input-icon" src="./IMG/mail.png"> 
                        </div>
                        <div class="frame-14" onclick="visibility()"><input type="password" class="frame-158" placeholder="Password" id="signUpInputPassword">
                            <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                            <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                        </div>
                        <div id="passwordCheckArea" class="frame-14" onclick="visibility()"><input type="password" class="frame-158" placeholder="Confirm Password" id="signUpInputPassword2">
                            <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                            <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                        </div>

                        <div class="d-flex-mid">
                            <label id="ppCheck" class="sign-up-privacy-policy">
                                <div class="check-box" id="checkbox" onclick="checkboxActivate()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <rect x="4" y="4.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                                    </svg>
                                </div>
                                <div class="check-box d-none" id="checkbox-active" onclick="checkboxDeactivate()">
                                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 19">
                                            <path id="Vector 9" d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                                            <path id="Vector 17" d="M5 9.96582L9 13.9658L17 2.46582" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                    </svg>
                                </div>
                                I accept the&nbsp;<a class="link-style" onclick="privacyPage()"> Privacy policy</a>
                            </label>
                        </div>

                        <div class="frame-176">
                            <div class="sign-up-btn loginButtons">
                            <button class="login-btn" type="submit">Sign Up</button>
                            </div>
                        </div>
                    </form>
            </div>
        

        `
    }
    forceSignIn(x) {
        this.signedAccount = x;
    }
    summeryContent() {
        let daytime = this.sayDaytime()
        let doneTasks = this.checkTasksDone()
        let nextDeadline = this.nextDeadline()
        let nDDay = nextDeadline.date.getDate()
        let nDMonth = nextDeadline.date.getMonth()
        let nDYear = nextDeadline.date.getFullYear()
        let fullDate = `${nDDay}.${nDMonth}.${nDYear}`
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
                                <h2>${fullDate}</h2>
                                <p>${nextDeadline.title}</p>
                            </div>
                        </div>
                        <!-- <div class="greetingArea"><h3>${daytime}</h3><h4>${this.signedAccount.name}</h4></div> -->
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip3x">
                            <div class="chipData3x">
                                <h2>${this.tasks.length}</h2>
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
        <!-- <div class="greetingArea"><h3>${daytime}</h3><h4>${this.signedAccount.name}</h4></div> -->

            `
    }
    nextDeadline(){
        let today = new Date()
        let dif = 31536000000;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i].date;
            let difTask = Math.abs(task - today);
            console.log(this.tasks[i].title);
            if (difTask <= dif){
                dif = difTask;
                return this.tasks[i];
            }
        }
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

    <div class="addTask" id="addTask">
        <div id="kambanTodo"></div>
        <div id="kambanInprogress"></div>
        <div id="kambanFeedback"></div>
        <div id="kambanDone"></div>
        <div id="addSubtask"></div>
    </div>

            `
    }
    renderTaskTodo(){
        let kambanTodo = document.getElementById('kambanTodo')
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            kambanTodo.innerHTML += task.tinyTaskCard()
        }
    }
    renderAddSubtask() {
        let addSubTask = document.getElementById('addSubtask');
        for (let m = 0; m <  this.tasks.length; m++) {
            const subtasksFromBoard = this.tasks[m];
            addSubTask.innerHTML += subtasksFromBoard.generateHTMLAddSubtask()
        }
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
    renderAddTask() {
        let addTask = document.getElementById('addTask');
        addTask.innerHTML = '';
        addTask.innerHTML += this.generateHTMLaddTask();
    }
    generateHTMLaddTask() {
        return /*html*/`
              <div id="slideAddTask" class="bg-task">
                <div class="add-task">
                 ${this.generateHTMLLeftSide()}
                 ${this.generateHTMLSeperator()}
                  ${this.generateHTMLRightSide()}
                  ${this.generateHTMLCloseButtonInSVG()}
                </div>
              </div>
          `
    }
    generateHTMLaddTaskWindow() {
        return /*html*/`
                <div class="add-taskWindow">
                 ${this.generateHTMLLeftSide()}
                 ${this.generateHTMLSeperator()}
                  ${this.generateHTMLRightSide()}
                  ${this.generateHTMLCloseButtonInSVG()}
                </div>
          `
    }
    generateHTMLLeftSide() {
        return /*html*/`
              <div class="headline-add-task">
                <h3>Add Task</h3>
              </div>
              <div class="left-side">
                ${this.generateHTMLTitle()}
                ${this.generateHTMLDescription()}
                ${this.generateHTMLAssignedTo()}
                <div class="field-required-text">
                  <sub>*</sub><span>This field is required</span>
                </div>
              </div>
          `
    }
    generateHTMLTitle() {
        return /*html*/`
                <form class="input-title board-task-input">
                    <label for="pflichtfeld">Title<sup>*</sup></label>
                    <input type="text" id="boardTaskTitle" name="" required  placeholder="Enter a title">
                </form>
        `
    }
    generateHTMLDescription() {
        return /*html*/`
                <form class="input-description">
                    <p>Description</p>
                    <textarea name="" id="boardTaskDescription" cols="30" rows="10" placeholder="Enter a Description"></textarea>
                </form>
        `
    }
    generateHTMLAssignedTo() {
        return /*html*/`
                <div class="assigned-contact board-task-input">
                    <p>Assigned to</p>
                    ${this.generateHTMLSelectContactsToogleFunction()}
                    <div id="closeContacts" class="open-assign-container2 d-none">
                        <div class="assign-container assign-container-style">
                          <input  type="text">
                          <img onclick="toggleContactsAssign()" src="/assets/img/arrow_dropdown.png" alt="">
                        </div>
                        <div id="assignedToContacts" class="checkbox-container">
                            ${this.generateHTMLCheckbox()}
                            ${this.generateHTMLAddToContactButton()}
                        </div>
                    </div>
                </div>
        `
    }
    generateHTMLSelectContactsToogleFunction() {
        return /*html*/`
                    <div id="selectContacts" class="assign-container">
                      <input  onclick="toggleContactsAssign()" type="button" value="Select contacts to assign" id="">
                      <img onclick="toggleContactsAssign()" src="/assets/img/arrow_drop_downaa.png" alt="">
                    </div>
        `
    }
    generateHTMLCheckbox() {
        return /*html*/`
          <table>
            <tr>
                <td>
                  <label for="contacts">Roman</label>
                  <input type="checkbox" name="" id="boardTaskAddContact">
                </td>
                                
            </tr>
            <tr>
                <td>
                    <label for="contacts">Dominik</label>
                    <input type="checkbox" name="" id="">
                </td>
            </tr>
            <tr>
                <td>
                    <label for="contacts">Stefan</label>
                    <input type="checkbox" name="" id="">
                </td>
            </tr>
          </table>
        `
    }
    generateHTMLAddToContactButton() {
        return /*html*/`
          <button class="add-new-contact">Add new contact
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                  <mask id="mask0_71338_5843" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
                    <rect x="0.0683594" width="32" height="32" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#mask0_71338_5843)">
                    <path d="M25.3975 18.6667C25.0816 18.6667 24.818 18.5602 24.6069 18.3473C24.3958 18.1343 24.2903 17.8704 24.2903 17.5556V14.4445H21.1791C20.8643 14.4445 20.6004 14.3376 20.3875 14.1239C20.1745 13.9102 20.068 13.6454 20.068 13.3295C20.068 13.0136 20.1745 12.7501 20.3875 12.5389C20.6004 12.3278 20.8643 12.2223 21.1791 12.2223H24.2903V9.11115C24.2903 8.79635 24.3971 8.53246 24.6108 8.31948C24.8245 8.10653 25.0894 8.00005 25.4053 8.00005C25.7212 8.00005 25.9847 8.10653 26.1958 8.31948C26.4069 8.53246 26.5125 8.79635 26.5125 9.11115V12.2223H29.6236C29.9384 12.2223 30.2023 12.3291 30.4153 12.5428C30.6282 12.7566 30.7347 13.0214 30.7347 13.3373C30.7347 13.6532 30.6282 13.9167 30.4153 14.1278C30.2023 14.3389 29.9384 14.4445 29.6236 14.4445H26.5125V17.5556C26.5125 17.8704 26.4056 18.1343 26.1919 18.3473C25.9782 18.5602 25.7134 18.6667 25.3975 18.6667ZM12.068 15.9778C10.6014 15.9778 9.38284 15.4926 8.41247 14.5223C7.44211 13.5519 6.95693 12.3334 6.95693 10.8667C6.95693 9.40005 7.44211 8.18154 8.41247 7.21118C9.38284 6.2408 10.6014 5.75562 12.068 5.75562C13.5347 5.75562 14.7532 6.2408 15.7236 7.21118C16.694 8.18154 17.1791 9.40005 17.1791 10.8667C17.1791 12.3334 16.694 13.5519 15.7236 14.5223C14.7532 15.4926 13.5347 15.9778 12.068 15.9778ZM2.51247 26.6667C2.19767 26.6667 1.93378 26.5602 1.7208 26.3473C1.50784 26.1343 1.40137 25.8704 1.40137 25.5556V23.3334C1.40137 22.563 1.59951 21.8612 1.9958 21.2279C2.39211 20.5945 2.93471 20.1186 3.6236 19.8C5.19398 19.0815 6.64833 18.5649 7.98667 18.25C9.32502 17.9352 10.6843 17.7779 12.0644 17.7779C13.4446 17.7779 14.8051 17.9352 16.1458 18.25C17.4865 18.5649 18.9347 19.0815 20.4903 19.8C21.1792 20.1334 21.7254 20.613 22.1291 21.2389C22.5328 21.8649 22.7347 22.563 22.7347 23.3334V25.5556C22.7347 25.8704 22.6282 26.1343 22.4153 26.3473C22.2023 26.5602 21.9384 26.6667 21.6236 26.6667H2.51247ZM3.62357 24.4445H20.5125V23.3334C20.5125 23.0149 20.4329 22.7149 20.2736 22.4334C20.1143 22.1519 19.8754 21.9408 19.5569 21.8C18.1199 21.0963 16.831 20.6204 15.6903 20.3723C14.5495 20.1241 13.3421 20 12.068 20C10.794 20 9.58656 20.1278 8.4458 20.3834C7.30507 20.6389 6.00878 21.1112 4.55693 21.8C4.26802 21.9408 4.04023 22.1519 3.87357 22.4334C3.7069 22.7149 3.62357 23.0149 3.62357 23.3334V24.4445ZM12.068 13.7556C12.8903 13.7556 13.5773 13.4797 14.1291 12.9278C14.681 12.376 14.9569 11.6889 14.9569 10.8667C14.9569 10.0445 14.681 9.35746 14.1291 8.80562C13.5773 8.25375 12.8903 7.97782 12.068 7.97782C11.2458 7.97782 10.5588 8.25375 10.0069 8.80562C9.45507 9.35746 9.17913 10.0445 9.17913 10.8667C9.17913 11.6889 9.45507 12.376 10.0069 12.9278C10.5588 13.4797 11.2458 13.7556 12.068 13.7556Z" fill="white"/>
                  </g>
              </svg>
          </button>
        `
    }
    // toggleContactsAssign() { // Keine Methode ist jetzt in script.js also onclick funktion
    //     document.getElementById('selectContacts').classList.toggle('d-none');
    //     document.getElementById('closeContacts').classList.toggle('d-none');
    // }
    generateHTMLSeperator() {
        return /*html*/`
              <div class="seperator-add-task">
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="426" viewBox="0 0 2 426" fill="none">
                  <path d="M1.24805 1L1.24854 425" stroke="#D1D1D1" stroke-linecap="round"/>
                </svg>
                  </div>
        `
    }
    generateHTMLRightSide() {
        return /*html*/`
            <div class="right-side">
                  ${this.generateHTMLDateForm()}
                  ${this.generateHTMLPrioCategory()}
                  ${this.generateHTMLCategory()}
                  ${this.generateHTMLSubtask()}
                  ${this.generateHTMLAddSubtask()}
                  ${this.generateHTMLButtons()}
            </div>
          `
    }
    generateHTMLDateForm() {
        return /*html*/`
        <form class="input-date board-task-input">
            <label for="pflichtfeld">Due date<sup>*</sup></label>
            <div class="board-input-date">
                <input type="date" id="datum" name="datum" pattern="\d{2}/\d{2}/\d{4}" placeholder="dd/mm/yyyy" required>
                <!-- <input required type="text" name="" id="boardTaskAddDate" pattern="\d{2}/\d{2}/\d{4}" placeholder="dd/mm/yyyy-"> -->
                <!-- <img src="/assets/img/calender.png" alt=""> -->
            </div>
        </form>
      `
    }
    generateHTMLPrioCategory() {
        return /*html*/`
                  <div class="prio-category">
                    <p>Prio</p>
                    <div class="prio-category-container">
                      ${this.generateHTMLUrgent()}
                      ${this.generateHTMLMedium()}
                      ${this.generateHTMLPrio()}
                    </div>
                  </div>
          `
    }
    generateHTMLUrgent() {
        return /*html*/`
        <button id="btnUrgentWhite" onclick="btnTaskPrio('btnUrgentWhite')" class="category-button category-button-standard">
          <p>Urgent</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <g clip-path="url(#clip0_88061_5027)">
              <path d="M19.6527 15.2547C19.418 15.2551 19.1895 15.1803 19.0006 15.0412L10.7486 8.958L2.4965 15.0412C2.38065 15.1267 2.24907 15.1887 2.10927 15.2234C1.96947 15.2582 1.82419 15.2651 1.68172 15.2437C1.53925 15.2223 1.40239 15.1732 1.27894 15.099C1.1555 15.0247 1.04789 14.927 0.962258 14.8112C0.876629 14.6954 0.814657 14.5639 0.77988 14.4243C0.745104 14.2846 0.738203 14.1394 0.759574 13.997C0.802733 13.7095 0.958423 13.4509 1.19239 13.2781L10.0965 6.70761C10.2852 6.56802 10.5138 6.49268 10.7486 6.49268C10.9833 6.49268 11.2119 6.56802 11.4006 6.70761L20.3047 13.2781C20.4906 13.415 20.6285 13.6071 20.6987 13.827C20.7688 14.0469 20.7677 14.2833 20.6954 14.5025C20.6231 14.7216 20.4833 14.9124 20.296 15.0475C20.1088 15.1826 19.8836 15.2551 19.6527 15.2547Z" fill="#FF3D00"/>
              <path d="M19.6527 9.50568C19.4181 9.50609 19.1895 9.43124 19.0006 9.29214L10.7486 3.20898L2.49654 9.29214C2.26257 9.46495 1.96948 9.5378 1.68175 9.49468C1.39403 9.45155 1.13523 9.29597 0.962293 9.06218C0.789357 8.82838 0.71645 8.53551 0.759609 8.24799C0.802768 7.96048 0.958458 7.70187 1.19243 7.52906L10.0965 0.958588C10.2852 0.818997 10.5138 0.743652 10.7486 0.743652C10.9834 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4907 7.66598 20.6286 7.85809 20.6987 8.07797C20.7689 8.29785 20.7677 8.53426 20.6954 8.75344C20.6231 8.97262 20.4833 9.16338 20.2961 9.29847C20.1088 9.43356 19.8837 9.50608 19.6527 9.50568Z" fill="#FF3D00"/>
            </g>
              <defs>
                <clipPath id="clip0_88061_5027">
                  <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
                </clipPath>
            </defs>
          </svg>
        </button>
        <button id="btnUrgentRed"  onclick="btnTaskPrio('btnUrgentRed')" class="category-button category-button-red d-none">
          <p>Urgent</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <g clip-path="url(#clip0_88061_5027)">
              <path d="M19.6527 15.2547C19.418 15.2551 19.1895 15.1803 19.0006 15.0412L10.7486 8.958L2.4965 15.0412C2.38065 15.1267 2.24907 15.1887 2.10927 15.2234C1.96947 15.2582 1.82419 15.2651 1.68172 15.2437C1.53925 15.2223 1.40239 15.1732 1.27894 15.099C1.1555 15.0247 1.04789 14.927 0.962258 14.8112C0.876629 14.6954 0.814657 14.5639 0.77988 14.4243C0.745104 14.2846 0.738203 14.1394 0.759574 13.997C0.802733 13.7095 0.958423 13.4509 1.19239 13.2781L10.0965 6.70761C10.2852 6.56802 10.5138 6.49268 10.7486 6.49268C10.9833 6.49268 11.2119 6.56802 11.4006 6.70761L20.3047 13.2781C20.4906 13.415 20.6285 13.6071 20.6987 13.827C20.7688 14.0469 20.7677 14.2833 20.6954 14.5025C20.6231 14.7216 20.4833 14.9124 20.296 15.0475C20.1088 15.1826 19.8836 15.2551 19.6527 15.2547Z" fill="#FFF"/>
              <path d="M19.6527 9.50568C19.4181 9.50609 19.1895 9.43124 19.0006 9.29214L10.7486 3.20898L2.49654 9.29214C2.26257 9.46495 1.96948 9.5378 1.68175 9.49468C1.39403 9.45155 1.13523 9.29597 0.962293 9.06218C0.789357 8.82838 0.71645 8.53551 0.759609 8.24799C0.802768 7.96048 0.958458 7.70187 1.19243 7.52906L10.0965 0.958588C10.2852 0.818997 10.5138 0.743652 10.7486 0.743652C10.9834 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4907 7.66598 20.6286 7.85809 20.6987 8.07797C20.7689 8.29785 20.7677 8.53426 20.6954 8.75344C20.6231 8.97262 20.4833 9.16338 20.2961 9.29847C20.1088 9.43356 19.8837 9.50608 19.6527 9.50568Z" fill="#FFF"/>
            </g>
              <defs>
                <clipPath id="clip0_88061_5027">
                  <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
                </clipPath>
            </defs>
          </svg>
        </button>
  `
    }
    generateHTMLMedium() {
        return /*html*/`
        <button id="btnMediumWhite" onclick="btnTaskPrio('btnMediumWhite')" class="category-button category-button-standard">
          <p>Medium</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8" fill="none">
              <g clip-path="url(#clip0_88061_5034)">
                <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800"/>
                <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800"/>
              </g>
              <defs>
                <clipPath id="clip0_88061_5034">
                  <rect width="20" height="7.45098" fill="white" transform="translate(0.248535 0.274414)"/>
                </clipPath>
              </defs>
          </svg>
        </button>
        <button id="btnMediumYellow" onclick="btnTaskPrio('btnMediumYellow')" class="category-button category-button-yellow d-none" value="medium">
          <p>Medium</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8" fill="none">
              <g clip-path="url(#clip0_88061_5034)">
                <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFF"/>
                <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFF"/>
              </g>
              <defs>
                <clipPath id="clip0_88061_5034">
                  <rect width="20" height="7.45098" fill="white" transform="translate(0.248535 0.274414)"/>
                </clipPath>
              </defs>
          </svg>
        </button>`
    }
    generateHTMLPrio() {
        return /*html*/`
        <button id="btnLowWhite" onclick="btnTaskPrio('btnLowWhite')" class="category-button category-button-standard">
          <p>Low</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#7AE229"/>
            <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#7AE229"/>
          </svg>
        </button>
        <button id="btnLowGreen" onclick="btnTaskPrio('btnLowGreen')" class="category-button category-button-green d-none">
          <p id="boardTaskLow">Low</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#FFF"/>
            <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#FFF"/>
          </svg>
        </button>
`
}
    generateHTMLCategory() {
        return /*html*/`
          <div class="category board-task-input-button-style button-hover">
            <div class="category-sub">
              <label for="category">Category<sub>*</sub></label>
            </div>
            ${this.generateHTMLHiddenCategory()}
            ${this.generateHTMLShowCategory()}
          </div>
        `
    }
    generateHTMLHiddenCategory() {
        return /*html*/`
            <div id="hiddenSelectCategory" class="assign-container">
              <input id="taskCategoryInput" onclick="toggleCategory()" type="button" value="Select task category">
              <img onclick="toggleCategory()" src="/assets/img/arrow_drop_downaa.png" alt="">
            </div>
        `
    }
    generateHTMLShowCategory() {
        return /*html*/`
            <div id="showSelectCategory" class="d-none">
              ${this.generateHTMLToggleCategory()}
              ${this.generateHTMLSelectCategory()}
            </div>
        `
    }
    generateHTMLToggleCategory() {
        return /*html*/`
              <div class="assign-container">
                <input onclick="toggleCategory()" type="button" value="Select task category">
                <img onclick="toggleCategory()" src="/assets/img/arrow_dropdown.png" alt="">
              </div>
        `
    }
    generateHTMLSelectCategory() {
        return /*html*/`
              <div class="select-category">
                <div onclick="selectCategoryTechnical()" id="boardTaskTechnical" class="select-task-category-container">
                  <span id="technicalTask">Techincal Task</span>
                </div>
                <div onclick="selectCategoryStory()" id="boardTaskStory" class="select-task-category-container">
                  <span id="userStory">User Story</span>
                </div>
              </div>
        `
    }
    /**This Function close and open the Categories
     * @param {string}  showSelectCategory show and hidden div
     */
    // toggleCategory() { // Onclick in script.js
    //     document.getElementById('showSelectCategory').classList.toggle('d-none');
    //     document.getElementById('hiddenSelectCategory').classList.toggle('d-none');
    // }
    /**This is a select function for Input - > Value
     * @param {string} technicalTask  select the category Technical Task
     */
    // selectCategoryTechnical() { // onclick in script.js
    //     let technicalTask = document.getElementById('technicalTask').textContent;
    //     let changeInputField = document.getElementById('taskCategoryInput');
    //     document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    //     document.getElementById('showSelectCategory').classList.add('d-none');
    //     changeInputField.value = technicalTask;
    // }
    /**This is a select function for Input - > Value
     * @param {string} userStory  select the category User Story
     */
    // selectCategoryStory() { // onclick in script.js
    //     let userStory = document.getElementById('userStory').textContent;
    //     let changeInputField = document.getElementById('taskCategoryInput');
    //     document.getElementById('hiddenSelectCategory').classList.remove('d-none');
    //     document.getElementById('showSelectCategory').classList.add('d-none');
    //     changeInputField.value = userStory;
    // }
    generateHTMLSubtask() {
        return /*html*/`
        <div class="board-task-input button-hover">
            <p>Subtasks</p>
            <div id="hiddenSubtask" class="assign-container">
                <input onclick="openSubtask()" type="button" value="Add new subtask">
                <img onclick="openSubtask()" src="/assets/img/Subtasks icons11.png" alt="">
            </div>
            <div id="showSubtask" class="assign-container open-subtask d-none">
                <input id="inputSubtask" type="text" placeholder="Add new subtask">
                <img onclick="closeSubtask()" src="/assets/img/subtask-close.png" alt="">
                <img class="subtask-line" src="/assets/img/subtask-line.png" alt="">
                <img onclick="createSubtask()" src="/assets/img/subtask-accept.png" alt="">
            </div>
        </div>
        <div id="createNewSubtask" class="create-subtask" onload="renderSubtasks()">
        </div>
        `
    }
    
    generateHTMLAddSubtask(x = "test", m) {
        return /*html*/`
                <ul>
                    <li id="todoSubtask${m}" >${x}</li>
                    <div class="subtask-img">
                        <img src="/assets/img/subtask_trash.png" alt="" onclick="deleteSubtask(${m})">
                        <img src="/assets/img/subtask_seperator.png" alt="">
                        <img src="/assets/img/subtask_pencil.png" alt="" onclick="editSubtask(${m})">
                    </div>
                </ul>
        `
    }
    
    generateHTMLButtons() {
        return /*html*/`
            <div class="bottom-button" >
              <button onclick="closeAddTask()" class="cancel-button" >
                <span>Cancel</span>
                  <svg class="cancel-button-stroke" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <line x1="0" y1="0" x2="24" y2="24" stroke="black" stroke-width="2" class="change-color" />
                  <line x1="24" y1="0" x2="0" y2="24" stroke="black" stroke-width="2"  class="change-color" />
                </svg>
              </button>
              <button onclick="createTaskFromBoard()" class="create-task-button">
                <span>Create Task</span>
                <img src="/assets/img/check.png" alt="check Button in add Task">
              </button>
            </div>
        `
    }

    generateHTMLCloseButtonInSVG() {
        return /*html*/`
                <div class="style-closebutton">
                  <svg onclick="closeAddTask()" class="close-button-add-task cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_87491_5574)">
                        <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                      </g>
                  </svg>
                </div>
          `
    }
    /**
     * @param {string}  slideAddTask animtaion, when you click on addTask Button slide show  
     */
    // openAddTask() { // onclick in script.js
    //     slideAddTask = document.getElementById('slideAddTask').classList.add('show-bg-task');
    // }
    /** 
     * @param {string}  slideAddTask animtaion, when you click on addTask Button slide show 
     */
    closeAddTask() {
        slideAddTask = document.getElementById('slideAddTask').classList.remove('show-bg-task');
    }
    /** 
     * @param {function} createTaskFromBoard this function create a JSON and Push in a ARRAY (createTasks) 
     */


}
class Account {
    constructor(name, email, password, tel) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tel = tel;
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
    accountTag() {
        return /*html*/ `
            <div class="accountTag">${this.shortname}</div>

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
    constructor(title, worker, desc, jahr, monat, tag, prio = "Wichtig", Categroy, subTasks) {
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = new Date(jahr, monat - 1, tag);
        this.prio = prio;
        this.Categroy = Categroy;
        this.done = false;
        this.subTasks = subTasks;
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
    tinyTaskCard() {
        let html = /*html*/ `
            <div class="tinyTaskCard" draggable>
                <div>${this.Categroy}</div>
                <h1>${this.title}</h1>
                <p class="tinyTaskCardDescription">${this.desc.substring(0, 50)}</p>
                <div class="subtasks">
                    <div>Ladebalken</div>
                    <p>1/2 Subtasks</p>
                </div>
                <div>
                    <div>`
        for (let i = 0; i < this.worker.length; i++) {
            const worker = this.worker[i];
            html += worker.accountTag();

        }
        html += /*html*/ `
            </div>
                    <div>Prio Symbol</div>
                </div>
            </div>

        `
        return html;
    }
    editTask() {
        let taskCard = document.getElementById('taskCard')
        taskCard.innerHTML = this.taskCardEdit()
    }

}
class Subtask{
    constructor(name){
        this.name = name;
        this.done = false;
    }
    subTaskDone(){
        this.done = true;
    }
}