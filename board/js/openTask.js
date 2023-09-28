/**
 * All this function from ln 7 to 163 generate the HTML in addTask 
 * @param {string} addTask - This is the div Container that swiped in, when you push the button Add task +
 * 
 */
function renderAddTask() {
  let addTask = document.getElementById('addTask');
  addTask.innerHTML = '';
  addTask.innerHTML += generateHTMLaddTask();
}


function generateHTMLaddTask() {
  return /*html*/`
        <div id="slideAddTask" class="bg-task">
          <div class="add-task">
           ${generateHTMLLeftSide()}
           <div class="seperator-add-task">
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="426" viewBox="0 0 2 426" fill="none">
                <path d="M1.24805 1L1.24854 425" stroke="#D1D1D1" stroke-linecap="round"/>
              </svg>
            </div>
            ${generateHTMLRightSide()}
            ${generateHTMLCloseButtonInSVG()}
          </div>
        </div>
    `
}


function generateHTMLLeftSide() {
  return /*html*/`
        <div class="headline-add-task">
          <h3>Add Task</h3>
        </div>
        <div class="left-side">
          ${generateHTMLTitle()}
          ${generateHTMLDescription()}
          ${generateHTMLAssignedTo()}
          <div class="field-required-text">
            <sub>*</sub><span>This field is required</span>
          </div>
        </div>
    `
}


function generateHTMLTitle() {
  return /*html*/`
          <form class="input-title board-task-input">
              <label for="pflichtfeld">Title<sup>*</sup></label>
              <input type="text" id="" name="" required  placeholder="Enter a title">
          </form>
  `
}


function generateHTMLDescription() {
  return /*html*/`
          <div class="input-description">
              <p>Description</p>
              <textarea name="" id="" cols="30" rows="10" placeholder="Enter a Description"></textarea>
          </div>
  `
}


function generateHTMLAssignedTo() {
  return /*html*/`
          <div class="assigned-contact board-task-input">
              <p>Assigned to</p>
              <div id="selectContacts" class="assign-container">
                <input  onclick="openContactsAssign()" type="button" value="Select contacts to assign" id="">
                 <img onclick="openContactsAssign()" src="/assets/img/arrow_drop_downaa.png" alt="">
                <!-- <svg class="assign-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_88947_4985" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_88947_4985)">
                          <path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647"/>
                      </g>
                </svg>
                <svg class="assign-up" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <mask id="mask0_75597_14130" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                        <rect y="0.96582" width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_75597_14130)">
                        <path class="d-none" d="M12.6995 11.2659L15.2995 13.8659C15.6162 14.1826 15.687 14.5451 15.512 14.9534C15.337 15.3618 15.0245 15.5659 14.5745 15.5659H9.42454C8.97454 15.5659 8.66204 15.3618 8.48704 14.9534C8.31204 14.5451 8.38287 14.1826 8.69954 13.8659L11.2995 11.2659C11.3995 11.1659 11.5079 11.0909 11.6245 11.0409C11.7412 10.9909 11.8662 10.9659 11.9995 10.9659C12.1329 10.9659 12.2579 10.9909 12.3745 11.0409C12.4912 11.0909 12.5995 11.1659 12.6995 11.2659Z" fill="#2A3647"/>
                      </g>
                </svg> -->
              </div>
              <div id="closeContacts" class="assign-container d-none">
                  <input type="text">
                  <img src="/assets/img/arrow_dropdown.png" alt="">
                  <div class="checkbox-container">
                    <label>
                      <span>Roman</span>
                      <input type="checkbox" name="" id="">
                    </label>
                  </div>
                </div>
          </div>
  ` 
}


function openContactsAssign() {
  document.getElementById('selectContacts').classList.add('d-none');
  document.getElementById('closeContacts').classList.remove('d-none');
}


function generateHTMLRightSide() {
  return /*html*/`
      <div class="right-side">
            ${generateHTMLDateForm()}
            ${generateHTMLPrioCategory()}
            ${generateHTMLCategory()}
            ${generateHTMLSubtask()}
            ${generateHTMLButtons()}
      </div>
    `
}


function generateHTMLDateForm() {
  return /*html*/`
            <form class="input-date board-task-input">
              <label for="pflichtfeld">Due date<sup>*</sup></label>
              <div class="board-input-date">
                <input type="text" name="" id="" placeholder="dd/mm/yyyy">
                <img src="/assets/img/calender.png" alt="">
              </div>
            </form>
    `
}


function generateHTMLPrioCategory() {
  return /*html*/`
            <div class="prio-category">
              <p>Prio</p>
              <div class="prio-category-container">
                ${generateHTMLUrgent()}
                ${generateHTMLMedium()}
                ${generateHTMLPrio()}
              </div>
            </div>
    `
}


function generateHTMLUrgent() {
  return /*html*/`
                <button class="category-button category-button-red">
                  <p>Urgent</p>
                  <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
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
    `
}


function generateHTMLMedium() {
  return /*html*/`
                <button class="category-button category-button-yellow">
                  <p>Medium</p>
                  <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8" fill="none">
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
    `
}


function generateHTMLPrio() {
  return /*html*/`
                <button class="category-button category-button-green">
                  <p>Low</p>
                  <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                    <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#7AE229"/>
                    <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#7AE229"/>
                  </svg>
                </button>
    `
}


function generateHTMLCategory() {
  return /*html*/`
    <div class="category board-task-input-button-style button-hover">
      <div class="category-sub">
        <label for="category">Category<sub>*</sub></label>
      </div>
      <input type="button" value="Select task category">
    </div>
  `
}


function generateHTMLSubtask() {
  return /*html*/`
    <div class=" subtasks board-task-input-button-style button-hover">
      <p>Subtasks</p>
      <input type="button" value="Add new subtask">
    </div>
  `
}


function generateHTMLButtons() {
  return /*html*/`
      <div class="bottom-button">
        <button onclick="closeAddTask()" class="cancel-button">
          <span>Cancel</span>
            <svg class="cancel-button-stroke" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <line x1="0" y1="0" x2="24" y2="24" stroke="black" stroke-width="2" class="change-color" />
            <line x1="24" y1="0" x2="0" y2="24" stroke="black" stroke-width="2"  class="change-color" />
          </svg>
        </button>
        <button class="create-task-button">
          <span>Create Task</span>
          <img src="/assets/img/check.png" alt="check Button in add Task">
        </button>
      </div>
  `
}


function generateHTMLCloseButtonInSVG() {
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

function openAddTask() {
  slideAddTask = document.getElementById('slideAddTask').classList.add('show-bg-task');
}


function closeAddTask() {
  slideAddTask = document.getElementById('slideAddTask').classList.remove('show-bg-task');
}




