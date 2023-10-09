let date01 = new Date();
// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// let day = date.getDay();
// let date01 = new Date(year,month,day)


function checkDate(){
    let date02 = new Date(document.getElementById('dateInput').value);
    console.log("Date01 = " + date01);
    console.log("Date02 = " + date02);
    if (date01 > date02){
        console.log("Das Datum liegt in der Vergangenheit");
    }else if(date01 < date02){
        console.log("Das Datum liegt in der Zukunft");
    }else if(date01 == date02){
        console.log("Die Daten sind gleich");
    }
}