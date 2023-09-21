class Contact{
    constructor(name, telnr){
        this.name = name;
        this.telnr = telnr;
        this.tasks = []
    }
    asContactList(){
        return /*html*/`
            <p>Hallo mein Name ist: ${this.name}</p>
        `
    }
    sayName(){
        console.log(this.name + ": " + this.telnr);
    }
    addTask(){
        // Neue Task erstellen
        this.tasks.push()
    }
}

let telefonbuch = [];
const Stefan = new Contact("Stefan", "02229");
const Marnie = new Contact("Marnie", "02229");

telefonbuch.push(Stefan);
telefonbuch.push(Marnie);


for (let i = 0; i < telefonbuch.length; i++) {
    const element = telefonbuch[i].asContactList();
    console.log(element);
}