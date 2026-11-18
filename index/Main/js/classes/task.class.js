//task.class.js

class Task {
  /**
   * Creates a task with its details, assigned contacts, and board status.
   * @param {string} title - Task title.
   * @param {Array} worker - Assigned contacts.
   * @param {string} desc - Task description.
   * @param {string|Date} date - Task due date.
   * @param {string} prio - Task priority.
   * @param {string} Category - Task category.
   * @param {Array} subTasks - List of subtasks.
   * @param {boolean} todo - Whether the task is in To Do.
   * @param {boolean} progress - Whether the task is in Progress.
   * @param {boolean} feedback - Whether the task is awaiting feedback.
   * @param {boolean} done - Whether the task is completed.
   */
  constructor(
    title,
    worker,
    desc,
    date,
    prio = "Medium",
    Category,
    subTasks,
    todo = false,
    progress = false,
    feedback = false,
    done = false,
  ) {
    this.title = title;
    this.worker = worker;
    this.desc = desc;
    this.date = new Date(date);
    this.prio = prio;
    this.Category = Category;
    this.subTasks = subTasks;
    this.todo = todo;
    this.progress = progress;
    this.feedback = feedback;
    this.done = done;
  }

  /**
   * Counts the completed subtasks of the current task.
   * @returns {number} Number of completed subtasks.
   */
  countCompletedSubtasks() {
    let completedCount = 0;
    for (let i = 0; i < this.subTasks.length; i++) {
      const subtask = this.subTasks[i];
      if (subtask.done) {
        completedCount++;
      }
    }
    return completedCount;
  }

  /**
   * Generates the HTML label with the appropriate task category color.
   * @returns {string} HTML markup for the task category label.
   */
  setCategoryColor() {
    if (this.Category === "Technical Task") {
      return /*html*/ `<div class="tiny-task-category color-technical">${this.Category}</div>`;
    }

    return /*html*/ `<div class="tiny-task-category color-userStory">${this.Category}</div>`;
  }

  /**
   * Generates the HTML for the detailed task card.
   * @param {number} x - Index of the task in the task list.
   * @returns {string} HTML markup for the detailed task card.
   */
  taskCardNormal(x) {
    const formattedDate = () => {
      const date = this.date;
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    };
    const formattedPrio = () => {
      if (this.prio === "Urgent") {
        return "./IMG/Property 1=urgent.svg";
      }
      if (this.prio === "Medium") {
        return "./IMG/Property 1=medium.svg";
      }
      return "./IMG/Property 1=low.svg";
    };
    const renderWorker = () => {
      let htmlSnippet = "";
      for (let i = 0; i < this.worker.length; i++) {
        const worker = this.worker[i];
        htmlSnippet += worker.tinyCard();
      }
      return htmlSnippet;
    };
    const renderSubtasks = () => {
      let htmlSnippet = "";
      for (let j = 0; j < this.subTasks.length; j++) {
        const subTask = this.subTasks[j];
        const hideUnchecked = subTask.done ? "d-none" : "";
        const hideChecked = subTask.done ? "" : "d-none";
        htmlSnippet += /*html*/ `
          <div class="subtask-list">
            <div id="cardCheckboxFalse${j}" class="style-subtask-checkbox ${hideUnchecked}">
              <div class="style-checkbox-displayflex">
                <div onclick="toggleCheckboxCard(${x},${j})" class="check-box-task">
                  <img class="checkbox-img-taskCard" src="./IMG/check_empty.svg" alt="">
                </div>
                <div class="subtask-text">${subTask.text}</div>
              </div>
            </div>

            <div id="cardCheckboxTrue${j}" class="style-subtask-checkbox ${hideChecked}">
              <div class="style-checkbox-displayflex">
                <div onclick="toggleCheckboxCard(${x},${j})" class="check-box-task">
                  <img class="checkbox-img-taskCard-check" src="./IMG/checkbox_check.svg" alt="">
                </div>
                <div class="subtask-text">${subTask.text}</div>
              </div>
            </div>
          </div>
`;
      }
      return htmlSnippet;
    };
    return /*html*/ `
        <div class="bg-task">
            <div id="taskCard" class="taskCard">
                <div class="taskCardHeader">
            	    ${this.setCategoryColor()}
                    <div onclick="closeTaskCard()">
                        <svg class="style-closebutton" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87491_5574)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
                </div>
                
                <h1>${this.title}</h1>
                <p>${this.desc}</p>
                <div class="taskCard-date-prio">
                    <div class="taskCardAttribute">
                        <p>Due date: </p>
                        <p>${formattedDate()}</p>
                    </div>

                    <div class="taskCardAttribute">
                        <p>Priority: </p>
                        <img src="${formattedPrio()}">
                    </div>
                </div>
                <div class="taskCardAssignment">
                    <p>Assigned to: </p>
                    <div id="taskCardAssinedList">
                        ${renderWorker()}
                    </div>
                
                </div >

                <div class="taskCardSubtasks">
                    <p>Subtasks</p>
                    ${renderSubtasks()}
                </div>

                <div class="taskCardFooter">
                    <div class="deleteBtn" onclick="deleteTask(${x})"></div>
                    <div class="editBtn" onclick="editTask(${x})"></div>
                </div>
            </div>
        </div>
        `;
  }

