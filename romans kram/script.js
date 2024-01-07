const body = document.getElementById('body')

let heading = document.createElement('h1');
heading.textContent = "Meine Test Seite";
heading.id = "Ueberschrift";
document.body.appendChild(heading);

function neuSection(tag, text, id){
    let heading = document.createElement(tag);
    heading.textContent = text;
    heading.id = id;
    document.body.appendChild(heading);
}
let inhalt = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quo assumenda provident laudantium. Hic, nobis sapiente iure, saepe similique quas repellendus dolores eaque eos culpa consectetur corrupti sunt ipsa in?"
neuSection('p', "Willkommen auf dieser Webside", "intro");
neuSection('p', inhalt, "textContent");

class HTMLTag{
    constructor(tag, text, id, style, parent){
        this.element = document.createElement(tag);
        this.text = text;
        this.id = id;
        this.style = style;
        this.parent = document.getElementById(parent)
    }
    printTag(){
        document.body.appendChild(this.element)
    }
}
const newTag = new HTMLTag('h2', inhalt, "subHeading", "subHeading", 'body')
newTag.printTag()
console.log(newTag);