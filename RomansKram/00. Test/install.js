let fs = require('fs');
let path = "C:/Users/TheSu/OneDrive/Dokumente/Coding/Developer Akademie/Modul 10 - Gruppenarbeit mit Git/Join/Prototype 2/join_704/RomansKram/00. Test/testordner/"
let array = ["Wurst", "Käse", "Chips"]
let arrayJSON = JSON.stringify(array)
console.log(arrayJSON[0])
let html = /*html*/`
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>

<body>
    <script src="./script.js"></script>
</body>

</html>
`
let css = /*css*/`
    body{
        margin: 0;
        width: 100vw;
        height: 100vh;
    }
`
let js ='console.log("Hallo Welt");';

fs.mkdir('IMG', () =>{

    fs.appendFile(path + 'script.js',js, () =>{
        console.log("script.js wurde angelegt");
    })
    fs.appendFile('style.css',css,()=>{
        console.log("style.css wurde angelegt");
    })
    fs.appendFile('index.html',html, ()=>{
        console.log("Index.html angelegt und verknüpft");
    })
})

