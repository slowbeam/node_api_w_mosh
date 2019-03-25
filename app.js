const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// Template string
// ES6 / ES2015: ECMAScript 6

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);