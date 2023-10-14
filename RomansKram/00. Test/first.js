let os = require('os');
let bytes = os.freemem()
let kb = bytes / 1024;
let mb = kb / 1024;
let gb = mb / 1024;
let gbroundet = Math.round(gb)
console.log("Free Memory", gbroundet);