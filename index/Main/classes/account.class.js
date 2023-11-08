class Account extends Contact {
    verified = false;
    constructor(name, email, tel, password) {
        super(name, email, tel)
        this.password = password;

    }
    verifyAccount(){
        let verificationCode = () => {
            const min = 100000;
            const max = 999999;
            const randomCode = Math.floor(Math.random()* (max-min + 1))+ min;
            return randomCode;
        }
    }
}
