let subtaskTemp = []; //@Roman kannst gerne ändern! Muss ich nicht ;D
let prioTemp = "";

// const fs = require('fs');
let Join = new Page();
let JoinLogin = new Login();
let JoinSummary = new Summary();
let JoinBoard = new Board();
let JoinAbout = new About();
let JoinContacts = new Contacts();
    // Accounts
const guest = new Account("Guest", "email@join.de", "");
const user01 = new Account("Roman Schröder", "roman.schroeder@inclufilm.com", "Gregor2023")
const user02 = new Account("Florian", "florian.rehm@developerakademie.com", "Password123")
const user03 = new Account("Stefan", "Stefan@developerakademie.com", "Password123")
const user04 = new Account("Dominik", "Dominik@developerakademie.com", "Password123")
const user05 = new Contact("Anton Mayer", "antom@gmail.com", "+49 1111 111 11 1")
const user06 = new Contact("Anja Schulz", "schulz@hotmail.com", "+49 1111 111 11 1")
const user07 = new Contact("Benedikt Ziegler", "benedikt@gmail.com", "+49 1111 111 11 1")
const user08 = new Contact("David Eisenberg", "davidberg@gmail.com", "+49 1111 111 11 1")
const user09 = new Contact("Eva Fischer", "eva@gmail.com", "+49 1111 111 11 1")
const user10 = new Contact("Emmanuel Mauer", "emmanuelma@gmail.com", "+49 1111 111 11 1")
const user11 = new Contact("Marcel Bauer", "bauer@gmail.com", "+49 1111 111 11 1")
const user12 = new Contact("Tatiana Wolf", "wolf@gmail.com", "+49 1111 111 11 1")


Join.accounts.push(guest)
Join.accounts.push(user01)
Join.accounts.push(user02)
Join.accounts.push(user03)
Join.accounts.push(user04)
Join.accounts.push(user05)
Join.accounts.push(user06)
Join.accounts.push(user07)
Join.accounts.push(user08)
Join.accounts.push(user09)
Join.accounts.push(user10)
Join.accounts.push(user11)
Join.accounts.push(user12)


// Tasks
let task01 = new Task("Einkaufen gehen", Join.accounts[3], "Jemand muss zu Aldi fahren und Chips, Getränke und ggf noch ein paar Häppchen einkaufen", "2023-9-30", "Medium", "User Story", "Open")
let task02 = new Task("Abwaschen", Join.accounts[4], "Jemand muss dafür sorgen, dass das Geschirr und besteck sauber ist", "2023-9-31", "Medium", "User Story", "Open")
let task03 = new Task("Aufbau", undefined, "Jemand muss alle Party Möbel aufstellen", "2023-9-29", "Medium", "User Story", undefined, false, false , true, false)


let subtask01 = new Subtask ("Tische", undefined)
let subtask02 = new Subtask ("Stühle", undefined)
let subtask03 = new Subtask ("Getränke kalt stellen", true)
let subtask04 = new Subtask ("Aschenbecher für Raucher (draußen)", undefined)

task03.worker = [
    Join.accounts[1],
    Join.accounts[2],
    Join.accounts[3],
    ]

task03.subTasks = [
    subtask01,
    subtask02,
    subtask03,
    subtask04,
]
// let task04 = new Task("Meeting für Join", Join.accounts[1], "Wir besprechen wie wir das KambanBoard bauen", "2024-01-10", "Medium", "User Story", "Open")
task01.switchStatus("1");
Join.tasks.push(task01);
Join.tasks.push(task02);
Join.tasks.push(task03);
// Join.tasks.push(task03);
// Join.tasks.push(task04);
let body = document.getElementById('body')
