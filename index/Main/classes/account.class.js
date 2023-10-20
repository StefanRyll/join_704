class Account extends Contact {
    constructor(name, email, password, tel) {
        super(name, email, tel)
        this.password = password;

    }
}