  /**
   * Generates the HTML form for editing an existing task.
   * @param {number} x - Index of the task in the task list.
   * @returns {string} HTML markup for the task editing form.
   */
  taskCardEdit(x) {
    const getDate = () => {
      const date = new Date();
      return date.toISOString().split("T")[0];
    };

    return /*html*/ `  
        <div class="editTaskCard">   
            <div class="taskCardHeader" >
                <div></div>
                <div onclick="closeTaskCard()">
                    <svg class="close-button-card cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87491_5574)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
            </div>
            <div class="editTask" >
                <div class="style-task">
                    <label for="taskCardETitle">Titel:</label>
                    <input type="text" id="taskCardETitle" value="${this.title}">

                    <label for="taskCardEDesc">Description:</label>
                    <textarea class="blue textarea-resize" cols="30" rows="10" id="taskCardEDesc">${this.desc}</textarea>

                    <label for="taskCardEDate">Date Due:</label>
                    <input type="date" min="${getDate()}" id="taskCardEDate">

                    ${JoinBoard.generateHTMLAssignedTo(x)}
                    ${JoinBoard.generateHTMLAddContactShortName(x)}
                    <div>
                        ${JoinBoard.generateHTMLCategory()}
                    </div>
                    <div>
                        ${JoinBoard.generateHTMLPrioCategory()}
                    </div>
                    ${JoinBoard.generateHTMLSubtask()}
                    
                </div>
                <div class="ok-button-container">
                    <button class="btn-dark-blue" onclick="taskSaveChanges(${x})">Ok &checkmark;</button>
                </div>
            </div>
        </div>
            `;
  }

  /**
   * Generates the HTML for a task preview card on the Kanban board.
   * @param {number} x - Index of the task in the task list.
   * @returns {string} HTML markup for the task preview card.
   */
  tinyTaskCard(x = 0) {
    const contactTags = () => {
      let contactTagsHTML = "";

      for (let i = 0; i < this.worker.length; i++) {
        const worker = this.worker[i];
        contactTagsHTML += worker.accountTag();
      }
      return contactTagsHTML;
    };
    const prioTag = () => {
      if (this.prio === "Urgent") {
        return "./IMG/prioUrgentIcon.png";
      }
      if (this.prio === "Medium") {
        return "./IMG/prioMediumIcon.png";
      }
      return "./IMG/prioLowIcon.png";
    };
    const subtaskArea = () => {
      if (this.subTasks.length !== 0) {
        return /*html*/ `
                <div class="subtasks" id="tinyTaskCardSubtaskSection${x}">
                    <div class="tiny-task-label">
                        <div class="progressContainer" id="progressContainer">
                            <div class="progressBar" id="progressBar${x}"></div>
                        </div>
                        <p>${this.countCompletedSubtasks()}/${this.subTasks.length}&nbsp;Subtasks</p>
                    </div>
                </div>

                `;
      }
      return "";
    };

    return /*html*/ `
            <div id="tinyTaskCard${x}" onclick="openTask(${x})" class="tinyTaskCard" draggable="true"  ondragstart="startDragging(${x})"  ontouchstart="startTouching('toDo', ${x}, event);" ontouchmove="moveTouching(event);" ontouchend="endTouching(event);" >
            	${this.setCategoryColor()}
                <div class="tiny-title">
                    <h1>${this.title}</h1>
                    <span class="tinyTaskCardDescription">${this.desc.substring(0, 50)}</span>
                </div>
                ${subtaskArea()}
                <div class="contactsAndPrio">
                    <div id="tinyCardShortNames" class="tinyTaskCardContacts">${contactTags()}</div>
                    <img src="${prioTag()}" class="prioIcon" alt="">
                </div>
            </div>
        `;
  }

  /**
   * Updates the progress bar based on completed subtasks.
   * Hides the progress section if the task has no subtasks.
   * @param {number} x - Index of the task on the board.
   * @returns {void}
   */
  updateProgressBar(x) {
    const progressContainer = document.getElementById(
      `tinyTaskCardSubtaskSection${x}`,
    );
    if (progressContainer) {
      const totalSubtasks = this.subTasks.length;

      if (totalSubtasks === 0) {
        progressContainer.classList.add("d-none");
      } else {
        const overallProgress =
          (this.countCompletedSubtasks() / totalSubtasks) * 100;
        const progressbar = document.getElementById(`progressBar${x}`);
        progressbar.style.width = `${overallProgress}%`;
      }
    }
  }
}
