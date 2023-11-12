let array1 = ["1","2", "4", "6"]
let array2 = ["1","3", "4", "5"]
let arrayComb = [...array1, ...array2];
let arrayClean = [...new Set(arrayComb)];

console.log("array1", array1);
console.log("array2", array2);
console.log("arrayComb", arrayComb);
console.log("arrayClean", arrayClean);