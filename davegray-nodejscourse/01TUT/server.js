const os = require('os');
const path = require('path')
const math = require('./mathmodule')

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log('------');
console.log(__dirname);
console.log(__filename);

// Using path
console.log('-----');
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

// parse gives all these values in an object
console.log(path.parse(__filename));

// Using my math module
console.log(math.add(2, 3));