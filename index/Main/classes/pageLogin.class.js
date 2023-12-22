class Login extends Page {
    constructor() {
            super()
        }
        /**
         *  Diese Methode stellt das Log In Fenster da
         * @returns {string} -- 
         * */
    logInContent() {
            return /*html*/ `
                <header class="login-header">
                    <div class="frame-156">
                        <p>Not a Join user?</p>
                        <button class="log-in-side-button" onclick="signUp()">Sign up</button>
                    </div>
                </header>
                <section>
                    <div id="endAnimation" class="frame-153 respon-frame-153">
                        <div class="frame-159">
                            <h1 class="login-headline mg-none">Log In</h1>
                            <img class="login-underline" src="./IMG/vector-5.png">
                        </div>
                        <form class="login-container" onsubmit="logInUser()">
                            <div class="frame-14"><input required type="email" class="frame-157" autocomplete="username" placeholder="Email" id="loginEmail">
                                <img class="input-icon" src="./IMG/mail.png"> 
                            </div>                       
                            <div class="frame-14" onclick="visibility()"><input required type="password" autocomplete="current-password" class="frame-157" placeholder="Password" id="loginPassword">
                                <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                                <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                            </div>
                            <label class="remember-me">
                            <div class="check-box" id="checkbox" onclick="checkboxActivate()">
                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <rect x="4" y="4.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                                </svg> -->
                                <input class="checkbox" type="checkbox">
                            </div>
                            <div class="check-box d-none" id="checkbox-active" onclick="checkboxDeactivate()">
<input class="checkbox" type="checkbox">
                            </div>
                                <span class="checkbox-text">Remember me</span>
                            </label>
                            <div class="frame-176">
                                <div class="loginButtons mg-none">
                                <button class="login-btn log-in-side-button btn-dark-blue" type="submit">Log&nbsp;In</button><button class="guest-login-style btn-white" onclick="guestLogin()">Guest&nbsp;Log&nbsp;In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <footer class="login-footer">
                        <div class="frame-156-footer">
                            <p>Not a Join user?</p>
                            <button class="log-in-side-button btn-dark-blue" onclick="signUp()">Sign up</button>
                        </div>
                        <div class="legalBtn-container">
                            <button onclick="privacyPage()" class="log-in-side-button text-button">Privacy Policy</button>
                            <button onclick="legalPage()" class="log-in-side-button text-button">Legal notice</button>
                        </div>
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
                    <div id="logoOverlay" class="logo-animation-overlay"></div>
                    <div id="logoMain" class="logoAnimationImg"></div>
            `
    }
    startAnimationOverlay() {
        setTimeout(() => {
            document.getElementById('logoOverlay').classList.add('d-none');
        }, 1000);
    }
    logoLogin() {
        return /*html*/ `
                <div id="logoMain" class="logoAnimationImg2"></div>
    
            `
    }
    loginLayout() {
        return /*html*/ `
                <div id="logoArea"></div>
                <div id="windowArea"></div>        
            `
    }
    signUpWindow() {
        return /*html*/ `
            <div class="signUp-body">
                <div id="logoMain" class="logoAnimationImg2"></div>
                <div id="signUpWindow" class="signUpWindow respon-frame-153">
                        <a class="backBtn" onclick="startPage2()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M10.4373 14.6667H25.3333C26.0696 14.6667 26.6666 15.2637 26.6666 16.0001C26.6666 16.7364 26.0696 17.3334 25.3333 17.3334H10.4373L16.6466 23.5427C17.1672 24.0634 17.1672 24.9074 16.6466 25.4281C16.126 25.9487 15.2819 25.9487 14.7613 25.4281L6.74746 17.4143C5.96642 16.6332 5.96642 15.3669 6.74747 14.5858L14.7613 6.57206C15.2819 6.05144 16.126 6.05144 16.6466 6.57206C17.1672 7.09268 17.1672 7.93677 16.6466 8.45739L10.4373 14.6667Z" fill="#29ABE2"/>
                            </svg>
                        </a>
                        <div class="frame-159 mg-0">
                            <h1 class="login-headline mg-none">Sign Up</h1>
                            <img src="./IMG/vector-5.png">
                        </div>
                    <form class="signUp-container" onsubmit="createAccount1()">
                            <div class="frame-14"><input required type="text" class="frame-157" placeholder="Name" id="signUpInputName">
                                <img class="input-icon" src="./IMG/person.png"> 
                            </div>
                            <div class="frame-14"><input required type="email" class="frame-157" placeholder="Email" id="signUpInputEmail">
                                <img class="input-icon" src="./IMG/mail.png"> 
                            </div>
                            <div class="frame-14" onclick="visibility()"><input type="password" class="frame-157" placeholder="Password" id="signUpInputPassword">
                                <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                                <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                            </div>
                            <div id="passwordCheckArea" class="frame-14" onclick="visibility()"><input type="password" class="frame-157" placeholder="Confirm Password" id="signUpInputPassword2">
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
                                        <svg class="checkbox-hook" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Group 19">
                                                <path id="Vector 9" d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                                                <path id="Vector 17" d="M5 9.96582L9 13.9658L17 2.46582" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <span class="checkbox-text">I accept the&nbsp;<a class="link-style" onclick="privacyPage()"> Privacy policy</a></span>
                                </label>
                            </div>
                            <div class="frame-176">
                                <div class="sign-up-btn loginButtons">
                                <button class="login-btn log-in-side-button btn-dark-blue" type="submit">Sign Up</button>
                                </div>
                            </div>
                        </form>
                </div>
                <footer class="login-footer">
                    <div class="legalBtn-container">
                        <button onclick="privacyPage()" class="log-in-side-button text-button">Privacy Policy</button>
                        <button onclick="legalPage()" class="log-in-side-button text-button">Legal notice</button>
                    </div>
                </footer>
            </div>
            `
    }
    forceSignIn(x) {
        this.signedAccount = x;
    }

}